import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"


type Body = {
  category_ids?: string[]
}

/**
 * POST /admin/custom/products/:id/categories
 * Add-only: links the product to the given categories, without removing existing ones.
 */
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const productId = req.params.id
  const { category_ids }: Body = req.body || {}

  if (!Array.isArray(category_ids) || !category_ids.length) {
    return res.status(400).json({
      message: "category_ids must be a non-empty array of strings",
    })
  }

  const ids = category_ids.map(String).filter(Boolean)
  if (!ids.length) {
    return res.status(400).json({
      message: "category_ids must contain at least one non-empty id",
    })
  }

  const manager = req.scope.resolve("manager") as any

  await manager.transaction(async (tx) => {
    // Ensure product exists and not soft-deleted
    const prod = await tx.query(
      `select id from product where id = $1 and deleted_at is null`,
      [productId],
    )
    if (!prod.length) {
      throw new Error("Product not found")
    }

    // Keep only existing categories
    const cats = await tx.query(
      `select id
         from product_category
        where id = ANY($1::text[])
          and deleted_at is null`,
      [ids],
    )
    const validCatIds = cats.map((c: any) => c.id)
    if (!validCatIds.length) {
      throw new Error("No valid categories for given category_ids")
    }

    // INSERT only missing links (add-only)
    await tx.query(
      `insert into product_category_product (product_id, product_category_id)
       select $1 as product_id, id as product_category_id
         from product_category
        where id = ANY($2::text[])
          and deleted_at is null
          and not exists (
            select 1
              from product_category_product pcp
             where pcp.product_id = $1
               and pcp.product_category_id = product_category.id
          )`,
      [productId, validCatIds],
    )
  })

  return res.status(200).json({
    product_id: productId,
    category_ids: ids,
  })
}
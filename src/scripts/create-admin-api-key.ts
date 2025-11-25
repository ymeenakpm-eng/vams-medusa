import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { createApiKeysWorkflow } from "@medusajs/medusa/core-flows";

export default async function createAdminApiKey({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  logger.info("Creating a new secret Admin API key for the custom admin UI...");

  const { result: apiKeys } = await createApiKeysWorkflow(container).run({
    input: {
      api_keys: [
        {
          title: "Custom Admin UI (secret)",
          type: "secret",
          created_by: "script",
        },
      ],
    },
  });

  const adminKey = apiKeys[0];
  logger.info(
    `Created admin API key (use this as MEDUSA_ADMIN_TOKEN): ${adminKey.token}`
  );
}

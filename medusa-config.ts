// medusa-config.ts
import { loadEnv, defineConfig } from "@medusajs/framework/utils"

// Load environment variables based on NODE_ENV
loadEnv(process.env.NODE_ENV || "development", process.cwd())

// Common CORS origins (store, admin, etc.)
const cors =
  "http://localhost:3000," + // local Next.js / React store
  "http://localhost:7001," + // local/admin in Docker
  "https://vams-biome-frontend.vercel.app" // your deployed frontend

export default defineConfig({
  projectConfig: {
    // Database & Redis (Railway will inject these)
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,

    http: {
      // CORS
      storeCors: cors,
      adminCors: cors,
      authCors: cors,

      // Secrets – for dev you can keep defaults,
      // in Railway override via env vars
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },

  // You can add other Medusa modules/plugins here later
  // modules: {
  //   // example
  // },
})

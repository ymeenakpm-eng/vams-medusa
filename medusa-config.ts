// medusa-config.ts
import { loadEnv, defineConfig } from "@medusajs/framework/utils"

// Load environment variables based on NODE_ENV
loadEnv(process.env.NODE_ENV || "development", process.cwd())

// Common CORS origins (store, admin, frontend)
const cors =
  "http://localhost:3000," + // local frontend
  "http://localhost:7001," + // local/docker admin
  "https://vams-biome-frontend.vercel.app" // deployed frontend

export default defineConfig({
  projectConfig: {
    // Railway DB + Redis
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,

    http: {
      storeCors: cors,
      adminCors: cors,
      authCors: cors,

      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },

  // 🔴 IMPORTANT: disable bundled admin when env says so
  admin: {
    // When DISABLE_MEDUSA_ADMIN="true" (string), this becomes true
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
  },
})

import { loadEnv, defineConfig } from "@medusajs/framework/utils"

// Disable bundled admin UI (we’ll use only the API on Railway)
process.env.MEDUSA_ADMIN_DISABLED = "true"

// Load .env files based on NODE_ENV (still safe to keep)
loadEnv(process.env.NODE_ENV || "development", process.cwd())

module.exports = defineConfig({
  projectConfig: {
    // Use DATABASE_URL and REDIS_URL from environment (Railway)
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,

    http: {
      // CORS – allow local dev + your Vercel frontend
      storeCors:
        "http://localhost:3000,https://vams-biome-frontend.vercel.app",
      adminCors:
        "http://localhost:3000,https://vams-biome-frontend.vercel.app",
      authCors:
        "http://localhost:3000,https://vams-biome-frontend.vercel.app",

      // Secrets – you can replace with long random strings
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
})
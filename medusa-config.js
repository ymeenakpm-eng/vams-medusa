// medusa-config.js
const { loadEnv, defineConfig } = require("@medusajs/framework/utils");

// Load environment variables based on NODE_ENV
loadEnv(process.env.NODE_ENV || "development", process.cwd());

// Common CORS origins (store, admin, frontend)
const cors =
  "http://localhost:3000," + // local frontend
  "http://localhost:7001," + // local/docker admin
  "https://vams-biome-frontend.vercel.app," + // deployed frontend (legacy)
  "https://vamsbiome.com," + // production storefront
  "https://admin.vamsbiome.com," + // production custom admin UI domain
  "https://vams-custom-admin.vercel.app"; // fallback admin UI on vercel.app

module.exports = defineConfig({
  projectConfig: {
    // Railway DB + Redis
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,

    http: {
      storeCors: cors,
      adminCors: cors,
      authCors: cors,

      jwtSecret: process.env.JWT_SECRET || "jwt_prod_2F9v",
      cookieSecret: process.env.COOKIE_SECRET || "jwt_prod_2F9v",
    },
  },

  // 🔴 IMPORTANT: disable bundled admin when env says so
  admin: {
    // When DISABLE_MEDUSA_ADMIN="true" (string), this becomes true
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
  },
});

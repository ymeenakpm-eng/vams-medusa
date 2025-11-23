import { loadEnv, defineConfig } from "@medusajs/framework/utils"

// This can stay; it won't hurt even if we don't use env vars
loadEnv(process.env.NODE_ENV || "development", process.cwd())

module.exports = defineConfig({
  projectConfig: {
    // Database & Redis – hard‑coded to your Railway internal URLs
    databaseUrl:
      "postgresql://postgres:FYiEklSNPLNylsKopjUyVsLoizuGiOLU@postgres.railway.internal:5432/railway",
    redisUrl:
      "redis://default:oWwLvLOHeVKISksLnTHyVRKHvIGrbNVk@redis.railway.internal:6379",

    http: {
      // CORS – allow local dev + your Vercel frontend
      storeCors:
        "http://localhost:3000,https://vams-biome-frontend.vercel.app",
      adminCors:
        "http://localhost:3000,https://vams-biome-frontend.vercel.app",
      authCors:
        "http://localhost:3000,https://vams-biome-frontend.vercel.app",

      // Secrets – you can change these to longer random strings
      jwtSecret: "supersecret",
      cookieSecret: "supersecret",
    },
  },
})
import { defineConfig } from 'drizzle-kit'
import dotenv from 'dotenv'
dotenv.config()
export default defineConfig({
  schema: "./schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://postgres.ougfxycqjsqjuezpcklk:KjS4207DLWWU1iQB@aws-0-ap-south-1.pooler.supabase.com:6543/postgres",
  },
  verbose: true,
  strict: true,
})
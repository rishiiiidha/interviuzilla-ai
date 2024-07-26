import { defineConfig } from 'drizzle-kit'
import dotenv from 'dotenv'
dotenv.config()
export default defineConfig({
  schema: "./neon/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://rishidha04:TKitFQ0P1Xpn@ep-red-queen-a50fum71.us-east-2.aws.neon.tech/interviuzill_ai?sslmode=require",
  },
  verbose: true,
  strict: true,
});
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import dotenv from 'dotenv'
import * as schema from './schema'
dotenv.config();
const connectionString = process.env.DATABASE_URL || "";
const client = postgres(connectionString,{ prepare: false })
export const db = drizzle(client,{schema});


import "server-only";

import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";

import * as schema from "./schema";

let cached: NeonHttpDatabase<typeof schema> | undefined;

/**
 * Neon over HTTP — one round trip per query, no connection pool to keep warm,
 * which is what makes it viable in serverless request handlers.
 *
 * Lazy on purpose: building the app shouldn't require DATABASE_URL to be set,
 * only serving a request that touches the database.
 */
export function getDb(): NeonHttpDatabase<typeof schema> {
  if (!cached) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        "DATABASE_URL is not set. Copy .env.example to .env.local and paste your Neon connection string.",
      );
    }
    cached = drizzle(neon(url), { schema });
  }
  return cached;
}

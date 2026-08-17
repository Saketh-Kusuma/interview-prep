import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

// drizzle-kit runs outside Next, so nothing has loaded .env.local yet. Using
// Next's own loader keeps precedence identical to what the app sees at runtime.
loadEnvConfig(process.cwd());

const url = process.env.DATABASE_URL ?? "";

// `generate` only reads lib/db/schema.ts, so it must work without credentials.
// Commands that actually talk to Neon fail early with a useful message instead.
const needsConnection = process.argv.some((arg) =>
  ["migrate", "push", "pull", "studio"].includes(arg),
);

if (needsConnection && !url) {
  throw new Error(
    "DATABASE_URL is not set. Copy .env.example to .env.local and paste your Neon connection string.",
  );
}

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: { url },
  // The database is shared with unrelated projects. Without this filter,
  // drizzle-kit would see their `public` tables as drift and offer to drop them.
  schemaFilter: ["interview_prep"],
  strict: true,
  verbose: true,
});

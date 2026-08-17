/**
 * Deployment self-check. Answers "why did the server crash?" from production,
 * where the stack trace is otherwise only visible in the platform's log viewer.
 *
 * Two rules keep this route useful when everything else is broken:
 *
 * 1. Nothing is imported at module scope. Every dependency is loaded inside a
 *    `probe()`, so a module that throws while loading is *reported* rather than
 *    taking the whole function down with it.
 * 2. No secret is echoed back — only presence, length, and shape. Safe to hit
 *    from a browser, though there is no reason to keep it once a deploy is
 *    healthy.
 */

// Reads process.env and the session cookie, so it must never be prerendered.
export const dynamic = "force-dynamic";

/**
 * `NEXT_PUBLIC_*` names are substituted at build time, not read at runtime, so
 * their entries below report whether they were present *during the build* —
 * which is exactly the question worth asking, since a value added afterwards
 * never reaches the browser bundle.
 */
const REQUIRED_ENV = {
  DATABASE_URL: process.env.DATABASE_URL,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

type Probe =
  | { ok: true; detail: unknown }
  | { ok: false; error: string; cause?: string };

async function probe(run: () => Promise<unknown>): Promise<Probe> {
  try {
    return { ok: true, detail: await run() };
  } catch (error) {
    if (!(error instanceof Error)) {
      return { ok: false, error: String(error) };
    }
    // Message only. A stack would leak build paths for no diagnostic gain.
    return {
      ok: false,
      error: `${error.name}: ${error.message}`,
      ...(error.cause instanceof Error
        ? { cause: `${error.cause.name}: ${error.cause.message}` }
        : {}),
    };
  }
}

/**
 * The private key is the value most often broken in transit: pasted with
 * surrounding quotes, or with its `\n` escapes expanded into real newlines by a
 * dashboard text field. Neither is visible from "the variable is set".
 */
function privateKeyShape(raw: string | undefined) {
  if (!raw) return { present: false };
  return {
    present: true,
    length: raw.length,
    looksPem: raw.includes("BEGIN PRIVATE KEY"),
    hasEscapedNewlines: raw.includes("\\n"),
    hasRealNewlines: raw.includes("\n"),
    // `[\s\S]` rather than the `s` flag: the key spans lines and tsconfig
    // targets ES2017.
    wrappedInQuotes: /^["'][\s\S]*["']$/.test(raw.trim()),
  };
}

export async function GET() {
  return Response.json({
    runtime: {
      node: process.version,
      nodeEnv: process.env.NODE_ENV,
      region: process.env.VERCEL_REGION ?? null,
      commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? null,
    },
    env: Object.fromEntries(
      Object.entries(REQUIRED_ENV).map(([name, value]) => [
        name,
        Boolean(value && value.trim().length > 0),
      ]),
    ),
    privateKey: privateKeyShape(REQUIRED_ENV.FIREBASE_PRIVATE_KEY),

    // Runs `assertContentIntegrity`, so a duplicate slug shows up here.
    content: await probe(async () => {
      const { TOPICS, TOTAL_SUBTOPICS } = await import("@/content");
      return { topics: TOPICS.length, subtopics: TOTAL_SUBTOPICS };
    }),

    // Credential parsing happens inside `adminAuth()`; a mangled private key
    // fails here and nowhere else.
    firebaseAdmin: await probe(async () => {
      const { adminAuth } = await import("@/lib/firebase/admin");
      return { app: adminAuth().app.name };
    }),

    // Proves the connection string works *and* that migrations ran against the
    // database this deployment actually points at.
    database: await probe(async () => {
      const { getDb } = await import("@/lib/db");
      const { sql } = await import("drizzle-orm");
      const result = await getDb().execute(
        sql`select count(*)::int as rows from interview_prep.subtopic_state`,
      );
      return { subtopicStateRows: result.rows[0]?.rows ?? null };
    }),

    // The exact path `/` takes before it decides to show the sign-in screen.
    session: await probe(async () => {
      const { getSessionUser } = await import("@/lib/auth/session");
      const user = await getSessionUser();
      return user ? "valid session cookie" : "no session cookie";
    }),
  });
}

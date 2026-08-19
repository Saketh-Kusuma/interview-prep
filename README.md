# Interview Prep

A personal interview-readiness tracker: 420 subtopics across 16 topics, ordered by
how often interviews actually ask about them. Each topic is an accordion; each
subtopic carries a 4-state confidence level and your own note.

- **Content** lives in `content/topics/*.ts` — version controlled, so the syllabus
  is diffable and needs no database query.
- **Progress** lives in Neon Postgres, keyed by `(user_id, subtopic_id)`.
- **Auth** is Firebase (Google sign-in) exchanged for an HttpOnly session cookie,
  so the browser never holds a long-lived credential.

## Setup

### 1. Neon

1. Create a project at [console.neon.tech](https://console.neon.tech).
2. Copy the **pooled** connection string from Dashboard → Connection Details.
3. Paste it as `DATABASE_URL` in `.env.local`.

The app creates and owns its own Postgres schema, `interview_prep`, so pointing it
at a database shared with other projects is safe — `public` is never touched, and
`schemaFilter` in `drizzle.config.ts` stops drizzle-kit from treating other
projects' tables as drift it should drop.

### 2. Firebase

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. **Authentication → Sign-in method → Google → Enable.**
3. **Project settings → General → Your apps → Web app.** Copy `apiKey`,
   `authDomain`, `projectId`, `appId` into the four `NEXT_PUBLIC_FIREBASE_*` vars.
4. **Project settings → Service accounts → Generate new private key.** From the
   downloaded JSON, copy `project_id`, `client_email`, and `private_key` into
   `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`.
   Keep the private key quoted with its literal `\n` escapes intact.
5. **Authentication → Settings → Authorized domains** must include `localhost`
   (it does by default) plus your deployed domain.

The `NEXT_PUBLIC_*` values are public by design — they identify the project, they
don't authorize anything. The three unprefixed `FIREBASE_*` values are secrets and
must never gain a `NEXT_PUBLIC_` prefix.

### 3. Run

```bash
cp .env.example .env.local   # then fill in the values above
npm install
npm run db:migrate           # creates users + subtopic_state
npm run dev
```

## Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server on :3000 |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run db:generate` | Generate a migration from `lib/db/schema.ts` |
| `npm run db:migrate` | Apply pending migrations |
| `npm run db:studio` | Drizzle Studio |

## How it works

**Confidence, not a checkbox.** Each subtopic cycles Not started → Learning →
Confident → Mastered. Progress percentages weight Learning at half, so the number
moves as you study rather than only when you finish.

**Optimistic writes.** Clicking a chip updates the UI immediately and fires a
Server Action; a failure rolls the value back and raises a banner. The Server
Actions deliberately don't revalidate — the summary reads from client context, and
re-rendering ~420 rows on every click would cost more than the update itself.

**Search** matches subtopic titles, section and topic names, and your note text.
While a query is active the accordions are hidden rather than unmounted, so
whatever you had expanded is still expanded when you press Esc.

**Adding content.** Append to a file in `content/topics/`. Slugs are database keys,
so add and rename titles freely but never change an existing slug — that orphans
saved progress. `content/index.ts` asserts id uniqueness at module load, so a
collision fails the build instead of silently merging two subtopics.

## Known npm audit findings

`npm audit` reports 10 moderate advisories, all left in place on purpose:

- **esbuild ≤0.24.2** via `drizzle-kit` → `@esbuild-kit/*`. Dev dependency only;
  never in the production bundle. The offered fix is `drizzle-kit@0.18.1`, a major
  downgrade incompatible with `drizzle-orm@0.45`.
- **`@google-cloud/storage` / `gaxios` / `retry-request` / `teeny-request` / `uuid`**
  via `firebase-admin`. Transitive through Cloud Storage, which this app doesn't
  use — it only verifies auth tokens. The offered fix is `firebase-admin@10.3.0`,
  four majors back from 14.2.0.

Both chains are reachable only by code paths this app never executes. Re-check when
`drizzle-kit` and `firebase-admin` ship updated transitives.
# interview-prep

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> Keep the `@AGENTS.md` import above: `next dev` writes its Next.js agent-rules
> block to `AGENTS.md` and skips this file while `AGENTS.md` hosts it (see
> `writeAgentFiles` in `node_modules/next/dist/server/lib/generate-agent-files.js`),
> so this file is safe to edit but doesn't carry those rules itself.

## Commands

```bash
npm run dev          # dev server on :3000 (Turbopack)
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run build        # production build (also runs TypeScript)
```

```bash
npm run db:generate  # write a migration from lib/db/schema.ts
npm run db:migrate   # apply pending migrations
npm run db:studio    # Drizzle Studio
```

No test runner is configured — there are no test files and no test dependency.
Verification here means `typecheck` + `lint` + `build`, and driving the running
app in the browser.

`.claude/launch.json` defines the `interview-prep` dev server for the preview
tools; start it that way rather than backgrounding `npm run dev` by hand. Don't
run `next build` while the dev server is up — both write `.next`.

## Architecture

### Two data planes, joined by a slug

The **syllabus** is code (`content/topics/*.ts`), so it's diffable and needs no
query to render. The **database** holds only per-user progress. The join key is
the composite id built by `subtopicId()` in `content/types.ts`:
`topic.section.subtopic` (e.g. `core-java.basics.jdk-jre-jvm`), stored as
`subtopic_state.subtopic_id`.

Consequence that governs all content edits: **slugs are database keys.** Adding
subtopics and rewording `title` are free; changing an existing `slug` silently
orphans saved rows. `content/index.ts` calls `assertContentIntegrity(TOPICS)` at
module load (unconditionally — Next builds with `NODE_ENV=production`), so a
duplicate topic slug, duplicate rank, duplicate subtopic id, or empty section
fails the build instead of merging two subtopics in the database.

`content/index.ts` is the only import surface: `TOPICS`, `SEARCH_INDEX`,
`ALL_SUBTOPIC_IDS`, `TOTAL_SUBTOPICS`, `BAND_META`/`BAND_ORDER`,
`topicSubtopicIds()`, plus `export * from "./types"`.

### Progress model

`Status` is an ordered 0–3 enum (`STATUS` in `content/types.ts`), not a boolean —
`>=` comparisons are meaningful and `statusWeight()` counts Learning as 0.5 so
percentages move while studying. Every percentage and count in the UI comes from
one function, `computeStats(ids, entries)` in `lib/stats.ts`, called with a
different id slice per surface (whole syllabus, one band, one topic). A missing
key means "not started"; rows are clamped on read in `lib/db/progress.ts`.

### Write path is optimistic and deliberately non-revalidating

`components/progress-provider.tsx` owns all progress state for the page. It
applies the change locally through a `latest` ref (so callbacks don't depend on
the newest render), fires the Server Action in the background, and rolls back
plus raises `ErrorBanner` on failure. The actions in `app/actions/progress.ts`
**intentionally do not call `revalidatePath`** — the summary already reads from
client context, and re-rendering ~420 rows per chip click would cost more than
the write. A reload re-reads the database.

Server Actions are public endpoints, so both validate before touching Postgres:
`subtopicId` against `ALL_SUBTOPIC_IDS`, `status` through `isStatus()`.

### Auth: Firebase popup in, HttpOnly cookie out

1. `components/sign-in-button.tsx` — Google popup, gets an ID token, POSTs it to
   `/api/auth/session`, then **signs out of client Firebase** so the cookie is
   the only credential.
2. `app/api/auth/session/route.ts` — `verifyIdToken(token, true)`, rejects an
   `auth_time` older than `MAX_ID_TOKEN_AGE_SECONDS` (5 min), mints a 14-day
   session cookie. `DELETE` clears it.
3. `lib/auth/session.ts` — `getSessionUser()` verifies the cookie with
   revocation checking; wrapped in `cache()` so several Server Components share
   one verification. `photoURL` comes from the `picture` claim (not stored).
4. `lib/auth/current-user.ts` — `getCurrentUser()` upserts the local `users` row
   and adds `{ id, createdAt }`. Use `requireCurrentUser()` in Server Actions.

Server-only modules (`lib/db/*`, `lib/auth/*`, `lib/firebase/admin.ts`) start
with `import "server-only"`. `getDb()` and `adminAuth()` are lazy so a build
doesn't need credentials — only serving a request that uses them does.

### Database lives in its own Postgres schema

`lib/db/schema.ts` puts both tables under `pgSchema("interview_prep")`, and
`drizzle.config.ts` sets `schemaFilter: ["interview_prep"]`. The Neon database
is shared with unrelated projects that own `public` tables (including a
different `public.users`). Never write an unqualified query assuming `public`,
and never drop the schema filter — drizzle-kit would offer to delete the other
projects' tables as drift. `drizzle.config.ts` loads `.env.local` via
`@next/env`'s `loadEnvConfig` because drizzle-kit runs outside Next.

### UI conventions

- Topics are native `<details>` (`components/topic-accordion.tsx`). All content
  stays in the DOM so Ctrl+F finds subtopics inside collapsed topics.
- `components/search-panel.tsx` hides the accordions with a `hidden` class
  rather than unmounting them — `<details>` open state lives in the DOM and
  unmounting would collapse everything on every query.
- A `"use server"` module may only export async functions; shared constants go
  in `lib/limits.ts` (that's why `NOTE_MAX_LENGTH` lives there).
- Tailwind 4 with no `tailwind.config.js`. Colours are CSS variables in
  `app/globals.css` (`:root` + a `prefers-color-scheme: dark` block) exposed to
  utilities through `@theme inline` — use `bg-surface`, `text-muted`,
  `border-border-strong`, `text-band-red`, `text-mastered`, not raw palette
  classes. Light-mode `--status-*` values are darker than their `--band-*`
  counterparts on purpose: they tint 11px text and must clear 4.5:1 on white.

## Gotchas

- **Measuring collapsed `<details>` lies.** `::details-content` gets
  `content-visibility: hidden`, so `getComputedStyle` and
  `getBoundingClientRect` return stale values for anything inside a closed
  topic. Take contrast or layout measurements inside `details[open]` only.
- **Rapid programmatic clicks on a status chip collapse into one step**, because
  `StatusChip` computes the next status from its render-time prop. Real clicks
  are separate tasks and cycle correctly; when scripting the browser, click in
  separate round trips.
- **Secrets.** The Firebase service-account JSON sits at the repo root and is
  gitignored via `*firebase-adminsdk*.json` — don't commit it or read it into
  context. `FIREBASE_PRIVATE_KEY` stays quoted with literal `\n` escapes
  (unescaped in `lib/firebase/admin.ts`). The three unprefixed `FIREBASE_*` vars
  must never gain a `NEXT_PUBLIC_` prefix; the four `NEXT_PUBLIC_FIREBASE_*`
  ones are public by design.
- **`npm audit`'s 10 moderate advisories are accepted, not pending.** Both
  chains (esbuild via drizzle-kit, Cloud Storage transitives via firebase-admin)
  and why the offered downgrades are refused are documented at the end of
  `README.md`. Don't "fix" them by downgrading.
- `PLAN.md` is the original build plan, kept for provenance; it is not a live
  spec. `README.md` holds Neon/Firebase setup steps.

# Interview Prep Tracker — Implementation Plan

**Stack:** Next.js (App Router) · Neon Postgres · Drizzle ORM · Firebase Auth · Tailwind
**Scope:** ~390 subtopics across 15 topics, 4-state confidence tracking, personal notes per subtopic.
**Status:** plan awaiting sign-off. No code written yet.

---

## 1. Decisions already made

| Decision | Choice | Why |
|---|---|---|
| Framework | Next.js App Router | Server Components load progress in one round trip; Server Actions handle writes without hand-rolled API routes. |
| Database | Neon Postgres | Serverless, generous free tier, real SQL — which doubles as SQL practice (priority 5). |
| Auth | Firebase Auth (Google sign-in) | Client SDK for login, `firebase-admin` server-side to verify ID tokens. |
| Accordion order | Your priority table | Matches the `Status` column you already designed. |
| Multithreading | Promoted to its own topic | Confirmed. Core Java would otherwise hit ~80 subtopics. |
| Web Fundamentals | Ranked 7 | Confirmed. |
| DSA | **Your syllabus** (section 1) | Confirmed — not authored by me. |
| Docker / AWS | I author it | The only topic with no content you supplied. |
| Progress model | 4-state confidence, not a binary checkbox | Your pick. See §4. |

### Decisions I made on your behalf (override any of these)

- **ORM: Drizzle, not Prisma.** Lighter cold starts on serverless, first-class Neon HTTP driver support, SQL-shaped queries so the schema stays legible. Prisma's engine adds weight to every serverless invocation.
- **Content lives in the repo, not the database.** The ~390 subtopics are a typed TS file; Neon stores *only* your progress and notes. Content stays version-controlled and diffable, page loads need no content query, and there's no seed/migration dance every time you reword a subtopic. Tradeoff: editing the syllabus requires a redeploy.
- **Uid-keyed from day one.** Every row keys off your Firebase uid — single-user in practice, multi-user by construction. Costs nothing now, avoids a migration later.
- **`Learning` counts as half.** Progress % = `(confident + mastered + 0.5 × learning) / total`. Prevents a wall of 0% while you're mid-topic.
- **Multithreading placed at rank 12.** ⚠️ You said "promote" without naming a rank. I put it at the end of the 🟠 band: it's ⭐⭐⭐⭐ for Java backend rounds but narrower than the 🔴 six. If you want Java-first ordering, moving it to rank 2 (right after Core Java) is a one-field change.

---

## 2. Topic structure (15 accordions)

| Rank | Topic | Band | Stars | Sections | Subtopics |
|---|---|---|---|---|---|
| 1 | Core Java | 🔴 | ⭐⭐⭐⭐⭐ | Basics · OOP · Collections · Exceptions · Java 8+ | ~65 |
| 2 | JavaScript | 🔴 | ⭐⭐⭐⭐⭐ | Language core · Async · DOM events · Array methods | ~20 |
| 3 | React | 🔴 | ⭐⭐⭐⭐⭐ | Fundamentals · Hooks · State mgmt · API integration · Auth · Performance · Architecture | ~47 |
| 4 | DSA | 🔴 | ⭐⭐⭐⭐⭐ | Core topics · Important patterns | 23 |
| 5 | SQL | 🔴 | ⭐⭐⭐⭐⭐ | Must know · Joins · Advanced | ~30 |
| 6 | Spring Boot | 🔴 | ⭐⭐⭐⭐⭐ | Spring Core · Spring Boot · REST API | ~40 |
| 7 | Web Fundamentals | 🟠 | ⭐⭐⭐⭐ | HTTP/HTTPS · Browser | ~17 |
| 8 | Node + Express | 🟠 | ⭐⭐⭐⭐ | Node.js · Event Loop · Express | ~26 |
| 9 | MongoDB + Mongoose | 🟠 | ⭐⭐⭐⭐ | Fundamentals · Queries · Interview topics · Mongoose | ~37 |
| 10 | Spring Security / JWT | 🟠 | ⭐⭐⭐⭐ | Core · Flow | ~11 |
| 11 | JPA / Hibernate | 🟠 | ⭐⭐⭐⭐ | Entities · Relationships · Queries · Transactions | ~13 |
| 12 | Java Multithreading | 🟠 | ⭐⭐⭐⭐ | Threads · Synchronisation · Executors | ~15 |
| 13 | Git / GitHub | 🟡 | ⭐⭐⭐ | Basics · Branching · Collaboration | ~13 |
| 14 | System Design | 🟡 | ⭐⭐⭐ | Concepts · Design exercises | ~15 |
| 15 | Docker / AWS | 🟡 | ⭐⭐⭐ | Docker · AWS *(authored)* | ~22 |

### Restructures applied

1. **JPA/Hibernate split out of Spring Boot** — your section 5 contained it, but your table ranks it separately from Spring Boot.
2. **JavaScript promoted out of Web Fundamentals** — it was a subsection of section 13 but is priority 2.
3. **Multithreading promoted** to its own topic (was section 4, absent from your table).
4. **Web Fundamentals** = the remainder of section 13 after JavaScript moved out, ranked 7.

**Note on numbering:** your document's section numbers (1–14) are independent of the priority table. DSA is document section 1 but priority 4. The app orders by *priority*; document numbers are discarded.

---

## 3. DSA content (your section 1)

Topic note: *"MUST Know — common foundation for both Java and MERN interviews."*

**Core topics (16)** — Arrays · Strings · HashMap / HashSet · Two Pointers · Sliding Window · Binary Search · Sorting · Stack & Queue · Linked List · Recursion · Trees / BST · Heap / Priority Queue · Graph basics · Greedy · Dynamic Programming basics · Time & Space Complexity

**Important patterns (7)** — Frequency counting · Prefix Sum · Kadane's Algorithm · Fast & Slow Pointer · Merge Intervals · Binary Search on Answer · BFS / DFS

I will **not** pad this with extra subtopics. If you later want depth (backtracking, union-find, bit manipulation, topological sort), say so and I'll add them flagged as authored.

---

## 4. Content I'll author

Only Docker / AWS. Marked with an "authored" badge in the UI so it's distinguishable from your syllabus.

**Docker (~11)** — image vs container · Dockerfile · layers & caching · build/run · volumes · ports · networks · Compose · multi-stage builds · `.dockerignore` · registries
**AWS (~11)** — EC2 · S3 · RDS · IAM · VPC basics · Lambda · CloudFront · Elastic Beanstalk · deploying Spring Boot · deploying Node · secrets & env config

---

## 5. Progress model

| State | Value | Meaning |
|---|---|---|
| Not started | 0 | Untouched |
| Learning | 1 | Read it, can't explain it yet |
| Confident | 2 | Can explain it in an interview |
| Mastered | 3 | Can explain *and* whiteboard it cold |

A 4-segment control per subtopic row. Rolls up: subtopic → section → topic → the `Status` column on your priority table. Each accordion header shows a progress ring and a stacked bar of the four states.

---

## 6. Notes & diagrams

- **Syllabus notes (~17)** — your callouts, baked into the content file, shown as a highlighted block at the top of the relevant accordion or section. E.g. *"Know these extremely well"* (Hooks), *"You should be able to explain these with real examples, not definitions"* (OOP), *"MUST Know — common foundation for both Java and MERN"* (DSA), *"Don't spend months on system design"*, *"MongoDB vs Mongoose — what's the difference?"*
- **Diagrams (7)** — monospace panels with horizontal scroll: React architecture · Collections tree · Map tree · Spring layered architecture · Spring Security JWT flow · Node event loop · Express folder structure.
- **Personal notes** — free-text per subtopic, stored in Neon, debounced autosave (~600 ms), searchable from `/notes`.

---

## 7. Data model

```
users
  id            uuid pk
  firebase_uid  text unique not null
  email         text
  created_at    timestamptz

subtopic_state
  user_id       uuid fk -> users.id
  subtopic_id   text            -- stable slug, e.g. 'dsa.patterns.kadanes-algorithm'
  status        smallint         -- 0..3
  note          text
  updated_at    timestamptz
  primary key (user_id, subtopic_id)
```

One table for status and notes — a single upsert per interaction, no joins. `subtopic_id` slugs are owned by the content file and append-only once shipped: renaming a *label* is safe, changing a *slug* orphans progress.

---

## 8. Build phases

**Phase 0 — Scaffold.** Next.js + TypeScript + Tailwind, Neon project, Drizzle config, Firebase project with Google provider, env wiring (`DATABASE_URL`, Firebase client config, service-account credentials).

**Phase 1 — Content (largest phase).** Typed content file for all 15 topics: sections, ~390 subtopics with stable slugs, 17 notes, 7 diagrams, plus authored Docker/AWS. Dev-time assertion catches duplicate slugs.

**Phase 2 — Auth.** Firebase client sign-in, ID token verification in server actions via `firebase-admin`, upsert `users` row on first login, protected layout, sign-out.

**Phase 3 — Persistence.** Drizzle schema + migration, server action to upsert status, server action to upsert notes, single query loading all state for the signed-in user.

**Phase 4 — Accordion UI.** Priority-ordered list, band colours, star ratings, expand/collapse-all, lazy-mounted subtopic lists, 4-state control with optimistic updates, notes editor, syllabus-note and diagram panels.

**Phase 5 — Dashboard.** Overall %, per-topic rings, weakest high-priority topics, "study next" weighted by priority × incompleteness, `/notes` search.

**Phase 6 — Polish.** Keyboard navigation, focus states, ARIA on accordions and the 4-state control, dark mode, loading and empty states.

---

## 9. Open questions

None blocking. One flagged call: **Multithreading at rank 12** (§1) — move it if you'd rather it sat higher.

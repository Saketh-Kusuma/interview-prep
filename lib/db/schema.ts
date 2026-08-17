import {
  index,
  pgSchema,
  primaryKey,
  smallint,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * This app's tables live in their own Postgres schema rather than `public`.
 * The Neon database is shared with unrelated projects, one of which already owns
 * a `public.users` table with a different shape. A dedicated schema keeps the
 * names from colliding and keeps drizzle-kit from ever considering those tables
 * its business (see `schemaFilter` in drizzle.config.ts).
 */
export const prep = pgSchema("interview_prep");

/**
 * One row per signed-in Firebase account. Firebase owns identity; this table
 * exists only to give progress rows a stable local foreign key.
 */
export const users = prep.table("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  firebaseUid: text("firebase_uid").notNull().unique(),
  email: text("email"),
  displayName: text("display_name"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/**
 * Progress and notes for one subtopic, for one user.
 *
 * Status and note share a table so a single upsert covers either interaction
 * and reading a whole topic needs no joins. `subtopicId` is the content slug
 * path (`core-java.oop.encapsulation`) rather than a foreign key, because the
 * syllabus lives in the repo — see content/types.ts.
 */
export const subtopicState = prep.table(
  "subtopic_state",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    subtopicId: text("subtopic_id").notNull(),
    /** 0 = not started, 1 = learning, 2 = confident, 3 = mastered. */
    status: smallint("status").notNull().default(0),
    note: text("note"),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.subtopicId] }),
    // Powers the "recently studied" list on the dashboard.
    index("subtopic_state_user_updated_idx").on(table.userId, table.updatedAt),
  ],
);

export type UserRow = typeof users.$inferSelect;
export type SubtopicStateRow = typeof subtopicState.$inferSelect;

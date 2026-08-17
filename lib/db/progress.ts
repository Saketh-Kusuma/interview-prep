import "server-only";

import { desc, eq } from "drizzle-orm";

import { STATUS, type Status } from "@/content/types";
import { getDb } from "@/lib/db";
import { subtopicState } from "@/lib/db/schema";

export type SubtopicProgress = {
  status: Status;
  note: string | null;
  updatedAt: Date;
};

/** Progress for one user, keyed by subtopic id. Absent key = not started. */
export type ProgressMap = ReadonlyMap<string, SubtopicProgress>;

export async function getProgress(userId: string): Promise<ProgressMap> {
  const rows = await getDb()
    .select({
      subtopicId: subtopicState.subtopicId,
      status: subtopicState.status,
      note: subtopicState.note,
      updatedAt: subtopicState.updatedAt,
    })
    .from(subtopicState)
    .where(eq(subtopicState.userId, userId));

  return new Map(
    rows.map((row) => [
      row.subtopicId,
      {
        // Clamp rather than trust: a stale row from an older status scale
        // shouldn't render as an out-of-range state.
        status: Math.min(Math.max(row.status, STATUS.NOT_STARTED), STATUS.MASTERED) as Status,
        note: row.note,
        updatedAt: row.updatedAt,
      },
    ]),
  );
}

/** Most recently touched subtopics, for the dashboard's "continue" list. */
export async function getRecentActivity(userId: string, limit = 8) {
  return getDb()
    .select({
      subtopicId: subtopicState.subtopicId,
      status: subtopicState.status,
      updatedAt: subtopicState.updatedAt,
    })
    .from(subtopicState)
    .where(eq(subtopicState.userId, userId))
    .orderBy(desc(subtopicState.updatedAt))
    .limit(limit);
}

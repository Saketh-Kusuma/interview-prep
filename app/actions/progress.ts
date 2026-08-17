"use server";

import { ALL_SUBTOPIC_IDS } from "@/content";
import { isStatus, type Status } from "@/content/types";
import { requireCurrentUser } from "@/lib/auth/current-user";
import { getDb } from "@/lib/db";
import { subtopicState } from "@/lib/db/schema";
import { NOTE_MAX_LENGTH } from "@/lib/limits";

/**
 * Server Actions are public endpoints, so every id is checked against the
 * syllabus before it reaches the database — otherwise a crafted call could
 * fill the table with rows no page will ever read.
 */
const VALID_SUBTOPIC_IDS = new Set(ALL_SUBTOPIC_IDS);

function assertKnownSubtopic(subtopicId: string): void {
  if (!VALID_SUBTOPIC_IDS.has(subtopicId)) {
    throw new Error(`Unknown subtopic: ${subtopicId}`);
  }
}

export async function setSubtopicStatus(
  subtopicId: string,
  status: Status,
): Promise<void> {
  assertKnownSubtopic(subtopicId);
  if (!isStatus(status)) {
    throw new Error(`Invalid status: ${String(status)}`);
  }

  const user = await requireCurrentUser();

  await getDb()
    .insert(subtopicState)
    .values({ userId: user.id, subtopicId, status })
    .onConflictDoUpdate({
      target: [subtopicState.userId, subtopicState.subtopicId],
      set: { status, updatedAt: new Date() },
    });
}

export async function setSubtopicNote(
  subtopicId: string,
  note: string,
): Promise<void> {
  assertKnownSubtopic(subtopicId);

  const trimmed = note.trim();
  if (trimmed.length > NOTE_MAX_LENGTH) {
    throw new Error(`Note is longer than ${NOTE_MAX_LENGTH} characters.`);
  }

  const user = await requireCurrentUser();
  // Empty means "no note", stored as NULL so the UI can distinguish it from an
  // intentionally blank-looking note.
  const value = trimmed.length > 0 ? trimmed : null;

  await getDb()
    .insert(subtopicState)
    .values({ userId: user.id, subtopicId, note: value })
    .onConflictDoUpdate({
      target: [subtopicState.userId, subtopicState.subtopicId],
      set: { note: value, updatedAt: new Date() },
    });
}

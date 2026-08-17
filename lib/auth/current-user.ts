import "server-only";

import { cache } from "react";

import { getSessionUser, type SessionUser } from "@/lib/auth/session";
import { getDb } from "@/lib/db";
import { users } from "@/lib/db/schema";

export type CurrentUser = SessionUser & { id: string; createdAt: Date };

/**
 * Maps the Firebase session onto a local user row, creating it on first sign-in
 * and refreshing the cached profile fields on later ones.
 */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const session = await getSessionUser();
  if (!session) return null;

  const [row] = await getDb()
    .insert(users)
    .values({
      firebaseUid: session.uid,
      email: session.email,
      displayName: session.displayName,
    })
    .onConflictDoUpdate({
      target: users.firebaseUid,
      set: { email: session.email, displayName: session.displayName },
    })
    .returning({ id: users.id, createdAt: users.createdAt });

  return { ...session, id: row.id, createdAt: row.createdAt };
});

/** For Server Actions, where an unauthenticated call is a bug or an attack. */
export async function requireCurrentUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not signed in.");
  return user;
}

import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";

import { adminAuth } from "@/lib/firebase/admin";

export const SESSION_COOKIE = "session";

/** Two weeks, the maximum Firebase allows for a session cookie. */
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 14;

/**
 * An ID token older than this is rejected when trading it for a session cookie,
 * so a leaked-but-stale token can't be replayed into a long-lived session.
 */
export const MAX_ID_TOKEN_AGE_SECONDS = 5 * 60;

export type SessionUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

/**
 * The signed-in user, or null. Wrapped in `cache()` so several Server
 * Components on one page share a single cookie verification.
 */
export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    // `true` also checks Firebase for revocation, so signing out everywhere or
    // disabling the account takes effect on the next request.
    const claims = await adminAuth().verifySessionCookie(token, true);
    return {
      uid: claims.uid,
      email: claims.email ?? null,
      displayName: typeof claims.name === "string" ? claims.name : null,
      // Google supplies the avatar in `picture`. It isn't stored locally —
      // reading it off the session keeps it fresh and needs no extra column.
      photoURL: typeof claims.picture === "string" ? claims.picture : null,
    };
  } catch {
    // Expired, revoked, or tampered with — all indistinguishable from signed out.
    return null;
  }
});

export function sessionCookieOptions(maxAge: number) {
  return {
    name: SESSION_COOKIE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

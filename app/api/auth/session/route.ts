import { NextResponse } from "next/server";

import {
  MAX_ID_TOKEN_AGE_SECONDS,
  SESSION_MAX_AGE_SECONDS,
  sessionCookieOptions,
} from "@/lib/auth/session";
import { adminAuth } from "@/lib/firebase/admin";

/**
 * Trades a fresh Firebase ID token for an HttpOnly session cookie.
 *
 * The browser signs in with Firebase, then posts the ID token here exactly
 * once. Keeping the long-lived credential in an HttpOnly cookie means page
 * scripts can't read it, and Server Components can authenticate without a
 * client round trip.
 */
export async function POST(request: Request) {
  let idToken: unknown;
  try {
    ({ idToken } = await request.json());
  } catch {
    return NextResponse.json({ error: "Malformed body." }, { status: 400 });
  }

  if (typeof idToken !== "string" || idToken.length === 0) {
    return NextResponse.json({ error: "Missing idToken." }, { status: 400 });
  }

  try {
    const claims = await adminAuth().verifyIdToken(idToken, true);

    // Only a just-completed sign-in may open a session.
    const ageSeconds = Date.now() / 1000 - claims.auth_time;
    if (ageSeconds > MAX_ID_TOKEN_AGE_SECONDS) {
      return NextResponse.json(
        { error: "Sign-in is too old. Please sign in again." },
        { status: 401 },
      );
    }

    const cookie = await adminAuth().createSessionCookie(idToken, {
      expiresIn: SESSION_MAX_AGE_SECONDS * 1000,
    });

    const response = NextResponse.json({ ok: true });
    response.cookies.set({
      ...sessionCookieOptions(SESSION_MAX_AGE_SECONDS),
      value: cookie,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "Invalid token." }, { status: 401 });
  }
}

/**
 * Sign out. Clearing the cookie is enough: the cookie is the only credential
 * the server accepts, and it can't be read back out of the browser.
 */
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({ ...sessionCookieOptions(0), value: "" });
  return response;
}

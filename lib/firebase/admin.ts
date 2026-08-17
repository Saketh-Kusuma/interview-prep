import "server-only";

import { cert, getApp, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `${name} is not set. Copy .env.example to .env.local and fill in the Firebase Admin values.`,
    );
  }
  return value;
}

function adminApp(): App {
  if (getApps().length > 0) return getApp();

  return initializeApp({
    credential: cert({
      projectId: requireEnv("FIREBASE_PROJECT_ID"),
      clientEmail: requireEnv("FIREBASE_CLIENT_EMAIL"),
      // Env files can't hold real newlines, so the key is stored with literal
      // `\n` sequences and unescaped here.
      privateKey: requireEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
    }),
  });
}

/**
 * Server-side Firebase Auth. Used to verify ID tokens and to mint/verify the
 * HttpOnly session cookie. Never import this from a Client Component — the
 * `server-only` import above turns that into a build error.
 */
export function adminAuth(): Auth {
  return getAuth(adminApp());
}

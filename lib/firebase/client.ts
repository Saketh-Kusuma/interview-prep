"use client";

import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";

/**
 * Browser-side Firebase. These `NEXT_PUBLIC_*` values are inlined into the
 * client bundle and are meant to be public — Firebase security comes from the
 * server verifying ID tokens (see lib/firebase/admin.ts), not from hiding these.
 *
 * Each value is read as a literal `process.env.X` so Next can statically
 * replace it at build time; a dynamic lookup would come back undefined.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function firebaseApp(): FirebaseApp {
  if (getApps().length > 0) return getApp();

  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    throw new Error(
      "Firebase client config is missing. Copy .env.example to .env.local and fill in the NEXT_PUBLIC_FIREBASE_* values.",
    );
  }

  return initializeApp(firebaseConfig);
}

/** Lazy so a missing config surfaces on sign-in, not on first page render. */
export function clientAuth(): Auth {
  return getAuth(firebaseApp());
}

export function googleProvider(): GoogleAuthProvider {
  const provider = new GoogleAuthProvider();
  // Always show the chooser so switching accounts doesn't silently reuse one.
  provider.setCustomParameters({ prompt: "select_account" });
  return provider;
}

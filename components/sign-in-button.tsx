"use client";

import { signInWithPopup, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { clientAuth, googleProvider } from "@/lib/firebase/client";

export function SignInButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signIn() {
    setBusy(true);
    setError(null);

    try {
      const auth = clientAuth();
      const credential = await signInWithPopup(auth, googleProvider());
      const idToken = await credential.user.getIdToken();

      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(body?.error ?? "Sign-in failed. Please try again.");
      }

      // The HttpOnly cookie is now the credential. Dropping the client-side
      // Firebase session avoids keeping two sources of truth in sync.
      await signOut(auth);
      router.refresh();
    } catch (cause) {
      const code =
        typeof cause === "object" && cause !== null && "code" in cause
          ? String((cause as { code: unknown }).code)
          : "";

      if (
        code === "auth/popup-closed-by-user" ||
        code === "auth/cancelled-popup-request"
      ) {
        setError(null);
      } else {
        setError(cause instanceof Error ? cause.message : "Sign-in failed.");
      }
      setBusy(false);
      return;
    }

    setBusy(false);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={signIn}
        disabled={busy}
        className="inline-flex items-center gap-2.5 rounded-lg border border-border-strong bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:border-foreground/40 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none disabled:opacity-60"
      >
        <svg viewBox="0 0 18 18" aria-hidden="true" className="size-4">
          <path
            fill="#4285F4"
            d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.62Z"
          />
          <path
            fill="#34A853"
            d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.34A9 9 0 0 0 9 18Z"
          />
          <path
            fill="#FBBC05"
            d="M3.97 10.72a5.41 5.41 0 0 1 0-3.44V4.94H.96a9 9 0 0 0 0 8.12l3.01-2.34Z"
          />
          <path
            fill="#EA4335"
            d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.94l3.01 2.34C4.68 5.16 6.66 3.58 9 3.58Z"
          />
        </svg>
        {busy ? "Signing in…" : "Continue with Google"}
      </button>

      {error && (
        <p role="alert" className="max-w-xs text-center text-[13px] text-band-red">
          {error}
        </p>
      )}
    </div>
  );
}

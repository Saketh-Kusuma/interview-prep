"use client";

import { signInWithPopup, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { AppMark } from "@/components/app-mark";
import { clientAuth, googleProvider } from "@/lib/firebase/client";

/**
 * Google is done but the server hasn't sent the signed-in tree yet. Without
 * this the sign-in screen sits there looking untouched for the length of a
 * round trip, which reads as "the click did nothing".
 */
function SigningInOverlay() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-background/80 px-6 backdrop-blur-md transition-opacity duration-300 starting:opacity-0"
    >
      {/* Same accent wash as the sign-in screen, so the swap feels continuous. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[22rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative grid size-[4.5rem] place-items-center">
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-pulse rounded-full bg-accent/15 blur-md"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border-2 border-border-strong/60"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-accent border-r-accent/40"
        />
        <AppMark className="size-10" />
      </div>

      <div className="relative text-center">
        {/* Carries the message on its own: the global reduced-motion rule
            freezes the ring, so the copy can't be decorative. */}
        <p className="text-[15px] font-medium tracking-tight">Signing you in…</p>
        <p className="mt-1.5 text-[13px] text-muted">Loading your progress</p>
      </div>
    </div>
  );
}

type Phase = "idle" | "popup" | "entering";

export function SignInButton() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const stallTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // A successful sign-in unmounts this component, which clears the stall timer
  // below; this only fires if the tree somehow sticks around.
  useEffect(
    () => () => {
      if (stallTimer.current) clearTimeout(stallTimer.current);
    },
    [],
  );

  const busy = phase !== "idle";

  async function signIn() {
    setPhase("popup");
    setError(null);

    try {
      const auth = clientAuth();
      const credential = await signInWithPopup(auth, googleProvider());

      // Google is behind us — everything from here is our own latency, so take
      // over the screen instead of leaving the login page up.
      setPhase("entering");

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
      setPhase("idle");
      return;
    }

    // Deliberately stay in "entering": the refresh above is in flight and the
    // server render replaces this tree. Dropping back to idle here is what used
    // to flash the login page. The timer is only a dead-end guard.
    stallTimer.current = setTimeout(() => {
      setPhase("idle");
      setError("Signed in, but the page didn't load. Please reload.");
    }, 15_000);
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

      {phase === "entering" && <SigningInOverlay />}
    </div>
  );
}

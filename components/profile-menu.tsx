"use client";

import { useEffect, useRef, useState } from "react";

import { useProgress } from "@/components/progress-provider";
import { SignOutButton } from "@/components/sign-out-button";
import { UserAvatar } from "@/components/user-avatar";
import { computeStats } from "@/lib/stats";

export type ProfileUser = {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  /** Preformatted on the server so client and server render the same string. */
  memberSince: string;
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-[12px]">
      <dt className="text-muted">{label}</dt>
      <dd className="font-mono tabular-nums">{value}</dd>
    </div>
  );
}

/**
 * Avatar in the header that opens the profile card. A popover rather than a
 * permanent sidebar: the tracker is one long column, and a sidebar would take
 * width from the subtopic titles that need it most.
 */
export function ProfileMenu({
  user,
  allIds,
}: {
  user: ProfileUser;
  allIds: readonly string[];
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { entries } = useProgress();
  const stats = computeStats(allIds, entries);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      // Escape should hand focus back rather than dropping it on <body>.
      triggerRef.current?.focus();
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const name = user.displayName ?? user.email ?? "Signed in";

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={`Account: ${name}`}
        className="flex items-center gap-2 rounded-full border border-border bg-surface py-1 pr-2 pl-1 transition-colors hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
      >
        <UserAvatar
          photoURL={user.photoURL}
          displayName={user.displayName}
          email={user.email}
          size={28}
        />
        <span className="hidden max-w-[9rem] truncate text-[13px] font-medium sm:inline">
          {user.displayName?.split(" ")[0] ?? name}
        </span>
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={`size-3.5 text-muted transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M5 8l5 5 5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Account"
          className="absolute right-0 z-40 mt-2 w-72 origin-top-right rounded-xl border border-border bg-surface p-4 shadow-xl"
        >
          <div className="flex items-center gap-3">
            <UserAvatar
              photoURL={user.photoURL}
              displayName={user.displayName}
              email={user.email}
              size={44}
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{name}</p>
              {user.email && (
                <p className="truncate text-[12px] text-muted">{user.email}</p>
              )}
            </div>
          </div>

          <dl className="mt-4 space-y-1.5 border-t border-border pt-3">
            <Row label="Interview readiness" value={`${stats.percent}%`} />
            <Row label="Can explain" value={`${stats.confident}/${stats.total}`} />
            <Row label="Mastered" value={String(stats.mastered)} />
            <Row label="Notes written" value={String(stats.withNotes)} />
          </dl>

          <dl className="mt-3 space-y-1.5 border-t border-border pt-3">
            <Row label="Signed in with" value="Google" />
            <Row label="Tracking since" value={user.memberSince} />
          </dl>

          <div className="mt-3 border-t border-border pt-3">
            <SignOutButton />
          </div>
        </div>
      )}
    </div>
  );
}

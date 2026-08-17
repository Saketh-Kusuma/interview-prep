"use client";

import { useProgress } from "@/components/progress-provider";

/**
 * Surfaces a failed save. Progress updates apply instantly and reconcile in the
 * background, so without this a dropped connection would look like a success.
 */
export function ErrorBanner() {
  const { error, dismissError } = useProgress();
  if (!error) return null;

  return (
    <div
      role="alert"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-md items-start gap-3 rounded-lg border border-band-red/50 bg-surface p-3 text-[13px] shadow-lg"
    >
      <span className="flex-1">{error}</span>
      <button
        type="button"
        onClick={dismissError}
        className="shrink-0 rounded px-1 text-muted transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
      >
        Dismiss
      </button>
    </div>
  );
}

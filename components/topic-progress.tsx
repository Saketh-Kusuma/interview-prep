"use client";

import { ProgressBar } from "@/components/progress-bar";
import { useProgress } from "@/components/progress-provider";
import { computeStats } from "@/lib/stats";

/** Live counter shown in a topic's accordion header. */
export function TopicProgressBadge({ ids }: { ids: readonly string[] }) {
  const { entries } = useProgress();
  const stats = computeStats(ids, entries);

  return (
    <div className="flex shrink-0 items-center gap-2">
      <span className="hidden font-mono text-[11px] tabular-nums text-muted sm:inline">
        {stats.confident}/{stats.total}
      </span>
      <ProgressBar stats={stats} className="w-12 sm:w-24" />
      <span className="w-8 text-right font-mono text-[11px] tabular-nums text-muted">
        {stats.percent}%
      </span>
    </div>
  );
}

/** Compact "confident / total" for a section heading. */
export function SectionProgressCount({ ids }: { ids: readonly string[] }) {
  const { entries } = useProgress();
  const stats = computeStats(ids, entries);

  return (
    <span className="font-mono text-[11px] tabular-nums text-muted">
      {stats.confident}/{stats.total}
    </span>
  );
}

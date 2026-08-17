"use client";

import { ProgressBar } from "@/components/progress-bar";
import { useProgress } from "@/components/progress-provider";
import { STATUS, STATUS_META, type Status } from "@/content/types";
import { computeStats } from "@/lib/stats";

export type BandGroup = {
  key: string;
  dot: string;
  label: string;
  ids: readonly string[];
};

const LEGEND: readonly Status[] = [
  STATUS.LEARNING,
  STATUS.CONFIDENT,
  STATUS.MASTERED,
];

export function SummaryPanel({
  allIds,
  groups,
}: {
  allIds: readonly string[];
  groups: readonly BandGroup[];
}) {
  const { entries } = useProgress();
  const overall = computeStats(allIds, entries);

  return (
    <section className="rounded-xl border border-border bg-surface p-4 sm:p-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-[13px] font-medium tracking-wide text-muted uppercase">
            Interview readiness
          </h2>
          <p className="mt-1 text-sm text-muted">
            <span className="font-medium text-foreground">
              {overall.confident}
            </span>{" "}
            of {overall.total} subtopics you can explain
            {overall.withNotes > 0 && ` · ${overall.withNotes} noted`}
          </p>
        </div>
        <span className="font-mono text-3xl leading-none tabular-nums">
          {overall.percent}
          <span className="text-lg text-muted">%</span>
        </span>
      </div>

      <ProgressBar stats={overall} className="mt-3" />

      <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px]">
        {LEGEND.map((status) => {
          const stats =
            status === STATUS.MASTERED
              ? overall.mastered
              : status === STATUS.CONFIDENT
                ? overall.confident - overall.mastered
                : overall.started - overall.confident;

          return (
            <div key={status} className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className={`size-2 rounded-full ${
                  status === STATUS.MASTERED
                    ? "bg-mastered"
                    : status === STATUS.CONFIDENT
                      ? "bg-confident"
                      : "bg-learning"
                }`}
              />
              <dt className="text-muted">{STATUS_META[status].label}</dt>
              <dd className="font-mono tabular-nums">{stats}</dd>
            </div>
          );
        })}
        <div className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-border-strong"
          />
          <dt className="text-muted">Not started</dt>
          <dd className="font-mono tabular-nums">
            {overall.total - overall.started}
          </dd>
        </div>
      </dl>

      <ul className="mt-4 space-y-2 border-t border-border pt-3">
        {groups.map((group) => {
          const stats = computeStats(group.ids, entries);
          return (
            <li key={group.key} className="flex items-center gap-2 text-[12px]">
              <span aria-hidden="true">{group.dot}</span>
              <span className="min-w-0 flex-1 truncate text-muted">
                {group.label}
              </span>
              <span className="font-mono tabular-nums text-muted">
                {stats.confident}/{stats.total}
              </span>
              <ProgressBar stats={stats} className="w-20 sm:w-32" />
              <span className="w-8 text-right font-mono tabular-nums text-muted">
                {stats.percent}%
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

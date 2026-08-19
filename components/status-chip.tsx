"use client";

import { STATUS, STATUS_META, type Status } from "@/content/types";

const ORDER: readonly Status[] = [
  STATUS.NOT_STARTED,
  STATUS.LEARNING,
  STATUS.CONFIDENT,
  STATUS.MASTERED,
];

const CHIP_CLASSES: Record<Status, string> = {
  [STATUS.NOT_STARTED]:
    "border-border-strong text-muted hover:border-foreground/40 hover:text-foreground",
  [STATUS.LEARNING]: "border-learning/60 bg-learning/15 text-learning",
  [STATUS.CONFIDENT]: "border-confident/60 bg-confident/15 text-confident",
  [STATUS.MASTERED]: "border-mastered/60 bg-mastered/20 text-mastered",
};

function step(status: Status, delta: number): Status {
  const index = ORDER.indexOf(status);
  return ORDER[(index + delta + ORDER.length) % ORDER.length];
}

/**
 * One tap advances the state; arrow keys move either direction. A cycling
 * control keeps 400-plus rows scannable, so the label carries the full state so
 * screen readers aren't left guessing what the letter means.
 */
export function StatusChip({
  status,
  label,
  saving,
  onChange,
}: {
  status: Status;
  /** The subtopic title, used to make the accessible name unambiguous. */
  label: string;
  saving: boolean;
  onChange: (status: Status) => void;
}) {
  const meta = STATUS_META[status];
  const next = STATUS_META[step(status, 1)];

  return (
    <button
      type="button"
      onClick={() => onChange(step(status, 1))}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowUp") {
          event.preventDefault();
          onChange(step(status, 1));
        } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
          event.preventDefault();
          onChange(step(status, -1));
        }
      }}
      title={`${meta.label} — ${meta.hint}. Click for ${next.label.toLowerCase()}.`}
      aria-label={`${label}: ${meta.label}. Activate to set ${next.label.toLowerCase()}.`}
      data-saving={saving ? "" : undefined}
      className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border text-[11px] font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none data-saving:animate-pulse ${CHIP_CLASSES[status]}`}
    >
      <span aria-hidden="true">{meta.short}</span>
    </button>
  );
}

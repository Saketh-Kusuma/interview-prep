import { STATUS, statusWeight, type Status } from "@/content/types";

export type Entry = { status: Status; note: string | null };

/** Progress keyed by subtopic id. A missing key means "not started". */
export type ProgressRecord = Readonly<Record<string, Entry>>;

export const EMPTY_ENTRY: Entry = { status: STATUS.NOT_STARTED, note: null };

export type Stats = {
  total: number;
  /** Anything past "not started". */
  started: number;
  /** Confident or mastered — the bar that matters before an interview. */
  confident: number;
  mastered: number;
  withNotes: number;
  /** Weighted completion, 0–100. See `statusWeight`. */
  percent: number;
};

export function computeStats(
  ids: readonly string[],
  entries: ProgressRecord,
): Stats {
  let started = 0;
  let confident = 0;
  let mastered = 0;
  let withNotes = 0;
  let weight = 0;

  for (const id of ids) {
    const entry = entries[id];
    if (!entry) continue;

    if (entry.status >= STATUS.LEARNING) started += 1;
    if (entry.status >= STATUS.CONFIDENT) confident += 1;
    if (entry.status === STATUS.MASTERED) mastered += 1;
    if (entry.note) withNotes += 1;
    weight += statusWeight(entry.status);
  }

  return {
    total: ids.length,
    started,
    confident,
    mastered,
    withNotes,
    percent: ids.length === 0 ? 0 : Math.round((weight / ids.length) * 100),
  };
}

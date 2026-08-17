/**
 * Content model for the interview-prep syllabus.
 *
 * The syllabus lives in the repo (not the database) so it stays version
 * controlled and diffable, and so page loads need no content query. Neon
 * stores only per-user progress and notes, keyed by the ids built here.
 */

/** Priority band from the syllabus priority table. */
export type Band = "red" | "orange" | "yellow";

/** Emphasis markers (the ⭐ / ⭐⭐⭐ annotations in the source syllabus). */
export type Emphasis = 1 | 2 | 3;

export type Note =
  /** A prose callout carried over from the syllabus. */
  | { kind: "callout"; text: string }
  /** A question the syllabus explicitly says to be able to answer. */
  | { kind: "question"; text: string }
  /** An ASCII diagram, rendered in a monospace panel. */
  | { kind: "diagram"; label: string; ascii: string };

export type Subtopic = {
  /**
   * Stable slug. Append-only once shipped: renaming `title` is safe, but
   * changing `slug` orphans any saved progress rows pointing at the old id.
   */
  slug: string;
  title: string;
};

export type Section = {
  slug: string;
  title: string;
  emphasis?: Emphasis;
  notes?: Note[];
  subtopics: Subtopic[];
};

export type Topic = {
  slug: string;
  /** Position in the priority table, 1 = highest. */
  rank: number;
  band: Band;
  title: string;
  stars: 1 | 2 | 3 | 4 | 5;
  /**
   * True when the content was written by Claude rather than supplied in the
   * user's syllabus. Surfaced in the UI so authored content is auditable.
   */
  authored?: boolean;
  notes?: Note[];
  sections: Section[];
};

/** Fully-qualified id for a subtopic: `topic.section.subtopic`. */
export function subtopicId(
  topic: Pick<Topic, "slug">,
  section: Pick<Section, "slug">,
  subtopic: Pick<Subtopic, "slug">,
): string {
  return `${topic.slug}.${section.slug}.${subtopic.slug}`;
}

/** Progress state per subtopic. Ordered, so `>=` comparisons are meaningful. */
export const STATUS = {
  NOT_STARTED: 0,
  LEARNING: 1,
  CONFIDENT: 2,
  MASTERED: 3,
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];

/** Narrows untrusted input (a form value, a request body) to a `Status`. */
export function isStatus(value: unknown): value is Status {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= STATUS.NOT_STARTED &&
    value <= STATUS.MASTERED
  );
}


export const STATUS_META: Record<
  Status,
  { label: string; short: string; hint: string }
> = {
  [STATUS.NOT_STARTED]: {
    label: "Not started",
    short: "—",
    hint: "Untouched",
  },
  [STATUS.LEARNING]: {
    label: "Learning",
    short: "L",
    hint: "Read it, can't explain it yet",
  },
  [STATUS.CONFIDENT]: {
    label: "Confident",
    short: "C",
    hint: "Can explain it in an interview",
  },
  [STATUS.MASTERED]: {
    label: "Mastered",
    short: "M",
    hint: "Can explain and whiteboard it cold",
  },
};

/**
 * Weight a status contributes to a progress percentage.
 * `Learning` counts as half so a part-studied topic doesn't read as 0%.
 */
export function statusWeight(status: Status): number {
  switch (status) {
    case STATUS.MASTERED:
    case STATUS.CONFIDENT:
      return 1;
    case STATUS.LEARNING:
      return 0.5;
    default:
      return 0;
  }
}

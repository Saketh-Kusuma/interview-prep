import type { Note } from "@/content/types";

/**
 * Renders the metadata carried over from the syllabus: prose callouts, explicit
 * "be able to answer this" questions, and ASCII diagrams.
 */
export function NoteBlock({ note }: { note: Note }) {
  if (note.kind === "diagram") {
    return (
      <figure className="my-2 overflow-hidden rounded-lg border border-border bg-surface-raised">
        <figcaption className="border-b border-border px-3 py-1.5 text-[11px] font-medium tracking-wide text-muted uppercase">
          {note.label}
        </figcaption>
        <pre className="overflow-x-auto px-3 py-2.5 font-mono text-[12px] leading-[1.5]">
          {note.ascii}
        </pre>
      </figure>
    );
  }

  if (note.kind === "question") {
    return (
      <p className="my-2 rounded-lg border border-confident/40 bg-confident/8 px-3 py-2 text-[13px]">
        <span className="font-medium text-confident">Be able to answer: </span>
        {note.text}
      </p>
    );
  }

  return (
    <p className="my-2 border-l-2 border-accent/60 pl-3 text-[13px] text-muted italic">
      {note.text}
    </p>
  );
}

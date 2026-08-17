import { NoteBlock } from "@/components/note-block";
import { SubtopicRow } from "@/components/subtopic-row";
import {
  SectionProgressCount,
  TopicProgressBadge,
} from "@/components/topic-progress";
import { topicSubtopicIds } from "@/content";
import { subtopicId, type Band, type Emphasis, type Topic } from "@/content/types";

const BAND_ACCENT: Record<Band, string> = {
  red: "border-l-band-red",
  orange: "border-l-band-orange",
  yellow: "border-l-band-yellow",
};

function Stars({ count, label }: { count: number; label: string }) {
  return (
    <span
      className="hidden shrink-0 text-[10px] tracking-tight text-muted sm:inline"
      title={label}
    >
      <span aria-hidden="true">{"★".repeat(count)}</span>
      <span className="sr-only">{label}</span>
    </span>
  );
}

const EMPHASIS_LABEL: Record<Emphasis, string> = {
  1: "Know well",
  2: "Important",
  3: "Must know",
};

/**
 * A topic renders as a native `<details>`: the browser handles expand/collapse
 * and keyboard behaviour, and because the content stays in the DOM, Ctrl+F
 * still finds subtopics inside collapsed topics.
 */
export function TopicAccordion({ topic }: { topic: Topic }) {
  const ids = topicSubtopicIds(topic);

  return (
    <details
      className={`group rounded-lg border border-border border-l-3 bg-surface transition-colors open:bg-surface ${BAND_ACCENT[topic.band]}`}
    >
      <summary className="flex cursor-pointer list-none items-center gap-2.5 px-3 py-2.5 select-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none sm:gap-3 sm:px-4">
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          className="size-3.5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-90"
        >
          <path d="M7 4l7 6-7 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <span className="w-5 shrink-0 font-mono text-[11px] tabular-nums text-muted">
          {topic.rank}
        </span>

        <h3 className="min-w-0 flex-1 truncate text-[15px] font-semibold">
          {topic.title}
          {topic.authored && (
            <span
              className="ml-2 rounded border border-border-strong px-1 py-px align-middle text-[10px] font-normal text-muted"
              title="Not in your original syllabus — added to cover deployment."
            >
              added
            </span>
          )}
        </h3>

        <Stars count={topic.stars} label={`${topic.stars} of 5 importance`} />
        <TopicProgressBadge ids={ids} />
      </summary>

      <div className="border-t border-border px-3 pt-2 pb-3 sm:px-4">
        {topic.notes?.map((note, index) => (
          <NoteBlock key={index} note={note} />
        ))}

        {topic.sections.map((section) => {
          const sectionIds = section.subtopics.map((subtopic) =>
            subtopicId(topic, section, subtopic),
          );

          return (
            <section key={section.slug} className="mt-3 first:mt-2">
              <div className="flex items-baseline gap-2 border-b border-border pb-1">
                <h4 className="text-[13px] font-semibold tracking-wide text-muted uppercase">
                  {section.title}
                </h4>
                {section.emphasis && (
                  <span className="rounded bg-surface-raised px-1.5 py-px text-[10px] font-medium text-accent">
                    {EMPHASIS_LABEL[section.emphasis]}
                  </span>
                )}
                <span className="flex-1" />
                <SectionProgressCount ids={sectionIds} />
              </div>

              {section.notes?.map((note, index) => (
                <NoteBlock key={index} note={note} />
              ))}

              <ul className="mt-1.5">
                {section.subtopics.map((subtopic, index) => (
                  <SubtopicRow
                    key={subtopic.slug}
                    id={sectionIds[index]}
                    title={subtopic.title}
                  />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </details>
  );
}

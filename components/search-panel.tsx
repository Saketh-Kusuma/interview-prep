"use client";

import { useMemo, useState, type ReactNode } from "react";

import { useProgress } from "@/components/progress-provider";
import { SubtopicRow } from "@/components/subtopic-row";
import type { SearchEntry } from "@/content";

const MIN_QUERY_LENGTH = 2;

type Group = { key: string; topicTitle: string; sectionTitle: string; entries: SearchEntry[] };

/**
 * Search replaces the accordions rather than filtering inside them. Forcing
 * `<details>` open and closed as the query changes would stomp on whatever the
 * user had expanded; a flat result list leaves that state alone.
 */
export function SearchPanel({
  index,
  children,
}: {
  index: readonly SearchEntry[];
  children: ReactNode;
}) {
  const [query, setQuery] = useState("");
  const { entries } = useProgress();

  const needle = query.trim().toLowerCase();

  const groups = useMemo<Group[] | null>(() => {
    if (needle.length < MIN_QUERY_LENGTH) return null;

    const matches = index.filter((entry) => {
      if (entry.title.toLowerCase().includes(needle)) return true;
      if (entry.sectionTitle.toLowerCase().includes(needle)) return true;
      if (entry.topicTitle.toLowerCase().includes(needle)) return true;
      return entries[entry.id]?.note?.toLowerCase().includes(needle) ?? false;
    });

    const byGroup = new Map<string, Group>();
    for (const entry of matches) {
      const key = `${entry.topicTitle}›${entry.sectionTitle}`;
      let group = byGroup.get(key);
      if (!group) {
        group = {
          key,
          topicTitle: entry.topicTitle,
          sectionTitle: entry.sectionTitle,
          entries: [],
        };
        byGroup.set(key, group);
      }
      group.entries.push(entry);
    }
    return [...byGroup.values()];
  }, [index, needle, entries]);

  const matchCount = groups?.reduce((sum, group) => sum + group.entries.length, 0) ?? 0;

  return (
    <>
      <div role="search" className="mt-5">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setQuery("");
          }}
          placeholder="Search subtopics and your notes…"
          aria-label="Search subtopics and notes"
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm placeholder:text-muted focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        />
        {groups && (
          <p aria-live="polite" className="mt-1.5 text-[12px] text-muted">
            {matchCount === 0
              ? "No matches."
              : `${matchCount} match${matchCount === 1 ? "" : "es"} — press Esc to go back to all topics.`}
          </p>
        )}
      </div>

      {groups && (
        <div className="mt-4 space-y-4">
          {groups.map((group) => (
            <section
              key={group.key}
              className="rounded-lg border border-border bg-surface px-3 py-2.5 sm:px-4"
            >
              <h3 className="text-[12px] font-medium tracking-wide text-muted uppercase">
                {group.topicTitle}
                <span aria-hidden="true" className="mx-1.5">
                  ›
                </span>
                {group.sectionTitle}
              </h3>
              <ul className="mt-1.5">
                {group.entries.map((entry) => (
                  <SubtopicRow key={entry.id} id={entry.id} title={entry.title} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      {/* Hidden rather than unmounted: `<details>` open state lives in the DOM,
          so unmounting would collapse everything the user had expanded. */}
      <div className={groups ? "hidden" : undefined}>{children}</div>
    </>
  );
}

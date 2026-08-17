import { coreJava } from "./topics/core-java";
import { javascript } from "./topics/javascript";
import { react } from "./topics/react";
import { dsa } from "./topics/dsa";
import { sql } from "./topics/sql";
import { springBoot } from "./topics/spring-boot";
import { webFundamentals } from "./topics/web-fundamentals";
import { nodeExpress } from "./topics/node-express";
import { mongodb } from "./topics/mongodb";
import { springSecurity } from "./topics/spring-security";
import { jpaHibernate } from "./topics/jpa-hibernate";
import { javaMultithreading } from "./topics/java-multithreading";
import { git } from "./topics/git";
import { systemDesign } from "./topics/system-design";
import { dockerAws } from "./topics/docker-aws";
import { subtopicId, type Band, type Topic } from "./types";

/** Every topic, in priority order (rank 1 first). */
export const TOPICS: readonly Topic[] = [
  coreJava,
  javascript,
  react,
  dsa,
  sql,
  springBoot,
  webFundamentals,
  nodeExpress,
  mongodb,
  springSecurity,
  jpaHibernate,
  javaMultithreading,
  git,
  systemDesign,
  dockerAws,
];

export const BAND_META: Record<
  Band,
  { label: string; blurb: string; dot: string }
> = {
  red: {
    label: "Highest priority",
    blurb: "Asked in almost every interview",
    dot: "🔴",
  },
  orange: {
    label: "High priority",
    blurb: "Expected for full-stack roles",
    dot: "🟠",
  },
  yellow: {
    label: "Good to have",
    blurb: "Bonus points, not blockers",
    dot: "🟡",
  },
};

export const BAND_ORDER: readonly Band[] = ["red", "orange", "yellow"];

/**
 * Validates the content tree at module load. Content is static, so a violation
 * fails the build (or the dev server on first render) rather than shipping ids
 * that silently collide in the database.
 */
function assertContentIntegrity(topics: readonly Topic[]): void {
  const seenTopicSlugs = new Set<string>();
  const seenRanks = new Set<number>();
  const seenIds = new Set<string>();

  for (const topic of topics) {
    if (seenTopicSlugs.has(topic.slug)) {
      throw new Error(`Duplicate topic slug: ${topic.slug}`);
    }
    seenTopicSlugs.add(topic.slug);

    if (seenRanks.has(topic.rank)) {
      throw new Error(`Duplicate rank ${topic.rank} on topic ${topic.slug}`);
    }
    seenRanks.add(topic.rank);

    const seenSectionSlugs = new Set<string>();
    for (const section of topic.sections) {
      if (seenSectionSlugs.has(section.slug)) {
        throw new Error(
          `Duplicate section slug ${section.slug} in topic ${topic.slug}`,
        );
      }
      seenSectionSlugs.add(section.slug);

      if (section.subtopics.length === 0) {
        throw new Error(
          `Section ${topic.slug}.${section.slug} has no subtopics`,
        );
      }

      // Keyed on the full id, not the title: some titles legitimately repeat
      // across sections (e.g. "Cookies" under both HTTP and Browser).
      for (const subtopic of section.subtopics) {
        const id = subtopicId(topic, section, subtopic);
        if (seenIds.has(id)) {
          throw new Error(`Duplicate subtopic id: ${id}`);
        }
        seenIds.add(id);
      }
    }
  }
}

assertContentIntegrity(TOPICS);

export const TOPICS_BY_SLUG: ReadonlyMap<string, Topic> = new Map(
  TOPICS.map((topic) => [topic.slug, topic]),
);

export type SearchEntry = {
  id: string;
  title: string;
  sectionTitle: string;
  topicTitle: string;
};

/**
 * Flat, searchable view of the syllabus. Sent to the client so search can match
 * subtopic titles against locally-held notes without a server round trip.
 */
export const SEARCH_INDEX: readonly SearchEntry[] = TOPICS.flatMap((topic) =>
  topic.sections.flatMap((section) =>
    section.subtopics.map((subtopic) => ({
      id: subtopicId(topic, section, subtopic),
      title: subtopic.title,
      sectionTitle: section.title,
      topicTitle: topic.title,
    })),
  ),
);

/** Every subtopic id in the syllabus, in reading order. */
export const ALL_SUBTOPIC_IDS: readonly string[] = SEARCH_INDEX.map(
  (entry) => entry.id,
);

/** Subtopic ids belonging to one topic. */
export function topicSubtopicIds(topic: Topic): string[] {
  return topic.sections.flatMap((section) =>
    section.subtopics.map((subtopic) => subtopicId(topic, section, subtopic)),
  );
}

export const TOTAL_SUBTOPICS = ALL_SUBTOPIC_IDS.length;

export * from "./types";

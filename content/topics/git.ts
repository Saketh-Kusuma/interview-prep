import type { Topic } from "../types";

export const git: Topic = {
  slug: "git",
  rank: 13,
  band: "yellow",
  title: "Git / GitHub",
  stars: 3,
  notes: [
    { kind: "callout", text: "Know how to explain your Git workflow." },
  ],
  sections: [
    {
      slug: "basics",
      title: "Basics",
      subtopics: [
        { slug: "init-clone", title: "init / clone" },
        { slug: "add-commit", title: "add / commit" },
        { slug: "status-log", title: "status / log" },
        { slug: "diff", title: "diff" },
        { slug: "push-pull", title: "push / pull" },
        { slug: "fetch-vs-pull", title: "fetch vs pull" },
        { slug: "gitignore", title: ".gitignore" },
      ],
    },
    {
      slug: "branching",
      title: "Branching",
      subtopics: [
        { slug: "branch-checkout", title: "branch / checkout" },
        { slug: "merge", title: "merge" },
        { slug: "rebase", title: "rebase" },
        { slug: "merge-conflicts", title: "Resolving merge conflicts" },
      ],
    },
    {
      slug: "collaboration",
      title: "Collaboration",
      subtopics: [
        { slug: "pull-requests", title: "Pull requests" },
        { slug: "workflow", title: "Branching workflow (feature / main)" },
      ],
    },
  ],
};

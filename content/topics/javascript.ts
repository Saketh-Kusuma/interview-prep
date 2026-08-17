import type { Topic } from "../types";

export const javascript: Topic = {
  slug: "javascript",
  rank: 2,
  band: "red",
  title: "JavaScript",
  stars: 5,
  notes: [
    {
      kind: "callout",
      text: "Even though you're targeting React, don't neglect JS.",
    },
  ],
  sections: [
    {
      slug: "core",
      title: "Language Core",
      emphasis: 3,
      subtopics: [
        { slug: "var-let-const", title: "var, let, const" },
        { slug: "scope", title: "Scope" },
        { slug: "hoisting", title: "Hoisting" },
        { slug: "closures", title: "Closures" },
        { slug: "this", title: "this" },
        { slug: "arrow-functions", title: "Arrow functions" },
        { slug: "destructuring", title: "Destructuring" },
        { slug: "spread-rest", title: "Spread / rest" },
        { slug: "prototype", title: "Prototype" },
        { slug: "classes", title: "Classes" },
        { slug: "modules", title: "Modules" },
      ],
    },
    {
      slug: "async",
      title: "Async",
      subtopics: [
        { slug: "promises", title: "Promises" },
        { slug: "async-await", title: "async / await" },
        { slug: "event-loop", title: "Event loop" },
        { slug: "callbacks", title: "Callbacks" },
      ],
    },
    {
      slug: "events",
      title: "DOM Events",
      subtopics: [
        { slug: "event-bubbling", title: "Event bubbling" },
        { slug: "event-delegation", title: "Event delegation" },
      ],
    },
    {
      slug: "array-methods",
      title: "Array Methods",
      subtopics: [
        { slug: "map", title: "map" },
        { slug: "filter", title: "filter" },
        { slug: "reduce", title: "reduce" },
      ],
    },
  ],
};

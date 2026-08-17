import type { Topic } from "../types";

export const nodeExpress: Topic = {
  slug: "node-express",
  rank: 8,
  band: "orange",
  title: "Node + Express",
  stars: 4,
  sections: [
    {
      slug: "nodejs",
      title: "Node.js",
      subtopics: [
        { slug: "what-is-node", title: "What is Node.js" },
        { slug: "non-blocking-io", title: "Non-blocking I/O" },
        { slug: "single-threaded-model", title: "Single-threaded model" },
        { slug: "modules", title: "Modules (CommonJS / ESM)" },
        { slug: "npm", title: "npm" },
        { slug: "package-json", title: "package.json" },
        { slug: "fs-module", title: "fs module" },
        { slug: "path-module", title: "path module" },
        { slug: "http-module", title: "http module" },
        { slug: "streams", title: "Streams" },
        { slug: "buffers", title: "Buffers" },
      ],
    },
    {
      slug: "event-loop",
      title: "Event Loop",
      emphasis: 3,
      notes: [
        {
          kind: "callout",
          text: "Be able to explain why Node.js can handle many concurrent requests despite being primarily single-threaded.",
        },
        {
          kind: "diagram",
          label: "Event loop phases",
          ascii: `   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘`,
        },
      ],
      subtopics: [
        { slug: "event-loop", title: "Event loop" },
      ],
    },
    {
      slug: "express",
      title: "Express.js",
      notes: [
        { kind: "callout", text: "Know why we separate these layers." },
        {
          kind: "diagram",
          label: "Folder structure",
          ascii: `src/
├── routes/
├── controllers/
├── services/
├── models/
├── middlewares/
└── config/`,
        },
      ],
      subtopics: [
        { slug: "routing", title: "Routing" },
        { slug: "middleware", title: "Middleware" },
        { slug: "req-res", title: "req / res objects" },
        { slug: "route-params", title: "Route params" },
        { slug: "query-params", title: "Query params" },
        { slug: "body-parsing", title: "Body parsing" },
        { slug: "error-middleware", title: "Error-handling middleware" },
        { slug: "router", title: "express.Router" },
        { slug: "static-files", title: "Serving static files" },
        { slug: "rest-api-design", title: "REST API design" },
        { slug: "auth-middleware", title: "Authentication middleware" },
        { slug: "cors", title: "CORS" },
        { slug: "folder-structure", title: "Folder structure" },
      ],
    },
  ],
};

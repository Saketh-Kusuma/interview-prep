import type { Topic } from "../types";

/**
 * Microservices questions that the priority table implies but no existing topic
 * covers. Deliberately excludes the four that already live elsewhere —
 * monolith vs microservices, API gateway, load balancing (System Design) and
 * horizontal vs vertical scaling — so a subtopic has exactly one home.
 */
export const microservices: Topic = {
  slug: "microservices",
  rank: 13,
  band: "orange",
  title: "Microservices",
  stars: 4,
  notes: [
    {
      kind: "callout",
      text: "Expected once you claim backend experience. Anchor every answer to a service you actually built — interviewers probe the trade-off you chose, not the definition.",
    },
    {
      kind: "callout",
      text: "Monolith vs microservices, API gateway and load balancing sit under System Design.",
    },
  ],
  sections: [
    {
      slug: "communication",
      title: "Communication & Discovery",
      emphasis: 3,
      notes: [
        {
          kind: "question",
          text: "How do two microservices talk to each other, and when would you pick Kafka over a REST call?",
        },
      ],
      subtopics: [
        { slug: "rest-vs-messaging", title: "REST vs Kafka (sync vs async)" },
        { slug: "service-discovery", title: "Service discovery" },
        { slug: "config-management", title: "Centralised configuration" },
      ],
    },
    {
      slug: "resilience",
      title: "Resilience & Operations",
      emphasis: 3,
      notes: [
        {
          kind: "question",
          text: "One downstream service starts timing out. What stops it taking your service down with it?",
        },
      ],
      subtopics: [
        { slug: "circuit-breaker", title: "Circuit breaker pattern" },
        { slug: "fault-tolerance", title: "Designing fault-tolerant services" },
        { slug: "idempotent-api", title: "Idempotent APIs" },
        { slug: "logging-monitoring", title: "Centralised logging & monitoring" },
      ],
    },
  ],
};

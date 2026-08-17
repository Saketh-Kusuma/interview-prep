import type { Topic } from "../types";

export const systemDesign: Topic = {
  slug: "system-design",
  rank: 14,
  band: "yellow",
  title: "System Design",
  stars: 3,
  notes: [
    {
      kind: "callout",
      text: "Don't spend months on system design — for your level, know the concepts and be able to reason out loud.",
    },
  ],
  sections: [
    {
      slug: "concepts",
      title: "Concepts",
      subtopics: [
        { slug: "client-server", title: "Client-server architecture" },
        { slug: "monolith-vs-microservices", title: "Monolith vs microservices" },
        { slug: "load-balancing", title: "Load balancing" },
        { slug: "caching", title: "Caching" },
        { slug: "database-scaling", title: "Database scaling" },
        { slug: "horizontal-vs-vertical", title: "Horizontal vs vertical scaling" },
        { slug: "cap-theorem", title: "CAP theorem" },
        { slug: "message-queues", title: "Message queues" },
        { slug: "api-gateway", title: "API gateway" },
        { slug: "rate-limiting", title: "Rate limiting" },
      ],
    },
    {
      slug: "exercises",
      title: "Design Exercises",
      notes: [{ kind: "callout", text: "Be able to design these." }],
      subtopics: [
        { slug: "url-shortener", title: "URL shortener" },
        { slug: "auth-system", title: "Authentication system" },
        { slug: "chat-app", title: "Chat application" },
        { slug: "ecommerce", title: "E-commerce backend" },
        { slug: "notification-system", title: "Notification system" },
      ],
    },
  ],
};

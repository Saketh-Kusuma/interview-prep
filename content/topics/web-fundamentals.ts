import type { Topic } from "../types";

export const webFundamentals: Topic = {
  slug: "web-fundamentals",
  rank: 7,
  band: "orange",
  title: "Web Fundamentals",
  stars: 4,
  notes: [
    {
      kind: "callout",
      text: "This is extremely important for React + Java/MERN.",
    },
  ],
  sections: [
    {
      slug: "http",
      title: "HTTP & APIs",
      subtopics: [
        { slug: "http-methods", title: "HTTP methods" },
        { slug: "status-codes", title: "Status codes" },
        { slug: "headers", title: "Headers" },
        { slug: "cookies", title: "Cookies" },
        { slug: "cors", title: "CORS" },
        { slug: "rest-principles", title: "REST principles" },
        { slug: "json", title: "JSON" },
        { slug: "request-response-cycle", title: "Request / response cycle" },
        { slug: "stateless-vs-stateful", title: "Stateless vs stateful" },
      ],
    },
    {
      slug: "browser",
      title: "Browser",
      subtopics: [
        { slug: "dom", title: "DOM" },
        { slug: "rendering", title: "Rendering" },
        { slug: "localstorage", title: "LocalStorage" },
        { slug: "sessionstorage", title: "SessionStorage" },
        { slug: "cookies", title: "Cookies" },
        { slug: "same-origin-policy", title: "Same-origin policy" },
        { slug: "xss", title: "XSS basics" },
        { slug: "csrf", title: "CSRF basics" },
      ],
    },
  ],
};

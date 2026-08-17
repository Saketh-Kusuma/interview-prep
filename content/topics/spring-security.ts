import type { Topic } from "../types";

export const springSecurity: Topic = {
  slug: "spring-security",
  rank: 10,
  band: "orange",
  title: "Spring Security / JWT",
  stars: 4,
  sections: [
    {
      slug: "core",
      title: "Core Concepts",
      emphasis: 3,
      subtopics: [
        { slug: "authentication", title: "Authentication" },
        { slug: "authorization", title: "Authorization" },
        { slug: "filter-chain", title: "Security filter chain" },
        { slug: "userdetailsservice", title: "UserDetailsService" },
        { slug: "password-encoding", title: "Password encoding (BCrypt)" },
        { slug: "jwt", title: "JWT" },
        { slug: "jwt-filter", title: "JWT authentication filter" },
        { slug: "role-based-access", title: "Role-based access control" },
        { slug: "preauthorize", title: "@PreAuthorize" },
        { slug: "csrf", title: "CSRF" },
      ],
    },
    {
      slug: "flow",
      title: "JWT Flow",
      notes: [
        {
          kind: "callout",
          text: "Be able to walk through this end to end, including where the token is stored and how it is validated.",
        },
        {
          kind: "diagram",
          label: "JWT authentication flow",
          ascii: `Login request (email + password)
        ↓
Authenticate credentials
        ↓
Generate JWT (signed)
        ↓
Return token to client
        ↓
Client sends: Authorization: Bearer <token>
        ↓
Filter validates signature + expiry
        ↓
Set SecurityContext → controller runs`,
        },
      ],
      subtopics: [{ slug: "end-to-end-flow", title: "End-to-end JWT flow" }],
    },
  ],
};

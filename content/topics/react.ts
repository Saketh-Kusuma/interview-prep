import type { Topic } from "../types";

export const react: Topic = {
  slug: "react",
  rank: 3,
  band: "red",
  title: "React",
  stars: 5,
  sections: [
    {
      slug: "fundamentals",
      title: "React Fundamentals",
      subtopics: [
        { slug: "jsx", title: "JSX" },
        { slug: "components", title: "Components" },
        { slug: "props", title: "Props" },
        { slug: "state", title: "State" },
        { slug: "conditional-rendering", title: "Conditional Rendering" },
        { slug: "lists-keys", title: "Lists & Keys" },
        { slug: "event-handling", title: "Event Handling" },
        {
          slug: "controlled-vs-uncontrolled",
          title: "Controlled vs Uncontrolled Components",
        },
        { slug: "lifecycle", title: "Component lifecycle" },
      ],
    },
    {
      slug: "hooks",
      title: "Hooks",
      emphasis: 3,
      notes: [{ kind: "callout", text: "Know these extremely well." }],
      subtopics: [
        { slug: "usestate", title: "useState" },
        { slug: "useeffect", title: "useEffect" },
        { slug: "usecontext", title: "useContext" },
        { slug: "useref", title: "useRef" },
        { slug: "usememo", title: "useMemo" },
        { slug: "usecallback", title: "useCallback" },
        { slug: "custom-hooks", title: "Custom Hooks" },
      ],
    },
    {
      slug: "state-management",
      title: "State Management",
      subtopics: [
        { slug: "context-api", title: "Context API" },
        { slug: "redux", title: "Redux" },
        { slug: "redux-toolkit", title: "Redux Toolkit" },
        { slug: "zustand", title: "Zustand basics" },
      ],
    },
    {
      slug: "api-integration",
      title: "API Integration",
      subtopics: [
        { slug: "fetch", title: "Fetch" },
        { slug: "axios", title: "Axios" },
        { slug: "rest-apis", title: "REST APIs" },
        { slug: "http-methods", title: "HTTP methods" },
        { slug: "status-codes", title: "Status codes" },
        { slug: "request-response-lifecycle", title: "Request/response lifecycle" },
        { slug: "error-handling", title: "Error handling" },
        { slug: "loading-states", title: "Loading states" },
        { slug: "interceptors", title: "Interceptors" },
      ],
    },
    {
      slug: "authentication",
      title: "Authentication",
      notes: [
        { kind: "callout", text: "Very important for full-stack interviews." },
      ],
      subtopics: [
        { slug: "jwt", title: "JWT" },
        { slug: "access-token", title: "Access Token" },
        { slug: "refresh-token", title: "Refresh Token" },
        { slug: "cookies", title: "Cookies" },
        { slug: "localstorage", title: "LocalStorage" },
        { slug: "httponly-cookies", title: "HttpOnly cookies" },
        {
          slug: "auth-vs-authz",
          title: "Authentication vs Authorization",
        },
        { slug: "protected-routes", title: "Protected routes" },
        { slug: "role-based-authz", title: "Role-based authorization" },
        { slug: "oauth", title: "OAuth / Google Authentication basics" },
      ],
    },
    {
      slug: "performance",
      title: "React Performance",
      subtopics: [
        { slug: "re-rendering", title: "Re-rendering" },
        { slug: "react-memo", title: "React.memo" },
        { slug: "usememo", title: "useMemo" },
        { slug: "usecallback", title: "useCallback" },
        { slug: "lazy-loading", title: "Lazy loading" },
        { slug: "code-splitting", title: "Code splitting" },
        { slug: "virtualization", title: "Virtualization basics" },
      ],
    },
    {
      slug: "architecture",
      title: "React Architecture",
      notes: [
        {
          kind: "callout",
          text: "Be able to explain this flow, and how you would structure a real application.",
        },
        {
          kind: "diagram",
          label: "Request flow",
          ascii: `Component
   ↓
State
   ↓
API Call
   ↓
Backend
   ↓
Database`,
        },
      ],
      subtopics: [
        {
          slug: "request-flow",
          title: "Component → State → API → Backend → Database flow",
        },
        { slug: "structuring-an-app", title: "Structuring a real application" },
      ],
    },
  ],
};

import type { Topic } from "../types";

export const springBoot: Topic = {
  slug: "spring-boot",
  rank: 6,
  band: "red",
  title: "Spring Boot",
  stars: 5,
  notes: [
    {
      kind: "callout",
      text: "This is where your Java preparation becomes Java Full Stack.",
    },
  ],
  sections: [
    {
      slug: "spring-core",
      title: "Spring Core",
      emphasis: 3,
      subtopics: [
        { slug: "ioc", title: "IoC (Inversion of Control)" },
        { slug: "dependency-injection", title: "Dependency Injection" },
        { slug: "constructor-injection", title: "Constructor injection" },
        { slug: "setter-injection", title: "Setter injection" },
        { slug: "field-injection", title: "Field injection" },
        { slug: "bean-lifecycle", title: "Bean lifecycle" },
        { slug: "bean-scopes", title: "Bean scopes" },
        { slug: "component", title: "@Component" },
        { slug: "service", title: "@Service" },
        { slug: "repository", title: "@Repository" },
        { slug: "controller", title: "@Controller" },
        { slug: "autowired", title: "@Autowired" },
        { slug: "qualifier", title: "@Qualifier" },
        { slug: "configuration", title: "@Configuration" },
        { slug: "bean", title: "@Bean" },
      ],
    },
    {
      slug: "spring-boot",
      title: "Spring Boot",
      subtopics: [
        { slug: "auto-configuration", title: "Auto-configuration" },
        { slug: "starters", title: "Starter dependencies" },
        {
          slug: "springbootapplication",
          title: "@SpringBootApplication",
        },
        { slug: "application-properties", title: "application.properties / .yml" },
        { slug: "profiles", title: "Profiles" },
        { slug: "embedded-server", title: "Embedded server" },
        { slug: "actuator", title: "Actuator basics" },
        { slug: "devtools", title: "DevTools" },
      ],
    },
    {
      slug: "rest-api",
      title: "REST API Development",
      emphasis: 3,
      notes: [
        {
          kind: "callout",
          text: "Know how a request travels through each layer.",
        },
        {
          kind: "diagram",
          label: "Layered architecture",
          ascii: `Controller
    ↓
  Service
    ↓
 Repository
    ↓
 Database`,
        },
      ],
      subtopics: [
        { slug: "restcontroller", title: "@RestController" },
        { slug: "requestmapping", title: "@RequestMapping" },
        { slug: "getmapping", title: "@GetMapping" },
        { slug: "postmapping", title: "@PostMapping" },
        { slug: "putmapping", title: "@PutMapping" },
        { slug: "deletemapping", title: "@DeleteMapping" },
        { slug: "pathvariable", title: "@PathVariable" },
        { slug: "requestparam", title: "@RequestParam" },
        { slug: "requestbody", title: "@RequestBody" },
        { slug: "responseentity", title: "ResponseEntity" },
        { slug: "dto", title: "DTO" },
        { slug: "validation", title: "Validation (@Valid)" },
        {
          slug: "exception-handling",
          title: "Exception handling (@ControllerAdvice)",
        },
        { slug: "status-codes", title: "HTTP status codes" },
        { slug: "cors", title: "CORS configuration" },
        { slug: "layered-architecture", title: "Layered architecture" },
      ],
    },
  ],
};

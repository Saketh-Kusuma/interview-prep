import type { Topic } from "../types";

export const jpaHibernate: Topic = {
  slug: "jpa-hibernate",
  rank: 11,
  band: "orange",
  title: "JPA / Hibernate",
  stars: 4,
  notes: [{ kind: "callout", text: "Very important." }],
  sections: [
    {
      slug: "entities",
      title: "Entities",
      subtopics: [
        { slug: "entity", title: "@Entity" },
        { slug: "table-column", title: "@Table / @Column" },
        { slug: "id-generatedvalue", title: "@Id / @GeneratedValue" },
      ],
    },
    {
      slug: "relationships",
      title: "Relationships",
      emphasis: 3,
      subtopics: [
        { slug: "one-to-one", title: "@OneToOne" },
        { slug: "one-to-many", title: "@OneToMany" },
        { slug: "many-to-one", title: "@ManyToOne" },
        { slug: "many-to-many", title: "@ManyToMany" },
        { slug: "fetch-types", title: "Lazy vs Eager fetching" },
      ],
    },
    {
      slug: "lifecycle",
      title: "Entity Lifecycle",
      emphasis: 3,
      notes: [
        {
          kind: "question",
          text: "You load an entity, close the transaction, then change a field. Does the update reach the database?",
        },
      ],
      subtopics: [
        {
          slug: "entity-states",
          title: "Entity states (transient / persistent / detached / removed)",
        },
        { slug: "save-persist-merge", title: "save() vs persist() vs merge()" },
      ],
    },
    {
      slug: "queries",
      title: "Queries",
      subtopics: [
        { slug: "jpa-repository", title: "JpaRepository" },
        { slug: "jpql-native", title: "JPQL / native queries" },
      ],
    },
    {
      slug: "transactions",
      title: "Transactions & Performance",
      subtopics: [
        { slug: "transactional", title: "@Transactional" },
        { slug: "n-plus-one", title: "N+1 problem" },
        { slug: "caching", title: "Caching basics" },
      ],
    },
  ],
};

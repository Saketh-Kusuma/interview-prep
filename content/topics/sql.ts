import type { Topic } from "../types";

export const sql: Topic = {
  slug: "sql",
  rank: 5,
  band: "red",
  title: "SQL",
  stars: 5,
  notes: [
    {
      kind: "callout",
      text: "Don't make the mistake of thinking SQL is only for Java roles. Even MERN interviews frequently test SQL.",
    },
  ],
  sections: [
    {
      slug: "must-know",
      title: "Must Know",
      emphasis: 3,
      subtopics: [
        { slug: "select", title: "SELECT" },
        { slug: "where", title: "WHERE" },
        { slug: "order-by", title: "ORDER BY" },
        { slug: "group-by", title: "GROUP BY" },
        { slug: "having", title: "HAVING" },
        { slug: "aggregate-functions", title: "Aggregate functions" },
        { slug: "distinct", title: "DISTINCT" },
        { slug: "limit-offset", title: "LIMIT / OFFSET" },
        { slug: "insert", title: "INSERT" },
        { slug: "update", title: "UPDATE" },
        { slug: "delete", title: "DELETE" },
        { slug: "primary-key", title: "Primary key" },
        { slug: "foreign-key", title: "Foreign key" },
        { slug: "constraints", title: "Constraints" },
        { slug: "normalization", title: "Normalization" },
      ],
    },
    {
      slug: "joins",
      title: "Joins",
      emphasis: 3,
      subtopics: [
        { slug: "inner-join", title: "INNER JOIN" },
        { slug: "left-join", title: "LEFT JOIN" },
        { slug: "right-join", title: "RIGHT JOIN" },
        { slug: "full-join", title: "FULL JOIN" },
        { slug: "self-join", title: "SELF JOIN" },
      ],
    },
    {
      slug: "advanced",
      title: "Advanced SQL",
      subtopics: [
        { slug: "subqueries", title: "Subqueries" },
        { slug: "correlated-subqueries", title: "Correlated subqueries" },
        { slug: "cte", title: "CTE (WITH clause)" },
        { slug: "window-functions", title: "Window functions" },
        { slug: "row-number", title: "ROW_NUMBER" },
        { slug: "rank-dense-rank", title: "RANK / DENSE_RANK" },
        { slug: "indexes", title: "Indexes" },
        { slug: "transactions", title: "Transactions" },
        { slug: "acid", title: "ACID properties" },
        { slug: "query-optimization", title: "Query optimization basics" },
        {
          slug: "second-highest-salary",
          title: "Query: second-highest salary",
        },
      ],
    },
  ],
};

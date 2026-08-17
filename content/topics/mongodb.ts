import type { Topic } from "../types";

export const mongodb: Topic = {
  slug: "mongodb",
  rank: 9,
  band: "orange",
  title: "MongoDB + Mongoose",
  stars: 4,
  sections: [
    {
      slug: "fundamentals",
      title: "MongoDB Fundamentals",
      subtopics: [
        { slug: "documents", title: "Documents" },
        { slug: "collections", title: "Collections" },
        { slug: "bson", title: "BSON" },
        { slug: "object-id", title: "ObjectId" },
        { slug: "schema-less", title: "Schema-less design" },
        { slug: "embedding-vs-referencing", title: "Embedding vs referencing" },
        { slug: "indexes", title: "Indexes" },
      ],
    },
    {
      slug: "queries",
      title: "Queries",
      subtopics: [
        { slug: "find", title: "find" },
        { slug: "findone", title: "findOne" },
        { slug: "insertone", title: "insertOne / insertMany" },
        { slug: "updateone", title: "updateOne / updateMany" },
        { slug: "deleteone", title: "deleteOne / deleteMany" },
        { slug: "operators", title: "Query operators ($gt, $in, $regex)" },
        { slug: "projection", title: "Projection" },
        { slug: "sort-limit-skip", title: "sort / limit / skip" },
        { slug: "aggregation-pipeline", title: "Aggregation pipeline" },
        { slug: "match-group", title: "$match / $group" },
        { slug: "lookup", title: "$lookup" },
      ],
    },
    {
      slug: "interview",
      title: "Interview Questions",
      subtopics: [
        { slug: "sql-vs-nosql", title: "SQL vs NoSQL" },
        { slug: "when-mongodb", title: "When to use MongoDB" },
        { slug: "normalization-in-mongo", title: "Normalization in MongoDB" },
        { slug: "transactions", title: "Transactions" },
        { slug: "replication", title: "Replication" },
        { slug: "sharding", title: "Sharding" },
        { slug: "indexing-strategy", title: "Indexing strategy" },
        { slug: "aggregation-vs-find", title: "Aggregation vs find" },
        { slug: "consistency", title: "Consistency model" },
      ],
    },
    {
      slug: "mongoose",
      title: "Mongoose",
      notes: [
        {
          kind: "callout",
          text: "Since you're targeting MERN, know these well.",
        },
        {
          kind: "question",
          text: "MongoDB vs Mongoose — what's the difference?",
        },
      ],
      subtopics: [
        { slug: "schema", title: "Schema" },
        { slug: "model", title: "Model" },
        { slug: "validation", title: "Validation" },
        { slug: "middleware-hooks", title: "Middleware / hooks" },
        { slug: "virtuals", title: "Virtuals" },
        { slug: "populate", title: "populate" },
        { slug: "refs", title: "Refs / relationships" },
        { slug: "queries", title: "Query helpers" },
        { slug: "connection", title: "Connecting to MongoDB" },
      ],
    },
  ],
};

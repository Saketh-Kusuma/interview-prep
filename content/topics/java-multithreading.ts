import type { Topic } from "../types";

export const javaMultithreading: Topic = {
  slug: "java-multithreading",
  rank: 12,
  band: "orange",
  title: "Java Multithreading",
  stars: 4,
  notes: [{ kind: "callout", text: "For Java backend interviews." }],
  sections: [
    {
      slug: "threads",
      title: "Threads",
      subtopics: [
        { slug: "process-vs-thread", title: "Process vs thread (what multithreading is)" },
        { slug: "thread-lifecycle", title: "Thread lifecycle" },
        { slug: "runnable-vs-thread", title: "Runnable vs Thread" },
        { slug: "start-vs-run", title: "start() vs run()" },
        { slug: "sleep-join", title: "sleep() / join()" },
        { slug: "daemon-threads", title: "Daemon threads" },
        { slug: "thread-priority", title: "Thread priority" },
      ],
    },
    {
      slug: "synchronization",
      title: "Synchronization",
      emphasis: 3,
      subtopics: [
        { slug: "synchronized", title: "synchronized" },
        { slug: "volatile", title: "volatile" },
        { slug: "locks", title: "Locks (ReentrantLock)" },
        {
          slug: "synchronized-vs-lock",
          title: "synchronized vs Lock vs ReentrantLock",
        },
        { slug: "deadlock", title: "Deadlock" },
        { slug: "race-condition", title: "Race condition" },
      ],
    },
    {
      slug: "executors",
      title: "Executors & Concurrency Utilities",
      subtopics: [
        { slug: "executor-service", title: "ExecutorService" },
        { slug: "thread-pool", title: "Thread pool" },
        { slug: "callable-future", title: "Callable / Future" },
        { slug: "completablefuture", title: "CompletableFuture basics" },
      ],
    },
  ],
};

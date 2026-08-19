import type { Topic } from "../types";

export const dsa: Topic = {
  slug: "dsa",
  rank: 4,
  band: "red",
  title: "DSA",
  stars: 5,
  notes: [
    {
      kind: "callout",
      text: "MUST know — the common foundation for both Java and MERN interviews.",
    },
  ],
  sections: [
    {
      slug: "core",
      title: "Core Structures & Techniques",
      subtopics: [
        { slug: "arrays", title: "Arrays" },
        { slug: "strings", title: "Strings" },
        { slug: "hashmap-hashset", title: "HashMap / HashSet" },
        { slug: "two-pointers", title: "Two Pointers" },
        { slug: "sliding-window", title: "Sliding Window" },
        { slug: "binary-search", title: "Binary Search" },
        { slug: "sorting", title: "Sorting" },
        { slug: "stack-queue", title: "Stack & Queue" },
        { slug: "linked-list", title: "Linked List" },
        { slug: "recursion", title: "Recursion" },
        { slug: "trees-bst", title: "Trees / BST" },
        { slug: "heap-priority-queue", title: "Heap / Priority Queue" },
        { slug: "graph-basics", title: "Graph basics" },
        { slug: "greedy", title: "Greedy" },
        { slug: "dp-basics", title: "Dynamic Programming basics" },
        { slug: "complexity", title: "Time & Space Complexity" },
      ],
    },
    {
      slug: "patterns",
      title: "Important Patterns",
      emphasis: 3,
      subtopics: [
        { slug: "frequency-counting", title: "Frequency counting" },
        { slug: "prefix-sum", title: "Prefix Sum" },
        { slug: "kadanes-algorithm", title: "Kadane's Algorithm" },
        { slug: "fast-slow-pointer", title: "Fast & Slow Pointer" },
        { slug: "merge-intervals", title: "Merge Intervals" },
        { slug: "binary-search-on-answer", title: "Binary Search on Answer" },
        { slug: "bfs-dfs", title: "BFS / DFS" },
      ],
    },
    {
      slug: "classic-problems",
      title: "Classic Coding-Round Problems",
      emphasis: 3,
      notes: [
        {
          kind: "callout",
          text: "These come up verbatim in first-round screens. Be able to write each one without an IDE, then state its complexity.",
        },
      ],
      subtopics: [
        { slug: "reverse-a-string", title: "Reverse a string" },
        { slug: "find-duplicates", title: "Find duplicate elements in an array" },
        {
          slug: "first-non-repeating-char",
          title: "First non-repeating character",
        },
        { slug: "palindrome-check", title: "Check if a string is a palindrome" },
        { slug: "second-largest", title: "Find the second-largest number" },
        { slug: "reverse-linked-list", title: "Reverse a linked list" },
      ],
    },
  ],
};

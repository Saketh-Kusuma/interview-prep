import type { Topic } from "../types";

export const coreJava: Topic = {
  slug: "core-java",
  rank: 1,
  band: "red",
  title: "Core Java",
  stars: 5,
  notes: [
    {
      kind: "callout",
      text: "For Java roles, this should be your strongest interview foundation.",
    },
  ],
  sections: [
    {
      slug: "basics",
      title: "Java Basics",
      subtopics: [
        { slug: "jdk-jre-jvm", title: "JDK vs JRE vs JVM" },
        { slug: "compilation-execution", title: "Compilation & execution" },
        { slug: "primitive-vs-reference", title: "Primitive vs Reference types" },
        { slug: "stack-vs-heap", title: "Stack vs Heap" },
        { slug: "string", title: "String" },
        { slug: "stringbuilder", title: "StringBuilder" },
        { slug: "stringbuffer", title: "StringBuffer" },
        {
          slug: "string-vs-stringbuilder-vs-stringbuffer",
          title: "String vs StringBuilder vs StringBuffer",
        },
        { slug: "equality", title: "== vs .equals()" },
        { slug: "final", title: "final" },
        { slug: "static", title: "static" },
        { slug: "immutable-class", title: "Immutable class (how to write one)" },
        { slug: "wrapper-classes", title: "Wrapper classes" },
        { slug: "autoboxing", title: "Autoboxing / Unboxing" },
      ],
    },
    {
      slug: "oop",
      title: "OOP",
      emphasis: 3,
      notes: [
        {
          kind: "callout",
          text: "You should be able to explain these with real examples, not definitions.",
        },
      ],
      subtopics: [
        { slug: "encapsulation", title: "Encapsulation" },
        { slug: "inheritance", title: "Inheritance" },
        { slug: "polymorphism", title: "Polymorphism" },
        { slug: "abstraction", title: "Abstraction" },
        { slug: "interface", title: "Interface" },
        { slug: "abstract-class", title: "Abstract class" },
        { slug: "overloading", title: "Method Overloading" },
        { slug: "overriding", title: "Method Overriding" },
        { slug: "composition-vs-inheritance", title: "Composition vs Inheritance" },
        {
          slug: "association-aggregation-composition",
          title: "Association / Aggregation / Composition",
        },
      ],
    },
    {
      slug: "collections",
      title: "Collections",
      emphasis: 3,
      notes: [
        {
          kind: "diagram",
          label: "Collection hierarchy",
          ascii: `Collection
├── List
│   ├── ArrayList
│   └── LinkedList
│
├── Set
│   ├── HashSet
│   ├── LinkedHashSet
│   └── TreeSet
│
└── Queue
    ├── PriorityQueue
    └── Deque`,
        },
        {
          kind: "diagram",
          label: "Map hierarchy",
          ascii: `Map
├── HashMap
├── LinkedHashMap
├── TreeMap
└── ConcurrentHashMap`,
        },
      ],
      subtopics: [
        { slug: "arraylist", title: "ArrayList" },
        { slug: "linkedlist", title: "LinkedList" },
        { slug: "hashset", title: "HashSet" },
        { slug: "linkedhashset", title: "LinkedHashSet" },
        { slug: "treeset", title: "TreeSet" },
        { slug: "priorityqueue", title: "PriorityQueue" },
        { slug: "deque", title: "Deque" },
        { slug: "hashmap", title: "HashMap" },
        { slug: "linkedhashmap", title: "LinkedHashMap" },
        { slug: "treemap", title: "TreeMap" },
        { slug: "concurrenthashmap", title: "ConcurrentHashMap" },
      ],
    },
    {
      slug: "collections-interview",
      title: "Collections — Interview Questions",
      emphasis: 3,
      subtopics: [
        { slug: "arraylist-vs-linkedlist", title: "ArrayList vs LinkedList" },
        { slug: "hashmap-internals", title: "HashMap internals" },
        { slug: "hashmap-vs-hashtable", title: "HashMap vs Hashtable" },
        { slug: "hashset-internally", title: "HashSet internally" },
        { slug: "hashmap-collision", title: "HashMap collision" },
        { slug: "equals-hashcode", title: "equals() and hashCode()" },
        { slug: "comparable-vs-comparator", title: "Comparable vs Comparator" },
        {
          slug: "treemap-vs-hashmap",
          title: "HashMap vs LinkedHashMap vs TreeMap",
        },
        { slug: "concurrenthashmap-internals", title: "ConcurrentHashMap" },
        { slug: "fail-fast-vs-fail-safe", title: "Fail-fast vs fail-safe" },
      ],
    },
    {
      slug: "exceptions",
      title: "Exception Handling",
      subtopics: [
        { slug: "checked-vs-unchecked", title: "Checked vs unchecked exceptions" },
        { slug: "try-catch-finally", title: "try-catch-finally" },
        { slug: "throw", title: "throw" },
        { slug: "throws", title: "throws" },
        { slug: "custom-exceptions", title: "Custom exceptions" },
        { slug: "exception-hierarchy", title: "Exception hierarchy" },
        { slug: "try-with-resources", title: "Try-with-resources" },
      ],
    },
    {
      slug: "java8",
      title: "Java 8+",
      emphasis: 3,
      notes: [{ kind: "callout", text: "Absolutely prepare all of these." }],
      subtopics: [
        { slug: "lambda", title: "Lambda expressions" },
        { slug: "functional-interfaces", title: "Functional interfaces" },
        { slug: "predicate", title: "Predicate" },
        { slug: "function", title: "Function" },
        { slug: "consumer", title: "Consumer" },
        { slug: "supplier", title: "Supplier" },
        { slug: "stream-api", title: "Stream API" },
        { slug: "map", title: "map" },
        { slug: "filter", title: "filter" },
        { slug: "reduce", title: "reduce" },
        { slug: "collect", title: "collect" },
        { slug: "sorted", title: "sorted" },
        { slug: "groupingby", title: "groupingBy" },
        { slug: "optional", title: "Optional" },
        { slug: "method-references", title: "Method references" },
      ],
    },
  ],
};

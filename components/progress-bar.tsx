import type { Stats } from "@/lib/stats";

/**
 * Stacked bar: mastered, then confident, then learning. Reading it left to
 * right shows how much of a topic is interview-ready versus merely touched.
 */
export function ProgressBar({
  stats,
  className = "",
}: {
  stats: Stats;
  className?: string;
}) {
  const share = (count: number) =>
    stats.total === 0 ? 0 : (count / stats.total) * 100;

  const segments = [
    { key: "mastered", width: share(stats.mastered), className: "bg-mastered" },
    {
      key: "confident",
      width: share(stats.confident - stats.mastered),
      className: "bg-confident",
    },
    {
      key: "learning",
      width: share(stats.started - stats.confident),
      className: "bg-learning",
    },
  ];

  return (
    <div
      className={`flex h-1.5 overflow-hidden rounded-full bg-border ${className}`}
      role="img"
      aria-label={`${stats.percent}% complete — ${stats.mastered} mastered, ${stats.confident - stats.mastered} confident, ${stats.started - stats.confident} learning, out of ${stats.total}`}
    >
      {segments.map((segment) => (
        <div
          key={segment.key}
          className={`${segment.className} transition-[width] duration-300`}
          style={{ width: `${segment.width}%` }}
        />
      ))}
    </div>
  );
}

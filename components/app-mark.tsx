/**
 * Three bars of decreasing width, in the priority-band colours — the same idea
 * the whole app is organised around.
 */
export function AppMark({ className = "size-9" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 flex-col items-center justify-center gap-[3px] rounded-xl border border-border bg-surface-raised ${className}`}
    >
      <span className="h-[3px] w-[45%] rounded-full bg-band-red" />
      <span className="h-[3px] w-[32%] rounded-full bg-band-orange" />
      <span className="h-[3px] w-[20%] rounded-full bg-band-yellow" />
    </span>
  );
}

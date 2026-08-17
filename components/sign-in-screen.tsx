import { AppMark } from "@/components/app-mark";
import { SignInButton } from "@/components/sign-in-button";
import { BAND_META, BAND_ORDER, TOPICS, TOTAL_SUBTOPICS } from "@/content";

function Check() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent">
      <path
        d="M4 10.5l4 4 8-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-border bg-background px-2 py-2.5">
      <p className="font-mono text-lg leading-none tabular-nums">{value}</p>
      <p className="mt-1 text-[11px] text-muted">{label}</p>
    </div>
  );
}

const FEATURES = [
  "Ordered by what interviews actually ask, not by chapter number",
  "Four confidence levels per subtopic — not a done/not-done checkbox",
  "Your own notes on any subtopic, searchable later",
];

export function SignInScreen() {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-12">
      {/* Soft accent wash so the card doesn't float on a flat field. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-10rem] left-1/2 h-[26rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative w-full max-w-md">
        <div className="flex flex-col items-center text-center">
          <AppMark className="size-12" />
          <h1 className="mt-4 text-[28px] leading-tight font-semibold tracking-tight">
            Interview Prep
          </h1>
          <p className="mt-2 text-sm text-muted">
            A study tracker for Java Full Stack and MERN interviews, built around
            one question: what are they most likely to ask?
          </p>
        </div>

        <div className="mt-7 rounded-2xl border border-border bg-surface p-5 shadow-xl sm:p-6">
          <div className="grid grid-cols-3 gap-2 text-center">
            <Stat value={String(TOPICS.length)} label="topics" />
            <Stat value={String(TOTAL_SUBTOPICS)} label="subtopics" />
            <Stat value="4" label="confidence levels" />
          </div>

          <ul className="mt-5 space-y-2.5">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex gap-2.5 text-[13px] leading-5">
                <Check />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-border pt-4">
            {BAND_ORDER.map((band) => (
              <span
                key={band}
                className="flex items-center gap-1.5 text-[11px] text-muted"
              >
                <span aria-hidden="true">{BAND_META[band].dot}</span>
                {BAND_META[band].label}
              </span>
            ))}
          </div>

          <div className="mt-5">
            <SignInButton />
          </div>

          <p className="mt-3.5 text-center text-[12px] leading-5 text-muted">
            Hassle-free, secure passwordless authentication. No password to
            create, none to remember, nothing to reset.
          </p>
        </div>

        <p className="mt-5 text-center text-[12px] text-muted">
          Progress is saved to your account, so it follows you across devices.
        </p>
      </div>
    </main>
  );
}

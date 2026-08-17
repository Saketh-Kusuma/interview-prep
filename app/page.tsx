import { AppMark } from "@/components/app-mark";
import { ErrorBanner } from "@/components/error-banner";
import { ProfileMenu, type ProfileUser } from "@/components/profile-menu";
import { ProgressProvider } from "@/components/progress-provider";
import { SearchPanel } from "@/components/search-panel";
import { SignInScreen } from "@/components/sign-in-screen";
import { SummaryPanel, type BandGroup } from "@/components/summary-panel";
import { TopicAccordion } from "@/components/topic-accordion";
import {
  ALL_SUBTOPIC_IDS,
  BAND_META,
  BAND_ORDER,
  SEARCH_INDEX,
  TOPICS,
  topicSubtopicIds,
} from "@/content";
import { STATUS, STATUS_META } from "@/content/types";
import { getCurrentUser } from "@/lib/auth/current-user";
import { getProgress } from "@/lib/db/progress";
import type { ProgressRecord } from "@/lib/stats";

function Legend() {
  const items = [
    STATUS.NOT_STARTED,
    STATUS.LEARNING,
    STATUS.CONFIDENT,
    STATUS.MASTERED,
  ];

  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted">
      <span className="font-medium">Tap a chip to cycle:</span>
      {items.map((status) => (
        <span key={status} className="flex items-center gap-1">
          <span className="rounded border border-border-strong px-1 font-mono">
            {STATUS_META[status].short}
          </span>
          {STATUS_META[status].label}
        </span>
      ))}
    </p>
  );
}

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) return <SignInScreen />;

  const progress = await getProgress(user.id);
  const initial: ProgressRecord = Object.fromEntries(
    [...progress].map(([id, value]) => [
      id,
      { status: value.status, note: value.note },
    ]),
  );

  const groups: BandGroup[] = BAND_ORDER.map((band) => ({
    key: band,
    dot: BAND_META[band].dot,
    label: BAND_META[band].label,
    ids: TOPICS.filter((topic) => topic.band === band).flatMap(topicSubtopicIds),
  }));

  const profile: ProfileUser = {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    // Formatted here so the client renders the identical string and hydration
    // doesn't trip over a locale or timezone difference.
    memberSince: user.createdAt.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    }),
  };

  return (
    // Keyed by user so signing in as someone else rebuilds the client state
    // instead of inheriting the previous account's progress.
    <ProgressProvider key={user.id} initial={initial}>
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <AppMark className="size-9" />
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold tracking-tight">
                Interview Prep
              </p>
              <p className="truncate text-[11px] text-muted">
                Highest-priority topics first
              </p>
            </div>
          </div>

          <ProfileMenu user={profile} allIds={ALL_SUBTOPIC_IDS} />
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <h1 className="sr-only">Interview Prep</h1>

        <SummaryPanel allIds={ALL_SUBTOPIC_IDS} groups={groups} />

        <div className="mt-5">
          <Legend />
        </div>

        <SearchPanel index={SEARCH_INDEX}>
          {BAND_ORDER.map((band) => {
            const topics = TOPICS.filter((topic) => topic.band === band);
            if (topics.length === 0) return null;

            return (
              <section key={band} className="mt-7">
                <div className="mb-2.5 flex items-baseline gap-2">
                  <h2 className="text-[13px] font-semibold tracking-wide uppercase">
                    <span aria-hidden="true">{BAND_META[band].dot} </span>
                    {BAND_META[band].label}
                  </h2>
                  <span className="text-[12px] text-muted">
                    {BAND_META[band].blurb}
                  </span>
                </div>

                <div className="space-y-2">
                  {topics.map((topic) => (
                    <TopicAccordion key={topic.slug} topic={topic} />
                  ))}
                </div>
              </section>
            );
          })}
        </SearchPanel>
      </div>

      <ErrorBanner />
    </ProgressProvider>
  );
}

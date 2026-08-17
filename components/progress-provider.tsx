"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type { Status } from "@/content/types";
import { setSubtopicNote, setSubtopicStatus } from "@/app/actions/progress";
import { EMPTY_ENTRY, type Entry, type ProgressRecord } from "@/lib/stats";

type ProgressContextValue = {
  entries: ProgressRecord;
  entry: (subtopicId: string) => Entry;
  setStatus: (subtopicId: string, status: Status) => void;
  setNote: (subtopicId: string, note: string) => void;
  savingIds: ReadonlySet<string>;
  error: string | null;
  dismissError: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

/**
 * Holds progress for the whole page.
 *
 * Writes are applied locally first and sent to the server in the background, so
 * clicking a status chip never waits on a round trip. The server actions
 * deliberately don't revalidate the page: re-rendering ~390 rows on every click
 * would be slower than the update it replaces, and this state is already the
 * newest version. A reload reads the database again.
 */
export function ProgressProvider({
  initial,
  children,
}: {
  initial: ProgressRecord;
  children: ReactNode;
}) {
  const [entries, setEntries] = useState<ProgressRecord>(initial);
  const [savingIds, setSavingIds] = useState<ReadonlySet<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  // Mirrors `entries` so a rollback can read the pre-edit value without making
  // every callback depend on the latest render's state.
  const latest = useRef<ProgressRecord>(initial);

  const apply = useCallback((subtopicId: string, patch: Partial<Entry>) => {
    const previous = latest.current[subtopicId] ?? EMPTY_ENTRY;
    const next: ProgressRecord = {
      ...latest.current,
      [subtopicId]: { ...previous, ...patch },
    };
    latest.current = next;
    setEntries(next);
    return previous;
  }, []);

  const rollback = useCallback((subtopicId: string, previous: Entry) => {
    const next: ProgressRecord = { ...latest.current, [subtopicId]: previous };
    latest.current = next;
    setEntries(next);
  }, []);

  const markSaving = useCallback((subtopicId: string, saving: boolean) => {
    setSavingIds((current) => {
      const next = new Set(current);
      if (saving) next.add(subtopicId);
      else next.delete(subtopicId);
      return next;
    });
  }, []);

  const save = useCallback(
    async (
      subtopicId: string,
      patch: Partial<Entry>,
      persist: () => Promise<void>,
      failureMessage: string,
    ) => {
      const previous = apply(subtopicId, patch);
      markSaving(subtopicId, true);
      try {
        await persist();
        setError(null);
      } catch {
        rollback(subtopicId, previous);
        setError(failureMessage);
      } finally {
        markSaving(subtopicId, false);
      }
    },
    [apply, markSaving, rollback],
  );

  const setStatus = useCallback(
    (subtopicId: string, status: Status) => {
      void save(
        subtopicId,
        { status },
        () => setSubtopicStatus(subtopicId, status),
        "Couldn't save that status. Check your connection and try again.",
      );
    },
    [save],
  );

  const setNote = useCallback(
    (subtopicId: string, note: string) => {
      const trimmed = note.trim();
      void save(
        subtopicId,
        { note: trimmed.length > 0 ? trimmed : null },
        () => setSubtopicNote(subtopicId, trimmed),
        "Couldn't save that note. Your text is still here — try again.",
      );
    },
    [save],
  );

  const value = useMemo<ProgressContextValue>(
    () => ({
      entries,
      entry: (subtopicId) => entries[subtopicId] ?? EMPTY_ENTRY,
      setStatus,
      setNote,
      savingIds,
      error,
      dismissError: () => setError(null),
    }),
    [entries, setStatus, setNote, savingIds, error],
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used inside a ProgressProvider.");
  }
  return context;
}

"use client";

import { useId, useRef, useState } from "react";

import { useProgress } from "@/components/progress-provider";
import { StatusChip } from "@/components/status-chip";
import { NOTE_MAX_LENGTH } from "@/lib/limits";

export function SubtopicRow({ id, title }: { id: string; title: string }) {
  const { entry, setStatus, setNote, savingIds } = useProgress();
  const { status, note } = entry(id);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const textareaId = useId();
  // Lets Escape close the editor without the blur handler also saving.
  const cancelled = useRef(false);

  function openEditor() {
    setDraft(note ?? "");
    cancelled.current = false;
    setEditing(true);
  }

  function commit() {
    if (cancelled.current) return;
    if (draft.trim() !== (note ?? "")) setNote(id, draft);
    setEditing(false);
  }

  const overLimit = draft.length > NOTE_MAX_LENGTH;

  return (
    <li className="group/row flex items-start gap-2.5 py-1">
      <StatusChip
        status={status}
        label={title}
        saving={savingIds.has(id)}
        onChange={(next) => setStatus(id, next)}
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm leading-6">{title}</span>
          {!editing && (
            <button
              type="button"
              onClick={openEditor}
              className="shrink-0 rounded text-[11px] text-muted underline decoration-dotted underline-offset-2 transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              {note ? "edit note" : "+ note"}
            </button>
          )}
        </div>

        {note && !editing && (
          <p className="mt-0.5 border-l-2 border-border-strong pl-2 text-[13px] whitespace-pre-wrap text-muted">
            {note}
          </p>
        )}

        {editing && (
          <div className="mt-1">
            <label className="sr-only" htmlFor={textareaId}>
              Note for {title}
            </label>
            <textarea
              id={textareaId}
              autoFocus
              rows={3}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onBlur={commit}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  cancelled.current = true;
                  setEditing(false);
                } else if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                  event.preventDefault();
                  event.currentTarget.blur();
                }
              }}
              className="w-full resize-y rounded-md border border-border bg-surface px-2 py-1.5 text-[13px] leading-5 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
              placeholder="What tripped you up, the one-line answer, a link…"
            />
            <div className="mt-1 flex items-center justify-between text-[11px] text-muted">
              <span>Click away or press ⌘/Ctrl+Enter to save · Esc to cancel</span>
              <span className={overLimit ? "text-band-red" : undefined}>
                {draft.length}/{NOTE_MAX_LENGTH}
              </span>
            </div>
          </div>
        )}
      </div>
    </li>
  );
}

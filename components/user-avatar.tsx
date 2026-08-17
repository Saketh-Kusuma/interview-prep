"use client";

import Image from "next/image";
import { useState } from "react";

function initialsOf(name: string | null, email: string | null): string {
  const source = name?.trim() || email?.trim() || "";
  if (!source) return "?";

  const words = source.split(/[\s@._-]+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

/**
 * Google avatar with an initials fallback. Those URLs can expire or be blocked,
 * so `onError` matters: without it a dead link leaves a broken-image icon.
 */
export function UserAvatar({
  photoURL,
  displayName,
  email,
  size,
  className = "",
}: {
  photoURL: string | null;
  displayName: string | null;
  email: string | null;
  size: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const shared = `shrink-0 rounded-full ring-1 ring-border ${className}`;

  if (!photoURL || failed) {
    return (
      <span
        aria-hidden="true"
        style={{ width: size, height: size, fontSize: Math.round(size * 0.4) }}
        className={`${shared} inline-flex items-center justify-center bg-surface-raised font-semibold text-muted`}
      >
        {initialsOf(displayName, email)}
      </span>
    );
  }

  return (
    <Image
      src={photoURL}
      alt=""
      width={size}
      height={size}
      onError={() => setFailed(true)}
      className={`${shared} object-cover`}
    />
  );
}

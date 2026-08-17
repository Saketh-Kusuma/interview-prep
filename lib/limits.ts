/**
 * Shared limits. Kept out of the Server Actions file because a `"use server"`
 * module may only export async functions — a plain constant there is a build
 * error, and both the action and the textarea need this value.
 */
export const NOTE_MAX_LENGTH = 4000;

import type { PlaygroundConsoleLevel } from './sandbox';

export interface ConsoleEntry {
  id: number;
  level: PlaygroundConsoleLevel;
  message: string;
  /** Number of identical consecutive messages collapsed into this entry. */
  count: number;
}

export const MAX_CONSOLE_ENTRIES = 500;

/**
 * Appends a console message, collapsing it into the previous entry when it repeats and keeping the newest
 * {@link MAX_CONSOLE_ENTRIES} entries.
 */
export function appendConsoleEntry(
  entries: readonly ConsoleEntry[],
  next: { level: PlaygroundConsoleLevel; message: string },
  id: number,
): ConsoleEntry[] {
  const last = entries[entries.length - 1];
  if (last && last.level === next.level && last.message === next.message) {
    return [...entries.slice(0, -1), { ...last, count: last.count + 1 }];
  }

  const appended = [...entries, { id, level: next.level, message: next.message, count: 1 }];
  return appended.length > MAX_CONSOLE_ENTRIES ? appended.slice(appended.length - MAX_CONSOLE_ENTRIES) : appended;
}

export function countConsoleEntries(entries: readonly ConsoleEntry[], level: PlaygroundConsoleLevel): number {
  return entries.reduce((total, entry) => (entry.level === level ? total + entry.count : total), 0);
}

import { MAX_CONSOLE_ENTRIES, appendConsoleEntry, countConsoleEntries, type ConsoleEntry } from './consoleEntries';

describe('console entries', () => {
  it('collapses identical consecutive messages', () => {
    let entries: ConsoleEntry[] = [];
    entries = appendConsoleEntry(entries, { level: 'log', message: 'tick' }, 1);
    entries = appendConsoleEntry(entries, { level: 'log', message: 'tick' }, 2);
    entries = appendConsoleEntry(entries, { level: 'warn', message: 'tick' }, 3);

    expect(entries).toEqual([
      { id: 1, level: 'log', message: 'tick', count: 2 },
      { id: 3, level: 'warn', message: 'tick', count: 1 },
    ]);
    expect(countConsoleEntries(entries, 'log')).toBe(2);
    expect(countConsoleEntries(entries, 'error')).toBe(0);
  });

  it('keeps only the newest entries', () => {
    let entries: ConsoleEntry[] = [];
    for (let index = 0; index < MAX_CONSOLE_ENTRIES + 5; index++) {
      entries = appendConsoleEntry(entries, { level: 'log', message: String(index) }, index);
    }

    expect(entries).toHaveLength(MAX_CONSOLE_ENTRIES);
    expect(entries[0].message).toBe('5');
  });
});

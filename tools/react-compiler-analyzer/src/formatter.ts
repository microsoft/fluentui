import type { OutputFormat } from './types';

/** A single table cell value. Numbers are stringified during rendering. */
export type Cell = string | number;

/**
 * Abstraction over output rendering so reporters can emit either GitHub-flavored
 * markdown (`md`) or terminal-friendly plain text (`cli`) from the same call sites.
 *
 * Each method maps to one logical block of output. Implementations write line-by-line
 * through the injected `write` sink (defaults to `console.log`).
 */
export interface Formatter {
  /** The active output format. */
  readonly format: OutputFormat;
  /** Section heading, `level` 1–4. */
  heading(level: number, text: string): void;
  /** A single line of body text. May contain markdown inline emphasis (`**bold**`, `` `code` ``). */
  line(text: string): void;
  /** A blank separator line. */
  blank(): void;
  /** A table with header cells and row cells. */
  table(headers: string[], rows: Cell[][]): void;
  /** A collapsible details block. `body` is invoked to emit its contents. */
  details(summary: string, body: () => void): void;
  /** A fenced/pre code block. `text` may span multiple lines. */
  code(text: string): void;
}

type Writer = (line: string) => void;

const defaultWrite: Writer = line => console.log(line);

/** Strip markdown inline emphasis markers (`**`, backticks) for plain-text rendering. */
function stripInline(text: string): string {
  return text.replace(/\*\*/g, '').replace(/`/g, '');
}

class MarkdownFormatter implements Formatter {
  public readonly format = 'md' as const;

  constructor(private write: Writer) {}

  public heading(level: number, text: string): void {
    this.write('#'.repeat(level) + ' ' + text);
  }

  public line(text: string): void {
    this.write(text);
  }

  public blank(): void {
    this.write('');
  }

  public table(headers: string[], rows: Cell[][]): void {
    this.write('| ' + headers.join(' | ') + ' |');
    this.write('|' + headers.map(h => '-'.repeat(h.length + 2)).join('|') + '|');
    for (const row of rows) {
      this.write('| ' + row.map(String).join(' | ') + ' |');
    }
  }

  public details(summary: string, body: () => void): void {
    this.write(`<details><summary>${summary}</summary>`);
    this.write('');
    body();
    this.write('</details>');
    this.write('');
  }

  public code(text: string): void {
    this.write('```');
    this.write(text);
    this.write('```');
  }
}

class CliFormatter implements Formatter {
  public readonly format = 'cli' as const;

  constructor(private write: Writer) {}

  public heading(level: number, text: string): void {
    const t = stripInline(text);
    if (level <= 1) {
      this.write(t);
      this.write('═'.repeat(t.length));
    } else if (level === 2) {
      this.write(t);
      this.write('─'.repeat(t.length));
    } else if (level === 3) {
      this.write('▸ ' + t);
    } else {
      this.write('• ' + t);
    }
  }

  public line(text: string): void {
    // Drop markdown emphasis and convert leading blockquote markers to indentation.
    const t = stripInline(text).replace(/^> ?/, '  ');
    this.write(t);
  }

  public blank(): void {
    this.write('');
  }

  public table(headers: string[], rows: Cell[][]): void {
    const cells = (row: Cell[]): string[] => row.map(c => stripInline(String(c)));
    const headerCells = headers.map(stripInline);
    const bodyRows = rows.map(cells);

    const widths = headerCells.map((h, i) => Math.max(h.length, ...bodyRows.map(r => (r[i] ?? '').length), 0));

    const renderRow = (row: string[]): string =>
      row
        .map((c, i) => (c ?? '').padEnd(widths[i]))
        .join('  ')
        .trimEnd();

    this.write(renderRow(headerCells));
    this.write(widths.map(w => '─'.repeat(w)).join('  '));
    for (const row of bodyRows) {
      this.write(renderRow(row));
    }
  }

  public details(summary: string, body: () => void): void {
    this.write(stripInline(summary));
    this.write('');
    body();
  }

  public code(text: string): void {
    for (const ln of text.split('\n')) {
      this.write('    ' + ln);
    }
  }
}

/**
 * Create a {@link Formatter} for the given output `format`.
 *
 * @param format - `cli` for terminal-friendly plain text, `md` for GitHub-flavored markdown.
 * @param write - Line sink. Defaults to `console.log`.
 */
export function createFormatter(format: OutputFormat, write: Writer = defaultWrite): Formatter {
  return format === 'md' ? new MarkdownFormatter(write) : new CliFormatter(write);
}

import type { OutputFormat } from './types';

/** A single table cell value. Numbers are stringified during rendering. */
export type Cell = string | number;

/**
 * Abstraction over output rendering so reporters can emit terminal-friendly plain text (`cli`),
 * GitHub-flavored markdown (`md`), or a styled HTML document (`html`) from the same call sites.
 *
 * Each method maps to one logical block of output. Implementations write line-by-line
 * through the injected `write` sink (defaults to `console.log`).
 */
export interface Formatter {
  /** The active output format. */
  readonly format: OutputFormat;
  /** Write a line verbatim to the sink (no transformation). Used for format-specific wrappers. */
  raw(line: string): void;
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

/** Escape the five characters that are unsafe in HTML text/attribute content. */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Escape HTML, then convert markdown inline emphasis (`**bold**`, `` `code` ``) to HTML tags. */
function inlineHtml(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

class MarkdownFormatter implements Formatter {
  public readonly format = 'md' as const;

  constructor(private write: Writer) {}

  public raw(line: string): void {
    this.write(line);
  }

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

  public raw(line: string): void {
    this.write(line);
  }

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

class HtmlFormatter implements Formatter {
  public readonly format = 'html' as const;

  constructor(private write: Writer) {}

  public raw(line: string): void {
    this.write(line);
  }

  public heading(level: number, text: string): void {
    const l = Math.min(Math.max(level, 1), 4);
    this.write(`<h${l}>${inlineHtml(text)}</h${l}>`);
  }

  public line(text: string): void {
    // Bare blockquote spacer (`>`): drop it, HTML uses block spacing.
    if (text.trim() === '>') {
      return;
    }
    // Blockquote (`> ...`) -> note callout.
    if (text.startsWith('> ')) {
      this.write(`<p class="note">${inlineHtml(text.slice(2))}</p>`);
      return;
    }
    // List item (`- ...`, optionally indented by pairs of spaces) -> indented row.
    const li = text.match(/^(\s*)-\s+(.*)$/);
    if (li) {
      const depth = Math.floor(li[1].length / 2);
      const indent = (0.4 + depth * 1.2).toFixed(1);
      this.write(`<div class="li" style="padding-left:${indent}rem">${inlineHtml(li[2])}</div>`);
      return;
    }
    this.write(`<p>${inlineHtml(text)}</p>`);
  }

  public blank(): void {
    // No-op: HTML block elements provide their own spacing.
  }

  public table(headers: string[], rows: Cell[][]): void {
    const head = headers.map(h => `<th>${inlineHtml(h)}</th>`).join('');
    const body = rows.map(r => `<tr>${r.map(c => `<td>${inlineHtml(String(c))}</td>`).join('')}</tr>`).join('');
    this.write(`<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`);
  }

  public details(summary: string, body: () => void): void {
    this.write(`<details><summary>${inlineHtml(summary)}</summary>`);
    body();
    this.write('</details>');
  }

  public code(text: string): void {
    this.write(`<pre class="code"><code>${escapeHtml(text)}</code></pre>`);
  }
}

/** Embedded stylesheet for the standalone HTML report. Light theme with an indigo accent. */
const HTML_STYLES = `
:root{--bg:#fff;--fg:#1b1b1f;--muted:#5b5b66;--accent:#5b3df5;--border:#e3e3ea;--note:#f4f2ff;--code-bg:#1b1b1f;--code-fg:#e8e8ef;}
*{box-sizing:border-box}
body{margin:0;font:15px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:var(--fg);background:var(--bg);}
.report{max-width:960px;margin:0 auto;padding:2rem 1.5rem 4rem;}
.banner{font-size:1.6rem;font-weight:700;margin:0 0 1.5rem;padding-bottom:.6rem;border-bottom:3px solid var(--accent);}
h2{font-size:1.25rem;margin:2rem 0 .75rem;}
h3{font-size:1.05rem;margin:1.5rem 0 .5rem;color:var(--accent);}
h4{font-size:.95rem;margin:1rem 0 .4rem;color:var(--muted);}
p{margin:.35rem 0;}
.li{margin:.2rem 0;}
strong{font-weight:650;}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.85em;background:#f0f0f5;padding:.1em .35em;border-radius:4px;}
table{border-collapse:collapse;width:100%;margin:.75rem 0 1.25rem;font-size:.9rem;}
th,td{text-align:left;padding:.5rem .75rem;border-bottom:1px solid var(--border);}
th{background:#faf9ff;font-weight:650;border-bottom:2px solid var(--border);}
tbody tr:nth-child(even){background:#fafafe;}
tbody tr:hover{background:var(--note);}
.note{background:var(--note);border-left:3px solid var(--accent);padding:.6rem .9rem;border-radius:0 6px 6px 0;margin:.75rem 0;}
pre.code{background:var(--code-bg);color:var(--code-fg);padding:1rem;border-radius:8px;overflow:auto;font-size:.82rem;line-height:1.45;}
pre.code code{background:none;padding:0;color:inherit;}
details{margin:1rem 0;}
summary{cursor:pointer;font-weight:600;color:var(--muted);}
.scan-log{background:#fafafe;border:1px solid var(--border);border-radius:8px;padding:.5rem .9rem;}
.scan-body{margin-top:.5rem;}
.log-line{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.8rem;color:var(--muted);white-space:pre-wrap;}
`.trim();

/** Wrap rendered HTML `body` content in a standalone, self-contained HTML document. */
export function renderHtmlDocument(title: string, body: string): string {
  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<title>${escapeHtml(title)}</title>`,
    `<style>${HTML_STYLES}</style>`,
    '</head>',
    '<body>',
    `<main class="report">`,
    `<h1 class="banner">${escapeHtml(title)}</h1>`,
    body,
    '</main>',
    '</body>',
    '</html>',
  ].join('\n');
}

/**
 * Create a {@link Formatter} for the given output `format`.
 *
 * @param format - `cli` for terminal-friendly plain text, `md` for GitHub-flavored markdown,
 *   `html` for a styled HTML document.
 * @param write - Line sink. Defaults to `console.log`.
 */
export function createFormatter(format: OutputFormat, write: Writer = defaultWrite): Formatter {
  switch (format) {
    case 'md':
      return new MarkdownFormatter(write);
    case 'html':
      return new HtmlFormatter(write);
    default:
      return new CliFormatter(write);
  }
}

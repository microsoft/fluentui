import type { OutputFormat } from './types';

/** A single table cell value. Numbers are stringified during rendering. */
export type Cell = string | number;

/**
 * Semantic color for a compiler state, used to colorize section headings:
 * - `success` (green) — compiled functions
 * - `error` (red) — compiler bailouts
 * - `warning` (yellow) — skipped functions / needs review
 * - `info` (blue) — migration candidates
 */
export type StatusKind = 'success' | 'error' | 'warning' | 'info';

/** Options for {@link Formatter.foldableSection}. */
export interface FoldableSectionOptions {
  /** Chapter title, rendered as its heading / fold summary. */
  title: string;
  /** Number of entries in the chapter, shown as a count badge / `(N)` suffix. Omit to hide. */
  count?: number;
  /** Semantic status used to color the heading / fold. */
  status?: StatusKind;
  /** In `html`, start expanded instead of collapsed. Ignored by `cli`/`md`. Default `false`. */
  defaultOpen?: boolean;
  /** Heading level for `cli`/`md` rendering. Default `2`. */
  level?: number;
}

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
  /**
   * Section heading, `level` 1–4. An optional `status` colors the heading by compiler state
   * (cli: ANSI when attached to a TTY; html: CSS class; md: ignored — no color support).
   */
  heading(level: number, text: string, status?: StatusKind): void;
  /**
   * Wrap a related block of output in a status-colored section. In `html` this renders a
   * container with a light tinted background for the whole block; in `cli`/`md` it is a
   * transparent passthrough that simply invokes `body` (no extra markup).
   */
  section(status: StatusKind, body: () => void): void;
  /**
   * A titled, countable "chapter". The `title` and entry `count` are emitted as the chapter's
   * own heading (so `body` must NOT repeat them). In `html` the chapter is a collapsible
   * `<details class="fold">` (collapsed unless `defaultOpen`) with a count badge and an id, which
   * the sticky navigation bar links to. In `cli`/`md` it renders as a normal heading
   * `Title (count)` followed by the body — no folding.
   */
  foldableSection(opts: FoldableSectionOptions, body: () => void): void;
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

/** ANSI SGR color codes per semantic status, plus reset. */
const ANSI_COLOR: Record<StatusKind, string> = {
  success: '\x1b[32m', // green
  error: '\x1b[31m', // red
  warning: '\x1b[33m', // yellow
  info: '\x1b[34m', // blue
};
const ANSI_RESET = '\x1b[0m';

/**
 * Whether ANSI colors should be emitted for terminal output. Honors `NO_COLOR` and
 * `FORCE_COLOR`, otherwise only colorizes when stdout is an interactive TTY. This keeps
 * piped output (and the non-TTY test environment) plain.
 */
function cliColorEnabled(): boolean {
  const { NO_COLOR, FORCE_COLOR } = process.env;
  if (NO_COLOR) {
    return false;
  }
  if (FORCE_COLOR) {
    return true;
  }
  return Boolean(process.stdout && process.stdout.isTTY);
}

/** Map a semantic status to its HTML class name. */
function statusClass(status: StatusKind): string {
  return `status-${status}`;
}

/** Strip markdown inline emphasis markers (`**`, backticks) for plain-text rendering. */
function stripInline(text: string): string {
  return text.replace(/\*\*/g, '').replace(/`/g, '');
}

/** Render a foldable chapter's heading text, e.g. `Compiled but Risky (4)`. */
function foldableHeadingText(opts: FoldableSectionOptions): string {
  return opts.count === undefined ? opts.title : `${opts.title} (${opts.count})`;
}

/** Slugify a chapter title into a stable, URL-safe id for in-page anchors. */
function slugify(text: string): string {
  return (
    stripInline(text)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'section'
  );
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

  public heading(level: number, text: string, _status?: StatusKind): void {
    this.write('#'.repeat(level) + ' ' + text);
  }

  public section(_status: StatusKind, body: () => void): void {
    body();
  }

  public foldableSection(opts: FoldableSectionOptions, body: () => void): void {
    this.write('#'.repeat(opts.level ?? 2) + ' ' + foldableHeadingText(opts));
    this.write('');
    body();
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
  private readonly color = cliColorEnabled();

  constructor(private write: Writer) {}

  public raw(line: string): void {
    this.write(line);
  }

  public heading(level: number, text: string, status?: StatusKind): void {
    const t = stripInline(text);
    if (level <= 1) {
      this.write(this._colorize(t, status));
      this.write('═'.repeat(t.length));
    } else if (level === 2) {
      this.write(this._colorize(t, status));
      this.write('─'.repeat(t.length));
    } else if (level === 3) {
      this.write(this._colorize('▸ ' + t, status));
    } else {
      this.write(this._colorize('• ' + t, status));
    }
  }

  public section(_status: StatusKind, body: () => void): void {
    body();
  }

  public foldableSection(opts: FoldableSectionOptions, body: () => void): void {
    this.heading(opts.level ?? 2, foldableHeadingText(opts), opts.status);
    this.write('');
    body();
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

  private _colorize(text: string, status?: StatusKind): string {
    return status && this.color ? `${ANSI_COLOR[status]}${text}${ANSI_RESET}` : text;
  }
}

class HtmlFormatter implements Formatter {
  public readonly format = 'html' as const;

  constructor(private write: Writer) {}

  public raw(line: string): void {
    this.write(line);
  }

  public heading(level: number, text: string, status?: StatusKind): void {
    const l = Math.min(Math.max(level, 1), 4);
    const cls = status ? ` class="${statusClass(status)}"` : '';
    this.write(`<h${l}${cls}>${inlineHtml(text)}</h${l}>`);
  }

  public section(status: StatusKind, body: () => void): void {
    this.write(`<section class="status-section ${statusClass(status)}">`);
    body();
    this.write('</section>');
  }

  public foldableSection(opts: FoldableSectionOptions, body: () => void): void {
    const statusCls = opts.status ? ` ${statusClass(opts.status)}` : '';
    const openAttr = opts.defaultOpen ? ' open' : '';
    const id = slugify(opts.title);
    const countAttr = opts.count === undefined ? '' : ` data-count="${opts.count}"`;
    const badge = opts.count === undefined ? '' : ` <span class="fold-count">${opts.count}</span>`;
    this.write(
      `<details class="fold${statusCls}" id="${id}" data-title="${escapeHtml(
        stripInline(opts.title),
      )}"${countAttr}${openAttr}>`,
    );
    this.write(`<summary><span class="fold-title">${inlineHtml(opts.title)}</span>${badge}</summary>`);
    this.write('<div class="fold-body">');
    body();
    this.write('</div></details>');
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
    // Wrap in a horizontal-scroll container so a wide table never forces the whole
    // document to overflow — it scrolls within its own bounds as a last resort.
    this.write(`<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`);
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
html{overflow-x:hidden;}
body{margin:0;font:15px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:var(--fg);background:var(--bg);overflow-wrap:break-word;}
.report{max-width:960px;margin:0 auto;padding:2rem 1.5rem 4rem;}
.banner{font-size:1.6rem;font-weight:700;margin:0 0 1.5rem;padding-bottom:.6rem;border-bottom:3px solid var(--accent);}
h2{font-size:1.25rem;margin:2rem 0 .75rem;}
h3{font-size:1.05rem;margin:1.5rem 0 .5rem;color:var(--accent);}
h4{font-size:.95rem;margin:1rem 0 .4rem;color:var(--muted);overflow-wrap:anywhere;}
h2.status-success,h3.status-success,h4.status-success{color:#1a7f37;}
h2.status-error,h3.status-error,h4.status-error{color:#cf222e;}
h2.status-warning,h3.status-warning,h4.status-warning{color:#9a6700;}
h2.status-info,h3.status-info,h4.status-info{color:#0969da;}
.status-section{border-radius:8px;padding:.25rem 1rem 1rem;margin:1.25rem 0;border-left:4px solid transparent;overflow:hidden;}
.status-section>h2,.status-section>h3{margin-top:.75rem;}
.status-section.status-success{background:#f3fbf5;border-left-color:#1a7f37;}
.status-section.status-error{background:#fdf4f5;border-left-color:#cf222e;}
.status-section.status-warning{background:#fdfaf1;border-left-color:#9a6700;}
.status-section.status-info{background:#f2f8fe;border-left-color:#0969da;}
.status-section .table-wrap table{background:rgba(255,255,255,.55);}
p{margin:.35rem 0;}
.li{margin:.2rem 0;}
strong{font-weight:650;}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.85em;background:#f0f0f5;padding:.1em .35em;border-radius:4px;overflow-wrap:anywhere;}
.table-wrap{max-width:100%;overflow-x:auto;margin:.75rem 0 1.25rem;}
table{border-collapse:collapse;width:100%;font-size:.9rem;}
th,td{text-align:left;padding:.5rem .75rem;border-bottom:1px solid var(--border);overflow-wrap:anywhere;vertical-align:top;}
th{background:#faf9ff;font-weight:650;border-bottom:2px solid var(--border);white-space:nowrap;}
tbody tr:nth-child(even){background:#fafafe;}
tbody tr:hover{background:var(--note);}
.note{background:var(--note);border-left:3px solid var(--accent);padding:.6rem .9rem;border-radius:0 6px 6px 0;margin:.75rem 0;overflow-wrap:anywhere;}
pre.code{background:var(--code-bg);color:var(--code-fg);padding:1rem;border-radius:8px;max-width:100%;overflow:auto;font-size:.82rem;line-height:1.45;}
pre.code code{background:none;padding:0;color:inherit;overflow-wrap:normal;}
details{margin:1rem 0;}
summary{cursor:pointer;font-weight:600;color:var(--muted);}
.scan-log{background:#fafafe;border:1px solid var(--border);border-radius:8px;padding:.5rem .9rem;}
.scan-body{margin-top:.5rem;}
.log-line{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.8rem;color:var(--muted);white-space:pre-wrap;overflow-wrap:anywhere;}
/* Foldable chapters */
details.fold{margin:1rem 0;border:1px solid var(--border);border-radius:8px;overflow:hidden;background:#fff;}
details.fold>summary{display:flex;align-items:center;gap:.6rem;padding:.7rem 1rem;font-size:1.05rem;font-weight:650;color:var(--fg);background:#faf9ff;list-style:none;scroll-margin-top:4rem;}
details.fold>summary::-webkit-details-marker{display:none;}
details.fold>summary::before{content:"▸";color:var(--muted);font-size:.8em;transition:transform .15s;}
details.fold[open]>summary::before{transform:rotate(90deg);}
details.fold>summary:hover{background:var(--note);}
details.fold .fold-title{flex:1;}
.fold-count{flex:none;min-width:1.5rem;text-align:center;font-size:.8rem;font-weight:650;color:var(--muted);background:#eceaf6;border-radius:999px;padding:.05rem .5rem;}
.fold-body{padding:.25rem 1rem 1rem;}
details.fold.status-success>summary{color:#1a7f37;}
details.fold.status-error>summary{color:#cf222e;}
details.fold.status-warning>summary{color:#9a6700;}
details.fold.status-info>summary{color:#0969da;}
/* Status-tinted chapter backgrounds (whole fold + deeper summary header), with a left accent. */
details.fold.status-success{background:#f3fbf5;border-left:4px solid #1a7f37;}
details.fold.status-error{background:#fdf4f5;border-left:4px solid #cf222e;}
details.fold.status-warning{background:#fdfaf1;border-left:4px solid #9a6700;}
details.fold.status-info{background:#f2f8fe;border-left:4px solid #0969da;}
details.fold.status-success>summary{background:#e7f6ec;}
details.fold.status-error>summary{background:#fbe9eb;}
details.fold.status-warning>summary{background:#fbf1de;}
details.fold.status-info>summary{background:#e7f1fd;}
details.fold.status-success>summary:hover{background:#daf0e1;}
details.fold.status-error>summary:hover{background:#f7dade;}
details.fold.status-warning>summary:hover{background:#f7e8c8;}
details.fold.status-info>summary:hover{background:#d8e8fb;}
details.fold .table-wrap table{background:rgba(255,255,255,.55);}
/* Sticky navigation bar */
.fold-bar{position:fixed;top:0;left:0;right:0;z-index:50;display:none;flex-wrap:wrap;align-items:center;gap:.4rem;padding:.5rem .9rem;background:rgba(255,255,255,.92);backdrop-filter:blur(6px);border-bottom:1px solid var(--border);box-shadow:0 1px 6px rgba(0,0,0,.06);}
.fold-bar.visible{display:flex;}
.fold-bar .nav-chip{cursor:pointer;font-size:.78rem;font-weight:600;color:var(--muted);background:#f0f0f5;border:1px solid var(--border);border-radius:999px;padding:.2rem .6rem;white-space:nowrap;}
.fold-bar .nav-chip:hover{background:var(--note);color:var(--fg);}
.fold-bar .nav-chip .chip-count{color:var(--accent);font-weight:700;margin-left:.25rem;}
.fold-bar .nav-spacer{flex:1;}
.fold-bar .nav-act{cursor:pointer;font-size:.74rem;font-weight:600;color:var(--accent);background:none;border:1px solid var(--accent);border-radius:6px;padding:.2rem .55rem;}
.fold-bar .nav-act:hover{background:var(--accent);color:#fff;}
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
    '<nav class="fold-bar" aria-label="Report sections"></nav>',
    `<main class="report">`,
    `<h1 class="banner">${escapeHtml(title)}</h1>`,
    body,
    '</main>',
    `<script>${HTML_NAV_SCRIPT}</script>`,
    '</body>',
    '</html>',
  ].join('\n');
}

/**
 * Inline, dependency-free script that builds the sticky chapter-navigation bar at runtime from
 * the rendered `details.fold` chapters. It populates one chip per chapter (title + entry count),
 * adds Expand/Collapse-all controls, reveals the bar once the reader scrolls past the first
 * chapter, and jumps to (and opens) a chapter when its chip is clicked. Runs from `file://` with
 * no external dependencies.
 */
const HTML_NAV_SCRIPT = `
(function(){
  var bar = document.querySelector('.fold-bar');
  if (!bar) return;
  var folds = Array.prototype.slice.call(document.querySelectorAll('details.fold'));
  if (!folds.length) return;

  folds.forEach(function(d){
    var chip = document.createElement('span');
    chip.className = 'nav-chip';
    var title = d.getAttribute('data-title') || 'Section';
    var count = d.getAttribute('data-count');
    chip.textContent = title;
    if (count !== null) {
      var c = document.createElement('span');
      c.className = 'chip-count';
      c.textContent = count;
      chip.appendChild(c);
    }
    chip.addEventListener('click', function(){
      d.open = true;
      d.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    bar.appendChild(chip);
  });

  var spacer = document.createElement('span');
  spacer.className = 'nav-spacer';
  bar.appendChild(spacer);
  function mkAct(label, open){
    var b = document.createElement('button');
    b.className = 'nav-act';
    b.textContent = label;
    b.addEventListener('click', function(){ folds.forEach(function(d){ d.open = open; }); });
    bar.appendChild(b);
  }
  mkAct('Expand all', true);
  mkAct('Collapse all', false);

  var threshold = folds[0].offsetTop;
  function onScroll(){
    if (window.scrollY > threshold) { bar.classList.add('visible'); }
    else { bar.classList.remove('visible'); }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
`.trim();

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

import type {
  LongReportOutput,
  Metadata,
  ComponentUsage,
  HookUsage,
  FunctionUsage,
  PropUsage,
  SymbolUsage,
  UnknownSymbolUsage,
} from './types';

/**
 * Format LongReportOutput as a self-contained HTML report.
 * HTML provides comprehensive prop/argument detail that markdown intentionally omits.
 */
export function formatMetadataAsHtml(data: LongReportOutput): string {
  const { fileMap, packages: metadata } = data;
  const packageNames = Object.keys(metadata).sort();

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Fluent UI Usage Report</title>
${renderStyles()}
</head>
<body>
<main>
<h1>Fluent UI Codebase Usage Report</h1>
${
  packageNames.length === 0 && fileMap.length === 0
    ? '<p class="empty">No Fluent UI package usage found.</p>'
    : renderBody(metadata, packageNames, fileMap)
}
</main>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Top-level sections
// ---------------------------------------------------------------------------

function renderBody(metadata: Metadata, packageNames: string[], fileMap: string[]): string {
  return [
    renderFileMap(fileMap),
    renderSummaryTable(metadata, packageNames),
    ...packageNames.map(name => renderPackageSection(name, metadata[name])),
  ].join('\n');
}

function renderFileMap(fileMap: string[]): string {
  if (fileMap.length === 0) {
    return '';
  }

  const fileItems = fileMap.map(f => `<li><code>${esc(f)}</code></li>`).join('\n');

  return `<section class="file-map">
<details>
<summary><strong>Files analyzed:</strong> ${fileMap.length}</summary>
<ul class="file-list">
${fileItems}
</ul>
</details>
</section>`;
}

function renderSummaryTable(metadata: Metadata, packageNames: string[]): string {
  const scopeGroups = groupByScope(packageNames);

  const scopeSections = scopeGroups.map(([scope, names]) => {
    const rows = names.map(name => {
      const pkg = metadata[name];
      const anchor = toAnchorId(name);
      return `<tr>
<td><a href="#${anchor}"><code>${esc(name)}</code></a></td>
<td>${Object.keys(pkg.components).length}</td>
<td>${Object.keys(pkg.hooks).length}</td>
<td>${Object.keys(pkg.types).length}</td>
<td>${Object.keys(pkg.others).length}</td>
<td>${Object.keys(pkg.unknowns).length}</td>
<td>${pkg.count}</td>
</tr>`;
    });

    return `<h3>${esc(scope)}</h3>
<table>
<thead><tr>
<th>Package</th><th>Components</th><th>Hooks</th><th>Types</th><th>Others</th><th>Unknowns</th><th>Total&nbsp;Imports</th>
</tr></thead>
<tbody>
${rows.join('\n')}
</tbody>
</table>`;
  });

  return `<section class="summary">
<h2>Summary</h2>
${scopeSections.join('\n')}
</section>`;
}

function renderPackageSection(name: string, pkg: Metadata[string]): string {
  const sections: string[] = [];
  const anchor = toAnchorId(name);

  if (Object.keys(pkg.components).length > 0) {
    sections.push(renderComponentsSection(pkg.components));
  }
  if (Object.keys(pkg.hooks).length > 0) {
    sections.push(renderHooksSection(pkg.hooks));
  }
  if (Object.keys(pkg.types).length > 0) {
    sections.push(renderSimpleSymbolsSection('Types', pkg.types));
  }
  if (Object.keys(pkg.others).length > 0) {
    sections.push(renderFunctionsSection('Other Exports', pkg.others));
  }
  if (Object.keys(pkg.unknowns).length > 0) {
    sections.push(renderUnknownsSection(pkg.unknowns));
  }

  return `<section class="package" id="${anchor}">
<h2><code>${esc(name)}</code></h2>
${sections.join('\n')}
</section>`;
}

// ---------------------------------------------------------------------------
// Components — overview table + per-component prop details
// ---------------------------------------------------------------------------

function renderComponentsSection(components: Record<string, ComponentUsage>): string {
  const sorted = Object.entries(components).sort(([, a], [, b]) => b.count - a.count);

  const overviewRows = sorted.map(
    ([name, usage]) =>
      `<tr><td><code>${esc(name)}</code></td><td>${usage.count}</td><td>${Object.keys(usage.props).length}</td></tr>`,
  );

  const propDetails = sorted
    .filter(([, usage]) => Object.keys(usage.props).length > 0)
    .map(([name, usage]) => renderPropDetailsBlock(name, 'component', usage.props));

  return `<div class="category">
<h3>Components</h3>
<table>
<thead><tr><th>Component</th><th>Usages</th><th>Unique Props</th></tr></thead>
<tbody>${overviewRows.join('\n')}</tbody>
</table>
${propDetails.length > 0 ? `<div class="prop-details"><h4>Component Props</h4>${propDetails.join('\n')}</div>` : ''}
</div>`;
}

// ---------------------------------------------------------------------------
// Hooks — overview table + per-hook argument details
// ---------------------------------------------------------------------------

function renderHooksSection(hooks: Record<string, HookUsage>): string {
  const sorted = Object.entries(hooks).sort(([, a], [, b]) => b.count - a.count);

  const overviewRows = sorted.map(
    ([name, usage]) =>
      `<tr><td><code>${esc(name)}</code></td><td>${usage.count}</td><td>${Object.keys(usage.props).length}</td></tr>`,
  );

  const argDetails = sorted
    .filter(([, usage]) => Object.keys(usage.props).length > 0)
    .map(([name, usage]) => renderPropDetailsBlock(name, 'hook', usage.props));

  return `<div class="category">
<h3>Hooks</h3>
<table>
<thead><tr><th>Hook</th><th>Usages</th><th>Unique Args</th></tr></thead>
<tbody>${overviewRows.join('\n')}</tbody>
</table>
${argDetails.length > 0 ? `<div class="prop-details"><h4>Hook Arguments</h4>${argDetails.join('\n')}</div>` : ''}
</div>`;
}

// ---------------------------------------------------------------------------
// Functions / other exports — overview table + per-function arg details
// ---------------------------------------------------------------------------

function renderFunctionsSection(title: string, functions: Record<string, FunctionUsage>): string {
  const sorted = Object.entries(functions).sort(([, a], [, b]) => b.count - a.count);
  const overviewRows = sorted.map(
    ([name, usage]) =>
      `<tr><td><code>${esc(name)}</code></td><td>${usage.count}</td><td>${Object.keys(usage.props).length}</td></tr>`,
  );

  const argDetails = sorted
    .filter(([, usage]) => Object.keys(usage.props).length > 0)
    .map(([name, usage]) => renderPropDetailsBlock(name, 'function', usage.props));

  return `<div class="category">
<h3>${esc(title)}</h3>
<table>
<thead><tr><th>Symbol</th><th>Usages</th><th>Unique Args</th></tr></thead>
<tbody>${overviewRows.join('\n')}</tbody>
</table>
${argDetails.length > 0 ? `<div class="prop-details"><h4>Function Arguments</h4>${argDetails.join('\n')}</div>` : ''}
</div>`;
}

// ---------------------------------------------------------------------------
// Prop / argument detail block (shared by components, hooks & functions)
// ---------------------------------------------------------------------------

function renderPropDetailsBlock(
  symbolName: string,
  _kind: 'component' | 'hook' | 'function',
  props: Record<string, PropUsage>,
): string {
  const rows = Object.entries(props)
    .sort(([, a], [, b]) => b.count - a.count)
    .map(([propName, usage]) => {
      const valuesHtml =
        usage.values.length === 0
          ? '<span class="muted">—</span>'
          : `<ul class="values">${usage.values.map(v => `<li><code>${esc(v)}</code></li>`).join('')}</ul>`;
      return `<tr><td><code>${esc(propName)}</code></td><td>${usage.count}</td><td>${valuesHtml}</td></tr>`;
    });

  return `<details class="symbol-props">
<summary><code>${esc(symbolName)}</code> — ${Object.keys(props).length} prop(s)</summary>
<table>
<thead><tr><th>Prop</th><th>Usages</th><th>Values</th></tr></thead>
<tbody>${rows.join('\n')}</tbody>
</table>
</details>`;
}

// ---------------------------------------------------------------------------
// Simple symbol tables (types, others)
// ---------------------------------------------------------------------------

function renderSimpleSymbolsSection(title: string, symbols: Record<string, SymbolUsage>): string {
  const rows = Object.entries(symbols)
    .sort(([, a], [, b]) => b.count - a.count)
    .map(([name, usage]) => `<tr><td><code>${esc(name)}</code></td><td>${usage.count}</td></tr>`);

  return `<div class="category">
<h3>${esc(title)}</h3>
<table>
<thead><tr><th>Symbol</th><th>Usages</th></tr></thead>
<tbody>${rows.join('\n')}</tbody>
</table>
</div>`;
}

// ---------------------------------------------------------------------------
// Unknowns
// ---------------------------------------------------------------------------

function renderUnknownsSection(unknowns: Record<string, UnknownSymbolUsage>): string {
  const sorted = Object.entries(unknowns).sort(([, a], [, b]) => b.count - a.count);
  const rows = sorted.map(
    ([name, usage]) =>
      `<tr><td><code>${esc(name)}</code></td><td>${usage.count}</td><td>${
        Object.keys(usage.props).length
      }</td><td>${esc(usage.description)}</td></tr>`,
  );

  const argDetails = sorted
    .filter(([, usage]) => Object.keys(usage.props).length > 0)
    .map(([name, usage]) => renderPropDetailsBlock(name, 'function', usage.props));

  return `<div class="category unknowns">
<h3>Unknowns</h3>
<p class="note">Symbols whose <code>.d.ts</code> declarations could not be resolved. Install types or add declarations to improve classification.</p>
<table>
<thead><tr><th>Symbol</th><th>Usages</th><th>Unique Args</th><th>Description</th></tr></thead>
<tbody>${rows.join('\n')}</tbody>
</table>
${
  argDetails.length > 0
    ? `<div class="prop-details"><h4>Unknown Symbol Arguments</h4>${argDetails.join('\n')}</div>`
    : ''
}
</div>`;
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

function esc(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Convert a package name to a URL-safe anchor id. */
function toAnchorId(name: string): string {
  return 'pkg-' + name.replace(/[^a-zA-Z0-9-]/g, '-');
}

/**
 * Group package names by npm scope. Scoped packages (@scope/name) are grouped
 * under their scope; unscoped packages go under "Other Packages".
 */
function groupByScope(packageNames: string[]): Array<[string, string[]]> {
  const groups = new Map<string, string[]>();
  for (const name of packageNames) {
    const scope = name.startsWith('@') ? name.split('/')[0] : 'Other Packages';
    if (!groups.has(scope)) {
      groups.set(scope, []);
    }
    groups.get(scope)!.push(name);
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function renderStyles(): string {
  return `<style>
:root { --bg: #fff; --fg: #1a1a1a; --muted: #6b7280; --border: #e5e7eb; --accent: #0078d4; --accent-light: #e8f4fd; --code-bg: #f3f4f6; --section-bg: #fafafa; }
@media (prefers-color-scheme: dark) {
  :root { --bg: #1e1e1e; --fg: #d4d4d4; --muted: #9ca3af; --border: #374151; --accent: #4fc3f7; --accent-light: #1e3a4d; --code-bg: #2d2d2d; --section-bg: #252525; }
}
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: var(--bg); color: var(--fg); line-height: 1.6; margin: 0; padding: 2rem; }
main { max-width: 960px; margin: 0 auto; }
h1 { border-bottom: 2px solid var(--accent); padding-bottom: .5rem; }
h2 { margin-top: 2rem; }
h2 code { font-size: 1em; }
h3 { margin-top: 1.25rem; color: var(--accent); }
h4 { margin: 1rem 0 .5rem; font-size: .95rem; color: var(--muted); }
code { background: var(--code-bg); padding: .15em .35em; border-radius: 3px; font-size: .9em; }
table { width: 100%; border-collapse: collapse; margin: .5rem 0 1rem; font-size: .9rem; }
th, td { text-align: left; padding: .45rem .75rem; border: 1px solid var(--border); }
th { background: var(--section-bg); font-weight: 600; }
tr:hover { background: var(--accent-light); }
.summary table a { color: var(--accent); text-decoration: none; }
.summary table a:hover { text-decoration: underline; }
.summary table th:not(:first-child), .summary table td:not(:first-child) { text-align: center; }
.category { margin-bottom: 1.5rem; }
.prop-details { margin-top: .75rem; padding-left: .25rem; }
details.symbol-props { margin: .4rem 0; }
details.symbol-props summary { cursor: pointer; padding: .3rem .5rem; border-radius: 4px; }
details.symbol-props summary:hover { background: var(--accent-light); }
details.symbol-props[open] summary { font-weight: 600; }
details.symbol-props table { margin-top: .25rem; }
ul.values { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: .35rem; }
ul.values li { display: inline; }
ul.values li code { font-size: .85em; background: var(--accent-light); border: 1px solid var(--border); padding: .1em .45em; border-radius: 10px; }
.muted { color: var(--muted); }
.note { font-size: .85rem; color: var(--muted); margin: .25rem 0 .5rem; }
.empty { color: var(--muted); font-style: italic; }
.package { border-top: 1px solid var(--border); padding-top: 1rem; }
.file-map { margin-bottom: 1rem; }
.file-map summary { cursor: pointer; }
ul.file-list { columns: 2; column-gap: 2rem; list-style: none; padding: 0; margin: .5rem 0; font-size: .85rem; }
ul.file-list li { padding: .1rem 0; break-inside: avoid; }
</style>`;
}

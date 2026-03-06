import type { MetadataOutput, ComponentDoc, HookDoc, TypeDoc, OtherDoc, MemberDoc, ParameterDoc } from './types';

/**
 * Format MetadataOutput as a self-contained HTML document.
 */
export function formatMetadataAsHtml(data: MetadataOutput): string {
  const { package: pkg, legend, categories } = data;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>API Metadata: ${esc(pkg.name)}</title>
${renderStyles()}
</head>
<body>
<main>
<h1>API Metadata: <code>${esc(pkg.name)}</code> v${esc(pkg.version)}</h1>
${renderLegend(legend)}
${renderSummary(categories)}
${renderComponents(categories.components)}
${renderHooks(categories.hooks)}
${renderTypes(categories.types)}
${renderOthers(categories.others)}
</main>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

function renderLegend(legend: MetadataOutput['legend']): string {
  const rows = Object.values(legend)
    .map(e => `<tr><td><strong>${esc(e.name)}</strong></td><td>${esc(e.description)}</td></tr>`)
    .join('\n');

  return `<section class="legend">
<h2>Legend</h2>
<table><thead><tr><th>Category</th><th>Description</th></tr></thead>
<tbody>${rows}</tbody></table>
</section>`;
}

function renderSummary(categories: MetadataOutput['categories']): string {
  const counts = [
    ['Components', 'cat-components', Object.keys(categories.components).length],
    ['Hooks', 'cat-hooks', Object.keys(categories.hooks).length],
    ['Types', 'cat-types', Object.keys(categories.types).length],
    ['Others', 'cat-others', Object.keys(categories.others).length],
  ] as const;

  const rows = counts
    .map(([name, anchor, count]) => `<tr><td><a href="#${anchor}">${name}</a></td><td>${count}</td></tr>`)
    .join('\n');

  return `<section class="summary">
<h2>Summary</h2>
<table><thead><tr><th>Category</th><th>Count</th></tr></thead>
<tbody>${rows}</tbody></table>
</section>`;
}

function renderComponents(components: Record<string, ComponentDoc>): string {
  const sorted = Object.values(components).sort(sortByName);
  if (sorted.length === 0) {
    return '';
  }

  const items = sorted.map(comp => {
    const propsRef = comp.propsType ? `<p><strong>Props:</strong> ${renderRef(comp.propsType)}</p>` : '';

    return `<div class="symbol" id="${toAnchor(comp.name)}">
<h3><code>${esc(comp.name)}</code></h3>
${comp.description ? `<p>${esc(comp.description)}</p>` : ''}
<p><strong>Type:</strong> <code>${esc(comp.typeSignature)}</code></p>
${propsRef}
${renderTagsBadges(comp.tags)}
</div>`;
  });

  return `<section id="cat-components">
<details><summary><h2 style="display:inline">Components</h2> <span class="count">(${sorted.length})</span></summary>
${items.join('\n')}
</details></section>`;
}

function renderHooks(hooks: Record<string, HookDoc>): string {
  const sorted = Object.values(hooks).sort(sortByName);
  if (sorted.length === 0) {
    return '';
  }

  const items = sorted.map(hook => {
    return `<div class="symbol" id="${toAnchor(hook.name)}">
<h3><code>${esc(hook.name)}</code></h3>
${hook.description ? `<p>${esc(hook.description)}</p>` : ''}
<p><strong>Signature:</strong> <code>${esc(hook.typeSignature)}</code></p>
${hook.parameters.length > 0 ? renderParametersTable(hook.parameters) : ''}
<p><strong>Returns:</strong> <code>${esc(hook.returnType)}</code></p>
${renderTagsBadges(hook.tags)}
</div>`;
  });

  return `<section id="cat-hooks">
<details><summary><h2 style="display:inline">Hooks</h2> <span class="count">(${sorted.length})</span></summary>
${items.join('\n')}
</details></section>`;
}

function renderTypes(types: Record<string, TypeDoc>): string {
  const sorted = Object.values(types).sort(sortByName);
  if (sorted.length === 0) {
    return '';
  }

  const items = sorted.map(type => {
    const memberEntries = Object.values(type.members);
    return `<div class="symbol" id="${toAnchor(type.name)}">
<h3><code>${esc(type.name)}</code> <span class="kind">${esc(type.kind)}</span></h3>
${type.description ? `<p>${esc(type.description)}</p>` : ''}
<p><strong>Type:</strong> <code>${esc(type.typeSignature)}</code></p>
${memberEntries.length > 0 ? renderMembersTable(memberEntries) : ''}
${renderTagsBadges(type.tags)}
</div>`;
  });

  return `<section id="cat-types">
<details><summary><h2 style="display:inline">Types</h2> <span class="count">(${sorted.length})</span></summary>
${items.join('\n')}
</details></section>`;
}

function renderOthers(others: Record<string, OtherDoc>): string {
  const sorted = Object.values(others).sort(sortByName);
  if (sorted.length === 0) {
    return '';
  }

  const items = sorted.map(other => {
    return `<div class="symbol" id="${toAnchor(other.name)}">
<h3><code>${esc(other.name)}</code> <span class="kind">${esc(other.kind)}</span></h3>
${other.description ? `<p>${esc(other.description)}</p>` : ''}
<p><strong>Type:</strong> <code>${esc(other.typeSignature)}</code></p>
${other.parameters && other.parameters.length > 0 ? renderParametersTable(other.parameters) : ''}
${other.returnType ? `<p><strong>Returns:</strong> <code>${esc(other.returnType)}</code></p>` : ''}
${renderTagsBadges(other.tags)}
</div>`;
  });

  return `<section id="cat-others">
<details><summary><h2 style="display:inline">Others</h2> <span class="count">(${sorted.length})</span></summary>
${items.join('\n')}
</details></section>`;
}

// ---------------------------------------------------------------------------
// Shared renderers
// ---------------------------------------------------------------------------

function renderParametersTable(params: ParameterDoc[]): string {
  const rows = params
    .map(
      p =>
        `<tr><td><code>${esc(p.name)}</code></td><td><code>${esc(p.type)}</code></td><td>${
          p.required ? 'Yes' : 'No'
        }</td><td>${esc(p.description)}</td></tr>`,
    )
    .join('\n');

  return `<table class="params">
<thead><tr><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
<tbody>${rows}</tbody></table>`;
}

function renderMembersTable(members: MemberDoc[]): string {
  const rows = members
    .map(
      m =>
        `<tr><td><code>${esc(m.name)}</code></td><td><code>${esc(m.type)}</code></td><td>${
          m.required ? 'Yes' : 'No'
        }</td><td>${m.defaultValue ? `<code>${esc(m.defaultValue)}</code>` : '—'}</td><td>${esc(
          m.description,
        )}</td></tr>`,
    )
    .join('\n');

  return `<details><summary><strong>Members</strong> (${members.length})</summary>
<table class="members">
<thead><tr><th>Name</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr></thead>
<tbody>${rows}</tbody></table></details>`;
}

function renderTagsBadges(tags: Record<string, string>): string {
  const entries = Object.entries(tags);
  if (entries.length === 0) {
    return '';
  }
  const badges = entries.map(([key, val]) => `<span class="tag">@${esc(key)}${val ? ` ${esc(val)}` : ''}</span>`);
  return `<div class="tags">${badges.join(' ')}</div>`;
}

/**
 * Render a $ref or inline type as HTML.
 * Local refs (e.g. `#/categories/types/ButtonProps`) become clickable anchor links.
 * Cross-package refs (e.g. `@fluentui/react-utilities#/...`) are shown as non-linked code.
 */
function renderRef(ref: { $ref: string } | { inline: string }): string {
  if ('inline' in ref) {
    return `<code>${esc(ref.inline)}</code>`;
  }

  const refValue = ref.$ref;
  // Local ref: #/categories/<category>/<symbolName>
  if (refValue.startsWith('#/')) {
    const symbolName = refValue.split('/').pop()!;
    return `<a href="#${toAnchor(symbolName)}" class="ref-link"><code>${esc(symbolName)}</code></a>`;
  }

  // Cross-package ref: @scope/pkg#/categories/<category>/<symbolName>
  const hashIdx = refValue.indexOf('#/');
  if (hashIdx > 0) {
    const pkgName = refValue.substring(0, hashIdx);
    const symbolName = refValue.split('/').pop()!;
    return `<code class="cross-ref" title="${esc(refValue)}">${esc(pkgName)} → ${esc(symbolName)}</code>`;
  }

  return `<code>${esc(refValue)}</code>`;
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

function esc(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function toAnchor(name: string): string {
  return 'sym-' + name.replace(/[^a-zA-Z0-9_-]/g, '-');
}

function sortByName(a: { name: string }, b: { name: string }): number {
  return a.name.localeCompare(b.name);
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
h2 { margin-top: 2rem; color: var(--accent); }
h3 { margin-top: 1rem; }
code { background: var(--code-bg); padding: .15em .35em; border-radius: 3px; font-size: .9em; }
table { width: 100%; border-collapse: collapse; margin: .5rem 0 1rem; font-size: .9rem; }
th, td { text-align: left; padding: .45rem .75rem; border: 1px solid var(--border); }
th { background: var(--section-bg); font-weight: 600; }
.symbol { border-top: 1px solid var(--border); padding: .75rem 0; }
.kind { font-size: .8em; color: var(--muted); font-style: italic; }
.tags { margin-top: .5rem; }
.tag { display: inline-block; background: var(--accent-light); border: 1px solid var(--border); border-radius: 10px; padding: .1em .6em; font-size: .8em; margin-right: .3rem; }
.count { font-size: .85em; color: var(--muted); font-weight: normal; }
.summary a { color: var(--accent); text-decoration: none; }
.summary a:hover { text-decoration: underline; }
a.ref-link { color: var(--accent); text-decoration: none; }
a.ref-link:hover { text-decoration: underline; }
a.ref-link code { background: var(--accent-light); border: 1px solid var(--border); }
.cross-ref { border: 1px dashed var(--border); font-style: italic; }
details > summary { cursor: pointer; padding: .3rem 0; }
details > summary:hover { opacity: .8; }
details.symbol-props summary { font-weight: 600; }
</style>`;
}

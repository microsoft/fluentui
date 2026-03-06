import type {
  MetadataOutput,
  ComponentDoc,
  HookDoc,
  TypeDoc,
  OtherDoc,
  MemberDoc,
  ParameterDoc,
  RefOrInline,
} from './types';

/**
 * Format MetadataOutput as a structured Markdown document.
 */
export function formatMetadataAsMarkdown(data: MetadataOutput): string {
  const { package: pkg, legend, categories } = data;
  const lines: string[] = [];

  lines.push(`# API Metadata: \`${pkg.name}\` v${pkg.version}`);
  lines.push('');

  // Legend
  lines.push('## Legend');
  lines.push('');
  lines.push('| Category | Description |');
  lines.push('| -------- | ----------- |');
  for (const entry of Object.values(legend)) {
    lines.push(`| **${entry.name}** | ${entry.description} |`);
  }
  lines.push('');

  // Summary
  lines.push('## Summary');
  lines.push('');
  lines.push(`| Category | Count |`);
  lines.push(`| -------- | ----- |`);
  lines.push(`| Components | ${Object.keys(categories.components).length} |`);
  lines.push(`| Hooks | ${Object.keys(categories.hooks).length} |`);
  lines.push(`| Types | ${Object.keys(categories.types).length} |`);
  lines.push(`| Others | ${Object.keys(categories.others).length} |`);
  lines.push('');

  // Components
  if (Object.keys(categories.components).length > 0) {
    lines.push('<details>');
    lines.push(`<summary><h2>Components (${Object.keys(categories.components).length})</h2></summary>`);
    lines.push('');
    for (const comp of Object.values(categories.components).sort(sortByName)) {
      lines.push(...formatComponent(comp));
    }
    lines.push('</details>');
    lines.push('');
  }

  // Hooks
  if (Object.keys(categories.hooks).length > 0) {
    lines.push('<details>');
    lines.push(`<summary><h2>Hooks (${Object.keys(categories.hooks).length})</h2></summary>`);
    lines.push('');
    for (const hook of Object.values(categories.hooks).sort(sortByName)) {
      lines.push(...formatHook(hook));
    }
    lines.push('</details>');
    lines.push('');
  }

  // Types
  if (Object.keys(categories.types).length > 0) {
    lines.push('<details>');
    lines.push(`<summary><h2>Types (${Object.keys(categories.types).length})</h2></summary>`);
    lines.push('');
    for (const type of Object.values(categories.types).sort(sortByName)) {
      lines.push(...formatType(type));
    }
    lines.push('</details>');
    lines.push('');
  }

  // Others
  if (Object.keys(categories.others).length > 0) {
    lines.push('<details>');
    lines.push(`<summary><h2>Others (${Object.keys(categories.others).length})</h2></summary>`);
    lines.push('');
    for (const other of Object.values(categories.others).sort(sortByName)) {
      lines.push(...formatOther(other));
    }
    lines.push('</details>');
    lines.push('');
  }

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Section formatters
// ---------------------------------------------------------------------------

function formatComponent(comp: ComponentDoc): string[] {
  const lines: string[] = [];
  lines.push(`### \`${comp.name}\``);
  lines.push('');
  if (comp.description) {
    lines.push(comp.description);
    lines.push('');
  }
  lines.push(`**Type:** \`${comp.typeSignature}\``);
  if (comp.propsType) {
    lines.push(`**Props:** ${formatRef(comp.propsType)}`);
  }
  lines.push(...formatTags(comp.tags));
  lines.push('');
  return lines;
}

function formatHook(hook: HookDoc): string[] {
  const lines: string[] = [];
  lines.push(`### \`${hook.name}\``);
  lines.push('');
  if (hook.description) {
    lines.push(hook.description);
    lines.push('');
  }
  lines.push(`**Signature:** \`${hook.typeSignature}\``);
  if (hook.parameters.length > 0) {
    lines.push('');
    lines.push(...formatParametersTable(hook.parameters));
  }
  lines.push(`**Returns:** \`${hook.returnType}\``);
  lines.push(...formatTags(hook.tags));
  lines.push('');
  return lines;
}

function formatType(type: TypeDoc): string[] {
  const lines: string[] = [];
  lines.push(`### \`${type.name}\` *(${type.kind})*`);
  lines.push('');
  if (type.description) {
    lines.push(type.description);
    lines.push('');
  }
  lines.push(`**Type:** \`${type.typeSignature}\``);
  lines.push(...formatTags(type.tags));

  const memberList = Object.values(type.members);
  if (memberList.length > 0) {
    lines.push('');
    lines.push(...formatMembersTable(memberList));
  }
  lines.push('');
  return lines;
}

function formatOther(other: OtherDoc): string[] {
  const lines: string[] = [];
  lines.push(`### \`${other.name}\` *(${other.kind})*`);
  lines.push('');
  if (other.description) {
    lines.push(other.description);
    lines.push('');
  }
  lines.push(`**Type:** \`${other.typeSignature}\``);
  if (other.parameters && other.parameters.length > 0) {
    lines.push('');
    lines.push(...formatParametersTable(other.parameters));
  }
  if (other.returnType) {
    lines.push(`**Returns:** \`${other.returnType}\``);
  }
  lines.push(...formatTags(other.tags));
  lines.push('');
  return lines;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatParametersTable(params: ParameterDoc[]): string[] {
  const lines: string[] = [];
  lines.push('**Parameters:**');
  lines.push('');
  lines.push('| Name | Type | Required | Description |');
  lines.push('| ---- | ---- | -------- | ----------- |');
  for (const p of params) {
    lines.push(`| \`${p.name}\` | \`${p.type}\` | ${p.required ? 'Yes' : 'No'} | ${p.description} |`);
  }
  lines.push('');
  return lines;
}

function formatMembersTable(members: MemberDoc[]): string[] {
  const lines: string[] = [];
  lines.push('**Members:**');
  lines.push('');
  lines.push('| Name | Type | Required | Default | Description |');
  lines.push('| ---- | ---- | -------- | ------- | ----------- |');
  for (const m of members) {
    lines.push(
      `| \`${m.name}\` | \`${m.type}\` | ${m.required ? 'Yes' : 'No'} | ${
        m.defaultValue ? `\`${m.defaultValue}\`` : '—'
      } | ${m.description} |`,
    );
  }
  lines.push('');
  return lines;
}

function formatTags(tags: Record<string, string>): string[] {
  const entries = Object.entries(tags);
  if (entries.length === 0) {
    return [];
  }
  return ['', ...entries.map(([key, val]) => `> @${key}${val ? ` ${val}` : ''}`)];
}

/**
 * Format a $ref or inline type for Markdown.
 * Local refs become anchor links; cross-package refs are shown as code.
 */
function formatRef(ref: RefOrInline): string {
  if ('inline' in ref) {
    return `\`${ref.inline}\``;
  }

  const refValue = ref.$ref;
  // Local ref: #/categories/<category>/<symbolName> → link to heading anchor
  if (refValue.startsWith('#/')) {
    const symbolName = refValue.split('/').pop()!;
    // GitHub-style heading anchor: lowercase, spaces→hyphens
    const anchor = symbolName.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    return `[\`${symbolName}\`](#${anchor})`;
  }

  // Cross-package ref
  const hashIdx = refValue.indexOf('#/');
  if (hashIdx > 0) {
    const pkgName = refValue.substring(0, hashIdx);
    const symbolName = refValue.split('/').pop()!;
    return `\`${pkgName}\` → \`${symbolName}\``;
  }

  return `\`${refValue}\``;
}

function sortByName(a: { name: string }, b: { name: string }): number {
  return a.name.localeCompare(b.name);
}

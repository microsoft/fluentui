import type {
  LongReportOutput,
  ComponentUsage,
  HookUsage,
  FunctionUsage,
  SymbolUsage,
  UnknownSymbolUsage,
} from './types';

/**
 * Format LongReportOutput as a structured Markdown report.
 * Markdown output is intentionally concise — no prop details.
 * Use the HTML reporter for comprehensive prop analysis.
 */
export function formatMetadataAsMarkdown(data: LongReportOutput): string {
  const { fileMap, packages: metadata } = data;
  const lines: string[] = [];

  lines.push('# Fluent UI Codebase Usage Report');
  lines.push('');

  // File map
  lines.push(`**Files analyzed:** ${fileMap.length}`);
  lines.push('');

  const packageNames = Object.keys(metadata).sort();

  if (packageNames.length === 0) {
    lines.push('No Fluent UI package usage found.');
    return lines.join('\n');
  }

  // Summary tables grouped by npm scope
  lines.push('## Summary');
  lines.push('');

  const scopeGroups = groupByScope(packageNames);
  for (const [scope, names] of scopeGroups) {
    lines.push(`### ${scope}`);
    lines.push('');
    lines.push('| Package | Components | Hooks | Types | Others | Unknowns | Total Imports |');
    lines.push('| ------- | ---------- | ----- | ----- | ------ | -------- | ------------- |');

    for (const name of names) {
      const pkg = metadata[name];
      lines.push(
        `| \`${name}\` | ${Object.keys(pkg.components).length} | ${Object.keys(pkg.hooks).length} | ${
          Object.keys(pkg.types).length
        } | ${Object.keys(pkg.others).length} | ${Object.keys(pkg.unknowns).length} | ${pkg.count} |`,
      );
    }
    lines.push('');
  }

  // Detailed sections per package
  for (const name of packageNames) {
    const pkg = metadata[name];
    lines.push(`## \`${name}\``);
    lines.push('');

    if (Object.keys(pkg.components).length > 0) {
      lines.push(...formatSymbolsWithCount('Components', pkg.components));
    }

    if (Object.keys(pkg.hooks).length > 0) {
      lines.push(...formatSymbolsWithCount('Hooks', pkg.hooks));
    }

    if (Object.keys(pkg.types).length > 0) {
      lines.push(...formatSymbolsWithCount('Types', pkg.types));
    }

    if (Object.keys(pkg.others).length > 0) {
      lines.push(...formatSymbolsWithCount('Other Exports', pkg.others));
    }

    if (Object.keys(pkg.unknowns).length > 0) {
      lines.push(...formatUnknownsSection(pkg.unknowns));
    }
  }

  return lines.join('\n');
}

function formatSymbolsWithCount(
  title: string,
  symbols: Record<string, ComponentUsage | HookUsage | FunctionUsage | SymbolUsage>,
): string[] {
  const lines: string[] = [];
  lines.push(`### ${title}`);
  lines.push('');
  lines.push('| Symbol | Usages |');
  lines.push('| ------ | ------ |');

  for (const [name, usage] of Object.entries(symbols).sort(([, a], [, b]) => b.count - a.count)) {
    lines.push(`| \`${name}\` | ${usage.count} |`);
  }
  lines.push('');
  return lines;
}

function formatUnknownsSection(unknowns: Record<string, UnknownSymbolUsage>): string[] {
  const lines: string[] = [];
  lines.push('### Unknowns');
  lines.push('');
  lines.push(
    '> Symbols whose `.d.ts` declarations could not be resolved. Install types or add declarations to improve classification.',
  );
  lines.push('');
  lines.push('| Symbol | Usages | Description |');
  lines.push('| ------ | ------ | ----------- |');

  for (const [name, usage] of Object.entries(unknowns).sort(([, a], [, b]) => b.count - a.count)) {
    lines.push(`| \`${name}\` | ${usage.count} | ${usage.description} |`);
  }
  lines.push('');
  return lines;
}

/**
 * Group package names by npm scope. Scoped packages (@scope/name) are grouped
 * under their scope; unscoped packages go under "Other Packages".
 * Returns entries sorted by scope name, with each group's packages sorted alphabetically.
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

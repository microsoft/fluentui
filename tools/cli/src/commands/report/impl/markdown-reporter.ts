import type {
  UsageReportOutput,
  ComponentUsage,
  HookUsage,
  FunctionUsage,
  TypeUsage,
  UnknownSymbolUsage,
} from './types';
import { markdownCode, markdownTable } from '../../../utils/markdown';
import { groupImportPathsByPackage } from './package-resolver';

/**
 * Format UsageReportOutput as a structured Markdown report.
 */
export function formatMetadataAsMarkdown(data: UsageReportOutput): string {
  const { legend, fileMap, packages: metadata } = data;
  const lines: string[] = [];

  lines.push('# Fluent UI Codebase Usage Report');
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

  // File map
  lines.push(`**Files analyzed:** ${fileMap.length}`);
  lines.push('');

  const packageNames = Object.keys(metadata).sort();

  if (packageNames.length === 0) {
    lines.push('No Fluent UI package usage found.');
    return lines.join('\n');
  }

  lines.push('## Summary');
  lines.push('');

  const packageGroups = groupImportPathsByPackage(packageNames);
  for (const [packageName, names] of packageGroups) {
    lines.push(`### ${packageName}`);
    lines.push('');
    lines.push('| Import Path | Components | Hooks | Types | Others | Unknowns | Total Imports |');
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

  for (const [packageName, importPaths] of packageGroups) {
    lines.push(`## ${markdownCode(packageName)}`);
    lines.push('');
    for (const importPath of importPaths) {
      const pkg = metadata[importPath];
      lines.push(`### ${markdownCode(importPath)}`, '');

      if (Object.keys(pkg.components).length > 0) {
        lines.push(...formatSymbolsWithCount('Components', pkg.components));
      }

      if (Object.keys(pkg.hooks).length > 0) {
        lines.push(...formatSymbolsWithCount('Hooks', pkg.hooks));
      }

      if (Object.keys(pkg.types).length > 0) {
        lines.push(...formatTypesSection(pkg.types));
      }

      if (Object.keys(pkg.others).length > 0) {
        lines.push(...formatSymbolsWithCount('Other Exports', pkg.others));
      }

      if (Object.keys(pkg.unknowns).length > 0) {
        lines.push(...formatUnknownsSection(pkg.unknowns));
      }
    }
  }

  return lines.join('\n');
}

function formatSymbolsWithCount(
  title: string,
  symbols: Record<string, ComponentUsage | HookUsage | FunctionUsage>,
): string[] {
  const lines: string[] = [];
  lines.push(`#### ${title}`);
  lines.push('');
  lines.push('| Symbol | Usages |');
  lines.push('| ------ | ------ |');

  for (const [name, usage] of Object.entries(symbols).sort(([, a], [, b]) => b.count - a.count)) {
    lines.push(`| \`${name}\` | ${usage.count} |`);
  }
  lines.push('');
  if (title === 'Components') {
    for (const [name, usage] of Object.entries(symbols).sort(([, first], [, second]) => second.count - first.count)) {
      const observedProps = Object.entries(usage.props).sort(([, first], [, second]) => second.count - first.count);
      if (observedProps.length === 0) {
        continue;
      }
      lines.push(
        `##### ${markdownCode(name)} Observed Props`,
        '',
        ...markdownTable(
          ['Prop', 'Usages', 'Observed Values'],
          observedProps.map(([prop, observed]) => [
            markdownCode(prop),
            String(observed.count),
            observed.values.length ? observed.values.map(markdownCode).join(', ') : '—',
          ]),
        ),
        '',
      );
    }
  }
  return lines;
}

function formatTypesSection(types: Record<string, TypeUsage>): string[] {
  const lines: string[] = [];
  lines.push('#### Types');
  lines.push('');
  lines.push('| Symbol | Usages | typeof | Type Args |');
  lines.push('| ------ | ------ | ------ | --------- |');

  for (const [name, usage] of Object.entries(types).sort(([, a], [, b]) => b.count - a.count)) {
    lines.push(`| \`${name}\` | ${usage.count} | ${usage.typeofCount} | ${Object.keys(usage.props).length} |`);
  }
  lines.push('');
  return lines;
}

function formatUnknownsSection(unknowns: Record<string, UnknownSymbolUsage>): string[] {
  const lines: string[] = [];
  lines.push('#### Unknowns');
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

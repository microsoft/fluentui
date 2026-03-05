import type { ShortReportData } from './types';
import {
  getSystemInfo,
  getMatchingPackages,
  resolvePackageVersions,
  findDuplicatePackages,
  getGitRoot,
} from './package-resolver';

/**
 * Generate the short report data by reading system info and installed packages.
 * Always operates from the git root directory.
 */
export function collectShortReportData(): ShortReportData {
  const rootDir = getGitRoot();
  const system = getSystemInfo(rootDir);
  const matchingNames = getMatchingPackages(rootDir);
  const packages = resolvePackageVersions(matchingNames, rootDir);
  const duplicates = findDuplicatePackages(matchingNames, rootDir);

  return { system, packages, duplicates };
}

/**
 * Format the short report data into a human-readable string.
 */
export function formatShortReport(data: ShortReportData): string {
  const lines: string[] = [];

  lines.push('FluentCLI   Report complete - copy this into the issue template');
  lines.push('');
  lines.push('System:');
  lines.push('');
  lines.push(`  Node           : ${data.system.node}`);
  lines.push(`  OS             : ${data.system.os}`);
  lines.push(`  Native Target  : ${data.system.nativeTarget}`);
  lines.push(
    `  ${data.system.packageManager.split(' ')[0].padEnd(15)}: ${data.system.packageManager
      .split(' ')
      .slice(1)
      .join(' ')}`,
  );
  lines.push('---------------------------------------');
  lines.push('');

  if (data.packages.length > 0) {
    lines.push('Packages:');
    lines.push('');

    const maxNameLen = Math.max(...data.packages.map(p => p.name.length));
    for (const pkg of data.packages) {
      lines.push(`  ${pkg.name.padEnd(maxNameLen + 2)}: ${pkg.version}`);
    }
    lines.push('---------------------------------------');
    lines.push('');
  }

  if (data.duplicates.length > 0) {
    lines.push('🚨 Duplicates:');
    lines.push('');
    for (const dup of data.duplicates) {
      lines.push(`  - ${dup.name}: ${dup.versions.join(', ')}`);
    }
    lines.push('---------------------------------------');
  }

  return lines.join('\n');
}

/**
 * Run the short report: collect data and print to stdout.
 */
export async function runShortReport(): Promise<void> {
  const data = collectShortReportData();
  const output = formatShortReport(data);
  console.log(output);
}

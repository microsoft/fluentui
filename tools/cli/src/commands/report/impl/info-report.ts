import * as fs from 'node:fs';
import * as path from 'node:path';

import type { InfoReportData } from './types';
import {
  getCatalogInventory,
  getWorkspacePackageInventory,
  type CatalogInventory,
  type CatalogSelectionOptions,
} from '../../../utils';
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
export function collectInfoReportData(
  options: CatalogSelectionOptions = {},
  providedInventory?: CatalogInventory,
): InfoReportData {
  const rootDir = options.cwd ?? getGitRoot();
  const inventory = providedInventory ?? getCatalogInventory({ ...options, cwd: rootDir });
  const system = getSystemInfo(rootDir);
  const workspacePackages = getWorkspacePackageInventory(rootDir).packages;
  const matchingNames = [
    ...new Set([
      ...getMatchingPackages(rootDir),
      ...inventory.roots.map(root => root.requestedPackage),
      ...workspacePackages
        .filter(installed => inventory.selection.matches(installed.requestedPackage))
        .map(installed => installed.requestedPackage),
    ]),
  ].sort();
  const packages = resolvePackageVersions(matchingNames, rootDir);
  for (const installed of workspacePackages) {
    if (
      installed.version &&
      matchingNames.includes(installed.requestedPackage) &&
      !packages.some(pkg => pkg.name === installed.requestedPackage)
    ) {
      packages.push({ name: installed.requestedPackage, version: installed.version });
    }
  }
  for (const root of inventory.roots) {
    if (root.catalog && !packages.some(pkg => pkg.name === root.requestedPackage)) {
      packages.push({ name: root.requestedPackage, version: root.catalog.index.package.version });
    }
  }
  packages.sort((left, right) => left.name.localeCompare(right.name));
  const duplicates = findDuplicatePackages(matchingNames, rootDir);

  return { system, packages, duplicates };
}

/**
 * Format the short report data into a human-readable string.
 */
export function formatInfoReport(data: InfoReportData): string {
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
 * Run the short report: collect data and print to stdout or write to file.
 *
 * @param output - Output file path. When provided, writes to file instead of stdout.
 */
export async function runInfoReport(output?: string, options: CatalogSelectionOptions = {}): Promise<void> {
  const inventory = getCatalogInventory({ ...options, cwd: options.cwd ?? getGitRoot() });
  const data = collectInfoReportData(options, inventory);
  const formatted = formatInfoReport(data);

  if (output) {
    const outputPath = path.resolve(output);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, formatted, 'utf-8');
    console.log(`Report written to ${outputPath}`);
  } else {
    console.log(formatted);
  }
  for (const diagnostic of inventory.diagnostics) {
    console.error(`[${diagnostic.code}] ${diagnostic.message}`);
  }
}

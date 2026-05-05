import * as fs from 'node:fs';
import * as path from 'node:path';
import { execSync } from 'node:child_process';

import type { SystemInfo, ResolvedPackage, DuplicatePackage } from './types';

/**
 * Package name patterns we're interested in for reporting.
 */
const FLUENT_SCOPED_PATTERNS = ['@fluentui/', '@fluentui-contrib/'];
const FLUENT_RELATED_PATTERNS = ['@griffel/'];
const FLUENT_RELATED_EXACT = ['tabster', 'keyborg'];
const THIRD_PARTY_PATTERNS = ['@floating-ui/'];
const THIRD_PARTY_EXACT = ['react', '@types/react', 'typescript'];

/**
 * Checks if a package name matches our reporting criteria (short report — includes 3rd-party).
 */
export function isReportablePackage(name: string): boolean {
  for (const pattern of [...FLUENT_SCOPED_PATTERNS, ...FLUENT_RELATED_PATTERNS, ...THIRD_PARTY_PATTERNS]) {
    if (name.startsWith(pattern)) {
      return true;
    }
  }
  return [...FLUENT_RELATED_EXACT, ...THIRD_PARTY_EXACT].includes(name);
}

/**
 * Checks if a package name matches long report criteria (excludes generic 3rd-party like react/typescript).
 */
export function isReportablePackageForLong(name: string): boolean {
  for (const pattern of [...FLUENT_SCOPED_PATTERNS, ...FLUENT_RELATED_PATTERNS]) {
    if (name.startsWith(pattern)) {
      return true;
    }
  }
  return FLUENT_RELATED_EXACT.includes(name);
}

/**
 * Get system information for the short report.
 */
export function getSystemInfo(rootDir: string): SystemInfo {
  const nodeVersion = process.version.replace(/^v/, '');
  const os = `${process.platform}-${process.arch}`;
  const nativeTarget = getNativeTarget();
  const packageManager = detectPackageManager(rootDir);

  return { node: nodeVersion, os, nativeTarget, packageManager };
}

function getNativeTarget(): string {
  const arch = process.arch === 'arm64' ? 'aarch64' : process.arch === 'x64' ? 'x86_64' : process.arch;
  const platform = process.platform === 'darwin' ? 'macos' : process.platform === 'win32' ? 'windows' : 'linux';
  return `${arch}-${platform}`;
}

function detectPackageManager(rootDir: string): string {
  const lockFiles: Array<{ file: string; name: string; command: string }> = [
    { file: 'yarn.lock', name: 'yarn', command: 'yarn --version' },
    { file: 'pnpm-lock.yaml', name: 'pnpm', command: 'pnpm --version' },
    { file: 'package-lock.json', name: 'npm', command: 'npm --version' },
    { file: 'bun.lockb', name: 'bun', command: 'bun --version' },
  ];

  for (const { file, name, command } of lockFiles) {
    if (fs.existsSync(path.join(rootDir, file))) {
      try {
        const version = execSync(command, { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] }).trim();
        return `${name} ${version}`;
      } catch {
        return name;
      }
    }
  }
  return 'unknown';
}

/**
 * Read package.json and return all dependency names that match reporting criteria.
 */
export function getMatchingPackages(rootDir: string): string[] {
  const packageJsonPath = path.join(rootDir, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    return [];
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  return Object.keys(allDeps).filter(isReportablePackage).sort();
}

/**
 * Resolve installed versions for the given package names.
 */
export function resolvePackageVersions(packages: string[], rootDir: string): ResolvedPackage[] {
  return packages
    .map(name => {
      const version = resolveInstalledVersion(name, rootDir);
      return version ? { name, version } : null;
    })
    .filter((pkg): pkg is ResolvedPackage => pkg !== null);
}

function resolveInstalledVersion(packageName: string, rootDir: string): string | null {
  const pkgJsonPath = path.join(rootDir, 'node_modules', packageName, 'package.json');
  try {
    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
    return pkgJson.version ?? null;
  } catch {
    return null;
  }
}

/**
 * Find packages that have multiple versions installed (not deduped).
 * Walks the node_modules tree to find nested versions.
 */
export function findDuplicatePackages(packages: string[], rootDir: string): DuplicatePackage[] {
  const duplicates: DuplicatePackage[] = [];

  for (const packageName of packages) {
    const versions = findAllInstalledVersions(packageName, rootDir);
    if (versions.length > 1) {
      duplicates.push({ name: packageName, versions: versions.sort() });
    }
  }

  return duplicates;
}

function findAllInstalledVersions(packageName: string, rootDir: string): string[] {
  const versions = new Set<string>();

  // Check top-level node_modules
  const topLevelVersion = resolveInstalledVersion(packageName, rootDir);
  if (topLevelVersion) {
    versions.add(topLevelVersion);
  }

  // Walk nested node_modules directories for additional versions
  walkNestedNodeModules(rootDir, packageName, versions);

  return Array.from(versions);
}

function walkNestedNodeModules(rootDir: string, packageName: string, versions: Set<string>, depth = 0): void {
  if (depth > 5) {
    return;
  }

  const nodeModulesDir = path.join(rootDir, 'node_modules');
  if (!fs.existsSync(nodeModulesDir)) {
    return;
  }

  let entries: string[];
  try {
    entries = fs.readdirSync(nodeModulesDir);
  } catch {
    return;
  }

  for (const entry of entries) {
    if (entry.startsWith('.')) {
      continue;
    }

    const entryPath = path.join(nodeModulesDir, entry);

    if (entry.startsWith('@')) {
      // Scoped package — read subdirectories
      let scopedEntries: string[];
      try {
        scopedEntries = fs.readdirSync(entryPath);
      } catch {
        continue;
      }
      for (const scopedEntry of scopedEntries) {
        const scopedPackageName = `${entry}/${scopedEntry}`;
        const nestedPkgJsonPath = path.join(entryPath, scopedEntry, 'node_modules', packageName, 'package.json');
        tryAddVersion(nestedPkgJsonPath, versions);

        // Recurse into the scoped package's node_modules
        if (scopedPackageName !== packageName) {
          walkNestedNodeModules(path.join(entryPath, scopedEntry), packageName, versions, depth + 1);
        }
      }
    } else {
      // Regular package — check for nested copy of our target
      const nestedPkgJsonPath = path.join(entryPath, 'node_modules', packageName, 'package.json');
      tryAddVersion(nestedPkgJsonPath, versions);

      if (entry !== packageName) {
        walkNestedNodeModules(entryPath, packageName, versions, depth + 1);
      }
    }
  }
}

function tryAddVersion(pkgJsonPath: string, versions: Set<string>): void {
  try {
    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
    if (pkgJson.version) {
      versions.add(pkgJson.version);
    }
  } catch {
    // Package not found at this path
  }
}

/**
 * Get the git root directory.
 */
export function getGitRoot(): string {
  return execSync('git rev-parse --show-toplevel', { encoding: 'utf-8' }).trim();
}

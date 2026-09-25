import { createRequire } from 'node:module';
import * as fs from 'node:fs';
import * as path from 'node:path';

const MAX_DECLARED_PACKAGES = 512;
const MAX_INSTALLED_PEERS = 512;

export interface ParsedPackageSpecifier {
  packageName: string;
  entrypoint: string;
}

export interface InstalledPackage {
  requestedPackage: string;
  packageName: string;
  packageRoot: string;
  packageManifest: string;
  version?: string;
  importer: string;
  dependencyKind: 'dependency' | 'devDependency' | 'optionalDependency' | 'peerDependency' | 'explicit';
  hasCatalogMarker: boolean;
  manifest: Record<string, unknown>;
}

export interface WorkspacePackageInventory {
  workspaceRoot: string;
  selectedPackageRoot: string;
  workspaceManifest?: string;
  packages: InstalledPackage[];
  unresolved: Array<{ packageName: string; dependencyKind: InstalledPackage['dependencyKind'] }>;
}

export function parsePackageSpecifier(moduleSpecifier: string): ParsedPackageSpecifier | undefined {
  if (
    !moduleSpecifier ||
    moduleSpecifier.startsWith('.') ||
    moduleSpecifier.startsWith('/') ||
    moduleSpecifier[0] === '#'
  ) {
    return undefined;
  }
  const parts = moduleSpecifier.split('/');
  const packageName = moduleSpecifier.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
  if (!/^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/i.test(packageName)) {
    return undefined;
  }
  const subpathParts = parts.slice(moduleSpecifier.startsWith('@') ? 2 : 1);
  return { packageName, entrypoint: subpathParts.length === 0 ? '.' : `./${subpathParts.join('/')}` };
}

export function formatPackageSpecifier(packageName: string, entrypoint: string): string {
  return `${packageName}${entrypoint === '.' ? '' : entrypoint.slice(1)}`;
}

export function findWorkspaceRoot(cwd: string): string {
  let current = path.resolve(cwd);
  if (fs.existsSync(current) && !fs.statSync(current).isDirectory()) {
    current = path.dirname(current);
  }
  let fallback = current;
  while (true) {
    const manifestPath = path.join(current, 'package.json');
    if (fs.existsSync(manifestPath)) {
      fallback = current;
      const manifest = readJsonObject(manifestPath);
      if (
        manifest.workspaces !== undefined ||
        fs.existsSync(path.join(current, 'yarn.lock')) ||
        fs.existsSync(path.join(current, 'pnpm-lock.yaml')) ||
        fs.existsSync(path.join(current, 'package-lock.json'))
      ) {
        return current;
      }
    }
    const parent = path.dirname(current);
    if (parent === current) {
      return fallback;
    }
    current = parent;
  }
}

export function getWorkspacePackageInventory(cwd: string): WorkspacePackageInventory {
  const workspaceRoot = findWorkspaceRoot(cwd);
  const selectedRoot = findSelectedPackageRoot(cwd, workspaceRoot);
  const workspaceManifest = path.join(selectedRoot, 'package.json');
  if (!fs.existsSync(workspaceManifest)) {
    return { workspaceRoot, selectedPackageRoot: selectedRoot, packages: [], unresolved: [] };
  }

  const manifest = readJsonObject(workspaceManifest);
  const declared = [
    ...readDependencyNames(manifest.dependencies, 'dependency'),
    ...readDependencyNames(manifest.devDependencies, 'devDependency'),
    ...readDependencyNames(manifest.optionalDependencies, 'optionalDependency'),
    ...readDependencyNames(manifest.peerDependencies, 'peerDependency'),
  ];
  if (declared.length > MAX_DECLARED_PACKAGES) {
    throw new Error(`Workspace declares more than ${MAX_DECLARED_PACKAGES} packages`);
  }

  const packages: InstalledPackage[] = [];
  const unresolved: WorkspacePackageInventory['unresolved'] = [];
  const seen = new Set<string>();
  for (const dependency of declared) {
    const installed = resolveInstalledPackage(dependency.packageName, selectedRoot, dependency.dependencyKind);
    if (installed) {
      packages.push(installed);
      seen.add(installed.requestedPackage);
    } else {
      unresolved.push(dependency);
    }
  }

  let peerCount = 0;
  for (const installed of [...packages]) {
    for (const peerName of Object.keys(asStringMap(installed.manifest.peerDependencies))) {
      if (seen.has(peerName)) {
        continue;
      }
      peerCount++;
      if (peerCount > MAX_INSTALLED_PEERS) {
        throw new Error(`Installed dependencies declare more than ${MAX_INSTALLED_PEERS} distinct peers`);
      }
      const peer = resolveInstalledPackage(peerName, selectedRoot, 'peerDependency');
      if (peer?.hasCatalogMarker) {
        packages.push(peer);
        seen.add(peerName);
      }
    }
  }

  return {
    workspaceRoot,
    selectedPackageRoot: selectedRoot,
    workspaceManifest,
    packages: packages.sort((left, right) => left.requestedPackage.localeCompare(right.requestedPackage)),
    unresolved,
  };
}

export function findSelectedPackageRoot(cwd: string, workspaceRoot = findWorkspaceRoot(cwd)): string {
  return findNearestPackageRoot(cwd, workspaceRoot) ?? workspaceRoot;
}

export function resolveInstalledPackage(
  requestedPackage: string,
  importer: string,
  dependencyKind: InstalledPackage['dependencyKind'] = 'explicit',
): InstalledPackage | undefined {
  const parsed = parsePackageSpecifier(requestedPackage);
  if (!parsed || parsed.entrypoint !== '.') {
    return undefined;
  }
  const importerRoot = path.resolve(importer);
  const importerFile = path.join(importerRoot, '__fluentui_catalog_inventory__.cjs');
  let manifestPath: string | undefined;

  try {
    manifestPath = createRequire(importerFile).resolve(`${requestedPackage}/package.json`);
  } catch {
    try {
      const resolvedEntry = createRequire(importerFile).resolve(requestedPackage);
      manifestPath = findPackageManifest(path.dirname(resolvedEntry), requestedPackage);
    } catch {
      manifestPath = findNodeModulesPackage(importerRoot, requestedPackage);
    }
  }
  if (!manifestPath || !fs.existsSync(manifestPath)) {
    return undefined;
  }

  const packageManifest = fs.realpathSync(manifestPath);
  const packageRoot = fs.realpathSync(path.dirname(packageManifest));
  const manifest = readJsonObject(packageManifest);
  const packageName = typeof manifest.name === 'string' ? manifest.name : requestedPackage;
  return {
    requestedPackage,
    packageName,
    packageRoot,
    packageManifest,
    version: typeof manifest.version === 'string' ? manifest.version : undefined,
    importer: importerRoot,
    dependencyKind,
    hasCatalogMarker: manifest.fluentuiCatalog === './metadata.json',
    manifest,
  };
}

export function matchesPackagePattern(packageName: string, pattern: string): boolean {
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
  return new RegExp(`^${escaped}$`, 'i').test(packageName);
}

function findNearestPackageRoot(cwd: string, boundary: string): string | undefined {
  let current = path.resolve(cwd);
  if (fs.existsSync(current) && !fs.statSync(current).isDirectory()) {
    current = path.dirname(current);
  }
  while (isWithin(boundary, current)) {
    if (fs.existsSync(path.join(current, 'package.json'))) {
      return current;
    }
    if (current === boundary) {
      break;
    }
    current = path.dirname(current);
  }
  return undefined;
}

function readDependencyNames(
  value: unknown,
  dependencyKind: InstalledPackage['dependencyKind'],
): Array<{ packageName: string; dependencyKind: InstalledPackage['dependencyKind'] }> {
  return Object.keys(asStringMap(value)).map(packageName => ({ packageName, dependencyKind }));
}

function asStringMap(value: unknown): Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }
  return Object.fromEntries(
    Object.entries(value).filter((entry): entry is [string, string] => typeof entry[1] === 'string'),
  );
}

function findPackageManifest(start: string, requestedPackage: string): string | undefined {
  let current = start;
  while (true) {
    const candidate = path.join(current, 'package.json');
    if (fs.existsSync(candidate)) {
      const manifest = readJsonObject(candidate);
      if (manifest.name === requestedPackage || typeof manifest.name === 'string') {
        return candidate;
      }
    }
    const parent = path.dirname(current);
    if (parent === current || path.basename(current) === 'node_modules') {
      return undefined;
    }
    current = parent;
  }
}

function findNodeModulesPackage(importerRoot: string, requestedPackage: string): string | undefined {
  let current = importerRoot;
  while (true) {
    const candidate = path.join(current, 'node_modules', ...requestedPackage.split('/'), 'package.json');
    if (fs.existsSync(candidate)) {
      return candidate;
    }
    const parent = path.dirname(current);
    if (parent === current) {
      return undefined;
    }
    current = parent;
  }
}

function readJsonObject(filePath: string): Record<string, unknown> {
  const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8')) as unknown;
  return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? (parsed as Record<string, unknown>) : {};
}

function isWithin(parent: string, child: string): boolean {
  const relation = path.relative(path.resolve(parent), path.resolve(child));
  return relation === '' || (!relation.startsWith('..') && !path.isAbsolute(relation));
}

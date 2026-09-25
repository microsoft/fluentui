import { existsSync, readFileSync, readdirSync, realpathSync, statSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';

import type { GeneratorOptions, MetadataDiagnostic } from './types';

export interface PackageManifest {
  name: string;
  version: string;
  root: string;
  path: string;
  dependencies: DependencyManifest;
  exports?: unknown;
  types?: string;
  typings?: string;
}

export interface DependencyManifest {
  dependency?: Record<string, string>;
  devDependency?: Record<string, string>;
  optionalDependency?: Record<string, string>;
  peerDependency?: Record<string, string>;
}

export interface DeclarationEntry {
  entrypoint: string;
  conditions: string[];
  declarationPath: string;
  declarationRelativePath: string;
}

export interface DeclarationResolution {
  entries: DeclarationEntry[];
  advertisedRoutes: DeclarationRouteIdentity[];
  unselectedRoutes: DeclarationRouteIdentity[];
  diagnostics: MetadataDiagnostic[];
}

export interface DeclarationRouteIdentity {
  entrypoint: string;
  conditions: string[];
}

type PackageJson = {
  name?: unknown;
  version?: unknown;
  exports?: unknown;
  types?: unknown;
  typings?: unknown;
  dependencies?: unknown;
  devDependencies?: unknown;
  optionalDependencies?: unknown;
  peerDependencies?: unknown;
};

export function readPackageManifest(packageRoot: string, packageName?: string): PackageManifest {
  const root = realpathSync(resolve(packageRoot));
  const manifestPath = join(root, 'package.json');
  const value = JSON.parse(readFileSync(manifestPath, 'utf8')) as PackageJson;
  const name = packageName ?? expectString(value.name, `${manifestPath} must declare a package name`);
  const version = expectString(value.version, `${manifestPath} must declare a package version`);

  return {
    name,
    version,
    root,
    path: manifestPath,
    dependencies: {
      dependency: readStringMap(value.dependencies),
      devDependency: readStringMap(value.devDependencies),
      optionalDependency: readStringMap(value.optionalDependencies),
      peerDependency: readStringMap(value.peerDependencies),
    },
    exports: value.exports,
    types: typeof value.types === 'string' ? value.types : undefined,
    typings: typeof value.typings === 'string' ? value.typings : undefined,
  };
}

export function resolveDeclarationEntries(
  manifest: PackageManifest,
  options: Pick<GeneratorOptions, 'entrypoints' | 'declarationConditions'>,
): DeclarationResolution {
  const diagnostics: MetadataDiagnostic[] = [];
  const requestedEntrypoints = options.entrypoints ? [...new Set(options.entrypoints)] : undefined;
  const advertisedRoutes = manifest.exports
    ? collectAdvertisedRoutes(manifest)
    : manifest.types || manifest.typings
    ? [{ entrypoint: '.', conditions: ['types'] }]
    : [];
  const entries = manifest.exports
    ? resolveExportsEntries(manifest, requestedEntrypoints, options.declarationConditions, diagnostics)
    : resolveLegacyEntry(manifest, requestedEntrypoints, options.declarationConditions, diagnostics);

  const unique = new Map<string, DeclarationEntry>();
  for (const entry of entries) {
    const key = `${entry.entrypoint}\0${entry.conditions.join(',')}\0${entry.declarationRelativePath}`;
    unique.set(key, entry);
  }

  const selectedRouteKeys = new Set(
    [...unique.values()].map(entry => routeIdentityKey({ entrypoint: entry.entrypoint, conditions: entry.conditions })),
  );

  return {
    entries: [...unique.values()].sort(compareEntries),
    advertisedRoutes,
    unselectedRoutes: advertisedRoutes.filter(route => !selectedRouteKeys.has(routeIdentityKey(route))),
    diagnostics: diagnostics.sort(compareDiagnostics),
  };
}

function resolveExportsEntries(
  manifest: PackageManifest,
  requestedEntrypoints: string[] | undefined,
  declarationConditions: string[] | undefined,
  diagnostics: MetadataDiagnostic[],
): DeclarationEntry[] {
  const exportsValue = manifest.exports;
  const subpaths =
    isObject(exportsValue) && Object.keys(exportsValue).some(key => key.startsWith('.'))
      ? (exportsValue as Record<string, unknown>)
      : { '.': exportsValue };
  const selected = requestedEntrypoints ?? Object.keys(subpaths);
  const entries: DeclarationEntry[] = [];

  for (const requested of selected) {
    const match = findSubpathExport(subpaths, requested);
    if (!match) {
      diagnostics.push({
        code: 'generator.entrypointNotExported',
        severity: 'error',
        message: `Entrypoint ${requested} is not exported by ${manifest.name}`,
        path: 'package.json',
      });
      continue;
    }

    const targets = collectDeclarationTargets(match.value, []);
    if (targets.length === 0) {
      continue;
    }
    for (const target of targets) {
      if (declarationConditions && !declarationConditions.every(condition => target.conditions.includes(condition))) {
        continue;
      }

      for (const expanded of expandTarget(manifest.root, match.key, requested, target.path).filter(candidate => {
        const winningMatch = findSubpathExport(subpaths, candidate.entrypoint);
        return winningMatch?.key === match.key;
      })) {
        const declarationPath = resolveContained(manifest.root, expanded.path);
        const declarationRelativePath = toPosix(relative(manifest.root, declarationPath));
        if (!existsSync(declarationPath)) {
          diagnostics.push({
            code: 'generator.declarationMissing',
            severity: 'error',
            message: `Declaration for ${expanded.entrypoint} does not exist`,
            path: declarationRelativePath,
          });
          continue;
        }

        entries.push({
          entrypoint: expanded.entrypoint,
          conditions: normalizeConditions(target.conditions),
          declarationPath,
          declarationRelativePath,
        });
      }
    }

    if (!requested.includes('*') && !entries.some(entry => entry.entrypoint === requested)) {
      diagnostics.push({
        code: 'generator.declarationConditionUnavailable',
        severity: 'error',
        message: `No declaration target for ${requested} matches the requested conditions`,
        path: 'package.json',
      });
    }
  }

  return entries;
}

function collectAdvertisedRoutes(manifest: PackageManifest): DeclarationRouteIdentity[] {
  const exportsValue = manifest.exports;
  const subpaths =
    isObject(exportsValue) && Object.keys(exportsValue).some(key => key.startsWith('.'))
      ? (exportsValue as Record<string, unknown>)
      : { '.': exportsValue };
  const routes = Object.entries(subpaths).flatMap(([entrypoint, value]) =>
    collectDeclarationTargets(value, []).flatMap(target =>
      expandTarget(manifest.root, entrypoint, entrypoint, target.path)
        .filter(candidate => findSubpathExport(subpaths, candidate.entrypoint)?.key === entrypoint)
        .map(candidate => ({
          entrypoint: candidate.entrypoint,
          conditions: normalizeConditions(target.conditions),
        })),
    ),
  );
  const unique = new Map(routes.map(route => [routeIdentityKey(route), route]));
  return [...unique.values()].sort(
    (left, right) =>
      left.entrypoint.localeCompare(right.entrypoint) ||
      left.conditions.join(',').localeCompare(right.conditions.join(',')),
  );
}

function resolveLegacyEntry(
  manifest: PackageManifest,
  requestedEntrypoints: string[] | undefined,
  declarationConditions: string[] | undefined,
  diagnostics: MetadataDiagnostic[],
): DeclarationEntry[] {
  const selected = requestedEntrypoints ?? ['.'];
  if (selected.some(entrypoint => entrypoint !== '.')) {
    diagnostics.push({
      code: 'generator.legacySubpathUnsupported',
      severity: 'error',
      message: `${manifest.name} has no exports map; only the root declaration can be resolved`,
      path: 'package.json',
    });
  }

  const typesPath = manifest.types ?? manifest.typings;
  if (!typesPath || !selected.includes('.')) {
    return [];
  }

  const conditions = normalizeConditions(declarationConditions ?? ['types']);
  const declarationPath = resolveContained(manifest.root, typesPath);
  const declarationRelativePath = toPosix(relative(manifest.root, declarationPath));
  if (!existsSync(declarationPath)) {
    diagnostics.push({
      code: 'generator.declarationMissing',
      severity: 'error',
      message: 'Root declaration does not exist',
      path: declarationRelativePath,
    });
    return [];
  }

  return [{ entrypoint: '.', conditions, declarationPath, declarationRelativePath }];
}

function findSubpathExport(
  subpaths: Record<string, unknown>,
  requested: string,
): { key: string; value: unknown } | undefined {
  if (requested in subpaths) {
    return { key: requested, value: subpaths[requested] };
  }

  return Object.entries(subpaths)
    .filter(([key]) => key.includes('*') && matchesPattern(key, requested))
    .sort(([left], [right]) => right.length - left.length)
    .map(([key, value]) => ({ key, value }))[0];
}

function collectDeclarationTargets(
  value: unknown,
  conditions: string[],
): Array<{ path: string; conditions: string[] }> {
  if (typeof value === 'string') {
    return isDeclarationPath(value)
      ? [{ path: value, conditions: conditions.length > 0 ? conditions : ['types'] }]
      : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap(item => collectDeclarationTargets(item, conditions));
  }

  if (!isObject(value)) {
    return [];
  }

  return Object.entries(value).flatMap(([condition, child]) => {
    if (condition.startsWith('.')) {
      return [];
    }
    return collectDeclarationTargets(child, [...conditions, condition]);
  });
}

function expandTarget(
  packageRoot: string,
  exportPattern: string,
  requestedEntrypoint: string,
  targetPattern: string,
): Array<{ entrypoint: string; path: string }> {
  if (!exportPattern.includes('*') || !targetPattern.includes('*')) {
    return [{ entrypoint: requestedEntrypoint, path: targetPattern }];
  }

  if (!requestedEntrypoint.includes('*')) {
    const capture = capturePattern(exportPattern, requestedEntrypoint);
    return capture === undefined
      ? []
      : [{ entrypoint: requestedEntrypoint, path: targetPattern.replace('*', capture) }];
  }

  const [prefix, suffix] = targetPattern.split('*');
  const searchRoot = resolveContained(packageRoot, dirname(prefix));
  if (!existsSync(searchRoot) || !statSync(searchRoot).isDirectory()) {
    return [];
  }

  return walkFiles(searchRoot)
    .map(file => toPosix(relative(packageRoot, file)))
    .filter(file => file.startsWith(stripDotSlash(prefix)) && file.endsWith(suffix))
    .map(file => {
      const capture = file.slice(stripDotSlash(prefix).length, file.length - suffix.length);
      return {
        entrypoint: exportPattern.replace('*', capture),
        path: targetPattern.replace('*', capture),
      };
    });
}

function walkFiles(root: string): string[] {
  return readdirSync(root, { withFileTypes: true }).flatMap(entry => {
    const path = join(root, entry.name);
    return entry.isDirectory() ? walkFiles(path) : [path];
  });
}

function resolveContained(root: string, value: string): string {
  if (isAbsolute(value)) {
    throw new Error(`Declaration paths must be package-relative: ${value}`);
  }
  const resolved = resolve(root, value);
  const relativePath = relative(root, resolved);
  if (relativePath === '..' || relativePath.startsWith(`..${sep}`) || isAbsolute(relativePath)) {
    throw new Error(`Declaration path escapes the package root: ${value}`);
  }
  return resolved;
}

function capturePattern(pattern: string, value: string): string | undefined {
  const [prefix, suffix] = pattern.split('*');
  return value.startsWith(prefix) && value.endsWith(suffix)
    ? value.slice(prefix.length, value.length - suffix.length)
    : undefined;
}

function matchesPattern(pattern: string, value: string): boolean {
  return capturePattern(pattern, value) !== undefined;
}

function normalizeConditions(conditions: readonly string[]): string[] {
  const priority = new Map([
    ['types', 0],
    ['import', 1],
    ['require', 2],
    ['node', 3],
    ['default', 4],
  ]);

  return [...new Set(conditions)].sort(
    (left, right) => (priority.get(left) ?? 100) - (priority.get(right) ?? 100) || left.localeCompare(right),
  );
}

function compareEntries(left: DeclarationEntry, right: DeclarationEntry): number {
  return (
    left.entrypoint.localeCompare(right.entrypoint) ||
    left.conditions.join(',').localeCompare(right.conditions.join(',')) ||
    left.declarationRelativePath.localeCompare(right.declarationRelativePath)
  );
}

function compareDiagnostics(left: MetadataDiagnostic, right: MetadataDiagnostic): number {
  return (
    left.code.localeCompare(right.code) ||
    (left.path ?? '').localeCompare(right.path ?? '') ||
    left.message.localeCompare(right.message)
  );
}

function routeIdentityKey(route: DeclarationRouteIdentity): string {
  return `${route.entrypoint}\0${route.conditions.join(',')}`;
}

function readStringMap(value: unknown): Record<string, string> | undefined {
  if (!isObject(value)) {
    return undefined;
  }
  return Object.fromEntries(
    Object.entries(value).filter((entry): entry is [string, string] => typeof entry[1] === 'string'),
  );
}

function expectString(value: unknown, message: string): string {
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(message);
  }
  return value;
}

function isDeclarationPath(value: string): boolean {
  return /\.d\.(?:c|m)?ts$/.test(value);
}

function stripDotSlash(value: string): string {
  return value.startsWith('./') ? value.slice(2) : value;
}

function toPosix(value: string): string {
  return value.split(sep).join('/');
}

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

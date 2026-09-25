import { existsSync, realpathSync, statSync } from 'node:fs';
import * as path from 'node:path';
import { getEntrypointExport } from '@fluentui/api-metadata';
import type { ApiSymbol } from '@fluentui/api-metadata';

import type { ApiQueryOptions, ApiRouteSummary, CatalogRoot } from './api-query';
import { formatPackageSpecifier, parsePackageSpecifier, resolveInstalledPackage } from './package-inventory';

export interface RecommendedImport {
  moduleSpecifier: string;
  exportName: string;
  localName: string;
  kind: 'named' | 'default';
  typeOnly: boolean;
  statement: string;
  reason: 'explicit-from' | 'explicit-package' | 'configured-catalog' | 'system-preset' | 'discovered-package';
}

export interface ApiImportSelection {
  recommendedImport: RecommendedImport | null;
  importStatus: 'selected' | 'ambiguous' | 'unavailable';
  importCandidates: RecommendedImport[];
}

export function preferredApiRoots(roots: readonly CatalogRoot[], options: ApiQueryOptions): readonly CatalogRoot[] {
  if (options.from || options.package) {
    const requested = options.from ? parsePackageSpecifier(options.from)?.packageName : options.package;
    const exact = roots.filter(root => root.requestedPackage === requested);
    return options.from || exact.length ? exact : roots.filter(root => root.packageName === requested);
  }
  const configured = roots.filter(root => root.source === 'config' || root.source === 'local');
  const presets = roots.filter(root => root.source === 'preset');
  return configured.length ? configured : presets.length ? presets : roots;
}

export function isRouteFromRoot(route: ApiRouteSummary, root: CatalogRoot): boolean {
  return (
    route.requestedPackage === root.requestedPackage &&
    route.package === root.packageName &&
    route.systems === root.systems
  );
}

export function selectApiImport(
  routes: readonly ApiRouteSummary[],
  roots: readonly CatalogRoot[],
  options: ApiQueryOptions,
  symbol: ApiSymbol | undefined,
  getIssue: (route: ApiRouteSummary, root: CatalogRoot) => string | undefined,
): ApiImportSelection & { issue?: string } {
  const preferred = preferredApiRoots(roots, options);
  const candidates = new Map<string, { route: ApiRouteSummary; value: RecommendedImport }>();
  const issues = new Set<string>();
  for (const route of routes) {
    if (!symbol) {
      break;
    }
    if (options.from && options.from !== formatPackageSpecifier(route.requestedPackage, route.entrypoint)) {
      continue;
    }
    const root = preferred.find(value => isRouteFromRoot(route, value));
    if (!root) {
      continue;
    }
    const issue = getIssue(route, root);
    if (issue) {
      issues.add(issue);
      continue;
    }
    const value = createImport(route, symbol, options);
    const key = `${value.moduleSpecifier}\0${value.exportName}`;
    const existing = candidates.get(key);
    if (!existing || (existing.value.typeOnly && !value.typeOnly)) {
      candidates.set(key, { route, value });
    }
  }
  const publicRoots = new Set(
    [...candidates.values()]
      .filter(candidate => candidate.route.entrypoint === '.')
      .map(candidate => candidate.route.requestedPackage),
  );
  const choices = [...candidates.values()]
    .filter(candidate => candidate.route.entrypoint === '.' || !publicRoots.has(candidate.route.requestedPackage))
    .map(candidate => candidate.value)
    .sort((left, right) => left.moduleSpecifier.localeCompare(right.moduleSpecifier));
  return {
    recommendedImport: choices.length === 1 ? choices[0] : null,
    importStatus: choices.length === 1 ? 'selected' : choices.length ? 'ambiguous' : 'unavailable',
    importCandidates: choices,
    ...(choices.length === 1
      ? {}
      : {
          issue: choices.length
            ? 'Several equally preferred public import paths expose this API. Select one with --from.'
            : !symbol
            ? 'The API definition is unavailable; no import can be recommended.'
            : issues.size
            ? [...issues].join(' ')
            : 'No verified export of this API was found in the selected public catalogs. Dependency declarations are not an alternative public import policy.',
        }),
  };
}

function createImport(route: ApiRouteSummary, symbol: ApiSymbol, options: ApiQueryOptions): RecommendedImport {
  const moduleSpecifier = formatPackageSpecifier(route.requestedPackage, route.entrypoint);
  const kind = route.exportKind === 'default' ? 'default' : 'named';
  const typeOnly = route.typeOnly || route.namespace === 'type';
  const proposedName = kind === 'default' ? symbol.name : route.export;
  const localName = isBindingName(proposedName) ? proposedName : 'ImportedApi';
  const binding =
    kind === 'default'
      ? localName
      : `{ ${localName === route.export ? route.export : `${JSON.stringify(route.export)} as ${localName}`} }`;
  return {
    moduleSpecifier,
    exportName: route.export,
    localName,
    kind,
    typeOnly,
    statement: `import ${typeOnly ? 'type ' : ''}${binding} from ${JSON.stringify(moduleSpecifier)};`,
    reason: options.from
      ? 'explicit-from'
      : options.package
      ? 'explicit-package'
      : route.source === 'config' || route.source === 'local'
      ? 'configured-catalog'
      : route.source === 'preset'
      ? 'system-preset'
      : 'discovered-package',
  };
}

const reservedBindings = new Set(
  'await break case catch class const continue debugger default delete do else enum export extends false finally for function if implements import in instanceof interface let new null package private protected public return static super switch this throw true try typeof var void while with yield'.split(
    ' ',
  ),
);

function isBindingName(value: string): boolean {
  return /^[$_\p{ID_Start}][$\u200C\u200D\p{ID_Continue}]*$/u.test(value) && !reservedBindings.has(value);
}

export function getApiImportIssue(route: ApiRouteSummary, root: CatalogRoot): string | undefined {
  if (route.conditions.some(condition => !['types', 'import', 'default'].includes(condition))) {
    return `${formatPackageSpecifier(
      route.requestedPackage,
      route.entrypoint,
    )} has a declaration variant requiring ${route.conditions.join(', ')}; no environment-specific import is guessed.`;
  }
  const installed = resolveInstalledPackage(root.requestedPackage, root.importer);
  if (!installed || installed.packageRoot !== root.packageRoot) {
    return `${root.requestedPackage} is not resolvable to this catalog's package from the consumer.`;
  }
  const manifest = installed.manifest;
  const typeOnly = route.typeOnly || route.namespace === 'type';
  if (manifest.exports === undefined) {
    if (route.entrypoint !== '.') {
      return 'Packages without an export map only support verified root import recommendations.';
    }
    const target = typeOnly ? manifest.types ?? manifest.typings : manifest.main ?? './index.js';
    return verifyTarget(installed.packageRoot, target, typeOnly);
  }
  if (isObject(manifest.exports)) {
    const keys = Object.keys(manifest.exports);
    if (keys.some(key => key.startsWith('.')) && keys.some(key => !key.startsWith('.'))) {
      return 'The export map mixes subpath keys and condition keys.';
    }
  }
  const entry = getEntrypointExport(manifest.exports, route.entrypoint);
  if (hasCustomConditions(entry)) {
    return `${root.requestedPackage}${route.entrypoint.slice(
      1,
    )} uses custom export conditions; select the consuming environment before recommending an import.`;
  }
  const declaration = selectTarget(entry, new Set(['types', 'import', 'default']));
  const routeBranches = route.conditions.filter(condition => condition !== 'types' && condition !== 'default');
  if (!declaration || !routeBranches.every(condition => declaration.conditions.includes(condition))) {
    return `No matching ESM declaration branch exists for ${formatPackageSpecifier(
      root.requestedPackage,
      route.entrypoint,
    )}.`;
  }
  const declarationIssue = verifyTarget(installed.packageRoot, declaration.target, true, true);
  if (declarationIssue) {
    return declarationIssue;
  }
  const runtime = typeOnly ? declaration : selectTarget(entry, new Set(['import', 'default']));
  return verifyTarget(installed.packageRoot, runtime?.target, typeOnly, true);
}

function hasCustomConditions(value: unknown): boolean {
  if (Array.isArray(value)) {
    return value.some(hasCustomConditions);
  }
  return (
    isObject(value) &&
    Object.entries(value).some(
      ([key, child]) => !['types', 'import', 'require', 'default'].includes(key) || hasCustomConditions(child),
    )
  );
}

function selectTarget(
  value: unknown,
  active: Set<string>,
  conditions: string[] = [],
): { target: string; conditions: string[] } | null | undefined {
  if (typeof value === 'string') {
    return { target: value, conditions };
  }
  if (value === null) {
    return null;
  }
  if (Array.isArray(value)) {
    // Only simple valid package-relative alternatives are accepted here.
    let blocked = value.length === 0;
    for (const alternative of value) {
      const selected = selectTarget(alternative, active, conditions);
      if (selected?.target.startsWith('./')) {
        return selected;
      }
      blocked ||= selected !== undefined;
    }
    return blocked ? null : undefined;
  }
  if (isObject(value)) {
    for (const [condition, child] of Object.entries(value)) {
      if (active.has(condition)) {
        const selected = selectTarget(child, active, [...conditions, condition]);
        if (selected !== undefined) {
          return selected;
        }
      }
    }
  }
  return undefined;
}

function verifyTarget(root: string, value: unknown, typeOnly: boolean, exportMap = false): string | undefined {
  if (typeof value !== 'string') {
    return `No public ${typeOnly ? 'declaration' : 'ESM runtime'} target is available.`;
  }
  if (exportMap && !value.startsWith('./')) {
    return `Export target ${value} is not package-relative.`;
  }
  if (
    exportMap &&
    (value.includes('\\') ||
      /%(?:2e|2f|5c)/i.test(value) ||
      value
        .slice(2)
        .split('/')
        .some(segment => ['.', '..', 'node_modules'].includes(segment.toLowerCase())))
  ) {
    return `Export target ${value} contains forbidden path segments.`;
  }
  const declaration = /\.d\.[cm]?ts$/.test(value);
  if (typeOnly ? !declaration : declaration || !/\.[cm]?js$/.test(value)) {
    return `Export target ${value} does not support a verified ${typeOnly ? 'type-only' : 'JavaScript ESM'} import.`;
  }
  const target = path.resolve(root, value);
  const relative = path.relative(root, target);
  if (
    path.isAbsolute(value) ||
    relative.startsWith('..') ||
    path.isAbsolute(relative) ||
    value.split(/[\\/]/).includes('node_modules') ||
    !existsSync(target) ||
    !statSync(target).isFile()
  ) {
    return `Export target ${value} is not an existing package-contained file.`;
  }
  const realRelative = path.relative(root, realpathSync(target));
  return realRelative.startsWith('..') || path.isAbsolute(realRelative)
    ? `Export target ${value} resolves outside its package.`
    : undefined;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

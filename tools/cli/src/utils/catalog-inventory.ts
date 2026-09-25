import { createMetadataReader, MetadataReaderError } from '@fluentui/api-metadata';
import type { LoadedPackageCatalog, MetadataReader, PackageIndex } from '@fluentui/api-metadata';
import * as fs from 'node:fs';
import * as path from 'node:path';

import { loadCatalogConfig, type CatalogConfigCatalog, type CatalogSystemConfig } from './config';
import {
  findWorkspaceRoot,
  getWorkspacePackageInventory,
  matchesPackagePattern,
  parsePackageSpecifier,
  resolveInstalledPackage,
  type InstalledPackage,
} from './package-inventory';
import { CATALOG_SYSTEM_PRESETS, LEGACY_USAGE_PACKAGE_PATTERNS } from './system-presets';

export interface CatalogSelectionOptions {
  cwd?: string;
  config?: string;
  system?: string[];
  package?: string;
  metadataMode?: 'prefer' | 'required' | 'off';
}

export interface CatalogDiagnostic {
  code: string;
  severity: 'info' | 'warning' | 'error';
  message: string;
  system?: string;
  package?: string;
  path?: string;
  causeCode?: string;
}

export interface CatalogRoot {
  packageName: string;
  requestedPackage: string;
  packageRoot: string;
  importer: string;
  systems: string[];
  source: 'config' | 'preset' | 'dependency' | 'local';
  catalog?: LoadedPackageCatalog;
}

export interface CatalogPackageSelection {
  systems: string[];
  packages: string[];
  exclusions: string[];
  explicitPackage?: string;
  legacyFallback: boolean;
  matches(moduleSpecifier: string): boolean;
}

export interface CatalogInventory {
  workspaceRoot: string;
  roots: CatalogRoot[];
  diagnostics: CatalogDiagnostic[];
  reader: MetadataReader;
  selection: CatalogPackageSelection;
  configPath?: string;
  metadataMode: 'prefer' | 'required' | 'off';
}

export class CatalogInventoryError extends Error {
  public readonly path?: string;

  public constructor(public readonly code: string, message: string, pathValue?: string) {
    super(message);
    this.name = 'CatalogInventoryError';
    this.path = pathValue;
  }
}

interface EffectiveSystem {
  name: string;
  catalogs: CatalogConfigCatalog[];
  packages: string[];
  exclusions: string[];
  source: 'config' | 'preset';
}

export function getCatalogInventory(options: CatalogSelectionOptions = {}): CatalogInventory {
  const cwd = path.resolve(options.cwd ?? process.cwd());
  const workspaceRoot = findWorkspaceRoot(cwd);
  const workspacePackages = getWorkspacePackageInventory(cwd);
  const importer = workspacePackages.selectedPackageRoot;
  const loadedConfig = loadCatalogConfig({ cwd, workspaceRoot, config: options.config });
  const systems = getEffectiveSystems(loadedConfig?.config.systems, options.system);
  const metadataMode = options.metadataMode ?? 'prefer';
  const reader = createMetadataReader();
  const diagnostics: CatalogDiagnostic[] = [];
  const roots: CatalogRoot[] = [];

  for (const system of systems) {
    for (const catalog of system.catalogs) {
      if (catalog.package) {
        const installed =
          workspacePackages.packages.find(candidate => candidate.requestedPackage === catalog.package) ??
          resolveInstalledPackage(catalog.package, importer);
        if (!installed) {
          roots.push(missingRoot(catalog.package, importer, system.name, system.source));
          diagnostics.push(
            unavailableDiagnostic(
              metadataMode,
              'catalog.packageNotFound',
              `Unable to resolve catalog package ${catalog.package} from ${importer}`,
              system.name,
              catalog.package,
            ),
          );
          continue;
        }
        roots.push(loadInstalledCatalog(reader, installed, [system.name], system.source, metadataMode, diagnostics));
      } else if (catalog.path) {
        roots.push(
          loadLocalCatalog(
            reader,
            path.resolve(loadedConfig?.directory ?? workspaceRoot, catalog.path),
            importer,
            system.name,
            metadataMode,
            diagnostics,
          ),
        );
      }
    }
  }

  for (const installed of workspacePackages.packages) {
    if (!installed.hasCatalogMarker || roots.some(root => root.packageRoot === installed.packageRoot)) {
      continue;
    }
    const discovered = loadInstalledCatalog(reader, installed, [], 'dependency', metadataMode, diagnostics);
    const declaredSystem = discovered.catalog?.index.system;
    const memberships = declaredSystem
      ? systems.filter(system => system.name === declaredSystem).map(system => system.name)
      : systems
          .filter(system =>
            [
              ...system.catalogs.flatMap(catalog => (catalog.package ? [catalog.package] : [])),
              ...system.packages,
            ].some(
              pattern =>
                matchesPackagePattern(installed.requestedPackage, pattern) ||
                matchesPackagePattern(installed.packageName, pattern),
            ),
          )
          .map(system => system.name);
    if (memberships.length > 0) {
      discovered.systems.push(...memberships);
      roots.push(discovered);
    }
  }

  const explicitPackage = options.package ? parseRequiredPackage(options.package) : undefined;
  if (explicitPackage && !roots.some(root => root.requestedPackage === explicitPackage)) {
    const installed = resolveInstalledPackage(explicitPackage, importer);
    if (!installed) {
      roots.push(missingRoot(explicitPackage, importer, undefined, 'dependency'));
      diagnostics.push(
        unavailableDiagnostic(
          metadataMode,
          'catalog.packageNotFound',
          `Unable to resolve selected package ${explicitPackage} from ${importer}`,
          undefined,
          explicitPackage,
        ),
      );
    } else {
      roots.push(loadInstalledCatalog(reader, installed, [], 'dependency', metadataMode, diagnostics));
    }
  }

  const mergedRoots = mergeRoots(roots);
  assertNoCatalogConflicts(mergedRoots);
  const selection = createPackageSelection(
    systems,
    mergedRoots,
    explicitPackage,
    !loadedConfig && !options.system?.length,
  );

  return {
    workspaceRoot,
    roots: mergedRoots.sort(compareRoots),
    diagnostics: diagnostics.sort(compareDiagnostics),
    reader,
    selection,
    configPath: loadedConfig?.path,
    metadataMode,
  };
}

function getEffectiveSystems(
  configured: Record<string, CatalogSystemConfig> | undefined,
  requested: string[] | undefined,
): EffectiveSystem[] {
  const effective = new Map<string, EffectiveSystem>();
  for (const preset of Object.values(CATALOG_SYSTEM_PRESETS)) {
    effective.set(preset.name, {
      name: preset.name,
      catalogs: preset.catalogs.map(packageName => ({ package: packageName })),
      packages: [...preset.packages],
      exclusions: [...preset.exclusions],
      source: 'preset',
    });
  }

  for (const [name, system] of Object.entries(configured ?? {})) {
    if (system.disabled) {
      effective.delete(name);
      continue;
    }
    effective.set(name, {
      name,
      catalogs: system.catalogs ?? [],
      packages: system.packages ?? [],
      exclusions: system.exclusions ?? [],
      source: 'config',
    });
  }

  if (!requested || requested.length === 0) {
    return [...effective.values()].sort((left, right) => left.name.localeCompare(right.name));
  }
  const names = [...new Set(requested)];
  for (const name of names) {
    if (!effective.has(name)) {
      throw new CatalogInventoryError('catalog.systemUnknown', `Unknown or disabled catalog system: ${name}`);
    }
  }
  return names.map(name => effective.get(name)!);
}

function loadInstalledCatalog(
  reader: MetadataReader,
  installed: InstalledPackage,
  systems: string[],
  source: CatalogRoot['source'],
  metadataMode: CatalogInventory['metadataMode'],
  diagnostics: CatalogDiagnostic[],
): CatalogRoot {
  const root: CatalogRoot = {
    packageName: installed.packageName,
    requestedPackage: installed.requestedPackage,
    packageRoot: installed.packageRoot,
    importer: installed.importer,
    systems,
    source,
  };
  if (metadataMode === 'off') {
    return root;
  }

  try {
    root.catalog = reader.loadPackageIndex(installed.requestedPackage, installed.importer);
  } catch (initialError) {
    try {
      const metadataTarget = getMetadataExportTarget(installed.manifest.exports);
      const metadataFile = metadataTarget && path.resolve(installed.packageRoot, metadataTarget);
      if (!metadataFile || !isWithin(installed.packageRoot, metadataFile) || !fs.existsSync(metadataFile)) {
        throw initialError;
      }
      reader.registerPackageCatalog({
        requested: installed.requestedPackage,
        importer: installed.importer,
        packageRoot: installed.packageRoot,
        metadataFile,
        index: readIndex(metadataFile),
      });
      root.catalog = reader.loadPackageIndex(installed.requestedPackage, installed.importer);
    } catch (error) {
      diagnostics.push(toCatalogDiagnostic(error, metadataMode, systems[0], installed.requestedPackage));
    }
  }
  return root;
}

function loadLocalCatalog(
  reader: MetadataReader,
  configuredPath: string,
  importer: string,
  system: string,
  metadataMode: CatalogInventory['metadataMode'],
  diagnostics: CatalogDiagnostic[],
): CatalogRoot {
  const unresolved: CatalogRoot = {
    packageName: path.basename(configuredPath),
    requestedPackage: path.basename(configuredPath),
    packageRoot: configuredPath,
    importer,
    systems: [system],
    source: 'local',
  };
  try {
    const location = resolveLocalCatalogLocation(configuredPath);
    unresolved.packageName = location.packageName;
    unresolved.requestedPackage = location.packageName;
    unresolved.packageRoot = location.packageRoot;
    if (metadataMode === 'off') {
      return unresolved;
    }
    const index = readIndex(location.metadataFile);
    reader.registerPackageCatalog({
      requested: location.packageName,
      importer,
      packageRoot: location.packageRoot,
      metadataFile: location.metadataFile,
      index,
    });
    unresolved.catalog = reader.loadPackageIndex(location.packageName, importer);
  } catch (error) {
    diagnostics.push(toCatalogDiagnostic(error, metadataMode, system, unresolved.requestedPackage, configuredPath));
  }
  return unresolved;
}

function resolveLocalCatalogLocation(configuredPath: string): {
  packageName: string;
  packageRoot: string;
  metadataFile: string;
} {
  if (!fs.existsSync(configuredPath)) {
    throw new CatalogInventoryError(
      'catalog.localPathNotFound',
      `Local catalog path does not exist: ${configuredPath}`,
    );
  }
  const statistics = fs.statSync(configuredPath);
  const metadataFile = statistics.isFile() ? configuredPath : findLocalIndex(configuredPath);
  if (!metadataFile) {
    throw new CatalogInventoryError(
      'catalog.localIndexNotFound',
      `Local catalog directory does not contain a metadata index: ${configuredPath}`,
    );
  }
  const packageRoot = findContainingPackageRoot(path.dirname(metadataFile));
  if (!packageRoot) {
    throw new CatalogInventoryError(
      'catalog.localPackageNotFound',
      `Local catalog is not contained by a package.json: ${metadataFile}`,
    );
  }
  const manifest = readJsonObject(path.join(packageRoot, 'package.json'));
  if (typeof manifest.name !== 'string' || typeof manifest.version !== 'string') {
    throw new CatalogInventoryError(
      'catalog.localPackageInvalid',
      `Local catalog package.json requires name and version: ${packageRoot}`,
    );
  }
  return {
    packageName: manifest.name,
    packageRoot: fs.realpathSync(packageRoot),
    metadataFile: fs.realpathSync(metadataFile),
  };
}

function findLocalIndex(configuredDirectory: string): string | undefined {
  const packageManifest = path.join(configuredDirectory, 'package.json');
  if (fs.existsSync(packageManifest)) {
    const manifest = readJsonObject(packageManifest);
    const exported = getMetadataExportTarget(manifest.exports);
    if (exported) {
      const candidate = path.resolve(configuredDirectory, exported);
      if (isWithin(configuredDirectory, candidate) && fs.existsSync(candidate)) {
        return candidate;
      }
    }
  }
  for (const candidate of [
    path.join(configuredDirectory, 'index.json'),
    path.join(configuredDirectory, 'dist/metadata/index.json'),
  ]) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return undefined;
}

function getMetadataExportTarget(exportsField: unknown): string | undefined {
  if (!exportsField || typeof exportsField !== 'object' || Array.isArray(exportsField)) {
    return undefined;
  }
  return firstString((exportsField as Record<string, unknown>)['./metadata.json']);
}

function firstString(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(firstString).find((candidate): candidate is string => candidate !== undefined);
  }
  if (!value || typeof value !== 'object') {
    return undefined;
  }
  const object = value as Record<string, unknown>;
  for (const condition of ['require', 'node', 'default', 'import']) {
    const result = firstString(object[condition]);
    if (result) {
      return result;
    }
  }
  return Object.values(object)
    .map(firstString)
    .find((candidate): candidate is string => candidate !== undefined);
}

function readIndex(metadataFile: string): PackageIndex {
  try {
    return JSON.parse(fs.readFileSync(metadataFile, 'utf8')) as PackageIndex;
  } catch {
    throw new CatalogInventoryError('catalog.localIndexInvalidJson', `Invalid JSON in local catalog: ${metadataFile}`);
  }
}

function findContainingPackageRoot(start: string): string | undefined {
  let current = path.resolve(start);
  while (true) {
    if (fs.existsSync(path.join(current, 'package.json'))) {
      return current;
    }
    const parent = path.dirname(current);
    if (parent === current) {
      return undefined;
    }
    current = parent;
  }
}

function createPackageSelection(
  systems: EffectiveSystem[],
  roots: CatalogRoot[],
  explicitPackage: string | undefined,
  legacyFallback: boolean,
): CatalogPackageSelection {
  const selectedSystemNames = new Set(systems.map(system => system.name));
  const packages = [
    ...new Set([
      ...systems.flatMap(system => system.packages),
      ...roots
        .filter(root => root.systems.some(system => selectedSystemNames.has(system)))
        .flatMap(root => [root.packageName, root.requestedPackage]),
    ]),
  ].sort();
  const exclusions = [...new Set(systems.flatMap(system => system.exclusions))].sort();
  const selectedSystems = systems.map(system => system.name);
  return {
    systems: selectedSystems,
    packages,
    exclusions,
    explicitPackage,
    legacyFallback,
    matches(moduleSpecifier: string): boolean {
      const parsed = parsePackageSpecifier(moduleSpecifier);
      if (!parsed) {
        return false;
      }
      if (explicitPackage) {
        return parsed.packageName === explicitPackage;
      }
      if (exclusions.some(pattern => matchesPackagePattern(parsed.packageName, pattern))) {
        return false;
      }
      return (
        packages.some(pattern => matchesPackagePattern(parsed.packageName, pattern)) ||
        (legacyFallback &&
          LEGACY_USAGE_PACKAGE_PATTERNS.some(pattern => matchesPackagePattern(parsed.packageName, pattern)))
      );
    },
  };
}

function mergeRoots(roots: CatalogRoot[]): CatalogRoot[] {
  const merged = new Map<string, CatalogRoot>();
  for (const root of roots) {
    const key = `${root.packageRoot}\0${root.requestedPackage}`;
    const existing = merged.get(key);
    if (!existing) {
      merged.set(key, { ...root, systems: [...new Set(root.systems)].sort() });
      continue;
    }
    existing.systems = [...new Set([...existing.systems, ...root.systems])].sort();
    if (sourcePriority(root.source) > sourcePriority(existing.source)) {
      existing.source = root.source;
    }
    existing.catalog ??= root.catalog;
  }
  return [...merged.values()];
}

function assertNoCatalogConflicts(roots: CatalogRoot[]): void {
  const identities = new Map<string, CatalogRoot>();
  for (const root of roots) {
    if (!root.catalog) {
      continue;
    }
    for (const system of root.systems) {
      const key = `${system}\0${root.packageName}\0${root.catalog.index.package.version}`;
      const existing = identities.get(key);
      if (
        existing?.catalog &&
        existing.packageRoot !== root.packageRoot &&
        existing.catalog.indexFingerprint !== root.catalog.indexFingerprint
      ) {
        throw new CatalogInventoryError(
          'catalog.conflict',
          `System ${system} contains conflicting ${root.packageName}@${root.catalog.index.package.version} catalogs`,
        );
      }
      identities.set(key, root);
    }
  }
}

function missingRoot(
  packageName: string,
  importer: string,
  system: string | undefined,
  source: CatalogRoot['source'],
): CatalogRoot {
  return {
    packageName,
    requestedPackage: packageName,
    packageRoot: path.join(importer, 'node_modules', ...packageName.split('/')),
    importer,
    systems: system ? [system] : [],
    source,
  };
}

function unavailableDiagnostic(
  metadataMode: CatalogInventory['metadataMode'],
  code: string,
  message: string,
  system?: string,
  packageName?: string,
): CatalogDiagnostic {
  return {
    code,
    severity: metadataMode === 'required' ? 'error' : 'warning',
    message,
    system,
    package: packageName,
  };
}

function toCatalogDiagnostic(
  error: unknown,
  metadataMode: CatalogInventory['metadataMode'],
  system?: string,
  packageName?: string,
  configuredPath?: string,
): CatalogDiagnostic {
  if (error instanceof MetadataReaderError) {
    return {
      code: 'catalog.metadataUnavailable',
      severity: metadataMode === 'required' ? 'error' : 'warning',
      message: error.message,
      system,
      package: packageName,
      path: error.path ?? configuredPath,
      causeCode: error.code,
    };
  }
  if (error instanceof CatalogInventoryError) {
    return {
      code: error.code,
      severity: metadataMode === 'required' ? 'error' : 'warning',
      message: error.message,
      system,
      package: packageName,
      path: error.path ?? configuredPath,
    };
  }
  throw error;
}

function parseRequiredPackage(value: string): string {
  const parsed = parsePackageSpecifier(value);
  if (!parsed) {
    throw new CatalogInventoryError('catalog.packageSpecifier', `Expected an npm package name, received ${value}`);
  }
  return parsed.packageName;
}

function sourcePriority(source: CatalogRoot['source']): number {
  return { dependency: 0, preset: 1, config: 2, local: 3 }[source];
}

function compareRoots(left: CatalogRoot, right: CatalogRoot): number {
  return (
    left.packageName.localeCompare(right.packageName) ||
    left.requestedPackage.localeCompare(right.requestedPackage) ||
    left.packageRoot.localeCompare(right.packageRoot)
  );
}

function compareDiagnostics(left: CatalogDiagnostic, right: CatalogDiagnostic): number {
  return (
    left.severity.localeCompare(right.severity) ||
    left.code.localeCompare(right.code) ||
    left.message.localeCompare(right.message)
  );
}

function readJsonObject(filePath: string): Record<string, unknown> {
  const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8')) as unknown;
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new CatalogInventoryError('catalog.jsonObject', `Expected a JSON object in ${filePath}`, filePath);
  }
  return parsed as Record<string, unknown>;
}

function isWithin(parent: string, child: string): boolean {
  const relation = path.relative(path.resolve(parent), path.resolve(child));
  return relation === '' || (!relation.startsWith('..') && !path.isAbsolute(relation));
}

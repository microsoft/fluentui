import * as path from 'node:path';

import type {
  ApiRecord,
  ApiSymbol,
  BundledExportTarget,
  DependencyExportTarget,
  ExportRoute,
  GeneratorOptions,
  GeneratorResult,
  LoadedPackageCatalog,
  MetadataReader,
  PackageIndex,
  ResolvedExport,
  ValidationResult,
} from '@fluentui/api-metadata';

import type {
  CatalogInventory as SharedCatalogInventory,
  CatalogRoot,
  CatalogSelectionOptions,
} from './catalog-inventory';
import { CliError, normalizeDiagnostic, type CliCoverage, type CliDiagnostic, type CliStatus } from './diagnostics';
import { loadMetadataGenerator } from './metadata-generator';
import { formatPackageSpecifier, parsePackageSpecifier } from './package-inventory';
import { getApiImportIssue, isRouteFromRoot, preferredApiRoots, selectApiImport } from './api-import';
import type { ApiImportSelection } from './api-import';

export type MetadataMode = 'off' | 'prefer' | 'required';

export type { CatalogRoot, CatalogSelectionOptions } from './catalog-inventory';

export type CatalogInventory = Pick<SharedCatalogInventory, 'diagnostics' | 'roots' | 'workspaceRoot'> &
  Partial<Pick<SharedCatalogInventory, 'reader'>>;

export interface ApiQueryOptions extends CatalogSelectionOptions {
  symbol?: string;
  from?: string;
  entrypoint?: string;
  namespace?: 'type' | 'value';
}

function filterInventory(
  inventory: CatalogInventory,
  packageName: string | undefined,
  requestedOnly = false,
): CatalogInventory {
  if (!packageName) {
    return inventory;
  }
  return {
    ...inventory,
    roots: inventory.roots.filter(
      root => root.requestedPackage === packageName || (!requestedOnly && root.packageName === packageName),
    ),
  };
}

export interface ApiRouteSummary {
  package: string;
  requestedPackage: string;
  version: string;
  entrypoint: string;
  export: string;
  namespace: 'type' | 'value';
  exportKind: ExportRoute['exportKind'];
  typeOnly: boolean;
  conditions: string[];
  systems: string[];
  source: CatalogRoot['source'];
  metadata: boolean;
  command: string;
}

export interface ApiSymbolDetail extends ApiImportSelection {
  name: string;
  package: string;
  version: string;
  recordId?: string;
  symbol?: ApiSymbol;
  routes: ApiRouteSummary[];
  resolvedPackages: Array<{ package: string; version: string; packageRoot: string }>;
}

export interface ApiQueryResult {
  kind: 'index' | 'detail';
  workspaceRoot: string;
  data: ApiRouteSummary[] | ApiSymbolDetail;
  diagnostics: CliDiagnostic[];
  coverage: CliCoverage;
  status: CliStatus;
}

export interface DoctorRootResult {
  package: string;
  requestedPackage: string;
  version?: string;
  packageRoot: string;
  importer: string;
  systems: string[];
  source: CatalogRoot['source'];
  authority: 'metadata' | 'declarations' | 'unavailable';
  apiCoverage: string;
  recordsAdvertised: number;
  recordsChecked: number;
  status: CliStatus;
}

export interface DoctorResult {
  workspaceRoot: string;
  roots: DoctorRootResult[];
  diagnostics: CliDiagnostic[];
  coverage: CliCoverage;
  status: CliStatus;
}

interface CatalogSurface {
  root: CatalogRoot;
  index: PackageIndex;
  records?: ApiRecord[];
  reader?: MetadataReader;
  authority: 'metadata' | 'declarations';
}

export interface ApiQueryDependencies {
  getImportIssue(route: ApiRouteSummary, root: CatalogRoot): string | undefined;
  getInventory(options: CatalogSelectionOptions): CatalogInventory;
  generate(options: GeneratorOptions): Promise<GeneratorResult>;
  loadApiRecord(catalog: LoadedPackageCatalog, recordId: string): Promise<ApiRecord>;
  resolveExport(options: {
    package: string;
    importer: string;
    entrypoint: string;
    export: string;
    namespace: 'type' | 'value';
    conditions?: string[];
  }): Promise<ResolvedExport>;
  resolveInstalledPackage(
    requestedPackage: string,
    importer: string,
  ):
    | {
        packageName: string;
        requestedPackage: string;
        packageRoot: string;
        importer: string;
      }
    | undefined;
  validateCatalog(
    index: PackageIndex,
    records: ApiRecord[],
  ): ValidationResult<{ index: PackageIndex; records: ApiRecord[] }>;
}

export async function queryApi(
  input: ApiQueryOptions,
  dependencies: Partial<ApiQueryDependencies> = {},
): Promise<ApiQueryResult> {
  const options = normalizeApiSelection(input);
  const deps = createDependencies(dependencies);
  const selection = toSelection(options);
  const inventory = filterInventory(getInventory(deps, selection), selection.package, options.from !== undefined);
  const diagnostics = inventory.diagnostics.map(value => normalizeDiagnostic(value, 'CLI_CATALOG_DIAGNOSTIC'));
  const loaded = await loadSurfaces(
    inventory,
    selection.metadataMode ?? 'prefer',
    options.entrypoint,
    deps,
    diagnostics,
  );
  let surfaces = loaded.surfaces;
  let unavailableRoots = loaded.unavailableRoots;
  let coverage = createCoverage(inventory.roots.length, surfaces, unavailableRoots);
  if (inventory.roots.length === 0) {
    throw new CliError(
      'CLI_CATALOG_EMPTY',
      'No Fluent UI catalog roots matched the current selection.',
      1,
      diagnostics,
      undefined,
      coverage,
    );
  }
  if (selection.metadataMode === 'required' && loaded.unavailableRoots > 0) {
    throw new CliError(
      'CLI_METADATA_REQUIRED',
      'Authoritative metadata is unavailable for one or more selected roots.',
      1,
      diagnostics,
      { unavailableRoots: loaded.unavailableRoots },
      coverage,
    );
  }
  if (loaded.surfaces.length === 0) {
    throw new CliError(
      selection.metadataMode === 'required' ? 'CLI_METADATA_REQUIRED' : 'CLI_CATALOG_UNAVAILABLE',
      selection.metadataMode === 'required'
        ? 'Authoritative metadata is unavailable for every selected root.'
        : 'No selected catalog could provide metadata or declaration fallback.',
      1,
      diagnostics,
      undefined,
      coverage,
    );
  }
  let routes = surfaces.flatMap(surface => createRouteSummaries(surface, options)).sort(compareRoutes);

  if (!options.symbol) {
    return {
      kind: 'index',
      workspaceRoot: inventory.workspaceRoot,
      data: routes,
      diagnostics,
      coverage,
      status: coverage.status,
    };
  }

  const publicRoots = preferredApiRoots(inventory.roots, options);
  const hasPublicRoute = routes.some(route => publicRoots.some(root => isRouteFromRoot(route, root)));
  if (!hasPublicRoute && selection.metadataMode !== 'off') {
    const metadataGaps = surfaces.filter(
      surface =>
        publicRoots.includes(surface.root) && surface.authority === 'metadata' && hasRequestedApiGap(surface.index),
    );
    if (metadataGaps.length > 0) {
      if (selection.metadataMode === 'required' && routes.length === 0) {
        throw new CliError(
          'CLI_METADATA_REQUESTED_BINDING_UNAVAILABLE',
          `The selected partial metadata does not cover ${options.entrypoint ?? 'all package entrypoints'} for ${
            options.symbol
          }.`,
          1,
          [
            ...diagnostics,
            {
              code: 'CLI_METADATA_REQUESTED_BINDING_UNAVAILABLE',
              severity: 'error',
              message: 'Required metadata cannot prove whether the requested binding is exported.',
              hint: 'Regenerate the package catalog for the requested entrypoint or use --metadata-mode prefer.',
            },
          ],
          { symbol: options.symbol, entrypoint: options.entrypoint },
          coverage,
        );
      }

      const fallback =
        selection.metadataMode === 'required'
          ? { surfaces: [], failures: 0 }
          : await loadRequestedBindingFallback(metadataGaps, options.entrypoint, deps, diagnostics);
      surfaces = [...surfaces, ...fallback.surfaces];
      unavailableRoots += fallback.failures;
      coverage = createCoverage(inventory.roots.length, surfaces, unavailableRoots);
      routes = surfaces.flatMap(surface => createRouteSummaries(surface, options)).sort(compareRoutes);
      if (routes.length === 0 && fallback.failures > 0) {
        throw new CliError(
          'CLI_METADATA_REQUESTED_BINDING_UNAVAILABLE',
          `Metadata and declaration fallback could not evaluate ${options.symbol}.`,
          1,
          diagnostics,
          { symbol: options.symbol, entrypoint: options.entrypoint },
          coverage,
        );
      }
    }
  }

  if (routes.length === 0) {
    throw new CliError(
      'CLI_API_NOT_FOUND',
      `No selected package exports ${options.symbol}${options.entrypoint ? ` from ${options.entrypoint}` : ''}.`,
      2,
      diagnostics,
      {
        symbol: options.symbol,
        entrypoint: options.entrypoint,
      },
      coverage,
    );
  }

  const resolutions = await Promise.all(routes.map(route => resolveRouteDetail(route, surfaces, deps, diagnostics)));
  const definitions = new Map<string, (typeof resolutions)[number]>();
  for (const resolution of resolutions) {
    const current = definitions.get(resolution.definitionKey);
    if (current) {
      current.routes.push(...resolution.routes);
    } else {
      definitions.set(resolution.definitionKey, resolution);
    }
  }

  const publicDefinitions = [...definitions.values()].filter(definition =>
    definition.routes.some(route => publicRoots.some(root => isRouteFromRoot(route, root))),
  );
  const selectedDefinitions = publicDefinitions.length ? publicDefinitions : [...definitions.values()];
  if (selectedDefinitions.length > 1) {
    const narrowingCommands = createMinimalNarrowingCommands(options.symbol, selectedDefinitions, options);
    const unresolvedCount = selectedDefinitions.length - narrowingCommands.length;
    throw new CliError(
      'CLI_API_AMBIGUOUS',
      `${options.symbol} resolves to ${selectedDefinitions.length} distinct selected API definitions.`,
      2,
      [
        ...diagnostics,
        {
          code: 'CLI_API_AMBIGUOUS',
          severity: 'error',
          message: 'More than one API matches this name.',
          hint: [
            ...(narrowingCommands.length ? [`Choose one:\n${narrowingCommands.join('\n')}`] : []),
            ...(unresolvedCount
              ? [
                  `${unresolvedCount} definitions cannot be isolated with the available selectors. Inspect catalog configuration and declaration conditions; repeating those lookups with the same import path will remain ambiguous.`,
                ]
              : []),
          ].join('\n'),
        },
      ],
      { symbol: options.symbol, narrowingCommands },
      coverage,
    );
  }

  const resolved = selectedDefinitions[0];
  const { issue, ...importSelection } = selectApiImport(
    resolved.routes,
    inventory.roots,
    options,
    resolved.symbol,
    deps.getImportIssue,
  );
  if (issue) {
    diagnostics.push({
      code: importSelection.importStatus === 'ambiguous' ? 'CLI_API_IMPORT_AMBIGUOUS' : 'CLI_API_IMPORT_UNAVAILABLE',
      severity: 'warning',
      message: issue,
      ...(importSelection.importCandidates.length
        ? {
            hint: importSelection.importCandidates
              .map(candidate =>
                formatApiCommand(
                  options.symbol!,
                  { from: candidate.moduleSpecifier, namespace: options.namespace, system: options.system },
                  options,
                ),
              )
              .join('\n'),
          }
        : {}),
    });
  }
  const hasIncompleteDiagnostics = diagnostics.some(
    diagnostic => diagnostic.severity === 'warning' || diagnostic.severity === 'error',
  );
  const status: CliStatus =
    coverage.status === 'unavailable'
      ? 'unavailable'
      : !resolved.symbol || hasIncompleteDiagnostics
      ? 'partial'
      : coverage.status;
  return {
    kind: 'detail',
    workspaceRoot: inventory.workspaceRoot,
    data: {
      ...importSelection,
      name: options.symbol,
      package: resolved.package,
      version: resolved.version,
      recordId: resolved.recordId,
      symbol: resolved.symbol,
      routes: uniqueRoutes(resolved.routes).sort(compareRoutes),
      resolvedPackages: resolved.resolvedPackages,
    },
    diagnostics,
    coverage: { ...coverage, status },
    status,
  };
}

export async function inspectCatalogs(
  options: CatalogSelectionOptions & { deep?: boolean },
  dependencies: Partial<ApiQueryDependencies> = {},
): Promise<DoctorResult> {
  const deps = createDependencies(dependencies);
  const selection = toSelection(options);
  const inventory = filterInventory(getInventory(deps, selection), selection.package);
  const diagnostics = inventory.diagnostics.map(value => normalizeDiagnostic(value, 'CLI_CATALOG_DIAGNOSTIC'));
  const metadataMode = options.metadataMode ?? 'prefer';
  const loaded = await loadSurfaces(inventory, metadataMode, undefined, deps, diagnostics);
  const surfaces = new Map(loaded.surfaces.map(surface => [surface.root.packageRoot, surface]));
  const roots: DoctorRootResult[] = [];

  for (const root of inventory.roots) {
    const surface = surfaces.get(root.packageRoot);
    if (!surface) {
      roots.push({
        package: root.packageName,
        requestedPackage: root.requestedPackage,
        packageRoot: root.packageRoot,
        importer: root.importer,
        systems: root.systems,
        source: root.source,
        authority: 'unavailable',
        apiCoverage: 'unavailable',
        recordsAdvertised: 0,
        recordsChecked: 0,
        status: 'unavailable',
      });
      continue;
    }

    let recordsChecked = 0;
    let rootStatus: CliStatus = surface.index.completeness.api.status;
    if (options.deep) {
      if (surface.authority === 'declarations') {
        recordsChecked = surface.records?.length ?? 0;
      } else if (root.catalog) {
        const records: ApiRecord[] = [];
        for (const descriptor of surface.index.records.filter(record => record.kind === 'api')) {
          try {
            records.push(
              surface.reader
                ? surface.reader.loadApiRecord(root.catalog, descriptor.id)
                : await deps.loadApiRecord(root.catalog, descriptor.id),
            );
            recordsChecked++;
          } catch (error) {
            rootStatus = 'unavailable';
            diagnostics.push(toErrorDiagnostic(error, root.packageName, 'CLI_DOCTOR_RECORD_INVALID'));
          }
        }
        const validation = deps.validateCatalog(surface.index, records);
        if (!validation.valid) {
          rootStatus = 'unavailable';
          diagnostics.push(
            ...validation.diagnostics.map(diagnostic => ({
              code: diagnostic.code,
              severity: 'error' as const,
              message: diagnostic.message,
              path: diagnostic.path,
              package: root.packageName,
            })),
          );
        }
      }
    }

    roots.push({
      package: surface.index.package.name,
      requestedPackage: root.requestedPackage,
      version: surface.index.package.version,
      packageRoot: root.packageRoot,
      importer: root.importer,
      systems: root.systems,
      source: root.source,
      authority: surface.authority,
      apiCoverage: surface.index.completeness.api.status,
      recordsAdvertised: surface.index.records.filter(record => record.kind === 'api').length,
      recordsChecked,
      status: rootStatus,
    });
  }

  const coverage = createCoverage(inventory.roots.length, loaded.surfaces, loaded.unavailableRoots);
  const status: CliStatus =
    roots.some(root => root.status === 'unavailable') || diagnostics.some(diagnostic => diagnostic.severity === 'error')
      ? 'unavailable'
      : roots.some(root => root.status === 'partial') ||
        diagnostics.some(diagnostic => diagnostic.severity === 'warning')
      ? 'partial'
      : coverage.status;
  return {
    workspaceRoot: inventory.workspaceRoot,
    roots,
    diagnostics,
    coverage: { ...coverage, status },
    status,
  };
}

function createDependencies(overrides: Partial<ApiQueryDependencies>): ApiQueryDependencies {
  return {
    getImportIssue: overrides.getImportIssue ?? getApiImportIssue,
    getInventory:
      overrides.getInventory ??
      (options => {
        const inventory = require('./catalog-inventory') as {
          getCatalogInventory(selection: CatalogSelectionOptions): CatalogInventory;
        };
        return inventory.getCatalogInventory(options);
      }),
    generate:
      overrides.generate ??
      (async options => {
        const { generateApiMetadata } = loadMetadataGenerator();
        return generateApiMetadata(options);
      }),
    loadApiRecord:
      overrides.loadApiRecord ??
      (async (catalog, recordId) => {
        const { MetadataLoader } = await import('@fluentui/api-metadata');
        return new MetadataLoader().loadApiRecord(catalog, recordId);
      }),
    resolveExport:
      overrides.resolveExport ??
      (async options => {
        const { createMetadataReader } = await import('@fluentui/api-metadata');
        return createMetadataReader().resolveExport(options);
      }),
    resolveInstalledPackage:
      overrides.resolveInstalledPackage ??
      ((requestedPackage, importer) => {
        const inventory = require('./package-inventory') as {
          resolveInstalledPackage(
            requested: string,
            context: string,
          ):
            | {
                packageName: string;
                requestedPackage: string;
                packageRoot: string;
                importer: string;
              }
            | undefined;
        };
        return inventory.resolveInstalledPackage(requestedPackage, importer);
      }),
    validateCatalog:
      overrides.validateCatalog ??
      ((index, records) => {
        const metadata = require('@fluentui/api-metadata') as {
          validateCatalog(
            packageIndex: PackageIndex,
            apiRecords: ApiRecord[],
          ): ValidationResult<{ index: PackageIndex; records: ApiRecord[] }>;
        };
        return metadata.validateCatalog(index, records);
      }),
  };
}

function getInventory(deps: ApiQueryDependencies, selection: CatalogSelectionOptions): CatalogInventory {
  try {
    return deps.getInventory(selection);
  } catch (error) {
    const code =
      error instanceof Error && 'code' in error && typeof (error as Error & { code?: unknown }).code === 'string'
        ? (error as Error & { code: string }).code
        : 'CLI_CATALOG_SELECTION';
    throw new CliError(code, error instanceof Error ? error.message : String(error), 2);
  }
}

async function loadSurfaces(
  inventory: CatalogInventory,
  metadataMode: MetadataMode,
  entrypoint: string | undefined,
  deps: ApiQueryDependencies,
  diagnostics: CliDiagnostic[],
): Promise<{ surfaces: CatalogSurface[]; unavailableRoots: number }> {
  const surfaces: CatalogSurface[] = [];
  let unavailableRoots = 0;

  for (const root of inventory.roots) {
    if (metadataMode !== 'off' && root.catalog) {
      surfaces.push({ root, index: root.catalog.index, reader: inventory.reader, authority: 'metadata' });
      continue;
    }

    if (metadataMode === 'required') {
      unavailableRoots++;
      diagnostics.push({
        code: 'CLI_METADATA_REQUIRED',
        severity: 'error',
        message: `Authoritative metadata is required but unavailable for ${root.packageName}.`,
        package: root.packageName,
      });
      continue;
    }

    try {
      const generated = await deps.generate({
        packageRoot: path.resolve(root.packageRoot),
        packageName: root.source === 'local' ? undefined : root.packageName,
        entrypoints: entrypoint ? [entrypoint] : undefined,
      });
      surfaces.push({
        root,
        index: generated.index,
        records: generated.records,
        authority: 'declarations',
      });
      diagnostics.push({
        code: metadataMode === 'off' ? 'CLI_METADATA_BYPASSED' : 'CLI_METADATA_DECLARATION_FALLBACK',
        severity: metadataMode === 'off' ? 'info' : 'warning',
        message:
          metadataMode === 'off'
            ? `Generated the selected API view from installed declarations for ${root.packageName}.`
            : `Metadata was unavailable; generated the selected API view from installed declarations for ${root.packageName}.`,
        package: root.packageName,
      });
    } catch (error) {
      unavailableRoots++;
      diagnostics.push(toErrorDiagnostic(error, root.packageName, 'CLI_DECLARATION_FALLBACK_FAILED'));
    }
  }

  return { surfaces, unavailableRoots };
}

async function loadRequestedBindingFallback(
  metadataGaps: readonly CatalogSurface[],
  entrypoint: string | undefined,
  deps: ApiQueryDependencies,
  diagnostics: CliDiagnostic[],
): Promise<{ surfaces: CatalogSurface[]; failures: number }> {
  const surfaces: CatalogSurface[] = [];
  let failures = 0;
  for (const surface of metadataGaps) {
    try {
      const generated = await deps.generate({
        packageRoot: path.resolve(surface.root.packageRoot),
        packageName: surface.root.source === 'local' ? undefined : surface.root.packageName,
        entrypoints: entrypoint ? [entrypoint] : undefined,
      });
      surfaces.push({
        root: surface.root,
        index: generated.index,
        records: generated.records,
        authority: 'declarations',
      });
      diagnostics.push({
        code: 'CLI_METADATA_REQUESTED_BINDING_FALLBACK',
        severity: 'warning',
        message: `Partial metadata omitted the requested ${
          entrypoint ?? 'package API'
        }; generated only the requested installed package view from declarations.`,
        package: surface.root.packageName,
      });
    } catch (error) {
      failures++;
      diagnostics.push(toErrorDiagnostic(error, surface.root.packageName, 'CLI_DECLARATION_FALLBACK_FAILED'));
    }
  }
  return { surfaces, failures };
}

function hasRequestedApiGap(index: PackageIndex): boolean {
  return index.completeness.api.status !== 'complete' || index.capabilities.api.status !== 'supported';
}

function createRouteSummaries(surface: CatalogSurface, options: ApiQueryOptions): ApiRouteSummary[] {
  const { symbol, entrypoint, namespace } = options;
  const spaces = new Map<string, Set<string>>();
  for (const route of surface.index.exports) {
    const key = `${route.entrypoint}\0${route.export}`;
    const values = spaces.get(key) ?? new Set<string>();
    values.add(route.namespace);
    spaces.set(key, values);
  }
  return surface.index.exports
    .filter(route => !symbol || route.export === symbol)
    .filter(route => !entrypoint || route.entrypoint === entrypoint)
    .filter(route => !namespace || route.namespace === namespace)
    .map(route => ({
      package: surface.index.package.name,
      requestedPackage: surface.root.requestedPackage,
      version: surface.index.package.version,
      entrypoint: route.entrypoint,
      export: route.export,
      namespace: route.namespace,
      exportKind: route.exportKind,
      typeOnly: route.typeOnly,
      conditions: route.conditions,
      systems: surface.root.systems,
      source: surface.root.source,
      metadata: surface.authority === 'metadata',
      command: formatApiCommand(
        route.export,
        {
          from: formatPackageSpecifier(surface.root.requestedPackage, route.entrypoint),
          namespace: (spaces.get(`${route.entrypoint}\0${route.export}`)?.size ?? 0) > 1 ? route.namespace : undefined,
          system: options.system,
        },
        options,
      ),
    }));
}

async function resolveRouteDetail(
  route: ApiRouteSummary,
  surfaces: readonly CatalogSurface[],
  deps: ApiQueryDependencies,
  diagnostics: CliDiagnostic[],
): Promise<{
  definitionKey: string;
  package: string;
  version: string;
  recordId?: string;
  symbol?: ApiSymbol;
  routes: ApiRouteSummary[];
  resolvedPackages: Array<{ package: string; version: string; packageRoot: string }>;
}> {
  const surface = surfaces.find(
    candidate =>
      candidate.root.requestedPackage === route.requestedPackage &&
      candidate.index.package.name === route.package &&
      candidate.root.systems === route.systems &&
      candidate.authority === (route.metadata ? 'metadata' : 'declarations'),
  );
  if (!surface) {
    throw new CliError('CLI_API_INTERNAL', `Unable to associate the selected route for ${route.export}.`);
  }
  const indexRoute = surface.index.exports.find(
    candidate =>
      candidate.entrypoint === route.entrypoint &&
      candidate.export === route.export &&
      candidate.namespace === route.namespace &&
      arraysEqual(candidate.conditions, route.conditions),
  );
  if (!indexRoute) {
    throw new CliError('CLI_API_INTERNAL', `Unable to locate the selected route for ${route.export}.`);
  }

  if (surface.authority === 'metadata' && surface.root.catalog) {
    try {
      const resolveOptions = {
        package: surface.root.requestedPackage,
        importer: surface.root.importer,
        entrypoint: route.entrypoint,
        export: route.export,
        namespace: route.namespace,
        conditions: route.conditions,
      };
      const result = surface.reader
        ? surface.reader.resolveExport(resolveOptions)
        : await deps.resolveExport(resolveOptions);
      diagnostics.push(...result.diagnostics.map(value => normalizeDiagnostic(value, 'CLI_METADATA_READER')));
      if (result.definition) {
        const definition = result.definition;
        const resolvedPackages = new Map(
          result.routes.map(item => [
            item.catalog.instance.identity,
            {
              package: item.catalog.instance.package.name,
              version: item.catalog.instance.package.version,
              packageRoot: item.catalog.instance.packageRoot,
            },
          ]),
        );
        resolvedPackages.set(definition.owner.identity, {
          package: definition.owner.package.name,
          version: definition.owner.package.version,
          packageRoot: definition.owner.packageRoot,
        });
        return {
          definitionKey: `${definition.owner.identity}\0${definition.symbol.id}`,
          package: definition.owner.package.name,
          version: definition.owner.package.version,
          recordId: definition.record.recordId,
          symbol: definition.symbol,
          routes: [route],
          resolvedPackages: [...resolvedPackages.values()],
        };
      }
    } catch (error) {
      diagnostics.push(toErrorDiagnostic(error, route.package, 'CLI_METADATA_ROUTE_FALLBACK'));
    }
  }

  if (indexRoute.target.kind === 'local') {
    const target = indexRoute.target;
    try {
      const record =
        surface.authority === 'metadata' && surface.root.catalog
          ? surface.reader
            ? surface.reader.loadApiRecord(surface.root.catalog, target.record)
            : await deps.loadApiRecord(surface.root.catalog, target.record)
          : surface.records?.find(candidate => candidate.recordId === target.record);
      const symbol = record?.symbols.find(candidate => candidate.id === target.symbol);
      if (record && symbol) {
        return {
          definitionKey: `${surface.root.packageRoot}\0${symbol.id}`,
          package: surface.index.package.name,
          version: surface.index.package.version,
          recordId: record.recordId,
          symbol,
          routes: [route],
          resolvedPackages: [
            {
              package: surface.index.package.name,
              version: surface.index.package.version,
              packageRoot: surface.root.packageRoot,
            },
          ],
        };
      }
    } catch (error) {
      diagnostics.push(toErrorDiagnostic(error, route.package, 'CLI_API_DETAIL_UNAVAILABLE'));
    }
  }

  if (indexRoute.target.kind === 'bundled') {
    const bundled = resolveBundledDeclarationTarget(indexRoute.target, surface, route, deps, diagnostics);
    if (bundled) {
      return bundled;
    }
  }

  if (indexRoute.target.kind === 'dependency') {
    const dependency = await resolveDeclarationDependency(
      indexRoute.target,
      surface,
      route,
      deps,
      diagnostics,
      new Set(),
      0,
    );
    if (dependency) {
      return dependency;
    }
  }

  diagnostics.push({
    code: 'CLI_API_DETAIL_UNAVAILABLE',
    severity: 'warning',
    message: `The route for ${route.export} is known, but its defining API detail could not be loaded.`,
    package: route.package,
  });
  return {
    definitionKey: `${surface.root.packageRoot}\0${route.entrypoint}\0${route.export}\0${route.namespace}`,
    package: surface.index.package.name,
    version: surface.index.package.version,
    routes: [route],
    resolvedPackages: [
      {
        package: surface.index.package.name,
        version: surface.index.package.version,
        packageRoot: surface.root.packageRoot,
      },
    ],
  };
}

async function resolveDeclarationDependency(
  target: DependencyExportTarget,
  parentSurface: CatalogSurface,
  requestedRoute: ApiRouteSummary,
  deps: ApiQueryDependencies,
  diagnostics: CliDiagnostic[],
  visited: Set<string>,
  depth: number,
): Promise<{
  definitionKey: string;
  package: string;
  version: string;
  recordId?: string;
  symbol?: ApiSymbol;
  routes: ApiRouteSummary[];
  resolvedPackages: Array<{ package: string; version: string; packageRoot: string }>;
} | null> {
  if (depth > 16) {
    diagnostics.push({
      code: 'CLI_DECLARATION_REFERENCE_DEPTH',
      severity: 'error',
      message: `Declaration fallback exceeded the dependency reference depth for ${requestedRoute.export}.`,
      package: parentSurface.index.package.name,
    });
    return null;
  }
  const requestedPackage = target.requested ?? target.package;
  const dependency = deps.resolveInstalledPackage(requestedPackage, parentSurface.root.packageRoot);
  if (!dependency) {
    diagnostics.push({
      code: 'CLI_DECLARATION_DEPENDENCY_NOT_FOUND',
      severity: 'error',
      message: `Unable to resolve ${requestedPackage} from ${parentSurface.root.packageRoot}.`,
      package: parentSurface.index.package.name,
    });
    return null;
  }
  const key = `${dependency.packageRoot}\0${target.entrypoint}\0${target.export}\0${target.namespace}`;
  if (visited.has(key)) {
    diagnostics.push({
      code: 'CLI_DECLARATION_REFERENCE_CYCLE',
      severity: 'error',
      message: `Declaration fallback encountered a dependency route cycle at ${target.package}.`,
      package: target.package,
    });
    return null;
  }
  visited.add(key);

  try {
    const generated = await deps.generate({
      packageRoot: dependency.packageRoot,
      packageName: target.package,
      entrypoints: [target.entrypoint],
    });
    const route = generated.index.exports.find(
      candidate =>
        candidate.entrypoint === target.entrypoint &&
        candidate.export === target.export &&
        candidate.namespace === target.namespace,
    );
    if (!route) {
      diagnostics.push({
        code: 'CLI_DECLARATION_DEPENDENCY_ROUTE_NOT_FOUND',
        severity: 'error',
        message: `${target.package} does not declare ${target.export} from ${target.entrypoint}.`,
        package: target.package,
      });
      return null;
    }
    const resolvedPackages = [
      {
        package: parentSurface.index.package.name,
        version: parentSurface.index.package.version,
        packageRoot: parentSurface.root.packageRoot,
      },
      {
        package: generated.index.package.name,
        version: generated.index.package.version,
        packageRoot: dependency.packageRoot,
      },
    ];

    if (route.target.kind === 'local') {
      const localTarget = route.target;
      const record = generated.records.find(candidate => candidate.recordId === localTarget.record);
      const symbol = record?.symbols.find(candidate => candidate.id === localTarget.symbol);
      if (!record || !symbol) {
        diagnostics.push({
          code: 'CLI_DECLARATION_DEPENDENCY_DETAIL_UNAVAILABLE',
          severity: 'error',
          message: `${target.package} declared ${target.export}, but generated detail was unavailable.`,
          package: target.package,
        });
        return null;
      }
      return {
        definitionKey: `${dependency.packageRoot}\0${symbol.id}`,
        package: generated.index.package.name,
        version: generated.index.package.version,
        recordId: record.recordId,
        symbol,
        routes: [requestedRoute],
        resolvedPackages,
      };
    }

    const dependencySurface: CatalogSurface = {
      root: {
        packageName: generated.index.package.name,
        requestedPackage,
        packageRoot: dependency.packageRoot,
        importer: dependency.importer,
        systems: parentSurface.root.systems,
        source: parentSurface.root.source,
      },
      index: generated.index,
      records: generated.records,
      authority: 'declarations',
    };
    if (route.target.kind === 'bundled') {
      const bundled = resolveBundledDeclarationTarget(
        route.target,
        dependencySurface,
        requestedRoute,
        deps,
        diagnostics,
      );
      if (bundled) {
        bundled.resolvedPackages = uniqueResolvedPackages([...resolvedPackages, ...bundled.resolvedPackages]);
      }
      return bundled;
    }

    const nestedTarget = route.target;
    if (nestedTarget.kind !== 'dependency') {
      return null;
    }
    const nested = await resolveDeclarationDependency(
      nestedTarget,
      dependencySurface,
      requestedRoute,
      deps,
      diagnostics,
      visited,
      depth + 1,
    );
    if (nested) {
      nested.resolvedPackages = uniqueResolvedPackages([...resolvedPackages, ...nested.resolvedPackages]);
    }
    return nested;
  } catch (error) {
    diagnostics.push(toErrorDiagnostic(error, target.package, 'CLI_DECLARATION_DEPENDENCY_FAILED'));
    return null;
  }
}

function resolveBundledDeclarationTarget(
  target: BundledExportTarget,
  surface: CatalogSurface,
  requestedRoute: ApiRouteSummary,
  deps: ApiQueryDependencies,
  diagnostics: CliDiagnostic[],
): {
  definitionKey: string;
  package: string;
  version: string;
  recordId: string;
  symbol: ApiSymbol;
  routes: ApiRouteSummary[];
  resolvedPackages: Array<{ package: string; version: string; packageRoot: string }>;
} | null {
  const descriptor = surface.index.records.find(candidate => candidate.id === target.record);
  const record = surface.records?.find(candidate => candidate.recordId === target.record);
  const symbol = record?.symbols.find(candidate => candidate.id === target.symbol);
  if (!descriptor?.source || !record || !symbol) {
    diagnostics.push({
      code: 'CLI_DECLARATION_BUNDLED_DETAIL_UNAVAILABLE',
      severity: 'error',
      message: `Bundled declaration detail for ${requestedRoute.export} is unavailable.`,
      package: surface.index.package.name,
    });
    return null;
  }

  let importer = surface.root.packageRoot;
  const resolvedPackages = [
    {
      package: surface.index.package.name,
      version: surface.index.package.version,
      packageRoot: surface.root.packageRoot,
    },
  ];
  for (const source of descriptor.source.packages) {
    const installed = deps.resolveInstalledPackage(source.requested, importer);
    if (!installed || installed.packageName !== source.package.name) {
      diagnostics.push({
        code: 'CLI_DECLARATION_BUNDLED_PACKAGE_UNAVAILABLE',
        severity: 'error',
        message: `Unable to resolve bundled definition package ${source.package.name} for ${requestedRoute.export}.`,
        package: surface.index.package.name,
      });
      return null;
    }
    importer = installed.packageRoot;
    resolvedPackages.push({
      package: source.package.name,
      version: source.package.version,
      packageRoot: installed.packageRoot,
    });
  }

  return {
    definitionKey: `${importer}\0${symbol.id}`,
    package: record.package.name,
    version: record.package.version,
    recordId: record.recordId,
    symbol,
    routes: [requestedRoute],
    resolvedPackages: uniqueResolvedPackages(resolvedPackages),
  };
}

function uniqueResolvedPackages(
  packages: Array<{ package: string; version: string; packageRoot: string }>,
): Array<{ package: string; version: string; packageRoot: string }> {
  const unique = new Map<string, (typeof packages)[number]>();
  for (const packageInstance of packages) {
    unique.set(packageInstance.packageRoot, packageInstance);
  }
  return [...unique.values()];
}

function createCoverage(
  selectedRoots: number,
  surfaces: readonly CatalogSurface[],
  unavailableRoots: number,
): CliCoverage {
  const metadataRootKeys = new Set(
    surfaces.filter(surface => surface.authority === 'metadata').map(surface => surface.root.packageRoot),
  );
  const declarationFallbackRootKeys = new Set(
    surfaces.filter(surface => surface.authority === 'declarations').map(surface => surface.root.packageRoot),
  );
  const metadataRoots = metadataRootKeys.size;
  const declarationFallbackRoots = declarationFallbackRootKeys.size;
  const partial = surfaces.some(surface => surface.index.completeness.api.status !== 'complete');
  const status: CliStatus =
    selectedRoots === 0
      ? 'unavailable'
      : unavailableRoots > 0 && surfaces.length === 0
      ? 'unavailable'
      : unavailableRoots > 0 || declarationFallbackRoots > 0 || partial
      ? 'partial'
      : 'complete';
  return {
    status,
    selectedRoots,
    metadataRoots,
    declarationFallbackRoots,
    unavailableRoots,
  };
}

function normalizeApiSelection(options: ApiQueryOptions): ApiQueryOptions {
  if (options.from === undefined) {
    return options;
  }
  if (options.package !== undefined || options.entrypoint !== undefined) {
    throw new CliError('CLI_API_SELECTION_CONFLICT', 'Use --from on its own, not with --package or --entrypoint.', 2);
  }
  const parsed = typeof options.from === 'string' ? parsePackageSpecifier(options.from) : undefined;
  const segments = parsed?.entrypoint === '.' ? [] : parsed?.entrypoint.slice(2).split('/');
  if (
    !parsed ||
    /[\\\s?#\0]/.test(options.from) ||
    segments?.some(segment => !segment || segment === '.' || segment === '..' || segment.includes('*'))
  ) {
    throw new CliError(
      'CLI_API_FROM_INVALID',
      'Expected an npm import path for --from, such as @fluentui/react-components or @fluentui/react-headless-components-preview/button.',
      2,
    );
  }
  return { ...options, package: parsed.packageName, entrypoint: parsed.entrypoint };
}

type ApiSelection = Pick<ApiQueryOptions, 'from' | 'package' | 'entrypoint' | 'namespace' | 'system'>;

function createMinimalNarrowingCommands(
  symbol: string,
  definitions: readonly { routes: readonly ApiRouteSummary[] }[],
  options: ApiQueryOptions,
): string[] {
  const base: ApiSelection = {
    system: options.system,
    namespace: options.namespace,
    ...(options.from ? { from: options.from } : { package: options.package, entrypoint: options.entrypoint }),
  };
  return definitions.flatMap(definition => {
    const candidates: ApiSelection[] = [];
    for (const route of definition.routes) {
      const from = formatPackageSpecifier(route.requestedPackage, route.entrypoint);
      for (const system of [undefined, ...route.systems]) {
        for (const selectFrom of [false, true]) {
          for (const selectNamespace of [false, true]) {
            const candidate: ApiSelection = {
              ...base,
              ...(system ? { system: [system] } : {}),
              ...(selectFrom ? { from, package: undefined, entrypoint: undefined } : {}),
              ...(selectNamespace ? { namespace: route.namespace } : {}),
            };
            if (system && (candidate.from || candidate.package)) {
              continue;
            }
            const matches = definitions.filter(value =>
              value.routes.some(item => matchesApiSelection(item, candidate)),
            );
            if (matches.length === 1 && matches[0] === definition) {
              candidates.push(candidate);
            }
          }
        }
      }
    }
    candidates.sort(
      (left, right) =>
        selectionSize(left) - selectionSize(right) ||
        Number(Boolean(left.namespace)) - Number(Boolean(right.namespace)) ||
        Number(Boolean(left.from)) - Number(Boolean(right.from)) ||
        JSON.stringify(left).localeCompare(JSON.stringify(right)),
    );
    const chosen = candidates[0];
    return chosen ? [formatApiCommand(symbol, chosen, options)] : [];
  });
}

function matchesApiSelection(route: ApiRouteSummary, selection: ApiSelection): boolean {
  if (selection.from && selection.from !== formatPackageSpecifier(route.requestedPackage, route.entrypoint)) {
    return false;
  }
  if (selection.package && selection.package !== route.requestedPackage && selection.package !== route.package) {
    return false;
  }
  if (selection.entrypoint && selection.entrypoint !== route.entrypoint) {
    return false;
  }
  if (selection.namespace && selection.namespace !== route.namespace) {
    return false;
  }
  // Explicit packages are also discovered outside the selected system's preset roots.
  return Boolean(
    selection.from ||
      selection.package ||
      !selection.system?.length ||
      selection.system.some(system => route.systems.includes(system)),
  );
}

function selectionSize(selection: ApiSelection): number {
  return (
    Number(Boolean(selection.from)) +
    Number(Boolean(selection.package)) +
    Number(Boolean(selection.entrypoint)) +
    Number(Boolean(selection.namespace)) +
    Number(Boolean(selection.system?.length))
  );
}

function formatApiCommand(symbol: string, selection: ApiSelection, context: ApiQueryOptions = {}): string {
  const args = ['fluentui-cli api', quote(symbol)];
  const flags: Array<[string, string | undefined]> = [
    ['--cwd', context.cwd],
    ['--config', context.config],
    ['--metadata-mode', context.metadataMode && context.metadataMode !== 'prefer' ? context.metadataMode : undefined],
    ['--from', selection.from],
    ['--package', selection.from ? undefined : selection.package],
    ['--entrypoint', selection.from ? undefined : selection.entrypoint],
    ['--namespace', selection.namespace],
  ];
  for (const [flag, value] of flags) {
    if (value !== undefined) {
      args.push(flag, quote(value));
    }
  }
  for (const system of selection.system ?? []) {
    args.push('--system', quote(system));
  }
  return args.join(' ');
}

function quote(value: string): string {
  return /^[A-Za-z0-9_@./:-]+$/.test(value) ? value : `'${value.replace(/'/g, "'\\''")}'`;
}

function uniqueRoutes(routes: readonly ApiRouteSummary[]): ApiRouteSummary[] {
  const values = new Map<string, ApiRouteSummary>();
  for (const route of routes) {
    values.set(
      `${route.requestedPackage}\0${route.package}\0${route.entrypoint}\0${route.export}\0${
        route.namespace
      }\0${route.conditions.join(',')}`,
      route,
    );
  }
  return [...values.values()];
}

function compareRoutes(left: ApiRouteSummary, right: ApiRouteSummary): number {
  return (
    left.export.localeCompare(right.export) ||
    left.package.localeCompare(right.package) ||
    left.entrypoint.localeCompare(right.entrypoint) ||
    left.namespace.localeCompare(right.namespace) ||
    left.conditions.join(',').localeCompare(right.conditions.join(','))
  );
}

function arraysEqual(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function toSelection(options: CatalogSelectionOptions): CatalogSelectionOptions {
  return {
    cwd: options.cwd ? path.resolve(options.cwd) : process.cwd(),
    config: options.config ? path.resolve(options.config) : undefined,
    system: options.system,
    package: options.package,
    metadataMode: options.metadataMode ?? 'prefer',
  };
}

function toErrorDiagnostic(error: unknown, packageName: string, code: string): CliDiagnostic {
  if (error instanceof CliError) {
    return {
      code: error.code,
      severity: 'error',
      message: error.message,
      package: packageName,
    };
  }
  if (error instanceof Error) {
    const errorCode =
      'code' in error && typeof (error as Error & { code?: unknown }).code === 'string'
        ? (error as Error & { code: string }).code
        : code;
    return {
      code: errorCode,
      severity: 'error',
      message: error.message,
      package: packageName,
    };
  }
  return {
    code,
    severity: 'error',
    message: String(error),
    package: packageName,
  };
}

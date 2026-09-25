import type { ApiRecord, ApiSymbol, ExportRoute, MetadataNamespace } from './types';
import {
  MetadataLoader,
  MetadataReaderError,
  type DependencyVerificationIssue,
  type LoadedPackageCatalog,
  type MetadataCatalogRegistration,
  type MetadataLoaderOptions,
  type MetadataReaderStats,
  type ReaderOperation,
  type ResolvedDefinitionOwner,
} from './load';

const SUPPORTED_ROUTE_CONDITIONS = new Set(['types', 'import', 'require', 'node', 'default']);

export interface ResolveExportOptions {
  package: string;
  importer: string;
  entrypoint: string;
  export: string;
  namespace: MetadataNamespace;
  conditions?: string[];
}

export interface ResolvedRoute {
  catalog: LoadedPackageCatalog;
  route: ExportRoute;
}

export interface ResolvedDefinition {
  catalog: LoadedPackageCatalog;
  owner: ResolvedDefinitionOwner;
  record: ApiRecord;
  symbol: ApiSymbol;
}

export interface ReaderDiagnostic {
  code: string;
  severity: 'warning';
  message: string;
  causeCode?: string;
}

export interface ResolvedExport {
  status: 'complete' | 'partial';
  requested: ResolvedRoute;
  routes: ResolvedRoute[];
  definition?: ResolvedDefinition;
  diagnostics: ReaderDiagnostic[];
}

export class MetadataReader {
  private readonly loader: MetadataLoader;

  public constructor(options: MetadataLoaderOptions = {}) {
    this.loader = new MetadataLoader(options);
  }

  public getStats(): Readonly<MetadataReaderStats> {
    return this.loader.getStats();
  }

  public registerPackageCatalog(registration: MetadataCatalogRegistration): void {
    this.loader.registerPackageCatalog(registration);
  }

  public loadPackageIndex(packageName: string, importer: string): LoadedPackageCatalog {
    return this.loader.loadPackageIndex(packageName, importer);
  }

  public loadApiRecord(catalog: LoadedPackageCatalog, recordId: string): ApiRecord {
    return this.loader.loadApiRecord(catalog, recordId);
  }

  public resolveExport(options: ResolveExportOptions): ResolvedExport {
    validateRequestedConditions(options.conditions);
    const operation = this.loader.createOperation();
    const catalog = this.loader.loadPackageIndex(options.package, options.importer, operation);
    const route = selectRoute(catalog, options.entrypoint, options.export, options.namespace, options.conditions, true);
    const requested = { catalog, route };
    const routes: ResolvedRoute[] = [requested];
    const visited = new Set<string>();
    const diagnostics = getCatalogDiagnostics(catalog);
    this.loader.verifyRouteDeclaration(catalog, route, operation);

    try {
      const resolved = this._resolveRouteTarget(
        requested,
        options.conditions,
        operation,
        routes,
        visited,
        diagnostics,
        0,
      );
      return {
        status: diagnostics.length === 0 ? 'complete' : 'partial',
        requested,
        routes,
        definition: resolved.definition,
        diagnostics,
      };
    } catch (error) {
      if (!(error instanceof MetadataReaderError)) {
        throw error;
      }
      return {
        status: 'partial',
        requested,
        routes,
        diagnostics: [
          ...diagnostics,
          {
            code: 'reader.referencedDetailUnavailable',
            severity: 'warning',
            message: error.message,
            causeCode: error.code,
          },
        ],
      };
    }
  }

  private _resolveRouteTarget(
    resolvedRoute: ResolvedRoute,
    conditions: readonly string[] | undefined,
    operation: ReaderOperation,
    routes: ResolvedRoute[],
    visited: Set<string>,
    diagnostics: ReaderDiagnostic[],
    depth: number,
  ): { definition: ResolvedDefinition } {
    const limits = this.loader.getLimits();
    if (depth > limits.maxReferenceDepth) {
      throw new MetadataReaderError('reader.maxReferenceDepth', `Reference depth exceeds ${limits.maxReferenceDepth}`);
    }

    const routeKey = `${resolvedRoute.catalog.instance.identity}\0${resolvedRoute.route.entrypoint}\0${
      resolvedRoute.route.export
    }\0${resolvedRoute.route.namespace}\0${resolvedRoute.route.conditions.join(',')}`;
    if (visited.has(routeKey)) {
      throw new MetadataReaderError('reader.cycle', `Dependency route cycle detected at ${resolvedRoute.route.id}`);
    }
    visited.add(routeKey);
    if (depth > 0) {
      this.loader.verifyRouteDeclaration(resolvedRoute.catalog, resolvedRoute.route, operation);
      diagnostics.push(...getCatalogDiagnostics(resolvedRoute.catalog));
    }

    const target = resolvedRoute.route.target;
    if (target.kind === 'local' || target.kind === 'bundled') {
      const routeConditions = resolvedRoute.route.conditions;
      const record = this.loader.loadApiRecord(resolvedRoute.catalog, target.record, operation, routeConditions);
      const owner = this.loader.resolveRecordOwner(resolvedRoute.catalog, target.record, operation, routeConditions);
      const symbol = record.symbols.find(candidate => candidate.id === target.symbol);
      if (!symbol) {
        throw new MetadataReaderError(
          'reader.symbolMissing',
          `Record ${record.recordId} does not contain advertised symbol ${target.symbol}`,
        );
      }
      if (!symbol.namespaces.includes(resolvedRoute.route.namespace)) {
        throw new MetadataReaderError(
          'reader.symbolNamespace',
          `Symbol ${target.symbol} is not declared in the ${resolvedRoute.route.namespace} namespace`,
        );
      }
      diagnostics.push(...getRecordDiagnostics(record, symbol));
      const dependencyIssues = this.loader.verifyDependencyInputs(
        resolvedRoute.catalog,
        record,
        operation,
        routeConditions,
      );
      diagnostics.push(...dependencyIssues.map(toReaderDiagnostic));
      const definition =
        dependencyIssues.length > 0
          ? sanitizeDerivedDefinition(resolvedRoute.catalog, owner, record, symbol.id)
          : { catalog: resolvedRoute.catalog, owner, record, symbol };
      return {
        definition,
      };
    }

    const requestedPackage = target.requested ?? target.package;
    const dependencyCatalog = this.loader.loadPackageIndex(
      requestedPackage,
      resolvedRoute.catalog.instance.packageRoot,
      operation,
    );
    if (dependencyCatalog.instance.package.name !== target.package) {
      throw new MetadataReaderError(
        'reader.dependencyIdentityMismatch',
        `Dependency route expected ${target.package}, but ${requestedPackage} resolved to ${dependencyCatalog.instance.package.name}`,
      );
    }

    const dependencyRoute = selectRoute(
      dependencyCatalog,
      target.entrypoint,
      target.export,
      target.namespace,
      conditions,
      false,
    );
    const next = { catalog: dependencyCatalog, route: dependencyRoute };
    routes.push(next);
    return this._resolveRouteTarget(next, conditions, operation, routes, visited, diagnostics, depth + 1);
  }
}

export function createMetadataReader(options: MetadataLoaderOptions = {}): MetadataReader {
  return new MetadataReader(options);
}

function selectRoute(
  catalog: LoadedPackageCatalog,
  entrypoint: string,
  exportName: string,
  namespace: MetadataNamespace,
  conditions: readonly string[] | undefined,
  authoritative: boolean,
): ExportRoute {
  const candidates = catalog.index.exports.filter(
    route => route.entrypoint === entrypoint && route.export === exportName && route.namespace === namespace,
  );
  const code = authoritative ? 'reader.routeNotFound' : 'reader.dependencyRouteNotFound';
  if (candidates.length === 0) {
    throw new MetadataReaderError(
      code,
      `${catalog.instance.package.name} does not export ${exportName} from ${entrypoint} in the ${namespace} namespace`,
    );
  }

  if (conditions) {
    const exact = candidates.find(route => arraysEqual(route.conditions, conditions));
    if (!exact) {
      throw new MetadataReaderError(
        code,
        `${catalog.instance.package.name} has no ${exportName} route for conditions ${conditions.join(', ')}`,
      );
    }
    return exact;
  }

  if (candidates.length === 1) {
    return candidates[0];
  }

  const firstTarget = JSON.stringify(candidates[0].target);
  if (candidates.every(route => JSON.stringify(route.target) === firstTarget)) {
    return candidates[0];
  }

  throw new MetadataReaderError(
    'reader.routeAmbiguous',
    `${catalog.instance.package.name} has multiple condition-specific routes for ${exportName}; provide exact conditions`,
  );
}

function validateRequestedConditions(conditions: readonly string[] | undefined): void {
  if (!conditions) {
    return;
  }
  if (conditions.length === 0 || new Set(conditions).size !== conditions.length) {
    throw new MetadataReaderError('reader.conditions', 'Conditions must be a non-empty ordered set');
  }
  const unsupported = conditions.filter(condition => !SUPPORTED_ROUTE_CONDITIONS.has(condition));
  if (unsupported.length > 0) {
    throw new MetadataReaderError(
      'reader.conditionsUnsupported',
      `The metadata v1 reader does not support custom resolution conditions: ${unsupported.join(', ')}`,
    );
  }
}

function arraysEqual(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function toReaderDiagnostic(issue: DependencyVerificationIssue): ReaderDiagnostic {
  return {
    code: issue.code,
    severity: 'warning',
    message: issue.message,
    causeCode: issue.causeCode,
  };
}

function getCatalogDiagnostics(catalog: LoadedPackageCatalog): ReaderDiagnostic[] {
  const reasons = [
    ...(catalog.index.capabilities.api.reasons ?? []),
    ...(catalog.index.completeness.api.reasons ?? []),
  ];
  if (catalog.index.capabilities.api.status === 'supported' && catalog.index.completeness.api.status === 'complete') {
    return [];
  }
  const unavailable =
    catalog.index.capabilities.api.status === 'unsupported' || catalog.index.completeness.api.status === 'unavailable';
  const code = unavailable ? 'reader.indexUnavailable' : 'reader.indexPartial';
  return [
    {
      code,
      severity: 'warning',
      message: reasons.length > 0 ? reasons.join('; ') : 'Package index reports incomplete API coverage',
      causeCode: code,
    },
  ];
}

function getRecordDiagnostics(record: ApiRecord, symbol: ApiSymbol): ReaderDiagnostic[] {
  const diagnostics: ReaderDiagnostic[] = [];
  if (record.completeness.status !== 'complete') {
    const code = record.completeness.status === 'unavailable' ? 'reader.recordUnavailable' : 'reader.recordPartial';
    diagnostics.push({
      code,
      severity: 'warning',
      message: record.completeness.reasons?.join('; ') ?? 'API record reports incomplete detail',
      causeCode: code,
    });
  }
  for (const view of [symbol.effectiveType, ...(symbol.props?.map(props => props.type) ?? [])]) {
    if (!view || view.status.status === 'complete') {
      continue;
    }
    const code =
      view.status.status === 'unsupported' ? 'reader.effectiveTypeUnsupported' : 'reader.effectiveTypePartial';
    diagnostics.push({
      code,
      severity: 'warning',
      message: view.status.reasons?.join('; ') ?? 'Effective type view is incomplete',
      causeCode: code,
    });
  }
  return diagnostics;
}

function sanitizeDerivedDefinition(
  catalog: LoadedPackageCatalog,
  owner: ResolvedDefinitionOwner,
  record: ApiRecord,
  selectedSymbolId: string,
): ResolvedDefinition {
  const symbols = record.symbols.map(symbol => {
    if (!symbol.effectiveType && !symbol.props) {
      return symbol;
    }
    const unsupported = {
      status: {
        status: 'unsupported' as const,
        reasons: ['Dependency declaration fingerprints changed; regenerate metadata for an effective view'],
      },
      members: [],
      signatures: [],
    };
    return {
      ...symbol,
      ...(symbol.effectiveType ? { effectiveType: unsupported } : {}),
      ...(symbol.props ? { props: symbol.props.map(props => ({ ...props, type: unsupported })) } : {}),
    };
  });
  const sanitizedRecord = { ...record, symbols };
  const symbol = symbols.find(candidate => candidate.id === selectedSymbolId);
  if (!symbol) {
    throw new MetadataReaderError(
      'reader.symbolMissing',
      `Record ${record.recordId} lost selected symbol ${selectedSymbolId}`,
    );
  }
  return { catalog, owner, record: sanitizedRecord, symbol };
}

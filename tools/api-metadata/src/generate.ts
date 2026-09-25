import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';

import { declarationInputKey, extractDeclarations, type ExportSelection, type ExtractionResult } from './extract';
import { canonicalDeclarationPath, deduplicateRecords } from './deduplicate';
import { readPackageManifest, resolveDeclarationEntries, type DeclarationEntry } from './package-exports';
import { API_METADATA_SCHEMA_VERSION } from './schema';
import { fingerprintMetadata } from './serialize';
import type {
  ApiRecord,
  BundledPackageSource,
  BundledRecordSource,
  DeclarationInput,
  DependencyInput,
  DependencyExportTarget,
  GeneratorIdentity,
  GeneratorOptions,
  GeneratorResult,
  MetadataDiagnostic,
  MetadataGenerator,
  MetadataStatus,
  PackageIndex,
} from './types';
import { validateCatalog } from './validate';
import { assertValidPackageIndex } from './validate';
import { writeGeneratedMetadata } from './write';

const GENERATOR_IDENTITY: GeneratorIdentity = {
  name: '@fluentui/api-metadata',
  version: '0.0.0',
};

export const metadataGenerator: MetadataGenerator = {
  generate: generateApiMetadata,
};

const ROLLOUT_PARTIAL_DIAGNOSTIC = 'generator.rolloutCoveragePartial';

export async function generateApiMetadata(options: GeneratorOptions): Promise<GeneratorResult> {
  return generateApiMetadataInternal(options, {
    active: new Set(),
    dependencyCatalogs: new Map(),
  });
}

interface GenerationContext {
  active: Set<string>;
  dependencyCatalogs: Map<string, Promise<GeneratorResult>>;
}

interface InternalGeneratorOptions extends GeneratorOptions {
  declarationEntries?: readonly DeclarationEntry[];
  selectedExports?: readonly ExportSelection[];
}

interface BundledRecord {
  record: ApiRecord;
  source?: BundledRecordSource;
}

async function generateApiMetadataInternal(
  options: InternalGeneratorOptions,
  generationContext: GenerationContext,
): Promise<GeneratorResult> {
  const manifest = readPackageManifest(options.packageRoot, options.packageName);
  const generationKey = createGenerationKey(manifest.root, options);
  if (generationContext.active.has(generationKey)) {
    throw new Error(`Dependency metadata generation cycle detected for ${manifest.name}`);
  }
  generationContext.active.add(generationKey);

  try {
    const resolution = options.declarationEntries
      ? {
          entries: [...options.declarationEntries],
          advertisedRoutes: options.declarationEntries.map(entry => ({
            entrypoint: entry.entrypoint,
            conditions: entry.conditions,
          })),
          unselectedRoutes: [],
          diagnostics: [],
        }
      : resolveDeclarationEntries(manifest, options);
    const declarationInputs = new Map<string, DeclarationInput>();

    for (const entry of resolution.entries) {
      declarationInputs.set(declarationInputKey(entry), {
        path: entry.declarationRelativePath,
        conditions: entry.conditions,
        fingerprint: fingerprintText(readFileSync(entry.declarationPath)),
      });
    }

    const packageIdentity = { name: manifest.name, version: manifest.version };
    const extraction = extractDeclarations(
      manifest,
      resolution.entries,
      packageIdentity,
      declarationInputs,
      GENERATOR_IDENTITY,
      API_METADATA_SCHEMA_VERSION,
      options.selectedExports,
    );
    const external = await bundleExternalDependencyRoutes(manifest, extraction, generationContext);
    const bundled = { ...external, ...deduplicateRecords(external.records, external.routes) };
    assertRouteDeclarationInputs(resolution.entries, bundled.routes, declarationInputs);
    const unavailableDependencyRoutes = findUnavailableDependencyRoutes(manifest.path, bundled.routes);
    const diagnostics = [
      ...resolution.diagnostics,
      ...extraction.diagnostics,
      ...bundled.diagnostics,
      ...resolution.unselectedRoutes.map(route => ({
        code: 'generator.routeNotGenerated',
        severity: 'warning' as const,
        message: `API detail was not generated for ${route.entrypoint} (${route.conditions.join(', ')})`,
        path: 'package.json',
      })),
      ...unavailableDependencyRoutes.map(route => ({
        code: 'generator.dependencyMetadataUnavailable',
        severity: 'warning' as const,
        message: `API detail for ${route.entrypoint} routes to ${route.package}, which does not publish Fluent UI metadata`,
        path: 'package.json',
      })),
    ].sort(compareDiagnostics);
    const hasErrors = diagnostics.some(diagnostic => diagnostic.severity === 'error');
    const hasUnselectedRoutes = resolution.unselectedRoutes.length > 0;
    const hasPartialEffectiveTypes = bundled.records.some(({ record }) =>
      record.symbols.some(symbol => symbol.effectiveType?.status.status === 'partial'),
    );
    const apiStatus: MetadataStatus =
      resolution.entries.length === 0
        ? 'unavailable'
        : hasErrors || hasUnselectedRoutes || unavailableDependencyRoutes.length > 0
        ? 'partial'
        : 'complete';
    const index: PackageIndex = {
      kind: 'package-index',
      schema: API_METADATA_SCHEMA_VERSION,
      generator: GENERATOR_IDENTITY,
      package: packageIdentity,
      ...(options.system ? { system: options.system } : null),
      capabilities: {
        api:
          resolution.entries.length === 0
            ? { status: 'unsupported', reasons: ['no declaration entries were selected'] }
            : { status: 'supported' },
        effectiveTypes:
          hasErrors || hasPartialEffectiveTypes
            ? {
                status: 'partial',
                reasons: [
                  hasErrors
                    ? 'some checker-derived views reported errors'
                    : 'checker-derived type strings do not carry semantic reference spans',
                ],
              }
            : { status: 'supported' },
        guidance: { status: 'unsupported', reasons: ['guidance is outside the declaration generator MVP'] },
        search: { status: 'unsupported', reasons: ['search is outside the declaration generator MVP'] },
      },
      completeness: {
        api:
          apiStatus === 'complete'
            ? { status: 'complete' }
            : {
                status: apiStatus,
                reasons:
                  apiStatus === 'partial'
                    ? [
                        ...(hasErrors ? ['generation reported errors'] : []),
                        ...(hasUnselectedRoutes
                          ? [`${resolution.unselectedRoutes.length} advertised declaration route(s) were not selected`]
                          : []),
                        ...(unavailableDependencyRoutes.length > 0
                          ? [
                              `${unavailableDependencyRoutes.length} dependency route(s) do not publish Fluent UI metadata`,
                            ]
                          : []),
                      ]
                    : ['no declarations'],
              },
        guidance: { status: 'unavailable', reasons: ['not generated'] },
        search: { status: 'unavailable', reasons: ['not generated'] },
      },
      declarationInputs: [...declarationInputs.values()].sort(compareDeclarationInputs),
      records: bundled.records.map(({ record, source }) => ({
        id: record.recordId,
        kind: 'api',
        path: `api/${record.recordId.replace(/:/g, '-')}.json`,
        fingerprint: fingerprintMetadata(record),
        symbols: record.symbols.map(symbol => symbol.id),
        ...(source ? { source } : {}),
      })),
      exports: bundled.routes,
      diagnostics,
    };

    const records = bundled.records.map(value => value.record);
    const validation = validateCatalog(index, records);
    if (!validation.valid) {
      throw new Error(
        `Generated metadata failed contract validation:\n${validation.diagnostics
          .map(diagnostic => `${diagnostic.path}: ${diagnostic.message}`)
          .join('\n')}`,
      );
    }

    return {
      index,
      records,
      diagnostics,
    };
  } finally {
    generationContext.active.delete(generationKey);
  }
}

async function bundleExternalDependencyRoutes(
  manifest: ReturnType<typeof readPackageManifest>,
  extraction: ExtractionResult,
  generationContext: GenerationContext,
): Promise<{
  records: BundledRecord[];
  routes: GeneratorResult['index']['exports'];
  diagnostics: MetadataDiagnostic[];
}> {
  const records: BundledRecord[] = extraction.records.map(record => ({ record }));
  const bundledRecords = new Map<string, { record: ApiRecord; source: BundledRecordSource }>();
  const diagnostics: MetadataDiagnostic[] = [];
  const routes: GeneratorResult['index']['exports'] = [];

  for (const route of extraction.routes) {
    if (route.target.kind !== 'dependency') {
      routes.push(route);
      continue;
    }

    const requestedPackage = packageNameFromSpecifier(route.target.requested ?? route.target.package);
    const installed = resolveDependencyPackage(manifest.path, requestedPackage);
    if (
      requestedPackage.startsWith('@fluentui/') ||
      !installed ||
      installed.manifest.fluentuiCatalog === './metadata.json'
    ) {
      routes.push(route);
      continue;
    }

    const input = extraction.dependencyRouteInputs.get(route.id);
    try {
      if (!input) {
        throw new Error(`No dependency declaration input was recorded for ${route.id}`);
      }
      const materialized = await materializeDependencyRoute(
        manifest.path,
        installed,
        input,
        route.target,
        route.conditions,
        generationContext,
      );
      const key = `${materialized.record.package.name}\0${materialized.record.recordId}\0${
        fingerprintMetadata(materialized.record).value
      }\0${fingerprintText(Buffer.from(JSON.stringify(materialized.source))).value}`;
      let copied = bundledRecords.get(key);
      if (!copied) {
        const recordId = `bundled:${safeId(materialized.record.package.name)}:${shortHash(key)}`;
        copied = {
          record: renameRecord(materialized.record, recordId),
          source: materialized.source,
        };
        bundledRecords.set(key, copied);
        records.push(copied);
      }
      routes.push({
        ...route,
        target: {
          kind: 'bundled' as const,
          record: copied.record.recordId,
          symbol: materialized.symbol,
        },
      });
    } catch (error) {
      diagnostics.push({
        code: 'generator.externalDependencyBundleUnavailable',
        severity: 'warning',
        message: `Could not bundle API detail for ${route.export} from ${requestedPackage}: ${
          error instanceof Error ? error.message : String(error)
        }`,
        path: 'package.json',
        symbol: route.export,
      });
      routes.push(route);
    }
  }

  return {
    records,
    routes: routes.sort((left, right) => left.id.localeCompare(right.id)),
    diagnostics: diagnostics.sort(compareDiagnostics),
  };
}

async function materializeDependencyRoute(
  importerManifestPath: string,
  installed: ResolvedDependencyPackage,
  input: DependencyInput,
  target: DependencyExportTarget,
  routeConditions: readonly string[],
  generationContext: GenerationContext,
): Promise<{ record: ApiRecord; symbol: string; source: BundledRecordSource }> {
  const declarationOwner =
    input.declarationPath && input.package.name !== installed.manifest.name
      ? resolveDependencyPackage(importerManifestPath, input.package.name)
      : undefined;
  let result: GeneratorResult;
  let route: GeneratorResult['index']['exports'][number];
  try {
    result = await generateDependencyCatalog(installed.root, target.entrypoint, generationContext);
    route = selectMaterializedRoute(result, target, routeConditions);
  } catch (error) {
    if (!declarationOwner) {
      throw error;
    }
    result = await generateRecordedDeclarationCatalog(
      declarationOwner,
      input,
      target,
      routeConditions,
      generationContext,
    );
    route = selectMaterializedRoute(result, target, routeConditions);
  }

  if (route.target.kind === 'dependency') {
    throw new Error(
      `${result.index.package.name} still routes ${target.export} to metadata owned by ${route.target.package}`,
    );
  }
  const selectedTarget = route.target;
  const descriptor = result.index.records.find(candidate => candidate.id === selectedTarget.record);
  const record = result.records.find(candidate => candidate.recordId === selectedTarget.record);
  if (!descriptor || !record) {
    throw new Error(`${result.index.package.name} did not generate record ${selectedTarget.record}`);
  }

  const slicedRecord = sliceRecord(record, selectedTarget.symbol);
  const routeInputPaths = new Set(route.declarationInputs ?? []);
  const routeInputs = result.index.declarationInputs.filter(
    declarationInput =>
      routeInputPaths.has(declarationInput.path) && arraysEqual(declarationInput.conditions, route.conditions),
  );
  const localInputs =
    selectedTarget.kind === 'local'
      ? uniqueDeclarationInputs([...routeInputs, ...slicedRecord.declarationInputs])
      : routeInputs;
  if (localInputs.length === 0) {
    throw new Error(`${result.index.package.name} did not retain declaration provenance for ${target.export}`);
  }
  const currentPackage: BundledPackageSource = {
    requested: packageNameFromSpecifier(target.requested ?? target.package),
    package: result.index.package,
    declarationInputs: localInputs,
  };
  const source: BundledRecordSource = {
    kind: 'dependency',
    packages:
      selectedTarget.kind === 'bundled' && descriptor.source
        ? [currentPackage, ...descriptor.source.packages]
        : [currentPackage],
  };
  return { record: slicedRecord, symbol: selectedTarget.symbol, source };
}

async function generateDependencyCatalog(
  packageRoot: string,
  entrypoint: string,
  generationContext: GenerationContext,
): Promise<GeneratorResult> {
  const options = { packageRoot, entrypoints: [entrypoint] };
  const key = createGenerationKey(resolve(packageRoot), options);
  if (generationContext.active.has(key)) {
    throw new Error(`Dependency route cycle reached ${packageRoot}`);
  }
  let generated = generationContext.dependencyCatalogs.get(key);
  if (!generated) {
    generated = generateApiMetadataInternal(options, generationContext);
    generationContext.dependencyCatalogs.set(key, generated);
    generated.catch(() => generationContext.dependencyCatalogs.delete(key));
  }
  return generated;
}

async function generateRecordedDeclarationCatalog(
  owner: ResolvedDependencyPackage,
  input: DependencyInput,
  target: DependencyExportTarget,
  routeConditions: readonly string[],
  generationContext: GenerationContext,
): Promise<GeneratorResult> {
  if (owner.manifest.name !== input.package.name || owner.manifest.version !== input.package.version) {
    throw new Error(
      `Recorded declaration owner ${input.package.name}@${input.package.version} resolves to ${owner.manifest.name}@${owner.manifest.version}`,
    );
  }
  if (!input.declarationPath) {
    throw new Error(`Recorded declaration owner ${input.package.name} has no declaration path`);
  }
  const declarationPath = resolve(owner.root, input.declarationPath);
  const contained = relative(owner.root, declarationPath);
  if (isAbsolute(contained) || contained === '..' || contained.startsWith(`..${sep}`)) {
    throw new Error(`Recorded declaration path escapes ${input.package.name}`);
  }
  if (!existsSync(declarationPath)) {
    throw new Error(`Recorded declaration path ${input.package.name}/${input.declarationPath} does not exist`);
  }
  if (fingerprintText(readFileSync(declarationPath)).value !== input.declarationFingerprint.value) {
    throw new Error(
      `Recorded declaration input ${input.package.name}/${input.declarationPath} changed during generation`,
    );
  }

  const options: InternalGeneratorOptions = {
    packageRoot: owner.root,
    entrypoints: [target.entrypoint],
    declarationEntries: [
      {
        entrypoint: target.entrypoint,
        conditions: [...routeConditions],
        declarationPath,
        declarationRelativePath: input.declarationPath,
      },
    ],
    selectedExports: [
      {
        entrypoint: target.entrypoint,
        export: target.export,
        namespace: target.namespace,
      },
    ],
  };
  const key = createGenerationKey(owner.root, options);
  if (generationContext.active.has(key)) {
    throw new Error(`Dependency route cycle reached ${owner.root}`);
  }
  let generated = generationContext.dependencyCatalogs.get(key);
  if (!generated) {
    generated = generateApiMetadataInternal(options, generationContext);
    generationContext.dependencyCatalogs.set(key, generated);
    generated.catch(() => generationContext.dependencyCatalogs.delete(key));
  }
  return generated;
}

function selectMaterializedRoute(
  result: GeneratorResult,
  target: DependencyExportTarget,
  routeConditions: readonly string[],
): GeneratorResult['index']['exports'][number] {
  const candidates = result.index.exports.filter(
    route =>
      route.entrypoint === target.entrypoint && route.export === target.export && route.namespace === target.namespace,
  );
  const exact = candidates.find(route => arraysEqual(route.conditions, routeConditions));
  if (exact) {
    return exact;
  }
  const requestedBranches = routeConditions.filter(condition => condition !== 'types' && condition !== 'default');
  const compatible = candidates
    .filter(route => {
      const branches = route.conditions.filter(condition => condition !== 'types' && condition !== 'default');
      return branches.length === 0 || branches.every(condition => requestedBranches.includes(condition));
    })
    .sort((left, right) => right.conditions.length - left.conditions.length || left.id.localeCompare(right.id));
  if (compatible.length === 0) {
    throw new Error(
      `${result.index.package.name} does not expose ${target.export} in the ${target.namespace} namespace`,
    );
  }
  const bestLength = compatible[0].conditions.length;
  const best = compatible.filter(route => route.conditions.length === bestLength);
  if (best.length > 1 && best.some(route => JSON.stringify(route.target) !== JSON.stringify(best[0].target))) {
    throw new Error(`${result.index.package.name} has ambiguous declaration routes for ${target.export}`);
  }
  return best[0];
}

interface ResolvedDependencyPackage {
  root: string;
  manifest: { name: string; version: string; fluentuiCatalog?: unknown };
}

function resolveDependencyPackage(manifestPath: string, requested: string): ResolvedDependencyPackage | undefined {
  const requireFromPackage = createRequire(manifestPath);
  let dependencyManifest: string | undefined;
  try {
    dependencyManifest = requireFromPackage.resolve(`${requested}/package.json`);
  } catch {
    try {
      dependencyManifest = findContainingPackageManifest(dirname(requireFromPackage.resolve(requested)));
    } catch {
      return undefined;
    }
  }
  if (!dependencyManifest) {
    return undefined;
  }
  const manifest = JSON.parse(readFileSync(dependencyManifest, 'utf8')) as {
    name?: unknown;
    version?: unknown;
    fluentuiCatalog?: unknown;
  };
  if (typeof manifest.name !== 'string' || typeof manifest.version !== 'string') {
    return undefined;
  }
  return {
    root: dirname(dependencyManifest),
    manifest: { name: manifest.name, version: manifest.version, fluentuiCatalog: manifest.fluentuiCatalog },
  };
}

function findContainingPackageManifest(start: string): string | undefined {
  let directory = resolve(start);
  while (true) {
    const candidate = join(directory, 'package.json');
    if (existsSync(candidate)) {
      return candidate;
    }
    const parent = dirname(directory);
    if (parent === directory) {
      return undefined;
    }
    directory = parent;
  }
}

function renameRecord(record: ApiRecord, recordId: string): ApiRecord {
  const clone = JSON.parse(JSON.stringify(record)) as ApiRecord;
  const previous = clone.recordId;
  clone.recordId = recordId;
  visitObjects(clone, value => {
    if (value.kind === 'local' && value.record === previous) {
      value.record = recordId;
    }
  });
  return clone;
}

function sliceRecord(record: ApiRecord, selectedSymbol: string): ApiRecord {
  const symbols = new Map(record.symbols.map(symbol => [symbol.id, symbol]));
  const retained = new Set<string>();
  const pending = [selectedSymbol];
  while (pending.length > 0) {
    const symbolId = pending.pop()!;
    if (retained.has(symbolId)) {
      continue;
    }
    const symbol = symbols.get(symbolId);
    if (!symbol) {
      throw new Error(`Record ${record.recordId} does not contain selected symbol ${symbolId}`);
    }
    retained.add(symbolId);
    visitObjects(symbol, value => {
      if (
        value.kind === 'local' &&
        typeof value.symbol === 'string' &&
        (value.record === undefined || value.record === record.recordId)
      ) {
        pending.push(value.symbol);
      }
    });
  }

  const retainedSymbols = record.symbols.filter(symbol => retained.has(symbol.id));
  const declarationPaths = new Set<string>();
  for (const symbol of retainedSymbols) {
    visitObjects(symbol, value => {
      if (typeof value.file === 'string') {
        declarationPaths.add(value.file);
      }
    });
  }
  const declarationIdentities = new Set(
    record.declarationInputs
      .filter(input => declarationPaths.has(input.path))
      .map(input => `${canonicalDeclarationPath(input.path)}\0${input.fingerprint.value}`),
  );
  const declarationInputs = record.declarationInputs.filter(input =>
    declarationIdentities.has(`${canonicalDeclarationPath(input.path)}\0${input.fingerprint.value}`),
  );
  if (declarationInputs.length === 0) {
    throw new Error(`Record ${record.recordId} did not retain declaration inputs for ${selectedSymbol}`);
  }
  return {
    ...record,
    declarationInputs,
    symbols: retainedSymbols,
  };
}

function uniqueDeclarationInputs(inputs: readonly DeclarationInput[]): DeclarationInput[] {
  const unique = new Map(inputs.map(input => [`${input.path}\0${input.conditions.join(',')}`, input]));
  return [...unique.values()].sort(compareDeclarationInputs);
}

function visitObjects(value: unknown, visitor: (value: Record<string, unknown>) => void): void {
  if (!value || typeof value !== 'object') {
    return;
  }
  if (Array.isArray(value)) {
    value.forEach(item => visitObjects(item, visitor));
    return;
  }
  const object = value as Record<string, unknown>;
  visitor(object);
  Object.values(object).forEach(item => visitObjects(item, visitor));
}

function createGenerationKey(
  packageRoot: string,
  options: Pick<
    InternalGeneratorOptions,
    'entrypoints' | 'declarationConditions' | 'declarationEntries' | 'selectedExports'
  >,
) {
  return `${resolve(packageRoot)}\0${(options.entrypoints ?? []).join(',')}\0${(
    options.declarationConditions ?? []
  ).join(',')}\0${(options.declarationEntries ?? [])
    .map(entry => `${entry.entrypoint}:${entry.conditions.join(',')}:${entry.declarationRelativePath}`)
    .join('|')}\0${(options.selectedExports ?? [])
    .map(selection => `${selection.entrypoint}:${selection.export}:${selection.namespace}`)
    .join('|')}`;
}

function packageNameFromSpecifier(requested: string): string {
  const parts = requested.split('/');
  return requested.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
}

function safeId(value: string): string {
  return value.replace(/[^A-Za-z0-9._@/-]+/g, '-').replace(/^[-/]+|[-/]+$/g, '') || 'anonymous';
}

function shortHash(value: string): string {
  return createHash('sha256').update(value).digest('hex').slice(0, 16);
}

function arraysEqual(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function findUnavailableDependencyRoutes(
  manifestPath: string,
  routes: GeneratorResult['index']['exports'],
): Array<{ package: string; entrypoint: string }> {
  const availability = new Map<string, boolean>();
  const unavailable = new Map<string, { package: string; entrypoint: string }>();

  for (const route of routes) {
    if (route.target.kind !== 'dependency') {
      continue;
    }
    let hasMetadata = availability.get(route.target.package);
    if (hasMetadata === undefined) {
      const installed = resolveDependencyPackage(manifestPath, route.target.requested ?? route.target.package);
      hasMetadata = installed?.manifest.fluentuiCatalog === './metadata.json';
      availability.set(route.target.package, hasMetadata);
    }
    if (!hasMetadata) {
      const key = `${route.target.package}\0${route.target.entrypoint}`;
      unavailable.set(key, { package: route.target.package, entrypoint: route.target.entrypoint });
    }
  }

  return [...unavailable.values()].sort(
    (left, right) => left.package.localeCompare(right.package) || left.entrypoint.localeCompare(right.entrypoint),
  );
}

export function assertApiMetadataPublishable(result: GeneratorResult): void {
  const errors = result.diagnostics.filter(diagnostic => diagnostic.severity === 'error');
  if (errors.length > 0) {
    throw new Error(
      `API metadata generation reported errors:\n${errors
        .map(diagnostic => `${diagnostic.path ?? 'package.json'}: [${diagnostic.code}] ${diagnostic.message}`)
        .join('\n')}`,
    );
  }
  if (result.index.declarationInputs.length === 0) {
    throw new Error('API metadata generation selected no published declaration inputs');
  }
}

export function markApiMetadataRolloutPartial(result: GeneratorResult, reasons: readonly string[]): GeneratorResult {
  const normalizedReasons = [...new Set(reasons.filter(Boolean))].sort();
  if (normalizedReasons.length === 0) {
    return result;
  }

  const rolloutDiagnostic = {
    code: ROLLOUT_PARTIAL_DIAGNOSTIC,
    severity: 'warning' as const,
    message: normalizedReasons.join('; '),
    path: 'package.json',
  };
  const diagnostics = [
    ...result.diagnostics.filter(diagnostic => diagnostic.code !== ROLLOUT_PARTIAL_DIAGNOSTIC),
    rolloutDiagnostic,
  ].sort(compareDiagnostics);

  return {
    ...result,
    diagnostics,
    index: {
      ...result.index,
      completeness: {
        ...result.index.completeness,
        api: { status: 'partial', reasons: normalizedReasons },
      },
      diagnostics,
    },
  };
}

export async function refreshGeneratedApiMetadata(packageRoot: string): Promise<boolean> {
  const manifest = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8')) as {
    fluentuiCatalog?: unknown;
  };
  if (manifest.fluentuiCatalog !== './metadata.json') {
    return false;
  }

  const outputDirectory = join(packageRoot, 'dist/metadata');
  const existingIndexPath = join(outputDirectory, 'index.json');
  if (!existsSync(existingIndexPath)) {
    throw new Error(`API metadata is enabled but the prebuilt index is missing: ${existingIndexPath}`);
  }
  const existingIndex = assertValidPackageIndex(JSON.parse(readFileSync(existingIndexPath, 'utf8')));
  const declaredEntries = resolveDeclarationEntries(readPackageManifest(packageRoot), {}).entries;
  const recordedInputs = new Set(
    existingIndex.declarationInputs.map(input => `${input.path}\0${input.conditions.join(',')}`),
  );
  const entrypoints = [
    ...new Set([
      ...existingIndex.exports.map(route => route.entrypoint),
      ...declaredEntries.filter(entry => recordedInputs.has(declarationInputKey(entry))).map(entry => entry.entrypoint),
    ]),
  ].sort();
  let result = await generateApiMetadata({
    packageRoot,
    entrypoints,
    ...(existingIndex.system ? { system: existingIndex.system } : null),
  });

  const rolloutReasons = existingIndex.diagnostics.some(diagnostic => diagnostic.code === ROLLOUT_PARTIAL_DIAGNOSTIC)
    ? existingIndex.completeness.api.reasons ?? []
    : [];
  result = markApiMetadataRolloutPartial(result, rolloutReasons);
  assertApiMetadataPublishable(result);

  writeGeneratedMetadata(result, outputDirectory);
  return true;
}

function fingerprintText(value: Buffer): DeclarationInput['fingerprint'] {
  return {
    algorithm: 'sha256',
    value: createHash('sha256').update(value).digest('hex'),
  };
}

function compareDeclarationInputs(left: DeclarationInput, right: DeclarationInput): number {
  return left.path.localeCompare(right.path) || left.conditions.join(',').localeCompare(right.conditions.join(','));
}

function compareDiagnostics(
  left: GeneratorResult['diagnostics'][number],
  right: GeneratorResult['diagnostics'][number],
) {
  return (
    left.code.localeCompare(right.code) ||
    (left.path ?? '').localeCompare(right.path ?? '') ||
    left.message.localeCompare(right.message)
  );
}

function assertRouteDeclarationInputs(
  entries: readonly DeclarationEntry[],
  routes: GeneratorResult['index']['exports'],
  declarationInputs: ReadonlyMap<string, DeclarationInput>,
): void {
  for (const route of routes) {
    const matchingEntries = entries.filter(
      entry =>
        entry.entrypoint === route.entrypoint &&
        entry.conditions.length === route.conditions.length &&
        entry.conditions.every((condition, index) => condition === route.conditions[index]),
    );
    if (
      matchingEntries.length === 0 ||
      matchingEntries.some(entry => {
        const input = declarationInputs.get(declarationInputKey(entry));
        return input?.path !== entry.declarationRelativePath;
      })
    ) {
      throw new Error(
        `Export route ${route.entrypoint}:${route.export}:${route.namespace} has no matching declaration input`,
      );
    }
  }
}

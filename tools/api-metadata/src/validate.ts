import { API_METADATA_DEFAULT_BOUNDS } from './schema';
import type {
  ApiDeclaration,
  ApiRecord,
  ApiSignature,
  ApiSymbol,
  BundledPackageSource,
  BundledRecordSource,
  DeclarationInput,
  DependencyInput,
  EffectiveMember,
  EffectiveTypeView,
  ExportRoute,
  ExportTarget,
  Fingerprint,
  MetadataCapabilities,
  MetadataCompleteness,
  MetadataDiagnostic,
  MetadataDocument,
  MetadataNamespace,
  MetadataRecordDescriptor,
  MetadataSchemaVersion,
  PackageIdentity,
  PackageIndex,
  SourceLocation,
  SlotPresentation,
  SlotTarget,
  StatusDetail,
  SymbolClassification,
  SymbolReference,
  TypeExpression,
  TypeReferenceSpan,
  TypeRelationship,
} from './types';

export type ValidationBounds = {
  -readonly [Key in keyof typeof API_METADATA_DEFAULT_BOUNDS]: number;
};

export interface ValidationOptions {
  bounds?: Partial<ValidationBounds>;
  requireAllApiRecords?: boolean;
  selectedRecordIds?: readonly string[];
}

export interface ValidationIssue {
  code: string;
  message: string;
  path: string;
}

export type ValidationResult<T> =
  | { valid: true; value: T; diagnostics: [] }
  | { valid: false; diagnostics: ValidationIssue[] };

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$-]*$/;
const ID = /^[A-Za-z0-9][A-Za-z0-9._:/#@-]{0,255}$/;
const CONDITION = /^[A-Za-z][A-Za-z0-9_-]{0,63}$/;
const FINGERPRINT = /^[a-f0-9]{64}$/;
const PACKAGE_NAME = /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/;

type ObjectValue = Record<string, unknown>;

class ValidationContext {
  public readonly diagnostics: ValidationIssue[] = [];
  public readonly bounds: ValidationBounds;
  private issueCount = 0;

  public constructor(options?: ValidationOptions) {
    const bounds = { ...API_METADATA_DEFAULT_BOUNDS } as ValidationBounds;
    const invalidBounds: Array<{ key: string; value: unknown }> = [];
    if (options?.bounds) {
      for (const rawKey of Object.keys(options.bounds)) {
        const rawValue = (options.bounds as Record<string, unknown>)[rawKey];
        if (!(rawKey in API_METADATA_DEFAULT_BOUNDS)) {
          invalidBounds.push({ key: rawKey, value: rawValue });
          continue;
        }
        const key = rawKey as keyof ValidationBounds;
        const value = rawValue;
        const minimum = key === 'maxDiagnostics' ? 1 : 0;
        if (value === undefined) {
          continue;
        }
        if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < minimum) {
          invalidBounds.push({ key, value });
          continue;
        }
        bounds[key] = value;
      }
    }
    this.bounds = bounds;
    invalidBounds.forEach(({ key, value }) => {
      this.issue(
        'bounds.option',
        `$.options.bounds.${key}`,
        `${key} must be a finite safe integer greater than or equal to ${
          key === 'maxDiagnostics' ? 1 : 0
        }; received ${String(value)}`,
      );
    });
  }

  public issue(code: string, path: string, message: string): void {
    this.issueCount++;
    if (this.diagnostics.length < this.bounds.maxDiagnostics) {
      this.diagnostics.push({ code, path, message });
    }
  }

  public get invalid(): boolean {
    return this.issueCount > 0;
  }

  public checkpoint(): number {
    return this.issueCount;
  }

  public hasIssuesSince(checkpoint: number): boolean {
    return this.issueCount > checkpoint;
  }

  public validateBounds(value: unknown): boolean {
    const checkpoint = this.checkpoint();
    const ancestors = new Set<object>();
    let nodes = 0;
    let aborted = false;

    const visit = (current: unknown, path: string, depth: number): void => {
      if (aborted) {
        return;
      }
      nodes++;
      if (nodes > this.bounds.maxTotalNodes) {
        this.issue('bounds.totalNodes', path, `Metadata exceeds ${this.bounds.maxTotalNodes} total values`);
        aborted = true;
        return;
      }

      if (depth > this.bounds.maxDepth) {
        this.issue('bounds.depth', path, `Metadata exceeds maximum depth ${this.bounds.maxDepth}`);
        aborted = true;
        return;
      }

      if (typeof current === 'string' && current.length > this.bounds.maxStringLength) {
        this.issue('bounds.string', path, `String exceeds ${this.bounds.maxStringLength} characters`);
        aborted = true;
        return;
      }

      if (current === null || typeof current !== 'object') {
        return;
      }

      if (ancestors.has(current)) {
        this.issue('structure.cycle', path, 'Metadata contains a cycle');
        aborted = true;
        return;
      }

      ancestors.add(current);
      try {
        if (Array.isArray(current)) {
          if (current.length > this.bounds.maxArrayLength) {
            this.issue('bounds.array', path, `Array exceeds ${this.bounds.maxArrayLength} items`);
            aborted = true;
            return;
          }

          current.forEach((item, index) => visit(item, `${path}[${index}]`, depth + 1));
          return;
        }

        const prototype = Object.getPrototypeOf(current);
        if (prototype !== Object.prototype && prototype !== null) {
          this.issue('structure.object', path, 'Metadata values must be plain JSON objects');
          aborted = true;
          return;
        }

        const keys = Object.keys(current);
        if (keys.length > this.bounds.maxObjectKeys) {
          this.issue('bounds.objectKeys', path, `Object exceeds ${this.bounds.maxObjectKeys} keys`);
          aborted = true;
          return;
        }

        keys.forEach(key => visit((current as ObjectValue)[key], `${path}.${key}`, depth + 1));
      } finally {
        ancestors.delete(current);
      }
    };

    visit(value, '$', 0);
    return !this.hasIssuesSince(checkpoint);
  }
}

export function validateMetadataDocument(
  input: unknown,
  options?: ValidationOptions,
): ValidationResult<MetadataDocument> {
  if (isObject(input) && input.kind === 'package-index') {
    return validatePackageIndex(input, options);
  }

  if (isObject(input) && input.kind === 'api-record') {
    return validateApiRecord(input, options);
  }

  return {
    valid: false,
    diagnostics: [{ code: 'document.kind', path: '$.kind', message: 'Expected package-index or api-record' }],
  };
}

export function validateSerializedMetadata(
  serialized: string,
  options?: ValidationOptions,
): ValidationResult<MetadataDocument> {
  const context = new ValidationContext(options);
  if (context.invalid) {
    return finish<MetadataDocument>(undefined, context);
  }
  const bounds = context.bounds;
  const bytes = Buffer.byteLength(serialized, 'utf8');
  if (bytes > bounds.maxBytes) {
    return {
      valid: false,
      diagnostics: [
        {
          code: 'bounds.bytes',
          path: '$',
          message: `Serialized metadata exceeds ${bounds.maxBytes} bytes`,
        },
      ],
    };
  }

  try {
    return validateMetadataDocument(JSON.parse(serialized), options);
  } catch (error) {
    return {
      valid: false,
      diagnostics: [
        {
          code: 'document.json',
          path: '$',
          message: error instanceof Error ? error.message : 'Invalid JSON',
        },
      ],
    };
  }
}

export function validatePackageIndex(input: unknown, options?: ValidationOptions): ValidationResult<PackageIndex> {
  const context = new ValidationContext(options);
  if (context.invalid || !context.validateBounds(input)) {
    return finish<PackageIndex>(undefined, context);
  }
  const value = validatePackageIndexValue(input, context, '$');
  return finish(value, context);
}

export function validateApiRecord(input: unknown, options?: ValidationOptions): ValidationResult<ApiRecord> {
  const context = new ValidationContext(options);
  if (context.invalid || !context.validateBounds(input)) {
    return finish<ApiRecord>(undefined, context);
  }
  const value = validateApiRecordValue(input, context, '$');
  return finish(value, context);
}

export function validateCatalog(
  indexInput: unknown,
  recordInputs: readonly unknown[],
  options?: ValidationOptions,
): ValidationResult<{ index: PackageIndex; records: ApiRecord[] }> {
  const indexResult = validatePackageIndex(indexInput, options);
  const recordResults = recordInputs.map(record => validateApiRecord(record, options));
  const diagnostics: ValidationIssue[] = [];

  if (!indexResult.valid) {
    diagnostics.push(...prefixIssues(indexResult.diagnostics, '$.index'));
  }

  recordResults.forEach((result, index) => {
    if (!result.valid) {
      diagnostics.push(...prefixIssues(result.diagnostics, `$.records[${index}]`));
    }
  });

  if (!indexResult.valid || recordResults.some(result => !result.valid)) {
    return { valid: false, diagnostics };
  }

  const index = indexResult.value;
  const records: ApiRecord[] = [];
  for (const result of recordResults) {
    if (result.valid) {
      records.push(result.value);
    }
  }
  const descriptors = new Map(index.records.filter(record => record.kind === 'api').map(record => [record.id, record]));
  const loadedRecords = new Map<string, ApiRecord>();

  records.forEach((record, recordIndex) => {
    const descriptor = descriptors.get(record.recordId);
    const expectedPackage = descriptor?.source?.packages.at(-1)?.package ?? index.package;
    if (!samePackage(expectedPackage, record.package)) {
      diagnostics.push({
        code: 'catalog.packageIdentity',
        path: `$.records[${recordIndex}].package`,
        message: descriptor?.source
          ? 'Bundled API record package identity must match its final dependency source'
          : 'API record package identity must match its package index',
      });
    }

    if (loadedRecords.has(record.recordId)) {
      diagnostics.push({
        code: 'catalog.duplicateRecord',
        path: `$.records[${recordIndex}].recordId`,
        message: `Duplicate API record ${record.recordId}`,
      });
    }
    loadedRecords.set(record.recordId, record);

    if (!descriptor) {
      diagnostics.push({
        code: 'catalog.unadvertisedRecord',
        path: `$.records[${recordIndex}].recordId`,
        message: `API record ${record.recordId} is not advertised by the package index`,
      });
    }
  });

  if (options?.requireAllApiRecords !== false) {
    for (const descriptor of descriptors.values()) {
      if (!loadedRecords.has(descriptor.id)) {
        diagnostics.push({
          code: 'catalog.missingRecord',
          path: '$.index.records',
          message: `Advertised API record ${descriptor.id} was not supplied`,
        });
      }
    }
  }

  const selectedRecordIds = new Set(options?.selectedRecordIds ?? []);
  if (options?.requireAllApiRecords === false) {
    for (const recordId of selectedRecordIds) {
      if (!descriptors.has(recordId)) {
        diagnostics.push({
          code: 'catalog.selectedRecord',
          path: '$.options.selectedRecordIds',
          message: `Selected API record ${recordId} is not advertised by the package index`,
        });
      }
    }
  }

  index.exports.forEach((route, routeIndex) => {
    if (route.target.kind === 'dependency') {
      return;
    }

    const target = route.target;
    const descriptor = descriptors.get(target.record);
    if (
      descriptor &&
      ((target.kind === 'local' && descriptor.source) || (target.kind === 'bundled' && !descriptor.source))
    ) {
      diagnostics.push({
        code: 'reference.recordSource',
        path: `$.index.exports[${routeIndex}].target.record`,
        message:
          target.kind === 'bundled'
            ? `Bundled target record ${target.record} requires dependency source provenance`
            : `Local target record ${target.record} cannot use dependency source provenance`,
      });
    }
    const record = loadedRecords.get(target.record);
    if (!record) {
      if (options?.requireAllApiRecords === false && !selectedRecordIds.has(target.record)) {
        return;
      }
      diagnostics.push({
        code: 'reference.record',
        path: `$.index.exports[${routeIndex}].target.record`,
        message: `Local target record ${target.record} is unavailable`,
      });
      return;
    }

    const symbol = record.symbols.find(candidate => candidate.id === target.symbol);
    if (!symbol) {
      diagnostics.push({
        code: 'reference.symbol',
        path: `$.index.exports[${routeIndex}].target.symbol`,
        message: `Local target symbol ${target.symbol} does not exist in ${target.record}`,
      });
    } else if (!symbol.namespaces.includes(route.namespace)) {
      diagnostics.push({
        code: 'reference.namespace',
        path: `$.index.exports[${routeIndex}].namespace`,
        message: `Route namespace ${route.namespace} is not declared by symbol ${target.symbol}`,
      });
    }
  });

  records.forEach((record, recordIndex) => {
    record.symbols.forEach((symbol, symbolIndex) => {
      forEachSymbolReference(symbol, (reference, path) => {
        if (reference.kind !== 'local') {
          return;
        }

        const targetRecordId = reference.record ?? record.recordId;
        const targetRecord = loadedRecords.get(targetRecordId);
        if (!targetRecord) {
          diagnostics.push({
            code: 'reference.record',
            path: `$.records[${recordIndex}].symbols[${symbolIndex}]${path}`,
            message: `Local reference record ${targetRecordId} is unavailable`,
          });
          return;
        }

        if (!targetRecord.symbols.some(candidate => candidate.id === reference.symbol)) {
          diagnostics.push({
            code: 'reference.symbol',
            path: `$.records[${recordIndex}].symbols[${symbolIndex}]${path}`,
            message: `Local reference symbol ${reference.symbol} does not exist in ${targetRecordId}`,
          });
        }
      });
    });
  });

  if (diagnostics.length > 0) {
    return { valid: false, diagnostics };
  }

  return { valid: true, value: { index, records }, diagnostics: [] };
}

export function assertValidMetadataDocument(input: unknown, options?: ValidationOptions): MetadataDocument {
  return assertResult(validateMetadataDocument(input, options));
}

export function assertValidPackageIndex(input: unknown, options?: ValidationOptions): PackageIndex {
  return assertResult(validatePackageIndex(input, options));
}

export function assertValidApiRecord(input: unknown, options?: ValidationOptions): ApiRecord {
  return assertResult(validateApiRecord(input, options));
}

function validatePackageIndexValue(input: unknown, context: ValidationContext, path: string): PackageIndex | undefined {
  const object = expectObject(
    input,
    context,
    path,
    [
      'kind',
      'schema',
      'generator',
      'package',
      'system',
      'capabilities',
      'completeness',
      'declarationInputs',
      'records',
      'exports',
      'diagnostics',
    ],
    [
      'kind',
      'schema',
      'generator',
      'package',
      'capabilities',
      'completeness',
      'declarationInputs',
      'records',
      'exports',
      'diagnostics',
    ],
  );
  if (!object) {
    return undefined;
  }

  expectLiteral(object.kind, 'package-index', context, `${path}.kind`);
  validateSchema(object.schema, context, `${path}.schema`);
  validateGenerator(object.generator, context, `${path}.generator`);
  validatePackage(object.package, context, `${path}.package`);
  optionalString(object.system, context, `${path}.system`, ID);
  validateCapabilities(object.capabilities, context, `${path}.capabilities`);
  validateCompleteness(object.completeness, context, `${path}.completeness`);
  const declarationInputs = validateArray(
    object.declarationInputs,
    context,
    `${path}.declarationInputs`,
    validateDeclarationInput,
  );
  const records = validateArray(object.records, context, `${path}.records`, validateRecordDescriptor);
  const routes = validateArray(object.exports, context, `${path}.exports`, validateExportRoute);
  validateArray(object.diagnostics, context, `${path}.diagnostics`, validateMetadataDiagnostic);

  if (records && records.length > context.bounds.maxRecords) {
    context.issue('bounds.records', `${path}.records`, `Index exceeds ${context.bounds.maxRecords} records`);
  }
  if (routes && routes.length > context.bounds.maxRoutes) {
    context.issue('bounds.routes', `${path}.exports`, `Index exceeds ${context.bounds.maxRoutes} export routes`);
  }

  validateUnique(records, item => item.id, context, `${path}.records`, 'record ID');
  validateUnique(records, item => item.path, context, `${path}.records`, 'record path');
  validateUnique(routes, item => item.id, context, `${path}.exports`, 'route ID');
  validateUnique(
    routes,
    item => `${item.entrypoint}\0${item.export}\0${item.namespace}\0${item.conditions.join('\0')}`,
    context,
    `${path}.exports`,
    'entrypoint/export/namespace/conditions route',
  );

  const descriptors = new Map(records?.map(record => [record.id, record]));
  const declarationInputKeys = new Set(
    declarationInputs?.map(declaration => `${declaration.path}\0${declaration.conditions.join(',')}`),
  );
  routes?.forEach((route, index) => {
    for (const declarationPath of route.declarationInputs ?? []) {
      if (!declarationInputKeys.has(`${declarationPath}\0${route.conditions.join(',')}`)) {
        context.issue(
          'reference.declarationInput',
          `${path}.exports[${index}].declarationInputs`,
          `Route declaration input ${declarationPath} is not advertised by the package index for its conditions`,
        );
      }
    }
    if (route.target.kind === 'dependency') {
      return;
    }

    const descriptor = descriptors.get(route.target.record);
    if (!descriptor || descriptor.kind !== 'api') {
      context.issue(
        'reference.record',
        `${path}.exports[${index}].target.record`,
        `Local export target ${route.target.record} must identify an API record`,
      );
      return;
    }

    if (descriptor.symbols && !descriptor.symbols.includes(route.target.symbol)) {
      context.issue(
        'reference.symbol',
        `${path}.exports[${index}].target.symbol`,
        `Symbol ${route.target.symbol} is not advertised by record ${route.target.record}`,
      );
    }
    if ((route.target.kind === 'local') === Boolean(descriptor.source)) {
      context.issue(
        'reference.recordSource',
        `${path}.exports[${index}].target.record`,
        route.target.kind === 'bundled'
          ? `Bundled export target ${route.target.record} requires dependency source provenance`
          : `Local export target ${route.target.record} cannot use dependency source provenance`,
      );
    }
  });

  return object as unknown as PackageIndex;
}

function validateApiRecordValue(input: unknown, context: ValidationContext, path: string): ApiRecord | undefined {
  const object = expectObject(
    input,
    context,
    path,
    [
      'kind',
      'schema',
      'generator',
      'package',
      'recordId',
      'declarationInputs',
      'dependencyInputs',
      'completeness',
      'symbols',
      'diagnostics',
    ],
    [
      'kind',
      'schema',
      'generator',
      'package',
      'recordId',
      'declarationInputs',
      'dependencyInputs',
      'completeness',
      'symbols',
      'diagnostics',
    ],
  );
  if (!object) {
    return undefined;
  }

  expectLiteral(object.kind, 'api-record', context, `${path}.kind`);
  validateSchema(object.schema, context, `${path}.schema`);
  validateGenerator(object.generator, context, `${path}.generator`);
  validatePackage(object.package, context, `${path}.package`);
  expectString(object.recordId, context, `${path}.recordId`, ID);
  validateArray(object.declarationInputs, context, `${path}.declarationInputs`, validateDeclarationInput);
  validateArray(object.dependencyInputs, context, `${path}.dependencyInputs`, validateDependencyInput);
  validateStatus(object.completeness, ['complete', 'partial', 'unavailable'], context, `${path}.completeness`);
  const symbols = validateArray(object.symbols, context, `${path}.symbols`, validateApiSymbol);
  validateArray(object.diagnostics, context, `${path}.diagnostics`, validateMetadataDiagnostic);

  if (symbols && symbols.length > context.bounds.maxSymbolsPerRecord) {
    context.issue('bounds.symbols', `${path}.symbols`, `Record exceeds ${context.bounds.maxSymbolsPerRecord} symbols`);
  }
  validateUnique(symbols, item => item.id, context, `${path}.symbols`, 'symbol ID');

  const localSymbols = new Set(symbols?.map(symbol => symbol.id));
  symbols?.forEach((symbol, symbolIndex) => {
    forEachSymbolReference(symbol, (reference, referencePath) => {
      if (reference.kind === 'local' && !reference.record && !localSymbols.has(reference.symbol)) {
        context.issue(
          'reference.symbol',
          `${path}.symbols[${symbolIndex}]${referencePath}`,
          `Local symbol ${reference.symbol} does not exist in this record`,
        );
      }
    });
  });

  return object as unknown as ApiRecord;
}

function validateSchema(input: unknown, context: ValidationContext, path: string): MetadataSchemaVersion | undefined {
  const object = expectObject(input, context, path, ['major', 'revision'], ['major', 'revision']);
  if (!object) {
    return undefined;
  }
  expectLiteral(object.major, 1, context, `${path}.major`);
  expectInteger(object.revision, context, `${path}.revision`, 0);
  return object as unknown as MetadataSchemaVersion;
}

function validateGenerator(input: unknown, context: ValidationContext, path: string): void {
  const object = expectObject(input, context, path, ['name', 'version'], ['name', 'version']);
  if (object) {
    expectString(object.name, context, `${path}.name`);
    expectString(object.version, context, `${path}.version`);
  }
}

function validatePackage(input: unknown, context: ValidationContext, path: string): PackageIdentity | undefined {
  const object = expectObject(input, context, path, ['name', 'version', 'integrity'], ['name', 'version']);
  if (!object) {
    return undefined;
  }
  expectString(object.name, context, `${path}.name`, PACKAGE_NAME);
  expectString(object.version, context, `${path}.version`);
  if (object.integrity !== undefined) {
    validateFingerprint(object.integrity, context, `${path}.integrity`);
  }
  return object as unknown as PackageIdentity;
}

function validateFingerprint(input: unknown, context: ValidationContext, path: string): Fingerprint | undefined {
  const object = expectObject(input, context, path, ['algorithm', 'value'], ['algorithm', 'value']);
  if (!object) {
    return undefined;
  }
  expectLiteral(object.algorithm, 'sha256', context, `${path}.algorithm`);
  expectString(object.value, context, `${path}.value`, FINGERPRINT);
  return object as unknown as Fingerprint;
}

function validateCapabilities(
  input: unknown,
  context: ValidationContext,
  path: string,
): MetadataCapabilities | undefined {
  const object = expectObject(
    input,
    context,
    path,
    ['api', 'effectiveTypes', 'guidance', 'search'],
    ['api', 'effectiveTypes', 'guidance', 'search'],
  );
  if (!object) {
    return undefined;
  }
  for (const key of ['api', 'effectiveTypes', 'guidance', 'search'] as const) {
    validateStatus(object[key], ['supported', 'partial', 'unsupported'], context, `${path}.${key}`);
  }
  return object as unknown as MetadataCapabilities;
}

function validateCompleteness(
  input: unknown,
  context: ValidationContext,
  path: string,
): MetadataCompleteness | undefined {
  const object = expectObject(input, context, path, ['api', 'guidance', 'search'], ['api', 'guidance', 'search']);
  if (!object) {
    return undefined;
  }
  for (const key of ['api', 'guidance', 'search'] as const) {
    validateStatus(object[key], ['complete', 'partial', 'unavailable'], context, `${path}.${key}`);
  }
  return object as unknown as MetadataCompleteness;
}

function validateStatus<TStatus extends string>(
  input: unknown,
  statuses: readonly TStatus[],
  context: ValidationContext,
  path: string,
): StatusDetail<TStatus> | undefined {
  const object = expectObject(input, context, path, ['status', 'reasons'], ['status']);
  if (!object) {
    return undefined;
  }
  const status = expectEnum(object.status, statuses, context, `${path}.status`);
  const reasons = optionalStringArray(object.reasons, context, `${path}.reasons`);
  if (status && status !== statuses[0] && (!reasons || reasons.length === 0)) {
    context.issue('status.reason', `${path}.reasons`, `Status ${status} requires at least one reason`);
  }
  return object as unknown as StatusDetail<TStatus>;
}

function validateDeclarationInput(
  input: unknown,
  context: ValidationContext,
  path: string,
): DeclarationInput | undefined {
  const object = expectObject(
    input,
    context,
    path,
    ['path', 'conditions', 'fingerprint'],
    ['path', 'conditions', 'fingerprint'],
  );
  if (!object) {
    return undefined;
  }
  expectSafePath(object.path, context, `${path}.path`);
  validateConditions(object.conditions, context, `${path}.conditions`);
  validateFingerprint(object.fingerprint, context, `${path}.fingerprint`);
  return object as unknown as DeclarationInput;
}

function validateDependencyInput(
  input: unknown,
  context: ValidationContext,
  path: string,
): DependencyInput | undefined {
  const object = expectObject(
    input,
    context,
    path,
    ['requested', 'package', 'entrypoint', 'conditions', 'declarationPath', 'declarationFingerprint'],
    ['requested', 'package', 'entrypoint', 'conditions', 'declarationFingerprint'],
  );
  if (!object) {
    return undefined;
  }
  expectString(object.requested, context, `${path}.requested`);
  validatePackage(object.package, context, `${path}.package`);
  expectEntrypoint(object.entrypoint, context, `${path}.entrypoint`);
  validateConditions(object.conditions, context, `${path}.conditions`);
  if (object.declarationPath !== undefined) {
    expectSafePath(object.declarationPath, context, `${path}.declarationPath`);
  }
  validateFingerprint(object.declarationFingerprint, context, `${path}.declarationFingerprint`);
  return object as unknown as DependencyInput;
}

function validateRecordDescriptor(
  input: unknown,
  context: ValidationContext,
  path: string,
): MetadataRecordDescriptor | undefined {
  const object = expectObject(
    input,
    context,
    path,
    ['id', 'kind', 'path', 'fingerprint', 'symbols', 'source'],
    ['id', 'kind', 'path', 'fingerprint'],
  );
  if (!object) {
    return undefined;
  }
  expectString(object.id, context, `${path}.id`, ID);
  const kind = expectEnum(object.kind, ['api', 'guidance', 'search'], context, `${path}.kind`);
  expectSafePath(object.path, context, `${path}.path`);
  validateFingerprint(object.fingerprint, context, `${path}.fingerprint`);
  const symbols = optionalStringArray(object.symbols, context, `${path}.symbols`, ID);
  if (object.source !== undefined) {
    validateBundledRecordSource(object.source, context, `${path}.source`);
  }
  if (kind === 'api' && (!symbols || symbols.length === 0)) {
    context.issue('record.symbols', `${path}.symbols`, 'API record descriptors require advertised symbol IDs');
  }
  validateUnique(symbols, value => value, context, `${path}.symbols`, 'symbol ID');
  return object as unknown as MetadataRecordDescriptor;
}

function validateBundledRecordSource(
  input: unknown,
  context: ValidationContext,
  path: string,
): BundledRecordSource | undefined {
  const object = expectObject(input, context, path, ['kind', 'packages'], ['kind', 'packages']);
  if (!object) {
    return undefined;
  }
  expectLiteral(object.kind, 'dependency', context, `${path}.kind`);
  const packages = validateArray(object.packages, context, `${path}.packages`, validateBundledPackageSource);
  if (packages?.length === 0) {
    context.issue('source.packages', `${path}.packages`, 'Bundled record source requires at least one package');
  }
  return object as unknown as BundledRecordSource;
}

function validateBundledPackageSource(
  input: unknown,
  context: ValidationContext,
  path: string,
): BundledPackageSource | undefined {
  const object = expectObject(
    input,
    context,
    path,
    ['requested', 'package', 'declarationInputs'],
    ['requested', 'package', 'declarationInputs'],
  );
  if (!object) {
    return undefined;
  }
  expectString(object.requested, context, `${path}.requested`, PACKAGE_NAME);
  validatePackage(object.package, context, `${path}.package`);
  const inputs = validateArray(
    object.declarationInputs,
    context,
    `${path}.declarationInputs`,
    validateDeclarationInput,
  );
  if (inputs?.length === 0) {
    context.issue(
      'source.declarationInputs',
      `${path}.declarationInputs`,
      'Bundled package source requires declaration inputs',
    );
  }
  return object as unknown as BundledPackageSource;
}

function validateExportRoute(input: unknown, context: ValidationContext, path: string): ExportRoute | undefined {
  const object = expectObject(
    input,
    context,
    path,
    [
      'id',
      'entrypoint',
      'export',
      'namespace',
      'conditions',
      'exportKind',
      'importedName',
      'typeOnly',
      'declarationInputs',
      'target',
      'classifications',
    ],
    ['id', 'entrypoint', 'export', 'namespace', 'conditions', 'exportKind', 'typeOnly', 'target', 'classifications'],
  );
  if (!object) {
    return undefined;
  }
  expectString(object.id, context, `${path}.id`, ID);
  expectEntrypoint(object.entrypoint, context, `${path}.entrypoint`);
  const exportName = expectExportName(object.export, context, `${path}.export`);
  const namespace = expectEnum(object.namespace, ['type', 'value'], context, `${path}.namespace`);
  validateConditions(object.conditions, context, `${path}.conditions`);
  const exportKind = expectEnum(object.exportKind, ['default', 'named', 'namespace'], context, `${path}.exportKind`);
  optionalExportName(object.importedName, context, `${path}.importedName`);
  expectBoolean(object.typeOnly, context, `${path}.typeOnly`);
  if (object.declarationInputs !== undefined) {
    const declarationInputs = validateArray(
      object.declarationInputs,
      context,
      `${path}.declarationInputs`,
      (value, ctx, itemPath) => expectSafePath(value, ctx, itemPath),
    );
    validateUnique(
      declarationInputs?.filter((value): value is string => typeof value === 'string'),
      value => value,
      context,
      `${path}.declarationInputs`,
      'declaration input path',
    );
  }
  const target = validateExportTarget(object.target, context, `${path}.target`);
  validateArray(object.classifications, context, `${path}.classifications`, validateClassification);

  if (exportKind === 'default' && exportName !== 'default') {
    context.issue('route.exportKind', `${path}.export`, 'Default exports must use the export name "default"');
  }
  if (exportKind === 'namespace' && namespace !== 'value') {
    context.issue(
      'route.namespaceExport',
      `${path}.namespace`,
      'Namespace export bindings exist in the value namespace',
    );
  }
  if (target?.kind === 'dependency' && namespace && target.namespace !== namespace) {
    context.issue(
      'reference.namespace',
      `${path}.target.namespace`,
      'Dependency target namespace must match its route',
    );
  }
  return object as unknown as ExportRoute;
}

function validateExportTarget(input: unknown, context: ValidationContext, path: string): ExportTarget | undefined {
  if (!isObject(input)) {
    context.issue('type.object', path, 'Expected an object');
    return undefined;
  }
  if (input.kind === 'local') {
    const object = expectObject(input, context, path, ['kind', 'record', 'symbol'], ['kind', 'record', 'symbol']);
    if (!object) {
      return undefined;
    }
    expectString(object.record, context, `${path}.record`, ID);
    expectString(object.symbol, context, `${path}.symbol`, ID);
    return object as unknown as ExportTarget;
  }
  if (input.kind === 'bundled') {
    const object = expectObject(input, context, path, ['kind', 'record', 'symbol'], ['kind', 'record', 'symbol']);
    if (!object) {
      return undefined;
    }
    expectString(object.record, context, `${path}.record`, ID);
    expectString(object.symbol, context, `${path}.symbol`, ID);
    return object as unknown as ExportTarget;
  }
  if (input.kind === 'dependency') {
    const object = expectObject(
      input,
      context,
      path,
      ['kind', 'package', 'entrypoint', 'export', 'namespace', 'requested', 'range', 'dependencyRole', 'buildPackage'],
      ['kind', 'package', 'entrypoint', 'export', 'namespace'],
    );
    if (!object) {
      return undefined;
    }
    expectString(object.package, context, `${path}.package`, PACKAGE_NAME);
    expectEntrypoint(object.entrypoint, context, `${path}.entrypoint`);
    expectExportName(object.export, context, `${path}.export`);
    expectEnum(object.namespace, ['type', 'value'], context, `${path}.namespace`);
    optionalString(object.requested, context, `${path}.requested`);
    optionalString(object.range, context, `${path}.range`);
    if (object.dependencyRole !== undefined) {
      expectEnum(
        object.dependencyRole,
        ['dependency', 'devDependency', 'optionalDependency', 'peerDependency'],
        context,
        `${path}.dependencyRole`,
      );
    }
    if (object.buildPackage !== undefined) {
      validatePackage(object.buildPackage, context, `${path}.buildPackage`);
    }
    return object as unknown as ExportTarget;
  }
  context.issue('target.kind', `${path}.kind`, 'Expected local, bundled, or dependency target');
  return undefined;
}

function validateApiSymbol(input: unknown, context: ValidationContext, path: string): ApiSymbol | undefined {
  const object = expectObject(
    input,
    context,
    path,
    [
      'id',
      'name',
      'namespaces',
      'declarations',
      'type',
      'relationships',
      'effectiveType',
      'props',
      'classifications',
      'fingerprint',
    ],
    ['id', 'name', 'namespaces', 'declarations', 'relationships', 'classifications', 'fingerprint'],
  );
  if (!object) {
    return undefined;
  }
  expectString(object.id, context, `${path}.id`, ID);
  expectString(object.name, context, `${path}.name`);
  const namespaces = validateNamespaces(object.namespaces, context, `${path}.namespaces`);
  const declarations = validateArray(object.declarations, context, `${path}.declarations`, validateDeclaration);
  if (declarations?.length === 0) {
    context.issue('symbol.declarations', `${path}.declarations`, 'Symbols require at least one declaration');
  }
  if (object.type !== undefined) {
    validateTypeExpression(object.type, context, `${path}.type`);
  }
  validateArray(object.relationships, context, `${path}.relationships`, validateRelationship);
  const effectiveType =
    object.effectiveType === undefined
      ? undefined
      : validateEffectiveType(object.effectiveType, context, `${path}.effectiveType`);
  if (object.props !== undefined) {
    const props = validateArray(object.props, context, `${path}.props`, (value, ctx, itemPath) => {
      const prop = expectObject(value, ctx, itemPath, ['signature', 'type'], ['signature', 'type']);
      if (!prop) {
        return undefined;
      }
      const signature = expectString(prop.signature, ctx, `${itemPath}.signature`, ID);
      const type = validateEffectiveType(prop.type, ctx, `${itemPath}.type`);
      if (!signature || !type) {
        return undefined;
      }
      const signatures = effectiveType?.signatures;
      if (
        (!isObject(type.status) || type.status.status !== 'unsupported') &&
        !(
          Array.isArray(signatures) &&
          signatures.some(item => isObject(item) && item.id === signature && item.kind === 'call')
        )
      ) {
        ctx.issue('reference.signature', `${itemPath}.signature`, 'Props must reference a component call signature');
      }
      return { signature, type };
    });
    validateUnique(props, prop => prop.signature, context, `${path}.props`, 'props signature');
  }
  validateArray(object.classifications, context, `${path}.classifications`, validateClassification);
  validateFingerprint(object.fingerprint, context, `${path}.fingerprint`);

  declarations?.forEach((declaration, index) => {
    for (const namespace of declaration.namespaces) {
      if (!namespaces?.includes(namespace)) {
        context.issue(
          'declaration.namespace',
          `${path}.declarations[${index}].namespaces`,
          `Declaration namespace ${namespace} is absent from its symbol`,
        );
      }
    }
  });
  validateUnique(declarations, declaration => declaration.id, context, `${path}.declarations`, 'declaration ID');
  return object as unknown as ApiSymbol;
}

function validateDeclaration(input: unknown, context: ValidationContext, path: string): ApiDeclaration | undefined {
  const object = expectObject(
    input,
    context,
    path,
    ['id', 'kind', 'namespaces', 'source', 'type', 'signatures', 'relationships', 'documentation', 'deprecated'],
    ['id', 'kind', 'namespaces', 'source'],
  );
  if (!object) {
    return undefined;
  }
  expectString(object.id, context, `${path}.id`, ID);
  expectEnum(
    object.kind,
    [
      'class',
      'const',
      'constructor',
      'enum',
      'function',
      'interface',
      'method',
      'namespace',
      'property',
      'type-alias',
      'variable',
    ],
    context,
    `${path}.kind`,
  );
  validateNamespaces(object.namespaces, context, `${path}.namespaces`);
  validateSourceLocation(object.source, context, `${path}.source`);
  if (object.type !== undefined) {
    validateTypeExpression(object.type, context, `${path}.type`);
  }
  if (object.signatures !== undefined) {
    const signatures = validateArray(object.signatures, context, `${path}.signatures`, validateSignature);
    validateUnique(signatures, signature => signature.id, context, `${path}.signatures`, 'signature ID');
  }
  if (object.relationships !== undefined) {
    validateArray(object.relationships, context, `${path}.relationships`, validateRelationship);
  }
  optionalString(object.documentation, context, `${path}.documentation`);
  optionalString(object.deprecated, context, `${path}.deprecated`);
  return object as unknown as ApiDeclaration;
}

function validateSourceLocation(input: unknown, context: ValidationContext, path: string): SourceLocation | undefined {
  const object = expectObject(input, context, path, ['file', 'start', 'end'], ['file']);
  if (!object) {
    return undefined;
  }
  expectSafePath(object.file, context, `${path}.file`);
  const start = optionalInteger(object.start, context, `${path}.start`, 0);
  const end = optionalInteger(object.end, context, `${path}.end`, 0);
  if (start !== undefined && end !== undefined && end < start) {
    context.issue('source.range', `${path}.end`, 'Source end must not precede source start');
  }
  return object as unknown as SourceLocation;
}

function validateTypeExpression(input: unknown, context: ValidationContext, path: string): TypeExpression | undefined {
  const object = expectObject(input, context, path, ['text', 'references'], ['text', 'references']);
  if (!object) {
    return undefined;
  }
  const text = expectString(object.text, context, `${path}.text`);
  const references = validateArray(object.references, context, `${path}.references`, validateReferenceSpan);
  if (references && references.length > context.bounds.maxReferenceSpans) {
    context.issue(
      'bounds.references',
      `${path}.references`,
      `Type expression exceeds ${context.bounds.maxReferenceSpans} reference spans`,
    );
  }

  let previousEnd = -1;
  references?.forEach((reference, index) => {
    if (text !== undefined && reference.end > text.length) {
      context.issue('reference.range', `${path}.references[${index}].end`, 'Reference span exceeds type expression');
    }
    if (reference.start < previousEnd) {
      context.issue(
        'reference.order',
        `${path}.references[${index}].start`,
        'Reference spans must be ordered and non-overlapping',
      );
    }
    previousEnd = reference.end;
  });
  return object as unknown as TypeExpression;
}

function validateReferenceSpan(
  input: unknown,
  context: ValidationContext,
  path: string,
): TypeReferenceSpan | undefined {
  const object = expectObject(
    input,
    context,
    path,
    ['start', 'end', 'status', 'target', 'reason'],
    ['start', 'end', 'status'],
  );
  if (!object) {
    return undefined;
  }
  const start = expectInteger(object.start, context, `${path}.start`, 0);
  const end = expectInteger(object.end, context, `${path}.end`, 1);
  const status = expectEnum(object.status, ['resolved', 'unresolved', 'unsupported'], context, `${path}.status`);
  if (start !== undefined && end !== undefined && end <= start) {
    context.issue('reference.range', `${path}.end`, 'Reference end must be greater than start');
  }
  if (object.target !== undefined) {
    validateSymbolReference(object.target, context, `${path}.target`);
  }
  optionalString(object.reason, context, `${path}.reason`);
  if (status === 'resolved' && object.target === undefined) {
    context.issue('reference.target', `${path}.target`, 'Resolved references require a target');
  }
  if (status !== 'resolved' && object.reason === undefined) {
    context.issue('reference.reason', `${path}.reason`, `${status} references require a reason`);
  }
  return object as unknown as TypeReferenceSpan;
}

function validateSymbolReference(
  input: unknown,
  context: ValidationContext,
  path: string,
): SymbolReference | undefined {
  if (!isObject(input)) {
    context.issue('type.object', path, 'Expected an object');
    return undefined;
  }
  if (input.kind === 'local') {
    const object = expectObject(input, context, path, ['kind', 'symbol', 'record'], ['kind', 'symbol']);
    if (!object) {
      return undefined;
    }
    expectString(object.symbol, context, `${path}.symbol`, ID);
    optionalString(object.record, context, `${path}.record`, ID);
    return object as unknown as SymbolReference;
  }
  if (input.kind === 'dependency') {
    const object = expectObject(
      input,
      context,
      path,
      ['kind', 'package', 'entrypoint', 'export', 'namespace'],
      ['kind', 'package', 'entrypoint', 'export', 'namespace'],
    );
    if (!object) {
      return undefined;
    }
    expectString(object.package, context, `${path}.package`, PACKAGE_NAME);
    expectEntrypoint(object.entrypoint, context, `${path}.entrypoint`);
    expectExportName(object.export, context, `${path}.export`);
    expectEnum(object.namespace, ['type', 'value'], context, `${path}.namespace`);
    return object as unknown as SymbolReference;
  }
  context.issue('reference.kind', `${path}.kind`, 'Expected local or dependency reference');
  return undefined;
}

function validateSignature(input: unknown, context: ValidationContext, path: string): ApiSignature | undefined {
  const object = expectObject(
    input,
    context,
    path,
    ['id', 'kind', 'typeParameters', 'parameters', 'returnType', 'overload', 'documentation', 'deprecated', 'source'],
    ['id', 'kind', 'typeParameters', 'parameters', 'returnType', 'overload'],
  );
  if (!object) {
    return undefined;
  }
  expectString(object.id, context, `${path}.id`, ID);
  expectEnum(object.kind, ['call', 'construct', 'method'], context, `${path}.kind`);
  validateArray(object.typeParameters, context, `${path}.typeParameters`, (value, ctx, itemPath) => {
    const parameter = expectObject(value, ctx, itemPath, ['name', 'constraint', 'default'], ['name']);
    if (!parameter) {
      return undefined;
    }
    expectString(parameter.name, ctx, `${itemPath}.name`, IDENTIFIER);
    if (parameter.constraint !== undefined) {
      validateTypeExpression(parameter.constraint, ctx, `${itemPath}.constraint`);
    }
    if (parameter.default !== undefined) {
      validateTypeExpression(parameter.default, ctx, `${itemPath}.default`);
    }
    return parameter;
  });
  validateArray(object.parameters, context, `${path}.parameters`, (value, ctx, itemPath) => {
    const parameter = expectObject(
      value,
      ctx,
      itemPath,
      ['name', 'type', 'optional', 'rest'],
      ['name', 'type', 'optional', 'rest'],
    );
    if (!parameter) {
      return undefined;
    }
    expectString(parameter.name, ctx, `${itemPath}.name`);
    validateTypeExpression(parameter.type, ctx, `${itemPath}.type`);
    expectBoolean(parameter.optional, ctx, `${itemPath}.optional`);
    expectBoolean(parameter.rest, ctx, `${itemPath}.rest`);
    return parameter;
  });
  validateTypeExpression(object.returnType, context, `${path}.returnType`);
  expectInteger(object.overload, context, `${path}.overload`, 0);
  optionalString(object.documentation, context, `${path}.documentation`);
  optionalString(object.deprecated, context, `${path}.deprecated`);
  if (object.source !== undefined) {
    validateSourceLocation(object.source, context, `${path}.source`);
  }
  return object as unknown as ApiSignature;
}

function validateRelationship(input: unknown, context: ValidationContext, path: string): TypeRelationship | undefined {
  const object = expectObject(input, context, path, ['kind', 'type'], ['kind', 'type']);
  if (!object) {
    return undefined;
  }
  expectEnum(
    object.kind,
    ['alias', 'conditional', 'extends', 'indexed-access', 'intersection', 'mapped', 'union'],
    context,
    `${path}.kind`,
  );
  validateTypeExpression(object.type, context, `${path}.type`);
  return object as unknown as TypeRelationship;
}

function validateEffectiveType(
  input: unknown,
  context: ValidationContext,
  path: string,
): EffectiveTypeView | undefined {
  const object = expectObject(
    input,
    context,
    path,
    ['status', 'type', 'members', 'signatures', 'unionBranches'],
    ['status', 'members', 'signatures'],
  );
  if (!object) {
    return undefined;
  }
  validateStatus(object.status, ['complete', 'partial', 'unsupported'], context, `${path}.status`);
  if (object.type !== undefined) {
    validateTypeExpression(object.type, context, `${path}.type`);
  }
  validateArray(object.members, context, `${path}.members`, validateEffectiveMember);
  const signatures = validateArray(object.signatures, context, `${path}.signatures`, validateSignature);
  validateUnique(signatures, signature => signature.id, context, `${path}.signatures`, 'signature ID');
  if (object.unionBranches !== undefined) {
    validateArray(object.unionBranches, context, `${path}.unionBranches`, validateTypeExpression);
  }
  return object as unknown as EffectiveTypeView;
}

function validateEffectiveMember(
  input: unknown,
  context: ValidationContext,
  path: string,
): EffectiveMember | undefined {
  const object = expectObject(
    input,
    context,
    path,
    [
      'name',
      'kind',
      'optional',
      'readonly',
      'type',
      'signatures',
      'sources',
      'declarationPackages',
      'defaultValue',
      'presentation',
      'status',
      'documentation',
      'deprecated',
    ],
    ['name', 'kind', 'optional', 'readonly', 'sources', 'status'],
  );
  if (!object) {
    return undefined;
  }
  expectString(object.name, context, `${path}.name`);
  expectEnum(object.kind, ['property', 'method', 'index'], context, `${path}.kind`);
  expectBoolean(object.optional, context, `${path}.optional`);
  expectBoolean(object.readonly, context, `${path}.readonly`);
  if (object.type !== undefined) {
    validateTypeExpression(object.type, context, `${path}.type`);
  }
  if (object.signatures !== undefined) {
    validateArray(object.signatures, context, `${path}.signatures`, validateSignature);
  }
  const sources = validateArray(object.sources, context, `${path}.sources`, validateSymbolReference);
  if (sources?.length === 0) {
    context.issue('member.sources', `${path}.sources`, 'Effective members require at least one source');
  }
  if (object.declarationPackages !== undefined) {
    const packages = optionalStringArray(
      object.declarationPackages,
      context,
      `${path}.declarationPackages`,
      PACKAGE_NAME,
    );
    if (packages?.length === 0) {
      context.issue(
        'member.declarationPackages',
        `${path}.declarationPackages`,
        'Declaration provenance requires at least one package',
      );
    }
    validateUnique(packages, value => value, context, `${path}.declarationPackages`, 'declaration package');
  }
  optionalString(object.defaultValue, context, `${path}.defaultValue`);
  if (object.presentation !== undefined) {
    validateSlotPresentation(object.presentation, context, `${path}.presentation`);
    if (object.type === undefined || object.kind !== 'property') {
      context.issue(
        'member.presentation',
        `${path}.presentation`,
        'Slot presentation requires a property with its full effective type',
      );
    }
  }
  validateStatus(object.status, ['complete', 'partial', 'unsupported'], context, `${path}.status`);
  optionalString(object.documentation, context, `${path}.documentation`);
  optionalString(object.deprecated, context, `${path}.deprecated`);
  return object as unknown as EffectiveMember;
}

function validateSlotPresentation(
  input: unknown,
  context: ValidationContext,
  path: string,
): SlotPresentation | undefined {
  const object = expectObject(
    input,
    context,
    path,
    ['kind', 'summary', 'basis', 'slotType', 'targets', 'nullable'],
    ['kind', 'summary', 'basis', 'slotType', 'targets'],
  );
  if (!object) {
    return undefined;
  }
  expectEnum(object.kind, ['slot'], context, `${path}.kind`);
  expectString(object.summary, context, `${path}.summary`);
  expectEnum(object.basis, ['declaration', 'semantic'], context, `${path}.basis`);
  validateSymbolReference(object.slotType, context, `${path}.slotType`);
  if (object.nullable !== undefined) {
    expectBoolean(object.nullable, context, `${path}.nullable`);
  }
  const targets = validateArray(
    object.targets,
    context,
    `${path}.targets`,
    (targetInput, ctx, targetPath): SlotTarget | undefined => {
      const target = expectObject(
        targetInput,
        ctx,
        targetPath,
        ['kind', 'name', 'role', 'reference'],
        ['kind', 'name', 'role'],
      );
      if (!target) {
        return undefined;
      }
      const kind = expectEnum(target.kind, ['intrinsic', 'component'], ctx, `${targetPath}.kind`);
      expectString(target.name, ctx, `${targetPath}.name`);
      expectEnum(target.role, kind === 'component' ? ['default'] : ['default', 'alternate'], ctx, `${targetPath}.role`);
      if (kind === 'component') {
        validateSymbolReference(target.reference, ctx, `${targetPath}.reference`);
      } else if (target.reference !== undefined) {
        ctx.issue('slot.target', `${targetPath}.reference`, 'Intrinsic targets do not reference component symbols');
      }
      return target as unknown as SlotTarget;
    },
  );
  validateUnique(targets, target => JSON.stringify(target), context, `${path}.targets`, 'slot target');
  return object as unknown as SlotPresentation;
}

function validateClassification(
  input: unknown,
  context: ValidationContext,
  path: string,
): SymbolClassification | undefined {
  const object = expectObject(
    input,
    context,
    path,
    ['facet', 'confidence', 'evidence'],
    ['facet', 'confidence', 'evidence'],
  );
  if (!object) {
    return undefined;
  }
  expectEnum(
    object.facet,
    ['component', 'context', 'hook', 'props', 'render', 'slots', 'state', 'utility'],
    context,
    `${path}.facet`,
  );
  expectEnum(object.confidence, ['authored', 'heuristic'], context, `${path}.confidence`);
  const evidence = optionalStringArray(object.evidence, context, `${path}.evidence`);
  if (!evidence || evidence.length === 0) {
    context.issue('classification.evidence', `${path}.evidence`, 'Classifications require evidence');
  }
  return object as unknown as SymbolClassification;
}

function validateMetadataDiagnostic(
  input: unknown,
  context: ValidationContext,
  path: string,
): MetadataDiagnostic | undefined {
  const object = expectObject(
    input,
    context,
    path,
    ['code', 'severity', 'message', 'path', 'symbol'],
    ['code', 'severity', 'message'],
  );
  if (!object) {
    return undefined;
  }
  expectString(object.code, context, `${path}.code`, ID);
  expectEnum(object.severity, ['info', 'warning', 'error'], context, `${path}.severity`);
  expectString(object.message, context, `${path}.message`);
  optionalString(object.path, context, `${path}.path`);
  optionalString(object.symbol, context, `${path}.symbol`, ID);
  return object as unknown as MetadataDiagnostic;
}

function validateConditions(input: unknown, context: ValidationContext, path: string): string[] | undefined {
  const conditions = validateArray(input, context, path, (value, ctx, itemPath) =>
    expectString(value, ctx, itemPath, CONDITION),
  );
  if (conditions?.length === 0) {
    context.issue('condition.empty', path, 'At least one declaration resolution condition is required');
  }
  if (conditions && conditions.length > 16) {
    context.issue('condition.bounds', path, 'At most 16 declaration resolution conditions are allowed');
  }
  validateUnique(conditions, value => value, context, path, 'condition');
  return conditions;
}

function validateNamespaces(input: unknown, context: ValidationContext, path: string): MetadataNamespace[] | undefined {
  const namespaces = validateArray<MetadataNamespace>(input, context, path, (value, ctx, itemPath) =>
    expectEnum(value, ['type', 'value'], ctx, itemPath),
  );
  if (namespaces?.length === 0) {
    context.issue('namespace.empty', path, 'At least one namespace is required');
  }
  validateUnique(namespaces, value => value, context, path, 'namespace');
  return namespaces;
}

function forEachSymbolReference(symbol: ApiSymbol, visitor: (reference: SymbolReference, path: string) => void): void {
  const visitType = (type: TypeExpression | undefined, path: string): void => {
    type?.references.forEach((span, index) => {
      if (span.target) {
        visitor(span.target, `${path}.references[${index}].target`);
      }
    });
  };
  const visitSignature = (signature: ApiSignature, path: string): void => {
    signature.typeParameters.forEach((parameter, index) => {
      visitType(parameter.constraint, `${path}.typeParameters[${index}].constraint`);
      visitType(parameter.default, `${path}.typeParameters[${index}].default`);
    });
    signature.parameters.forEach((parameter, index) => visitType(parameter.type, `${path}.parameters[${index}].type`));
    visitType(signature.returnType, `${path}.returnType`);
  };
  const visitRelationship = (relationship: TypeRelationship, path: string): void => visitType(relationship.type, path);

  visitType(symbol.type, '.type');
  symbol.relationships.forEach((relationship, index) =>
    visitRelationship(relationship, `.relationships[${index}].type`),
  );
  symbol.declarations.forEach((declaration, declarationIndex) => {
    visitType(declaration.type, `.declarations[${declarationIndex}].type`);
    declaration.relationships?.forEach((relationship, index) =>
      visitRelationship(relationship, `.declarations[${declarationIndex}].relationships[${index}].type`),
    );
    declaration.signatures?.forEach((signature, index) =>
      visitSignature(signature, `.declarations[${declarationIndex}].signatures[${index}]`),
    );
  });
  const visitEffectiveType = (effectiveType: EffectiveTypeView, path: string): void => {
    visitType(effectiveType.type, `${path}.type`);
    effectiveType.unionBranches?.forEach((type, index) => visitType(type, `${path}.unionBranches[${index}]`));
    effectiveType.signatures.forEach((signature, index) => visitSignature(signature, `${path}.signatures[${index}]`));
    effectiveType.members.forEach((member, memberIndex) => {
      member.sources.forEach((reference, index) =>
        visitor(reference, `${path}.members[${memberIndex}].sources[${index}]`),
      );
      visitType(member.type, `${path}.members[${memberIndex}].type`);
      if (member.presentation) {
        visitor(member.presentation.slotType, `${path}.members[${memberIndex}].presentation.slotType`);
        member.presentation.targets.forEach((target, index) => {
          if (target.kind === 'component') {
            visitor(target.reference, `${path}.members[${memberIndex}].presentation.targets[${index}].reference`);
          }
        });
      }
      member.signatures?.forEach((signature, index) =>
        visitSignature(signature, `${path}.members[${memberIndex}].signatures[${index}]`),
      );
    });
  };
  if (symbol.effectiveType) {
    visitEffectiveType(symbol.effectiveType, '.effectiveType');
  }
  symbol.props?.forEach((props, index) => visitEffectiveType(props.type, `.props[${index}].type`));
}

function expectObject(
  input: unknown,
  context: ValidationContext,
  path: string,
  allowedKeys: readonly string[],
  requiredKeys: readonly string[],
): ObjectValue | undefined {
  if (!isObject(input)) {
    context.issue('type.object', path, 'Expected an object');
    return undefined;
  }
  let valid = true;
  for (const key of Object.keys(input)) {
    if (!allowedKeys.includes(key)) {
      context.issue('structure.unknownProperty', `${path}.${key}`, `Unknown property ${key}`);
      valid = false;
    }
  }
  for (const key of requiredKeys) {
    if (!(key in input)) {
      context.issue('structure.required', `${path}.${key}`, `Missing required property ${key}`);
      valid = false;
    }
  }
  return valid ? input : undefined;
}

function validateArray<T>(
  input: unknown,
  context: ValidationContext,
  path: string,
  validator: (value: unknown, context: ValidationContext, path: string) => T | undefined,
): T[] | undefined {
  if (!Array.isArray(input)) {
    context.issue('type.array', path, 'Expected an array');
    return undefined;
  }
  const result: T[] = [];
  input.forEach((value, index) => {
    const checkpoint = context.checkpoint();
    const validated = validator(value, context, `${path}[${index}]`);
    if (validated !== undefined && !context.hasIssuesSince(checkpoint)) {
      result.push(validated);
    }
  });
  return result;
}

function expectString(input: unknown, context: ValidationContext, path: string, pattern?: RegExp): string | undefined {
  if (typeof input !== 'string' || input.length === 0) {
    context.issue('type.string', path, 'Expected a non-empty string');
    return undefined;
  }
  if (input.length > context.bounds.maxStringLength) {
    context.issue('bounds.string', path, `String exceeds ${context.bounds.maxStringLength} characters`);
  }
  if (pattern && !pattern.test(input)) {
    context.issue('string.format', path, `Invalid string format: ${input}`);
  }
  return input;
}

function optionalString(
  input: unknown,
  context: ValidationContext,
  path: string,
  pattern?: RegExp,
): string | undefined {
  return input === undefined ? undefined : expectString(input, context, path, pattern);
}

function optionalStringArray(
  input: unknown,
  context: ValidationContext,
  path: string,
  pattern?: RegExp,
): string[] | undefined {
  return input === undefined
    ? undefined
    : validateArray(input, context, path, (value, ctx, itemPath) => expectString(value, ctx, itemPath, pattern));
}

function expectBoolean(input: unknown, context: ValidationContext, path: string): boolean | undefined {
  if (typeof input !== 'boolean') {
    context.issue('type.boolean', path, 'Expected a boolean');
    return undefined;
  }
  return input;
}

function expectInteger(input: unknown, context: ValidationContext, path: string, minimum: number): number | undefined {
  if (!Number.isInteger(input) || (input as number) < minimum) {
    context.issue('type.integer', path, `Expected an integer greater than or equal to ${minimum}`);
    return undefined;
  }
  return input as number;
}

function optionalInteger(
  input: unknown,
  context: ValidationContext,
  path: string,
  minimum: number,
): number | undefined {
  return input === undefined ? undefined : expectInteger(input, context, path, minimum);
}

function expectEnum<T extends string>(
  input: unknown,
  values: readonly T[],
  context: ValidationContext,
  path: string,
): T | undefined {
  if (typeof input !== 'string' || !values.includes(input as T)) {
    context.issue('type.enum', path, `Expected one of: ${values.join(', ')}`);
    return undefined;
  }
  return input as T;
}

function expectLiteral<T extends string | number>(
  input: unknown,
  value: T,
  context: ValidationContext,
  path: string,
): T | undefined {
  if (input !== value) {
    context.issue('type.literal', path, `Expected ${JSON.stringify(value)}`);
    return undefined;
  }
  return value;
}

function expectEntrypoint(input: unknown, context: ValidationContext, path: string): string | undefined {
  const entrypoint = expectString(input, context, path);
  if (entrypoint && entrypoint !== '.' && !isSafeSubpath(entrypoint)) {
    context.issue('entrypoint.format', path, 'Entrypoint must be "." or a contained "./subpath"');
  }
  return entrypoint;
}

function expectSafePath(input: unknown, context: ValidationContext, path: string): string | undefined {
  const value = expectString(input, context, path);
  if (value && !isSafeRelativePath(value)) {
    context.issue('path.containment', path, 'Path must be a contained, portable relative path');
  }
  return value;
}

function expectExportName(input: unknown, context: ValidationContext, path: string): string | undefined {
  const value = expectString(input, context, path);
  if (value && value !== 'default' && value !== '*' && !IDENTIFIER.test(value)) {
    context.issue('export.format', path, `Invalid export name ${value}`);
  }
  return value;
}

function optionalExportName(input: unknown, context: ValidationContext, path: string): string | undefined {
  return input === undefined ? undefined : expectExportName(input, context, path);
}

function validateUnique<T>(
  values: readonly T[] | undefined,
  key: (value: T) => string,
  context: ValidationContext,
  path: string,
  label: string,
): void {
  const seen = new Set<string>();
  values?.forEach((value, index) => {
    const itemKey = key(value);
    if (seen.has(itemKey)) {
      context.issue('identity.duplicate', `${path}[${index}]`, `Duplicate ${label}: ${itemKey}`);
    }
    seen.add(itemKey);
  });
}

function isSafeSubpath(value: string): boolean {
  return value.startsWith('./') && isSafeRelativePath(value.slice(2));
}

function isSafeRelativePath(value: string): boolean {
  if (
    value.startsWith('/') ||
    value.startsWith('\\') ||
    value.includes('\\') ||
    value.includes('\0') ||
    value.includes('?') ||
    value.includes('#') ||
    /^[A-Za-z]:/.test(value)
  ) {
    return false;
  }
  const segments = value.split('/');
  return segments.length > 0 && segments.every(segment => segment.length > 0 && segment !== '.' && segment !== '..');
}

function isObject(input: unknown): input is ObjectValue {
  if (input === null || typeof input !== 'object' || Array.isArray(input)) {
    return false;
  }
  const prototype = Object.getPrototypeOf(input);
  return prototype === Object.prototype || prototype === null;
}

function samePackage(left: PackageIdentity, right: PackageIdentity): boolean {
  return (
    left.name === right.name &&
    left.version === right.version &&
    left.integrity?.algorithm === right.integrity?.algorithm &&
    left.integrity?.value === right.integrity?.value
  );
}

function prefixIssues(issues: readonly ValidationIssue[], prefix: string): ValidationIssue[] {
  return issues.map(issue => ({
    ...issue,
    path: issue.path === '$' ? prefix : `${prefix}${issue.path.slice(1)}`,
  }));
}

function finish<T>(value: T | undefined, context: ValidationContext): ValidationResult<T> {
  if (!value || context.invalid) {
    return { valid: false, diagnostics: context.diagnostics };
  }
  return { valid: true, value, diagnostics: [] };
}

function assertResult<T>(result: ValidationResult<T>): T {
  if (result.valid) {
    return result.value;
  }
  throw new Error(result.diagnostics.map(issue => `${issue.code} at ${issue.path}: ${issue.message}`).join('\n'));
}

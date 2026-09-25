import { createHash } from 'node:crypto';
import { existsSync, lstatSync, readFileSync, realpathSync, statSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { createRequire } from 'node:module';

import { API_METADATA_DEFAULT_BOUNDS } from './schema';
import { fingerprintSerializedMetadata } from './serialize';
import type {
  ApiRecord,
  DeclarationInput,
  ExportRoute,
  MetadataRecordDescriptor,
  PackageIdentity,
  PackageIndex,
} from './types';
import {
  validateApiRecord,
  validatePackageIndex,
  type ValidationBounds,
  type ValidationIssue,
  type ValidationOptions,
} from './validate';

const PACKAGE_NAME = /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/;
const MAX_PACKAGE_JSON_BYTES = 1024 * 1024;

export interface ReaderLimits {
  maxBytes: number;
  maxCatalogRecords: number;
  maxFanout: number;
  maxJsonDepth: number;
  maxLoadedRecords: number;
  maxReferenceDepth: number;
  maxTotalNodes: number;
}

export interface MetadataReaderStats {
  cacheHits: number;
  filesRead: number;
  indexesLoaded: number;
  packageResolutions: number;
  recordsLoaded: number;
}

export interface MetadataLoaderOptions {
  limits?: Partial<ReaderLimits>;
  onFileRead?: (path: string) => void;
  registrations?: MetadataCatalogRegistration[];
}

export interface MetadataCatalogRegistration {
  requested: string;
  importer: string;
  packageRoot: string;
  metadataFile?: string;
  index?: PackageIndex;
}

export interface ResolvedPackageInstance {
  requested: string;
  package: PackageIdentity;
  packageRoot: string;
  packageManifest: string;
  metadataFile: string;
  identity: string;
  resolutionConditions: readonly ['require', 'node', 'default'];
}

export interface LoadedPackageCatalog {
  instance: ResolvedPackageInstance;
  index: PackageIndex;
  indexFingerprint: string;
  metadataDirectory: string;
}

export interface ResolvedDefinitionOwner {
  requested: string;
  package: PackageIdentity;
  packageRoot: string;
  packageManifest: string;
  identity: string;
}

export interface ReaderOperation {
  readonly artifacts: Set<string>;
  readonly records: Set<string>;
}

export interface DependencyVerificationIssue {
  code: 'reader.dependencyInputUnavailable';
  message: string;
  causeCode: string;
}

interface FileCacheEntry {
  identity: string;
  fingerprint: string;
  text: string;
}

interface ParsedCacheEntry<T> {
  contentFingerprint: string;
  value: T;
}

interface ResolutionCacheEntry {
  instance: ResolvedPackageInstance;
  manifestFingerprint: string;
}

interface RegisteredCatalog {
  importerRoot: string;
  instance: ResolvedPackageInstance;
  index?: PackageIndex;
  indexFingerprint?: string;
}

interface ResolvedDeclarationPackage {
  packageRoot: string;
  packageManifest: string;
  name: string;
  version: string;
}

export class MetadataReaderError extends Error {
  public readonly cause?: unknown;

  public constructor(
    public readonly code: string,
    message: string,
    public readonly path?: string,
    options?: { cause?: unknown },
  ) {
    super(message);
    this.name = 'MetadataReaderError';
    this.cause = options?.cause;
  }
}

export class MetadataLoader {
  private readonly limits: ReaderLimits;
  private readonly validationOptions: ValidationOptions;
  private readonly onFileRead?: (path: string) => void;
  private readonly resolutionCache = new Map<string, ResolutionCacheEntry>();
  private readonly registrations = new Map<string, RegisteredCatalog[]>();
  private readonly fileCache = new Map<string, FileCacheEntry>();
  private readonly indexCache = new Map<string, ParsedCacheEntry<PackageIndex>>();
  private readonly recordCache = new Map<string, ParsedCacheEntry<ApiRecord>>();
  private readonly stats: MetadataReaderStats = {
    cacheHits: 0,
    filesRead: 0,
    indexesLoaded: 0,
    packageResolutions: 0,
    recordsLoaded: 0,
  };

  public constructor(options: MetadataLoaderOptions = {}) {
    this.limits = createReaderLimits(options.limits);
    this.validationOptions = {
      bounds: {
        maxBytes: this.limits.maxBytes,
        maxDepth: this.limits.maxJsonDepth,
        maxRecords: this.limits.maxCatalogRecords,
        maxTotalNodes: this.limits.maxTotalNodes,
      },
    };
    this.onFileRead = options.onFileRead;
    for (const registration of options.registrations ?? []) {
      this.registerPackageCatalog(registration);
    }
  }

  public registerPackageCatalog(registration: MetadataCatalogRegistration): ResolvedPackageInstance {
    if (!PACKAGE_NAME.test(registration.requested)) {
      throw new MetadataReaderError(
        'reader.packageSpecifier',
        `Expected a bare npm package name, received ${registration.requested}`,
      );
    }
    for (const [name, value] of [
      ['importer', registration.importer],
      ['packageRoot', registration.packageRoot],
    ] as const) {
      if (!isAbsolute(value)) {
        throw new MetadataReaderError('reader.registration', `Registered ${name} paths must be absolute`, value);
      }
    }
    if (!registration.metadataFile && !registration.index) {
      throw new MetadataReaderError(
        'reader.registration',
        'A registered catalog requires a metadata file or an in-memory package index',
      );
    }

    const importerRoot = realpathDirectory(registration.importer, 'reader.registration');
    const packageRoot = realpathDirectory(registration.packageRoot, 'reader.registration');
    const packageManifest = join(packageRoot, 'package.json');
    const manifest = readPackageJson(packageManifest);
    const actualName = readRequiredString(manifest, 'name', packageManifest);
    const version = readRequiredString(manifest, 'version', packageManifest);
    const metadataFile = registration.metadataFile
      ? realpathFile(registration.metadataFile, 'reader.registration')
      : join(packageRoot, '__fluentui_api_metadata_registered_index__.json');
    if (registration.metadataFile) {
      this._assertContained(packageRoot, metadataFile, 'reader.catalogPathEscape');
    }

    let index: PackageIndex | undefined;
    let indexFingerprint: string | undefined;
    if (registration.metadataFile) {
      const file = this._readBoundedFile(metadataFile);
      const validation = validatePackageIndex(parseJson(file.text, metadataFile), this.validationOptions);
      if (!validation.valid) {
        throw invalidDocument(metadataFile, validation.diagnostics);
      }
      index = validation.value;
      indexFingerprint = file.fingerprint;
    } else if (registration.index) {
      const validation = validatePackageIndex(registration.index, this.validationOptions);
      if (!validation.valid) {
        throw invalidDocument(metadataFile, validation.diagnostics);
      }
      index = validation.value;
      indexFingerprint = fingerprintSerializedMetadata(JSON.stringify(index)).value;
    }
    if (index && (index.package.name !== actualName || index.package.version !== version)) {
      throw new MetadataReaderError(
        'reader.packageIdentityMismatch',
        `Catalog identifies ${index.package.name}@${index.package.version}, but the registered package is ${actualName}@${version}`,
        metadataFile,
      );
    }

    const instance: ResolvedPackageInstance = {
      requested: registration.requested,
      package: { name: actualName, version },
      packageRoot,
      packageManifest,
      metadataFile,
      identity: `${packageRoot}\0${actualName}\0${version}`,
      resolutionConditions: ['require', 'node', 'default'],
    };
    const registered: RegisteredCatalog = { importerRoot, instance, index, indexFingerprint };
    const existing = this.registrations.get(registration.requested) ?? [];
    const duplicate = existing.findIndex(candidate => candidate.importerRoot === importerRoot);
    if (duplicate >= 0) {
      existing[duplicate] = registered;
    } else {
      existing.push(registered);
    }
    existing.sort((left, right) => right.importerRoot.length - left.importerRoot.length);
    this.registrations.set(registration.requested, existing);
    this.resolutionCache.clear();
    return instance;
  }

  public createOperation(): ReaderOperation {
    return { artifacts: new Set(), records: new Set() };
  }

  public getLimits(): Readonly<ReaderLimits> {
    return this.limits;
  }

  public getStats(): Readonly<MetadataReaderStats> {
    return { ...this.stats };
  }

  public resolvePackage(
    requested: string,
    importer: string,
    operation: ReaderOperation = this.createOperation(),
  ): ResolvedPackageInstance {
    this._assertRuntimeSupported();
    if (!PACKAGE_NAME.test(requested)) {
      throw new MetadataReaderError(
        'reader.packageSpecifier',
        `Expected a bare npm package name, received ${requested}`,
      );
    }
    if (!isAbsolute(importer)) {
      throw new MetadataReaderError('reader.importer', 'Importer paths must be absolute', importer);
    }

    const importerFile = this._toImporterFile(importer);
    let importerDirectory: string;
    try {
      importerDirectory = realpathSync(dirname(importerFile));
    } catch (error) {
      throw new MetadataReaderError(
        'reader.importer',
        `Importer directory does not exist: ${dirname(importerFile)}`,
        importer,
        { cause: error },
      );
    }
    const registered = this._findRegistration(requested, importerDirectory);
    if (registered) {
      return registered.instance;
    }
    const cacheKey = `${importerDirectory}\0${requested}\0require,node,default`;
    const cached = this.resolutionCache.get(cacheKey);
    if (
      cached &&
      getFileContentFingerprintIfAvailable(cached.instance.packageManifest) === cached.manifestFingerprint
    ) {
      this.stats.cacheHits++;
      return cached.instance;
    }
    this.resolutionCache.delete(cacheKey);

    let metadataFile: string;
    try {
      metadataFile = createRequire(importerFile).resolve(`${requested}/metadata.json`);
    } catch (error) {
      const causeCode = getErrorCode(error);
      const code =
        causeCode === 'ERR_PACKAGE_PATH_NOT_EXPORTED' ? 'reader.catalogExportUnavailable' : 'reader.packageNotFound';
      throw new MetadataReaderError(
        code,
        `Unable to resolve the public ${requested}/metadata.json export from ${importerDirectory}`,
        undefined,
        { cause: error },
      );
    }

    const physicalMetadataFile = realpathSync(metadataFile);
    const packageManifest = this._findCatalogPackageManifest(physicalMetadataFile);
    const packageRoot = realpathSync(dirname(packageManifest.path));
    this._assertContained(packageRoot, physicalMetadataFile, 'reader.catalogPathEscape');

    if (packageManifest.value.fluentuiCatalog !== './metadata.json') {
      throw new MetadataReaderError(
        'reader.catalogMarker',
        `${
          packageManifest.value.name ?? requested
        } must declare fluentuiCatalog as the public export key "./metadata.json"`,
        packageManifest.path,
      );
    }
    if (!hasMetadataExport(packageManifest.value.exports)) {
      throw new MetadataReaderError(
        'reader.catalogExport',
        `${packageManifest.value.name ?? requested} does not declare a public "./metadata.json" export`,
        packageManifest.path,
      );
    }

    const actualName = readRequiredString(packageManifest.value, 'name', packageManifest.path);
    const version = readRequiredString(packageManifest.value, 'version', packageManifest.path);
    const instance: ResolvedPackageInstance = {
      requested,
      package: { name: actualName, version },
      packageRoot,
      packageManifest: packageManifest.path,
      metadataFile: physicalMetadataFile,
      identity: `${packageRoot}\0${actualName}\0${version}`,
      resolutionConditions: ['require', 'node', 'default'],
    };

    this._consumeArtifact(physicalMetadataFile, operation);
    this.resolutionCache.set(cacheKey, {
      instance,
      manifestFingerprint: fingerprintDeclarationContent(readFileSync(packageManifest.path, 'utf8')),
    });
    this.stats.packageResolutions++;
    return instance;
  }

  public loadPackageIndex(
    requested: string,
    importer: string,
    operation: ReaderOperation = this.createOperation(),
  ): LoadedPackageCatalog {
    const instance = this.resolvePackage(requested, importer, operation);
    const registered = this._findRegistration(requested, realpathSync(dirname(this._toImporterFile(importer))));
    if (registered?.index) {
      this._refreshRegisteredCatalog(registered);
      return {
        instance,
        index: registered.index!,
        indexFingerprint: registered.indexFingerprint!,
        metadataDirectory: registered.instance.metadataFile.endsWith('.json')
          ? dirname(registered.instance.metadataFile)
          : registered.instance.packageRoot,
      };
    }
    this._consumeArtifact(instance.metadataFile, operation);
    const file = this._readBoundedFile(instance.metadataFile);
    const cacheKey = instance.identity;
    const cached = this.indexCache.get(cacheKey);
    if (cached?.contentFingerprint === file.fingerprint) {
      this.stats.cacheHits++;
      return {
        instance,
        index: cached.value,
        indexFingerprint: file.fingerprint,
        metadataDirectory: dirname(instance.metadataFile),
      };
    }

    const parsed = parseJson(file.text, instance.metadataFile);
    const validation = validatePackageIndex(parsed, this.validationOptions);
    if (!validation.valid) {
      throw invalidDocument(instance.metadataFile, validation.diagnostics);
    }
    if (
      validation.value.package.name !== instance.package.name ||
      validation.value.package.version !== instance.package.version
    ) {
      throw new MetadataReaderError(
        'reader.packageIdentityMismatch',
        `Catalog identifies ${validation.value.package.name}@${validation.value.package.version}, but the installed instance is ${instance.package.name}@${instance.package.version}`,
        instance.metadataFile,
      );
    }

    this.indexCache.set(cacheKey, {
      contentFingerprint: file.fingerprint,
      value: validation.value,
    });
    this.stats.indexesLoaded++;
    return {
      instance,
      index: validation.value,
      indexFingerprint: file.fingerprint,
      metadataDirectory: dirname(instance.metadataFile),
    };
  }

  public loadApiRecord(
    catalog: LoadedPackageCatalog,
    recordId: string,
    operation: ReaderOperation = this.createOperation(),
    conditions?: readonly string[],
  ): ApiRecord {
    const descriptor = catalog.index.records.find(record => record.id === recordId);
    if (!descriptor || descriptor.kind !== 'api') {
      throw new MetadataReaderError(
        'reader.recordNotAdvertised',
        `API record ${recordId} is not advertised by ${catalog.instance.package.name}`,
      );
    }
    const owner = this.resolveRecordOwner(catalog, recordId, operation, conditions);

    const recordKey = `${catalog.instance.identity}\0${recordId}`;
    operation.records.add(recordKey);
    if (operation.records.size > this.limits.maxLoadedRecords) {
      throw new MetadataReaderError(
        'reader.maxLoadedRecords',
        `Reader operation exceeded ${this.limits.maxLoadedRecords} loaded API records`,
      );
    }

    const recordPath = this.resolveContainedArtifact(catalog.metadataDirectory, descriptor.path);
    this._consumeArtifact(recordPath, operation);
    const file = this._readBoundedFile(recordPath);
    if (file.fingerprint !== descriptor.fingerprint.value) {
      throw new MetadataReaderError(
        'reader.recordFingerprintMismatch',
        `API record ${recordId} does not match its advertised sha256 fingerprint`,
        recordPath,
      );
    }

    const cached = this.recordCache.get(recordKey);
    let record: ApiRecord;
    if (cached?.contentFingerprint === file.fingerprint) {
      this.stats.cacheHits++;
      record = cached.value;
    } else {
      const parsed = parseJson(file.text, recordPath);
      const validation = validateApiRecord(parsed, this.validationOptions);
      if (!validation.valid) {
        throw invalidDocument(recordPath, validation.diagnostics);
      }
      record = validation.value;
      this.recordCache.set(recordKey, {
        contentFingerprint: file.fingerprint,
        value: record,
      });
      this.stats.recordsLoaded++;
    }

    const packageIdentityMismatch = descriptor.source
      ? record.package.name !== owner.package.name
      : record.package.name !== catalog.instance.package.name ||
        record.package.version !== catalog.instance.package.version;
    if (packageIdentityMismatch || record.recordId !== descriptor.id) {
      throw new MetadataReaderError(
        'reader.recordIdentityMismatch',
        `API record ${record.recordId} does not belong to ${owner.package.name}@${owner.package.version}`,
        recordPath,
      );
    }

    this._verifyDeclarationInputs(
      owner.packageRoot,
      selectConditionInputs(record.declarationInputs, conditions),
      operation,
    );
    return record;
  }

  public resolveRecordOwner(
    catalog: LoadedPackageCatalog,
    recordId: string,
    operation: ReaderOperation = this.createOperation(),
    conditions?: readonly string[],
  ): ResolvedDefinitionOwner {
    const descriptor = catalog.index.records.find(record => record.id === recordId);
    if (!descriptor || descriptor.kind !== 'api') {
      throw new MetadataReaderError(
        'reader.recordNotAdvertised',
        `API record ${recordId} is not advertised by ${catalog.instance.package.name}`,
      );
    }
    if (!descriptor.source) {
      return {
        requested: catalog.instance.requested,
        package: catalog.instance.package,
        packageRoot: catalog.instance.packageRoot,
        packageManifest: catalog.instance.packageManifest,
        identity: catalog.instance.identity,
      };
    }

    let importerRoot = catalog.instance.packageRoot;
    let owner: ResolvedDefinitionOwner | undefined;
    for (const source of descriptor.source.packages) {
      this._assertRuntimeSupported();
      const requested = this._resolveDeclarationPackage(source.requested, importerRoot);
      const dependency =
        requested?.name === source.package.name
          ? requested
          : this._resolveDeclarationPackage(source.package.name, importerRoot);
      if (!dependency) {
        throw new MetadataReaderError(
          'reader.bundledPackageNotFound',
          `Unable to resolve bundled declaration package ${source.package.name} for ${source.requested} from ${importerRoot}`,
        );
      }
      if (dependency.name !== source.package.name) {
        throw new MetadataReaderError(
          'reader.bundledPackageIdentityDrift',
          `Bundled API detail expected ${source.package.name}, but ${source.requested} resolves to ${dependency.name}`,
          dependency.packageManifest,
        );
      }
      this._consumeArtifact(dependency.packageManifest, operation);
      this._verifyDeclarationInputs(
        dependency.packageRoot,
        selectConditionInputs(source.declarationInputs, conditions),
        operation,
      );
      owner = {
        requested: source.requested,
        package: { name: dependency.name, version: dependency.version },
        packageRoot: dependency.packageRoot,
        packageManifest: dependency.packageManifest,
        identity: `${dependency.packageRoot}\0${dependency.name}\0${dependency.version}`,
      };
      importerRoot = dependency.packageRoot;
    }
    if (!owner) {
      throw new MetadataReaderError(
        'reader.bundledSourceInvalid',
        `Bundled API record ${recordId} has no dependency package source`,
      );
    }
    return owner;
  }

  public verifyDependencyInputs(
    catalog: LoadedPackageCatalog,
    record: ApiRecord,
    operation: ReaderOperation,
    conditions?: readonly string[],
  ): DependencyVerificationIssue[] {
    const issues: DependencyVerificationIssue[] = [];
    const owner = this.resolveRecordOwner(catalog, record.recordId, operation, conditions);

    for (const input of selectConditionInputs(record.dependencyInputs, conditions)) {
      try {
        if (input.declarationPath) {
          this._verifyDependencyDeclarationInput(owner.packageRoot, input, input.declarationPath, operation);
          continue;
        }
        const dependency = this.loadPackageIndex(input.requested, owner.packageRoot, operation);
        if (dependency.instance.package.name !== input.package.name) {
          throw new MetadataReaderError(
            'reader.dependencyIdentityDrift',
            `Derived API detail used ${input.package.name}, but ${input.requested} now resolves to ${dependency.instance.package.name}`,
          );
        }

        const declaration = this._getCurrentDeclarationInput(
          dependency,
          input.entrypoint,
          input.conditions,
          input.declarationFingerprint.value,
        );
        this._verifyDeclarationInputs(dependency.instance.packageRoot, [declaration], operation);
      } catch (error) {
        if (!(error instanceof MetadataReaderError)) {
          throw error;
        }
        issues.push({
          code: 'reader.dependencyInputUnavailable',
          message: error.message,
          causeCode: error.code,
        });
      }
    }

    return issues;
  }

  public verifyRouteDeclaration(catalog: LoadedPackageCatalog, route: ExportRoute, operation: ReaderOperation): void {
    const declaration = this._getCurrentDeclarationInput(catalog, route.entrypoint, route.conditions);
    this._verifyDeclarationInputs(catalog.instance.packageRoot, [declaration], operation);
  }

  public resolveContainedArtifact(baseDirectory: string, artifactPath: string): string {
    const candidate = resolve(baseDirectory, artifactPath);
    this._assertContained(realpathSync(baseDirectory), candidate, 'reader.pathEscape');
    if (!existsSync(candidate)) {
      throw new MetadataReaderError(
        'reader.artifactMissing',
        `Metadata artifact does not exist: ${artifactPath}`,
        candidate,
      );
    }

    const physicalCandidate = realpathSync(candidate);
    this._assertContained(realpathSync(baseDirectory), physicalCandidate, 'reader.symlinkEscape');
    if (!lstatSync(physicalCandidate).isFile()) {
      throw new MetadataReaderError(
        'reader.artifactType',
        'Metadata artifacts must be regular files',
        physicalCandidate,
      );
    }
    return physicalCandidate;
  }

  private _verifyDependencyDeclarationInput(
    importerRoot: string,
    input: ApiRecord['dependencyInputs'][number],
    declarationRelativePath: string,
    operation: ReaderOperation,
  ): void {
    this._assertRuntimeSupported();
    const requestedPackage = packageNameFromSpecifier(input.requested);
    const requested = this._resolveDeclarationPackage(requestedPackage, importerRoot);
    const dependency =
      requested?.name === input.package.name
        ? requested
        : this._resolveDeclarationPackage(input.package.name, importerRoot);
    if (!dependency) {
      throw new MetadataReaderError(
        'reader.dependencyPackageNotFound',
        `Unable to resolve declaration package ${input.package.name} for ${input.requested} from ${importerRoot}`,
      );
    }
    if (dependency.name !== input.package.name) {
      throw new MetadataReaderError(
        'reader.dependencyIdentityDrift',
        `Dependency input expected ${input.package.name}, but the installed declaration package is ${dependency.name}`,
        dependency.packageManifest,
      );
    }

    this._consumeArtifact(dependency.packageManifest, operation);
    const declarationPath = this.resolveContainedArtifact(dependency.packageRoot, declarationRelativePath);
    this._consumeArtifact(declarationPath, operation);
    const declaration = this._readBoundedFile(declarationPath);
    if (declaration.fingerprint !== input.declarationFingerprint.value) {
      throw new MetadataReaderError(
        'reader.dependencyDeclarationDrift',
        `Dependency declaration input ${input.package.name}/${declarationRelativePath} has changed since metadata generation`,
        declarationPath,
      );
    }
  }

  private _getCurrentDeclarationInput(
    catalog: LoadedPackageCatalog,
    entrypoint: string,
    conditions: readonly string[],
    expectedFingerprint?: string,
  ): DeclarationInput {
    const manifest = readPackageJson(catalog.instance.packageManifest);
    const currentName = readRequiredString(manifest, 'name', catalog.instance.packageManifest);
    const currentVersion = readRequiredString(manifest, 'version', catalog.instance.packageManifest);
    if (currentName !== catalog.instance.package.name || currentVersion !== catalog.instance.package.version) {
      throw new MetadataReaderError(
        'reader.packageManifestChanged',
        `Installed package identity changed while resolving ${entrypoint}`,
        catalog.instance.packageManifest,
      );
    }

    const exportValue = getEntrypointExport(manifest.exports, entrypoint);
    if (exportValue === undefined || exportValue === null) {
      throw new MetadataReaderError(
        'reader.entrypointNotExported',
        `${catalog.instance.package.name} no longer exports ${entrypoint}`,
        catalog.instance.packageManifest,
      );
    }

    const declarationTargets = collectDeclarationTargets(exportValue).filter(target =>
      conditionsMatch(target.conditions, conditions),
    );
    const matchedInput = declarationTargets
      .sort((left, right) => right.conditions.length - left.conditions.length)
      .map(target =>
        catalog.index.declarationInputs.find(
          input =>
            input.path === normalizeExportTarget(target.path) &&
            arraysEqual(input.conditions, conditions) &&
            (expectedFingerprint === undefined || input.fingerprint.value === expectedFingerprint),
        ),
      )
      .find((input): input is DeclarationInput => input !== undefined);

    if (!matchedInput) {
      throw new MetadataReaderError(
        expectedFingerprint === undefined ? 'reader.routeDeclarationMismatch' : 'reader.dependencyDeclarationDrift',
        `No current declaration export and metadata input match ${entrypoint} under ${conditions.join(', ')}`,
        catalog.instance.packageManifest,
      );
    }

    return matchedInput;
  }

  private _verifyDeclarationInputs(
    packageRoot: string,
    inputs: readonly DeclarationInput[],
    operation: ReaderOperation,
  ): void {
    for (const input of inputs) {
      const declarationPath = this.resolveContainedArtifact(packageRoot, input.path);
      this._consumeArtifact(declarationPath, operation);
      const file = this._readBoundedFile(declarationPath);
      if (file.fingerprint !== input.fingerprint.value) {
        throw new MetadataReaderError(
          'reader.declarationDrift',
          `Declaration input ${input.path} has changed since metadata generation`,
          declarationPath,
        );
      }
    }
  }

  private _readBoundedFile(path: string): FileCacheEntry {
    const statistics = statSync(path);
    if (!statistics.isFile()) {
      throw new MetadataReaderError('reader.artifactType', 'Metadata artifacts must be regular files', path);
    }
    if (statistics.size > this.limits.maxBytes) {
      throw new MetadataReaderError(
        'reader.maxBytes',
        `Artifact exceeds the ${this.limits.maxBytes} byte reader limit`,
        path,
      );
    }

    const identity = `${statistics.dev}:${statistics.ino}:${statistics.size}:${statistics.mtimeMs}:${statistics.ctimeMs}`;
    const cached = this.fileCache.get(path);
    if (cached?.identity === identity) {
      this.stats.cacheHits++;
      return cached;
    }

    const text = readFileSync(path, 'utf8');
    if (Buffer.byteLength(text, 'utf8') > this.limits.maxBytes) {
      throw new MetadataReaderError(
        'reader.maxBytes',
        `Artifact exceeds the ${this.limits.maxBytes} byte reader limit`,
        path,
      );
    }
    const entry = {
      identity,
      fingerprint: fingerprintSerializedMetadata(text).value,
      text,
    };
    this.fileCache.set(path, entry);
    this.stats.filesRead++;
    this.onFileRead?.(path);
    return entry;
  }

  private _consumeArtifact(path: string, operation: ReaderOperation): void {
    operation.artifacts.add(path);
    if (operation.artifacts.size > this.limits.maxFanout) {
      throw new MetadataReaderError(
        'reader.maxFanout',
        `Reader operation exceeded ${this.limits.maxFanout} artifacts`,
        path,
      );
    }
  }

  private _findCatalogPackageManifest(metadataFile: string): { path: string; value: Record<string, unknown> } {
    let directory = dirname(metadataFile);
    const root = resolve(directory, sep);

    while (directory !== root) {
      const packageJsonPath = join(directory, 'package.json');
      if (existsSync(packageJsonPath)) {
        const value = readPackageJson(packageJsonPath);
        if (value.fluentuiCatalog !== undefined) {
          return { path: packageJsonPath, value };
        }
      }
      directory = dirname(directory);
    }

    throw new MetadataReaderError(
      'reader.catalogMarkerMissing',
      `Could not find the package.json declaring ${metadataFile} as a Fluent UI catalog`,
      metadataFile,
    );
  }

  private _assertContained(baseDirectory: string, candidate: string, code: string): void {
    const relation = relative(baseDirectory, candidate);
    if (relation === '..' || relation.startsWith(`..${sep}`) || isAbsolute(relation)) {
      throw new MetadataReaderError(code, `Path escapes its declared metadata boundary`, candidate);
    }
  }

  private _toImporterFile(importer: string): string {
    if (existsSync(importer) && statSync(importer).isDirectory()) {
      return join(importer, '__fluentui_api_metadata_reader__.cjs');
    }
    return importer;
  }

  private _assertRuntimeSupported(): void {
    if ('pnp' in process.versions) {
      throw new MetadataReaderError(
        'reader.pnpUnsupported',
        'Yarn Plug’n’Play package resolution is not supported by the metadata v1 reader',
      );
    }
  }

  private _findRegistration(requested: string, importerDirectory: string): RegisteredCatalog | undefined {
    const registrations = this.registrations.get(requested) ?? [];
    const contextual = registrations.find(
      registration =>
        importerDirectory === registration.importerRoot ||
        importerDirectory.startsWith(`${registration.importerRoot}${sep}`),
    );
    return contextual ?? (registrations.length === 1 ? registrations[0] : undefined);
  }

  private _resolveDeclarationPackage(packageName: string, importer: string): ResolvedDeclarationPackage | undefined {
    const importerFile = this._toImporterFile(importer);
    let packageManifest: string | undefined;
    try {
      packageManifest = createRequire(importerFile).resolve(`${packageName}/package.json`);
    } catch {
      try {
        const entry = createRequire(importerFile).resolve(packageName);
        packageManifest = findContainingPackageManifest(dirname(entry));
      } catch {
        packageManifest = findNodeModulesPackageManifest(dirname(importerFile), packageName);
      }
    }
    if (!packageManifest || !existsSync(packageManifest)) {
      return undefined;
    }

    const physicalManifest = realpathSync(packageManifest);
    const manifest = readPackageJson(physicalManifest);
    const packageRoot = realpathSync(dirname(physicalManifest));
    return {
      packageRoot,
      packageManifest: physicalManifest,
      name: readRequiredString(manifest, 'name', physicalManifest),
      version: readRequiredString(manifest, 'version', physicalManifest),
    };
  }

  private _refreshRegisteredCatalog(registered: RegisteredCatalog): void {
    if (!existsSync(registered.instance.metadataFile)) {
      return;
    }
    const file = this._readBoundedFile(registered.instance.metadataFile);
    if (file.fingerprint === registered.indexFingerprint) {
      return;
    }
    const validation = validatePackageIndex(
      parseJson(file.text, registered.instance.metadataFile),
      this.validationOptions,
    );
    if (!validation.valid) {
      throw invalidDocument(registered.instance.metadataFile, validation.diagnostics);
    }
    if (
      validation.value.package.name !== registered.instance.package.name ||
      validation.value.package.version !== registered.instance.package.version
    ) {
      throw new MetadataReaderError(
        'reader.packageIdentityMismatch',
        `Catalog identifies ${validation.value.package.name}@${validation.value.package.version}, but the registered package is ${registered.instance.package.name}@${registered.instance.package.version}`,
        registered.instance.metadataFile,
      );
    }
    registered.index = validation.value;
    registered.indexFingerprint = file.fingerprint;
  }
}

export function getApiRecordDescriptor(
  catalog: LoadedPackageCatalog,
  recordId: string,
): MetadataRecordDescriptor | undefined {
  return catalog.index.records.find(record => record.id === recordId && record.kind === 'api');
}

function createReaderLimits(overrides: Partial<ReaderLimits> | undefined): ReaderLimits {
  const limits: ReaderLimits = {
    maxBytes: API_METADATA_DEFAULT_BOUNDS.maxBytes,
    maxCatalogRecords: API_METADATA_DEFAULT_BOUNDS.maxRecords,
    maxFanout: 64,
    maxJsonDepth: API_METADATA_DEFAULT_BOUNDS.maxDepth,
    maxLoadedRecords: 32,
    maxReferenceDepth: 16,
    maxTotalNodes: API_METADATA_DEFAULT_BOUNDS.maxTotalNodes,
  };
  if (!overrides) {
    return limits;
  }

  for (const rawKey of Object.keys(overrides)) {
    if (!(rawKey in limits)) {
      throw new MetadataReaderError('reader.limits', `Unknown reader limit ${rawKey}`);
    }
    const key = rawKey as keyof ReaderLimits;
    const value = overrides[key];
    if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0) {
      throw new MetadataReaderError('reader.limits', `${key} must be a finite non-negative safe integer`);
    }
    limits[key] = value;
  }
  return limits;
}

interface DeclarationExportTarget {
  conditions: string[];
  path: string;
}

export function getEntrypointExport(exportsField: unknown, entrypoint: string): unknown {
  if (typeof exportsField === 'string' || Array.isArray(exportsField)) {
    return entrypoint === '.' ? exportsField : undefined;
  }
  if (!isObject(exportsField)) {
    return undefined;
  }

  const keys = Object.keys(exportsField);
  const usesSubpaths = keys.some(key => key.startsWith('.'));
  if (usesSubpaths) {
    if (Object.prototype.hasOwnProperty.call(exportsField, entrypoint)) {
      return exportsField[entrypoint];
    }

    let bestMatch: { key: string; value: string } | undefined;
    for (const key of keys) {
      const wildcard = matchExportPattern(key, entrypoint);
      if (wildcard === undefined || (bestMatch && compareExportPatterns(key, bestMatch.key) <= 0)) {
        continue;
      }
      bestMatch = { key, value: wildcard };
    }
    return bestMatch ? substituteExportPattern(exportsField[bestMatch.key], bestMatch.value) : undefined;
  }
  return entrypoint === '.' ? exportsField : undefined;
}

function matchExportPattern(pattern: string, entrypoint: string): string | undefined {
  const star = pattern.indexOf('*');
  if (star === -1) {
    return undefined;
  }

  const prefix = pattern.slice(0, star);
  const suffix = pattern.slice(star + 1);
  if (
    !entrypoint.startsWith(prefix) ||
    !entrypoint.endsWith(suffix) ||
    entrypoint.length < prefix.length + suffix.length + 1
  ) {
    return undefined;
  }
  return entrypoint.slice(prefix.length, entrypoint.length - suffix.length);
}

function compareExportPatterns(left: string, right: string): number {
  const baseDifference = left.indexOf('*') - right.indexOf('*');
  return baseDifference !== 0 ? baseDifference : left.length - right.length;
}

function substituteExportPattern(value: unknown, wildcard: string): unknown {
  if (typeof value === 'string') {
    return value.split('*').join(wildcard);
  }
  if (Array.isArray(value)) {
    return value.map(item => substituteExportPattern(item, wildcard));
  }
  if (!isObject(value)) {
    return value;
  }
  return Object.fromEntries(
    Object.entries(value).map(([condition, target]) => [condition, substituteExportPattern(target, wildcard)]),
  );
}

function collectDeclarationTargets(value: unknown, conditions: string[] = []): DeclarationExportTarget[] {
  if (typeof value === 'string') {
    return [{ conditions, path: value }];
  }
  if (Array.isArray(value)) {
    return value.flatMap(item => collectDeclarationTargets(item, conditions));
  }
  if (!isObject(value)) {
    return [];
  }
  return Object.entries(value).flatMap(([condition, target]) =>
    collectDeclarationTargets(target, [...conditions, condition]),
  );
}

function selectConditionInputs<T extends { conditions: string[] }>(inputs: T[], conditions?: readonly string[]): T[] {
  const branch = conditions?.find(condition => condition === 'import' || condition === 'require');
  if (
    !branch ||
    !inputs.some(input => input.conditions.includes('import')) ||
    !inputs.some(input => input.conditions.includes('require'))
  ) {
    return inputs;
  }
  return inputs.filter(input =>
    input.conditions.includes('import') || input.conditions.includes('require')
      ? input.conditions.includes(branch)
      : true,
  );
}

function conditionsMatch(exportConditions: readonly string[], routeConditions: readonly string[]): boolean {
  return exportConditions.every(condition => condition === 'default' || routeConditions.includes(condition));
}

function normalizeExportTarget(target: string): string {
  if (!target.startsWith('./')) {
    throw new MetadataReaderError(
      'reader.routeDeclarationMismatch',
      `Declaration export target must be package-relative: ${target}`,
    );
  }
  return target.slice(2);
}

function readPackageJson(path: string): Record<string, unknown> {
  const statistics = statSync(path);
  if (statistics.size > MAX_PACKAGE_JSON_BYTES) {
    throw new MetadataReaderError('reader.packageManifestSize', 'Package manifest is unexpectedly large', path);
  }
  const parsed = parseJson(readFileSync(path, 'utf8'), path);
  if (!isObject(parsed)) {
    throw new MetadataReaderError('reader.packageManifest', 'Package manifest must be a JSON object', path);
  }
  return parsed;
}

function readRequiredString(object: Record<string, unknown>, key: string, path: string): string {
  const value = object[key];
  if (typeof value !== 'string' || value.length === 0) {
    throw new MetadataReaderError('reader.packageManifest', `Package manifest requires a non-empty ${key}`, path);
  }
  return value;
}

function hasMetadataExport(exportsField: unknown): boolean {
  return isObject(exportsField) && Object.prototype.hasOwnProperty.call(exportsField, './metadata.json');
}

function parseJson(text: string, path: string): unknown {
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new MetadataReaderError('reader.invalidJson', `Invalid JSON in ${path}`, path, { cause: error });
  }
}

function invalidDocument(path: string, diagnostics: readonly ValidationIssue[]): MetadataReaderError {
  const summary = diagnostics
    .slice(0, 5)
    .map(diagnostic => `${diagnostic.code} at ${diagnostic.path}`)
    .join(', ');
  return new MetadataReaderError('reader.invalidDocument', `Invalid metadata document: ${summary}`, path);
}

function getErrorCode(error: unknown): string | undefined {
  return isObject(error) && typeof error.code === 'string' ? error.code : undefined;
}

function getFileContentFingerprintIfAvailable(path: string): string | undefined {
  try {
    if (statSync(path).size > MAX_PACKAGE_JSON_BYTES) {
      return undefined;
    }
    return fingerprintDeclarationContent(readFileSync(path, 'utf8'));
  } catch (error) {
    const code = getErrorCode(error);
    if (code === 'ENOENT' || code === 'ENOTDIR') {
      return undefined;
    }
    throw new MetadataReaderError('reader.packageManifestRead', `Unable to read package manifest ${path}`, path, {
      cause: error,
    });
  }
}

function arraysEqual(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function realpathDirectory(path: string, code: string): string {
  try {
    const physical = realpathSync(path);
    if (!statSync(physical).isDirectory()) {
      throw new MetadataReaderError(code, 'Expected a directory', path);
    }
    return physical;
  } catch (error) {
    if (error instanceof MetadataReaderError) {
      throw error;
    }
    throw new MetadataReaderError(code, `Directory does not exist: ${path}`, path, { cause: error });
  }
}

function realpathFile(path: string, code: string): string {
  try {
    const physical = realpathSync(path);
    if (!statSync(physical).isFile()) {
      throw new MetadataReaderError(code, 'Expected a regular file', path);
    }
    return physical;
  } catch (error) {
    if (error instanceof MetadataReaderError) {
      throw error;
    }
    throw new MetadataReaderError(code, `File does not exist: ${path}`, path, { cause: error });
  }
}

function packageNameFromSpecifier(specifier: string): string {
  const parts = specifier.split('/');
  const packageName = specifier.startsWith('@') ? parts.slice(0, 2).join('/') : parts[0];
  if (!PACKAGE_NAME.test(packageName)) {
    throw new MetadataReaderError(
      'reader.packageSpecifier',
      `Expected a dependency npm package specifier, received ${specifier}`,
    );
  }
  return packageName;
}

function findContainingPackageManifest(start: string): string | undefined {
  let directory = resolve(start);
  const root = resolve(directory, sep);
  for (let depth = 0; directory !== root && depth < 64; depth++) {
    const candidate = join(directory, 'package.json');
    if (existsSync(candidate)) {
      return candidate;
    }
    directory = dirname(directory);
  }
  return undefined;
}

function findNodeModulesPackageManifest(importerDirectory: string, packageName: string): string | undefined {
  let directory = resolve(importerDirectory);
  const root = resolve(directory, sep);
  for (let depth = 0; directory !== root && depth < 64; depth++) {
    const candidate = join(directory, 'node_modules', ...packageName.split('/'), 'package.json');
    if (existsSync(candidate)) {
      return candidate;
    }
    directory = dirname(directory);
  }
  return undefined;
}

export function fingerprintDeclarationContent(content: string): string {
  return createHash('sha256').update(content, 'utf8').digest('hex');
}

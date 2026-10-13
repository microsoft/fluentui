import { createHash, randomUUID } from 'node:crypto';
import * as fs from 'node:fs';
import * as path from 'node:path';

import type { GeneratorOptions, GeneratorResult } from '@fluentui/api-metadata';

import { parsePackageSpecifier, resolveInstalledPackage } from './package-inventory';
import { findRepoRoot, getCatalogToolchainIdentity } from './catalog-cache';

const CACHE_SCHEMA = 1;
const MAX_CACHE_BYTES = 16 * 1024 * 1024;
const MAX_CACHE_FILE_BYTES = 16 * 1024 * 1024;
const MAX_DECLARATION_PACKAGES = 512;
const MAX_DECLARATION_FILES = 20_000;
const MAX_DECLARATION_BYTES = 256 * 1024 * 1024;
const inputHashes = new Map<string, { stat: string; hash: string }>();

type Generate = (options: GeneratorOptions) => Promise<GeneratorResult>;

interface CacheEntry {
  schema: number;
  key: string;
  provenance: string;
  result: GeneratorResult;
}

interface CacheIdentity {
  key: string;
  packageRoot: string;
}

export async function generateWithDeclarationCache(
  options: GeneratorOptions,
  generate: Generate,
  cacheDirectory?: string,
): Promise<GeneratorResult> {
  try {
    cacheDirectory ??= path.join(findRepoRoot(process.cwd()), '.cache', 'fluentui-cli', 'declarations');
  } catch {
    return generate(options);
  }
  const identity = createCacheIdentity(options);
  if (!identity) {
    return generate(options);
  }

  const cachePath = path.join(cacheDirectory, `${identity.key}.json`);
  if (!isSafeCachePath(cachePath)) {
    return generate(options);
  }
  const cached = readCache(cachePath, identity);
  if (cached) {
    return cached;
  }

  const result = await generate(options);
  writeCache(cachePath, identity, result);
  return result;
}

function createCacheIdentity(options: GeneratorOptions): CacheIdentity | undefined {
  try {
    const packageRoot = fs.realpathSync(options.packageRoot);
    const packageManifestPath = path.join(packageRoot, 'package.json');
    const packageManifest = fs.readFileSync(packageManifestPath);
    const toolchain = getCatalogToolchainIdentity(findRepoRoot(process.cwd()));
    const metadata = require('@fluentui/api-metadata') as {
      API_METADATA_DEFAULT_BOUNDS: Record<string, number>;
      API_METADATA_SCHEMA_VERSION: { major: number; revision: number };
    };
    const request = {
      packageRoot,
      packageName: options.packageName,
      system: options.system,
      entrypoints: options.entrypoints,
      declarationConditions: options.declarationConditions,
      detail: options.detail ?? 'full',
      selectedExports: options.selectedExports,
    };
    const key = hashText(
      JSON.stringify({
        schema: CACHE_SCHEMA,
        request,
        packageManifest: hashBytes(packageManifest),
        toolchain,
        metadataSchema: metadata.API_METADATA_SCHEMA_VERSION,
        validationBounds: metadata.API_METADATA_DEFAULT_BOUNDS,
      }),
    );
    return { key, packageRoot };
  } catch {
    return undefined;
  }
}

function readCache(cachePath: string, identity: CacheIdentity): GeneratorResult | undefined {
  try {
    const statistics = fs.lstatSync(cachePath);
    if (!statistics.isFile() || statistics.size <= 0 || statistics.size > MAX_CACHE_FILE_BYTES) {
      return undefined;
    }
    const parsed = JSON.parse(fs.readFileSync(cachePath, 'utf8')) as Partial<CacheEntry>;
    if (
      parsed.schema !== CACHE_SCHEMA ||
      parsed.key !== identity.key ||
      !isGeneratorResult(parsed.result) ||
      !isCacheableResult(parsed.result)
    ) {
      return undefined;
    }
    const provenance = getCurrentInputFingerprint(identity.packageRoot, parsed.result);
    if (
      Buffer.byteLength(JSON.stringify(parsed.result), 'utf8') > MAX_CACHE_BYTES ||
      !provenance ||
      parsed.provenance !== provenance
    ) {
      return undefined;
    }

    const metadata = require('@fluentui/api-metadata') as {
      API_METADATA_DEFAULT_BOUNDS: Record<string, number>;
      API_METADATA_SCHEMA_VERSION: { major: number; revision: number };
      validateCatalog(
        index: unknown,
        records: readonly unknown[],
        options: { bounds: Record<string, number> },
      ): { valid: boolean; value?: { index: GeneratorResult['index']; records: GeneratorResult['records'] } };
    };
    const expectedSchema = metadata.API_METADATA_SCHEMA_VERSION;
    if (
      parsed.result.index.schema.major !== expectedSchema.major ||
      parsed.result.index.schema.revision !== expectedSchema.revision
    ) {
      return undefined;
    }
    const validation = metadata.validateCatalog(parsed.result.index, parsed.result.records, {
      bounds: { ...metadata.API_METADATA_DEFAULT_BOUNDS, maxBytes: MAX_CACHE_BYTES },
    });
    return validation.valid ? { ...parsed.result, ...validation.value } : undefined;
  } catch {
    return undefined;
  }
}

function writeCache(cachePath: string, identity: CacheIdentity, result: GeneratorResult): void {
  try {
    if (!isCacheableResult(result)) {
      return;
    }
    const serializedResult = JSON.stringify(result);
    if (serializedResult.length === 0 || Buffer.byteLength(serializedResult, 'utf8') > MAX_CACHE_BYTES) {
      return;
    }
    const provenance = getCurrentInputFingerprint(identity.packageRoot, result);
    if (!provenance) {
      return;
    }
    const metadata = require('@fluentui/api-metadata') as {
      API_METADATA_DEFAULT_BOUNDS: Record<string, number>;
      validateCatalog(
        index: unknown,
        records: readonly unknown[],
        options: { bounds: Record<string, number> },
      ): { valid: boolean };
    };
    if (
      !metadata.validateCatalog(result.index, result.records, {
        bounds: { ...metadata.API_METADATA_DEFAULT_BOUNDS, maxBytes: MAX_CACHE_BYTES },
      }).valid
    ) {
      return;
    }

    if (!isSafeCachePath(cachePath)) {
      return;
    }
    fs.mkdirSync(path.dirname(cachePath), { recursive: true, mode: 0o700 });
    const entry: CacheEntry = { schema: CACHE_SCHEMA, key: identity.key, provenance, result };
    const serialized = JSON.stringify(entry);
    if (Buffer.byteLength(serialized, 'utf8') > MAX_CACHE_FILE_BYTES) {
      return;
    }
    const temporaryPath = `${cachePath}.${process.pid}.${randomUUID()}.tmp`;
    fs.writeFileSync(temporaryPath, serialized, { flag: 'wx', mode: 0o600 });
    fs.renameSync(temporaryPath, cachePath);
  } catch {
    return;
  }
}

function getCurrentInputFingerprint(packageRoot: string, result: GeneratorResult): string | undefined {
  try {
    const inputs = new Map<string, string>();
    const declarationPackageRoots = new Set<string>();
    const descriptorPackages = new Map<string, Map<string, string>>();
    const declarationInputs = { files: 0, bytes: 0 };
    const packageManifest = path.join(packageRoot, 'package.json');
    const manifest = JSON.parse(fs.readFileSync(packageManifest, 'utf8')) as Record<string, unknown>;
    if (
      !addDeclarationPackageInventory(
        { packageRoot, packageManifest, manifest },
        inputs,
        declarationPackageRoots,
        declarationInputs,
      )
    ) {
      return undefined;
    }

    for (const declarationInput of result.index.declarationInputs) {
      const content = getMatchingFileFingerprint(
        packageRoot,
        declarationInput.path,
        declarationInput.fingerprint.value,
      );
      if (!content) {
        return undefined;
      }
      inputs.set(`local:${declarationInput.path}:${declarationInput.conditions.join(',')}`, content);
    }

    for (const descriptor of result.index.records) {
      if (!descriptor.source) {
        continue;
      }
      let importer = packageRoot;
      const packages = new Map<string, string>();
      for (const dependency of descriptor.source.packages) {
        const requested = resolveInstalledPackage(dependency.requested, importer);
        const declarationOwner = resolveInstalledPackage(dependency.package.name, importer);
        const installed =
          declarationOwner?.packageName === dependency.package.name &&
          declarationOwner.version === dependency.package.version
            ? declarationOwner
            : requested;
        if (
          !requested ||
          !installed ||
          installed.packageName !== dependency.package.name ||
          installed.version !== dependency.package.version
        ) {
          return undefined;
        }
        inputs.set(`bundled-request:${requested.packageRoot}`, hashFile(requested.packageManifest));
        inputs.set(`bundled-owner:${installed.packageRoot}`, hashFile(installed.packageManifest));
        inputs.set(
          `bundled:${installed.packageRoot}:${dependency.requested}`,
          hashText(
            JSON.stringify({
              requested: dependency.requested,
              package: dependency.package,
              manifest: hashFile(installed.packageManifest),
            }),
          ),
        );
        for (const declarationInput of dependency.declarationInputs) {
          const content = getMatchingFileFingerprint(
            installed.packageRoot,
            declarationInput.path,
            declarationInput.fingerprint.value,
          );
          if (!content) {
            return undefined;
          }
          inputs.set(
            `bundled-declaration:${installed.packageRoot}:${declarationInput.path}:${declarationInput.conditions.join(
              ',',
            )}`,
            content,
          );
        }
        if (!addDeclarationPackageInventory(installed, inputs, declarationPackageRoots, declarationInputs)) {
          return undefined;
        }
        packages.set(packageIdentityKey(dependency.package.name, dependency.package.version), installed.packageRoot);
        importer = installed.packageRoot;
      }
      descriptorPackages.set(descriptor.id, packages);
    }

    for (const record of result.records) {
      const descriptor = result.index.records.find(candidate => candidate.id === record.recordId);
      const packageRootForRecord =
        record.package.name === result.index.package.name && record.package.version === result.index.package.version
          ? packageRoot
          : descriptorPackages
              .get(record.recordId)
              ?.get(packageIdentityKey(record.package.name, record.package.version)) ??
            resolveInstalledPackage(record.package.name, packageRoot)?.packageRoot;
      if (!packageRootForRecord) {
        return undefined;
      }

      for (const declarationInput of record.declarationInputs) {
        const content = getMatchingFileFingerprint(
          packageRootForRecord,
          declarationInput.path,
          declarationInput.fingerprint.value,
        );
        if (!content) {
          return undefined;
        }
        inputs.set(
          `record-local:${packageRootForRecord}:${declarationInput.path}:${declarationInput.conditions.join(',')}`,
          content,
        );
      }

      for (const dependency of record.dependencyInputs) {
        const parsed = parsePackageSpecifier(dependency.requested);
        if (!parsed) {
          return undefined;
        }
        const requested = resolveInstalledPackage(parsed.packageName, packageRootForRecord);
        const declarationOwner = resolveInstalledPackage(dependency.package.name, packageRootForRecord);
        if (!requested || !declarationOwner || declarationOwner.version !== dependency.package.version) {
          return undefined;
        }
        inputs.set(`requested:${requested.packageRoot}`, hashFile(requested.packageManifest));
        inputs.set(`owner:${declarationOwner.packageRoot}`, hashFile(declarationOwner.packageManifest));
        inputs.set(
          `dependency-route:${declarationOwner.packageRoot}:${dependency.requested}:${
            dependency.entrypoint
          }:${dependency.conditions.join(',')}`,
          hashText(
            JSON.stringify({
              requested: dependency.requested,
              package: dependency.package,
              entrypoint: dependency.entrypoint,
              conditions: dependency.conditions,
              declarationPath: dependency.declarationPath,
            }),
          ),
        );
        if (
          !dependency.declarationPath ||
          !getMatchingFileFingerprint(
            declarationOwner.packageRoot,
            dependency.declarationPath,
            dependency.declarationFingerprint.value,
          )
        ) {
          return undefined;
        }
        inputs.set(
          `dependency:${declarationOwner.packageRoot}:${dependency.declarationPath}`,
          dependency.declarationFingerprint.value,
        );
        if (
          !addDeclarationPackageInventory(requested, inputs, declarationPackageRoots, declarationInputs) ||
          !addDeclarationPackageInventory(declarationOwner, inputs, declarationPackageRoots, declarationInputs)
        ) {
          return undefined;
        }
      }
    }
    return hashText(JSON.stringify([...inputs.entries()].sort(([left], [right]) => left.localeCompare(right))));
  } catch {
    return undefined;
  }
}

function addDeclarationPackageInventory(
  installed: Pick<
    NonNullable<ReturnType<typeof resolveInstalledPackage>>,
    'packageRoot' | 'packageManifest' | 'manifest'
  >,
  inputs: Map<string, string>,
  visited: Set<string>,
  limits: { files: number; bytes: number },
): boolean {
  if (visited.has(installed.packageRoot)) {
    return true;
  }
  if (visited.size >= MAX_DECLARATION_PACKAGES) {
    return false;
  }
  visited.add(installed.packageRoot);
  inputs.set(`declaration-package:${installed.packageRoot}`, hashFile(installed.packageManifest));

  const declarationFiles: string[] = [];
  const visit = (directory: string): void => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (['node_modules', '.git', '.cache'].includes(entry.name)) {
        continue;
      }
      const filePath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        visit(filePath);
      } else if (entry.isFile() && /\.d\.[cm]?ts$/.test(entry.name)) {
        declarationFiles.push(filePath);
      }
      if (declarationFiles.length + limits.files > MAX_DECLARATION_FILES) {
        throw new Error('Declaration package inventory exceeds file bounds');
      }
    }
  };
  visit(installed.packageRoot);
  for (const filePath of declarationFiles.sort()) {
    const statistics = fs.statSync(filePath);
    limits.files++;
    limits.bytes += statistics.size;
    if (limits.bytes > MAX_DECLARATION_BYTES) {
      return false;
    }
    inputs.set(`declaration-file:${filePath}`, hashFile(filePath));
  }

  for (const dependencyName of getDeclarationDependencyNames(installed.manifest)) {
    const dependency = resolveInstalledPackage(dependencyName, installed.packageRoot);
    if (!dependency || !addDeclarationPackageInventory(dependency, inputs, visited, limits)) {
      return false;
    }
  }
  return true;
}

function getDeclarationDependencyNames(manifest: Record<string, unknown>): string[] {
  return [
    ...new Set(
      ['dependencies', 'optionalDependencies', 'peerDependencies'].flatMap(key => {
        const value = manifest[key];
        return value && typeof value === 'object' && !Array.isArray(value) ? Object.keys(value) : [];
      }),
    ),
  ].sort();
}

function packageIdentityKey(name: string, version: string): string {
  return `${name}@${version}`;
}

function getMatchingFileFingerprint(root: string, relativePath: string, expected: string): string | undefined {
  if (path.isAbsolute(relativePath)) {
    return undefined;
  }
  const filePath = path.resolve(root, relativePath);
  const relation = path.relative(path.resolve(root), filePath);
  if (relation !== '' && (relation.startsWith('..') || path.isAbsolute(relation))) {
    return undefined;
  }
  const current = hashFile(filePath);
  return current === expected ? current : undefined;
}

function isGeneratorResult(value: unknown): value is GeneratorResult {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'index' in value &&
      'records' in value &&
      'diagnostics' in value &&
      Array.isArray((value as GeneratorResult).records) &&
      Array.isArray((value as GeneratorResult).diagnostics),
  );
}

function isCacheableResult(result: GeneratorResult): boolean {
  return (
    result.index.completeness.api.status !== 'unavailable' &&
    result.index.declarationInputs.length > 0 &&
    !result.diagnostics.some(diagnostic => diagnostic.severity === 'error')
  );
}

function hashFile(filePath: string): string {
  const statistics = fs.statSync(filePath, { bigint: true });
  const stat = [statistics.dev, statistics.ino, statistics.size, statistics.mtimeNs, statistics.ctimeNs].join(':');
  const previous = inputHashes.get(filePath);
  if (previous?.stat === stat) {
    return previous.hash;
  }
  const hash = hashBytes(fs.readFileSync(filePath));
  if (inputHashes.size > MAX_DECLARATION_FILES) {
    inputHashes.clear();
  }
  inputHashes.set(filePath, { stat, hash });
  return hash;
}

function isSafeCachePath(cachePath: string): boolean {
  try {
    const root = findRepoRoot(process.cwd());
    const relative = path.relative(root, cachePath);
    if (relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
      return !fs.existsSync(cachePath) || !fs.lstatSync(cachePath).isSymbolicLink();
    }
    let current = root;
    for (const part of relative.split(path.sep)) {
      current = path.join(current, part);
      try {
        if (fs.lstatSync(current).isSymbolicLink()) {
          return false;
        }
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
          return false;
        }
      }
    }
    return true;
  } catch {
    return false;
  }
}

function hashBytes(value: Buffer): string {
  return createHash('sha256').update(value).digest('hex');
}

function hashText(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

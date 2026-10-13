import { spawn } from 'node:child_process';
import { createHash, randomUUID } from 'node:crypto';
import * as fs from 'node:fs';
import { createRequire } from 'node:module';
import * as path from 'node:path';
import {
  API_METADATA_DEFAULT_BOUNDS,
  API_METADATA_SCHEMA_VERSION,
  assertValidPackageIndex,
} from '@fluentui/api-metadata';
import type { GeneratorResult, PackageIndex } from '@fluentui/api-metadata';

import { getCatalogInventory, type CatalogRoot, type CatalogSelectionOptions } from './catalog-inventory';
import { findWorkspaceRoot, parsePackageSpecifier, resolveInstalledPackage } from './package-inventory';
import type { loadMetadataGenerator } from './metadata-generator';

export interface CachedPackageCatalog {
  index: PackageIndex;
  metadataFile: string;
  metadataRoot?: string;
  packageRoot: string;
  source: 'metadata' | 'declarations';
  status: 'ready';
}

export interface CacheStatusResult {
  workspaceRoot: string;
  cacheRoot: string;
  packages: Array<{
    package: string;
    requestedPackage: string;
    packageRoot: string;
    source: 'metadata' | 'declarations';
    state: 'ready' | 'building' | 'failed' | 'stale';
    records: number;
    error?: string;
  }>;
}

export interface CatalogBuildProgress {
  package: string;
  packageRoot: string;
  phase: 'generating' | 'writing' | 'ready' | 'reused' | 'waiting' | 'failed';
  source?: 'metadata' | 'declarations';
  records?: number;
  elapsedMs?: number;
}

export interface CatalogBuildOptions extends CatalogSelectionOptions {
  force?: boolean;
  onProgress?: (event: CatalogBuildProgress) => void;
}

interface FileFingerprint {
  stat: string;
  hash: string;
}

interface InputSnapshot {
  roots: string[];
  files: Record<string, FileFingerprint>;
  directories: Record<string, string>;
  resolutions: Array<{ importer: string; requested: string; root?: string }>;
}

interface CacheState {
  schema: 1;
  key: string;
  packageRoot: string;
  packageName: string;
  snapshot: InputSnapshot;
  artifacts: Record<string, FileFingerprint>;
}

interface Location {
  workspaceRoot: string;
  cacheRoot: string;
  directory: string;
  lock: string;
  failure: string;
  key: string;
  packageRoot: string;
}

type CacheScope = Omit<Location, 'directory' | 'key'>;

interface LockOwner {
  token: string;
  pid: number;
}

const MAX_JSON_BYTES = 16 * 1024 * 1024;
const MAX_FILE_BYTES = 32 * 1024 * 1024;
const MAX_FILES = 20_000;
const MAX_PACKAGES = 512;

export function findRepoRoot(cwd: string): string {
  let current = fs.realpathSync(cwd);
  if (!fs.statSync(current).isDirectory()) {
    current = path.dirname(current);
  }
  const fallback = current;
  while (true) {
    if (fs.existsSync(path.join(current, '.git'))) {
      return current;
    }
    const parent = path.dirname(current);
    if (parent === current) {
      return fs.realpathSync(findWorkspaceRoot(fallback));
    }
    current = parent;
  }
}

export function getCachedPackageCatalog(
  root: CatalogRoot,
  options: CatalogSelectionOptions,
): CachedPackageCatalog | undefined {
  if (options.metadataMode !== 'off' && root.catalog) {
    return {
      index: root.catalog.index,
      metadataFile: root.catalog.instance.metadataFile,
      packageRoot: root.packageRoot,
      source: 'metadata',
      status: 'ready',
    };
  }
  if (options.metadataMode === 'required') {
    return undefined;
  }
  try {
    const location = locate(root, options);
    assertSafePath(location.workspaceRoot, location.directory);
    const state = readState(location);
    if (!state || !snapshotFresh(state.snapshot) || !artifactsFresh(location.directory, state.artifacts)) {
      return undefined;
    }
    const metadataFile = path.join(location.directory, 'index.json');
    const index = assertValidPackageIndex(readJson(metadataFile));
    const manifest = readJson(path.join(location.packageRoot, 'package.json'));
    if (index.package.name !== root.packageName || index.package.version !== manifest.version) {
      return undefined;
    }
    if (index.records.some(record => !state.artifacts[record.path])) {
      return undefined;
    }
    return {
      index,
      metadataFile,
      metadataRoot: path.dirname(metadataFile),
      packageRoot: location.packageRoot,
      source: 'declarations',
      status: 'ready',
    };
  } catch {
    return undefined;
  }
}

export function inspectCatalogCache(options: CatalogSelectionOptions): CacheStatusResult {
  const workspaceRoot = findRepoRoot(options.cwd ?? process.cwd());
  return {
    workspaceRoot,
    cacheRoot: path.join(workspaceRoot, '.cache/fluentui-cli/catalogs'),
    packages: selectedRoots(options).map(root => inspectRoot(root, options)),
  };
}

export async function buildCatalogCache(options: CatalogBuildOptions): Promise<CacheStatusResult> {
  const visited = new Set<string>();
  const failures = new Map<string, string>();
  for (const root of selectedRoots(options)) {
    await buildRoot(root, options, visited, failures);
  }
  const result = inspectCatalogCache(options);
  for (const entry of result.packages) {
    const error = failures.get(entry.packageRoot);
    if (error) {
      entry.state = 'failed';
      entry.error = error;
    }
  }
  return result;
}

export function startCatalogCacheBuild(options: CatalogSelectionOptions): void {
  try {
    const worker = path.join(__dirname, 'catalog-cache-worker.js');
    if (!fs.existsSync(worker) || options.metadataMode === 'required') {
      return;
    }
    for (const root of selectedRoots(options)) {
      if (getCachedPackageCatalog(root, options)) {
        continue;
      }
      const location = locate(root, options);
      const owner = acquire(location);
      if (!owner) {
        continue;
      }
      try {
        const child = spawn(
          process.execPath,
          [
            worker,
            JSON.stringify({
              options: { ...options, cwd: path.resolve(options.cwd ?? process.cwd()) },
              packageRoot: root.packageRoot,
              token: owner.token,
            }),
          ],
          { cwd: location.workspaceRoot, detached: true, stdio: 'ignore', env: { ...process.env, NODE_OPTIONS: '' } },
        );
        child.on('error', error => {
          fail(location, owner, error);
          release(location, owner);
        });
        child.on('exit', (code, signal) => {
          fail(location, owner, new Error(`Catalog worker exited before publishing (${signal ?? code ?? 'unknown'})`));
          release(location, owner);
        });
        child.unref();
        if (child.pid) {
          mutate(location, () => {
            if (owns(location, owner)) {
              writeJson(path.join(location.lock, 'owner.json'), { ...owner, pid: child.pid });
            }
          });
        }
      } catch (error) {
        fail(location, owner, error);
        release(location, owner);
      }
    }
  } catch {
    return;
  }
}

export async function runCatalogCacheWorker(
  options: CatalogSelectionOptions,
  packageRoot: string,
  token: string,
): Promise<void> {
  const scope = cacheScope(packageRoot, options);
  const owner = { token, pid: process.pid };
  try {
    const root = selectedRoots(options).find(candidate => candidate.packageRoot === packageRoot);
    if (root) {
      await buildRoot(root, options, new Set(), new Map(), owner);
    }
  } finally {
    release(scope, owner);
  }
}

export function clearCatalogCache(options: CatalogSelectionOptions): CacheStatusResult {
  const roots = selectedRoots(options);
  const failures = new Map<string, string>();
  const workspaceRoot = findRepoRoot(options.cwd ?? process.cwd());
  const cacheRoot = path.join(workspaceRoot, '.cache/fluentui-cli/catalogs');
  for (const root of roots) {
    try {
      const location = locate(root, options);
      assertSafePath(workspaceRoot, cacheRoot);
      mutate(location, () => {
        fs.rmSync(location.lock, { recursive: true, force: true });
        fs.rmSync(location.failure, { force: true });
        for (const entry of fs.readdirSync(cacheRoot, { withFileTypes: true })) {
          if (!entry.isDirectory() || !/^[a-f0-9]{64}$/.test(entry.name)) {
            continue;
          }
          const directory = path.join(cacheRoot, entry.name);
          assertSafePath(workspaceRoot, directory);
          try {
            const state = readJson(path.join(directory, 'state.json'));
            if (state.packageRoot === location.packageRoot) {
              fs.rmSync(directory, { recursive: true, force: true });
            }
          } catch {
            if (directory === location.directory) {
              fs.rmSync(directory, { recursive: true, force: true });
            }
          }
        }
      });
    } catch (error) {
      failures.set(root.packageRoot, message(error));
    }
  }
  const result = inspectCatalogCache(options);
  for (const entry of result.packages) {
    const error = failures.get(entry.packageRoot);
    if (error) {
      entry.state = 'failed';
      entry.error = error;
    }
  }
  return result;
}

function selectedRoots(options: CatalogSelectionOptions): CatalogRoot[] {
  const inventory = getCatalogInventory(options);
  const explicit = options.package && parsePackageSpecifier(options.package)?.packageName;
  const queue = inventory.roots.filter(root => !explicit || root.requestedPackage === explicit);
  const roots = new Map<string, CatalogRoot>();
  for (const root of queue) {
    if (roots.has(root.packageRoot)) {
      continue;
    }
    if (roots.size >= MAX_PACKAGES) {
      break;
    }
    roots.set(root.packageRoot, root);
    const cached = getCachedPackageCatalog(root, options);
    if (cached) {
      queue.push(...dependencyRoots(root, cached.index, options));
    }
  }
  return [...roots.values()];
}

function dependencyRoots(root: CatalogRoot, index: PackageIndex, options: CatalogSelectionOptions): CatalogRoot[] {
  const dependencies = new Map<string, CatalogRoot>();
  const requestedPackages = new Set<string>();
  for (const route of index.exports) {
    if (route.target.kind !== 'dependency') {
      continue;
    }
    const requested = route.target.requested ?? route.target.package;
    if (requestedPackages.has(requested)) {
      continue;
    }
    requestedPackages.add(requested);
    const inventory = getCatalogInventory({
      cwd: root.packageRoot,
      package: requested,
      metadataMode: options.metadataMode,
    });
    const dependency = inventory.roots.find(candidate => candidate.requestedPackage === requested);
    if (dependency) {
      dependencies.set(dependency.packageRoot, dependency);
    }
  }
  return [...dependencies.values()];
}

async function buildRoot(
  root: CatalogRoot,
  options: CatalogBuildOptions,
  visited: Set<string>,
  failures: Map<string, string>,
  reserved?: LockOwner,
): Promise<void> {
  if (visited.has(root.packageRoot) || visited.size >= MAX_PACKAGES) {
    return;
  }
  visited.add(root.packageRoot);
  let location: Location | undefined;
  let owner: LockOwner | undefined;
  let staging: string | undefined;
  const started = performance.now();
  const progress = (event: Omit<CatalogBuildProgress, 'package' | 'packageRoot'>) => {
    try {
      options.onProgress?.({ package: root.requestedPackage, packageRoot: root.packageRoot, ...event });
    } catch {
      return;
    }
  };
  try {
    if (reserved) {
      location = locate(root, options);
      owner = reserved;
    }
    const cached = getCachedPackageCatalog(root, options);
    let index = cached?.index;
    if ((!cached || (options.force && cached.source === 'declarations')) && options.metadataMode !== 'required') {
      location = locate(root, options);
      owner = reserved ?? acquire(location);
      if (!owner) {
        progress({ phase: 'waiting' });
        await waitForBuilder(location);
        if (!getCachedPackageCatalog(root, options)) {
          const entry = inspectRoot(root, options);
          throw new Error(entry.error ?? 'Active catalog build ended without publishing; retry the operation');
        }
        visited.delete(root.packageRoot);
        await buildRoot(root, { ...options, force: false }, visited, failures);
        return;
      }
      if (!owns(location, owner)) {
        return;
      }
      progress({ phase: 'generating', source: 'declarations' });
      const before = captureInputs(root.packageRoot);
      const generator = require('@fluentui/api-metadata/generator') as ReturnType<typeof loadMetadataGenerator>;
      const result = await generator.generateApiMetadata({
        packageRoot: root.packageRoot,
        packageName: root.packageName,
        detail: 'full',
      });
      if (
        result.diagnostics.some(diagnostic => diagnostic.severity === 'error') ||
        result.index.completeness.api.status === 'unavailable'
      ) {
        throw new Error('Full catalog generation did not produce usable metadata');
      }
      if (!snapshotFresh(before)) {
        throw new Error('Declaration inputs changed during catalog generation');
      }
      const snapshot = captureInputs(root.packageRoot, result);
      if (!owns(location, owner)) {
        return;
      }
      staging = path.join(location.cacheRoot, `.stage-${owner.token}`);
      assertSafePath(location.workspaceRoot, staging);
      fs.mkdirSync(staging, { mode: 0o700 });
      progress({ phase: 'writing', records: result.records.length, source: 'declarations' });
      generator.writeGeneratedMetadata(result, staging);
      const artifacts: Record<string, FileFingerprint> = {};
      for (const relative of ['index.json', ...result.index.records.map(record => record.path)]) {
        const file = contained(staging, relative);
        assertSafePath(staging, file);
        fs.chmodSync(file, 0o600);
        artifacts[relative] = fingerprint(file);
      }
      const state: CacheState = {
        schema: 1,
        key: location.key,
        packageRoot: location.packageRoot,
        packageName: root.packageName,
        snapshot,
        artifacts,
      };
      writeJson(path.join(staging, 'state.json'), state);
      if (!owns(location, owner) || !snapshotFresh(snapshot)) {
        return;
      }
      const publicationLocation = location;
      const publicationOwner = owner;
      mutate(location, () => {
        if (!owns(publicationLocation, publicationOwner)) {
          return;
        }
        assertSafePath(publicationLocation.workspaceRoot, publicationLocation.directory);
        fs.rmSync(publicationLocation.directory, { recursive: true, force: true });
        fs.renameSync(staging!, publicationLocation.directory);
        staging = undefined;
        fs.rmSync(publicationLocation.failure, { force: true });
        index = result.index;
      });
      if (index === result.index) {
        progress({
          phase: 'ready',
          records: result.records.length,
          elapsedMs: performance.now() - started,
          source: 'declarations',
        });
      }
    } else if (cached) {
      progress({ phase: 'reused', records: cached.index.records.length, source: cached.source });
    }
    if (index) {
      for (const dependency of dependencyRoots(root, index, options)) {
        await buildRoot(dependency, options, visited, failures);
      }
    }
  } catch (error) {
    progress({ phase: 'failed', elapsedMs: performance.now() - started });
    failures.set(root.packageRoot, message(error));
    if (location && owner) {
      fail(location, owner, error);
    }
  } finally {
    if (staging && location) {
      discardStaging(location, staging);
    }
    if (location && owner) {
      release(location, owner);
    }
  }
}

function discardStaging(location: Location, staging: string): void {
  try {
    assertSafePath(location.workspaceRoot, staging);
    fs.rmSync(staging, { recursive: true, force: true });
  } catch {
    return;
  }
}

function inspectRoot(root: CatalogRoot, options: CatalogSelectionOptions): CacheStatusResult['packages'][number] {
  const cached = getCachedPackageCatalog(root, options);
  const entry: CacheStatusResult['packages'][number] = {
    package: root.packageName,
    requestedPackage: root.requestedPackage,
    packageRoot: root.packageRoot,
    source: cached?.source ?? 'declarations',
    state: cached ? 'ready' : 'stale',
    records: cached?.index.records.length ?? 0,
  };
  if (cached) {
    return entry;
  }
  if (options.metadataMode === 'required') {
    return { ...entry, state: 'failed', error: 'Shipped metadata is required but unavailable' };
  }
  try {
    const location = locate(root, options);
    if (activeOwner(location)) {
      entry.state = 'building';
    } else {
      if (fs.existsSync(location.lock)) {
        const abandoned = readJson(path.join(location.lock, 'owner.json')) as unknown as LockOwner;
        fail(location, abandoned, new Error('Catalog worker exited before publishing'));
        release(location, abandoned);
      }
      if (fs.existsSync(location.failure)) {
        assertSafePath(location.workspaceRoot, location.failure);
        const failure = readJson(location.failure);
        if (failure.key === location.key && typeof failure.error === 'string') {
          entry.state = 'failed';
          entry.error = failure.error;
        }
      }
    }
  } catch (error) {
    entry.error = message(error);
  }
  return entry;
}

function cacheScope(packageRoot: string, options: CatalogSelectionOptions): CacheScope {
  const workspaceRoot = findRepoRoot(options.cwd ?? process.cwd());
  const cacheRoot = path.join(workspaceRoot, '.cache/fluentui-cli/catalogs');
  const packageKey = hash(packageRoot);
  return {
    workspaceRoot,
    cacheRoot,
    packageRoot,
    lock: path.join(cacheRoot, `${packageKey}.lock`),
    failure: path.join(cacheRoot, `${packageKey}.failed.json`),
  };
}

function locate(root: CatalogRoot, options: CatalogSelectionOptions): Location {
  const scope = cacheScope(fs.realpathSync(root.packageRoot), options);
  const { packageRoot, workspaceRoot, cacheRoot } = scope;
  const key = hash(
    JSON.stringify({
      packageRoot,
      packageName: root.packageName,
      manifest: fingerprint(path.join(packageRoot, 'package.json')).hash,
      toolchain: getCatalogToolchainIdentity(workspaceRoot),
      schema: API_METADATA_SCHEMA_VERSION,
      bounds: API_METADATA_DEFAULT_BOUNDS,
    }),
  );
  return { ...scope, key, directory: path.join(cacheRoot, key) };
}

export function getCatalogToolchainIdentity(_workspaceRoot: string): string {
  const generator = fs.realpathSync(require.resolve('@fluentui/api-metadata/generator'));
  const requireFromGenerator = createRequire(generator);
  const compiler = requireFromGenerator.resolve('typescript');
  const compilerManifest = requireFromGenerator.resolve('typescript/package.json');
  const runtime: string[] = [generator, compiler, compilerManifest];
  const visit = (directory: string): void => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        visit(file);
      } else if (entry.isFile() && entry.name.endsWith('.js')) {
        runtime.push(file);
      }
      if (runtime.length > 2_000) {
        throw new Error('Generator runtime exceeds fingerprint bounds');
      }
    }
  };
  visit(path.dirname(generator));
  let directory = path.dirname(generator);
  while (!fs.existsSync(path.join(directory, 'package.json'))) {
    const parent = path.dirname(directory);
    if (parent === directory) {
      throw new Error('Generator manifest not found');
    }
    directory = parent;
  }
  const manifestFile = path.join(directory, 'package.json');
  const manifest = readJson(manifestFile);
  runtime.push(manifestFile);
  const files = [...new Set(runtime.map(file => fs.realpathSync(file)))].sort().map(file => [file, statIdentity(file)]);
  return hash(JSON.stringify({ version: manifest.version, files }));
}

function captureInputs(packageRoot: string, result?: GeneratorResult): InputSnapshot {
  const snapshot: InputSnapshot = { roots: [], files: {}, directories: {}, resolutions: [] };
  const pending = [fs.realpathSync(packageRoot)];
  const expected = new Map<string, string>();
  const resolvedPackages = new Map<string, string | undefined>();
  const resolveInput = (requested: string, importer: string): string | undefined => {
    const name = parsePackageSpecifier(requested)?.packageName;
    if (!name) {
      throw new Error('Invalid declaration dependency');
    }
    const key = `${importer}\0${name}`;
    if (resolvedPackages.has(key)) {
      return resolvedPackages.get(key);
    }
    const installed = resolveInstalledPackage(name, importer);
    resolvedPackages.set(key, installed?.packageRoot);
    snapshot.resolutions.push({ importer, requested: name, root: installed?.packageRoot });
    if (snapshot.resolutions.length > MAX_FILES) {
      throw new Error('Declaration resolutions exceed bounds');
    }
    if (installed) {
      pending.push(installed.packageRoot);
    }
    return installed?.packageRoot;
  };
  const expectInputs = (owner: string, inputs: PackageIndex['declarationInputs']): void => {
    for (const input of inputs) {
      expected.set(contained(owner, input.path), input.fingerprint.value);
    }
  };
  const resolveOwner = (identity: PackageIndex['package'], requested: string, importer: string): string => {
    const requestedRoot = resolveInput(requested, importer);
    const namedRoot = resolveInput(identity.name, importer);
    const owner = [requestedRoot, namedRoot].find(candidate => {
      if (!candidate) {
        return false;
      }
      const manifest = readJson(path.join(candidate, 'package.json'));
      return manifest.name === identity.name && manifest.version === identity.version;
    });
    if (!owner) {
      throw new Error('Declaration dependency identity is unavailable');
    }
    return owner;
  };
  if (result) {
    expectInputs(packageRoot, result.index.declarationInputs);
    for (const descriptor of result.index.records) {
      let importer = packageRoot;
      const owners = new Map<string, string>([
        [`${result.index.package.name}@${result.index.package.version}`, packageRoot],
      ]);
      for (const source of descriptor.source?.packages ?? []) {
        const owner = resolveOwner(source.package, source.requested, importer);
        expectInputs(owner, source.declarationInputs);
        owners.set(`${source.package.name}@${source.package.version}`, owner);
        importer = owner;
      }
      const record = result.records.find(candidate => candidate.recordId === descriptor.id);
      if (!record) {
        throw new Error('Generated record is missing');
      }
      const owner =
        owners.get(`${record.package.name}@${record.package.version}`) ??
        resolveInput(record.package.name, packageRoot);
      if (!owner) {
        throw new Error('Record declaration owner is unavailable');
      }
      expectInputs(owner, record.declarationInputs);
      for (const input of record.dependencyInputs) {
        const dependency = resolveOwner(input.package, input.requested, owner);
        if (!input.declarationPath) {
          throw new Error('Dependency declaration input is unavailable');
        }
        expected.set(contained(dependency, input.declarationPath), input.declarationFingerprint.value);
      }
    }
  }
  const seen = new Set<string>();
  let fileCount = 0;
  let directoryCount = 0;
  let inputBytes = 0;
  for (const root of pending) {
    if (seen.has(root)) {
      continue;
    }
    seen.add(root);
    if (seen.size > MAX_PACKAGES) {
      throw new Error('Declaration package inventory exceeds bounds');
    }
    snapshot.roots.push(root);
    const manifestFile = path.join(root, 'package.json');
    snapshot.files[manifestFile] = fingerprint(manifestFile);
    const manifest = readJson(manifestFile);
    for (const field of ['dependencies', 'peerDependencies', 'optionalDependencies']) {
      const dependencies = manifest[field];
      for (const requested of Object.keys(dependencies && typeof dependencies === 'object' ? dependencies : {})) {
        resolveInput(requested, root);
      }
    }
    const visit = (directory: string): void => {
      if (++directoryCount > MAX_FILES) {
        throw new Error('Declaration directories exceed bounds');
      }
      snapshot.directories[directory] = statIdentity(directory);
      for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        if (['node_modules', '.git', '.cache'].includes(entry.name)) {
          continue;
        }
        const file = path.join(directory, entry.name);
        if (entry.isSymbolicLink()) {
          throw new Error('Symlink inside a declaration package is not cacheable');
        }
        if (entry.isDirectory()) {
          visit(file);
        } else if (entry.isFile() && (/\.d\.[cm]?ts$/.test(entry.name) || entry.name === 'package.json')) {
          if (++fileCount > MAX_FILES) {
            throw new Error('Declaration files exceed bounds');
          }
          inputBytes += fs.statSync(file).size;
          if (inputBytes > 256 * 1024 * 1024) {
            throw new Error('Declaration contents exceed fingerprint bounds');
          }
          snapshot.files[file] = fingerprint(file);
        }
      }
    };
    visit(root);
  }
  for (const [file, expectedHash] of expected) {
    if (!snapshot.files[file] || snapshot.files[file].hash !== expectedHash) {
      throw new Error('Generated source fingerprint does not match installed declarations');
    }
  }
  return snapshot;
}

function snapshotFresh(snapshot: InputSnapshot): boolean {
  try {
    if (
      !Array.isArray(snapshot.roots) ||
      snapshot.roots.length > MAX_PACKAGES ||
      Object.keys(snapshot.files).length > MAX_FILES ||
      Object.keys(snapshot.directories).length > MAX_FILES ||
      !Array.isArray(snapshot.resolutions) ||
      snapshot.resolutions.length > MAX_FILES
    ) {
      return false;
    }
    const resolvedPackages = new Map<string, string | undefined>();
    for (const resolution of snapshot.resolutions) {
      const key = `${resolution.importer}\0${resolution.requested}`;
      if (!resolvedPackages.has(key)) {
        resolvedPackages.set(key, resolveInstalledPackage(resolution.requested, resolution.importer)?.packageRoot);
      }
      if (!snapshot.roots.includes(resolution.importer) || resolvedPackages.get(key) !== resolution.root) {
        return false;
      }
    }
    for (const [directory, stat] of Object.entries(snapshot.directories)) {
      const root = snapshot.roots.find(candidate => within(candidate, directory));
      if (!root) {
        return false;
      }
      assertSafePath(root, directory);
      if (statIdentity(directory) !== stat) {
        return false;
      }
    }
    for (const [file, value] of Object.entries(snapshot.files)) {
      const root = snapshot.roots.find(candidate => within(candidate, file));
      if (!root || (!/\.d\.[cm]?ts$/.test(file) && path.basename(file) !== 'package.json')) {
        return false;
      }
      assertSafePath(root, file);
      if (fingerprint(file, value).hash !== value.hash) {
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
}

function artifactsFresh(directory: string, artifacts: Record<string, FileFingerprint>): boolean {
  if (!artifacts || !artifacts['index.json'] || Object.keys(artifacts).length > MAX_FILES) {
    return false;
  }
  return Object.entries(artifacts).every(([relative, value]) => {
    const file = contained(directory, relative);
    assertSafePath(directory, file);
    return fingerprint(file, value).hash === value.hash;
  });
}

function readState(location: Location): CacheState | undefined {
  const state = readJson(path.join(location.directory, 'state.json')) as CacheState;
  return state.schema === 1 &&
    state.key === location.key &&
    state.packageRoot === location.packageRoot &&
    state.snapshot?.roots?.includes(location.packageRoot)
    ? state
    : undefined;
}

async function waitForBuilder(location: Location): Promise<void> {
  const deadline = Date.now() + 30 * 60_000;
  const token = activeOwner(location)?.token;
  while (token && activeOwner(location)?.token === token) {
    if (Date.now() >= deadline) {
      throw new Error('Timed out waiting for the active catalog builder; retry the operation');
    }
    await new Promise<void>(resolve => {
      setTimeout(resolve, 250);
    });
  }
}

function acquire(location: Location): LockOwner | undefined {
  let owner: LockOwner | undefined;
  mutate(location, () => {
    owner = acquireUnlocked(location);
  });
  return owner;
}

function acquireUnlocked(location: Location): LockOwner | undefined {
  assertSafePath(location.workspaceRoot, location.lock);
  fs.mkdirSync(location.cacheRoot, { recursive: true, mode: 0o700 });
  if (fs.existsSync(location.lock)) {
    if (activeOwner(location)) {
      return undefined;
    }
    const abandoned = `${location.lock}.${randomUUID()}.abandoned`;
    try {
      fs.renameSync(location.lock, abandoned);
      fs.rmSync(abandoned, { recursive: true, force: true });
    } catch {
      return undefined;
    }
  }
  const owner = { token: randomUUID(), pid: process.pid };
  try {
    fs.mkdirSync(location.lock, { mode: 0o700 });
  } catch {
    return undefined;
  }
  writeJson(path.join(location.lock, 'owner.json'), owner);
  return owner;
}

function activeOwner(location: Location): LockOwner | undefined {
  try {
    assertSafePath(location.workspaceRoot, location.lock);
    const owner = readJson(path.join(location.lock, 'owner.json')) as LockOwner;
    if (!Number.isSafeInteger(owner.pid) || owner.pid <= 0 || typeof owner.token !== 'string') {
      return undefined;
    }
    try {
      process.kill(owner.pid, 0);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ESRCH') {
        return undefined;
      }
    }
    return owner;
  } catch {
    return undefined;
  }
}

function owns(location: CacheScope, owner: LockOwner): boolean {
  try {
    assertSafePath(location.workspaceRoot, location.lock);
    return readJson(path.join(location.lock, 'owner.json')).token === owner.token;
  } catch {
    return false;
  }
}

function release(location: CacheScope, owner: LockOwner): void {
  try {
    mutate(location, () => {
      if (owns(location, owner)) {
        fs.rmSync(location.lock, { recursive: true, force: true });
      }
    });
  } catch {
    return;
  }
}

function fail(location: Location, owner: LockOwner, error: unknown): void {
  try {
    mutate(location, () => {
      if (owns(location, owner)) {
        assertSafePath(location.workspaceRoot, location.failure);
        writeJson(location.failure, { key: location.key, error: message(error) });
      }
    });
  } catch {
    return;
  }
}

function mutate(location: CacheScope, operation: () => void): void {
  const gate = `${location.lock}.mutation`;
  assertSafePath(location.workspaceRoot, gate);
  fs.mkdirSync(location.cacheRoot, { recursive: true, mode: 0o700 });
  try {
    fs.mkdirSync(gate, { mode: 0o700 });
  } catch {
    throw new Error('Catalog cache publication is busy; retry the operation');
  }
  try {
    operation();
  } finally {
    fs.rmdirSync(gate);
  }
}

function fingerprint(file: string, previous?: FileFingerprint): FileFingerprint {
  const stat = statIdentity(file);
  if (previous?.stat === stat && /^[a-f0-9]{64}$/.test(previous.hash)) {
    return previous;
  }
  const size = fs.statSync(file).size;
  if (size > MAX_FILE_BYTES) {
    throw new Error('Cache input exceeds file size bounds');
  }
  return { stat, hash: hash(fs.readFileSync(file)) };
}

function statIdentity(file: string): string {
  const stat = fs.statSync(file, { bigint: true });
  return [stat.dev, stat.ino, stat.size, stat.mtimeNs, stat.ctimeNs].join(':');
}

function hash(value: string | Buffer): string {
  return createHash('sha256').update(value).digest('hex');
}

function readJson<T = Record<string, unknown>>(file: string): T {
  const stat = fs.lstatSync(file);
  if (!stat.isFile() || stat.size > MAX_JSON_BYTES) {
    throw new Error('Cache JSON is not a bounded regular file');
  }
  return JSON.parse(fs.readFileSync(file, 'utf8')) as T;
}

function writeJson(file: string, value: unknown): void {
  const serialized = JSON.stringify(value);
  if (Buffer.byteLength(serialized) > MAX_JSON_BYTES) {
    throw new Error('Cache state exceeds size bounds');
  }
  const temporary = `${file}.${randomUUID()}.tmp`;
  try {
    fs.writeFileSync(temporary, serialized, { flag: 'wx', mode: 0o600 });
    fs.renameSync(temporary, file);
  } finally {
    fs.rmSync(temporary, { force: true });
  }
}

function contained(root: string, relative: string): string {
  const target = path.resolve(root, relative);
  if (path.isAbsolute(relative) || !within(root, target)) {
    throw new Error('Cache path escapes its root');
  }
  return target;
}

function within(root: string, target: string): boolean {
  const relative = path.relative(root, target);
  return relative === '' || (relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative));
}

function assertSafePath(root: string, target: string): void {
  if (!within(root, target)) {
    throw new Error('Cache path escapes its root');
  }
  let current = root;
  for (const part of path.relative(root, target).split(path.sep).filter(Boolean)) {
    current = path.join(current, part);
    try {
      if (fs.lstatSync(current).isSymbolicLink()) {
        throw new Error('Cache path contains a symlink');
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error;
      }
    }
  }
}

function message(error: unknown): string {
  return (error instanceof Error ? error.message : String(error)).slice(0, 2_000);
}

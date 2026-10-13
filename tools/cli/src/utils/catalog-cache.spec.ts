import { createMetadataReader, fingerprintMetadata } from '@fluentui/api-metadata';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import {
  buildCatalogCache,
  clearCatalogCache,
  getCachedPackageCatalog,
  getCatalogToolchainIdentity,
  inspectCatalogCache,
  runCatalogCacheWorker,
  startCatalogCacheBuild,
} from './catalog-cache';
import { getCatalogInventory } from './catalog-inventory';
import type { loadMetadataGenerator } from './metadata-generator';

jest.mock('node:fs', () => {
  const actual = jest.requireActual('node:fs');
  return { ...actual, existsSync: jest.fn(actual.existsSync), readFileSync: jest.fn(actual.readFileSync) };
});

jest.mock('@fluentui/api-metadata/generator', () => {
  const actual = jest.requireActual('@fluentui/api-metadata/generator');
  return { ...actual, generateApiMetadata: jest.fn(actual.generateApiMetadata) };
});

const generator = require('@fluentui/api-metadata/generator') as jest.Mocked<ReturnType<typeof loadMetadataGenerator>>;

describe('repo-local full catalog cache', () => {
  const directories: string[] = [];

  beforeEach(() => {
    const actualFs = jest.requireActual<typeof fs>('node:fs');
    jest.mocked(fs.existsSync).mockImplementation(actualFs.existsSync);
    jest.mocked(fs.readFileSync).mockImplementation(actualFs.readFileSync);
    generator.generateApiMetadata.mockReset();
    generator.generateApiMetadata.mockImplementation(
      jest.requireActual('@fluentui/api-metadata/generator').generateApiMetadata,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
    for (const directory of directories.splice(0)) {
      fs.rmSync(directory, { recursive: true, force: true });
    }
  });

  function fixture() {
    const directory = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'fluentui-full-catalog-')));
    directories.push(directory);
    fs.writeFileSync(path.join(directory, '.git'), 'gitdir: /unused/worktree\n');
    fs.writeFileSync(path.join(directory, 'package.json'), JSON.stringify({ private: true }));
    const packageRoot = path.join(directory, 'node_modules', 'cache-fixture');
    fs.mkdirSync(packageRoot, { recursive: true });
    fs.writeFileSync(
      path.join(packageRoot, 'package.json'),
      JSON.stringify({
        name: 'cache-fixture',
        version: '1.0.0',
        types: 'index.d.ts',
      }),
    );
    const declaration = path.join(packageRoot, 'index.d.ts');
    fs.writeFileSync(declaration, 'export interface Button { label: string; }\n');
    const options = { cwd: directory, package: 'cache-fixture' };
    const root = getCatalogInventory(options).roots[0];
    return { directory, packageRoot, declaration, options, root };
  }

  it('publishes canonical full metadata once and reuses it across directories of the same repo', async () => {
    const { directory, packageRoot, options, root } = fixture();
    expect(getCachedPackageCatalog(root, options)).toBeUndefined();
    const status = await buildCatalogCache(options);
    expect(status.workspaceRoot).toBe(directory);
    expect(status.cacheRoot).toBe(path.join(directory, '.cache/fluentui-cli/catalogs'));
    expect(status.packages).toEqual([expect.objectContaining({ state: 'ready', source: 'declarations' })]);
    const cached = getCachedPackageCatalog(root, options)!;
    expect(cached.status).toBe('ready');
    expect(cached.packageRoot).toBe(packageRoot);
    expect(cached.metadataRoot).toBe(path.dirname(cached.metadataFile));
    expect(cached.index.completeness.api.status).toBe('complete');
    expect(path.basename(cached.metadataFile)).toBe('index.json');
    const before = fs.statSync(cached.metadataFile).mtimeMs;
    const child = path.join(directory, 'apps', 'demo');
    fs.mkdirSync(child, { recursive: true });
    fs.writeFileSync(path.join(child, 'package.json'), JSON.stringify({ private: true }));
    fs.writeFileSync(path.join(child, 'yarn.lock'), '');
    expect(getCachedPackageCatalog(root, { ...options, cwd: child })).toEqual(cached);
    await buildCatalogCache({ ...options, cwd: child });
    expect(fs.statSync(cached.metadataFile).mtimeMs).toBe(before);
    expect(generator.generateApiMetadata).toHaveBeenCalledTimes(1);
    expect(generator.generateApiMetadata).toHaveBeenCalledWith({
      packageRoot,
      packageName: 'cache-fixture',
      detail: 'full',
    });
  });

  it('registers cached metadata with the original installed package root', async () => {
    const { options, root } = fixture();
    await buildCatalogCache(options);
    const cached = getCachedPackageCatalog(root, options)!;
    const reader = createMetadataReader();
    reader.registerPackageCatalog({ ...cached, requested: root.requestedPackage, importer: root.importer });
    const catalog = reader.loadPackageIndex(root.requestedPackage, root.importer);
    expect(catalog.index).toEqual(cached.index);
    expect(reader.loadApiRecord(catalog, catalog.index.records[0].id).symbols[0].name).toBe('Button');
  });

  it('reports only package-level generation, publication, completion and reuse progress', async () => {
    const { options } = fixture();
    const progress = jest.fn();
    await buildCatalogCache({ ...options, onProgress: progress });
    expect(progress.mock.calls.map(([event]) => event.phase)).toEqual(['generating', 'writing', 'ready']);
    expect(progress).toHaveBeenCalledWith(
      expect.objectContaining({
        phase: 'ready',
        package: 'cache-fixture',
        records: 1,
        elapsedMs: expect.any(Number),
      }),
    );
    progress.mockClear();
    await buildCatalogCache({ ...options, onProgress: progress });
    expect(progress.mock.calls.map(([event]) => event.phase)).toEqual(['reused']);
    expect(progress).toHaveBeenCalledWith(expect.objectContaining({ source: 'declarations', records: 1 }));
    generator.generateApiMetadata.mockRejectedValueOnce(new Error('progress failure fixture'));
    progress.mockClear();
    await buildCatalogCache({ ...options, force: true, onProgress: progress });
    expect(progress.mock.calls.map(([event]) => event.phase)).toEqual(['generating', 'failed']);
  });

  it('invalidates changed or added declarations and can clear a ready catalog', async () => {
    const { declaration, packageRoot, options, root } = fixture();
    await buildCatalogCache(options);
    fs.writeFileSync(declaration, 'export interface Button { revised: boolean; }\n');
    expect(getCachedPackageCatalog(root, options)).toBeUndefined();
    expect(inspectCatalogCache(options).packages[0].state).toBe('stale');
    await buildCatalogCache(options);
    fs.writeFileSync(path.join(packageRoot, 'added.d.ts'), 'export interface Added {}\n');
    expect(getCachedPackageCatalog(root, options)).toBeUndefined();
    await buildCatalogCache(options);
    await clearCatalogCache(options);
    expect(getCachedPackageCatalog(root, options)).toBeUndefined();
  });

  it('does not generate missing shipped metadata in required mode', async () => {
    const { directory, options, root } = fixture();
    const required = { ...options, metadataMode: 'required' as const };
    expect(getCachedPackageCatalog(root, required)).toBeUndefined();
    expect((await buildCatalogCache(required)).packages[0].state).toBe('failed');
    expect(fs.existsSync(path.join(directory, '.cache'))).toBe(false);
    expect(generator.generateApiMetadata).not.toHaveBeenCalled();
  });

  it('keeps shipped metadata authoritative, except in off mode', async () => {
    const { packageRoot, options } = fixture();
    const result = await generator.generateApiMetadata({ packageRoot, detail: 'full' });
    generator.writeGeneratedMetadata(result, path.join(packageRoot, 'catalog'));
    const manifest = JSON.parse(fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf8'));
    fs.writeFileSync(
      path.join(packageRoot, 'package.json'),
      JSON.stringify({
        ...manifest,
        exports: { '.': { types: './index.d.ts' }, './metadata.json': './catalog/index.json' },
      }),
    );
    generator.generateApiMetadata.mockClear();
    const root = getCatalogInventory(options).roots[0];
    expect(root.catalog).toBeDefined();
    expect(getCachedPackageCatalog(root, options)?.source).toBe('metadata');
    expect((await buildCatalogCache(options)).packages[0].source).toBe('metadata');
    expect(generator.generateApiMetadata).not.toHaveBeenCalled();
    expect((await buildCatalogCache({ ...options, metadataMode: 'off' })).packages[0].source).toBe('declarations');
  });

  it('fingerprints an aliased declaration owner instead of a same-version canonical installation', async () => {
    const { packageRoot, declaration, options, root } = fixture();
    fs.writeFileSync(
      path.join(packageRoot, 'package.json'),
      JSON.stringify({
        name: 'cache-fixture',
        version: '1.0.0',
        types: 'index.d.ts',
        dependencies: { 'owner-lib': '1.0.0', 'owner-alias': 'npm:owner-lib@1.0.0' },
      }),
    );
    fs.writeFileSync(declaration, "export { Widget } from 'owner-alias';\n");
    for (const [name, value] of [
      ['owner-lib', 'number'],
      ['owner-alias', 'string'],
    ]) {
      const owner = path.join(packageRoot, 'node_modules', name);
      fs.mkdirSync(owner, { recursive: true });
      fs.writeFileSync(
        path.join(owner, 'package.json'),
        JSON.stringify({
          name: 'owner-lib',
          version: '1.0.0',
          types: 'index.d.ts',
        }),
      );
      fs.writeFileSync(path.join(owner, 'index.d.ts'), `export interface Widget { value: ${value}; }\n`);
    }
    const result = await buildCatalogCache(options);
    expect(result.packages[0].state).toBe('ready');
    expect(getCachedPackageCatalog(root, options)?.status).toBe('ready');
  });

  it('fails open on corrupted records, indexes, state and symlinked cache directories', async () => {
    const { directory, options, root } = fixture();
    for (const corrupt of ['record', 'index', 'state']) {
      await buildCatalogCache(options);
      const cached = getCachedPackageCatalog(root, options)!;
      const file =
        corrupt === 'record'
          ? path.join(path.dirname(cached.metadataFile), cached.index.records[0].path)
          : corrupt === 'index'
          ? cached.metadataFile
          : path.join(path.dirname(cached.metadataFile), 'state.json');
      fs.writeFileSync(file, '{broken');
      expect(getCachedPackageCatalog(root, options)).toBeUndefined();
    }
    fs.rmSync(path.join(directory, '.cache'), { recursive: true, force: true });
    const outside = fs.mkdtempSync(path.join(os.tmpdir(), 'fluentui-cache-outside-'));
    directories.push(outside);
    fs.symlinkSync(outside, path.join(directory, '.cache'));
    expect(getCachedPackageCatalog(root, options)).toBeUndefined();
    expect((await buildCatalogCache(options)).packages[0].state).toBe('failed');
    expect(fs.readdirSync(outside)).toEqual([]);
  });

  it('does not publish after clear cancels an active generation', async () => {
    const { options, root } = fixture();
    const actual = jest.requireActual<ReturnType<typeof loadMetadataGenerator>>('@fluentui/api-metadata/generator');
    let finish!: () => void;
    const pending = new Promise<void>(resolve => {
      finish = resolve;
    });
    generator.generateApiMetadata.mockImplementationOnce(async request => {
      await pending;
      return actual.generateApiMetadata(request);
    });
    const first = buildCatalogCache(options);
    expect(inspectCatalogCache(options).packages[0].state).toBe('building');
    expect(generator.generateApiMetadata).toHaveBeenCalledTimes(1);
    clearCatalogCache(options);
    finish();
    await first;
    expect(getCachedPackageCatalog(root, options)).toBeUndefined();
    expect((await buildCatalogCache(options)).packages[0].state).toBe('ready');
  });

  it('waits for an active foreground builder without starting duplicate generation', async () => {
    const { options } = fixture();
    const actual = jest.requireActual<ReturnType<typeof loadMetadataGenerator>>('@fluentui/api-metadata/generator');
    let finish!: () => void;
    const pending = new Promise<void>(resolve => {
      finish = resolve;
    });
    generator.generateApiMetadata.mockImplementationOnce(async request => {
      await pending;
      return actual.generateApiMetadata(request);
    });
    jest.useFakeTimers();
    try {
      const first = buildCatalogCache(options);
      let completed = false;
      const second = buildCatalogCache(options).then(result => {
        completed = true;
        return result;
      });
      await jest.advanceTimersByTimeAsync(250);
      expect(completed).toBe(false);
      expect(generator.generateApiMetadata).toHaveBeenCalledTimes(1);
      finish();
      await first;
      await jest.advanceTimersByTimeAsync(250);
      expect((await second).packages[0].state).toBe('ready');
      expect(generator.generateApiMetadata).toHaveBeenCalledTimes(1);
    } finally {
      finish();
      jest.useRealTimers();
    }
  });

  it('bounds a foreground wait and reports failure instead of a completed building state', async () => {
    const { options } = fixture();
    const actual = jest.requireActual<ReturnType<typeof loadMetadataGenerator>>('@fluentui/api-metadata/generator');
    let finish!: () => void;
    const pending = new Promise<void>(resolve => {
      finish = resolve;
    });
    generator.generateApiMetadata.mockImplementationOnce(async request => {
      await pending;
      return actual.generateApiMetadata(request);
    });
    jest.useFakeTimers();
    const first = buildCatalogCache(options);
    try {
      const second = buildCatalogCache(options);
      jest.setSystemTime(Date.now() + 30 * 60_000);
      await jest.advanceTimersByTimeAsync(250);
      expect((await second).packages[0]).toMatchObject({
        state: 'failed',
        error: expect.stringContaining('Timed out'),
      });
      expect(inspectCatalogCache(options).packages[0].state).toBe('building');
      expect(generator.generateApiMetadata).toHaveBeenCalledTimes(1);
    } finally {
      finish();
      await first;
      jest.useRealTimers();
    }
  });

  it('records generation failures and permits a later retry', async () => {
    const { options } = fixture();
    generator.generateApiMetadata.mockRejectedValueOnce(new Error('fixture generation failure'));
    expect((await buildCatalogCache(options)).packages[0]).toMatchObject({
      state: 'failed',
      error: 'fixture generation failure',
    });
    expect(inspectCatalogCache(options).packages[0].state).toBe('failed');
    expect((await buildCatalogCache(options)).packages[0].state).toBe('ready');
  });

  it('waits for a live long-running builder instead of failing after thirty seconds', async () => {
    const { options } = fixture();
    const actual = jest.requireActual<ReturnType<typeof loadMetadataGenerator>>('@fluentui/api-metadata/generator');
    let finish!: () => void;
    const pending = new Promise<void>(resolve => {
      finish = resolve;
    });
    generator.generateApiMetadata.mockImplementationOnce(async request => {
      await pending;
      return actual.generateApiMetadata(request);
    });
    jest.useFakeTimers({ doNotFake: ['nextTick', 'queueMicrotask'] });
    const first = buildCatalogCache(options);
    const settled = jest.fn();
    const second = buildCatalogCache(options).then(result => {
      settled(result);
      return result;
    });
    try {
      await jest.advanceTimersByTimeAsync(31_000);
      expect(settled).not.toHaveBeenCalled();
    } finally {
      finish();
      await jest.advanceTimersByTimeAsync(500);
      await Promise.all([first, second]);
      jest.useRealTimers();
    }
    expect(settled).toHaveBeenCalledWith(
      expect.objectContaining({
        packages: [expect.objectContaining({ state: 'ready' })],
      }),
    );
  });

  it('invalidates transitive declarations, added files and changed importer-scoped resolutions', async () => {
    const { packageRoot, declaration, options, root } = fixture();
    const owner = path.join(packageRoot, 'node_modules', 'owner-lib');
    const base = path.join(owner, 'node_modules', 'base-types');
    fs.mkdirSync(base, { recursive: true });
    fs.writeFileSync(
      path.join(packageRoot, 'package.json'),
      JSON.stringify({
        name: 'cache-fixture',
        version: '1.0.0',
        types: 'index.d.ts',
        dependencies: { 'owner-lib': '1.0.0' },
      }),
    );
    fs.writeFileSync(declaration, "export { Button } from 'owner-lib';\n");
    fs.writeFileSync(
      path.join(owner, 'package.json'),
      JSON.stringify({
        name: 'owner-lib',
        version: '1.0.0',
        types: 'index.d.ts',
        dependencies: { 'base-types': '1.0.0' },
      }),
    );
    fs.writeFileSync(
      path.join(owner, 'index.d.ts'),
      "import type { Base } from 'base-types'; export interface Button extends Base { label: string; }\n",
    );
    fs.writeFileSync(
      path.join(base, 'package.json'),
      JSON.stringify({ name: 'base-types', version: '1.0.0', types: 'index.d.ts' }),
    );
    fs.writeFileSync(path.join(base, 'index.d.ts'), 'export interface Base { value: string; }\n');
    expect((await buildCatalogCache(options)).packages[0].state).toBe('ready');
    fs.writeFileSync(path.join(base, 'index.d.ts'), 'export interface Base { value: number; }\n');
    expect(getCachedPackageCatalog(root, options)).toBeUndefined();
    await buildCatalogCache(options);
    fs.writeFileSync(path.join(base, 'added.d.ts'), 'export interface Added {}\n');
    expect(getCachedPackageCatalog(root, options)).toBeUndefined();
    await buildCatalogCache(options);
    fs.unlinkSync(path.join(base, 'added.d.ts'));
    expect(getCachedPackageCatalog(root, options)).toBeUndefined();
    await buildCatalogCache(options);
    const moved = path.join(packageRoot, 'node_modules', 'base-types');
    fs.renameSync(base, moved);
    expect(getCachedPackageCatalog(root, options)).toBeUndefined();
  });

  it('does not load the generator or compiler for a ready lookup', async () => {
    const { options, root } = fixture();
    await buildCatalogCache(options);
    const forbidden = jest.fn(() => {
      throw new Error('Parser must not be loaded');
    });
    jest.doMock('@fluentui/api-metadata/generator', forbidden);
    jest.doMock('typescript', forbidden);
    try {
      jest.isolateModules(() => {
        const cache = require('./catalog-cache') as typeof import('./catalog-cache');
        expect(cache.getCachedPackageCatalog(root, options)?.status).toBe('ready');
        const service = require('./metadata-generator') as typeof import('./metadata-generator');
        expect(service.loadMetadataGenerator()).toBeDefined();
      });
      expect(forbidden).not.toHaveBeenCalled();
    } finally {
      jest.doMock('@fluentui/api-metadata/generator', () => generator);
      jest.dontMock('typescript');
    }
  });

  it('does not reread declarations or compiler runtime on an unchanged warm lookup', async () => {
    const { options, root } = fixture();
    await buildCatalogCache(options);
    const read = jest.spyOn(require('node:fs'), 'readFileSync');
    read.mockClear();
    expect(getCachedPackageCatalog(root, options)?.status).toBe('ready');
    expect(
      read.mock.calls.map(call => String(call[0])).filter(file => /\.d\.[cm]?ts$|typescript\.js$/.test(file)),
    ).toEqual([]);
  });

  it('validates repeated shard dependency resolutions once per importer and package', async () => {
    const { packageRoot, options, root } = fixture();
    const dependencyRoot = path.join(packageRoot, 'node_modules', 'helper-lib');
    fs.mkdirSync(dependencyRoot, { recursive: true });
    fs.writeFileSync(
      path.join(dependencyRoot, 'package.json'),
      JSON.stringify({
        name: 'helper-lib',
        version: '1.0.0',
        types: 'index.d.ts',
      }),
    );
    fs.writeFileSync(path.join(dependencyRoot, 'index.d.ts'), 'export interface Helper {}\n');
    fs.writeFileSync(
      path.join(packageRoot, 'package.json'),
      JSON.stringify({
        name: 'cache-fixture',
        version: '1.0.0',
        types: 'index.d.ts',
        dependencies: { 'helper-lib': '1.0.0' },
      }),
    );
    await buildCatalogCache(options);
    const cached = getCachedPackageCatalog(root, options)!;
    const stateFile = path.join(cached.metadataRoot!, 'state.json');
    const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    const resolution = state.snapshot.resolutions.find(
      (entry: { requested: string }) => entry.requested === 'helper-lib',
    );
    expect(resolution).toBeDefined();
    state.snapshot.resolutions = Array.from({ length: 300 }, () => resolution);
    fs.writeFileSync(stateFile, JSON.stringify(state));
    const read = jest.spyOn(require('node:fs'), 'readFileSync');
    read.mockClear();
    expect(getCachedPackageCatalog(root, options)?.status).toBe('ready');
    expect(
      read.mock.calls.filter(call => String(call[0]) === path.join(dependencyRoot, 'package.json')).length,
    ).toBeLessThan(5);
  });

  it('uses persisted stat identities without reading records or compiler contents in a fresh module', async () => {
    const { options, root } = fixture();
    const actual = jest.requireActual<ReturnType<typeof loadMetadataGenerator>>('@fluentui/api-metadata/generator');
    generator.generateApiMetadata.mockImplementationOnce(async request => {
      const generated = await actual.generateApiMetadata(request);
      const descriptor = generated.index.records[0];
      const record = generated.records[0];
      generated.index.records = Array.from({ length: 400 }, (_, ordinal) => ({
        ...descriptor,
        id: `${descriptor.id}-${ordinal}`,
        path: `records/api-${ordinal}.json`,
      }));
      generated.records = generated.index.records.map(item => ({ ...record, recordId: item.id }));
      generated.index.records = generated.index.records.map((item, ordinal) => ({
        ...item,
        fingerprint: fingerprintMetadata(generated.records[ordinal]),
      }));
      generated.index.exports = generated.index.exports.map(route => ({
        ...route,
        target:
          route.target.kind === 'local' ? { ...route.target, record: generated.index.records[0].id } : route.target,
      }));
      return generated;
    });
    await buildCatalogCache(options);
    const cached = getCachedPackageCatalog(root, options)!;
    expect(cached.index.records).toHaveLength(400);
    const recordPaths = cached.index.records.map(record => path.join(cached.metadataRoot!, record.path));
    jest.isolateModules(() => {
      const cache = require('./catalog-cache') as typeof import('./catalog-cache');
      const isolatedFs = require('node:fs') as typeof fs;
      const read = jest.mocked(isolatedFs.readFileSync);
      read.mockClear();
      expect(cache.getCachedPackageCatalog(root, options)?.status).toBe('ready');
      expect(
        read.mock.calls
          .map(call => String(call[0]))
          .filter(file => recordPaths.includes(file) || /\.d\.[cm]?ts$|typescript\.js$/.test(file)),
      ).toEqual([]);
    });
  });

  it('identifies the shipped toolchain without reading runtime contents or writing lookup state', () => {
    const { directory } = fixture();
    const read = jest.mocked(fs.readFileSync);
    read.mockClear();
    expect(getCatalogToolchainIdentity(directory)).toMatch(/^[a-f0-9]{64}$/);
    expect(read.mock.calls.map(call => String(call[0])).filter(file => /\.[cm]?js$/.test(file))).toEqual([]);
    expect(fs.existsSync(path.join(directory, '.cache'))).toBe(false);
  });

  it('spawns one quiet detached compiled worker without parent execArgv', () => {
    const { options } = fixture();
    const nativeFs = require('node:fs') as typeof fs;
    const exists = jest.requireActual<typeof fs>('node:fs').existsSync;
    jest
      .spyOn(nativeFs, 'existsSync')
      .mockImplementation(file => String(file).endsWith('catalog-cache-worker.js') || exists(file));
    const child = { pid: process.pid, on: jest.fn(), unref: jest.fn() };
    const spawn = jest.spyOn(require('node:child_process'), 'spawn').mockReturnValue(child);
    startCatalogCacheBuild(options);
    startCatalogCacheBuild(options);
    expect(spawn).toHaveBeenCalledTimes(1);
    const [executable, args, settings] = spawn.mock.calls[0];
    expect(executable).toBe(process.execPath);
    expect(args).toEqual([expect.stringMatching(/catalog-cache-worker\.js$/), expect.any(String)]);
    expect(settings).toMatchObject({ detached: true, stdio: 'ignore', env: { NODE_OPTIONS: '' } });
    expect(child.unref).toHaveBeenCalledTimes(1);
    expect(inspectCatalogCache(options).packages[0].state).toBe('building');
    clearCatalogCache(options);
    expect(inspectCatalogCache(options).packages[0].state).toBe('stale');
  });

  it('cleans a failed worker reservation and reports its failure', () => {
    const { options } = fixture();
    const nativeFs = require('node:fs') as typeof fs;
    const exists = jest.requireActual<typeof fs>('node:fs').existsSync;
    jest
      .spyOn(nativeFs, 'existsSync')
      .mockImplementation(file => String(file).endsWith('catalog-cache-worker.js') || exists(file));
    const child = { pid: process.pid, on: jest.fn(), unref: jest.fn() };
    jest.spyOn(require('node:child_process'), 'spawn').mockReturnValue(child);
    startCatalogCacheBuild(options);
    const onExit = child.on.mock.calls.find(call => call[0] === 'exit')?.[1];
    expect(onExit).toEqual(expect.any(Function));
    onExit(1, null);
    const status = inspectCatalogCache(options);
    expect(status.packages[0]).toMatchObject({ state: 'failed', error: expect.stringContaining('worker') });
    expect(fs.readdirSync(status.cacheRoot).filter(name => name.endsWith('.lock'))).toEqual([]);
  });

  it('reaps a dead worker lock during status inspection', () => {
    const { options } = fixture();
    const nativeFs = require('node:fs') as typeof fs;
    const exists = jest.requireActual<typeof fs>('node:fs').existsSync;
    jest
      .spyOn(nativeFs, 'existsSync')
      .mockImplementation(file => String(file).endsWith('catalog-cache-worker.js') || exists(file));
    const child = { pid: 999_999_999, on: jest.fn(), unref: jest.fn() };
    jest.spyOn(require('node:child_process'), 'spawn').mockReturnValue(child);
    startCatalogCacheBuild(options);
    jest.spyOn(process, 'kill').mockImplementation(() => {
      throw Object.assign(new Error('No process'), { code: 'ESRCH' });
    });
    const status = inspectCatalogCache(options);
    expect(status.packages[0]).toMatchObject({ state: 'failed', error: expect.stringContaining('exited') });
    expect(fs.readdirSync(status.cacheRoot).filter(name => name.endsWith('.lock'))).toEqual([]);
  });

  it('does not let a cleared worker token publish or remove a replacement reservation', async () => {
    const { options, packageRoot } = fixture();
    const nativeFs = require('node:fs') as typeof fs;
    const exists = jest.requireActual<typeof fs>('node:fs').existsSync;
    jest
      .spyOn(nativeFs, 'existsSync')
      .mockImplementation(file => String(file).endsWith('catalog-cache-worker.js') || exists(file));
    const child = { pid: process.pid, on: jest.fn(), unref: jest.fn() };
    const spawn = jest.spyOn(require('node:child_process'), 'spawn').mockReturnValue(child);
    startCatalogCacheBuild(options);
    const request = JSON.parse((spawn.mock.calls[0][1] as string[])[1]);
    clearCatalogCache(options);
    startCatalogCacheBuild(options);
    await runCatalogCacheWorker(options, packageRoot, request.token);
    expect(generator.generateApiMetadata).not.toHaveBeenCalled();
    expect(inspectCatalogCache(options).packages[0].state).toBe('building');
    clearCatalogCache(options);
  });

  it('releases its reservation if the worker package disappears before startup', async () => {
    const { options, packageRoot } = fixture();
    const nativeFs = require('node:fs') as typeof fs;
    const exists = jest.requireActual<typeof fs>('node:fs').existsSync;
    jest
      .spyOn(nativeFs, 'existsSync')
      .mockImplementation(file => String(file).endsWith('catalog-cache-worker.js') || exists(file));
    const child = { pid: process.pid, on: jest.fn(), unref: jest.fn() };
    const spawn = jest.spyOn(require('node:child_process'), 'spawn').mockReturnValue(child);
    startCatalogCacheBuild(options);
    const request = JSON.parse((spawn.mock.calls[0][1] as string[])[1]);
    const cacheRoot = inspectCatalogCache(options).cacheRoot;
    fs.rmSync(packageRoot, { recursive: true, force: true });
    await runCatalogCacheWorker(options, packageRoot, request.token);
    expect(fs.readdirSync(cacheRoot).filter(name => name.endsWith('.lock'))).toEqual([]);
    expect(generator.generateApiMetadata).not.toHaveBeenCalled();
  });

  it.each(['error', 'unavailable', 'missing-source'])('discards %s generation results', async kind => {
    const { options, root } = fixture();
    const actual = jest.requireActual<ReturnType<typeof loadMetadataGenerator>>('@fluentui/api-metadata/generator');
    generator.generateApiMetadata.mockImplementationOnce(async request => {
      const generated = await actual.generateApiMetadata(request);
      if (kind === 'error') {
        generated.diagnostics.push({ code: 'test.error', severity: 'error', message: 'generation failed' });
      } else if (kind === 'unavailable') {
        generated.index.completeness.api = { status: 'unavailable', reasons: ['declarations unavailable'] };
      } else {
        generated.index.declarationInputs = [];
      }
      return generated;
    });
    expect((await buildCatalogCache(options)).packages[0].state).toBe('failed');
    expect(getCachedPackageCatalog(root, options)).toBeUndefined();
    expect((await buildCatalogCache(options)).packages[0].state).toBe('ready');
  });

  it('recursively builds metadata dependency targets using each importer and nested version identity', async () => {
    const { packageRoot, options } = fixture();
    const createPackage = (root: string, name: string, version: string, dependencies: Record<string, string> = {}) => {
      fs.mkdirSync(root, { recursive: true });
      fs.writeFileSync(
        path.join(root, 'package.json'),
        JSON.stringify({ name, version, types: 'index.d.ts', dependencies }),
      );
      fs.writeFileSync(path.join(root, 'index.d.ts'), 'export interface Button { label: string; }\n');
    };
    createPackage(packageRoot, 'cache-fixture', '1.0.0', { 'left-lib': '1.0.0', 'right-lib': '1.0.0' });
    const left = path.join(packageRoot, 'node_modules/left-lib');
    const right = path.join(packageRoot, 'node_modules/right-lib');
    createPackage(left, 'left-lib', '1.0.0', { 'nested-lib': '1.0.0' });
    createPackage(right, 'right-lib', '1.0.0', { 'nested-lib': '2.0.0' });
    createPackage(path.join(left, 'node_modules/nested-lib'), 'nested-lib', '1.0.0');
    createPackage(path.join(right, 'node_modules/nested-lib'), 'nested-lib', '2.0.0');
    const actual = jest.requireActual<ReturnType<typeof loadMetadataGenerator>>('@fluentui/api-metadata/generator');
    generator.generateApiMetadata.mockImplementation(async request => {
      const generated = await actual.generateApiMetadata(request);
      const names =
        request.packageName === 'cache-fixture'
          ? ['left-lib', 'right-lib']
          : request.packageName === 'left-lib' || request.packageName === 'right-lib'
          ? ['nested-lib']
          : [];
      if (names.length) {
        generated.index.completeness.api = {
          status: 'partial',
          reasons: ['dependency catalogs remain to be resolved'],
        };
        const route = generated.index.exports[0];
        generated.index.exports = names.map((name, ordinal) => ({
          ...route,
          id: `${route.id}-${ordinal}`,
          export: `Button${ordinal}`,
          target: {
            kind: 'dependency',
            package: name,
            requested: name,
            entrypoint: '.',
            export: 'Button',
            namespace: 'type',
          },
        }));
      }
      return generated;
    });
    const result = await buildCatalogCache(options);
    expect(result.packages).toHaveLength(5);
    expect(result.packages.every(entry => entry.state === 'ready')).toBe(true);
    expect(
      result.packages
        .filter(entry => entry.package === 'nested-lib')
        .map(entry => entry.packageRoot)
        .sort(),
    ).toEqual([path.join(left, 'node_modules/nested-lib'), path.join(right, 'node_modules/nested-lib')].sort());
    expect(generator.generateApiMetadata).toHaveBeenCalledTimes(5);
    await buildCatalogCache(options);
    expect(generator.generateApiMetadata).toHaveBeenCalledTimes(5);
  });
});

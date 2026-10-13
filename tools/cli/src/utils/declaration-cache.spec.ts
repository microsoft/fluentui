import { createHash } from 'node:crypto';
import type { GeneratorOptions, GeneratorResult } from '@fluentui/api-metadata';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import { generateWithDeclarationCache } from './declaration-cache';
import { loadMetadataGenerator } from './metadata-generator';

const generateApiMetadata = (
  require('@fluentui/api-metadata/generator') as {
    generateApiMetadata(options: GeneratorOptions): Promise<GeneratorResult>;
  }
).generateApiMetadata;

describe('declaration generation cache', () => {
  const temporaryDirectories: string[] = [];

  afterEach(() => {
    for (const directory of temporaryDirectories.splice(0)) {
      fs.rmSync(directory, { recursive: true, force: true });
    }
  });

  it('reuses a validated result for the same bounded generation request', async () => {
    const fixture = createFixture();
    const options = createOptions(fixture.packageRoot);
    const generate = jest.fn(generateApiMetadata);

    const first = await generateWithDeclarationCache(options, generate, fixture.cacheDirectory);
    const second = await generateWithDeclarationCache(options, generate, fixture.cacheDirectory);

    expect(generate).toHaveBeenCalledTimes(1);
    expect(second).toEqual(first);
  });

  it('recomputes when local declaration content changes', async () => {
    const fixture = createFixture();
    const options = createOptions(fixture.packageRoot);
    const generate = jest.fn(generateApiMetadata);

    await generateWithDeclarationCache(options, generate, fixture.cacheDirectory);
    fs.writeFileSync(fixture.declarationPath, 'export interface Button { label: string; disabled?: boolean; }\n');
    await generateWithDeclarationCache(options, generate, fixture.cacheDirectory);

    expect(generate).toHaveBeenCalledTimes(2);
  });

  it('does not cache an unavailable result when a missing root declaration is repaired', async () => {
    const fixture = createFixture();
    const options = createOptions(fixture.packageRoot);
    const generate = jest.fn(generateApiMetadata);
    fs.unlinkSync(fixture.declarationPath);

    const unavailable = await generateWithDeclarationCache(options, generate, fixture.cacheDirectory);
    expect(unavailable.index.completeness.api.status).toBe('unavailable');

    fs.writeFileSync(fixture.declarationPath, 'export interface Button { label: string; }\n');
    const repaired = await generateWithDeclarationCache(options, generate, fixture.cacheDirectory);

    expect(repaired.index.completeness.api.status).not.toBe('unavailable');
    expect(generate).toHaveBeenCalledTimes(2);
  });

  it('recomputes when a local declaration is added or deleted', async () => {
    const fixture = createFixture();
    const options = createOptions(fixture.packageRoot);
    const generate = jest.fn(generateApiMetadata);
    const added = path.join(fixture.packageRoot, 'added.d.ts');
    await generateWithDeclarationCache(options, generate, fixture.cacheDirectory);
    fs.writeFileSync(added, 'export interface Added { value: string; }\n');
    await generateWithDeclarationCache(options, generate, fixture.cacheDirectory);
    fs.unlinkSync(added);
    await generateWithDeclarationCache(options, generate, fixture.cacheDirectory);
    expect(generate).toHaveBeenCalledTimes(3);
  });

  it('does not cache generation results containing errors', async () => {
    const fixture = createFixture();
    const options = createOptions(fixture.packageRoot);
    const generate = jest.fn(generateApiMetadata).mockImplementationOnce(async request => {
      const result = await generateApiMetadata(request);
      return {
        ...result,
        diagnostics: [...result.diagnostics, { code: 'test.error', severity: 'error', message: 'generation failed' }],
      };
    });

    await generateWithDeclarationCache(options, generate, fixture.cacheDirectory);
    await generateWithDeclarationCache(options, generate, fixture.cacheDirectory);

    expect(generate).toHaveBeenCalledTimes(2);
  });

  it('caches intentionally partial none-detail results and distinguishes detail modes', async () => {
    const fixture = createFixture();
    const generate = jest.fn(generateApiMetadata);
    const selected = { ...createOptions(fixture.packageRoot), detail: 'selected' } as GeneratorOptions;
    const none = { ...createOptions(fixture.packageRoot), detail: 'none' } as GeneratorOptions;

    const selectedResult = await generateWithDeclarationCache(selected, generate, fixture.cacheDirectory);
    const noneResult = await generateWithDeclarationCache(none, generate, fixture.cacheDirectory);
    await generateWithDeclarationCache(selected, generate, fixture.cacheDirectory);
    await generateWithDeclarationCache(none, generate, fixture.cacheDirectory);

    expect(selectedResult.index.completeness.api.status).toBe('partial');
    expect(noneResult.index.completeness.api.status).toBe('partial');
    expect(generate).toHaveBeenCalledTimes(2);
  });

  it('fingerprints bundled declaration inputs relative to their owning package', async () => {
    const fixture = createBundledFixture();
    const options = createOptions(fixture.packageRoot);
    const generate = jest.fn(generateApiMetadata);

    const first = await generateWithDeclarationCache(options, generate, fixture.cacheDirectory);
    const second = await generateWithDeclarationCache(options, generate, fixture.cacheDirectory);

    expect(
      first.index.records.some(record => record.source?.packages.some(item => item.package.name === 'owner-lib')),
    ).toBe(true);
    expect(second).toEqual(first);
    expect(generate).toHaveBeenCalledTimes(1);
  });

  it('recomputes when a transitive dependency declaration changes or is added', async () => {
    const fixture = createBundledFixture();
    const options = createOptions(fixture.packageRoot);
    const generate = jest.fn(generateApiMetadata);

    await generateWithDeclarationCache(options, generate, fixture.cacheDirectory);
    fs.writeFileSync(fixture.transitiveDeclarationPath, 'export interface Root { root: string; revised: boolean; }\n');
    await generateWithDeclarationCache(options, generate, fixture.cacheDirectory);
    fs.writeFileSync(fixture.transitiveExtraDeclarationPath, 'export interface AddedRoot { value: string; }\n');
    await generateWithDeclarationCache(options, generate, fixture.cacheDirectory);

    expect(generate).toHaveBeenCalledTimes(3);
  });

  it('recomputes when a resolved @types declaration changes', async () => {
    const fixture = createFixture();
    const reactRoot = path.join(fixture.packageRoot, 'node_modules', 'react');
    const reactTypesRoot = path.join(fixture.packageRoot, 'node_modules', '@types', 'react');
    fs.mkdirSync(reactRoot, { recursive: true });
    fs.mkdirSync(reactTypesRoot, { recursive: true });
    fs.writeFileSync(
      path.join(fixture.packageRoot, 'package.json'),
      JSON.stringify({
        name: 'cache-fixture',
        version: '1.0.0',
        dependencies: { react: '18.0.0' },
        types: 'index.d.ts',
      }),
    );
    fs.writeFileSync(path.join(reactRoot, 'package.json'), JSON.stringify({ name: 'react', version: '18.0.0' }));
    fs.writeFileSync(
      path.join(reactTypesRoot, 'package.json'),
      JSON.stringify({ name: '@types/react', version: '18.0.0', types: 'index.d.ts' }),
    );
    fs.writeFileSync(
      path.join(reactTypesRoot, 'index.d.ts'),
      "declare module 'react' { export type ReactNode = string; }\n",
    );
    const options = createOptions(fixture.packageRoot);
    const generate = jest.fn(async (request: GeneratorOptions) => {
      const result = await generateApiMetadata(request);
      const declaration = fs.readFileSync(path.join(reactTypesRoot, 'index.d.ts'));
      const dependencyInput: GeneratorResult['records'][number]['dependencyInputs'][number] = {
        requested: 'react',
        package: { name: '@types/react', version: '18.0.0' },
        entrypoint: '.',
        conditions: ['types'],
        declarationPath: 'index.d.ts',
        declarationFingerprint: {
          algorithm: 'sha256',
          value: createHash('sha256').update(declaration).digest('hex'),
        },
      };
      return {
        ...result,
        records: result.records.map(record => ({
          ...record,
          dependencyInputs: [...record.dependencyInputs, dependencyInput],
        })),
      };
    });

    const first = await generateWithDeclarationCache(options, generate, fixture.cacheDirectory);
    expect(
      first.records.some(record => record.dependencyInputs.some(input => input.package.name === '@types/react')),
    ).toBe(true);
    await generateWithDeclarationCache(options, generate, fixture.cacheDirectory);
    fs.writeFileSync(
      path.join(reactTypesRoot, 'index.d.ts'),
      "declare module 'react' { export type ReactNode = string | number; }\n",
    );
    await generateWithDeclarationCache(options, generate, fixture.cacheDirectory);

    expect(generate).toHaveBeenCalledTimes(2);
  });

  it('keeps selected namespace and declaration conditions in the request identity', async () => {
    const fixture = createFixture();
    const generate = jest.fn(generateApiMetadata);

    await generateWithDeclarationCache(createOptions(fixture.packageRoot, 'type'), generate, fixture.cacheDirectory);
    await generateWithDeclarationCache(createOptions(fixture.packageRoot, 'value'), generate, fixture.cacheDirectory);
    await generateWithDeclarationCache(
      createOptions(fixture.packageRoot, 'type', ['types', 'import']),
      generate,
      fixture.cacheDirectory,
    );

    expect(generate).toHaveBeenCalledTimes(3);
  });

  it('recomputes a truncated cache entry', async () => {
    const fixture = createFixture();
    const options = createOptions(fixture.packageRoot);
    const generate = jest.fn(generateApiMetadata);

    await generateWithDeclarationCache(options, generate, fixture.cacheDirectory);
    const [cacheFile] = fs.readdirSync(fixture.cacheDirectory).filter(file => file.endsWith('.json'));
    fs.writeFileSync(path.join(fixture.cacheDirectory, cacheFile), '{"schema":1');
    await generateWithDeclarationCache(options, generate, fixture.cacheDirectory);

    expect(generate).toHaveBeenCalledTimes(2);
  });

  it('keeps generation working when the cache location is not writable', async () => {
    const fixture = createFixture();
    const invalidCachePath = path.join(fixture.directory, 'cache-file');
    fs.writeFileSync(invalidCachePath, 'not a directory');
    const generate = jest.fn(generateApiMetadata);

    const result = await generateWithDeclarationCache(createOptions(fixture.packageRoot), generate, invalidCachePath);

    expect(result.index.package.name).toBe('cache-fixture');
    expect(generate).toHaveBeenCalledTimes(1);
  });

  it('uses one repo-local cache from sibling projects and loads the generator only on a miss', async () => {
    const fixture = createFixture();
    fs.writeFileSync(path.join(fixture.directory, '.git'), 'gitdir: /unused/worktree\n');
    const sibling = path.join(fixture.directory, 'apps', 'second');
    fs.mkdirSync(sibling, { recursive: true });
    fs.writeFileSync(path.join(sibling, 'package.json'), JSON.stringify({ private: true }));
    fs.writeFileSync(path.join(sibling, 'yarn.lock'), '');
    const cwd = jest.spyOn(process, 'cwd').mockReturnValue(fixture.directory);
    try {
      const options = createOptions(fixture.packageRoot);
      const generate = jest.fn(generateApiMetadata);
      const first = await generateWithDeclarationCache(options, generate);
      cwd.mockReturnValue(sibling);
      expect(await generateWithDeclarationCache(options, generate)).toEqual(first);
      expect(generate).toHaveBeenCalledTimes(1);
      expect(fs.readdirSync(path.join(fixture.directory, '.cache/fluentui-cli/declarations'))).toHaveLength(1);
      const forbidden = jest.fn(() => {
        throw new Error('Generator loaded on cache hit');
      });
      jest.doMock('@fluentui/api-metadata/generator', forbidden);
      try {
        expect(await loadMetadataGenerator().generateApiMetadata(options)).toEqual(first);
        expect(forbidden).not.toHaveBeenCalled();
      } finally {
        jest.dontMock('@fluentui/api-metadata/generator');
      }
    } finally {
      cwd.mockRestore();
    }
  });

  function createFixture(): {
    directory: string;
    packageRoot: string;
    declarationPath: string;
    cacheDirectory: string;
  } {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'fluentui-cli-declaration-cache-'));
    temporaryDirectories.push(directory);
    const packageRoot = path.join(directory, 'package');
    const cacheDirectory = path.join(directory, 'cache');
    fs.mkdirSync(packageRoot, { recursive: true });
    fs.writeFileSync(
      path.join(packageRoot, 'package.json'),
      JSON.stringify({ name: 'cache-fixture', version: '1.0.0', types: 'index.d.ts' }),
    );
    const declarationPath = path.join(packageRoot, 'index.d.ts');
    fs.writeFileSync(declarationPath, 'export interface Button { label: string; }\n');
    return { directory, packageRoot, declarationPath, cacheDirectory };
  }

  function createBundledFixture(): {
    packageRoot: string;
    cacheDirectory: string;
    transitiveDeclarationPath: string;
    transitiveExtraDeclarationPath: string;
  } {
    const fixture = createFixture();
    const ownerRoot = path.join(fixture.packageRoot, 'node_modules', 'owner-lib');
    const dependencyRoot = path.join(ownerRoot, 'node_modules', 'base-types');
    const transitiveDeclarationPath = path.join(dependencyRoot, 'root.d.ts');
    const transitiveExtraDeclarationPath = path.join(dependencyRoot, 'added.d.ts');

    fs.writeFileSync(
      path.join(fixture.packageRoot, 'package.json'),
      JSON.stringify({
        name: 'cache-fixture',
        version: '1.0.0',
        types: 'index.d.ts',
        dependencies: { 'owner-lib': '1.0.0' },
      }),
    );
    fs.writeFileSync(fixture.declarationPath, "export { Button } from 'owner-lib';\n");
    fs.mkdirSync(dependencyRoot, { recursive: true });
    fs.writeFileSync(
      path.join(ownerRoot, 'package.json'),
      JSON.stringify({
        name: 'owner-lib',
        version: '1.0.0',
        types: 'index.d.ts',
        dependencies: { 'base-types': '1.0.0' },
      }),
    );
    fs.writeFileSync(
      path.join(ownerRoot, 'index.d.ts'),
      "import type { Base } from 'base-types';\nexport interface Button extends Base { label: string; }\n",
    );
    fs.writeFileSync(
      path.join(dependencyRoot, 'package.json'),
      JSON.stringify({ name: 'base-types', version: '1.0.0', types: 'index.d.ts' }),
    );
    fs.writeFileSync(
      path.join(dependencyRoot, 'index.d.ts'),
      "import type { Root } from './root';\nexport interface Base extends Root { base: string; }\n",
    );
    fs.writeFileSync(transitiveDeclarationPath, 'export interface Root { root: string; }\n');
    return {
      packageRoot: fixture.packageRoot,
      cacheDirectory: fixture.cacheDirectory,
      transitiveDeclarationPath,
      transitiveExtraDeclarationPath,
    };
  }

  function createOptions(
    packageRoot: string,
    namespace: 'type' | 'value' = 'type',
    declarationConditions?: string[],
  ): GeneratorOptions {
    return {
      packageRoot,
      entrypoints: ['.'],
      declarationConditions,
      detail: 'selected',
      selectedExports: [{ entrypoint: '.', export: 'Button', namespace }],
    } as GeneratorOptions;
  }
});

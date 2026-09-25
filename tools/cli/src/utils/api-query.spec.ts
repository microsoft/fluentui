import type {
  ApiRecord,
  GeneratorResult,
  GeneratorOptions,
  LoadedPackageCatalog,
  MetadataReader,
  PackageIndex,
  ResolvedExport,
} from '@fluentui/api-metadata';

import { CliError } from './diagnostics';
import {
  inspectCatalogs,
  queryApi,
  type ApiQueryDependencies,
  type ApiQueryOptions,
  type CatalogSelectionOptions,
  type CatalogInventory,
  type CatalogRoot,
} from './api-query';
import yargs = require('yargs/yargs');

const index = {
  kind: 'package-index',
  package: { name: '@fluentui/example', version: '1.0.0' },
  completeness: { api: { status: 'complete' } },
  records: [
    {
      id: 'root',
      kind: 'api',
      path: 'api/root.json',
      fingerprint: { algorithm: 'sha256', value: 'a'.repeat(64) },
    },
  ],
  exports: [
    {
      id: 'button-value',
      entrypoint: '.',
      export: 'Button',
      namespace: 'value',
      conditions: ['types', 'import'],
      exportKind: 'named',
      typeOnly: false,
      target: { kind: 'local', record: 'root', symbol: 'Button' },
      classifications: [],
    },
  ],
} as unknown as PackageIndex;

const record = {
  kind: 'api-record',
  recordId: 'root',
  symbols: [
    {
      id: 'Button',
      name: 'Button',
      namespaces: ['value'],
      declarations: [],
      relationships: [],
      classifications: [],
      fingerprint: { algorithm: 'sha256', value: 'b'.repeat(64) },
    },
  ],
} as unknown as ApiRecord;

function createRoot(overrides: Partial<CatalogRoot> = {}): CatalogRoot {
  return {
    packageName: '@fluentui/example',
    requestedPackage: '@fluentui/example',
    packageRoot: '/consumer/node_modules/@fluentui/example',
    importer: '/consumer',
    systems: ['fluent-v9'],
    source: 'dependency',
    ...overrides,
  };
}

function createInventory(roots: CatalogRoot[]): CatalogInventory {
  return { workspaceRoot: '/consumer', roots, diagnostics: [] };
}

function createDependencies(inventory: CatalogInventory): ApiQueryDependencies {
  return {
    getImportIssue: jest.fn(() => undefined),
    getInventory: jest.fn(() => inventory),
    generate: jest.fn(async () => ({ index, records: [record], diagnostics: [] } as GeneratorResult)),
    loadApiRecord: jest.fn(async () => record),
    resolveExport: jest.fn(async () => {
      throw new Error('reader unavailable in unit fixture');
    }),
    resolveInstalledPackage: jest.fn(() => undefined),
    validateCatalog: jest.fn((catalogIndex, records) => ({
      valid: true,
      value: { index: catalogIndex, records },
      diagnostics: [],
    })),
  };
}

function createRoutedDependencies(
  catalogs: Array<{ root: CatalogRoot; index: PackageIndex; record?: ApiRecord }>,
): ApiQueryDependencies {
  const dependencies = createDependencies(createInventory(catalogs.map(catalog => catalog.root)));
  (dependencies.getInventory as jest.Mock).mockImplementation((options: CatalogSelectionOptions) =>
    createInventory(
      catalogs
        .map(catalog => catalog.root)
        .filter(
          root =>
            !options.system?.length ||
            options.system.some(system => root.systems.includes(system)) ||
            options.package === root.requestedPackage,
        ),
    ),
  );
  (dependencies.generate as jest.Mock).mockImplementation(async (options: GeneratorOptions) => {
    const catalog = catalogs.find(value => value.root.packageRoot === options.packageRoot);
    if (!catalog) {
      throw new Error(`Unexpected fixture package: ${options.packageRoot}`);
    }
    return { index: catalog.index, records: [catalog.record ?? record], diagnostics: [] };
  });
  return dependencies;
}

async function replayCommands(commands: string[], dependencies: ApiQueryDependencies): Promise<void> {
  for (const command of commands) {
    const args = yargs([])
      .option('system', { type: 'string', array: true })
      .option('metadata-mode', { type: 'string' })
      .parseSync(command.slice('fluentui-cli api '.length));
    const options: ApiQueryOptions = {
      symbol: String(args._[0]),
      from: typeof args.from === 'string' ? args.from : undefined,
      namespace: args.namespace === 'type' || args.namespace === 'value' ? args.namespace : undefined,
      system: args.system,
      cwd: typeof args.cwd === 'string' ? args.cwd : undefined,
      config: typeof args.config === 'string' ? args.config : undefined,
      metadataMode: args['metadata-mode'] === 'off' ? 'off' : 'required',
    };
    const result = await queryApi(options, dependencies);
    expect(result.kind).toBe('detail');
  }
}

describe('API query', () => {
  it('selects a configured facade definition over an unrelated same-named dependency API', async () => {
    const facade = createRoot({
      packageName: '@scope/facade',
      requestedPackage: '@scope/facade',
      packageRoot: '/consumer/node_modules/@scope/facade',
      source: 'config',
    });
    const dependencies = createRoutedDependencies([
      { root: createRoot(), index },
      { root: facade, index: { ...index, package: { ...index.package, name: facade.packageName } } },
    ]);
    const result = await queryApi({ symbol: 'Button', metadataMode: 'off' }, dependencies);
    expect(result.data).toEqual(
      expect.objectContaining({
        package: '@scope/facade',
        recommendedImport: expect.objectContaining({ moduleSpecifier: '@scope/facade', reason: 'configured-catalog' }),
      }),
    );
  });

  it('keeps declaration ownership and all routes while recommending the configured facade', async () => {
    const leaf = createRoot();
    const facade = createRoot({
      packageName: '@scope/facade',
      requestedPackage: '@scope/facade',
      packageRoot: '/consumer/node_modules/@scope/facade',
      source: 'config',
    });
    const facadeIndex: PackageIndex = {
      ...index,
      package: { ...index.package, name: facade.packageName },
      exports: [
        {
          ...index.exports[0],
          target: {
            kind: 'dependency',
            package: leaf.packageName,
            entrypoint: '.',
            export: 'Button',
            namespace: 'value',
          },
        },
      ],
    };
    const dependencies = createRoutedDependencies([
      { root: leaf, index },
      { root: facade, index: facadeIndex },
    ]);
    (dependencies.resolveInstalledPackage as jest.Mock).mockReturnValue(leaf);
    const result = await queryApi({ symbol: 'Button', metadataMode: 'off' }, dependencies);
    expect(result.data).toEqual(
      expect.objectContaining({
        package: '@fluentui/example',
        recommendedImport: expect.objectContaining({ moduleSpecifier: '@scope/facade' }),
        routes: expect.arrayContaining([
          expect.objectContaining({ requestedPackage: '@scope/facade' }),
          expect.objectContaining({ requestedPackage: '@fluentui/example' }),
        ]),
      }),
    );
  });

  it.each(['prefer', 'required'] as const)(
    'does not replace a missing facade export with a dependency import in %s mode',
    async metadataMode => {
      const partial: PackageIndex = {
        ...index,
        package: { ...index.package, name: '@scope/facade' },
        exports: [],
        completeness: { ...index.completeness, api: { status: 'partial' as const } },
      };
      const facade = createRoot({
        packageName: '@scope/facade',
        requestedPackage: '@scope/facade',
        packageRoot: '/consumer/node_modules/@scope/facade',
        source: 'config',
        catalog: { index: partial } as LoadedPackageCatalog,
      });
      const leaf = createRoot({ catalog: { index } as LoadedPackageCatalog });
      const generated = { ...index, package: partial.package };
      const dependencies = createRoutedDependencies([
        { root: leaf, index },
        { root: facade, index: generated },
      ]);
      const result = await queryApi({ symbol: 'Button', metadataMode }, dependencies);
      if (metadataMode === 'prefer') {
        expect(dependencies.generate).toHaveBeenCalledTimes(1);
        expect(dependencies.generate).toHaveBeenCalledWith(expect.objectContaining({ packageName: '@scope/facade' }));
        expect(result.data).toEqual(
          expect.objectContaining({
            recommendedImport: expect.objectContaining({ moduleSpecifier: '@scope/facade' }),
          }),
        );
      } else {
        expect(dependencies.generate).not.toHaveBeenCalled();
        expect(result.data).toEqual(expect.objectContaining({ recommendedImport: null, importStatus: 'unavailable' }));
        expect(result.diagnostics).toContainEqual(expect.objectContaining({ code: 'CLI_API_IMPORT_UNAVAILABLE' }));
        expect(result.status).toBe('partial');
      }
    },
  );

  it('reports equally preferred subpaths without claiming one is recommended', async () => {
    const owner = createRoot({ source: 'config' });
    const dependencies = createRoutedDependencies([
      {
        root: owner,
        index: {
          ...index,
          exports: ['./one', './two'].map(entrypoint => ({
            ...index.exports[0],
            id: entrypoint,
            entrypoint,
          })),
        },
      },
    ]);
    const result = await queryApi({ symbol: 'Button', metadataMode: 'off' }, dependencies);
    expect(result.data).toEqual(expect.objectContaining({ recommendedImport: null, importStatus: 'ambiguous' }));
    const diagnostic = result.diagnostics.find(item => item.code === 'CLI_API_IMPORT_AMBIGUOUS');
    expect(diagnostic?.hint).toContain('--from @fluentui/example/one');
    expect(diagnostic?.hint).toContain('--from @fluentui/example/two');
    expect(result.status).toBe('partial');
  });

  it('lists routes without loading API record detail', async () => {
    const root = createRoot({ catalog: { index } as LoadedPackageCatalog });
    const dependencies = createDependencies(createInventory([root]));

    const result = await queryApi({}, dependencies);

    expect(result.kind).toBe('index');
    expect(result.data).toEqual([
      expect.objectContaining({ export: 'Button', package: '@fluentui/example', metadata: true }),
    ]);
    expect(dependencies.loadApiRecord).not.toHaveBeenCalled();
    expect(dependencies.generate).not.toHaveBeenCalled();
  });

  it('applies the exact package selector even when discovery returns preset roots', async () => {
    const selected = createRoot();
    const unrelated = createRoot({
      packageName: '@fluentui/other',
      requestedPackage: '@fluentui/other',
      packageRoot: '/consumer/node_modules/@fluentui/other',
    });
    const dependencies = createDependencies(createInventory([selected, unrelated]));

    const result = await queryApi({ package: '@fluentui/example', metadataMode: 'off' }, dependencies);

    expect(result.data).toEqual([expect.objectContaining({ package: '@fluentui/example' })]);
    expect(dependencies.generate).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['@fluentui/example', '@fluentui/example', '.'],
    ['@fluentui/example/button', '@fluentui/example', './button'],
    ['design-system', 'design-system', '.'],
    ['design-system/components/button', 'design-system', './components/button'],
  ])('selects exactly the public import path %s', async (from, packageName, entrypoint) => {
    const root = createRoot({ requestedPackage: packageName, packageName });
    const selectedIndex = {
      ...index,
      package: { ...index.package, name: packageName },
      exports: ['.', './button', './components/button'].map(path => ({
        ...index.exports[0],
        id: path,
        entrypoint: path,
      })),
    };
    const dependencies = createRoutedDependencies([{ root, index: selectedIndex }]);

    const result = await queryApi({ from, metadataMode: 'off' }, dependencies);

    expect(dependencies.getInventory).toHaveBeenCalledWith(expect.objectContaining({ package: packageName }));
    expect(dependencies.generate).toHaveBeenCalledWith(expect.objectContaining({ entrypoints: [entrypoint] }));
    expect(result.data).toEqual([expect.objectContaining({ entrypoint, requestedPackage: packageName })]);
  });

  it('distinguishes npm aliases from the canonical package import path', async () => {
    const canonical = createRoot();
    const alias = createRoot({
      requestedPackage: '@consumer/design',
      packageRoot: '/consumer/node_modules/@consumer/design',
    });
    const dependencies = createRoutedDependencies([
      { root: canonical, index },
      { root: alias, index },
    ]);

    for (const from of [canonical.requestedPackage, alias.requestedPackage]) {
      const result = await queryApi({ symbol: 'Button', from, metadataMode: 'off' }, dependencies);
      expect(result.data).toEqual(
        expect.objectContaining({
          routes: [expect.objectContaining({ requestedPackage: from, package: '@fluentui/example' })],
        }),
      );
    }
  });

  it('does not turn a root import into a search of every package subpath', async () => {
    const dependencies = createRoutedDependencies([
      {
        root: createRoot(),
        index: { ...index, exports: [{ ...index.exports[0], entrypoint: './button' }] },
      },
    ]);
    await expect(
      queryApi({ symbol: 'Button', from: '@fluentui/example', metadataMode: 'off' }, dependencies),
    ).rejects.toMatchObject({ code: 'CLI_API_NOT_FOUND', exitCode: 2 });
    expect(
      (await queryApi({ symbol: 'Button', package: '@fluentui/example', metadataMode: 'off' }, dependencies)).kind,
    ).toBe('detail');
  });

  it.each([
    '',
    '.',
    './button',
    '/absolute/path',
    '#internal',
    '@scope',
    'pkg/',
    'pkg//button',
    'pkg/../button',
    'pkg/./button',
    'pkg/button?query',
    'pkg/button#fragment',
    'pkg\\button',
    'pkg/button name',
    'pkg/*',
    'pkg/\0',
  ])('rejects invalid --from input %j before discovery', async from => {
    const dependencies = createDependencies(createInventory([]));
    await expect(queryApi({ from }, dependencies)).rejects.toMatchObject({ code: 'CLI_API_FROM_INVALID', exitCode: 2 });
    expect(dependencies.getInventory).not.toHaveBeenCalled();
  });

  it.each([{ package: '@fluentui/example' }, { entrypoint: '.' }])(
    'rejects conflicting selectors %j',
    async selection => {
      const dependencies = createDependencies(createInventory([]));
      await expect(queryApi({ from: '@fluentui/example', ...selection }, dependencies)).rejects.toMatchObject({
        code: 'CLI_API_SELECTION_CONFLICT',
        exitCode: 2,
      });
      expect(dependencies.getInventory).not.toHaveBeenCalled();
    },
  );

  it('loads exact symbol detail lazily', async () => {
    const root = createRoot();
    const dependencies = createDependencies(createInventory([root]));

    const result = await queryApi({ symbol: 'Button', metadataMode: 'off' }, dependencies);

    expect(result.kind).toBe('detail');
    expect(result.data).toEqual(expect.objectContaining({ name: 'Button', symbol: record.symbols[0] }));
    expect(dependencies.generate).toHaveBeenCalledTimes(1);
  });

  it('required mode accepts canonical requested detail from an intentionally partial index', async () => {
    const partialIndex = {
      ...index,
      completeness: {
        api: { status: 'partial', reasons: ['pilot rollout'] },
        guidance: { status: 'unavailable' },
        search: { status: 'unavailable' },
      },
      capabilities: {
        api: { status: 'supported' },
        effectiveTypes: { status: 'partial', reasons: ['checker-rendered spans are partial'] },
        guidance: { status: 'unsupported' },
        search: { status: 'unsupported' },
      },
    } as PackageIndex;
    const catalog = {
      index: partialIndex,
      instance: {
        identity: '/consumer/node_modules/@fluentui/example',
        package: partialIndex.package,
        packageRoot: '/consumer/node_modules/@fluentui/example',
      },
    } as LoadedPackageCatalog;
    const root = createRoot({ catalog });
    const dependencies = createDependencies(createInventory([root]));
    const resolveExport = jest.fn().mockReturnValue({
      status: 'partial',
      requested: { catalog, route: partialIndex.exports[0] },
      routes: [{ catalog, route: partialIndex.exports[0] }],
      definition: {
        catalog,
        owner: {
          requested: '@fluentui/example',
          package: partialIndex.package,
          packageRoot: '/consumer/node_modules/@fluentui/example',
          packageManifest: '/consumer/node_modules/@fluentui/example/package.json',
          identity: '/consumer/node_modules/@fluentui/example',
        },
        record,
        symbol: record.symbols[0],
      },
      diagnostics: [
        {
          code: 'reader.indexPartial',
          severity: 'warning',
          message: 'The package index is intentionally partial.',
        },
      ],
    });
    (dependencies.getInventory as jest.Mock).mockReturnValue({
      ...createInventory([root]),
      reader: { resolveExport } as unknown as MetadataReader,
    });

    const result = await queryApi({ symbol: 'Button', metadataMode: 'required' }, dependencies);

    expect(result).toEqual(
      expect.objectContaining({
        kind: 'detail',
        status: 'partial',
        data: expect.objectContaining({ symbol: record.symbols[0] }),
        coverage: expect.objectContaining({
          status: 'partial',
          metadataRoots: 1,
          declarationFallbackRoots: 0,
        }),
      }),
    );
    expect(dependencies.generate).not.toHaveBeenCalled();
    expect(dependencies.resolveExport).not.toHaveBeenCalled();
    expect(resolveExport).toHaveBeenCalledTimes(1);
  });

  it('reports bundled definition ownership while recommending the verified facade route', async () => {
    const bundledIndex = {
      ...index,
      package: { name: '@scope/facade', version: '1.0.0' },
      records: [
        {
          ...index.records[0],
          source: {
            kind: 'dependency',
            packages: [
              {
                requested: '@third/owner',
                package: { name: '@third/owner', version: '2.0.0' },
                declarationInputs: [],
              },
            ],
          },
        },
      ],
      exports: [
        {
          ...index.exports[0],
          target: { kind: 'bundled', record: 'root', symbol: 'Button' },
        },
      ],
    } as PackageIndex;
    const catalog = {
      index: bundledIndex,
      instance: {
        identity: '/consumer/node_modules/@scope/facade',
        package: bundledIndex.package,
        packageRoot: '/consumer/node_modules/@scope/facade',
      },
    } as LoadedPackageCatalog;
    const facade = createRoot({
      packageName: '@scope/facade',
      requestedPackage: '@scope/facade',
      packageRoot: '/consumer/node_modules/@scope/facade',
      source: 'config',
      catalog,
    });
    const owner = {
      requested: '@third/owner',
      package: { name: '@third/owner', version: '2.0.0' },
      packageRoot: '/consumer/node_modules/@third/owner',
      packageManifest: '/consumer/node_modules/@third/owner/package.json',
      identity: '/consumer/node_modules/@third/owner',
    };
    const dependencies = createDependencies(createInventory([facade]));
    const resolveExport = jest.fn().mockReturnValue({
      status: 'complete',
      requested: { catalog, route: bundledIndex.exports[0] },
      routes: [{ catalog, route: bundledIndex.exports[0] }],
      definition: {
        catalog,
        owner,
        record: { ...record, package: owner.package },
        symbol: record.symbols[0],
      },
      diagnostics: [],
    } satisfies ResolvedExport);
    (dependencies.getInventory as jest.Mock).mockReturnValue({
      ...createInventory([facade]),
      reader: { resolveExport } as unknown as MetadataReader,
    });

    const result = await queryApi({ symbol: 'Button', metadataMode: 'required' }, dependencies);

    expect(result.data).toEqual(
      expect.objectContaining({
        package: '@third/owner',
        version: '2.0.0',
        recommendedImport: expect.objectContaining({ moduleSpecifier: '@scope/facade' }),
        resolvedPackages: expect.arrayContaining([
          expect.objectContaining({ package: '@scope/facade' }),
          expect.objectContaining({ package: '@third/owner' }),
        ]),
      }),
    );
  });

  it('prefer mode lazily fills an omitted entrypoint from installed declarations', async () => {
    const partialIndex = {
      ...index,
      completeness: {
        api: { status: 'partial', reasons: ['pilot entrypoints omitted'] },
        guidance: { status: 'unavailable' },
        search: { status: 'unavailable' },
      },
      capabilities: {
        api: { status: 'supported' },
        effectiveTypes: { status: 'partial' },
        guidance: { status: 'unsupported' },
        search: { status: 'unsupported' },
      },
    } as PackageIndex;
    const inputRecord = {
      ...record,
      recordId: 'input',
      symbols: [{ ...record.symbols[0], id: 'Input', name: 'Input' }],
    } as ApiRecord;
    const fallbackIndex = {
      ...partialIndex,
      records: [{ ...partialIndex.records[0], id: 'input' }],
      exports: [
        {
          ...partialIndex.exports[0],
          id: 'input-value',
          entrypoint: './input',
          export: 'Input',
          target: { kind: 'local', record: 'input', symbol: 'Input' },
        },
      ],
    } as PackageIndex;
    const root = createRoot({ catalog: { index: partialIndex } as LoadedPackageCatalog });
    const dependencies = createDependencies(createInventory([root]));
    (dependencies.generate as jest.Mock).mockResolvedValue({
      index: fallbackIndex,
      records: [inputRecord],
      diagnostics: [],
    });

    const result = await queryApi({ symbol: 'Input', entrypoint: './input', metadataMode: 'prefer' }, dependencies);

    expect(result).toEqual(
      expect.objectContaining({
        kind: 'detail',
        status: 'partial',
        data: expect.objectContaining({ symbol: inputRecord.symbols[0] }),
        coverage: expect.objectContaining({ metadataRoots: 1, declarationFallbackRoots: 1 }),
        diagnostics: expect.arrayContaining([
          expect.objectContaining({ code: 'CLI_METADATA_REQUESTED_BINDING_FALLBACK' }),
        ]),
      }),
    );
    expect(dependencies.generate).toHaveBeenCalledWith({
      packageRoot: root.packageRoot,
      packageName: root.packageName,
      entrypoints: ['./input'],
    });
  });

  it('required mode reports an omitted partial-catalog binding as unavailable', async () => {
    const partialIndex = {
      ...index,
      completeness: {
        api: { status: 'partial', reasons: ['pilot entrypoints omitted'] },
        guidance: { status: 'unavailable' },
        search: { status: 'unavailable' },
      },
      capabilities: {
        api: { status: 'supported' },
        effectiveTypes: { status: 'partial' },
        guidance: { status: 'unsupported' },
        search: { status: 'unsupported' },
      },
    } as PackageIndex;
    const root = createRoot({ catalog: { index: partialIndex } as LoadedPackageCatalog });
    const dependencies = createDependencies(createInventory([root]));

    await expect(
      queryApi({ symbol: 'Input', entrypoint: './input', metadataMode: 'required' }, dependencies),
    ).rejects.toMatchObject({
      code: 'CLI_METADATA_REQUESTED_BINDING_UNAVAILABLE',
      exitCode: 1,
    });
    expect(dependencies.generate).not.toHaveBeenCalled();
  });

  it('retains not-found for a complete catalog that genuinely lacks the symbol', async () => {
    const completeIndex = {
      ...index,
      capabilities: {
        api: { status: 'supported' },
        effectiveTypes: { status: 'supported' },
        guidance: { status: 'unsupported' },
        search: { status: 'unsupported' },
      },
    } as PackageIndex;
    const root = createRoot({ catalog: { index: completeIndex } as LoadedPackageCatalog });
    const dependencies = createDependencies(createInventory([root]));

    await expect(
      queryApi({ symbol: 'Input', entrypoint: './input', metadataMode: 'required' }, dependencies),
    ).rejects.toMatchObject({
      code: 'CLI_API_NOT_FOUND',
      exitCode: 2,
    });
    expect(dependencies.generate).not.toHaveBeenCalled();
  });

  it('requires metadata without invoking declaration generation', async () => {
    const dependencies = createDependencies(createInventory([createRoot()]));

    await expect(queryApi({ metadataMode: 'required' }, dependencies)).rejects.toMatchObject({
      code: 'CLI_METADATA_REQUIRED',
      exitCode: 1,
    });
    expect(dependencies.generate).not.toHaveBeenCalled();
  });

  it('reports a stable not-found error', async () => {
    const dependencies = createDependencies(createInventory([createRoot()]));

    await expect(queryApi({ symbol: 'Missing', metadataMode: 'off' }, dependencies)).rejects.toMatchObject({
      code: 'CLI_API_NOT_FOUND',
      exitCode: 2,
    });
  });

  it('returns runnable narrowing commands for distinct definitions', async () => {
    const first = createRoot();
    const secondIndex = {
      ...index,
      package: { name: '@fluentui/other', version: '2.0.0' },
    } as PackageIndex;
    const second = createRoot({
      packageName: '@fluentui/other',
      requestedPackage: '@fluentui/other',
      packageRoot: '/consumer/node_modules/@fluentui/other',
      systems: ['headless'],
    });
    const dependencies = createRoutedDependencies([
      { root: first, index },
      { root: second, index: secondIndex },
    ]);

    const error = await queryApi({ symbol: 'Button', metadataMode: 'off' }, dependencies).catch(value => value);

    expect(error).toBeInstanceOf(CliError);
    expect(error.code).toBe('CLI_API_AMBIGUOUS');
    expect(error.data.narrowingCommands).toEqual([
      'fluentui-cli api Button --metadata-mode off --system fluent-v9',
      'fluentui-cli api Button --metadata-mode off --system headless',
    ]);
    await replayCommands(error.data.narrowingCommands, dependencies);
  });

  it('uses import paths when systems overlap, and retains the lookup context', async () => {
    const other = createRoot({
      requestedPackage: '@consumer/other',
      packageName: '@fluentui/other',
      packageRoot: '/consumer/node_modules/@consumer/other',
    });
    const dependencies = createRoutedDependencies([
      { root: createRoot(), index },
      { root: other, index: { ...index, package: { ...index.package, name: other.packageName } } },
    ]);
    const error = await queryApi(
      {
        symbol: 'Button',
        metadataMode: 'off',
        system: ['fluent-v9'],
        cwd: '/consumer/my app',
        config: '/consumer/config.json',
      },
      dependencies,
    ).catch(value => value);
    expect(error.data.narrowingCommands).toEqual([
      "fluentui-cli api Button --cwd '/consumer/my app' --config /consumer/config.json --metadata-mode off --from @fluentui/example --system fluent-v9",
      "fluentui-cli api Button --cwd '/consumer/my app' --config /consumer/config.json --metadata-mode off --from @consumer/other --system fluent-v9",
    ]);
    await replayCommands(error.data.narrowingCommands, dependencies);
  });

  it('uses full import paths to distinguish definitions on different subpaths', async () => {
    const buttonRecord = {
      ...record,
      symbols: [record.symbols[0], { ...record.symbols[0], id: 'OtherButton' }],
    };
    const dependencies = createRoutedDependencies([
      {
        root: createRoot(),
        record: buttonRecord,
        index: {
          ...index,
          exports: [
            index.exports[0],
            {
              ...index.exports[0],
              id: 'other',
              entrypoint: './unstable',
              target: { kind: 'local', record: 'root', symbol: 'OtherButton' },
            },
          ],
        },
      },
    ]);
    const error = await queryApi({ symbol: 'Button', metadataMode: 'off' }, dependencies).catch(value => value);
    expect(error.data.narrowingCommands).toEqual([
      'fluentui-cli api Button --metadata-mode off --from @fluentui/example',
      'fluentui-cli api Button --metadata-mode off --from @fluentui/example/unstable',
    ]);
    await replayCommands(error.data.narrowingCommands, dependencies);
  });

  it.each([false, true])(
    'only asks for a type/value binding when distinct definitions require it (same: %s)',
    async same => {
      const bothRecord: ApiRecord = {
        ...record,
        symbols: [record.symbols[0], { ...record.symbols[0], id: 'ButtonType', namespaces: ['type'] }],
      };
      const dependencies = createRoutedDependencies([
        {
          root: createRoot(),
          record: bothRecord,
          index: {
            ...index,
            exports: [
              index.exports[0],
              {
                ...index.exports[0],
                id: 'button-type',
                namespace: 'type',
                typeOnly: true,
                target: { kind: 'local', record: 'root', symbol: same ? 'Button' : 'ButtonType' },
              },
            ],
          },
        },
      ]);
      const options: ApiQueryOptions = { symbol: 'Button', from: '@fluentui/example', metadataMode: 'off' };
      if (same) {
        const result = await queryApi(options, dependencies);
        expect(result.data).toEqual(
          expect.objectContaining({
            routes: expect.arrayContaining([
              expect.objectContaining({ namespace: 'type' }),
              expect.objectContaining({ namespace: 'value' }),
            ]),
          }),
        );
      } else {
        const error = await queryApi(options, dependencies).catch(value => value);
        expect(error.data.narrowingCommands).toEqual([
          'fluentui-cli api Button --metadata-mode off --from @fluentui/example --namespace type',
          'fluentui-cli api Button --metadata-mode off --from @fluentui/example --namespace value',
        ]);
        await replayCommands(error.data.narrowingCommands, dependencies);
      }
    },
  );

  it('does not suggest ineffective selectors for conflicting declaration conditions', async () => {
    const dependencies = createRoutedDependencies([
      {
        root: createRoot(),
        record: { ...record, symbols: [record.symbols[0], { ...record.symbols[0], id: 'Other' }] },
        index: {
          ...index,
          exports: [
            index.exports[0],
            {
              ...index.exports[0],
              id: 'require',
              conditions: ['types', 'require'],
              target: { kind: 'local', record: 'root', symbol: 'Other' },
            },
          ],
        },
      },
    ]);
    const error = await queryApi({ symbol: 'Button', metadataMode: 'off' }, dependencies).catch(value => value);
    expect(error.data.narrowingCommands).toEqual([]);
    expect(error.diagnostics).toContainEqual(
      expect.objectContaining({
        hint: expect.stringContaining('2 definitions cannot be isolated'),
      }),
    );
  });

  it('combines source and binding only for definitions that need both selectors', async () => {
    const other = createRoot({
      packageName: '@fluentui/other',
      requestedPackage: '@fluentui/other',
      packageRoot: '/consumer/node_modules/@fluentui/other',
    });
    const dependencies = createRoutedDependencies([
      {
        root: createRoot(),
        record: {
          ...record,
          symbols: [record.symbols[0], { ...record.symbols[0], id: 'ButtonType', namespaces: ['type'] }],
        },
        index: {
          ...index,
          exports: [
            index.exports[0],
            {
              ...index.exports[0],
              id: 'type',
              namespace: 'type',
              typeOnly: true,
              target: { kind: 'local', record: 'root', symbol: 'ButtonType' },
            },
          ],
        },
      },
      { root: other, index: { ...index, package: { ...index.package, name: other.packageName } } },
    ]);
    const error = await queryApi({ symbol: 'Button', metadataMode: 'off' }, dependencies).catch(value => value);
    expect(error.data.narrowingCommands).toEqual([
      'fluentui-cli api Button --metadata-mode off --namespace type',
      'fluentui-cli api Button --metadata-mode off --from @fluentui/example --namespace value',
      'fluentui-cli api Button --metadata-mode off --from @fluentui/other',
    ]);
    await replayCommands(error.data.narrowingCommands, dependencies);
  });

  it('follows installed dependency routes during declaration fallback', async () => {
    const suiteIndex = {
      ...index,
      package: { name: '@fluentui/suite', version: '1.0.0' },
      exports: [
        {
          ...index.exports[0],
          target: {
            kind: 'dependency',
            package: '@fluentui/example',
            entrypoint: '.',
            export: 'Button',
            namespace: 'value',
          },
        },
      ],
    } as PackageIndex;
    const suite = createRoot({
      packageName: '@fluentui/suite',
      requestedPackage: '@fluentui/suite',
      packageRoot: '/consumer/node_modules/@fluentui/suite',
    });
    const dependencies = createDependencies(createInventory([suite]));
    (dependencies.generate as jest.Mock)
      .mockResolvedValueOnce({ index: suiteIndex, records: [], diagnostics: [] })
      .mockResolvedValueOnce({ index, records: [record], diagnostics: [] });
    (dependencies.resolveInstalledPackage as jest.Mock).mockReturnValue({
      packageName: '@fluentui/example',
      requestedPackage: '@fluentui/example',
      packageRoot: '/consumer/node_modules/@fluentui/suite/node_modules/@fluentui/example',
      importer: '/consumer/node_modules/@fluentui/suite',
    });

    const result = await queryApi({ symbol: 'Button', metadataMode: 'off' }, dependencies);

    expect(result.data).toEqual(
      expect.objectContaining({
        package: '@fluentui/example',
        symbol: record.symbols[0],
        resolvedPackages: [
          expect.objectContaining({ package: '@fluentui/suite' }),
          expect.objectContaining({ package: '@fluentui/example' }),
        ],
      }),
    );
  });

  it('uses bundled declaration records during metadata-off fallback without changing the facade import', async () => {
    const ownerRecord = {
      ...record,
      package: { name: '@third/owner', version: '2.0.0' },
    } as ApiRecord;
    const suiteIndex = {
      ...index,
      package: { name: '@fluentui/suite', version: '1.0.0' },
      records: [
        {
          ...index.records[0],
          source: {
            kind: 'dependency',
            packages: [
              {
                requested: '@third/bridge',
                package: { name: '@third/bridge', version: '1.0.0' },
                declarationInputs: [],
              },
              {
                requested: '@third/owner',
                package: ownerRecord.package,
                declarationInputs: [],
              },
            ],
          },
        },
      ],
      exports: [
        {
          ...index.exports[0],
          target: { kind: 'bundled', record: 'root', symbol: 'Button' },
        },
      ],
    } as PackageIndex;
    const suite = createRoot({
      packageName: '@fluentui/suite',
      requestedPackage: '@fluentui/suite',
      packageRoot: '/consumer/node_modules/@fluentui/suite',
      source: 'config',
    });
    const dependencies = createDependencies(createInventory([suite]));
    (dependencies.generate as jest.Mock).mockResolvedValue({
      index: suiteIndex,
      records: [ownerRecord],
      diagnostics: [],
    });
    (dependencies.resolveInstalledPackage as jest.Mock).mockImplementation((requested: string) => ({
      packageName: requested,
      requestedPackage: requested,
      packageRoot: `/consumer/node_modules/${requested}`,
      importer: '/consumer',
    }));

    const result = await queryApi({ symbol: 'Button', metadataMode: 'off' }, dependencies);

    expect(result.data).toEqual(
      expect.objectContaining({
        package: '@third/owner',
        recommendedImport: expect.objectContaining({ moduleSpecifier: '@fluentui/suite' }),
        resolvedPackages: expect.arrayContaining([
          expect.objectContaining({ package: '@fluentui/suite' }),
          expect.objectContaining({ package: '@third/bridge' }),
          expect.objectContaining({ package: '@third/owner' }),
        ]),
      }),
    );
  });

  it('doctor deep validation checks the complete advertised catalog', async () => {
    const root = createRoot({ catalog: { index } as LoadedPackageCatalog });
    const dependencies = createDependencies(createInventory([root]));
    (dependencies.validateCatalog as jest.Mock).mockReturnValue({
      valid: false,
      diagnostics: [{ code: 'reference.symbol', path: '$.records[0]', message: 'missing symbol' }],
    });

    const result = await inspectCatalogs({ deep: true }, dependencies);

    expect(dependencies.loadApiRecord).toHaveBeenCalledWith(root.catalog, 'root');
    expect(result.status).toBe('unavailable');
    expect(result.diagnostics).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: 'reference.symbol', severity: 'error' })]),
    );
  });
});

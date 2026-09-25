import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import ts = require('typescript');

import { getSyntheticPackageInputs, toSyntheticGeneratorOptions } from './__fixtures__/pilot-inputs';
import {
  assertApiMetadataPublishable,
  generateApiMetadata,
  markApiMetadataRolloutPartial,
  refreshGeneratedApiMetadata,
} from './generate';
import { MetadataLoader } from './load';
import { createMetadataReader } from './resolve';
import { serializeMetadata } from './serialize';
import type { ApiRecord, ApiSymbol, ExportRoute, GeneratorResult } from './types';
import { validateCatalog } from './validate';
import { writeGeneratedMetadata } from './write';

const fixtureRoot = join(__dirname, '__fixtures__');
const testOutputRoot = join(dirname(__dirname), '.api-metadata-generator-test');

describe('generateApiMetadata', () => {
  afterEach(() => {
    rmSync(testOutputRoot, { recursive: true, force: true });
  });

  it('preserves declaration identities, aliases, overloads, merges, generics, and relationships', async () => {
    const semantic = getSyntheticPackageInputs(fixtureRoot).find(input => input.id === 'semantic-package')!;
    const result = await generateApiMetadata({
      ...toSyntheticGeneratorOptions(semantic),
      entrypoints: ['.'],
      declarationConditions: ['types', 'import'],
    });

    expect(validateCatalog(result.index, result.records)).toEqual({
      valid: true,
      value: { index: result.index, records: result.records },
      diagnostics: [],
    });

    const dualType = route(result, 'Dual', 'type');
    const dualValue = route(result, 'Dual', 'value');
    expect(dualType.target).toEqual(dualValue.target);

    expect(route(result, 'default', 'value').exportKind).toBe('default');
    expect(route(result, 'utilities', 'value').exportKind).toBe('namespace');
    expect(route(result, 'RenamedAlias', 'type').importedName).toBe('OriginalAlias');

    expect(symbol(result, 'Merged').declarations).toHaveLength(2);
    expect(symbol(result, 'mergedFunction').declarations.map(declaration => declaration.kind)).toEqual([
      'function',
      'namespace',
    ]);
    expect(symbol(result, 'overloaded').declarations.flatMap(declaration => declaration.signatures ?? [])).toHaveLength(
      2,
    );

    const identity = symbol(result, 'identity');
    expect(identity.effectiveType?.signatures[0].typeParameters[0].name).toBe('T');
    expect(identity.effectiveType?.signatures[0].typeParameters[0].constraint?.text).toBe('NamespaceMember');
    const identityDeclaration = identity.declarations[0].signatures?.[0];
    expect(identityDeclaration).toEqual(
      expect.objectContaining({
        typeParameters: [
          expect.objectContaining({
            name: 'T',
            constraint: expect.objectContaining({ text: 'NamespaceMember' }),
            default: expect.objectContaining({ text: 'NamespaceMember' }),
          }),
        ],
        parameters: [expect.objectContaining({ name: 'value', type: expect.objectContaining({ text: 'T' }) })],
        returnType: expect.objectContaining({ text: 'T' }),
      }),
    );

    const stringCallable = symbol(result, 'stringCallable');
    expect(stringCallable.type).toEqual(
      expect.objectContaining({
        text: 'GenericCallable<string>',
        references: [
          expect.objectContaining({
            status: 'resolved',
            target: expect.objectContaining({ kind: 'local', symbol: symbol(result, 'GenericCallable').id }),
          }),
        ],
      }),
    );
    expect(stringCallable.effectiveType?.signatures[0]).toEqual(
      expect.objectContaining({
        typeParameters: [],
        parameters: [
          expect.objectContaining({
            name: 'required',
            optional: false,
            rest: false,
            type: expect.objectContaining({ text: 'string' }),
          }),
          expect.objectContaining({
            name: 'optional',
            optional: true,
            rest: false,
            type: expect.objectContaining({ text: 'number' }),
          }),
        ],
        returnType: expect.objectContaining({ text: 'string' }),
      }),
    );

    const methodHost = symbol(result, 'StringMethodHost');
    expect(effectiveMember(methodHost, 'transform').signatures?.[0]).toEqual(
      expect.objectContaining({
        parameters: [expect.objectContaining({ type: expect.objectContaining({ text: 'string' }) })],
        returnType: expect.objectContaining({ text: 'string' }),
      }),
    );
    expect(effectiveMember(methodHost, 'generic').signatures?.[0]).toEqual(
      expect.objectContaining({
        typeParameters: [
          expect.objectContaining({ name: 'U', constraint: expect.objectContaining({ text: 'string' }) }),
        ],
        parameters: [expect.objectContaining({ type: expect.objectContaining({ text: 'U' }) })],
        returnType: expect.objectContaining({ text: 'U' }),
      }),
    );

    expect(relationshipKinds(symbol(result, 'ComposedState'))).toEqual(
      expect.arrayContaining(['alias', 'intersection']),
    );
    expect(relationshipKinds(symbol(result, 'IconPosition'))).toEqual(
      expect.arrayContaining(['alias', 'indexed-access']),
    );
    expect(relationshipKinds(symbol(result, 'OptionalMembers'))).toEqual(expect.arrayContaining(['alias', 'mapped']));
    expect(relationshipKinds(symbol(result, 'StyledVariant'))).toEqual(expect.arrayContaining(['alias', 'union']));
    expect(relationshipKinds(symbol(result, 'RecursiveConditional'))).toEqual(
      expect.arrayContaining(['alias', 'conditional']),
    );
    const indexedRelationship = symbol(result, 'IconPosition').relationships.find(
      relationship => relationship.kind === 'indexed-access',
    );
    expect(indexedRelationship?.type.references).toEqual([
      expect.objectContaining({
        status: 'resolved',
        target: expect.objectContaining({ kind: 'local', symbol: symbol(result, 'BaseState').id }),
      }),
    ]);

    const baseProps = symbol(result, 'BaseProps');
    expect(baseProps.effectiveType?.status).toEqual(
      expect.objectContaining({
        status: 'partial',
        reasons: expect.arrayContaining([expect.stringContaining('semantic reference spans')]),
      }),
    );
    expect(result.index.capabilities.effectiveTypes).toEqual(
      expect.objectContaining({ status: 'partial', reasons: expect.any(Array) }),
    );
    expect(memberNames(baseProps)).toContain('disabled');
    expect(memberNames(baseProps)).not.toEqual(expect.arrayContaining(['appearance', 'shape', 'size']));
    expect(memberNames(symbol(result, 'InheritedProps'))).toEqual(
      expect.arrayContaining(['appearance', 'disabled', 'shape', 'size', 'inherited']),
    );
    expect(symbol(result, 'StyledVariant').effectiveType?.unionBranches).toHaveLength(2);
    expect(symbol(result, 'StringDictionary').effectiveType?.members).toEqual(
      expect.arrayContaining([expect.objectContaining({ kind: 'index', readonly: true })]),
    );
    expect(symbol(result, 'RecursiveNode').type?.text).toContain('RecursiveNode<T>');

    const composedState = symbol(result, 'ComposedState');
    const root = composedState.effectiveType?.members.find(member => member.name === 'root');
    expect(root?.type?.text).toContain('data-state');
    expect(root?.type?.text).toContain('id');
  });

  it('preserves required, optional, defaulted, and rest parameter semantics from emitted declarations', async () => {
    const packageRoot = createEmittedParameterPackage();
    const result = await generateApiMetadata({
      packageRoot,
      entrypoints: ['.'],
      declarationConditions: ['types', 'import'],
    });
    const signature = symbol(result, 'parameterKinds').declarations[0].signatures?.[0];

    expect(signature?.parameters).toEqual([
      expect.objectContaining({ name: 'required', optional: false, rest: false }),
      expect.objectContaining({ name: 'optional', optional: true, rest: false }),
      expect.objectContaining({ name: 'defaulted', optional: true, rest: false }),
      expect.objectContaining({ name: 'rest', optional: false, rest: true }),
    ]);
  });

  it('keeps target namespaces separate from type-only export availability', async () => {
    const result = await generateApiMetadata({
      packageRoot: createTypeOnlyReexportPackage(),
      entrypoints: ['.'],
    });

    expect(route(result, 'TypeDual', 'type')).toEqual(expect.objectContaining({ typeOnly: true, exportKind: 'named' }));
    expect(route(result, 'TypeDual', 'value')).toEqual(
      expect.objectContaining({ typeOnly: true, exportKind: 'named' }),
    );
    expect(route(result, 'LocalTypeDual', 'type')).toEqual(
      expect.objectContaining({ typeOnly: true, exportKind: 'named' }),
    );
    expect(route(result, 'LocalTypeDual', 'value')).toEqual(
      expect.objectContaining({ typeOnly: true, exportKind: 'named' }),
    );
    expect(route(result, 'TypeValue', 'value')).toEqual(
      expect.objectContaining({ typeOnly: true, exportKind: 'named' }),
    );
    expect(route(result, 'NamespaceOnly', 'type')).toEqual(
      expect.objectContaining({ typeOnly: false, exportKind: 'named' }),
    );
    expect(route(result, 'ExplicitNamespaceOnly', 'type')).toEqual(
      expect.objectContaining({ typeOnly: true, exportKind: 'named' }),
    );
    expect(route(result, 'TypeNamespace', 'value')).toEqual(
      expect.objectContaining({ typeOnly: true, exportKind: 'namespace', importedName: '*' }),
    );
    expect(route(result, 'ValueNamespace', 'value')).toEqual(
      expect.objectContaining({ typeOnly: false, exportKind: 'namespace', importedName: '*' }),
    );
    expect(
      result.index.exports.some(candidate => candidate.export === 'TypeValue' && candidate.namespace === 'type'),
    ).toBe(false);
  });

  it('expands actual component parameter types, including aliases, generics, mapped and inline props', async () => {
    const input = getSyntheticPackageInputs(fixtureRoot).find(item => item.id === 'semantic-package')!;
    const result = await generateApiMetadata({
      ...toSyntheticGeneratorOptions(input),
      entrypoints: ['.'],
      declarationConditions: ['types', 'import'],
    });
    const props = (name: string) => symbol(result, name).props?.[0].type;
    expect(props('StyledWidget')?.members.map(member => member.name)).toEqual(
      expect.arrayContaining(['appearance', 'disabled', 'shape', 'size']),
    );
    expect(props('HeadlessWidget')?.members.map(member => member.name)).toEqual(['disabled']);
    expect(props('RestrictedWidget')?.members.map(member => member.name)).toEqual(['disabled']);
    expect(props('StyledWidget')?.members.find(member => member.name === 'appearance')?.defaultValue).toBe(
      "'secondary'",
    );
    for (const name of ['StyledWidget', 'HeadlessWidget', 'RestrictedWidget']) {
      expect(props(name)?.members.find(member => member.name === 'disabled')?.defaultValue).toBe('false');
    }
    expect(props('StyledWidget')?.members.find(member => member.name === 'size')?.defaultValue).toBeUndefined();
    const defaults = symbol(result, 'ConflictingDefaults').effectiveType?.members;
    const conflicting = defaults?.find(member => member.name === 'value');
    expect(conflicting?.defaultValue).toBeUndefined();
    expect(conflicting?.status).toEqual({
      status: 'partial',
      reasons: ["Conflicting documented defaults: 'first'; 'second'"],
    });
    expect(defaults?.find(member => member.name === 'count')?.defaultValue).toBe('0');
    expect(props('StyledWidget')?.members.find(prop => prop.name === 'size')?.type?.text).toBe('"small" | "medium"');
    expect(symbol(result, 'WidgetSize').type?.text).toContain("WidgetSize = 'small' | 'medium'");
    expect(props('StringWidget')?.members.find(member => member.name === 'value')?.type?.text).toBe('string');
    for (const name of ['StyledWidget', 'HeadlessWidget', 'RestrictedWidget', 'StringWidget', 'InlineWidget']) {
      expect(props(name)?.members.length).toBeGreaterThan(0);
      for (const prop of props(name)?.members ?? []) {
        expect(prop.declarationPackages).toEqual([result.index.package.name]);
      }
    }
    expect(
      symbol(result, 'StringDictionary').effectiveType?.members.find(prop => prop.kind === 'index')
        ?.declarationPackages,
    ).toEqual([result.index.package.name]);
    expect(props('InlineWidget')?.members).toEqual([
      expect.objectContaining({ name: 'count', optional: false, type: { text: 'number', references: [] } }),
      expect.objectContaining({ name: 'mode', optional: true, type: { text: '"a" | "b"', references: [] } }),
    ]);
    expect(symbol(result, 'StyledWidget').props?.[0].signature).toBe(
      symbol(result, 'StyledWidget').effectiveType?.signatures[0].id,
    );
    expect(props('EmptyWidget')).toEqual(expect.objectContaining({ status: { status: 'complete' }, members: [] }));
    expect(symbol(result, 'NoPropsWidget').props).toEqual([]);
    expect(validateCatalog(result.index, result.records).valid).toBe(true);
  });

  it('enumerates declaration conditions, empty roots, explicit subpaths, and wildcard subpaths', async () => {
    const inputs = getSyntheticPackageInputs(fixtureRoot);
    const semantic = inputs.find(input => input.id === 'semantic-package')!;
    const requireResult = await generateApiMetadata({
      ...toSyntheticGeneratorOptions(semantic),
      entrypoints: ['.'],
      declarationConditions: ['types', 'require'],
    });
    expect(requireResult.index.declarationInputs).toEqual([
      expect.objectContaining({ path: 'declarations/require.d.cts', conditions: ['types', 'require'] }),
    ]);
    expect(route(requireResult, 'default', 'value')).toEqual(
      expect.objectContaining({
        exportKind: 'default',
        conditions: ['types', 'require'],
        target: expect.objectContaining({ kind: 'local' }),
      }),
    );
    expect(symbol(requireResult, 'legacy').declarations.map(declaration => declaration.kind)).toEqual([
      'function',
      'namespace',
    ]);

    const subpathOnly = inputs.find(input => input.id === 'subpath-only')!;
    const rootResult = await generateApiMetadata({
      ...toSyntheticGeneratorOptions(subpathOnly),
      entrypoints: ['.'],
    });
    expect(rootResult.index.declarationInputs[0].path).toBe('declarations/index.d.ts');
    expect(rootResult.index.exports).toEqual([]);
    expect(rootResult.records).toEqual([]);

    const buttonResult = await generateApiMetadata({
      ...toSyntheticGeneratorOptions(subpathOnly),
      entrypoints: ['./button'],
    });
    expect(route(buttonResult, 'SubpathButton', 'value').entrypoint).toBe('./button');

    const allResult = await generateApiMetadata(toSyntheticGeneratorOptions(subpathOnly));
    expect(route(allResult, 'alphaFeature', 'value').entrypoint).toBe('./features/alpha');
    expect(allResult.index.exports.some(value => value.entrypoint.startsWith('./features/private/'))).toBe(false);
    expect(allResult.diagnostics.map(diagnostic => diagnostic.code)).not.toContain(
      'generator.declarationConditionUnavailable',
    );
    expect(allResult.index.declarationInputs.some(input => input.path.endsWith('.json'))).toBe(false);
  });

  it('routes miniature umbrella exports to installed dependency package identities', async () => {
    const installedUmbrella = createInstalledUmbrella();
    const result = await generateApiMetadata({
      packageRoot: installedUmbrella,
      entrypoints: ['.', './unstable'],
    });

    expect(route(result, 'PrivateButton', 'value').target).toEqual(
      expect.objectContaining({
        kind: 'dependency',
        package: '@fixture/private-system',
        entrypoint: '.',
        export: 'PrivateButton',
      }),
    );
    expect(route(result, 'Dual', 'type').target).toEqual(
      expect.objectContaining({
        kind: 'dependency',
        package: '@fixture/semantic-package',
        export: 'Dual',
      }),
    );
    expect(route(result, 'unstableMergedFunction', 'value')).toEqual(
      expect.objectContaining({
        entrypoint: './unstable',
        importedName: 'mergedFunction',
      }),
    );
  });

  it('bundles external facade API detail with definition ownership and drift-safe provenance', async () => {
    const fixture = createExternalFacade();
    const result = await generateApiMetadata({
      packageRoot: fixture.facadeRoot,
      entrypoints: ['.'],
    });
    const routes = result.index.exports.filter(candidate => candidate.export === 'Widget');
    expect(routes).toHaveLength(2);
    expect(routes.map(candidate => candidate.conditions)).toEqual([
      ['types', 'import'],
      ['types', 'require'],
    ]);
    expect(routes[0].target).toEqual(
      expect.objectContaining({
        kind: 'bundled',
        symbol: expect.stringContaining('Widget'),
      }),
    );
    expect(routes[1].target).toEqual(routes[0].target);
    expect(result.diagnostics).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ code: 'generator.dependencyMetadataUnavailable' })]),
    );

    const target = routes[0].target;
    if (target.kind !== 'bundled') {
      throw new Error('Expected bundled route');
    }
    const descriptor = result.index.records.find(candidate => candidate.id === target.record);
    const record = result.records.find(candidate => candidate.recordId === target.record);
    expect(descriptor?.source?.packages.map(source => source.package.name)).toEqual(['@third/bridge', '@third/owner']);
    expect(descriptor?.source?.packages.map(source => source.declarationInputs.map(input => input.path))).toEqual([
      ['index.d.ts'],
      ['index.d.ts'],
    ]);
    expect(record?.package).toEqual({ name: '@third/owner', version: '1.0.0' });
    const widget = record?.symbols.find(candidate => candidate.id === target.symbol);
    expect(widget?.props?.[0].type.members).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'disabled',
          defaultValue: 'false',
          declarationPackages: ['@third/owner'],
          type: expect.objectContaining({ text: expect.stringContaining('boolean') }),
        }),
      ]),
    );

    writeGeneratedMetadata(result, join(fixture.facadeRoot, 'dist/metadata'));
    const query = {
      package: '@fixture/external-facade',
      importer: fixture.appRoot,
      entrypoint: '.',
      export: 'Widget',
      namespace: 'value' as const,
      conditions: ['types', 'import'],
    };
    const reader = createMetadataReader();
    const resolved = reader.resolveExport(query);
    expect(resolved.status).toBe('partial');
    expect(resolved.diagnostics).toEqual(
      expect.arrayContaining([expect.objectContaining({ causeCode: 'reader.effectiveTypePartial' })]),
    );
    expect(resolved.definition?.catalog.instance.package.name).toBe('@fixture/external-facade');
    expect(resolved.definition?.owner.package).toEqual({ name: '@third/owner', version: '1.0.0' });
    expect(resolved.definition?.record.package.name).toBe('@third/owner');

    const bridgeManifest = JSON.parse(readFileSync(join(fixture.bridgeRoot, 'package.json'), 'utf8')) as {
      version: string;
    };
    bridgeManifest.version = '2.0.0';
    writeFileSync(join(fixture.bridgeRoot, 'package.json'), JSON.stringify(bridgeManifest));
    const ownerManifest = JSON.parse(readFileSync(join(fixture.ownerRoot, 'package.json'), 'utf8')) as {
      version: string;
    };
    ownerManifest.version = '3.0.0';
    writeFileSync(join(fixture.ownerRoot, 'package.json'), JSON.stringify(ownerManifest));
    expect(createMetadataReader().resolveExport(query).definition?.owner.package.version).toBe('3.0.0');

    writeFileSync(fixture.bridgeDeclaration, `${fixture.bridgeDeclarationText}\n// changed bridge\n`);
    const bridgeDrift = createMetadataReader().resolveExport(query);
    expect(bridgeDrift.status).toBe('partial');
    expect(bridgeDrift.definition).toBeUndefined();
    expect(bridgeDrift.diagnostics).toContainEqual(expect.objectContaining({ causeCode: 'reader.declarationDrift' }));

    writeFileSync(fixture.bridgeDeclaration, fixture.bridgeDeclarationText);
    writeFileSync(fixture.ownerDeclaration, `${fixture.ownerDeclarationText}\n// changed owner\n`);
    const ownerDrift = createMetadataReader().resolveExport(query);
    expect(ownerDrift.status).toBe('partial');
    expect(ownerDrift.definition).toBeUndefined();
    expect(ownerDrift.diagnostics).toContainEqual(expect.objectContaining({ causeCode: 'reader.declarationDrift' }));
  });

  it('bundles a selected value from a DefinitelyTyped export-equals namespace', async () => {
    const fixture = createExportEqualsFacade();
    const result = await generateApiMetadata({
      packageRoot: fixture.facadeRoot,
      entrypoints: ['.'],
    });
    expectPortableGeneratedResult(result);
    const fragmentRoute = result.index.exports.find(
      candidate => candidate.export === 'Fragment' && candidate.namespace === 'value',
    );
    expect(fragmentRoute?.target).toEqual(expect.objectContaining({ kind: 'bundled' }));
    if (!fragmentRoute || fragmentRoute.target.kind !== 'bundled') {
      throw new Error('Expected bundled Fragment route');
    }

    const target = fragmentRoute.target;
    const descriptor = result.index.records.find(candidate => candidate.id === target.record);
    const record = result.records.find(candidate => candidate.recordId === target.record);
    expect(descriptor?.source?.packages).toEqual([
      expect.objectContaining({
        requested: 'runtime-lib',
        package: { name: '@types/runtime-lib', version: '1.0.0' },
        declarationInputs: [expect.objectContaining({ path: 'index.d.ts' })],
      }),
    ]);
    expect(record?.package).toEqual({ name: '@types/runtime-lib', version: '1.0.0' });
    expect(record?.symbols.find(candidate => candidate.id === target.symbol)?.name).toBe('Fragment');
    expect(result.diagnostics).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: 'generator.externalDependencyBundleUnavailable', symbol: 'Fragment' }),
      ]),
    );

    writeGeneratedMetadata(result, join(fixture.facadeRoot, 'dist/metadata'));
    const query = {
      package: '@fixture/export-equals-facade',
      importer: fixture.appRoot,
      entrypoint: '.',
      export: 'Fragment',
      namespace: 'value' as const,
      conditions: ['types'],
    };
    const resolved = createMetadataReader().resolveExport(query);
    expect(resolved.definition?.owner.package).toEqual({ name: '@types/runtime-lib', version: '1.0.0' });
    expect(resolved.definition?.record.package).toEqual({ name: '@types/runtime-lib', version: '1.0.0' });

    const ownerManifestPath = join(fixture.ownerRoot, 'package.json');
    const ownerManifest = JSON.parse(readFileSync(ownerManifestPath, 'utf8')) as { version: string };
    ownerManifest.version = '2.0.0';
    writeFileSync(ownerManifestPath, JSON.stringify(ownerManifest));
    expect(createMetadataReader().resolveExport(query).definition?.owner.package.version).toBe('2.0.0');

    writeFileSync(fixture.ownerDeclaration, `${fixture.ownerDeclarationText}\n// changed owner\n`);
    const drift = createMetadataReader().resolveExport(query);
    expect(drift.status).toBe('partial');
    expect(drift.definition).toBeUndefined();
    expect(drift.diagnostics).toContainEqual(expect.objectContaining({ causeCode: 'reader.declarationDrift' }));
  });

  it('shares equivalent bundled condition records and validates the selected dependency source', async () => {
    const fixture = createExternalFacade();
    for (const root of [fixture.ownerRoot, fixture.bridgeRoot]) {
      const manifestPath = join(root, 'package.json');
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
      writeFileSync(
        manifestPath,
        JSON.stringify({
          ...manifest,
          exports: {
            '.': {
              import: { types: './index.d.ts', default: './index.js' },
              require: { types: './index.d.cts', default: './index.js' },
            },
          },
        }),
      );
      cpSync(join(root, 'index.d.ts'), join(root, 'index.d.cts'));
    }
    const result = await generateApiMetadata({ packageRoot: fixture.facadeRoot });
    const variants = result.index.exports.filter(exportRoute => exportRoute.export === 'Widget');
    expect(variants[0].target).toEqual(variants[1].target);
    expect(result.records).toHaveLength(2);
    writeGeneratedMetadata(result, join(fixture.facadeRoot, 'dist/metadata'));
    const reader = createMetadataReader();
    const query = {
      package: '@fixture/external-facade',
      importer: fixture.appRoot,
      entrypoint: '.',
      export: 'Widget',
      namespace: 'value' as const,
    };
    for (const branch of ['import', 'require']) {
      expect(reader.resolveExport({ ...query, conditions: ['types', branch] }).definition?.symbol.name).toBe('Widget');
    }
    writeFileSync(fixture.ownerDeclaration, `${fixture.ownerDeclarationText}\n// changed import branch\n`);
    expect(reader.resolveExport({ ...query, conditions: ['types', 'import'] }).definition).toBeUndefined();
    expect(reader.resolveExport({ ...query, conditions: ['types', 'require'] }).definition?.symbol.name).toBe('Widget');
  });

  it('writes deterministic artifacts that round-trip through the bounded reader', async () => {
    const packageRoot = createInstalledPrivatePackage();
    const result = await generateApiMetadata({ packageRoot, system: 'fixture-private', entrypoints: ['.'] });
    const metadataDirectory = join(packageRoot, 'dist/metadata');
    const first = writeGeneratedMetadata(result, metadataDirectory);
    const firstIndex = readFileSync(first.indexPath, 'utf8');
    const firstRecords = first.recordPaths.map(path => readFileSync(path, 'utf8'));
    const second = writeGeneratedMetadata(result, metadataDirectory);

    expect(readFileSync(second.indexPath, 'utf8')).toBe(firstIndex);
    expect(second.recordPaths.map(path => readFileSync(path, 'utf8'))).toEqual(firstRecords);
    expect(firstIndex).toBe(serializeMetadata(result.index));
    expect(firstIndex).not.toContain(packageRoot);
    expect(firstRecords.every(recordText => !recordText.includes(packageRoot))).toBe(true);

    const importer = join(testOutputRoot, 'consumer/index.js');
    mkdirSync(dirname(importer), { recursive: true });
    writeFileSync(importer, '', 'utf8');
    const installedRoot = join(testOutputRoot, 'consumer/node_modules/@fixture/private-system');
    cpSync(packageRoot, installedRoot, { recursive: true });

    const loader = new MetadataLoader();
    const catalog = loader.loadPackageIndex('@fixture/private-system', importer);
    expect(catalog.index.system).toBe('fixture-private');
    const record = loader.loadApiRecord(catalog, result.records[0].recordId);
    expect(record.symbols.map(item => item.name)).toEqual(
      expect.arrayContaining(['PrivateButton', 'PrivateButtonProps', 'PrivateButtonState']),
    );
  });

  it.each([false, true])(
    'shares one record across equivalent declaration conditions (same file=%s)',
    async sameFile => {
      const fixture = createConditionalPackage({ sameFile });
      const result = await generateApiMetadata({ packageRoot: fixture.packageRoot });
      expect(result.index.completeness.api.status).toBe('complete');
      expect(result.records).toHaveLength(1);
      expect(result.index.records[0].path).toBe('api/api-root.json');
      const variants = result.index.exports.filter(exportRoute => exportRoute.export === 'Widget');
      expect(variants.map(exportRoute => exportRoute.conditions)).toEqual([
        ['types', 'import'],
        ['types', 'require'],
      ]);
      expect(variants[0].target).toEqual(variants[1].target);
      expect(result.records[0].declarationInputs).toHaveLength(2);
      expect(result.records[0].dependencyInputs.map(input => input.conditions)).toEqual(
        expect.arrayContaining([
          ['types', 'import'],
          ['types', 'require'],
        ]),
      );
      expect(validateCatalog(result.index, result.records).valid).toBe(true);
      expect(serializeMetadata((await generateApiMetadata({ packageRoot: fixture.packageRoot })).records[0])).toBe(
        serializeMetadata(result.records[0]),
      );
      writeGeneratedMetadata(result, join(fixture.packageRoot, 'dist/metadata'));
      const reader = createMetadataReader();
      for (const branch of ['import', 'require']) {
        const resolved = reader.resolveExport({ ...fixture.query, conditions: ['types', branch] });
        expect(resolved.definition?.record.recordId).toBe('api:root');
        expect(resolved.definition?.symbol.name).toBe('Widget');
        expect(resolved.diagnostics).not.toEqual(
          expect.arrayContaining([expect.objectContaining({ code: 'reader.referencedDetailUnavailable' })]),
        );
      }
      expect(reader.getStats().recordsLoaded).toBe(1);
    },
  );

  it.each(['declaration', 'dependency'] as const)('does not merge different %s contracts', async difference => {
    const fixture = createConditionalPackage({ difference });
    const result = await generateApiMetadata({ packageRoot: fixture.packageRoot });
    expect(result.records).toHaveLength(2);
    const variants = result.index.exports.filter(exportRoute => exportRoute.export === 'Widget');
    expect(variants[0].target).not.toEqual(variants[1].target);
    expect(validateCatalog(result.index, result.records).valid).toBe(true);
  });

  it('validates shared records against only the selected declaration and dependency branch during resolution', async () => {
    const fixture = createConditionalPackage({});
    const result = await generateApiMetadata({ packageRoot: fixture.packageRoot });
    writeGeneratedMetadata(result, join(fixture.packageRoot, 'dist/metadata'));
    const reader = createMetadataReader();
    const imported = { ...fixture.query, conditions: ['types', 'import'] };
    const required = { ...fixture.query, conditions: ['types', 'require'] };
    expect(reader.resolveExport(imported).definition).toBeDefined();
    expect(reader.resolveExport(required).definition).toBeDefined();
    writeFileSync(join(fixture.dependencyRoot, 'index.d.ts'), 'export interface Shared { changed: true }\n');
    expect(reader.resolveExport(imported).diagnostics).toContainEqual(
      expect.objectContaining({ code: 'reader.dependencyInputUnavailable' }),
    );
    expect(reader.resolveExport(required).diagnostics).not.toContainEqual(
      expect.objectContaining({ code: 'reader.dependencyInputUnavailable' }),
    );
    writeFileSync(join(fixture.packageRoot, 'index.d.ts'), 'export interface Changed {}\n');
    expect(() => reader.resolveExport(imported)).toThrow(/changed/);
    expect(reader.resolveExport(required).definition?.symbol.name).toBe('Widget');
    const catalog = reader.loadPackageIndex(fixture.query.package, fixture.query.importer);
    expect(() => reader.loadApiRecord(catalog, result.records[0].recordId)).toThrow(/changed/);
  });

  it('removes obsolete generated condition shards without deleting unrelated files', async () => {
    const fixture = createConditionalPackage({ difference: 'declaration' });
    const directory = join(fixture.packageRoot, 'dist/metadata');
    const old = writeGeneratedMetadata(await generateApiMetadata({ packageRoot: fixture.packageRoot }), directory);
    expect(old.recordPaths).toHaveLength(2);
    const notes = join(directory, 'api/notes.txt');
    writeFileSync(notes, 'Keep unrelated files');
    cpSync(join(fixture.packageRoot, 'index.d.ts'), join(fixture.packageRoot, 'index.d.cts'));
    const current = writeGeneratedMetadata(await generateApiMetadata({ packageRoot: fixture.packageRoot }), directory);
    expect(current.recordPaths).toEqual([join(directory, 'api/api-root.json')]);
    expect(old.recordPaths.some(file => existsSync(file))).toBe(false);
    expect(readFileSync(notes, 'utf8')).toBe('Keep unrelated files');
    expect(readdirSync(join(directory, 'api')).sort()).toEqual(['api-root.json', 'notes.txt']);
  });

  it('refreshes final package identity after a version bump while preserving rollout status', async () => {
    const packageRoot = createInstalledPrivatePackage();
    const initial = markApiMetadataRolloutPartial(
      await generateApiMetadata({ packageRoot, system: 'fluent-v9', entrypoints: ['.'] }),
      ['pilot coverage only'],
    );
    writeGeneratedMetadata(initial, join(packageRoot, 'dist/metadata'));

    const packageJsonPath = join(packageRoot, 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as { version: string };
    packageJson.version = '2.0.0';
    writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, 'utf8');

    await expect(refreshGeneratedApiMetadata(packageRoot)).resolves.toBe(true);

    const refreshed = JSON.parse(readFileSync(join(packageRoot, 'dist/metadata/index.json'), 'utf8')) as {
      package: { version: string };
      system?: string;
      completeness: { api: { status: string; reasons?: string[] } };
    };
    expect(refreshed.package.version).toBe('2.0.0');
    expect(refreshed.system).toBe('fluent-v9');
    expect(refreshed.completeness.api).toEqual({ status: 'partial', reasons: ['pilot coverage only'] });
  });

  it('retains intentionally empty entrypoints and unrelated files during publication refresh', async () => {
    const fixture = createConditionalPackage({});
    const manifestPath = join(fixture.packageRoot, 'package.json');
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    manifest.exports['./widget'] = manifest.exports['.'];
    manifest.exports['.'] = { types: './empty.d.ts' };
    writeFileSync(manifestPath, JSON.stringify(manifest));
    writeFileSync(join(fixture.packageRoot, 'empty.d.ts'), 'export {};\n');
    const directory = join(fixture.packageRoot, 'dist/metadata');
    const initial = await generateApiMetadata({ packageRoot: fixture.packageRoot });
    expect(initial.index.completeness.api.status).toBe('complete');
    expect(initial.index.exports.some(exportRoute => exportRoute.entrypoint === '.')).toBe(false);
    writeGeneratedMetadata(initial, directory);
    writeFileSync(join(directory, 'notes.txt'), 'Preserve unrelated files');
    await expect(refreshGeneratedApiMetadata(fixture.packageRoot)).resolves.toBe(true);
    const refreshed = JSON.parse(readFileSync(join(directory, 'index.json'), 'utf8'));
    expect(refreshed.completeness.api.status).toBe('complete');
    expect(refreshed.declarationInputs).toContainEqual(expect.objectContaining({ path: 'empty.d.ts' }));
    expect(readFileSync(join(directory, 'notes.txt'), 'utf8')).toBe('Preserve unrelated files');
  });

  it('fails a publication refresh and preserves the existing catalog when a declaration input disappears', async () => {
    const packageRoot = createInstalledPrivatePackage();
    const initial = await generateApiMetadata({ packageRoot, entrypoints: ['.'] });
    const metadataDirectory = join(packageRoot, 'dist/metadata');
    writeGeneratedMetadata(initial, metadataDirectory);
    const initialIndex = readFileSync(join(metadataDirectory, 'index.json'), 'utf8');

    rmSync(join(packageRoot, initial.index.declarationInputs[0].path));

    await expect(refreshGeneratedApiMetadata(packageRoot)).rejects.toThrow('[generator.declarationMissing]');
    expect(readFileSync(join(metadataDirectory, 'index.json'), 'utf8')).toBe(initialIndex);
  });

  it('validates caller-supplied catalogs and rejects shard paths escaping through symlinks', async () => {
    const packageRoot = createInstalledPrivatePackage();
    const result = await generateApiMetadata({ packageRoot, entrypoints: ['.'] });
    const invalidOutput = join(testOutputRoot, 'invalid-output');
    const invalidIndex = {
      ...result.index,
      package: { ...result.index.package, name: 'INVALID PACKAGE NAME' },
    };

    expect(() => writeGeneratedMetadata({ index: invalidIndex, records: result.records }, invalidOutput)).toThrow(
      'Cannot write invalid API metadata',
    );
    expect(existsSync(invalidOutput)).toBe(false);

    const symlinkOutput = join(testOutputRoot, 'symlink-output');
    const externalDirectory = join(testOutputRoot, 'external-shards');
    mkdirSync(symlinkOutput, { recursive: true });
    mkdirSync(externalDirectory, { recursive: true });
    symlinkSync(externalDirectory, join(symlinkOutput, 'api'), process.platform === 'win32' ? 'junction' : 'dir');

    expect(() => writeGeneratedMetadata(result, symlinkOutput)).toThrow('escapes its root through a symlink');
    expect(readdirSync(externalDirectory)).toEqual([]);
    expect(existsSync(join(symlinkOutput, 'index.json'))).toBe(false);
  });

  it('fingerprints reachable sibling declarations and rejects local semantic drift', async () => {
    const sourceRoot = join(fixtureRoot, 'split-declarations');
    const result = await generateApiMetadata({
      packageRoot: sourceRoot,
      entrypoints: ['.'],
      declarationConditions: ['types', 'import'],
    });
    const expectedInputs = [
      expect.objectContaining({ path: 'declarations/index.d.ts', conditions: ['types', 'import'] }),
      expect.objectContaining({ path: 'declarations/types.d.ts', conditions: ['types', 'import'] }),
    ];
    expect(result.index.declarationInputs).toEqual(expectedInputs);
    expect(result.records[0].declarationInputs).toEqual(expectedInputs);

    const importer = join(testOutputRoot, 'split-consumer/index.js');
    const installedRoot = join(testOutputRoot, 'split-consumer/node_modules/@fixture/split-declarations');
    cpSync(sourceRoot, installedRoot, { recursive: true });
    mkdirSync(dirname(importer), { recursive: true });
    writeFileSync(importer, '', 'utf8');
    const manifestPath = join(installedRoot, 'package.json');
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as {
      exports: Record<string, unknown>;
      fluentuiCatalog?: string;
    };
    manifest.fluentuiCatalog = './metadata.json';
    manifest.exports['./metadata.json'] = './dist/metadata/index.json';
    writeFileSync(manifestPath, JSON.stringify(manifest), 'utf8');
    writeGeneratedMetadata(result, join(installedRoot, 'dist/metadata'));

    const loader = new MetadataLoader();
    const catalog = loader.loadPackageIndex('@fixture/split-declarations', importer);
    expect(loader.loadApiRecord(catalog, result.records[0].recordId).symbols.map(item => item.name)).toEqual(
      expect.arrayContaining(['SplitWidget', 'SplitWidgetBaseProps', 'SplitWidgetProps']),
    );

    const rootDeclaration = join(installedRoot, 'declarations/index.d.ts');
    const siblingDeclaration = join(installedRoot, 'declarations/types.d.ts');
    const unchangedRoot = readFileSync(rootDeclaration, 'utf8');
    writeFileSync(
      siblingDeclaration,
      `${readFileSync(siblingDeclaration, 'utf8')}\nexport interface NewlyChangedLocalType { changed: true }\n`,
      'utf8',
    );
    expect(readFileSync(rootDeclaration, 'utf8')).toBe(unchangedRoot);
    expect(() => loader.loadApiRecord(catalog, result.records[0].recordId)).toThrow(
      expect.objectContaining({ code: 'reader.declarationDrift' }),
    );
  });

  it('reports bounded partial views and unavailable declaration inputs explicitly', async () => {
    const boundedRoot = createBoundedPackage();
    const bounded = await generateApiMetadata({ packageRoot: boundedRoot });
    expect(symbol(bounded, 'Huge').effectiveType?.status).toEqual(
      expect.objectContaining({
        status: 'partial',
        reasons: expect.arrayContaining([expect.stringContaining('512')]),
      }),
    );
    expect(symbol(bounded, 'Huge').effectiveType?.members).toHaveLength(512);

    const missingRoot = createMissingDeclarationPackage();
    const missing = await generateApiMetadata({ packageRoot: missingRoot });
    expect(missing.index.capabilities.api).toEqual(
      expect.objectContaining({ status: 'unsupported', reasons: expect.any(Array) }),
    );
    expect(missing.index.completeness.api).toEqual(
      expect.objectContaining({ status: 'unavailable', reasons: expect.any(Array) }),
    );
    expect(missing.diagnostics).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: 'generator.declarationMissing', severity: 'error' })]),
    );

    const unresolvedRoot = createUnresolvedImportPackage();
    const unresolved = await generateApiMetadata({ packageRoot: unresolvedRoot });
    expect(unresolved.index.completeness.api).toEqual(
      expect.objectContaining({ status: 'partial', reasons: expect.any(Array) }),
    );
    expect(unresolved.records[0].completeness).toEqual(
      expect.objectContaining({ status: 'partial', reasons: expect.any(Array) }),
    );
    expect(unresolved.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: 'generator.unresolvedDeclarationImport',
          severity: 'error',
          path: 'declarations/index.d.ts',
        }),
      ]),
    );
  });

  it('rejects publication when selected declaration inputs are missing or invalid', async () => {
    const missing = await generateApiMetadata({ packageRoot: createMissingDeclarationPackage() });
    const explicitlyPartial = markApiMetadataRolloutPartial(missing, ['pilot coverage only']);

    expect(() => assertApiMetadataPublishable(explicitlyPartial)).toThrow(
      expect.objectContaining({
        message: expect.stringContaining('[generator.declarationMissing]'),
      }),
    );

    const unresolved = await generateApiMetadata({ packageRoot: createUnresolvedImportPackage() });
    expect(() => assertApiMetadataPublishable(unresolved)).toThrow(
      expect.objectContaining({
        message: expect.stringContaining('[generator.unresolvedDeclarationImport]'),
      }),
    );
  });
});

function route(result: GeneratorResult, exportName: string, namespace: 'type' | 'value'): ExportRoute {
  const value = result.index.exports.find(
    candidate => candidate.export === exportName && candidate.namespace === namespace,
  );
  if (!value) {
    throw new Error(`Missing ${namespace} export ${exportName}`);
  }
  return value;
}

function symbol(result: GeneratorResult, name: string): ApiSymbol {
  const value = result.records.flatMap(record => record.symbols).find(candidate => candidate.name === name);
  if (!value) {
    throw new Error(`Missing symbol ${name}`);
  }
  return value;
}

function relationshipKinds(value: ApiSymbol): string[] {
  return value.relationships.map(relationship => relationship.kind);
}

function expectPortableGeneratedResult(result: GeneratorResult): void {
  const producerRoot = resolve('.');
  const absoluteImport = /import\(["'](?:\/|[A-Za-z]:[\\/])/;
  const visit = (value: unknown, path: string): void => {
    if (typeof value === 'string') {
      expect({ path, value }).not.toEqual(
        expect.objectContaining({
          value: expect.stringContaining(producerRoot),
        }),
      );
      expect({ path, value }).not.toEqual(
        expect.objectContaining({
          value: expect.stringMatching(absoluteImport),
        }),
      );
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item, index) => visit(item, `${path}[${index}]`));
      return;
    }
    if (value && typeof value === 'object') {
      Object.entries(value).forEach(([key, item]) => visit(item, `${path}.${key}`));
    }
  };
  visit(result, '$');
}

function memberNames(value: ApiSymbol): string[] {
  return value.effectiveType?.members.map(member => member.name) ?? [];
}

function effectiveMember(value: ApiSymbol, name: string) {
  const result = value.effectiveType?.members.find(candidate => candidate.name === name);
  if (!result) {
    throw new Error(`Missing effective member ${value.name}.${name}`);
  }
  return result;
}

function createEmittedParameterPackage(): string {
  const packageRoot = join(testOutputRoot, 'emitted-parameters');
  const declarationsRoot = join(packageRoot, 'declarations');
  mkdirSync(declarationsRoot, { recursive: true });
  writeFileSync(
    join(packageRoot, 'package.json'),
    `${JSON.stringify({
      name: '@fixture/emitted-parameters',
      version: '1.0.0',
      exports: {
        '.': {
          import: {
            types: './declarations/index.d.ts',
            default: './dist/index.js',
          },
        },
      },
    })}\n`,
    'utf8',
  );
  const emitted = ts.transpileDeclaration(
    `
export function parameterKinds(
  required: string,
  optional?: number,
  defaulted = true,
  ...rest: readonly string[]
): void {}
`,
    {
      compilerOptions: {
        declaration: true,
        emitDeclarationOnly: true,
        strict: true,
      },
      fileName: 'index.ts',
      reportDiagnostics: true,
    },
  );
  const errors = emitted.diagnostics?.filter(diagnostic => diagnostic.category === ts.DiagnosticCategory.Error) ?? [];
  if (errors.length > 0) {
    throw new Error(errors.map(diagnostic => ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')).join('\n'));
  }

  writeFileSync(join(declarationsRoot, 'index.d.ts'), emitted.outputText, 'utf8');
  return packageRoot;
}

function createTypeOnlyReexportPackage(): string {
  const appRoot = join(testOutputRoot, 'type-only-reexports');
  const packageRoot = join(appRoot, 'node_modules/@fixture/type-only-facade');
  const ownerRoot = join(appRoot, 'node_modules/@fluentui/type-owner-fixture');
  mkdirSync(join(packageRoot, 'declarations'), { recursive: true });
  mkdirSync(ownerRoot, { recursive: true });
  writeFileSync(
    join(packageRoot, 'package.json'),
    JSON.stringify({
      name: '@fixture/type-only-facade',
      version: '1.0.0',
      dependencies: { '@fluentui/type-owner-fixture': '1.0.0' },
      exports: { '.': { types: './declarations/index.d.ts', default: './dist/index.js' } },
    }),
  );
  writeFileSync(
    join(packageRoot, 'declarations/index.d.ts'),
    `
import { Dual as ImportedDual } from '@fluentui/type-owner-fixture';
export type { Dual as TypeDual, onlyValue as TypeValue } from '@fluentui/type-owner-fixture';
export type { ImportedDual as LocalTypeDual };
export { OnlyTypes as NamespaceOnly } from '@fluentui/type-owner-fixture';
export type { OnlyTypes as ExplicitNamespaceOnly } from '@fluentui/type-owner-fixture';
export type * as TypeNamespace from '@fluentui/type-owner-fixture';
export * as ValueNamespace from '@fluentui/type-owner-fixture';
`,
  );
  writeFileSync(
    join(ownerRoot, 'package.json'),
    JSON.stringify({
      name: '@fluentui/type-owner-fixture',
      version: '1.0.0',
      fluentuiCatalog: './metadata.json',
      types: './index.d.ts',
      main: './index.js',
    }),
  );
  writeFileSync(
    join(ownerRoot, 'index.d.ts'),
    `
export declare class Dual { value: string }
export declare const onlyValue: number;
export declare namespace OnlyTypes { interface Member { value: string } }
`,
  );
  writeFileSync(join(ownerRoot, 'index.js'), '');
  return packageRoot;
}

function createExportEqualsFacade(): {
  appRoot: string;
  facadeRoot: string;
  ownerRoot: string;
  ownerDeclaration: string;
  ownerDeclarationText: string;
} {
  const appRoot = join(testOutputRoot, 'export-equals');
  const facadeRoot = join(appRoot, 'node_modules/@fixture/export-equals-facade');
  const runtimeRoot = join(appRoot, 'node_modules/runtime-lib');
  const ownerRoot = join(appRoot, 'node_modules/@types/runtime-lib');
  mkdirSync(join(facadeRoot, 'declarations'), { recursive: true });
  mkdirSync(runtimeRoot, { recursive: true });
  mkdirSync(ownerRoot, { recursive: true });
  writeFileSync(
    join(facadeRoot, 'package.json'),
    JSON.stringify({
      name: '@fixture/export-equals-facade',
      version: '1.0.0',
      dependencies: { 'runtime-lib': '1.0.0' },
      fluentuiCatalog: './metadata.json',
      exports: {
        '.': { types: './declarations/index.d.ts', default: './dist/index.js' },
        './metadata.json': './dist/metadata/index.json',
      },
    }),
  );
  writeFileSync(
    join(facadeRoot, 'declarations/index.d.ts'),
    `
import { Fragment } from 'runtime-lib';
export { Fragment };
`,
  );
  writeFileSync(
    join(runtimeRoot, 'package.json'),
    JSON.stringify({ name: 'runtime-lib', version: '1.0.0', main: './index.js' }),
  );
  writeFileSync(join(runtimeRoot, 'index.js'), '');
  writeFileSync(
    join(ownerRoot, 'package.json'),
    JSON.stringify({ name: '@types/runtime-lib', version: '1.0.0', types: './index.d.ts' }),
  );
  const ownerDeclaration = join(ownerRoot, 'index.d.ts');
  const ownerDeclarationText = `
export = RuntimeLibrary;
declare namespace RuntimeLibrary {
  interface FragmentProps { children?: string }
  interface ExoticComponent<P> { (props: P): string }
  const Fragment: ExoticComponent<FragmentProps>;
}
`;
  writeFileSync(ownerDeclaration, ownerDeclarationText);
  return { appRoot, facadeRoot, ownerRoot, ownerDeclaration, ownerDeclarationText };
}

function createInstalledUmbrella(): string {
  const packageRoot = join(testOutputRoot, 'umbrella/node_modules/@fixture/miniature-umbrella');
  cpSync(join(fixtureRoot, 'miniature-umbrella'), packageRoot, { recursive: true });
  cpSync(join(fixtureRoot, 'private-system'), join(testOutputRoot, 'umbrella/node_modules/@fixture/private-system'), {
    recursive: true,
  });
  cpSync(
    join(fixtureRoot, 'semantic-package'),
    join(testOutputRoot, 'umbrella/node_modules/@fixture/semantic-package'),
    { recursive: true },
  );
  return packageRoot;
}

function createInstalledPrivatePackage(): string {
  const packageRoot = join(testOutputRoot, 'source-private-system');
  cpSync(join(fixtureRoot, 'private-system'), packageRoot, { recursive: true });
  const packageJsonPath = join(packageRoot, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as {
    exports: Record<string, unknown>;
    [key: string]: unknown;
  };
  packageJson.fluentuiCatalog = './metadata.json';
  packageJson.exports['./metadata.json'] = './dist/metadata/index.json';
  writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, 'utf8');
  return packageRoot;
}

function createConditionalPackage(options: { sameFile?: boolean; difference?: 'declaration' | 'dependency' }) {
  const appRoot = join(testOutputRoot, 'conditional-consumer');
  const packageRoot = join(appRoot, 'node_modules/@fixture/conditional');
  const dependencyRoot = join(appRoot, 'node_modules/@fixture/shared');
  for (const root of [packageRoot, dependencyRoot]) {
    mkdirSync(root, { recursive: true });
    writeFileSync(
      join(root, 'package.json'),
      JSON.stringify({
        name: root === packageRoot ? '@fixture/conditional' : '@fixture/shared',
        version: '1.0.0',
        type: 'module',
        fluentuiCatalog: './metadata.json',
        exports: {
          '.': {
            import: { types: './index.d.ts' },
            require: { types: options.sameFile ? './index.d.ts' : './index.d.cts' },
          },
          './metadata.json': './dist/metadata/index.json',
        },
        ...(root === packageRoot ? { dependencies: { '@fixture/shared': '1.0.0' } } : {}),
      }),
    );
  }
  const declaration =
    "import type { Shared } from '@fixture/shared';\nexport interface Widget extends Shared { label: string }\n";
  writeFileSync(join(packageRoot, 'index.d.ts'), declaration);
  writeFileSync(
    join(packageRoot, 'index.d.cts'),
    options.difference === 'declaration' ? declaration.replace('label: string', 'label: number') : declaration,
  );
  writeFileSync(join(dependencyRoot, 'index.d.ts'), 'export interface Shared { disabled?: boolean }\n');
  writeFileSync(
    join(dependencyRoot, 'index.d.cts'),
    options.difference === 'dependency'
      ? 'export interface Shared { disabled?: number }\n'
      : 'export interface Shared { disabled?: boolean }\n',
  );
  writeFileSync(join(appRoot, 'package.json'), JSON.stringify({ name: 'conditional-consumer', private: true }));
  return {
    packageRoot,
    dependencyRoot,
    query: {
      package: '@fixture/conditional',
      importer: appRoot,
      entrypoint: '.',
      export: 'Widget',
      namespace: 'type' as const,
    },
  };
}

function createExternalFacade(): {
  appRoot: string;
  facadeRoot: string;
  bridgeRoot: string;
  ownerRoot: string;
  bridgeDeclaration: string;
  bridgeDeclarationText: string;
  ownerDeclaration: string;
  ownerDeclarationText: string;
} {
  const appRoot = join(testOutputRoot, 'external-facade-app');
  const nodeModules = join(appRoot, 'node_modules');
  const ownerRoot = join(nodeModules, '@third/owner');
  const bridgeRoot = join(nodeModules, '@third/bridge');
  const facadeRoot = join(nodeModules, '@fixture/external-facade');
  const ownerDeclaration = join(ownerRoot, 'index.d.ts');
  const bridgeDeclaration = join(bridgeRoot, 'index.d.ts');
  const ownerDeclarationText = `
export interface ReactElement { type: string }
export interface WidgetProps {
  /** @default false */
  disabled?: boolean;
  label: string;
}
export declare const Widget: (props: WidgetProps) => ReactElement;
`.trimStart();
  const bridgeDeclarationText = `export { Widget, type WidgetProps } from '@third/owner';\n`;

  for (const root of [ownerRoot, bridgeRoot, join(facadeRoot, 'dist')]) {
    mkdirSync(root, { recursive: true });
  }
  writeFileSync(
    join(ownerRoot, 'package.json'),
    JSON.stringify({
      name: '@third/owner',
      version: '1.0.0',
      types: './index.d.ts',
      main: './index.js',
    }),
  );
  writeFileSync(ownerDeclaration, ownerDeclarationText);
  writeFileSync(join(ownerRoot, 'index.js'), 'exports.Widget = () => null;\n');
  writeFileSync(
    join(bridgeRoot, 'package.json'),
    JSON.stringify({
      name: '@third/bridge',
      version: '1.0.0',
      types: './index.d.ts',
      main: './index.js',
      dependencies: { '@third/owner': '1.0.0' },
    }),
  );
  writeFileSync(bridgeDeclaration, bridgeDeclarationText);
  writeFileSync(join(bridgeRoot, 'index.js'), "module.exports = require('@third/owner');\n");
  writeFileSync(
    join(facadeRoot, 'package.json'),
    JSON.stringify({
      name: '@fixture/external-facade',
      version: '1.0.0',
      fluentuiCatalog: './metadata.json',
      dependencies: { '@third/bridge': '1.0.0' },
      exports: {
        '.': {
          import: { types: './dist/index.d.ts', default: './dist/index.js' },
          require: { types: './dist/index.d.ts', default: './dist/index.cjs' },
        },
        './metadata.json': './dist/metadata/index.json',
      },
    }),
  );
  writeFileSync(join(facadeRoot, 'dist/index.d.ts'), "export { Widget, type WidgetProps } from '@third/bridge';\n");
  writeFileSync(join(facadeRoot, 'dist/index.js'), "export { Widget } from '@third/bridge';\n");
  writeFileSync(join(facadeRoot, 'dist/index.cjs'), "module.exports = require('@third/bridge');\n");
  writeFileSync(join(appRoot, 'package.json'), JSON.stringify({ name: 'external-facade-app', private: true }));

  return {
    appRoot,
    facadeRoot,
    bridgeRoot,
    ownerRoot,
    bridgeDeclaration,
    bridgeDeclarationText,
    ownerDeclaration,
    ownerDeclarationText,
  };
}

function createBoundedPackage(): string {
  const packageRoot = join(testOutputRoot, 'bounded');
  mkdirSync(join(packageRoot, 'declarations'), { recursive: true });
  writeFileSync(
    join(packageRoot, 'package.json'),
    `${JSON.stringify({
      name: '@fixture/bounded',
      version: '1.0.0',
      exports: { '.': { types: './declarations/index.d.ts' } },
    })}\n`,
    'utf8',
  );
  writeFileSync(
    join(packageRoot, 'declarations/index.d.ts'),
    `export interface Huge {\n${Array.from({ length: 513 }, (_, index) => `  member${index}: string;`).join(
      '\n',
    )}\n}\n`,
    'utf8',
  );
  return packageRoot;
}

function createMissingDeclarationPackage(): string {
  const packageRoot = join(testOutputRoot, 'missing');
  mkdirSync(packageRoot, { recursive: true });
  writeFileSync(
    join(packageRoot, 'package.json'),
    `${JSON.stringify({
      name: '@fixture/missing',
      version: '1.0.0',
      exports: { '.': { types: './declarations/missing.d.ts' } },
    })}\n`,
    'utf8',
  );
  return packageRoot;
}

function createUnresolvedImportPackage(): string {
  const packageRoot = join(testOutputRoot, 'unresolved');
  mkdirSync(join(packageRoot, 'declarations'), { recursive: true });
  writeFileSync(
    join(packageRoot, 'package.json'),
    `${JSON.stringify({
      name: '@fixture/unresolved',
      version: '1.0.0',
      exports: { '.': { types: './declarations/index.d.ts' } },
    })}\n`,
    'utf8',
  );
  writeFileSync(
    join(packageRoot, 'declarations/index.d.ts'),
    "import type { Missing } from '@fixture/missing-dependency';\nexport interface Broken { value: Missing; }\n",
    'utf8',
  );
  return packageRoot;
}

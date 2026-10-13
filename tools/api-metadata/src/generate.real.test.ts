import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import {
  REAL_PILOT_PREPARATION_COMMAND,
  assertRealPilotDeclarationsPrepared,
  getRealPilotInputs,
  toGeneratorOptions,
  type PilotInput,
} from './__fixtures__/pilot-inputs';
import { generateApiMetadata } from './generate';
import { createMetadataReader } from './resolve';
import { validateCatalog } from './validate';
import { serializeMetadata } from './serialize';
import type { ApiRecord, ApiSymbol, ExportRoute, GeneratorResult } from './types';
import { writeGeneratedMetadata } from './write';

const describeReal = process.env.FLUENTUI_API_METADATA_REAL_PILOTS === '1' ? describe : describe.skip;
const routingRoot = join(process.cwd(), '.real-pilot-routing');

const v8PackageRoot = process.env.FLUENTUI_API_METADATA_V8_PACKAGE_ROOT;
const describeV8 = v8PackageRoot ? describe : describe.skip;

describeV8('demand-driven v8 declarations', () => {
  jest.setTimeout(120_000);

  it('resolves an installed declaration subpath omitted from dependency exports', async () => {
    const result = await generateApiMetadata({
      packageRoot: v8PackageRoot!,
      entrypoints: ['./lib/components/Icon/Icon.styles'],
    });
    expect(result.diagnostics.filter(diagnostic => diagnostic.severity === 'error')).toEqual([]);
    expect(validateCatalog(result.index, result.records).valid).toBe(true);
  });

  it('keeps Coachmark checker-derived constant views stable', async () => {
    const options = { packageRoot: v8PackageRoot!, entrypoints: ['./lib-commonjs/Coachmark'] };
    const first = await generateApiMetadata(options);
    const second = await generateApiMetadata(options);
    const view = (result: GeneratorResult) =>
      result.records.flatMap(record => record.symbols).find(candidate => candidate.name === 'COACHMARK_ATTRIBUTE_NAME')
        ?.effectiveType;
    const original = view(first);
    const repeated = view(second);
    if (JSON.stringify(original) !== JSON.stringify(repeated)) {
      const fields = Object.keys(original ?? {}).filter(
        key =>
          JSON.stringify(original?.[key as keyof typeof original]) !==
          JSON.stringify(repeated?.[key as keyof typeof repeated]),
      );
      const memberIndex = original?.members.findIndex(
        (candidateMember, index) => JSON.stringify(candidateMember) !== JSON.stringify(repeated?.members[index]),
      );
      throw new Error(
        JSON.stringify({
          fields,
          types: [original?.type, repeated?.type],
          memberIndex,
          members:
            memberIndex === undefined || memberIndex < 0
              ? []
              : [original?.members[memberIndex], repeated?.members[memberIndex]],
        }),
      );
    }
    expect(original).toBeDefined();
  });

  it.each(['selected', 'none'] as const)('generates bounded root metadata (%s)', async detail => {
    const started = performance.now();
    const result = await generateApiMetadata({
      packageRoot: v8PackageRoot!,
      entrypoints: ['.'],
      detail,
      ...(detail === 'selected'
        ? {
            selectedExports: ['Button', 'PrimaryButton', 'ContextualMenu'].map(name => ({
              entrypoint: '.',
              export: name,
              namespace: 'value' as const,
            })),
          }
        : {}),
    });
    const elapsedMs = Math.round(performance.now() - started);
    expect(result.index.exports.length).toBeGreaterThan(0);
    expect(validateCatalog(result.index, result.records).valid).toBe(true);
    for (const name of ['Button', 'PrimaryButton', 'ContextualMenu']) {
      expect(findRoute(result, name, 'value').classifications.map(value => value.facet)).toContain('component');
      if (detail === 'selected') {
        expect(symbol(result, name).props?.[0].type.members.length).toBeGreaterThan(0);
      }
    }
    const expanded = result.records.flatMap(record => record.symbols).filter(value => value.effectiveType);
    expect(expanded).toHaveLength(detail === 'selected' ? 3 : 0);
    if (detail === 'selected') {
      const outputRoot = mkdtempSync(join(v8PackageRoot!, '.fluentui-api-metadata-test-'));
      try {
        const written = writeGeneratedMetadata(result, join(outputRoot, 'selected'));
        const importer = dirname(dirname(dirname(v8PackageRoot!)));
        const reader = createMetadataReader();
        reader.registerPackageCatalog({
          requested: '@fluentui/react',
          importer,
          packageRoot: v8PackageRoot!,
          metadataFile: written.indexPath,
        });
        const resolved = reader.resolveExport({
          package: '@fluentui/react',
          importer,
          entrypoint: '.',
          export: 'Button',
          namespace: 'value',
        });
        if (!resolved.definition) {
          throw new Error(JSON.stringify(resolved.diagnostics));
        }
        expect(resolved.definition?.symbol.name).toBe('Button');
      } finally {
        rmSync(outputRoot, { recursive: true, force: true });
      }
      const repeated = await generateApiMetadata({
        packageRoot: v8PackageRoot!,
        entrypoints: ['.'],
        detail,
        selectedExports: ['Button', 'PrimaryButton', 'ContextualMenu'].map(name => ({
          entrypoint: '.',
          export: name,
          namespace: 'value' as const,
        })),
      });
      expect(serializeMetadata(repeated.index)).toBe(serializeMetadata(result.index));
      expect(repeated.records.map(serializeMetadata)).toEqual(result.records.map(serializeMetadata));
    }
    console.info(
      JSON.stringify({
        detail,
        elapsedMs,
        bytes: Buffer.byteLength(JSON.stringify(result)),
        routes: result.index.exports.length,
      }),
    );
  });
});

describeV8('full v8 canonical catalog', () => {
  jest.setTimeout(1_200_000);

  it('writes and reads stable bounded shards across root and subpath exports', async () => {
    const outputRoot = mkdtempSync(join(v8PackageRoot!, '.fluentui-api-metadata-test-'));
    const started = performance.now();
    try {
      const { firstWrite, generatedMs, routes } = await (async () => {
        const first = await generateApiMetadata({ packageRoot: v8PackageRoot! });
        expect(first.diagnostics.filter(diagnostic => diagnostic.severity === 'error')).toEqual([]);
        expect(validateCatalog(first.index, first.records).valid).toBe(true);
        expect(first.records.length).toBeGreaterThan(1);
        const written = writeGeneratedMetadata(first, join(outputRoot, 'first'));
        const elapsedMs = Math.round(performance.now() - started);

        const reader = createMetadataReader();
        const importer = dirname(dirname(dirname(v8PackageRoot!)));
        reader.registerPackageCatalog({
          requested: '@fluentui/react',
          importer,
          packageRoot: v8PackageRoot!,
          metadataFile: written.indexPath,
          index: first.index,
        });
        for (const [entrypoint, name] of [
          ['.', 'Button'],
          ['.', 'ContextualMenu'],
          ['./lib/Button', 'Button'],
          ['./lib/ContextualMenu', 'ContextualMenu'],
        ]) {
          const result = reader.resolveExport({
            package: '@fluentui/react',
            importer,
            entrypoint,
            export: name,
            namespace: 'value',
          });
          if (!result.definition) {
            throw new Error(`${entrypoint}/${name}: ${JSON.stringify(result.diagnostics)}`);
          }
          expect(result.definition.symbol.name).toBe(name);
        }
        return { firstWrite: written, generatedMs: elapsedMs, routes: first.index.exports.length };
      })();

      const second = await generateApiMetadata({ packageRoot: v8PackageRoot! });
      const secondWrite = writeGeneratedMetadata(second, join(outputRoot, 'second'));
      const firstIndex = JSON.parse(readFileSync(firstWrite.indexPath, 'utf8')) as GeneratorResult['index'];
      const secondIndex = JSON.parse(readFileSync(secondWrite.indexPath, 'utf8')) as GeneratorResult['index'];
      if (!readFileSync(secondWrite.indexPath).equals(readFileSync(firstWrite.indexPath))) {
        const sections = (Object.keys(firstIndex) as Array<keyof GeneratorResult['index']>).filter(
          key => JSON.stringify(firstIndex[key]) !== JSON.stringify(secondIndex[key]),
        );
        const changedRecord = firstIndex.records.findIndex(
          (descriptor, index) => JSON.stringify(descriptor) !== JSON.stringify(secondIndex.records[index]),
        );
        throw new Error(
          JSON.stringify({
            sections,
            records: [firstIndex.records.length, secondIndex.records.length],
            changedRecord:
              changedRecord < 0
                ? undefined
                : {
                    first: firstIndex.records[changedRecord],
                    second: secondIndex.records[changedRecord],
                  },
            routes: [firstIndex.exports.length, secondIndex.exports.length],
          }),
        );
      }
      expect(secondWrite.recordPaths.length).toBe(firstWrite.recordPaths.length);
      for (let index = 0; index < firstWrite.recordPaths.length; index++) {
        expect(readFileSync(secondWrite.recordPaths[index]).equals(readFileSync(firstWrite.recordPaths[index]))).toBe(
          true,
        );
      }
      console.info(
        JSON.stringify({
          generatedMs,
          totalMs: Math.round(performance.now() - started),
          records: firstWrite.recordPaths.length,
          routes,
          largestRecordBytes: Math.max(...firstWrite.recordPaths.map(path => readFileSync(path).length)),
          heapUsedMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        }),
      );
    } finally {
      rmSync(outputRoot, { recursive: true, force: true });
    }
  });
});

describeReal('generateApiMetadata real declaration pilots', () => {
  jest.setTimeout(120_000);

  const inputs = new Map(getRealPilotInputs().map(input => [input.id, input]));
  const results = new Map<string, GeneratorResult>();

  beforeAll(async () => {
    rmSync(routingRoot, { recursive: true, force: true });
    assertRealPilotDeclarationsPrepared([...inputs.values()]);
    for (const input of inputs.values()) {
      for (const declaration of input.declarations.filter(declarationRoute =>
        declarationRoute.conditions.includes('import'),
      )) {
        expect(existsSync(declaration.declarationPath)).toBe(true);
      }
    }
    for (const id of [
      'styled-button',
      'headless-button',
      'styled-accordion',
      'headless-accordion',
      'styled-suite-root',
      'styled-suite-unstable',
    ]) {
      const input = requireInput(inputs, id);
      results.set(id, await generateApiMetadata(toGeneratorOptions(input)));
    }
  });

  it('preserves styled and headless Button alias/composition differences', () => {
    const styled = requireResult(results, 'styled-button');
    const headless = requireResult(results, 'headless-button');

    expect(styled.index.system).toBe('fluent-v9');
    expect(headless.index.system).toBe('headless');
    expect(headless.index.completeness.api).toEqual(
      expect.objectContaining({
        status: 'partial',
        reasons: expect.arrayContaining([expect.stringContaining('advertised declaration route')]),
      }),
    );
    const styledButtonSignature = symbol(styled, 'Button').effectiveType?.signatures[0];
    const styledProps = symbol(styled, 'Button').props?.[0].type.members;
    const headlessProps = symbol(headless, 'Button').props?.[0].type.members;
    expect(styledProps).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'appearance',
          optional: true,
          defaultValue: "'secondary'",
          type: expect.objectContaining({ text: expect.stringContaining('"primary"') }),
        }),
        expect.objectContaining({ name: 'disabled', optional: true, defaultValue: 'false' }),
        expect.objectContaining({
          name: 'size',
          defaultValue: "'medium'",
          type: expect.objectContaining({ text: expect.stringContaining('"small"') }),
        }),
        expect.objectContaining({ name: 'onClick' }),
      ]),
    );
    expect(headlessProps?.map(prop => prop.name)).not.toEqual(expect.arrayContaining(['appearance', 'shape', 'size']));
    expect(headlessProps?.map(prop => prop.name)).toEqual(expect.arrayContaining(['disabled', 'onClick']));
    for (const props of [styledProps, headlessProps]) {
      expect(props?.find(prop => prop.name === 'disabled')?.declarationPackages).toEqual(
        expect.arrayContaining(['@fluentui/react-button']),
      );
      expect(props?.find(prop => prop.name === 'aria-label')?.declarationPackages).toEqual(['@types/react']);
      expect(props?.find(prop => prop.name === 'onClick')?.declarationPackages).toEqual(['@types/react']);
      expect(props?.find(prop => prop.name === 'icon')?.presentation).toEqual(
        expect.objectContaining({
          kind: 'slot',
          summary: "Slot<'span'>",
          targets: [{ kind: 'intrinsic', name: 'span', role: 'default' }],
        }),
      );
      expect(props?.find(prop => prop.name === 'icon')?.type?.text).toContain('WithSlotShorthandValue');
    }
    expect(member(symbol(styled, 'ButtonState'), 'icon').presentation).toBeUndefined();
    expect(styledButtonSignature).toEqual(
      expect.objectContaining({
        typeParameters: [],
        parameters: [
          expect.objectContaining({
            name: 'props',
            optional: false,
            type: expect.objectContaining({ text: expect.stringContaining('ButtonProps') }),
          }),
        ],
      }),
    );
    expect(memberNames(symbol(styled, 'ButtonBaseProps'))).not.toEqual(
      expect.arrayContaining(['appearance', 'shape', 'size']),
    );

    expect(findRoute(headless, 'Button', 'value').target).toEqual(expect.objectContaining({ kind: 'local' }));
    expect(findRoute(headless, 'ButtonProps', 'type').target).toEqual(
      expect.objectContaining({
        kind: 'dependency',
        package: '@fluentui/react-button',
        export: 'ButtonBaseProps',
      }),
    );
    expect(relationshipKinds(symbol(headless, 'ButtonState'))).toEqual(
      expect.arrayContaining(['intersection', 'indexed-access']),
    );
    const rootType = member(symbol(headless, 'ButtonState'), 'root').type?.text;
    expect(rootType).toContain('data-disabled');
    expect(rootType).toContain('data-icon-position');
    expect(recordForSymbol(headless, 'ButtonState').dependencyInputs.map(input => input.requested)).toEqual(
      expect.arrayContaining(['@fluentui/react-button']),
    );
    const styledInputs = recordForSymbol(styled, 'Button').dependencyInputs;
    expect(styledInputs.find(input => input.requested === 'react')).toEqual(
      expect.objectContaining({
        package: expect.objectContaining({ name: '@types/react' }),
        declarationPath: 'index.d.ts',
      }),
    );
    expect(styledInputs.find(input => input.requested === 'typescript')).toEqual(
      expect.objectContaining({
        package: expect.objectContaining({ name: 'typescript' }),
        declarationPath: 'lib/lib.dom.d.ts',
      }),
    );
  });

  it('emits one shared record per equivalent styled/headless declaration entrypoint', async () => {
    for (const [id, expectedRecords] of [
      ['styled-button', 1],
      ['headless-button', 55],
    ] as const) {
      const input = requireInput(inputs, id);
      const generated = await generateApiMetadata({ packageRoot: input.packageRoot, system: input.system });
      expect(generated.index.completeness.api.status).toBe('complete');
      expect(generated.records).toHaveLength(expectedRecords);
      expect(generated.index.records.some(record => /types-(import|require)/.test(record.path))).toBe(false);
      for (const exported of generated.index.exports.filter(route => route.conditions.includes('import'))) {
        const required = generated.index.exports.find(
          route =>
            route.entrypoint === exported.entrypoint &&
            route.export === exported.export &&
            route.namespace === exported.namespace &&
            route.conditions.includes('require'),
        );
        expect(required?.target).toEqual(exported.target);
      }
    }
  });

  it('preserves all four Accordion APIs and styled/headless semantic differences', () => {
    const styled = requireResult(results, 'styled-accordion');
    const headless = requireResult(results, 'headless-accordion');

    expect(symbol(styled, 'Accordion').effectiveType?.signatures).toHaveLength(2);
    expect(symbol(styled, 'Accordion').props).toHaveLength(2);
    for (const component of ['Accordion', 'AccordionHeader', 'AccordionItem', 'AccordionPanel']) {
      expect(symbol(styled, component).props?.[0].type.members.length).toBeGreaterThan(0);
      expect(symbol(headless, component).props?.[0].type.members.length).toBeGreaterThan(0);
    }
    expect(symbol(headless, 'Accordion').effectiveType?.signatures).toHaveLength(1);
    expect(
      symbol(styled, 'Accordion').props?.[0].type.members.find(prop => prop.name === 'onToggle')?.declarationPackages,
    ).toEqual(expect.arrayContaining(['@fluentui/react-accordion']));
    expect(findRoute(headless, 'AccordionProps', 'type').target).toEqual(
      expect.objectContaining({ kind: 'dependency', export: 'AccordionBaseProps' }),
    );
    expect(findRoute(headless, 'AccordionHeaderProps', 'type').target).toEqual(
      expect.objectContaining({ kind: 'dependency', export: 'AccordionHeaderBaseProps' }),
    );
    expect(memberNames(symbol(styled, 'AccordionHeaderBaseProps'))).not.toEqual(
      expect.arrayContaining(['inline', 'size']),
    );
    expect(member(symbol(styled, 'AccordionProps'), 'navigation').deprecated).toContain(
      'Arrow keyboard navigation is not recommended',
    );
    expect(member(symbol(styled, 'AccordionProps'), 'onToggle').type?.text).toContain('Value');
    expect(memberNames(symbol(styled, 'AccordionProps'))).not.toEqual(
      expect.arrayContaining(['button', 'expandIcon', 'value', 'collapseMotion']),
    );

    const itemValue = member(symbol(styled, 'AccordionItemProps'), 'value');
    expect(itemValue.optional).toBe(false);
    expect(itemValue.type?.text).toBe('Value');
    expect(findRoute(headless, 'AccordionItemProps', 'type').target).toEqual(
      expect.objectContaining({ kind: 'dependency', export: 'AccordionItemProps' }),
    );
    expect(relationshipKinds(symbol(headless, 'AccordionItemState'))).toContain('intersection');
    expect(member(symbol(headless, 'AccordionItemState'), 'root').type?.text).toEqual(
      expect.stringContaining('data-open'),
    );

    expect(memberNames(symbol(styled, 'AccordionPanelBaseProps'))).not.toContain('collapseMotion');
    expect(memberNames(symbol(styled, 'AccordionPanelSlots'))).toContain('collapseMotion');
    expect(findRoute(headless, 'AccordionPanelProps', 'type').target).toEqual(
      expect.objectContaining({ kind: 'dependency', export: 'AccordionPanelBaseProps' }),
    );
    expect(findRoute(headless, 'AccordionPanelSlots', 'type').target).toEqual(
      expect.objectContaining({ kind: 'dependency', export: 'AccordionPanelSlots' }),
    );

    for (const component of ['Accordion', 'AccordionHeader', 'AccordionItem', 'AccordionPanel']) {
      expect(findRoute(headless, component, 'value').target).toEqual(expect.objectContaining({ kind: 'local' }));
    }
    expectRootComposition(symbol(headless, 'AccordionState'), ['children', 'data-collapsible', 'data-multiple']);
    expectRootComposition(symbol(headless, 'AccordionHeaderState'), ['children', 'data-open', 'data-disabled']);
    expectRootComposition(symbol(headless, 'AccordionItemState'), ['children', 'data-disabled', 'data-open']);
    expectRootComposition(symbol(headless, 'AccordionPanelState'), ['children', 'data-open']);
  });

  it('keeps suite routes dependency-backed and restricted to suite declarations', () => {
    const suite = requireResult(results, 'styled-suite-root');
    const input = requireInput(inputs, 'styled-suite-root');
    expect(suite.index.declarationInputs).toEqual([
      expect.objectContaining({
        path: 'dist/index.d.ts',
        conditions: ['types', 'import'],
      }),
    ]);
    expect(suite.index.exports.every(value => value.conditions.join() === 'types,import')).toBe(true);

    for (const expectation of input.routeExpectations) {
      const value = findRoute(suite, expectation.export, expectation.namespace);
      expect(value.target.kind).toBe(expectation.target.kind);
    }
    for (const absent of input.expectedAbsentExports ?? []) {
      expect(suite.index.exports.some(value => value.export === absent)).toBe(false);
    }
    expect(findRoute(suite, 'Button', 'value').target).toEqual(
      expect.objectContaining({ kind: 'dependency', package: '@fluentui/react-button' }),
    );
    expect(findRoute(suite, 'Accordion', 'value').target).toEqual(
      expect.objectContaining({ kind: 'dependency', package: '@fluentui/react-accordion' }),
    );
  });

  it('generates the suite unstable declaration route from its built published input', () => {
    const unstable = requireResult(results, 'styled-suite-unstable');
    expect(unstable.index.declarationInputs).toEqual([
      expect.objectContaining({
        path: 'dist/unstable.d.ts',
        conditions: ['types', 'import'],
      }),
    ]);
    expect(unstable.index.exports.length).toBeGreaterThan(0);
    expect(unstable.index.exports.every(value => value.entrypoint === './unstable')).toBe(true);
  });

  it('keeps checker-substituted signature types portable in serialized records', () => {
    for (const [id, result] of results) {
      const producerRoot = requireInput(inputs, id).packageRoot;
      const serialized = [serializeMetadata(result.index), ...result.records.map(serializeMetadata)].join('\n');
      expect(serialized).not.toContain(producerRoot);
      expect(serialized).not.toMatch(/import\((?:"|')(?:\/|[A-Za-z]:[/\\])/);
    }
  });

  it('resolves generated headless and suite dependency routes from installed package fixtures', () => {
    const importer = join(routingRoot, 'consumer/index.js');
    const nodeModules = join(routingRoot, 'consumer/node_modules');
    mkdirSync(dirname(importer), { recursive: true });
    writeFileSync(importer, '', 'utf8');
    for (const id of ['styled-button', 'styled-accordion', 'headless-button', 'styled-suite-root']) {
      writeInstalledCatalog(nodeModules, requireResult(results, id), requireInput(inputs, id).packageRoot);
    }

    const child = spawnSync(
      process.execPath,
      [
        '-r',
        'ts-node/register',
        '-e',
        `
const { createMetadataReader } = require(${JSON.stringify(join(__dirname, 'index.ts'))});
const reader = createMetadataReader();
const headless = reader.resolveExport({
  package: '@fluentui/react-headless-components-preview',
  importer: ${JSON.stringify(importer)},
  entrypoint: './button',
  export: 'ButtonProps',
  namespace: 'type',
  conditions: ['types', 'import'],
});
const suite = reader.resolveExport({
  package: '@fluentui/react-components',
  importer: ${JSON.stringify(importer)},
  entrypoint: '.',
  export: 'Accordion',
  namespace: 'value',
  conditions: ['types', 'import'],
});
console.log(JSON.stringify({
  headless: {
    status: headless.status,
    packages: headless.routes.map(value => value.catalog.instance.package.name),
    symbol: headless.definition?.symbol.name,
  },
  suite: {
    status: suite.status,
    packages: suite.routes.map(value => value.catalog.instance.package.name),
    symbol: suite.definition?.symbol.name,
  },
}));
`,
      ],
      { cwd: dirname(importer), encoding: 'utf8' },
    );
    if (child.status !== 0) {
      throw new Error(`Installed routing child failed:\n${child.stderr}`);
    }
    const resolved = JSON.parse(child.stdout.trim()) as {
      headless: { status: string; packages: string[]; symbol?: string };
      suite: { status: string; packages: string[]; symbol?: string };
    };
    expect(resolved.headless.status).toBe('partial');
    expect(resolved.headless.packages).toEqual([
      '@fluentui/react-headless-components-preview',
      '@fluentui/react-button',
    ]);
    expect(resolved.headless.symbol).toBe('ButtonBaseProps');
    expect(resolved.suite.status).toBe('partial');
    expect(resolved.suite.packages).toEqual(['@fluentui/react-components', '@fluentui/react-accordion']);
    expect(resolved.suite.symbol).toBe('Accordion');
  });

  afterAll(() => {
    rmSync(routingRoot, { recursive: true, force: true });
    if (process.env.FLUENTUI_API_METADATA_REAL_PILOTS !== '1') {
      console.warn(`Prepare and run real pilots with: ${REAL_PILOT_PREPARATION_COMMAND}`);
    }
  });
});

function requireInput(inputs: Map<string, PilotInput>, id: string): PilotInput {
  const input = inputs.get(id);
  if (!input) {
    throw new Error(`Missing pilot input ${id}`);
  }
  return input;
}

function requireResult(results: Map<string, GeneratorResult>, id: string): GeneratorResult {
  const result = results.get(id);
  if (!result) {
    throw new Error(`Missing pilot result ${id}`);
  }
  return result;
}

function findRoute(result: GeneratorResult, exportName: string, namespace: 'type' | 'value'): ExportRoute {
  const value = result.index.exports.find(
    candidate => candidate.export === exportName && candidate.namespace === namespace,
  );
  if (!value) {
    throw new Error(`Missing ${namespace} export ${exportName}`);
  }
  return value;
}

function recordForSymbol(result: GeneratorResult, name: string): ApiRecord {
  const record = result.records.find(candidate => candidate.symbols.some(value => value.name === name));
  if (!record) {
    throw new Error(`Missing symbol ${name}`);
  }
  return record;
}

function symbol(result: GeneratorResult, name: string): ApiSymbol {
  const value = recordForSymbol(result, name).symbols.find(candidate => candidate.name === name);
  if (!value) {
    throw new Error(`Missing symbol ${name}`);
  }
  return value;
}

function member(value: ApiSymbol, name: string) {
  const result = value.effectiveType?.members.find(candidate => candidate.name === name);
  if (!result) {
    throw new Error(`Missing effective member ${value.name}.${name}`);
  }
  return result;
}

function memberNames(value: ApiSymbol): string[] {
  return value.effectiveType?.members.map(item => item.name) ?? [];
}

function relationshipKinds(value: ApiSymbol): string[] {
  return value.relationships.map(relationship => relationship.kind);
}

function expectRootComposition(value: ApiSymbol, fragments: string[]): void {
  const rootType = member(value, 'root').type?.text;
  for (const fragment of fragments) {
    expect(rootType).toContain(fragment);
  }
}

function writeInstalledCatalog(nodeModules: string, result: GeneratorResult, sourcePackageRoot: string): void {
  const packageRoot = join(nodeModules, ...result.index.package.name.split('/'));
  mkdirSync(packageRoot, { recursive: true });
  const exports: Record<string, unknown> = {
    './metadata.json': './dist/metadata/index.json',
  };
  for (const exportRoute of result.index.exports) {
    if (exports[exportRoute.entrypoint]) {
      continue;
    }
    const declaration = result.index.declarationInputs.find(
      candidate =>
        candidate.conditions.length === exportRoute.conditions.length &&
        candidate.conditions.every((condition, index) => condition === exportRoute.conditions[index]),
    );
    if (!declaration) {
      throw new Error(`Missing installed declaration for ${exportRoute.entrypoint}`);
    }
    exports[exportRoute.entrypoint] = toConditionalDeclarationExport(exportRoute.conditions, `./${declaration.path}`);
  }
  writeFileSync(
    join(packageRoot, 'package.json'),
    `${JSON.stringify({
      name: result.index.package.name,
      version: result.index.package.version,
      fluentuiCatalog: './metadata.json',
      exports,
    })}\n`,
    'utf8',
  );
  for (const declaration of result.index.declarationInputs) {
    const destination = join(packageRoot, declaration.path);
    mkdirSync(dirname(destination), { recursive: true });
    cpSync(join(sourcePackageRoot, declaration.path), destination);
  }
  writeGeneratedMetadata(result, join(packageRoot, 'dist/metadata'));
}

function toConditionalDeclarationExport(conditions: readonly string[], path: string): unknown {
  return conditions.reduceRight<unknown>((target, condition) => ({ [condition]: target }), path);
}

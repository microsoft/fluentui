import { mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import * as fs from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import ts = require('typescript');

import { generateApiMetadata } from './generate';
import { validateCatalog } from './validate';

jest.mock('typescript', () => {
  const actual = jest.requireActual<typeof ts>('typescript');
  return { ...actual, createProgram: jest.fn(actual.createProgram) };
});

jest.mock('node:fs', () => {
  const actual = jest.requireActual<typeof fs>('node:fs');
  return { ...actual, readFileSync: jest.fn(actual.readFileSync) };
});

describe('shared declaration graph extraction', () => {
  const directories: string[] = [];

  afterEach(() => {
    jest.restoreAllMocks();
    jest.mocked(fs.readFileSync).mockReset();
    jest.mocked(fs.readFileSync).mockImplementation(jest.requireActual<typeof fs>('node:fs').readFileSync);
    jest.mocked(ts.createProgram).mockReset();
    jest.mocked(ts.createProgram).mockImplementation(jest.requireActual<typeof ts>('typescript').createProgram);
    for (const directory of directories.splice(0)) {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it('reuses dependency manifest and declaration fingerprints across index entrypoints', async () => {
    const root = realpathSync(mkdtempSync(join(tmpdir(), 'fluentui-extraction-dependency-')));
    directories.push(root);
    const dependencyRoot = join(root, 'node_modules', '@fluentui', 'fixture-dependency');
    mkdirSync(dependencyRoot, { recursive: true });
    const declaration = join(dependencyRoot, 'index.d.ts');
    const manifest = join(dependencyRoot, 'package.json');
    writeFileSync(
      manifest,
      JSON.stringify({ name: '@fluentui/fixture-dependency', version: '1.0.0', types: 'index.d.ts' }),
    );
    writeFileSync(declaration, 'export interface External { value: string; }\n');
    const exports: Record<string, { types: string }> = {};
    for (const name of ['first', 'second', 'third', 'fourth']) {
      exports[`./${name}`] = { types: `./${name}.d.ts` };
      writeFileSync(
        join(root, `${name}.d.ts`),
        "import type { External } from '@fluentui/fixture-dependency'; export interface Local extends External {}\n",
      );
    }
    writeFileSync(
      join(root, 'package.json'),
      JSON.stringify({
        name: 'dependency-graph-fixture',
        version: '1.0.0',
        exports,
        dependencies: { '@fluentui/fixture-dependency': '1.0.0' },
      }),
    );
    const actualFs = jest.requireActual<typeof fs>('node:fs');
    const moduleResolution = jest.spyOn(ts, 'resolveModuleName');
    let ownerReads = 0;
    let fingerprintReads = 0;
    jest.mocked(fs.readFileSync).mockImplementation((file, options) => {
      const stack = new Error().stack ?? '';
      if (String(file) === manifest && stack.includes('findPackageManifest')) {
        ownerReads++;
      }
      if (String(file) === declaration && stack.includes('resolveDependency')) {
        fingerprintReads++;
      }
      return actualFs.readFileSync(file, options);
    });
    const result = await generateApiMetadata({ packageRoot: root, detail: 'none' });
    expect(validateCatalog(result.index, result.records).valid).toBe(true);
    expect(result.index.exports).toHaveLength(4);
    expect(ownerReads).toBe(1);
    expect(fingerprintReads).toBe(1);
    expect(moduleResolution.mock.calls.length).toBeGreaterThan(0);
    expect(moduleResolution.mock.calls.every(call => call[4] !== undefined)).toBe(true);
    for (const record of result.records) {
      expect(record.dependencyInputs).toContainEqual(
        expect.objectContaining({
          requested: '@fluentui/fixture-dependency',
          conditions: record.declarationInputs[0].conditions,
        }),
      );
    }
  });

  it('resolves a shared local module edge once across public entrypoints and export provenance walks', async () => {
    const root = realpathSync(mkdtempSync(join(tmpdir(), 'fluentui-extraction-graph-')));
    directories.push(root);
    mkdirSync(join(root, 'entries'));
    const exports: Record<string, { types: string }> = { '.': { types: './index.d.ts' } };
    for (const name of ['first', 'second', 'third', 'fourth']) {
      exports[`./${name}`] = { types: `./entries/${name}.d.ts` };
      writeFileSync(join(root, 'entries', `${name}.d.ts`), "export * from '../bridge';\n");
    }
    writeFileSync(join(root, 'package.json'), JSON.stringify({ name: 'graph-fixture', version: '1.0.0', exports }));
    writeFileSync(join(root, 'index.d.ts'), "export * from './bridge';\n");
    writeFileSync(join(root, 'bridge.d.ts'), "export * from './leaf';\n");
    writeFileSync(
      join(root, 'leaf.d.ts'),
      'export interface First { label: string; }\nexport interface Second { count: number; [key: string]: number; }\n',
    );
    const actual = jest.requireActual<typeof ts>('typescript');
    let sharedEdgeResolutions = 0;
    let sharedTypeRenderings = 0;
    let documentationReads = 0;
    jest.mocked(ts.createProgram).mockImplementation((rootNames, options, host, oldProgram, diagnostics) => {
      const program = actual.createProgram(rootNames, options, host, oldProgram, diagnostics);
      const checker = program.getTypeChecker();
      const declaration = program.getSourceFile(join(root, 'leaf.d.ts'))!.statements[0] as ts.InterfaceDeclaration;
      const sharedSymbol = checker.getSymbolAtLocation(declaration.name)!;
      const readDocumentation = sharedSymbol.getDocumentationComment.bind(sharedSymbol);
      sharedSymbol.getDocumentationComment = currentChecker => {
        documentationReads++;
        return readDocumentation(currentChecker);
      };
      const renderType = checker.typeToString.bind(checker);
      checker.typeToString = (type, location, flags) => {
        if (type.getSymbol() === sharedSymbol && location === declaration) {
          sharedTypeRenderings++;
        }
        return renderType(type, location, flags);
      };
      const resolveSymbol = checker.getSymbolAtLocation.bind(checker);
      checker.getSymbolAtLocation = node => {
        if (actual.isStringLiteralLike(node) && node.text === './leaf') {
          sharedEdgeResolutions++;
        }
        return resolveSymbol(node);
      };
      return program;
    });

    const result = await generateApiMetadata({ packageRoot: root });
    expect(validateCatalog(result.index, result.records).valid).toBe(true);
    expect(result.index.exports).toHaveLength(10);
    expect(sharedEdgeResolutions).toBe(1);
    expect(sharedTypeRenderings).toBe(1);
    expect(documentationReads).toBe(1);
    const sharedSymbols = result.records.flatMap(record => record.symbols).filter(symbol => symbol.name === 'First');
    expect(sharedSymbols).toHaveLength(5);
    expect(new Set(sharedSymbols).size).toBe(1);
    expect(
      result.records.flatMap(record => record.symbols).find(symbol => symbol.name === 'Second')?.effectiveType?.members,
    ).toContainEqual(expect.objectContaining({ name: '[string]' }));
    for (const route of result.index.exports) {
      expect(route.declarationInputs).toContain('bridge.d.ts');
      expect(route.declarationInputs).toContain('leaf.d.ts');
    }
  });
});

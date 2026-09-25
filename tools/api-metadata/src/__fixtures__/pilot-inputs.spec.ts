import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import ts = require('typescript');

import {
  REAL_PILOT_PREPARATION_COMMAND,
  assertRealPilotDeclarationsPrepared,
  getRealPilotInputs,
  getSyntheticPackageInputs,
  toGeneratorOptions,
  toSyntheticGeneratorOptions,
} from './pilot-inputs';

describe('API metadata pilot inputs', () => {
  it('derives real declaration routes from published export maps', () => {
    const inputs = getRealPilotInputs();

    expect(inputs.map(input => input.id)).toEqual([
      'styled-button',
      'styled-accordion',
      'headless-button',
      'headless-accordion',
      'styled-suite-root',
      'styled-suite-unstable',
    ]);

    for (const input of inputs) {
      expect(existsSync(input.packageJsonPath)).toBe(true);
      expect(input.declarations.length).toBeGreaterThan(0);
      expect(new Set(input.focusExports).size).toBe(input.focusExports.length);
      expect(new Set(input.routeExpectations.map(route => `${route.export}:${route.namespace}`)).size).toBe(
        input.routeExpectations.length,
      );
    }

    expect(toGeneratorOptions(inputs[2])).toEqual({
      packageRoot: inputs[2].packageRoot,
      packageName: '@fluentui/react-headless-components-preview',
      system: 'headless',
      entrypoints: ['./button'],
      declarationConditions: ['types', 'import'],
    });
  });

  it('provides an actionable preparation failure for a clean checkout', () => {
    const input = getRealPilotInputs()[0];
    const missingInput = {
      ...input,
      declarations: [
        {
          conditions: ['types', 'import'] as const,
          declarationPath: join(input.packageRoot, 'dist/definitely-missing.d.ts'),
        },
      ],
    };

    expect(() => assertRealPilotDeclarationsPrepared([missingInput])).toThrow(REAL_PILOT_PREPARATION_COMMAND);
  });

  it('keeps synthetic declarations valid and focused', () => {
    const inputs = getSyntheticPackageInputs();
    const declarationFiles = inputs.flatMap(input => {
      const packageJson = JSON.parse(readFileSync(join(input.packageRoot, 'package.json'), 'utf8')) as {
        exports: Record<string, unknown>;
      };

      return collectTypesPaths(packageJson.exports).map(path => join(input.packageRoot, path));
    });

    expect(inputs.map(input => input.id)).toEqual([
      'semantic-package',
      'subpath-only',
      'private-system',
      'miniature-umbrella',
    ]);
    expect(toSyntheticGeneratorOptions(inputs[3])).toEqual({
      packageRoot: inputs[3].packageRoot,
      packageName: '@fixture/miniature-umbrella',
      system: 'fixture-private',
      entrypoints: ['.', './unstable'],
    });
    expect(declarationFiles.every(existsSync)).toBe(true);

    const program = ts.createProgram(declarationFiles, {
      baseUrl: inputs[0].packageRoot,
      module: ts.ModuleKind.NodeNext,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
      noEmit: true,
      paths: {
        '@fixture/private-system': ['../private-system/declarations/index.d.ts'],
        '@fixture/semantic-package': ['./declarations/import.d.ts'],
      },
      target: ts.ScriptTarget.ESNext,
    });
    const fixtureDiagnostics = ts
      .getPreEmitDiagnostics(program)
      .filter(diagnostic => diagnostic.file?.fileName.includes('/src/__fixtures__/'));

    expect(fixtureDiagnostics).toEqual([]);
  });
});

function collectTypesPaths(exports: Record<string, unknown>): string[] {
  const paths = new Set<string>();

  const visit = (value: unknown): void => {
    if (typeof value === 'string') {
      if (/\.d\.(?:c|m)?ts$/.test(value) && !value.includes('*')) {
        paths.add(value);
      }
      return;
    }

    if (!value || typeof value !== 'object') {
      return;
    }

    for (const child of Object.values(value)) {
      visit(child);
    }
  };

  visit(exports);
  return [...paths];
}

// reexportTracking.test.ts
import { Project } from 'ts-morph';
import { analyzeImports, ImportedValue } from '../importAnalyzer';
import * as path from 'path';
import * as fs from 'fs';

// Setup test directory with a chain of re-exports
const TEST_DIR = path.join(__dirname, 'test-reexports');

beforeAll(() => {
  if (!fs.existsSync(TEST_DIR)) {
    fs.mkdirSync(TEST_DIR, { recursive: true });
  }

  // Create a main file that imports from an index
  fs.writeFileSync(
    path.join(TEST_DIR, 'main.ts'),
    `
    import { Component, AliasedValue, Utils, DirectValue } from './index';
    import DefaultExport from './index';

    const styles = {
      component: Component,
      alias: AliasedValue,
      utils: Utils,
      direct: DirectValue,
      default: DefaultExport
    };
    `,
  );

  // Create an index file that re-exports everything
  fs.writeFileSync(
    path.join(TEST_DIR, 'index.ts'),
    `
    // Re-export from components
    export { Component } from './components';

    // Re-export with alias
    export { Value as AliasedValue } from './values';

    // Re-export all from utils
    export * from './utils';

    // Direct export
    export const DirectValue = 'tokens.direct.value';

    // Re-export default
    export { default } from './defaults';
    `,
  );

  // Create a components file
  fs.writeFileSync(
    path.join(TEST_DIR, 'components.ts'),
    `
    export const Component = 'tokens.components.primary';
    `,
  );

  // Create a values file
  fs.writeFileSync(
    path.join(TEST_DIR, 'values.ts'),
    `
    export const Value = 'tokens.values.standard';
    `,
  );

  // Create a utils file
  fs.writeFileSync(
    path.join(TEST_DIR, 'utils.ts'),
    `
    export const Utils = 'tokens.utils.helper';
    `,
  );

  // Create a defaults file
  fs.writeFileSync(
    path.join(TEST_DIR, 'defaults.ts'),
    `
    const DefaultValue = 'tokens.defaults.main';
    export default DefaultValue;
    `,
  );
});

afterAll(() => {
  if (fs.existsSync(TEST_DIR)) {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
  }
});

describe('Re-export tracking', () => {
  let project: Project;

  beforeEach(() => {
    // Create a project using the existing directory structure
    // This makes it easier to test without needing to override compiler options
    project = new Project({
      tsConfigFilePath: path.join(TEST_DIR, '../../../tsconfig.json'),
      skipAddingFilesFromTsConfig: true,
    });

    // Create a minimal tsconfig.json
    fs.writeFileSync(
      path.join(TEST_DIR, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          target: 'es2020',
          moduleResolution: 'node',
          esModuleInterop: true,
          skipLibCheck: true,
        },
      }),
    );
  });

  test('follows standard re-export chain', async () => {
    const mainFile = path.join(TEST_DIR, 'main.ts');
    const sourceFile = project.addSourceFileAtPath(mainFile);

    const importedValues: Map<string, ImportedValue> = await analyzeImports(sourceFile, project);

    // Check that Component was correctly resolved from components.ts
    expect(importedValues.has('Component')).toBe(true);
    expect(importedValues.get('Component')?.value).toBe('tokens.components.primary');
    expect(importedValues.get('Component')?.sourceFile).toContain('components.ts');
  });

  test('follows aliased re-export chain', async () => {
    const mainFile = path.join(TEST_DIR, 'main.ts');
    const sourceFile = project.addSourceFileAtPath(mainFile);

    const importedValues: Map<string, ImportedValue> = await analyzeImports(sourceFile, project);

    // Check that AliasedValue was correctly resolved from values.ts
    expect(importedValues.has('AliasedValue')).toBe(true);
    expect(importedValues.get('AliasedValue')?.value).toBe('tokens.values.standard');
    expect(importedValues.get('AliasedValue')?.sourceFile).toContain('values.ts');
  });

  test('follows namespace re-export', async () => {
    const mainFile = path.join(TEST_DIR, 'main.ts');
    const sourceFile = project.addSourceFileAtPath(mainFile);

    const importedValues: Map<string, ImportedValue> = await analyzeImports(sourceFile, project);

    // Check that Utils from namespace export was correctly resolved
    expect(importedValues.has('Utils')).toBe(true);
    expect(importedValues.get('Utils')?.value).toBe('tokens.utils.helper');
    expect(importedValues.get('Utils')?.sourceFile).toContain('utils.ts');
  });

  test('handles direct exports in the same file', async () => {
    const mainFile = path.join(TEST_DIR, 'main.ts');
    const sourceFile = project.addSourceFileAtPath(mainFile);

    const importedValues: Map<string, ImportedValue> = await analyzeImports(sourceFile, project);

    // Check that DirectValue was correctly resolved from index.ts
    expect(importedValues.has('DirectValue')).toBe(true);
    expect(importedValues.get('DirectValue')?.value).toBe('tokens.direct.value');
    expect(importedValues.get('DirectValue')?.sourceFile).toContain('index.ts');
  });

  test('follows default export chain', async () => {
    const mainFile = path.join(TEST_DIR, 'main.ts');
    const sourceFile = project.addSourceFileAtPath(mainFile);

    const importedValues: Map<string, ImportedValue> = await analyzeImports(sourceFile, project);

    // Check that DefaultExport was correctly resolved from defaults.ts
    expect(importedValues.has('DefaultExport')).toBe(true);
    expect(importedValues.get('DefaultExport')?.value).toBe('tokens.defaults.main');
    expect(importedValues.get('DefaultExport')?.sourceFile).toContain('defaults.ts');
  });
});

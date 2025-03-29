// moduleResolver.test.ts
import { ModuleResolutionKind, Project, ScriptTarget } from 'ts-morph';
import {
  resolveModulePath,
  getModuleSourceFile,
  clearModuleCache,
  tsUtils,
  modulePathCache,
  resolvedFilesCache,
} from '../moduleResolver';
import * as path from 'path';
import * as fs from 'fs';

// Setup test directory and files
const TEST_DIR = path.join(__dirname, 'test-module-resolver');

beforeAll(() => {
  if (!fs.existsSync(TEST_DIR)) {
    fs.mkdirSync(TEST_DIR, { recursive: true });
  }

  // Create test files
  fs.writeFileSync(
    path.join(TEST_DIR, 'source.ts'),
    `
    import { func } from './utils';
    import { theme } from './styles/theme';
    import defaultExport from './constants';

    const x = func();
  `,
  );

  fs.writeFileSync(
    path.join(TEST_DIR, 'utils.ts'),
    `
    export const func = () => 'test';
  `,
  );

  fs.mkdirSync(path.join(TEST_DIR, 'styles'), { recursive: true });
  fs.writeFileSync(
    path.join(TEST_DIR, 'styles/theme.ts'),
    `
    export const theme = {
      primary: 'tokens.colors.primary',
      secondary: 'tokens.colors.secondary'
    };
  `,
  );

  fs.writeFileSync(
    path.join(TEST_DIR, 'constants.ts'),
    `
    export default 'tokens.default.value';
  `,
  );

  // Create a file with extension in the import
  fs.writeFileSync(
    path.join(TEST_DIR, 'with-extension.ts'),
    `
    import { func } from './utils.ts';
  `,
  );
});

afterAll(() => {
  if (fs.existsSync(TEST_DIR)) {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
  }
});

describe('Module resolver functions', () => {
  let project: Project;

  beforeEach(() => {
    // Create a fresh project for each test
    project = new Project({
      compilerOptions: {
        target: ScriptTarget.ES2020,
        moduleResolution: ModuleResolutionKind.NodeNext,
      },
    });

    // Clear caches
    clearModuleCache();
  });

  describe('resolveModulePath', () => {
    test('resolves relative path correctly', () => {
      const sourceFilePath = path.join(TEST_DIR, 'source.ts');
      const result = resolveModulePath(project, './utils', sourceFilePath);

      expect(result).not.toBeNull();
      expect(result).toEqual(path.join(TEST_DIR, 'utils.ts'));
    });

    test('resolves nested relative path correctly', () => {
      const sourceFilePath = path.join(TEST_DIR, 'source.ts');
      const result = resolveModulePath(project, './styles/theme', sourceFilePath);

      expect(result).not.toBeNull();
      expect(result).toEqual(path.join(TEST_DIR, 'styles/theme.ts'));
    });

    test('resolves path with file extension', () => {
      const sourceFilePath = path.join(TEST_DIR, 'with-extension.ts');
      const result = resolveModulePath(project, './utils.ts', sourceFilePath);

      expect(result).not.toBeNull();
      expect(result).toEqual(path.join(TEST_DIR, 'utils.ts'));
    });

    test('returns null for non-existent module', () => {
      const sourceFilePath = path.join(TEST_DIR, 'source.ts');
      const result = resolveModulePath(project, './non-existent', sourceFilePath);

      expect(result).toBeNull();
    });

    test('caches resolution results', () => {
      const sourceFilePath = path.join(TEST_DIR, 'source.ts');

      // First call should resolve
      const firstResult = resolveModulePath(project, './utils', sourceFilePath);
      expect(firstResult).not.toBeNull();

      // Mock the TS resolution to verify cache is used
      const originalResolve = tsUtils.resolveModuleName;
      tsUtils.resolveModuleName = jest.fn().mockImplementation(() => {
        throw new Error('Should not be called if cache is working');
      });

      // Second call should use cache
      const secondResult = resolveModulePath(project, './utils', sourceFilePath);
      expect(secondResult).toEqual(firstResult);

      // Restore original function
      tsUtils.resolveModuleName = originalResolve;
    });
  });

  describe('getModuleSourceFile', () => {
    test('returns source file for valid module', () => {
      const sourceFilePath = path.join(TEST_DIR, 'source.ts');
      project.addSourceFileAtPath(sourceFilePath);

      const result = getModuleSourceFile(project, './utils', sourceFilePath);

      expect(result).not.toBeNull();
      expect(result?.getFilePath()).toEqual(path.join(TEST_DIR, 'utils.ts'));
    });

    test('caches source files', () => {
      const sourceFilePath = path.join(TEST_DIR, 'source.ts');
      project.addSourceFileAtPath(sourceFilePath);

      // First call
      const firstResult = getModuleSourceFile(project, './utils', sourceFilePath);
      expect(firstResult).not.toBeNull();

      // Mock project.addSourceFileAtPath to verify cache is used
      const originalAddSourceFile = project.addSourceFileAtPath;
      project.addSourceFileAtPath = jest.fn().mockImplementation(() => {
        throw new Error('Should not be called if cache is working');
      });

      // Second call should use cache
      const secondResult = getModuleSourceFile(project, './utils', sourceFilePath);
      expect(secondResult).toBe(firstResult); // Same instance

      // Restore original function
      project.addSourceFileAtPath = originalAddSourceFile;
    });

    test('returns null for non-existent module', () => {
      const sourceFilePath = path.join(TEST_DIR, 'source.ts');
      project.addSourceFileAtPath(sourceFilePath);

      const result = getModuleSourceFile(project, './non-existent', sourceFilePath);
      expect(result).toBeNull();
    });
  });

  test('clearModuleCache clears both caches', () => {
    const sourceFilePath = path.join(TEST_DIR, 'source.ts');
    project.addSourceFileAtPath(sourceFilePath);

    // Fill the caches
    getModuleSourceFile(project, './utils', sourceFilePath);
    getModuleSourceFile(project, './styles/theme', sourceFilePath);

    // Verify caches were filled
    expect(modulePathCache.size).toBeGreaterThan(0);
    expect(resolvedFilesCache.size).toBeGreaterThan(0);

    // Clear caches
    clearModuleCache();

    // Directly verify caches are empty
    expect(modulePathCache.size).toBe(0);
    expect(resolvedFilesCache.size).toBe(0);
  });
});

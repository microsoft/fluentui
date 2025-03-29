// packageImports.test.ts
import { Project, ModuleResolutionKind, ScriptTarget } from 'ts-morph';
import { resolveModulePath, clearModuleCache, tsUtils } from '../moduleResolver';
import * as path from 'path';
import * as fs from 'fs';

// Setup test directory and mock node_modules structure
const TEST_DIR = path.join(__dirname, 'test-package-imports');
const NODE_MODULES = path.join(TEST_DIR, 'node_modules');
const SCOPED_PACKAGE = path.join(NODE_MODULES, '@scope', 'package');
const REGULAR_PACKAGE = path.join(NODE_MODULES, 'some-package');

beforeAll(() => {
  // Create test directories
  if (!fs.existsSync(TEST_DIR)) {
    fs.mkdirSync(TEST_DIR, { recursive: true });
  }
  if (!fs.existsSync(SCOPED_PACKAGE)) {
    fs.mkdirSync(SCOPED_PACKAGE, { recursive: true });
  }
  if (!fs.existsSync(REGULAR_PACKAGE)) {
    fs.mkdirSync(REGULAR_PACKAGE, { recursive: true });
  }

  // Create a source file that imports from packages
  fs.writeFileSync(
    path.join(TEST_DIR, 'source.ts'),
    `
    import { Component } from '@scope/package';
    import { helper } from 'some-package';
    `,
  );

  // Create package.json and index files for the scoped package
  fs.writeFileSync(
    path.join(SCOPED_PACKAGE, 'package.json'),
    JSON.stringify({
      name: '@scope/package',
      version: '1.0.0',
      main: 'index.js',
    }),
  );
  fs.writeFileSync(
    path.join(SCOPED_PACKAGE, 'index.js'),
    `
    export const Component = {
      theme: 'tokens.components.primary'
    };
    `,
  );

  // Create package.json and index files for the regular package
  fs.writeFileSync(
    path.join(REGULAR_PACKAGE, 'package.json'),
    JSON.stringify({
      name: 'some-package',
      version: '1.0.0',
      main: './lib/index.js',
    }),
  );

  // Create lib directory in the regular package
  fs.mkdirSync(path.join(REGULAR_PACKAGE, 'lib'), { recursive: true });

  fs.writeFileSync(
    path.join(REGULAR_PACKAGE, 'lib', 'index.js'),
    `
    export const helper = 'tokens.helpers.main';
    `,
  );
});

afterAll(() => {
  if (fs.existsSync(TEST_DIR)) {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
  }
});

describe('Package imports resolution', () => {
  let project: Project;
  let originalResolve: any;
  let originalFileExists: any;

  beforeEach(() => {
    project = new Project({
      compilerOptions: {
        target: ScriptTarget.ES2020,
        moduleResolution: ModuleResolutionKind.NodeNext,
      },
    });

    // Setup workspace
    project.addSourceFileAtPath(path.join(TEST_DIR, 'source.ts'));

    // Clear caches
    clearModuleCache();

    // Store original functions
    originalResolve = tsUtils.resolveModuleName;
    originalFileExists = tsUtils.fileExists;

    // Mock fileExists to handle our mock node_modules
    tsUtils.fileExists = jest.fn().mockImplementation((filePath: string) => {
      return fs.existsSync(filePath);
    });
  });

  afterEach(() => {
    // Restore original functions
    tsUtils.resolveModuleName = originalResolve;
    tsUtils.fileExists = originalFileExists;
  });

  test('resolves scoped package imports correctly', () => {
    const sourceFilePath = path.join(TEST_DIR, 'source.ts');

    // Mock the TypeScript resolution for scoped packages
    tsUtils.resolveModuleName = jest
      .fn()
      .mockImplementation((moduleName: string, containingFile: string, compilerOptions: any, host: any) => {
        if (moduleName === '@scope/package') {
          return {
            resolvedModule: {
              resolvedFileName: path.join(SCOPED_PACKAGE, 'index.js'),
              extension: '.js',
              isExternalLibraryImport: true,
            },
          };
        }
        // Call original for other cases
        return originalResolve(moduleName, containingFile, compilerOptions, host);
      });

    const result = resolveModulePath(project, '@scope/package', sourceFilePath);

    expect(result).not.toBeNull();
    expect(result).toEqual(path.join(SCOPED_PACKAGE, 'index.js'));
    expect(tsUtils.resolveModuleName).toHaveBeenCalled();
  });

  test('resolves regular package imports with non-standard main path', () => {
    const sourceFilePath = path.join(TEST_DIR, 'source.ts');

    // Mock the TypeScript resolution for regular packages
    tsUtils.resolveModuleName = jest
      .fn()
      .mockImplementation((moduleName: string, containingFile: string, compilerOptions: any, host: any) => {
        if (moduleName === 'some-package') {
          return {
            resolvedModule: {
              resolvedFileName: path.join(REGULAR_PACKAGE, 'lib', 'index.js'),
              extension: '.js',
              isExternalLibraryImport: true,
            },
          };
        }
        // Call original for other cases
        return originalResolve(moduleName, containingFile, compilerOptions, host);
      });

    const result = resolveModulePath(project, 'some-package', sourceFilePath);

    expect(result).not.toBeNull();
    expect(result).toEqual(path.join(REGULAR_PACKAGE, 'lib', 'index.js'));
    expect(tsUtils.resolveModuleName).toHaveBeenCalled();
  });

  test('returns null for non-existent packages', () => {
    const sourceFilePath = path.join(TEST_DIR, 'source.ts');

    // Mock the TypeScript resolution to return null for non-existent packages
    tsUtils.resolveModuleName = jest
      .fn()
      .mockImplementation((moduleName: string, containingFile: string, compilerOptions: any, host: any) => {
        if (moduleName === 'non-existent-package') {
          return { resolvedModule: undefined };
        }
        // Call original for other cases
        return originalResolve(moduleName, containingFile, compilerOptions, host);
      });

    const result = resolveModulePath(project, 'non-existent-package', sourceFilePath);

    expect(result).toBeNull();
    expect(tsUtils.resolveModuleName).toHaveBeenCalled();
  });
});

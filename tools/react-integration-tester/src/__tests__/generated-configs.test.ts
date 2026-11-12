import * as ejs from 'ejs';
import { readFileSync } from 'node:fs';
import { join, posix, win32 } from 'node:path';
import { runInNewContext } from 'node:vm';
import { spawnSync } from 'node:child_process';
import { transformSync } from '@swc/core';
import type { SnapshotResolver } from 'jest-snapshot';

function render(name: string, data: Record<string, unknown>) {
  const filename = join(__dirname, '../files', `${name}.template`);
  return ejs.render(readFileSync(filename, 'utf-8'), data, { filename });
}

function getCypressImportSpecifier(data: Record<string, unknown>): string {
  const source = render('cypress.config.ts', data);
  const match = source.match(/^import baseConfig from (.+);$/m);
  if (!match) {
    throw new Error('Generated Cypress config is missing its base config import');
  }
  return JSON.parse(match[1]);
}

describe.each([
  { name: 'Windows', path: win32, root: 'C:\\workspace "quoted" & <tag>\\project' },
  { name: 'POSIX', path: posix, root: '/workspace "quoted" & <tag>/project' },
])('generated config execution on $name', ({ path, root }) => {
  const configDir = path.join(root, 'tmp', 'rit', 'react-18', 'prepared');
  const originRoot = path.join(root, 'origin\' "quoted"', 'back\\slash');
  const relativePathToProjectRoot = path.relative(configDir, originRoot);
  const relativePathToWorkspaceRoot = path.relative(configDir, root);
  const usedNodeModulesDirRelative = path.join('..', 'deps\' "quoted"', 'back\\slash');
  const templateData = {
    relativePathToProjectRoot,
    relativePathToWorkspaceRoot,
    usedNodeModulesDirRelative,
    react: 18,
    jest: { pathToProjectConfig: 'jest.config.js' },
    cypress: { pathToProjectConfig: 'cypress.config.ts', pathSeparator: path.sep },
  };

  it('loads the Jest config with exact runtime paths and aliases', () => {
    const aliases = { '^@scope/package$': path.join(root, 'src', 'index.ts') };
    const pathsToModuleNameMapper = jest.fn(() => aliases);
    const baseConfig = { preset: 'origin-preset', setupFilesAfterEnv: ['origin-setup.js'] };
    const workspacePreset = { testEnvironment: 'node', transform: {}, moduleNameMapper: {} };
    const files = new Map<string, unknown>([
      [path.join(root, 'jest.preset'), workspacePreset],
      [path.join(originRoot, 'jest.config.js'), baseConfig],
      [path.join(root, 'tsconfig.base.json'), { compilerOptions: { paths: { '@scope/package': ['src/index.ts'] } } }],
    ]);
    const requireModule = jest.fn((id: string) => {
      if (id === 'node:path') {
        return path;
      }
      if (id === 'ts-jest') {
        return { pathsToModuleNameMapper };
      }
      const filename = path.resolve(configDir, id);
      if (!files.has(filename)) {
        throw new Error(`Unexpected generated require: ${filename}`);
      }
      return files.get(filename);
    });
    const config = runInNewContext(`${render('jest.config.js', templateData)}\nmodule.exports;`, {
      __dirname: configDir,
      module: { exports: {} },
      require: requireModule,
      process: { env: {} },
    });
    const dependencies = path.join(configDir, usedNodeModulesDirRelative, 'node_modules');
    expect(config).toMatchObject({
      rootDir: relativePathToProjectRoot,
      preset: null,
      testEnvironment: 'node',
      coverageDirectory: path.join(configDir, 'coverage'),
      snapshotResolver: path.join(configDir, 'jest.snapshot-resolver.js'),
      modulePathIgnorePatterns: ['\\.snap$'],
      setupFilesAfterEnv: ['origin-setup.js', path.join(configDir, 'jest.mock-snapshots.js')],
      moduleNameMapper: {
        ...aliases,
        '^react$': path.join(dependencies, 'react'),
        '^react/jsx-runtime$': path.join(dependencies, 'react/jsx-runtime'),
        '^react-dom$': path.join(dependencies, 'react-dom'),
      },
    });
    expect(pathsToModuleNameMapper).toHaveBeenCalledWith(
      { '@scope/package': ['src/index.ts'] },
      { prefix: root + path.sep },
    );
  });

  it('loads the snapshot resolver and preserves the origin path in a round trip', () => {
    const resolver: SnapshotResolver = runInNewContext(
      `${render('jest.snapshot-resolver.js', templateData)}\nmodule.exports;`,
      { __dirname: configDir, module: { exports: {} }, require: () => path },
    );
    const testPath = path.join(originRoot, 'src', 'quoted\' "test".test.js');
    const snapshotPath = resolver.resolveSnapshotPath(testPath, '.snap');
    expect(snapshotPath).toBe(path.join(configDir, 'snapshots', 'src', 'quoted\' "test".test.js.snap'));
    expect(resolver.resolveTestPath(snapshotPath, '.snap')).toBe(testPath);
    expect(resolver.testPathForConsistencyCheck).toBe(path.join(originRoot, 'src', 'example.test.js'));
  });

  it('compiles and loads the Cypress config with exact runtime paths', () => {
    const baseConfig = {
      component: { devServer: { webpackConfig: { resolve: { alias: { existing: 'keep' } } } } },
    };
    const output = transformSync(render('cypress.config.ts', templateData), {
      jsc: { parser: { syntax: 'typescript' }, target: 'es2020' },
      module: { type: 'commonjs' },
      swcrc: false,
      configFile: false,
    });
    const exports: { default?: unknown } = {};
    const config = runInNewContext(`${output.code}\nmodule.exports.default;`, {
      module: { exports },
      exports,
      process: { cwd: () => configDir },
      require: (id: string) => {
        if (id === 'node:path') {
          return {
            ...path,
            resolve: (...segments: string[]) => path.resolve(configDir, ...segments),
          };
        }
        expect(path.resolve(configDir, id)).toBe(path.join(originRoot, 'cypress.config.ts'));
        return baseConfig;
      },
    });
    const dependencies = path.join(configDir, usedNodeModulesDirRelative, 'node_modules');
    expect(config).toEqual({
      component: {
        specPattern: [path.resolve(configDir, `${relativePathToProjectRoot}/**/src/**/*.{cy,e2e}.{tsx,ts}`)],
        devServer: {
          webpackConfig: {
            resolve: {
              alias: {
                existing: 'keep',
                '@cypress/react': path.join(dependencies, '@cypress/react'),
                '@types/react': path.join(dependencies, '@types/react'),
                '@types/react-dom': path.join(dependencies, '@types/react-dom'),
                react: path.join(dependencies, 'react'),
                'react-dom': path.join(dependencies, 'react-dom'),
              },
            },
          },
        },
      },
    });
  });

  it('renders the Cypress tsconfig as valid JSON without changing glob strings', () => {
    expect(JSON.parse(render('tsconfig.cy.json', templateData))).toEqual({
      include: [`${relativePathToProjectRoot}/**/*.cy.ts`, `${relativePathToProjectRoot}/**/*.cy.tsx`],
    });
  });
});

describe.each([
  {
    name: 'Windows',
    path: win32,
    root: 'C:\\workspace',
    configUrl: 'file:///C:/workspace/tmp/rit/react-18/prepared/cypress.config.ts',
    originUrl: 'file:///C:/workspace/origin/',
  },
  {
    name: 'POSIX',
    path: posix,
    root: '/workspace',
    // Node resolves file URLs using host rules, even when the import uses POSIX paths.
    configUrl:
      process.platform === 'win32'
        ? 'file:///C:/workspace/tmp/rit/react-18/prepared/cypress.config.ts'
        : 'file:///workspace/tmp/rit/react-18/prepared/cypress.config.ts',
    originUrl: process.platform === 'win32' ? 'file:///C:/workspace/origin/' : 'file:///workspace/origin/',
  },
])('Cypress native ESM resolution for $name paths', ({ path, root, configUrl, originUrl }) => {
  it.each([
    { configPath: 'cypress.config.ts', expectedPath: 'cypress.config.ts' },
    { configPath: path.join('config', 'cypress.config.ts'), expectedPath: 'config/cypress.config.ts' },
  ])('resolves the generated import for $configPath', ({ configPath, expectedPath }) => {
    const configDir = path.join(root, 'tmp', 'rit', 'react-18', 'prepared');
    const specifier = getCypressImportSpecifier({
      relativePathToProjectRoot: path.relative(configDir, path.join(root, 'origin')),
      usedNodeModulesDirRelative: '..',
      cypress: { pathToProjectConfig: configPath, pathSeparator: path.sep },
    });
    const result = spawnSync(
      process.execPath,
      [
        '--input-type=module',
        '--experimental-import-meta-resolve',
        '-e',
        'console.log(import.meta.resolve(process.argv[1], process.argv[2]));',
        specifier,
        configUrl,
      ],
      { encoding: 'utf8', timeout: 10000 },
    );

    expect(result.error).toBeUndefined();
    expect(result.stderr).toBe('');
    expect(result.status).toBe(0);
    expect(result.stdout.trim()).toBe(`${originUrl}${expectedPath}`);
  });
});

it('preserves literal backslashes in POSIX Cypress import filenames', () => {
  expect(
    getCypressImportSpecifier({
      relativePathToProjectRoot: '../origin/back\\slash',
      usedNodeModulesDirRelative: '..',
      cypress: { pathToProjectConfig: 'config\\name/cypress.config.ts', pathSeparator: posix.sep },
    }),
  ).toBe('../origin/back\\slash/config\\name/cypress.config.ts');
});

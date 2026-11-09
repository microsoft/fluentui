import { TempFs } from './fixtures/temp-fs';
import { join, relative, resolve, sep } from 'node:path';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const launcherPath = resolve(__dirname, '../../bin/rit.js');
const preloadPath = resolve(__dirname, './fixtures/preload.js');

function runCLI(command: string, options: { cwd: string; env?: NodeJS.ProcessEnv }) {
  const args = command.split(' ');
  const { cwd, env } = options;
  const result = spawnSync('node', ['-r', preloadPath, launcherPath, ...args], {
    cwd,
    env: { ...process.env, ...env },
    encoding: 'utf8',
    timeout: 20000,
  });
  return result;
}

function getLog(logPath: string): Array<{ command: string; cwd: string }> {
  return existsSync(logPath)
    ? readFileSync(logPath, 'utf8')
        .trim()
        .split('\n')
        .map(l => JSON.parse(l))
    : [];
}

function readJSON(filePath: string): Record<string, string> {
  return JSON.parse(readFile(filePath));
}
function readFile(filePath: string): string {
  return readFileSync(filePath, 'utf8');
}

// Executable renderer tests check path values; these markers keep source snapshots path-independent.
function templateSourceSnapshot(source: string, paths: Record<string, string>) {
  return Object.entries(paths).reduce(
    (result, [name, value]) => result.split(JSON.stringify(value)).join(`<${name}>`),
    source,
  );
}

/**
 * Create a minimal origin project in the given directory.
 * Options allow toggling common setups detected by the tool.
 */
function createProject(
  rootDir: string,
  options?: {
    packageName?: string;
    tsInclude?: string[];
    withTs?: boolean;
    withJest?: boolean;
    withCypress?: boolean;
  },
) {
  const pkgName = options?.packageName ?? '@scope/proj';
  const include = options?.tsInclude ?? ['src/index.ts'];
  if (!existsSync(rootDir)) {
    mkdirSync(rootDir, { recursive: true });
  }
  writeFileSync(join(rootDir, 'package.json'), JSON.stringify({ name: pkgName }));

  if (options?.withTs) {
    writeFileSync(join(rootDir, 'tsconfig.lib.json'), JSON.stringify({ include }));
  }
  if (options?.withJest) {
    writeFileSync(join(rootDir, 'jest.config.js'), 'module.exports = {};');
  }
  if (options?.withCypress) {
    writeFileSync(join(rootDir, 'cypress.config.ts'), 'export default {};');
  }
}

describe('rit CLI e2e', () => {
  let fs: TempFs;

  afterEach(() => {
    if (fs) {
      fs.cleanup();
      // @ts-expect-error reset
      fs = undefined;
    }
  });

  test('one-shot mode install react <version> deps, runs command and cleanups project', () => {
    fs = new TempFs('rit-one-shot');
    const projectRoot = join(fs.tempDir, 'proj');
    createProject(projectRoot, { withJest: true });

    const cmdLog = join(fs.tempDir, 'cmd-log.json');
    const res = runCLI('--react 18 --run test', {
      cwd: projectRoot,
      env: {
        RIT_MOCK_GIT_ROOT: fs.tempDir,
        RIT_CMD_LOG: cmdLog,
      },
    });

    expect(res.status).toBe(0);

    const log = getLog(cmdLog);
    expect(log.length).toEqual(2);

    const [installDeps, runCmd] = log;

    expect(installDeps.command).toContain('yarn install');
    expect(installDeps.cwd).toBe(join(fs.tempDir, 'tmp', 'rit', 'react-18'));

    expect(runCmd.command).toContain('jest --passWithNoTests');
    expect(runCmd.cwd).toEqual(expect.stringContaining(join(fs.tempDir, 'tmp/rit/react-18/proj-react-18')));

    // no project folder exists as it was cleanuped
    expect(readdirSync(join(fs.tempDir, 'tmp/rit/react-18/')).sort()).toEqual([
      '.yarnrc.yml',
      'package.json',
      'yarn.lock',
    ]);
  });

  test('--install-deps installs into react root (no project scaffolding)', () => {
    fs = new TempFs('rit-e2e-install-deps');
    const projectRoot = join(fs.tempDir, 'proj');
    // minimal origin project to satisfy parseArgs and setup checks if any
    createProject(projectRoot);

    const cmdLog = join(fs.tempDir, 'cmd-log.json');
    // Debug: ensure the child process returns
    const res = runCLI('--react 18 --install-deps', {
      // with --install-deps we can run it anywhere
      cwd: fs.tempDir,
      env: {
        RIT_MOCK_GIT_ROOT: fs.tempDir,
        RIT_CMD_LOG: cmdLog,
      },
    });

    expect(res.status).toBe(0);

    // Verify yarn install command was attempted under react root via our log
    const log = getLog(cmdLog);
    const yarn = log.find(l => String(l.command).includes('yarn install'));
    expect(yarn).toBeTruthy();
    expect(yarn?.cwd).toBe(join(fs.tempDir, 'tmp', 'rit', 'react-18'));

    expect(readJSON(join(fs.tempDir, 'tmp/rit/react-18/package.json'))).toMatchInlineSnapshot(`
      Object {
        "dependencies": Object {
          "@cypress/react": "9.0.1",
          "@testing-library/dom": "^10.1.0",
          "@testing-library/jest-dom": "^5.16.5",
          "@testing-library/react": "^16.0.0",
          "@types/react": "18.3.20",
          "@types/react-dom": "18.3.6",
          "@types/react-test-renderer": "18.3.1",
          "cypress": "14.4.1",
          "cypress-real-events": "1.14.0",
          "jest": "30.2.0",
          "react": "18.3.1",
          "react-dom": "18.3.1",
          "react-test-renderer": "18.3.1",
          "tslib": "^2.8.0",
          "typescript": "5.7.3",
        },
        "dependenciesMeta": Object {
          "cypress": Object {
            "built": true,
          },
        },
        "license": "UNLICENSED",
        "name": "@rit/react-18-root",
        "private": true,
        "version": "0.0.0",
      }
    `);
  });

  test('--prepare-only --project-id generates project and keeps project, installs dependencies by default', () => {
    fs = new TempFs('rit-e2e-prepare-only');
    const projectRoot = join(fs.tempDir, 'proj');
    createProject(projectRoot, { withJest: true, withCypress: true, withTs: true });

    const cmdLog = join(fs.tempDir, 'cmd-log.json');
    const res = runCLI('--react 18 --prepare-only --project-id ci', {
      cwd: projectRoot,
      env: {
        RIT_MOCK_GIT_ROOT: fs.tempDir,
        RIT_CMD_LOG: cmdLog,
      },
    });

    expect(res.status).toBe(0);
    // Only dependency installation should be logged in prepare-only
    const entries = getLog(cmdLog);
    expect(entries.length).toBeGreaterThanOrEqual(1);
    expect(entries.every(e => String(e.command).includes('yarn install'))).toBe(true);
    expect(entries.every(e => e.cwd === join(fs.tempDir, 'tmp', 'rit', 'react-18'))).toBe(true);

    const ritProjectPath = join(fs.tempDir, 'tmp/rit/react-18/proj-react-18-ci');
    // tsconfig should exist in prepared project
    const { extends: tsconfigExtends, ...tsconfig } = JSON.parse(readFile(join(ritProjectPath, 'tsconfig.json')));
    expect(resolve(ritProjectPath, tsconfigExtends)).toBe(join(projectRoot, 'tsconfig.lib.json'));
    const projectRelativePath = join('..', '..', '..', '..', 'proj');
    expect(tsconfig).toEqual({
      compilerOptions: {
        baseUrl: '.',
        isolatedModules: true,
        jsx: 'react',
        lib: ['ES2019', 'DOM'],
        module: 'esnext',
        moduleResolution: 'node',
        noEmit: true,
        paths: {
          react: ['../node_modules/@types/react/index.d.ts'],
          'react-dom': ['../node_modules/@types/react-dom/index.d.ts'],
          'react/jsx-runtime': ['../node_modules/@types/react/jsx-runtime.d.ts'],
        },
        pretty: true,
        skipLibCheck: true,
        strict: true,
        target: 'ES2019',
        typeRoots: ['../node_modules/@types'],
        types: [],
      },
      exclude: [
        '**/index.stories.tsx',
        '**/index.stories.ts',
        '**/*.spec.tsx',
        '**/*.test.tsx',
        '**/src/testing/**',
        '**/*.cy.tsx',
        '**/*.cy.tsx',
      ].map(pattern => join(projectRelativePath, pattern)),
      files: [join('..', '..', '..', '..', 'typings', 'static-assets', 'index.d.ts')],
      include: [join(projectRelativePath, 'src', 'index.ts')],
      references: [],
    });

    // and jest config since origin had jest setup
    const jestConfigContent = readFile(join(ritProjectPath, 'jest.config.js'));
    const relativeWorkspaceRoot = relative(ritProjectPath, fs.tempDir);
    const relativeProjectRoot = relative(ritProjectPath, projectRoot);
    expect(jestConfigContent).toContain(
      `const workspacePreset = require(${JSON.stringify(`${relativeWorkspaceRoot}/jest.preset`)})`,
    );
    expect(jestConfigContent).toContain(
      `const baseConfig = require(${JSON.stringify(`${relativeProjectRoot}/jest.config.js`)})`,
    );
    expect(jestConfigContent).toContain('module.exports = config');
    // check whole template
    expect(
      templateSourceSnapshot(jestConfigContent, {
        workspacePresetPath: `${relativeWorkspaceRoot}/jest.preset`,
        originConfigPath: `${relativeProjectRoot}/jest.config.js`,
        nodeModulesRelativePath: '..',
        originRootPath: relativeProjectRoot,
        workspaceRootPath: relativeWorkspaceRoot,
      }),
    ).toMatchInlineSnapshot(`
      "// @ts-check
      /* eslint-disable */

      const { join, sep } = require('node:path');
      const { pathsToModuleNameMapper } = require('ts-jest');

      const workspacePreset = require(<workspacePresetPath>);
      const baseConfig = require(<originConfigPath>);

      // Resolve dependencies from the shared react-version root folder (injected by CLI)
      const usedNodeModulesPath = join(__dirname, <nodeModulesRelativePath>, 'node_modules');

      /**
       * @type {import('@jest/types').Config.InitialOptions}
       */
      const ritConfig = {
        rootDir: <originRootPath>,
        preset: null,
        moduleNameMapper: {
          '^react$': join(usedNodeModulesPath, './react'),
          '^react/jsx-runtime$': join(usedNodeModulesPath, 'react/jsx-runtime'),
          '^react-dom$': join(usedNodeModulesPath, './react-dom'),
          '^react-dom/(.+)$': join(usedNodeModulesPath, 'react-dom/$1'),
          '^react-test-renderer$': join(usedNodeModulesPath, './react-test-renderer'),
          '^@testing-library/(react|dom)$': join(usedNodeModulesPath, './@testing-library/$1'),
          '^@testing-library/react-hooks$': join(usedNodeModulesPath, './@testing-library/react/'),
        },
        setupFilesAfterEnv: [
          join(__dirname, './jest.mock-snapshots.js'),
        ],
        // Origin \`rootDir\` is shared by concurrent runs for every React version, so keep run artifacts scaffold-local
        coverageDirectory: join(__dirname, 'coverage'),
        ...getSnapshotIsolationConfig(),
      }

      const repoProjectConfig = createOriginProjectConfig(baseConfig, workspacePreset);
      const config = merge(repoProjectConfig, ritConfig);

      module.exports = config;

      // helpers

      /**
       * While snapshots are mocked (default), keep Jest away from origin \`__snapshots__\` so \`-u\` never deletes them:
       * - \`snapshotResolver\` stops per-test-file obsolete snapshot removal
       * - ignoring \`.snap\` modules stops the global obsolete snapshot file cleanup
       *
       * @returns {import('@jest/types').Config.InitialOptions}
       */
      function getSnapshotIsolationConfig() {
        if (process.env.RIT_SKIP_SNAPSHOTS === 'false') {
          return {};
        }

        return {
          snapshotResolver: join(__dirname, './jest.snapshot-resolver.js'),
          modulePathIgnorePatterns: ['\\\\\\\\.snap$'],
        };
      }

      /**
       * @param {Record<string,any>} obj1
       * @param {Record<string,any>} obj2
       * @returns
       */
      function merge(obj1, obj2) {
        const merged = Object.assign({}, obj1);

        for (const prop in obj2) {
          const sourceValue = obj2[prop];
          const targetValue = obj1[prop];

          if (sourceValue && Array.isArray(sourceValue) && targetValue && Array.isArray(targetValue)) {
            merged[prop] = targetValue.concat(sourceValue);
          } else if (typeof targetValue === 'object' && typeof sourceValue === 'object') {
            merged[prop] = merge(targetValue, sourceValue);
          } else {
            merged[prop] = sourceValue;
          }
        }

        return merged;
      }

      function getTsPathAliases(){
        // Compute absolute workspace root from this config file location
        const workspaceRoot = join(__dirname, <workspaceRootPath>);
        const tsConfigBase = require(join(workspaceRoot, 'tsconfig.base.json'));

        // Ensure prefix ends with a path separator so mapped paths concatenate correctly
        const prefix = workspaceRoot.endsWith(sep) ? workspaceRoot : workspaceRoot + sep;

        const tsPathAliases = pathsToModuleNameMapper(tsConfigBase.compilerOptions.paths, {
          prefix,
        });

        return tsPathAliases;
      }

      /**
       * @param {import('@jest/types').Config.InitialOptions} config - project origin provided config
       * @param {import('@jest/types').Config.InitialOptions} workspaceConfig - workspace preset config
       */
      function createOriginProjectConfig(config, workspaceConfig) {
        // no preset property, we will use configuration as is
        if (!config.preset) {
          return config;
        }

        // remove preset config
        const { preset, ...normalizedBaseConfig } = config;
        // remove moduleNameMapper, transform
        const { moduleNameMapper, transform, ...normalizedWorkspacePreset } = workspaceConfig;

        /** @type {import('@jest/types').Config.InitialOptions} */
        const remappedTsPathAliases = {
          moduleNameMapper: { ...getTsPathAliases() },
        };
        let repoProjectConfig = merge(normalizedWorkspacePreset, normalizedBaseConfig);
        repoProjectConfig = merge(repoProjectConfig, remappedTsPathAliases);

        return repoProjectConfig;
      }
      "
    `);

    // and cypress config since origin had jest setup
    const cypressConfigPath = join(ritProjectPath, 'cypress.config.ts');
    expect(existsSync(cypressConfigPath)).toBe(true);

    const cyContent = readFile(cypressConfigPath);
    const cypressImportPath = `${relativeProjectRoot}/cypress.config.ts`.split(sep).join('/');
    expect(cyContent).toContain(`import baseConfig from ${JSON.stringify(cypressImportPath)}`);
    // check whole template
    expect(
      templateSourceSnapshot(cyContent, {
        originConfigPath: cypressImportPath,
        nodeModulesRelativePath: '..',
        specPattern: `${relativeProjectRoot}/**/src/**/*.{cy,e2e}.{tsx,ts}`,
      }),
    ).toMatchInlineSnapshot(`
      "import { join, resolve } from 'node:path';
      import baseConfig from <originConfigPath>;

      // Resolve dependencies from the shared react-version root folder (injected by CLI).
      // Cypress executes this config with \`cwd\` set to the prepared project root (where this file lives),
      // so \`process.cwd()\` is equivalent to the config directory and works in both CommonJS and ESM
      // (\`type: module\`) sandboxes — unlike \`__dirname\`, which is undefined under native ESM.
      const usedNodeModulesPath = join(process.cwd(), <nodeModulesRelativePath>, 'node_modules');

      const config = { ...baseConfig };

      const specs = [
        resolve(<specPattern>),
      ];

      config.component.specPattern = specs;
      config.component.devServer.webpackConfig.resolve ??= {};
      config.component.devServer.webpackConfig.resolve.alias = {
        ...config.component.devServer.webpackConfig.resolve.alias,
        '@cypress/react': resolve(usedNodeModulesPath, './@cypress/react'),
        '@types/react': resolve(usedNodeModulesPath, './@types/react'),
        '@types/react-dom': resolve(usedNodeModulesPath, './@types/react-dom'),
        react: resolve(usedNodeModulesPath, './react'),
        'react-dom': resolve(usedNodeModulesPath, './react-dom'),
      };

      export default config;
      "
    `);
  });

  test('--run --project-id reuses prepared project and run commands', () => {
    fs = new TempFs('rit-e2e-reuse-run');
    const projectRoot = join(fs.tempDir, 'proj');
    createProject(projectRoot, { withJest: true });

    const env = { RIT_MOCK_GIT_ROOT: fs.tempDir } as NodeJS.ProcessEnv;

    // Simulate previously installed deps (empty node_modules is enough for guard)
    const reactRoot = join(fs.tempDir, 'tmp/rit/react-18');
    mkdirSync(join(reactRoot, 'node_modules'), { recursive: true });
    writeFileSync(join(reactRoot, 'package.json'), JSON.stringify({}));

    // Step 1: prepare scaffold (no install to keep quick)
    let res = runCLI('--react 18 --prepare-only --project-id ci --no-install', {
      cwd: projectRoot,
      env,
    });
    expect(res.status).toBe(0);

    const cmdLog = join(fs.tempDir, 'cmd-log.json');
    // Step 2: run tests against the prepared scaffold (should execute one command)
    res = runCLI('--react 18 --project-id ci --run test', {
      cwd: projectRoot,
      env: {
        ...env,
        RIT_CMD_LOG: cmdLog,
      },
    });
    expect(res.status).toBe(0);

    const log = getLog(cmdLog);

    // Should have run exactly one script command
    expect(log.length).toEqual(1);
    expect(log[0].command).toEqual(`node ${join('..', 'node_modules', '.bin', 'jest')} --passWithNoTests -u`);
    // The run should target the prepared project path
    expect(log[0].cwd).toBe(join(fs.tempDir, 'tmp', 'rit', 'react-18', 'proj-react-18-ci'));
  });
});

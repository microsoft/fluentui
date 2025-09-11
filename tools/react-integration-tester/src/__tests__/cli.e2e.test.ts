import { TempFs } from './fixtures/temp-fs';
import { join, resolve } from 'node:path';
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

/**
 * Create a minimal origin project in the given directory.
 * Options allow toggling common setups detected by the tool.
 */
function createProject(
  rootDir: string,
  options?: {
    packageName?: string;
    tsInclude?: string[];
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
  writeFileSync(join(rootDir, 'tsconfig.lib.json'), JSON.stringify({ include }));
  if (options?.withJest) {
    writeFileSync(join(rootDir, 'jest.config.js'), 'module.exports = {};');
  }
  if (options?.withCypress) {
    writeFileSync(join(rootDir, 'cypress.config.js'), 'export default {};');
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
    expect(installDeps.cwd.endsWith('tmp/rit/react-18')).toEqual(true);

    expect(runCmd.command).toContain('jest --passWithNoTests');
    expect(runCmd.cwd).toEqual(expect.stringContaining(join(fs.tempDir, 'tmp/rit/react-18/proj-react-18')));

    // no project folder exists as it was cleanuped
    expect(readdirSync(join(fs.tempDir, 'tmp/rit/react-18/'))).toEqual(['package.json']);
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
    expect(yarn?.cwd).toContain('tmp/rit/react-18');

    expect(existsSync(join(fs.tempDir, 'tmp/rit/.yarn-cache'))).toBeTruthy();
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
          "jest": "29.7.0",
          "react": "18.3.1",
          "react-dom": "18.3.1",
          "react-test-renderer": "18.3.1",
          "tslib": "^2.1.0",
          "typescript": "5.3.3",
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
    createProject(projectRoot, { withJest: true, withCypress: true });

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
    expect(entries.every(e => String(e.cwd).includes('tmp/rit/react-18'))).toBe(true);

    const ritProjectPath = join(fs.tempDir, 'tmp/rit/react-18/proj-react-18-ci');
    // tsconfig should exist in prepared project
    expect(readJSON(join(ritProjectPath, 'tsconfig.json'))).toMatchInlineSnapshot(`
      Object {
        "compilerOptions": Object {
          "baseUrl": ".",
          "isolatedModules": true,
          "jsx": "react",
          "lib": Array [
            "ES2019",
            "DOM",
          ],
          "module": "esnext",
          "moduleResolution": "node",
          "noEmit": true,
          "paths": Object {
            "react": Array [
              "../node_modules/@types/react/index.d.ts",
            ],
            "react-dom": Array [
              "../node_modules/@types/react-dom/index.d.ts",
            ],
            "react/jsx-runtime": Array [
              "../node_modules/@types/react/jsx-runtime.d.ts",
            ],
          },
          "pretty": true,
          "skipLibCheck": true,
          "strict": true,
          "target": "ES2019",
          "typeRoots": Array [
            "../node_modules/@types",
          ],
          "types": Array [],
        },
        "exclude": Array [
          "../../../../proj/**/index.stories.tsx",
          "../../../../proj/**/index.stories.ts",
          "../../../../proj/**/*.spec.tsx",
          "../../../../proj/**/*.test.tsx",
          "../../../../proj/**/src/testing/**",
        ],
        "extends": "../../../../proj/tsconfig.lib.json",
        "files": Array [
          "../../../../typings/static-assets/index.d.ts",
        ],
        "include": Array [
          "../../../../proj/src/index.ts",
        ],
        "references": Array [],
      }
    `);
    // and jest config since origin had jest setup
    expect(readFile(join(ritProjectPath, 'jest.config.js'))).toMatchInlineSnapshot(`
      "// @ts-check
      /* eslint-disable */

      const { join, sep } = require('node:path');
      const { pathsToModuleNameMapper } = require('ts-jest');

      const workspacePreset = require('../../../../jest.preset');
      const baseConfig = require('../../../../proj/jest.config');

      const {moduleNameMapper, transform, ...normalizedWorkspacePreset} = workspacePreset;
      const {preset, ...normalizedBaseConfig} = baseConfig;

      // Resolve dependencies from the shared react-version root folder (injected by CLI)
      const usedNodeModulesPath = join(__dirname, '..', 'node_modules');

      /**
       * @type {import('@jest/types').Config.InitialOptions}
       */
      const ritConfig = {
        rootDir: '../../../../proj',
        preset: null,
        moduleNameMapper: {
          ...getTsPathAliases(),
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
      }

      const repoProjectConfig = merge(normalizedWorkspacePreset, normalizedBaseConfig)
      const config = merge(repoProjectConfig, ritConfig);

      module.exports = config;

      // helpers

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
        const workspaceRoot = join(__dirname, '../../../..');
        const tsConfigBase = require(join(workspaceRoot, 'tsconfig.base.json'));

        // Ensure prefix ends with a path separator so mapped paths concatenate correctly
        const prefix = workspaceRoot.endsWith(sep) ? workspaceRoot : workspaceRoot + sep;

        const tsPathAliases = pathsToModuleNameMapper(tsConfigBase.compilerOptions.paths, {
          prefix,
        });

        return tsPathAliases;
      }
      "
    `);

    expect(readFile(join(ritProjectPath, 'cypress.config.ts'))).toMatchInlineSnapshot(`
      "import { join, resolve } from 'node:path';
      import baseConfig from '../../../../proj/cypress.config';

      // Resolve dependencies from the shared react-version root folder (injected by CLI)
      const usedNodeModulesPath = join(__dirname, '..', 'node_modules');

      const config = { ...baseConfig };

      const specs = [resolve('../../../../proj/**/src/**/*.cy.{tsx,ts}')];

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
    expect(log[0].command).toEqual('node ../node_modules/.bin/jest --passWithNoTests -u');
    // The run should target the prepared project path
    expect(log[0].cwd).toContain('tmp/rit/react-18/proj-react-18-ci');
  });
});

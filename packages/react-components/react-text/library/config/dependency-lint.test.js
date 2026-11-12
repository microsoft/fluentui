/** @jest-environment node */

const { Linter } = require('eslint');
const importPlugin = require('eslint-plugin-import');
const { readCachedProjectGraph, workspaceRoot } = require('@nx/devkit');
const { readFileMapCache } = require('nx/src/project-graph/nx-deps-cache');
const { createProjectRootMappings } = require('nx/src/project-graph/utils/find-project-for-path');
const { join, relative } = require('node:path');
const { mkdtempSync, writeFileSync, mkdirSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { spawnSync } = require('node:child_process');

const config = require('./eslint.config.cjs');
const manifest = require('../package.json');
const projectRoot = 'packages/react-components/react-text/library';

describe('dependency lint pilot', () => {
  const graphGlobals = ['projectGraph', 'projectFileMap', 'projectRootMappings', 'targetProjectLocator'];
  let originalGlobals;
  let graph;
  let fileMap;

  beforeEach(() => {
    originalGlobals = Object.fromEntries(graphGlobals.map(key => [key, globalThis[key]]));
    graph = JSON.parse(JSON.stringify(readCachedProjectGraph()));
    fileMap = JSON.parse(JSON.stringify(readFileMapCache().fileMap.projectFileMap));
    globalThis.projectGraph = graph;
    globalThis.projectFileMap = fileMap;
    globalThis.projectRootMappings = createProjectRootMappings(graph.nodes);
  });

  afterEach(() => {
    for (const key of graphGlobals) {
      if (originalGlobals[key] === undefined) {
        delete globalThis[key];
      } else {
        globalThis[key] = originalGlobals[key];
      }
    }
  });

  function lint(packageJson) {
    return new Linter().verify(JSON.stringify(packageJson), config, {
      filename: join(workspaceRoot, projectRoot, 'package.json'),
    });
  }

  function addImport(file, dependency) {
    fileMap['react-text'].push({ file: `${projectRoot}/${file}`, hash: 'fixture', deps: [dependency] });
  }

  it('accepts the current manifest without building component packages', () => {
    expect(lint(manifest)).toEqual([]);
  });

  it.each(['@fluentui/react-theme', '@griffel/react', '@swc/helpers'])(
    'reports a missing production dependency: %s',
    dependency => {
      const packageJson = JSON.parse(JSON.stringify(manifest));
      delete packageJson.dependencies[dependency];
      const messages = lint(packageJson);
      expect(messages.length).toBeGreaterThan(0);
      expect(messages.every(message => message.ruleId === '@nx/dependency-checks')).toBe(true);
      expect(messages.some(message => message.message.includes(dependency))).toBe(true);
    },
  );

  describe.each(['@fluentui/react-theme', '@griffel/react'])('%s declarations', dependency => {
    it('does not accept a runtime dependency declared only as a devDependency', () => {
      const packageJson = JSON.parse(JSON.stringify(manifest));
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        [dependency]: packageJson.dependencies[dependency],
      };
      delete packageJson.dependencies[dependency];
      expect(lint(packageJson).some(message => message.message.includes(dependency))).toBe(true);
    });

    it.each(['peerDependencies', 'optionalDependencies'])('accepts a runtime declaration in %s', section => {
      const packageJson = JSON.parse(JSON.stringify(manifest));
      packageJson[section] = {
        ...packageJson[section],
        [dependency]: packageJson.dependencies[dependency],
      };
      delete packageJson.dependencies[dependency];
      expect(lint(packageJson)).toEqual([]);
    });
  });

  it('does not exempt external runtime imports installed as root devDependencies', () => {
    addImport('src/runtime.ts', 'npm:lodash');
    expect(lint(manifest).some(message => message.message.includes('lodash'))).toBe(true);
  });

  it.each(['src/fixture.test.ts', 'src/testing/fixture.ts', 'config/fixture.cjs'])(
    'ignores development imports from %s',
    file => {
      addImport(file, 'npm:lodash');
      expect(lint(manifest)).toEqual([]);
    },
  );

  it('does not introduce obsolete dependency or version-range enforcement', () => {
    const packageJson = JSON.parse(JSON.stringify(manifest));
    packageJson.dependencies.lodash = '0.0.0';
    packageJson.dependencies['@griffel/react'] = '0.0.0';
    expect(lint(packageJson)).toEqual([]);
  });

  it('records the unsupported generated workspace JSX runtime case', () => {
    const packageJson = JSON.parse(JSON.stringify(manifest));
    delete packageJson.dependencies['@fluentui/react-jsx-runtime'];
    expect(lint(packageJson)).toEqual([]);
  });

  it('reports the same missing workspace dependency before and after its entry point exists', () => {
    const directory = mkdtempSync(join(tmpdir(), 'react-text-dependency-lint-'));
    try {
      const dependencyRoot = join(directory, 'node_modules/@fixture/dependency');
      mkdirSync(dependencyRoot, { recursive: true });
      mkdirSync(join(directory, 'src'));
      writeFileSync(join(directory, 'package.json'), JSON.stringify({ name: '@fixture/consumer', version: '1.0.0' }));
      writeFileSync(
        join(dependencyRoot, 'package.json'),
        JSON.stringify({ name: '@fixture/dependency', version: '1.0.0', main: 'lib/index.js' }),
      );
      graph.nodes['dependency-lint-fixture'] = {
        name: 'dependency-lint-fixture',
        type: 'lib',
        data: { root: relative(workspaceRoot, dependencyRoot), targets: { build: { executor: 'nx:noop' } } },
      };
      addImport('src/runtime.ts', 'dependency-lint-fixture');
      const lintImport = () =>
        new Linter({ cwd: directory }).verify(
          'import { value } from "@fixture/dependency";',
          [
            {
              plugins: { import: importPlugin },
              rules: { 'import/no-extraneous-dependencies': ['error', { packageDir: directory }] },
            },
          ],
          { filename: join(directory, 'src/index.js') },
        );
      expect(lintImport()).toEqual([]);
      const before = lint(manifest);
      expect(before.some(message => message.message.includes('@fixture/dependency'))).toBe(true);

      mkdirSync(join(dependencyRoot, 'lib'));
      writeFileSync(join(dependencyRoot, 'lib/index.js'), 'exports.value = 1;');
      expect(lintImport().map(message => message.ruleId)).toEqual(['import/no-extraneous-dependencies']);
      expect(lint(manifest)).toEqual(before);
      expect(lint({ ...manifest, dependencies: { ...manifest.dependencies, '@fixture/dependency': '1.0.0' } })).toEqual(
        [],
      );
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it('fails instead of skipping the check when the Nx graph is missing', () => {
    const directory = mkdtempSync(join(tmpdir(), 'react-text-dependency-graph-'));
    try {
      const result = spawnSync(process.execPath, ['-e', 'require("./config/eslint.config.cjs")'], {
        cwd: join(workspaceRoot, projectRoot),
        env: { ...process.env, NX_WORKSPACE_DATA_DIRECTORY: directory },
        encoding: 'utf8',
      });
      expect(result.error).toBeUndefined();
      expect(result.status).not.toBe(0);
      expect(result.stderr).toContain('No cached ProjectGraph is available');
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it.each([
    ['project', 'cannot find react-text in the cached Nx graph', 'Run yarn nx reset'],
    ['build target', 'requires the react-text build target definition', 'building the package is not required'],
    ['file map', 'cannot find the react-text dependency file map', 'Invoke this config through Nx'],
    ['file map entry', 'cannot find the react-text dependency file map', 'Invoke this config through Nx'],
  ])('fails with recovery guidance when the cached %s is missing', (missing, diagnostic, guidance) => {
    const directory = mkdtempSync(join(tmpdir(), 'react-text-dependency-graph-'));
    try {
      if (missing === 'project') {
        delete graph.nodes['react-text'];
      } else if (missing === 'build target') {
        delete graph.nodes['react-text'].data.targets.build;
      }
      writeFileSync(join(directory, 'project-graph.json'), JSON.stringify(graph));
      if (missing !== 'file map') {
        if (missing === 'file map entry') {
          delete fileMap['react-text'];
        }
        writeFileSync(join(directory, 'file-map.json'), JSON.stringify({ fileMap: { projectFileMap: fileMap } }));
      }
      const result = spawnSync(process.execPath, ['-e', 'require("./config/eslint.config.cjs")'], {
        cwd: join(workspaceRoot, projectRoot),
        env: { ...process.env, NX_WORKSPACE_DATA_DIRECTORY: directory },
        encoding: 'utf8',
      });
      expect(result.error).toBeUndefined();
      expect(result.status).not.toBe(0);
      expect(result.stderr).toContain(diagnostic);
      expect(result.stderr).toContain(guidance);
      expect(result.stderr).not.toContain('TypeError');
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});

import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import {
  Tree,
  readProjectConfiguration,
  readJson,
  stripIndents,
  addProjectConfiguration,
  readWorkspaceConfiguration,
} from '@nrwl/devkit';

import generator from './index';
import { MigrateConvergedPkgGeneratorSchema } from './schema';

describe('migrate-converged-pkg generator', () => {
  let tree: Tree;
  const options: MigrateConvergedPkgGeneratorSchema = { name: '@proj/react-dummy' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    tree = setupDummyPackage(tree, options);
  });

  it('should update local tsconfig.json', async () => {
    const projectConfig = readProjectConfiguration(tree, options.name);
    function getTsConfig() {
      return readJson(tree, `${projectConfig.root}/tsconfig.json`);
    }
    let tsConfig = getTsConfig();

    expect(tsConfig).toMatchInlineSnapshot(`
      Object {
        "compilerOptions": Object {
          "baseUrl": ".",
          "typeRoots": Array [
            "../../node_modules/@types",
            "../../typings",
          ],
        },
      }
    `);

    await generator(tree, options);

    tsConfig = getTsConfig();

    expect(tsConfig).toMatchInlineSnapshot(`
      Object {
        "compilerOptions": Object {
          "declaration": true,
          "experimentalDecorators": true,
          "importHelpers": true,
          "jsx": "react",
          "lib": Array [
            "es5",
            "dom",
          ],
          "module": "commonjs",
          "noUnusedLocals": true,
          "outDir": "dist",
          "preserveConstEnums": true,
          "target": "es5",
          "types": Array [
            "jest",
            "custom-global",
            "inline-style-expand-shorthand",
          ],
        },
        "extends": "../../tsconfig.base.json",
        "include": Array [
          "src",
        ],
      }
    `);
  });

  it('should update root tsconfig.base.json', async () => {
    function getBaseTsConfig() {
      return readJson(tree, `/tsconfig.base.json`);
    }

    let rootTsConfig = getBaseTsConfig();

    expect(rootTsConfig).toMatchInlineSnapshot(`
      Object {
        "compilerOptions": Object {
          "paths": Object {},
        },
      }
    `);

    await generator(tree, options);

    rootTsConfig = getBaseTsConfig();

    expect(rootTsConfig).toMatchInlineSnapshot(`
      Object {
        "compilerOptions": Object {
          "paths": Object {
            "@proj/react-dummy": Array [
              "packages/react-dummy/src/index.ts",
            ],
          },
        },
      }
    `);
  });
});

// ==== helpers ====

function serializeJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}

function setupDummyPackage(tree: Tree, options: MigrateConvergedPkgGeneratorSchema) {
  const workspaceConfig = readWorkspaceConfiguration(tree);
  const pkgName = options.name;
  const paths = {
    root: `packages/${options.name.replace(`@${workspaceConfig.npmScope}/`, '')}`,
  };

  const dummyPackageJson = {
    name: pkgName,
    scripts: {
      build: 'just-scripts build',
      clean: 'just-scripts clean',
      'code-style': 'just-scripts code-style',
      just: 'just-scripts',
      lint: 'just-scripts lint',
      start: 'just-scripts dev:storybook',
      'start-test': 'just-scripts jest-watch',
      test: 'just-scripts test',
      'update-snapshots': 'just-scripts jest -u',
    },
  };

  const dummyTsConfig = {
    compilerOptions: {
      baseUrl: '.',
      typeRoots: ['../../node_modules/@types', '../../typings'],
    },
  };

  const dummyJestConfig = stripIndents`
    const { createConfig } = require('@fluentui/scripts/jest/jest-resources');
    const path = require('path');

    const config = createConfig({
      setupFiles: [path.resolve(path.join(__dirname, 'config', 'tests.js'))],
      snapshotSerializers: ['@fluentui/jest-serializer-make-styles'],
    });

    module.exports = config;
`;

  tree.write(`${paths.root}/package.json`, serializeJson(dummyPackageJson));
  tree.write(`${paths.root}/tsconfig.json`, serializeJson(dummyTsConfig));
  tree.write(`${paths.root}/jest.config.js`, dummyJestConfig);

  addProjectConfiguration(tree, pkgName, {
    root: paths.root,
    projectType: 'library',
    targets: {},
  });

  return tree;
}

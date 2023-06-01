import {
  addProjectConfiguration,
  joinPathFragments,
  NxJsonConfiguration,
  readJson,
  readNxJson,
  serializeJson,
  Tree,
} from '@nrwl/devkit';
import { createTreeWithEmptyV1Workspace } from '@nrwl/devkit/testing';
import { getProjectConfig } from '../../../utils';

import { setupCypressComponentTesting } from './cypress-component-setup';

describe(`cypress-component-setup`, () => {
  let tree: Tree;
  beforeEach(() => {
    tree = createTreeWithEmptyV1Workspace();
  });

  it(`should setup cypress for project`, () => {
    tree = setupDummyPackage(tree, { name: '@proj/one' });
    const options = { ...getProjectConfig(tree, { packageName: '@proj/one' }) };

    setupCypressComponentTesting(tree, options);

    expect(tree.read('packages/one/cypress.config.ts', 'utf-8')).toMatchInlineSnapshot(`
      "import { baseConfig } from '@fluentui/scripts-cypress';

      export default baseConfig;"
    `);
    expect(readJson(tree, 'packages/one/tsconfig.json').references).toEqual(
      expect.arrayContaining([
        {
          path: './tsconfig.cy.json',
        },
      ]),
    );
    expect(readJson(tree, 'packages/one/tsconfig.lib.json').exclude).toEqual(
      expect.arrayContaining(['**/*.cy.ts', '**/*.cy.tsx']),
    );
    expect(readJson(tree, 'packages/one/tsconfig.cy.json')).toMatchInlineSnapshot(`
      Object {
        "compilerOptions": Object {
          "isolatedModules": false,
          "lib": Array [
            "ES2019",
            "dom",
          ],
          "types": Array [
            "node",
            "cypress",
            "cypress-storybook/cypress",
            "cypress-real-events",
          ],
        },
        "extends": "./tsconfig.json",
        "include": Array [
          "**/*.cy.ts",
          "**/*.cy.tsx",
        ],
      }
    `);

    expect(readJson(tree, 'packages/one/package.json').scripts).toEqual(
      expect.objectContaining({
        e2e: 'cypress run --component',
        'e2e:local': 'cypress open --component',
      }),
    );
  });
});

function setupDummyPackage(tree: Tree, options: { name: string }) {
  const pkgName = options.name;

  const workspaceConfig = readNxJson(tree) ?? {};
  const normalizedPkgName = getNormalizedPkgName({ pkgName, workspaceConfig });
  const paths = {
    root: `packages/${normalizedPkgName}`,
  };

  const templates = {
    packageJson: {
      name: pkgName,
      version: '0.0.1',
      typings: 'lib/index.d.ts',
      main: 'lib-commonjs/index.js',
      scripts: {},
      dependencies: {},
      devDependencies: {},
    },
    tsconfigs: {
      root: {
        references: [
          {
            path: './tsconfig.lib.json',
          },
        ],
      },
      lib: {
        extends: './tsconfig.json',
        compilerOptions: {},
        exclude: ['./src/testing/**', '**/*.spec.ts', '**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx'],
      },
    },
  };

  tree.write(`${paths.root}/package.json`, serializeJson(templates.packageJson));
  tree.write(`${paths.root}/tsconfig.json`, serializeJson(templates.tsconfigs.root));
  tree.write(`${paths.root}/tsconfig.lib.json`, serializeJson(templates.tsconfigs.lib));
  tree.write(`${paths.root}/src/index.ts`, `export const greet = 'hello' `);

  addProjectConfiguration(tree, pkgName, {
    root: paths.root,
    sourceRoot: joinPathFragments(paths.root, 'src'),
    projectType: 'library',
    targets: {},
  });

  return tree;
}

function getNormalizedPkgName(options: { pkgName: string; workspaceConfig: NxJsonConfiguration }) {
  return options.pkgName.replace(`@${options.workspaceConfig.npmScope}/`, '');
}

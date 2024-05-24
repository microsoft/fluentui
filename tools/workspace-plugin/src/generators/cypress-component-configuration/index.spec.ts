import { addProjectConfiguration, joinPathFragments, readJson, serializeJson, Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { getProjectNameWithoutScope } from '../../utils';

import generator from './index';

describe(`cypress-component-configuration`, () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};

  let tree: Tree;
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(noop);
    jest.spyOn(console, 'info').mockImplementation(noop);
    jest.spyOn(console, 'warn').mockImplementation(noop);

    tree = createTreeWithEmptyWorkspace();
  });

  it(`should not create component testing for application`, async () => {
    const project = '@proj/app-one';
    tree = setupDummyPackage(tree, { name: project, projectType: 'application' });

    await generator(tree, { project });

    expect(tree.exists('apps/app-one/cypress.config.ts')).toBe(false);
  });

  it(`should setup cypress component testing for existing project`, async () => {
    const project = '@proj/one';
    tree = setupDummyPackage(tree, { name: project });

    await generator(tree, { project });

    expect(tree.read('packages/one/cypress.config.ts', 'utf-8')).toMatchInlineSnapshot(`
      "import { baseConfig } from '@fluentui/scripts-cypress';

      export default baseConfig;
      "
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

    const pkgJson = readJson(tree, 'packages/one/package.json');

    expect(pkgJson.scripts).toEqual(
      expect.objectContaining({
        e2e: 'cypress run --component',
        'e2e:local': 'cypress open --component',
      }),
    );
    expect(pkgJson.devDependencies).toEqual(
      expect.objectContaining({
        '@fluentui/scripts-cypress': '*',
      }),
    );
  });
});

function setupDummyPackage(tree: Tree, options: { name: string; projectType?: 'application' | 'library' }) {
  const { name: pkgName, projectType = 'library' } = options;

  const normalizedPkgName = getProjectNameWithoutScope(pkgName);
  const paths = {
    root: `${projectType === 'application' ? 'apps' : 'packages'}/${normalizedPkgName}`,
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
    projectType,
    targets: {},
  });

  return tree;
}

import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import {
  Tree,
  readProjectConfiguration,
  writeJson,
  updateJson,
  addProjectConfiguration,
  joinPathFragments,
  readJson,
  stripIndents,
} from '@nx/devkit';

import generator from './index';
import { PackageJson } from '../../types';
import { setupCodeowners } from '../../utils-testing';

describe('react-library generator', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    tree = setupCodeowners(tree, { content: '' });
    tree = createLibrary(tree, 'react-jsx-runtime');
    tree = createLibrary(tree, 'react-theme');
    tree = createLibrary(tree, 'react-utilities');

    writeJson(tree, 'tsconfig.base.v0.json', { compilerOptions: { paths: {} } });
    writeJson(tree, 'tsconfig.base.v8.json', { compilerOptions: { paths: {} } });
    writeJson(tree, 'tsconfig.base.all.json', { compilerOptions: { paths: {} } });
  });

  it('should throw error if 3rd party package specified as dependency is missing in monorepo root package.json devDependencies', async () => {
    try {
      await generator(tree, { name: 'react-one', owner: '@org/chosen-one' });
    } catch (err) {
      expect(err).toMatchInlineSnapshot(`
        [Error: Following dependencies are not installed within your monorepo. You need to install them in root package.json as devDependencies:
         - @griffel/react
        - @swc/helpers]
      `);
    }
  });

  it('should scaffold react package', async () => {
    setup(tree);

    await generator(tree, { name: 'react-one', owner: '@org/chosen-one' });
    const config = readProjectConfiguration(tree, '@proj/react-one-preview');
    const rootPath = 'packages/react-components/react-one-preview';

    expect(tree.children(rootPath)).toMatchInlineSnapshot(`
      Array [
        "project.json",
        ".babelrc.json",
        ".eslintrc.json",
        ".storybook",
        ".swcrc",
        "LICENSE",
        "README.md",
        "config",
        "docs",
        "etc",
        "jest.config.js",
        "just.config.ts",
        "package.json",
        "src",
        "stories",
        "tsconfig.json",
        "tsconfig.lib.json",
        "tsconfig.spec.json",
      ]
    `);
    expect(tree.children(joinPathFragments(rootPath, '.storybook'))).toEqual([
      'main.js',
      'preview.js',
      'tsconfig.json',
    ]);
    expect(tree.children(joinPathFragments(rootPath, 'docs'))).toEqual(['Spec.md']);
    expect(tree.children(joinPathFragments(rootPath, 'src'))).toEqual(['index.ts', 'testing']);
    expect(tree.exists(joinPathFragments(rootPath, 'src', 'testing', 'isConformant.ts'))).toEqual(true);
    expect(tree.children(joinPathFragments(rootPath, 'config'))).toEqual(['api-extractor.json', 'tests.js']);
    expect(tree.children(joinPathFragments(rootPath, 'etc'))).toEqual(['react-one-preview.api.md']);

    expect(config).toMatchInlineSnapshot(`
      Object {
        "$schema": "../../../node_modules/nx/schemas/project-schema.json",
        "implicitDependencies": Array [],
        "name": "@proj/react-one-preview",
        "projectType": "library",
        "root": "packages/react-components/react-one-preview",
        "sourceRoot": "packages/react-components/react-one-preview/src",
        "tags": Array [
          "platform:web",
          "vNext",
        ],
      }
    `);

    expect(readJson(tree, `${rootPath}/package.json`)).toEqual(
      expect.objectContaining({
        name: '@proj/react-one-preview',
        private: true,
        version: '0.0.0',
        files: ['*.md', 'dist/*.d.ts', 'lib', 'lib-commonjs'],
        dependencies: {
          '@fluentui/react-jsx-runtime': '^9.0.0',
          '@fluentui/react-theme': '^9.0.0',
          '@fluentui/react-utilities': '^9.0.0',
          '@griffel/react': '^1.2.3',
          '@swc/helpers': '^0.4.5',
        },
      }),
    );
    expect(readJson(tree, `${rootPath}/tsconfig.json`)).toEqual(
      expect.objectContaining({ extends: '../../../tsconfig.base.json' }),
    );
    expect(readJson(tree, `${rootPath}/tsconfig.lib.json`)).toMatchInlineSnapshot(`
      Object {
        "compilerOptions": Object {
          "declaration": true,
          "declarationDir": "../../../dist/out-tsc/types",
          "inlineSources": true,
          "lib": Array [
            "ES2019",
            "dom",
          ],
          "noEmit": false,
          "outDir": "../../../dist/out-tsc",
          "types": Array [
            "static-assets",
            "environment",
          ],
        },
        "exclude": Array [
          "./src/testing/**",
          "**/*.spec.ts",
          "**/*.spec.tsx",
          "**/*.test.ts",
          "**/*.test.tsx",
          "**/*.stories.ts",
          "**/*.stories.tsx",
        ],
        "extends": "./tsconfig.json",
        "include": Array [
          "./src/**/*.ts",
          "./src/**/*.tsx",
        ],
      }
    `);
    expect(readJson(tree, `${rootPath}/.babelrc.json`)).toEqual(
      expect.objectContaining({ extends: '../../../.babelrc-v9.json' }),
    );
    expect(tree.read(`${rootPath}/jest.config.js`, 'utf-8')).toEqual(
      expect.stringContaining(`displayName: 'react-one-preview',`),
    );
    expect(tree.read(`${rootPath}/README.md`, 'utf-8')).toEqual(
      expect.stringContaining(stripIndents`
      # @proj/react-one-preview

      **React One components for [Fluent UI React](https://react.fluentui.dev/)**
    `),
    );

    // global udtpates

    const expectedPathAlias = {
      ['@proj/react-one-preview']: ['packages/react-components/react-one-preview/src/index.ts'],
    };
    expect(readJson(tree, `tsconfig.base.json`).compilerOptions.paths).toEqual(
      expect.objectContaining(expectedPathAlias),
    );
    expect(readJson(tree, `tsconfig.base.all.json`).compilerOptions.paths).toEqual(
      expect.objectContaining(expectedPathAlias),
    );

    expect(tree.read('.github/CODEOWNERS', 'utf-8')).toEqual(
      expect.stringContaining(`packages/react-components/react-one-preview @org/chosen-one`),
    );
  });

  it(`should create compat package`, async () => {
    setup(tree);

    await generator(tree, { name: 'react-one', owner: '@org/chosen-one', kind: 'compat' });
    const config = readProjectConfiguration(tree, '@proj/react-one-compat');
    const rootPath = 'packages/react-components/react-one-compat';
    expect(tree.children(rootPath)).toMatchInlineSnapshot(`
      Array [
        "project.json",
        ".babelrc.json",
        ".eslintrc.json",
        ".storybook",
        ".swcrc",
        "LICENSE",
        "README.md",
        "config",
        "docs",
        "etc",
        "jest.config.js",
        "just.config.ts",
        "package.json",
        "src",
        "stories",
        "tsconfig.json",
        "tsconfig.lib.json",
        "tsconfig.spec.json",
      ]
    `);
    expect(config).toEqual(
      expect.objectContaining({
        root: 'packages/react-components/react-one-compat',
        sourceRoot: 'packages/react-components/react-one-compat/src',
        tags: ['platform:web', 'vNext', 'compat'],
      }),
    );
  });
});

function setup(tree: Tree) {
  updateJson(tree, 'package.json', json => {
    json.devDependencies = {
      '@griffel/react': '1.2.3',
      '@swc/helpers': '0.4.5',
    };
    return json;
  });

  return { rootPackageJson: readJson<PackageJson>(tree, 'package.json') };
}

function createLibrary(tree: Tree, name: string) {
  const projectName = '@fluentui/' + name;
  const root = `packages/react-components/${name}`;
  addProjectConfiguration(tree, projectName, { root, tags: ['vNext'] });
  writeJson(tree, joinPathFragments(root, 'package.json'), {
    name: projectName,
    version: '9.0.0',
  });

  return tree;
}

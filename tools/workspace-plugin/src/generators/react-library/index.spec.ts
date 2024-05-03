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
    tree = createLibrary(tree, 'react-shared-contexts');

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

    const library = readProjectConfiguration(tree, '@proj/react-one-preview');
    const stories = readProjectConfiguration(tree, '@proj/react-one-preview-stories');

    // library
    expect(tree.children(library.root)).toMatchInlineSnapshot(`
      Array [
        "project.json",
        ".babelrc.json",
        ".eslintrc.json",
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
        "tsconfig.json",
        "tsconfig.lib.json",
        "tsconfig.spec.json",
      ]
    `);
    expect(tree.children(joinPathFragments(library.root, 'docs'))).toEqual(['Spec.md']);
    expect(tree.children(joinPathFragments(library.root, 'src'))).toEqual(['index.ts', 'testing']);
    expect(tree.exists(joinPathFragments(library.root, 'src', 'testing', 'isConformant.ts'))).toEqual(true);
    expect(tree.children(joinPathFragments(library.root, 'config'))).toEqual(['api-extractor.json', 'tests.js']);
    expect(tree.children(joinPathFragments(library.root, 'etc'))).toEqual(['react-one-preview.api.md']);

    expect(library).toMatchInlineSnapshot(`
      Object {
        "$schema": "../../../../node_modules/nx/schemas/project-schema.json",
        "implicitDependencies": Array [],
        "name": "@proj/react-one-preview",
        "projectType": "library",
        "root": "packages/react-components/react-one-preview/library",
        "sourceRoot": "packages/react-components/react-one-preview/library/src",
        "tags": Array [
          "platform:web",
          "vNext",
        ],
      }
    `);

    expect(readJson(tree, `${library.root}/config/api-extractor.json`)).toEqual({
      $schema: 'https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json',
      extends: '@fluentui/scripts-api-extractor/api-extractor.common.v-next.json',
      mainEntryPointFilePath:
        '<projectRoot>/../../../../../../dist/out-tsc/types/packages/react-components/<unscopedPackageName>/library/src/index.d.ts',
    });
    const libPackageJson = readJson(tree, `${library.root}/package.json`);
    expect(libPackageJson.scripts['test-ssr']).toEqual(undefined);
    expect(libPackageJson).toEqual(
      expect.objectContaining({
        name: '@proj/react-one-preview',
        private: true,
        version: '0.0.0',
        files: ['*.md', 'dist/*.d.ts', 'lib', 'lib-commonjs'],
        dependencies: {
          '@fluentui/react-jsx-runtime': '^9.0.0',
          '@fluentui/react-shared-contexts': '^9.0.0',
          '@fluentui/react-theme': '^9.0.0',
          '@fluentui/react-utilities': '^9.0.0',
          '@griffel/react': '^1.2.3',
          '@swc/helpers': '^0.4.5',
        },
      }),
    );
    expect(readJson(tree, `${library.root}/tsconfig.json`)).toEqual(
      expect.objectContaining({ extends: '../../../../tsconfig.base.json' }),
    );
    expect(readJson(tree, `${library.root}/tsconfig.lib.json`)).toMatchInlineSnapshot(`
      Object {
        "compilerOptions": Object {
          "declaration": true,
          "declarationDir": "../../../../dist/out-tsc/types",
          "inlineSources": true,
          "lib": Array [
            "ES2019",
            "dom",
          ],
          "noEmit": false,
          "outDir": "../../../../dist/out-tsc",
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
    expect(readJson(tree, `${library.root}/.babelrc.json`)).toEqual(
      expect.objectContaining({ extends: '../../../../.babelrc-v9.json' }),
    );
    expect(tree.read(`${library.root}/jest.config.js`, 'utf-8')).toEqual(
      expect.stringContaining(`displayName: 'react-one-preview',`),
    );
    expect(tree.read(`${library.root}/README.md`, 'utf-8')).toEqual(
      expect.stringContaining(stripIndents`
      # @proj/react-one-preview

      **React One components for [Fluent UI React](https://react.fluentui.dev/)**
    `),
    );

    // stories

    expect(tree.children(stories.root)).toMatchInlineSnapshot(`
      Array [
        "src",
        ".storybook",
        "README.md",
        "just.config.ts",
        ".eslintrc.json",
        "tsconfig.json",
        "tsconfig.lib.json",
        "package.json",
        "project.json",
      ]
    `);

    expect(readJson(tree, `${stories.root}/package.json`)).toEqual({
      name: '@proj/react-one-preview-stories',
      version: '0.0.0',
      private: true,
      devDependencies: {
        '@fluentui/eslint-plugin': '*',
        '@fluentui/react-storybook-addon': '*',
        '@fluentui/react-storybook-addon-export-to-sandbox': '*',
        '@fluentui/scripts-storybook': '*',
        '@fluentui/scripts-tasks': '*',
      },
      scripts: {
        format: 'just-scripts prettier',
        lint: 'eslint src/',
        start: 'yarn storybook',
        storybook: 'start-storybook',
        'type-check': 'just-scripts type-check',
        'test-ssr': 'test-ssr "./src/**/*.stories.tsx"',
      },
    });

    expect(stories).toMatchInlineSnapshot(`
      Object {
        "$schema": "../../../../node_modules/nx/schemas/project-schema.json",
        "implicitDependencies": Array [],
        "name": "@proj/react-one-preview-stories",
        "projectType": "library",
        "root": "packages/react-components/react-one-preview/stories",
        "sourceRoot": "packages/react-components/react-one-preview/stories/src",
        "tags": Array [
          "vNext",
          "platform:web",
          "type:stories",
        ],
      }
    `);

    expect(tree.read(`${stories.root}/src/index.ts`, 'utf-8')).toMatchInlineSnapshot(`
      "export {};
      "
    `);

    expect(readJson(tree, `${stories.root}/.eslintrc.json`)).toMatchInlineSnapshot(`
      Object {
        "extends": Array [
          "plugin:@fluentui/eslint-plugin/react",
        ],
        "root": true,
        "rules": Object {
          "import/no-extraneous-dependencies": Array [
            "error",
            Object {
              "packageDir": Array [
                ".",
                "../../../../",
              ],
            },
          ],
        },
      }
    `);

    // global updates

    const expectedPathAlias = {
      ['@proj/react-one-preview']: ['packages/react-components/react-one-preview/library/src/index.ts'],
      ['@proj/react-one-preview-stories']: ['packages/react-components/react-one-preview/stories/src/index.ts'],
    };
    expect(readJson(tree, `tsconfig.base.json`).compilerOptions.paths).toEqual(
      expect.objectContaining(expectedPathAlias),
    );
    expect(readJson(tree, `tsconfig.base.all.json`).compilerOptions.paths).toEqual(
      expect.objectContaining(expectedPathAlias),
    );

    expect(tree.read('.github/CODEOWNERS', 'utf-8')).toEqual(
      expect.stringContaining(stripIndents`
        packages/react-components/react-one-preview/library @org/chosen-one
        packages/react-components/react-one-preview/stories @org/chosen-one
      `),
    );
  });

  it(`should create compat package`, async () => {
    setup(tree);

    await generator(tree, { name: 'react-one', owner: '@org/chosen-one', kind: 'compat' });
    const library = readProjectConfiguration(tree, '@proj/react-one-compat');
    const stories = readProjectConfiguration(tree, '@proj/react-one-compat-stories');

    // library

    expect(tree.children(library.root)).toMatchInlineSnapshot(`
      Array [
        "project.json",
        ".babelrc.json",
        ".eslintrc.json",
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
        "tsconfig.json",
        "tsconfig.lib.json",
        "tsconfig.spec.json",
      ]
    `);
    expect(library).toEqual(
      expect.objectContaining({
        root: 'packages/react-components/react-one-compat/library',
        sourceRoot: 'packages/react-components/react-one-compat/library/src',
        tags: ['platform:web', 'vNext', 'compat'],
      }),
    );

    // stories

    expect(tree.children(stories.root)).toMatchInlineSnapshot(`
      Array [
        "src",
        ".storybook",
        "README.md",
        "just.config.ts",
        ".eslintrc.json",
        "tsconfig.json",
        "tsconfig.lib.json",
        "package.json",
        "project.json",
      ]
    `);

    expect(stories).toEqual(
      expect.objectContaining({
        root: 'packages/react-components/react-one-compat/stories',
        sourceRoot: 'packages/react-components/react-one-compat/stories/src',
        tags: ['vNext', 'platform:web', 'compat', 'type:stories'],
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

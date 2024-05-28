import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import {
  Tree,
  readProjectConfiguration,
  stripIndents,
  addProjectConfiguration,
  serializeJson,
  readJson,
  updateJson,
  writeJson,
  output,
} from '@nx/devkit';

import { splitLibraryInTwoGenerator } from './generator';
import { setupCodeowners } from '../../utils-testing';
import { TsConfig } from '../../types';
import { addCodeowner } from '../add-codeowners';
import { workspacePaths } from '../../utils';

const noop = () => {
  return;
};

describe('split-library-in-two generator', () => {
  let tree: Tree;
  const options = { project: '@proj/react-hello', logs: true };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    tree = setup(tree);

    jest.spyOn(output, 'log').mockImplementation(noop);
    jest.spyOn(output, 'warn').mockImplementation(noop);
    jest.spyOn(output, 'error').mockImplementation(noop);
  });

  it('should split v9 project into 2', async () => {
    const oldConfig = readProjectConfiguration(tree, options.project);

    await splitLibraryInTwoGenerator(tree, options);

    const newConfig = readProjectConfiguration(tree, options.project);
    const storiesConfig = readProjectConfiguration(tree, `${options.project}-stories`);

    // new Shared
    expect(tree.children(oldConfig.root)).toEqual(['stories', 'library']);

    expect(readJson(tree, '/tsconfig.base.json').compilerOptions.paths).toEqual(
      expect.objectContaining({
        '@proj/react-hello': ['packages/react-components/react-hello/library/src/index.ts'],
        '@proj/react-hello-stories': ['packages/react-components/react-hello/stories/src/index.ts'],
      }),
    );

    expect(tree.read(workspacePaths.github.codeowners, 'utf-8')).toEqual(
      expect.stringContaining(stripIndents`
        packages/react-components/react-hello/library Mr.Wick
        packages/react-components/react-hello/stories Mr.Wick
    `),
    );

    // ==============
    // new SRC ( library )
    // ==============
    expect(tree.children(newConfig.root)).toMatchInlineSnapshot(`
      Array [
        "package.json",
        "tsconfig.json",
        "tsconfig.lib.json",
        ".babelrc.json",
        "jest.config.js",
        "config",
        "just.config.ts",
        "src",
        "project.json",
      ]
    `);

    expect(newConfig).toMatchInlineSnapshot(`
      Object {
        "$schema": "../../../../node_modules/nx/schemas/project-schema.json",
        "name": "@proj/react-hello",
        "projectType": "library",
        "root": "packages/react-components/react-hello/library",
        "sourceRoot": "packages/react-components/react-hello/library/src",
        "tags": Array [
          "vNext",
          "platform:web",
        ],
      }
    `);

    expect(readJson(tree, `${newConfig.root}/.babelrc.json`)).toEqual({ extends: '../../../../../.babelrc-v9.json' });
    expect(readJson(tree, `${newConfig.root}/config/api-extractor.json`)).toEqual(
      expect.objectContaining({
        mainEntryPointFilePath:
          '<projectRoot>/../../../../../../dist/out-tsc/types/packages/react-components/<unscopedPackageName>/library/src/index.d.ts',
      }),
    );

    expect(readJson(tree, `${newConfig.root}/tsconfig.json`)).toEqual(
      expect.objectContaining({
        extends: '../../../../tsconfig.base.json',
        references: [
          {
            path: './tsconfig.lib.json',
          },
          {
            path: './tsconfig.spec.json',
          },
        ],
      }),
    );

    expect(readJson(tree, `${newConfig.root}/tsconfig.lib.json`).compilerOptions).toEqual(
      expect.objectContaining({
        declarationDir: '../../../../dist/out-tsc/types',
        outDir: '../../../../dist/out-tsc',
      }),
    );

    const newConfigPackageJSON = readJson(tree, `${newConfig.root}/package.json`);
    expect(newConfigPackageJSON.scripts['test-ssr']).toEqual(undefined);
    expect(newConfigPackageJSON).toEqual(
      expect.objectContaining({
        name: '@proj/react-hello',
        scripts: expect.objectContaining({
          'type-check': 'just-scripts type-check',
          storybook: 'yarn --cwd ../stories storybook',
        }),
        devDependencies: {
          '@proj/react-one-for-test': '*',
          '@proj/react-provider': '*',
          '@proj/react-theme': '*',
        },
      }),
    );

    expect(tree.read(`${newConfig.root}/jest.config.js`, 'utf-8')).toMatchInlineSnapshot(`
      "module.exports = {
        displayName: 'react-text',
        preset: '../../../../jest.preset.js',
        transform: {
          '^.+\\\\\\\\.tsx?$': [
            'ts-jest',
            {
              tsconfig: '<rootDir>/tsconfig.spec.json',
              isolatedModules: true,
            },
          ],
        },
        coverageDirectory: './coverage',
        setupFilesAfterEnv: ['./config/tests.js'],
        snapshotSerializers: ['@griffel/jest-serializer'],
      };
      "
    `);

    // ==============
    // new SB
    // ==============
    expect(storiesConfig).toMatchInlineSnapshot(`
      Object {
        "$schema": "../../../../node_modules/nx/schemas/project-schema.json",
        "name": "@proj/react-hello-stories",
        "projectType": "library",
        "root": "packages/react-components/react-hello/stories",
        "sourceRoot": "packages/react-components/react-hello/stories/src",
        "tags": Array [
          "vNext",
          "platform:web",
          "type:stories",
        ],
      }
    `);

    expect(readJson(tree, `${storiesConfig.root}/package.json`)).toMatchInlineSnapshot(`
      Object {
        "devDependencies": Object {
          "@fluentui/eslint-plugin": "*",
          "@fluentui/react-storybook-addon": "*",
          "@fluentui/react-storybook-addon-export-to-sandbox": "*",
          "@fluentui/scripts-storybook": "*",
          "@fluentui/scripts-tasks": "*",
          "@proj/react-components": "*",
          "@proj/react-one-compat": "*",
          "@proj/react-two-preview": "*",
        },
        "name": "@proj/react-hello-stories",
        "private": true,
        "scripts": Object {
          "format": "just-scripts prettier",
          "lint": "eslint src/",
          "start": "yarn storybook",
          "storybook": "start-storybook",
          "test-ssr": "test-ssr \\"./src/**/*.stories.tsx\\"",
          "type-check": "just-scripts type-check",
        },
        "version": "0.0.0",
      }
    `);

    expect(readJson(tree, `${storiesConfig.root}/tsconfig.json`)).toMatchInlineSnapshot(`
      Object {
        "compilerOptions": Object {
          "importHelpers": true,
          "isolatedModules": true,
          "jsx": "react",
          "noEmit": true,
          "noUnusedLocals": true,
          "preserveConstEnums": true,
          "target": "ES2019",
        },
        "extends": "../../../../tsconfig.base.json",
        "files": Array [],
        "include": Array [],
        "references": Array [
          Object {
            "path": "./tsconfig.lib.json",
          },
          Object {
            "path": "./.storybook/tsconfig.json",
          },
        ],
      }
    `);

    expect(readJson(tree, `${storiesConfig.root}/tsconfig.lib.json`)).toMatchInlineSnapshot(`
      Object {
        "compilerOptions": Object {
          "inlineSources": true,
          "lib": Array [
            "ES2019",
            "dom",
          ],
          "outDir": "../../../../dist/out-tsc",
          "types": Array [
            "static-assets",
            "environment",
          ],
        },
        "extends": "./tsconfig.json",
        "include": Array [
          "./src/**/*.ts",
          "./src/**/*.tsx",
        ],
      }
    `);
    expect(readJson(tree, `${storiesConfig.root}/.eslintrc.json`)).toMatchInlineSnapshot(`
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
    expect(tree.read(`${storiesConfig.root}/README.md`, 'utf-8')).toMatchInlineSnapshot(`
      "# @proj/react-hello-stories

      Storybook stories for packages/react-components/react-hello

      ## Usage

      To include within storybook specify stories globs:

      \\\\\`\\\\\`\\\\\`js
      module.exports = {
      stories: ['../packages/react-components/react-hello/stories/src/**/*.stories.mdx', '../packages/react-components/react-hello/stories/src/**/index.stories.@(ts|tsx)'],
      }
      \\\\\`\\\\\`\\\\\`

      ## API

      no public API available
      "
    `);

    expect(readJson(tree, `${storiesConfig.root}/.storybook/tsconfig.json`)).toMatchInlineSnapshot(`
      Object {
        "compilerOptions": Object {
          "allowJs": true,
          "checkJs": true,
          "outDir": "",
          "types": Array [
            "static-assets",
            "environment",
            "storybook__addons",
          ],
        },
        "extends": "../tsconfig.json",
        "include": Array [
          "*.js",
        ],
      }
    `);
    expect(tree.read(`${storiesConfig.root}/.storybook/main.js`, 'utf-8')).toMatchInlineSnapshot(`
      "const rootMain = require('../../../../../.storybook/main');

      module.exports =
        /** @type {Omit<import('../../../../../.storybook/main'), 'typescript'|'babel'>} */ ({
          ...rootMain,
          stories: [
            ...rootMain.stories,
            '../src/**/*.stories.mdx',
            '../src/**/index.stories.@(ts|tsx)',
          ],
          addons: [...rootMain.addons],
          webpackFinal: (config, options) => {
            const localConfig = { ...rootMain.webpackFinal(config, options) };

            // add your own webpack tweaks if needed

            return localConfig;
          },
        });
      "
    `);
    expect(tree.read(`${storiesConfig.root}/.storybook/preview.js`, 'utf-8')).toMatchInlineSnapshot(`
      "import * as rootPreview from '../../../../../.storybook/preview';

      /** @type {typeof rootPreview.decorators} */
      export const decorators = [...rootPreview.decorators];

      /** @type {typeof rootPreview.parameters} */
      export const parameters = { ...rootPreview.parameters };
      "
    `);
  });
});

function setup(tree: Tree) {
  setupCodeowners(tree, { content: '' });
  writeJson(tree, 'tsconfig.base.v0.json', { compilerOptions: { paths: {} } });
  writeJson(tree, 'tsconfig.base.v8.json', { compilerOptions: { paths: {} } });
  writeJson(tree, 'tsconfig.base.all.json', { compilerOptions: { paths: {} } });

  updateJson(tree, '/package.json', json => {
    json.devDependencies = json.devDependencies ?? {};
    json.devDependencies['@proj/react-icons'] = '2.0.224';
    return json;
  });

  tree = setupDummyPackage(tree, { projectName: 'react-components' });
  tree = setupDummyPackage(tree, { projectName: 'react-one-compat' });
  tree = setupDummyPackage(tree, { projectName: 'react-two-preview' });
  tree = setupDummyPackage(tree, { projectName: 'react-one-for-test' });
  tree = setupDummyPackage(tree, { projectName: 'react-provider' });
  tree = setupDummyPackage(tree, { projectName: 'react-theme' });
  tree = setupDummyPackage(tree, { projectName: 'react-hello' });

  return tree;
}

function setupDummyPackage(tree: Tree, options: { projectName: string }) {
  const npmScope = '@proj';
  const npmProjectName = `${npmScope}/${options.projectName}`;
  const rootPath = `packages/react-components/${options.projectName}`;

  const templates = {
    packageJson: {
      name: npmProjectName,
      version: '9.0.0',
      typings: 'lib/index.d.ts',
      main: 'lib-commonjs/index.js',
      scripts: {
        build: 'just-scripts build',
        'bundle-size': 'monosize measure',
        clean: 'just-scripts clean',
        'code-style': 'just-scripts code-style',
        just: 'just-scripts',
        lint: 'just-scripts lint',
        start: 'yarn storybook',
        test: 'jest --passWithNoTests',
        storybook: 'start-storybook',
        'type-check': 'tsc -b tsconfig.json',
        'generate-api': 'just-scripts generate-api',
        'test-ssr': 'test-ssr "./stories/**/*.stories.tsx"',
        'verify-packaging': 'just-scripts verify-packaging',
      },
      dependencies: {},
    },
    tsConfig: {
      extends: '../../../tsconfig.base.json',
      compilerOptions: {
        target: 'ES2019',
        noEmit: true,
        isolatedModules: true,
        importHelpers: true,
        jsx: 'react',
        noUnusedLocals: true,
        preserveConstEnums: true,
      },
      include: [],
      files: [],
      references: [
        {
          path: './tsconfig.lib.json',
        },
        {
          path: './tsconfig.spec.json',
        },
        {
          path: './.storybook/tsconfig.json',
        },
      ],
    },
    tsConfigLib: {
      extends: './tsconfig.json',
      compilerOptions: {
        declaration: true,
        declarationDir: '../../../dist/out-tsc/types',
        outDir: '../../../dist/out-tsc',
      },
    },
    jestConfig: stripIndents`
      module.exports = {
        displayName: 'react-text',
        preset: '../../../jest.preset.js',
        transform: {
          '^.+\\.tsx?$': [
            'ts-jest',
            {
              tsconfig: '<rootDir>/tsconfig.spec.json',
              isolatedModules: true,
            },
          ],
        },
        coverageDirectory: './coverage',
        setupFilesAfterEnv: ['./config/tests.js'],
        snapshotSerializers: ['@griffel/jest-serializer'],
      };
      `,
    babelConfig: {
      extends: '../../../../.babelrc-v9.json',
    },
    justConfig: `
      import { preset, task } from '@fluentui/scripts-tasks';

      preset();

      task('build', 'build:react-components').cached?.();
    `,
    apiExtractorConfig: {
      $schema: 'https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json',
      extends: '@fluentui/scripts-api-extractor/api-extractor.common.v-next.json',
    },
    storybook: {
      main: stripIndents`
      const rootMain = require('../../../../.storybook/main');

  module.exports = /** @type {Omit<import('../../../../.storybook/main'), 'typescript'|'babel'>} */ ({
    ...rootMain,
    stories: [...rootMain.stories, '../stories/**/*.stories.mdx', '../stories/**/index.stories.@(ts|tsx)'],
    addons: [...rootMain.addons],
    webpackFinal: (config, options) => {
      const localConfig = { ...rootMain.webpackFinal(config, options) };

      // add your own webpack tweaks if needed

      return localConfig;
    },
});

      `,
      preview: stripIndents`
      import * as rootPreview from '../../../../.storybook/preview';

      /** @type {typeof rootPreview.decorators} */
      export const decorators = [...rootPreview.decorators];

      /** @type {typeof rootPreview.parameters} */
      export const parameters = { ...rootPreview.parameters };
      `,
      tsConfig: {
        extends: '../tsconfig.json',
        compilerOptions: {
          outDir: '',
          allowJs: true,
          checkJs: true,
          types: ['static-assets', 'environment', 'storybook__addons'],
        },
        include: ['../stories/**/*.stories.ts', '../stories/**/*.stories.tsx', '*.js'],
      },
    },
  };

  tree.write(`${rootPath}/package.json`, serializeJson(templates.packageJson));
  tree.write(`${rootPath}/tsconfig.json`, serializeJson(templates.tsConfig));
  tree.write(`${rootPath}/tsconfig.lib.json`, serializeJson(templates.tsConfigLib));
  tree.write(`${rootPath}/.babelrc.json`, serializeJson(templates.babelConfig));
  tree.write(`${rootPath}/jest.config.js`, templates.jestConfig);
  tree.write(`${rootPath}/config/api-extractor.json`, serializeJson(templates.apiExtractorConfig));
  tree.write(`${rootPath}/just.config.ts`, templates.justConfig);

  tree.write(`${rootPath}/.storybook/main.js`, templates.storybook.main);
  tree.write(`${rootPath}/.storybook/preview.js`, templates.storybook.preview);
  tree.write(`${rootPath}/.storybook/tsconfig.json`, serializeJson(templates.storybook.tsConfig));

  // src
  tree.write(`${rootPath}/src/index.ts`, `export const greet = 'hello' `);
  tree.write(
    `${rootPath}/src/index.test.ts`,
    `
    import {greet} from './index';
    describe('test me', () => {
      it('should greet', () => {
        expect(greet).toBe('hello');
      });
    });
  `,
  );

  // cypress

  tree.write(
    `${rootPath}/src/Foo.cy.tsx`,
    stripIndents`
    import * as React from 'react';
    import { mount as mountBase } from '@cypress/react';
    import { FluentProvider } from '@proj/react-provider';
    import { teamsLightTheme } from '@proj/react-theme';

    const mount = (element: JSX.Element) => {
      mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);
    };

    describe('FlatTree', () => {
      it('should have all but first level items hidden', () => {
        mount(<div />);
        cy.get('[data-testid="test"]').should('not.exist');
      });
    });
  `,
  );
  // jest

  tree.write(
    `${rootPath}/src/Foo.test.tsx`,
    stripIndents`
    import { Foo } from './Foo';
    import { OneForTest } from '@proj/react-one-for-test'

    describe('zzz', () => {
      it('should zzz', () => {
        expect(OneForTest).toBe(OneForTest);
      });
    });
  `,
  );

  // stories

  tree.write(
    `${rootPath}/stories/index.stories.tsx`,
    stripIndents`
    import { Meta } from '@storybook/react';
    import { ArrowLeftRegular, ArrowRightRegular, DismissCircleRegular } from '@fluentui/react-icons';

    export { Default } from './Default.stories';
    export default {} as Meta
  `,
  );
  tree.write(
    `${rootPath}/stories/Default.stories.tsx`,
    stripIndents`
    import * as React from 'react';
    import { Text } from '@proj/react-components';
    import { OneCompat } from '@proj/react-one-compat'
    import { OnePreview } from '@proj/react-two-preview'

    export const Default = () => <Text>This is an example of the Text component's usage.</Text>;
  `,
  );
  tree.write(`${rootPath}/stories/Hello.md`, stripIndents``);

  addProjectConfiguration(tree, npmProjectName, {
    root: rootPath,
    sourceRoot: `${rootPath}/src`,
    projectType: 'library',
    tags: ['vNext', 'platform:web'],
  });

  addCodeowner(tree, { owner: 'Mr.Wick', packageName: npmProjectName });

  updateJson(tree, '/tsconfig.base.json', (json: TsConfig) => {
    json.compilerOptions.paths = json.compilerOptions.paths ?? {};
    json.compilerOptions.paths[npmProjectName] = [`${rootPath}/src/index.ts`];
    return json;
  });

  return tree;
}

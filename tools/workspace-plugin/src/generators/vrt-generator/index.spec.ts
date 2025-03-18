import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import {
  Tree,
  writeJson,
  readJson,
  readProjectConfiguration,
  addProjectConfiguration,
  joinPathFragments,
} from '@nx/devkit';
import { setupCodeowners } from '../../utils-testing';

import generator from './index';

describe('visual-regression generator', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    tree = setupCodeowners(tree, { content: '' });
    tree = createLibrary(tree, 'react-text');
  });

  describe(`assertions`, () => {
    it(`should throw error if one wants to add package to non v9 package`, async () => {
      createLibrary(tree, 'react-old', { tags: ['v8'], version: '8.123.4' });
      try {
        await generator(tree, { project: 'react-old', owner: '@microsoft/cxe-prg' });
      } catch (err) {
        expect(err).toMatchInlineSnapshot(`[Error: this generator works only with v9 packages. "react-old" is not!]`);
      }
    });

    it(`should throw error if package already exists`, async () => {
      createLibrary(tree, 'react-one');
      await generator(tree, { project: 'react-one', owner: '@microsoft/cxe-prg' });

      try {
        await generator(tree, { project: 'react-one', owner: '@microsoft/cxe-prg' });
      } catch (err) {
        expect(err).toMatchInlineSnapshot(
          `[Error: Cannot create a new project react-one-visual-regression at packages/react-components/react-one/visual-regression. A project already exists in this directory.]`,
        );
      }
    });
  });

  it('should scaffold react package', async () => {
    await generator(tree, { project: 'react-text', owner: '@microsoft/cxe-prg' });

    const vrtPackage = readProjectConfiguration(tree, 'react-text-visual-regression');

    // vrt library
    expect(tree.children(vrtPackage.root)).toMatchInlineSnapshot(`
      Array [
        "project.json",
        ".eslintrc.json",
        ".storybook",
        "README.md",
        "package.json",
        "src",
        "tsconfig.json",
        "tsconfig.lib.json",
      ]
    `);

    expect(vrtPackage).toMatchInlineSnapshot(`
      Object {
        "$schema": "../../../../node_modules/nx/schemas/project-schema.json",
        "name": "react-text-visual-regression",
        "projectType": "library",
        "root": "packages/react-components/react-text/visual-regression",
        "sourceRoot": "packages/react-components/react-text/visual-regression/src",
        "tags": Array [
          "vNext",
          "platform:web",
          "visual-regression",
        ],
        "targets": Object {
          "build-storybook": Object {
            "command": "storybook build -o dist/storybook --quiet",
            "options": Object {
              "cwd": "{projectRoot}",
            },
          },
          "generate-image-for-vrt": Object {
            "cache": true,
            "command": "rm -rf dist/vrt/actual && storywright  --browsers chromium --url dist/storybook --destpath dist/vrt/actual --waitTimeScreenshot 500 --concurrency 4 --headless true",
            "dependsOn": Array [
              "build-storybook",
            ],
            "inputs": Array [
              "{projectRoot}/src/**/*.stories.tsx",
            ],
            "metadata": Object {
              "help": Object {
                "command": "yarn storywright --help",
                "example": Object {},
              },
            },
            "options": Object {
              "cwd": "{projectRoot}",
            },
            "outputs": Array [
              "{projectRoot}/dist/vrt/actual/**",
            ],
          },
          "storybook": Object {
            "command": "storybook dev",
            "options": Object {
              "cwd": "{projectRoot}",
            },
          },
          "test-vr": Object {
            "dependsOn": Array [
              "build-storybook",
            ],
            "executor": "@fluentui/workspace-plugin:visual-regression",
          },
          "test-vr-cli": Object {
            "command": "visual-regression-assert assert --baselineDir src/__snapshots__ --outputPath dist/vrt",
            "dependsOn": Array [
              "build-storybook",
              "generate-image-for-vrt",
              Object {
                "projects": Array [
                  "visual-regression-assert",
                ],
                "target": "build",
              },
            ],
            "inputs": Array [
              "{projectRoot}/dist/vrt/screenshots/**",
              "{projectRoot}/src/**/*.stories.tsx",
            ],
            "metadata": Object {
              "help": Object {
                "command": "yarn visual-regression-assert --help",
                "example": Object {},
              },
            },
            "options": Object {
              "cwd": "{projectRoot}",
            },
          },
        },
      }
    `);

    const libPackageJson = readJson(tree, `${vrtPackage.root}/package.json`);
    expect(libPackageJson.scripts).toEqual(undefined);
    expect(libPackageJson).toEqual(
      expect.objectContaining({
        name: '@proj/react-text-visual-regression',
        private: true,
        version: '0.0.0',
        dependencies: {
          '@proj/react-text': '*',
          '@proj/visual-regression-utilities': '*',
        },
        devDependencies: {
          '@proj/react-storybook-addon': '*',
          '@proj/scripts-storybook': '*',
        },
      }),
    );

    expect(tree.read(`${vrtPackage.root}/src/index.ts`, 'utf-8')).toMatchInlineSnapshot(`
      "export {};
      "
    `);

    expect(readJson(tree, `${vrtPackage.root}/tsconfig.json`)).toEqual(
      expect.objectContaining({ extends: '../../../../tsconfig.base.json' }),
    );

    expect(readJson(tree, `${vrtPackage.root}/tsconfig.lib.json`)).toMatchInlineSnapshot(`
      Object {
        "compilerOptions": Object {
          "inlineSources": true,
          "lib": Array [
            "ES2019",
            "dom",
          ],
          "outDir": "../../../../dist/out-tsc",
          "types": Array [
            "node",
          ],
        },
        "exclude": Array [
          "jest.config.ts",
          "src/**/*.spec.ts",
          "src/**/*.test.ts",
        ],
        "extends": "./tsconfig.json",
        "include": Array [
          "src/**/*.ts",
          "src/**/*.tsx",
        ],
      }
    `);

    expect(tree.read(`${vrtPackage.root}/README.md`, 'utf-8')).toMatchInlineSnapshot(`
      "# @proj/react-text-visual-regression

      This library was generated with [Nx](https://nx.dev).

      ## Building

      Run \`nx build react-text-visual-regression\` to build the library.

      ## Running unit tests

      Run \`nx test react-text-visual-regression\` to execute the unit tests via [Jest](https://jestjs.io).

      ## About

      Free, Secure and OSS VR testing solution based on:

      - Storybook to author VR scenarios
      - StoryWright for capturing Stories and their interactions
      - PlayWright test for running diffing and updating baseline

      **Usage:**

      - uses new VRT CLI with configured caching:

      \`yarn react-text-visual-regression:test-vr-cli\`

      - DEPRECATED: uses custom nx generator ( under the hood uses playwright )

      \`yarn react-text-visual-regression:test-vr\`
      "
    `);

    expect(readJson(tree, `${vrtPackage.root}/.eslintrc.json`)).toMatchInlineSnapshot(`
      Object {
        "extends": Array [
          "../../../../eslintrc.json",
        ],
        "ignorePatterns": Array [
          "!**/*",
        ],
        "overrides": Array [
          Object {
            "files": Array [
              "*.ts",
              "*.tsx",
              "*.js",
              "*.jsx",
            ],
            "rules": Object {},
          },
          Object {
            "files": Array [
              "*.ts",
              "*.tsx",
            ],
            "rules": Object {},
          },
          Object {
            "files": Array [
              "*.js",
              "*.jsx",
            ],
            "rules": Object {},
          },
          Object {
            "files": Array [
              "*.json",
            ],
            "parser": "jsonc-eslint-parser",
            "rules": Object {
              "@nx/dependency-checks": Array [
                "error",
                Object {
                  "ignoredFiles": Array [
                    "{projectRoot}/eslint.config.{js,cjs,mjs}",
                  ],
                },
              ],
            },
          },
        ],
      }
    `);
  });
});

function createLibrary(
  tree: Tree,
  project: string,
  options: Partial<{ root: string; version: string; tags: string[] }> = {},
) {
  const _options = {
    version: '9.0.0',
    tags: ['vNext', ...(options.tags ?? [])],
    ...options,
  };

  const projectName = project;
  const npmProjectName = '@proj/' + projectName;
  const root = `packages/react-components/${project}`;

  addProjectConfiguration(tree, projectName, { root, tags: _options.tags });

  writeJson(tree, joinPathFragments(root, 'package.json'), {
    name: npmProjectName,
    version: _options.version,
  });

  return tree;
}

import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import {
  Tree,
  stripIndents,
  writeJson,
  updateJson,
  visitNotIgnoredFiles,
  readJson,
  addProjectConfiguration,
  getProjects,
} from '@nrwl/devkit';

import generator from './index';
import { MigrateScriptsToPkgGeneratorSchema } from './schema';

describe('migrate-scripts-to-pkg generator', () => {
  let tree: Tree;
  const options: MigrateScriptsToPkgGeneratorSchema = {};

  function setup() {
    addProjectConfiguration(tree, '@fluentui/scripts', { root: 'scripts', projectType: 'library' });
    // setup globals
    writeJson(tree, '/lerna.json', {
      packages: [
        'apps/*',
        'packages/*',
        'packages/react-components/*',
        'scripts',
        'packages/fluentui/*',
        'tools',
        'typings',
      ],
      npmClient: 'yarn',
      useWorkspaces: true,
      version: '0.0.0',
    });
    updateJson(tree, '/package.json', json => {
      json.workspaces = {
        packages: [
          'apps/*',
          'packages/*',
          'packages/fluentui/*',
          'packages/react-components/*',
          'scripts',
          'tools',
          'typings',
        ],
        nohoist: ['@fluentui/web-components/@storybook/html'],
      };
      return json;
    });

    tree.write(
      '/dangerfile.ts',
      stripIndents`
     import {foo} from '@fluentui/scripts/dangerjs'

     foo();
    `,
    );

    tree.write(
      '/.storybook/main.js',
      stripIndents`
      const { hello } = require('@fluentui/scripts/lib-one');

      module.exports = {
        stories: [],
      };
    `,
    );

    // setup scripts/ root
    writeJson(tree, '/scripts/tsconfig.json', {
      include: [],
      files: [],
      references: [],
    });
    writeJson(tree, '/scripts/package.json', {});
    tree.write(
      '/scripts/jest.config.js',
      stripIndents`
    module.exports = {
      displayName: 'scripts',
    }
    `,
    );

    // setup scripts sub-folders
    tree.write(
      'scripts/lib-one/index.js',
      stripIndents`
          module.exports = {
            ...require('./hello')
          }
        `,
    );
    tree.write(
      'scripts/lib-one/hello.js',
      stripIndents`
         const { hello: hello3 } = require('../lib-three');
         const path = require('path');
         exports.hello = function hello(){}
        `,
    );
    writeJson(tree, 'scripts/lib-one/tsconfig.json', {
      extends: '../tsconfig.json',
      compilerOptions: {
        types: ['node', 'jest'],
      },
      include: ['*'],
    });

    tree.write(
      'scripts/lib-two/index.js',
      stripIndents`
          module.exports = {
            ...require('./hello')
          }
        `,
    );
    tree.write(
      'scripts/lib-two/hello.js',
      stripIndents`
        const { hello: hello1 } = require('../lib-one');
         const path = require('path');
         const devkit = require('@scope/devkit');
         exports.hello = function hello(){}
        `,
    );
    writeJson(tree, 'scripts/lib-two/tsconfig.json', {
      extends: '../tsconfig.json',
      compilerOptions: {
        types: ['node', 'jest'],
      },
      include: ['*'],
    });

    tree.write(
      'scripts/lib-three/index.ts',
      stripIndents`
          export { hello } from './hello';
        `,
    );
    tree.write(
      'scripts/lib-three/hello.ts',
      stripIndents`
         import {hello as hello2} from '../lib-two';
         import * as path from 'path';
         import * as fs from 'fs';
         export function hello(){}
        `,
    );
    writeJson(tree, 'scripts/lib-three/tsconfig.json', {
      extends: '../tsconfig.json',
      compilerOptions: {
        types: ['node', 'jest'],
      },
      include: ['*'],
    });

    tree.write(
      'scripts/lib-four-no-barrel/index.js',
      stripIndents`
          const { hello } = require('./hello');
          function main(){
            hello();
          }

          main();
        `,
    );
    tree.write(
      'scripts/lib-four-no-barrel/hello.js',
      stripIndents`
        const { hello: hello2 } = require('../lib-two');
         const path = require('path');
         const fs = require('fs');
         exports.hello = function hello(){}
        `,
    );
    writeJson(tree, 'scripts/lib-four-no-barrel/tsconfig.json', {
      extends: '../tsconfig.json',
      compilerOptions: {
        types: ['node', 'jest'],
      },
      include: ['*'],
    });
  }
  function setupPackages() {
    tree.write('packages/react-one/src/index.ts', stripIndents`export {Button} from './button'`);
    tree.write(
      'packages/react-one/tool.config.js',
      stripIndents`
          const {hello} = require('@fluentui/scripts/lib-one');
          const {hello: hello2} = require('@fluentui/scripts/lib-two');
        `,
    );
    writeJson(tree, 'packages/react-one/config/api-extractor.json', {
      extends: '@fluentui/scripts/api-extractor/api-extractor.common.json',
    });
    writeJson(tree, 'packages/react-one/package.json', {
      name: `@proj/react-one`,
      devDependencies: { '@fluentui/scripts': '*' },
    });

    tree.write(
      'packages/react-v0/tool.config.ts',
      stripIndents`
          import { hello } from '@fluentui/scripts/lib-three';
          import {hello as  hello2} from '@fluentui/scripts/lib-two';
        `,
    );
    tree.write(
      'packages/react-v0/gulpfile.ts',
      stripIndents`
    import '../../gulpfile';
    `,
    );
    writeJson(tree, 'packages/react-v0/package.json', {
      name: `@proj/react-v0`,
      devDependencies: { '@fluentui/scripts': '*' },
    });

    tree.write(
      'packages/react-no-direct-import/src/index.ts',
      stripIndents`
          import * as path from 'path';
          import * fs path from 'fs';
          export function hello(){}
        `,
    );
    writeJson(tree, 'packages/react-no-direct-import/package.json', {
      name: `@proj/react-v0`,
      devDependencies: { '@fluentui/scripts': '*' },
    });

    tree.write(
      'apps/todo-app/config.ts',
      stripIndents`
         import { hello } from '@fluentui/scripts/lib-three';
        `,
    );
    writeJson(tree, 'apps/todo-app/package.json', {
      name: `@proj/todo-app`,
      devDependencies: { '@fluentui/scripts': '*' },
    });
  }

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    setup();
    setupPackages();
  });

  it(`should update lerna and package.json`, async () => {
    await generator(tree, options);

    expect(readJson(tree, '/package.json').workspaces).toMatchInlineSnapshot(`
      Object {
        "nohoist": Array [
          "@fluentui/web-components/@storybook/html",
        ],
        "packages": Array [
          "apps/*",
          "packages/*",
          "packages/fluentui/*",
          "packages/react-components/*",
          "scripts/*",
          "tools",
          "typings",
        ],
      }
    `);
    expect(readJson(tree, '/package.json').dependencies).toMatchInlineSnapshot(`Object {}`);
    expect(readJson(tree, '/package.json').devDependencies).toMatchInlineSnapshot(`Object {}`);
    expect(readJson(tree, '/lerna.json').packages).toMatchInlineSnapshot(`
      Array [
        "apps/*",
        "packages/*",
        "packages/react-components/*",
        "scripts/*",
        "packages/fluentui/*",
        "tools",
        "typings",
      ]
    `);
  });

  it(`should remove all config files in existing /scripts`, async () => {
    const childrenPaths = tree.children('/scripts').map(p => `/scripts/${p}`);

    let foldersOnly = childrenPaths.every(p => tree.isFile(p) === false);
    expect(foldersOnly).toBe(false);

    await generator(tree, options);

    foldersOnly = childrenPaths.every(p => tree.isFile(p) === false);

    expect(foldersOnly).toBe(true);
  });

  it(`should update workspace.json`, async () => {
    expect(getProjects(tree).get('@fluentui/scripts')).toBeDefined();

    await generator(tree, options);

    expect(getProjects(tree).get('@fluentui/scripts')).not.toBeDefined();
    expect(getProjects(tree)).toMatchInlineSnapshot(`
      Map {
        "@fluentui/scripts-lib-four-no-barrel" => Object {
          "projectType": "library",
          "root": "scripts/lib-four-no-barrel",
          "sourceRoot": "scripts/lib-four-no-barrel",
          "tags": Array [
            "tools",
          ],
        },
        "@fluentui/scripts-lib-one" => Object {
          "projectType": "library",
          "root": "scripts/lib-one",
          "sourceRoot": "scripts/lib-one/src",
          "tags": Array [
            "tools",
          ],
        },
        "@fluentui/scripts-lib-three" => Object {
          "projectType": "library",
          "root": "scripts/lib-three",
          "sourceRoot": "scripts/lib-three/src",
          "tags": Array [
            "tools",
          ],
        },
        "@fluentui/scripts-lib-two" => Object {
          "projectType": "library",
          "root": "scripts/lib-two",
          "sourceRoot": "scripts/lib-two/src",
          "tags": Array [
            "tools",
          ],
        },
      }
    `);
  });

  describe(`file generation`, () => {
    it(`should generate new configs`, async () => {
      await generator(tree, options);

      expect(readDirectory(tree, 'scripts/lib-one')).toMatchInlineSnapshot(`
        Array [
          "scripts/lib-one/tsconfig.json",
          "scripts/lib-one/src/index.js",
          "scripts/lib-one/src/hello.js",
          "scripts/lib-one/package.json",
          "scripts/lib-one/tsconfig.lib.json",
          "scripts/lib-one/tsconfig.spec.json",
          "scripts/lib-one/jest.config.js",
          "scripts/lib-one/.eslintrc.json",
        ]
      `);
      expect(readJson(tree, 'scripts/lib-one/.eslintrc.json')).toMatchInlineSnapshot(`
        Object {
          "extends": Array [
            "plugin:@fluentui/eslint-plugin/node",
            "plugin:@fluentui/eslint-plugin/imports",
          ],
          "overrides": Array [
            Object {
              "files": "src/index.d.ts",
              "rules": Object {
                "import/no-self-import": "off",
              },
            },
          ],
          "root": true,
          "rules": Object {
            "@fluentui/max-len": "off",
            "import/no-extraneous-dependencies": Array [
              "error",
              Object {
                "packageDir": Array [
                  ".",
                  "../../",
                ],
              },
            ],
          },
        }
      `);
      expect(tree.read('scripts/lib-one/jest.config.js', 'utf-8')).toMatchInlineSnapshot(`
        "// @ts-check

        /**
        * @type {import('@jest/types').Config.InitialOptions}
        */
        module.exports = {
        displayName: 'scripts-lib-one',
        preset: '../../jest.preset.js',
        transform: {
        '^.+\\\\\\\\.tsx?$': 'babel-jest',
        },
        coverageDirectory: './coverage',
        testEnvironment: 'node',
        };"
      `);
      expect(readJson(tree, 'scripts/lib-one/tsconfig.json')).toMatchInlineSnapshot(`
        Object {
          "compilerOptions": Object {
            "allowJs": true,
            "checkJs": true,
            "noEmit": true,
            "noUnusedLocals": true,
            "pretty": true,
            "sourceMap": true,
            "target": "ES2019",
          },
          "extends": "@tsconfig/node14/tsconfig.json",
          "files": Array [],
          "include": Array [],
          "references": Array [
            Object {
              "path": "./tsconfig.lib.json",
            },
            Object {
              "path": "./tsconfig.spec.json",
            },
          ],
        }
      `);
      expect(readJson(tree, 'scripts/lib-one/tsconfig.lib.json')).toMatchInlineSnapshot(`
        Object {
          "compilerOptions": Object {
            "lib": Array [
              "ES2019",
            ],
            "noEmit": false,
            "outDir": "../../dist/out-tsc",
            "types": Array [
              "node",
              "jest",
            ],
          },
          "exclude": Array [
            "**/*.spec.ts",
            "**/*.test.ts",
          ],
          "extends": "./tsconfig.json",
          "include": Array [
            "./src/**/*.ts",
            "./src/**/*.js",
          ],
        }
      `);
      expect(readJson(tree, 'scripts/lib-one/tsconfig.spec.json')).toMatchInlineSnapshot(`
        Object {
          "compilerOptions": Object {
            "module": "CommonJS",
            "outDir": "dist",
            "types": Array [
              "jest",
              "node",
            ],
          },
          "extends": "./tsconfig.json",
          "include": Array [
            "**/*.spec.ts",
            "**/*.test.ts",
            "**/*.d.ts",
          ],
        }
      `);

      expect(readDirectory(tree, 'scripts/lib-two')).toMatchInlineSnapshot(`
        Array [
          "scripts/lib-two/tsconfig.json",
          "scripts/lib-two/src/index.js",
          "scripts/lib-two/src/hello.js",
          "scripts/lib-two/package.json",
          "scripts/lib-two/tsconfig.lib.json",
          "scripts/lib-two/tsconfig.spec.json",
          "scripts/lib-two/jest.config.js",
          "scripts/lib-two/.eslintrc.json",
        ]
      `);
      expect(readDirectory(tree, 'scripts/lib-three')).toMatchInlineSnapshot(`
        Array [
          "scripts/lib-three/tsconfig.json",
          "scripts/lib-three/src/index.ts",
          "scripts/lib-three/src/hello.ts",
          "scripts/lib-three/package.json",
          "scripts/lib-three/tsconfig.lib.json",
          "scripts/lib-three/tsconfig.spec.json",
          "scripts/lib-three/jest.config.js",
          "scripts/lib-three/.eslintrc.json",
        ]
      `);

      expect(readDirectory(tree, 'scripts/lib-four-no-barrel')).toMatchInlineSnapshot(`
        Array [
          "scripts/lib-four-no-barrel/index.js",
          "scripts/lib-four-no-barrel/hello.js",
          "scripts/lib-four-no-barrel/tsconfig.json",
          "scripts/lib-four-no-barrel/package.json",
          "scripts/lib-four-no-barrel/tsconfig.lib.json",
          "scripts/lib-four-no-barrel/tsconfig.spec.json",
          "scripts/lib-four-no-barrel/jest.config.js",
          "scripts/lib-four-no-barrel/.eslintrc.json",
        ]
      `);
      expect(tree.read('scripts/lib-four-no-barrel/jest.config.js', 'utf-8')).toMatchInlineSnapshot(`
        "// @ts-check

        /**
        * @type {import('@jest/types').Config.InitialOptions}
        */
        module.exports = {
        displayName: 'scripts-lib-four-no-barrel',
        preset: '../../jest.preset.js',
        transform: {
        '^.+\\\\\\\\.tsx?$': 'babel-jest',
        },
        coverageDirectory: './coverage',
        testEnvironment: 'node',
        };"
      `);
      expect(readJson(tree, 'scripts/lib-four-no-barrel/.eslintrc.json')).toMatchInlineSnapshot(`
        Object {
          "extends": Array [
            "plugin:@fluentui/eslint-plugin/node",
            "plugin:@fluentui/eslint-plugin/imports",
          ],
          "overrides": Array [
            Object {
              "files": "index.d.ts",
              "rules": Object {
                "import/no-self-import": "off",
              },
            },
          ],
          "root": true,
          "rules": Object {
            "@fluentui/max-len": "off",
            "import/no-extraneous-dependencies": Array [
              "error",
              Object {
                "packageDir": Array [
                  ".",
                  "../../",
                ],
              },
            ],
          },
        }
      `);
      expect(readJson(tree, 'scripts/lib-four-no-barrel/tsconfig.json')).toMatchInlineSnapshot(`
        Object {
          "compilerOptions": Object {
            "allowJs": true,
            "checkJs": true,
            "noEmit": true,
            "noUnusedLocals": true,
            "pretty": true,
            "sourceMap": true,
            "target": "ES2019",
          },
          "extends": "@tsconfig/node14/tsconfig.json",
          "files": Array [],
          "include": Array [],
          "references": Array [
            Object {
              "path": "./tsconfig.lib.json",
            },
            Object {
              "path": "./tsconfig.spec.json",
            },
          ],
        }
      `);
      expect(readJson(tree, 'scripts/lib-four-no-barrel/tsconfig.lib.json')).toMatchInlineSnapshot(`
        Object {
          "compilerOptions": Object {
            "lib": Array [
              "ES2019",
            ],
            "noEmit": false,
            "outDir": "../../dist/out-tsc",
            "types": Array [
              "node",
              "jest",
            ],
          },
          "exclude": Array [
            "**/*.spec.ts",
            "**/*.test.ts",
          ],
          "extends": "./tsconfig.json",
          "include": Array [
            "./**/*.ts",
            "./**/*.js",
          ],
        }
      `);
      expect(readJson(tree, 'scripts/lib-four-no-barrel/tsconfig.spec.json')).toMatchInlineSnapshot(`
        Object {
          "compilerOptions": Object {
            "module": "CommonJS",
            "outDir": "dist",
            "types": Array [
              "jest",
              "node",
            ],
          },
          "extends": "./tsconfig.json",
          "include": Array [
            "**/*.spec.ts",
            "**/*.test.ts",
            "**/*.d.ts",
          ],
        }
      `);
    });
  });

  describe(`AST`, () => {
    it(`should replace relative imports with new package imports within /scripts`, async () => {
      await generator(tree, options);
      expect(tree.read('scripts/lib-one/src/hello.js', 'utf-8')).toMatchInlineSnapshot(`
        "const { hello: hello3 } = require('@fluentui/scripts-lib-three');
        const path = require('path');
        exports.hello = function hello(){}"
      `);
      expect(readJson(tree, 'scripts/lib-one/package.json').dependencies).toEqual({
        '@fluentui/scripts-lib-three': '*',
      });

      expect(tree.read('scripts/lib-two/src/hello.js', 'utf-8')).toMatchInlineSnapshot(`
        "const { hello: hello1 } = require('@fluentui/scripts-lib-one');
        const path = require('path');
        const devkit = require('@scope/devkit');
        exports.hello = function hello(){}"
      `);
      expect(readJson(tree, 'scripts/lib-two/package.json').dependencies).toEqual({
        '@fluentui/scripts-lib-one': '*',
      });

      expect(tree.read('scripts/lib-three/src/hello.ts', 'utf-8')).toMatchInlineSnapshot(`
        "import {hello as hello2} from '@fluentui/scripts-lib-two';
        import * as path from 'path';
        import * as fs from 'fs';
        export function hello(){}"
      `);
      expect(readJson(tree, 'scripts/lib-three/package.json').dependencies).toEqual({
        '@fluentui/scripts-lib-two': '*',
      });

      expect(tree.read('scripts/lib-four-no-barrel/hello.js', 'utf-8')).toMatchInlineSnapshot(`
        "const { hello: hello2 } = require('@fluentui/scripts-lib-two');
        const path = require('path');
        const fs = require('fs');
        exports.hello = function hello(){}"
      `);
      expect(readJson(tree, 'scripts/lib-four-no-barrel/package.json').dependencies).toEqual({
        '@fluentui/scripts-lib-two': '*',
      });
    });

    it(`should replace absolute imports outside /scripts and update devDependencies`, async () => {
      await generator(tree, options);

      expect(tree.read('/dangerfile.ts', 'utf-8')).toMatchInlineSnapshot(`
        "import {foo} from '@fluentui/scripts-dangerjs'

        foo();"
      `);

      expect(tree.read('/.storybook/main.js', 'utf-8')).toMatchInlineSnapshot(`
        "const { hello } = require('@fluentui/scripts-lib-one');

        module.exports = {
        stories: [],
        };"
      `);

      expect(tree.read('packages/react-one/tool.config.js', 'utf-8')).toMatchInlineSnapshot(`
        "const {hello} = require('@fluentui/scripts-lib-one');
        const {hello: hello2} = require('@fluentui/scripts-lib-two');"
      `);
      expect(readJson(tree, 'packages/react-one/config/api-extractor.json')).toMatchInlineSnapshot(`
        Object {
          "extends": "@fluentui/scripts-api-extractor/api-extractor.common.json",
        }
      `);
      expect(readJson(tree, 'packages/react-one/package.json').devDependencies).toEqual({
        '@fluentui/scripts-lib-one': '*',
        '@fluentui/scripts-lib-two': '*',
        '@fluentui/scripts-api-extractor': '*',
      });

      expect(tree.read('packages/react-v0/tool.config.ts', 'utf-8')).toMatchInlineSnapshot(`
        "import { hello } from '@fluentui/scripts-lib-three';
        import {hello as  hello2} from '@fluentui/scripts-lib-two';"
      `);
      expect(readJson(tree, 'packages/react-v0/package.json').devDependencies).toEqual({
        '@fluentui/scripts-lib-two': '*',
        '@fluentui/scripts-lib-three': '*',
        '@fluentui/scripts-gulp': '*',
      });

      expect(readJson(tree, 'packages/react-no-direct-import/package.json').devDependencies).toEqual({});

      expect(tree.read('apps/todo-app/config.ts', 'utf-8')).toMatchInlineSnapshot(
        `"import { hello } from '@fluentui/scripts-lib-three';"`,
      );
      expect(readJson(tree, 'apps/todo-app/package.json').devDependencies).toEqual({
        '@fluentui/scripts-lib-three': '*',
      });
    });
  });
});

function readDirectory(tree: Tree, dirPath: string) {
  const paths: string[] = [];

  visitNotIgnoredFiles(tree, dirPath, path => {
    paths.push(path);
  });

  return paths;
}

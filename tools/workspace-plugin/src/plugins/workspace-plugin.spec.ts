import { CreateNodesContext, CreateNodesResultV2, ProjectConfiguration, serializeJson } from '@nx/devkit';

import { TempFs } from './testing-utils/index';
import { createNodesV2 } from './workspace-plugin';
import { PackageJson } from '../types';

describe(`workspace-plugin`, () => {
  const [, createNodesFunction] = createNodesV2;
  let context: CreateNodesContext;
  let tempFs: TempFs;
  let cwd: string;

  beforeEach(async () => {
    tempFs = new TempFs('test');
    cwd = process.cwd();
    process.chdir(tempFs.tempDir);

    context = {
      nxJsonConfiguration: {
        namedInputs: {
          default: ['{projectRoot}/**/*'],
          production: ['!{projectRoot}/**/*.spec.ts'],
        },
      },
      workspaceRoot: tempFs.tempDir,

      configFiles: [],
    };
  });

  afterEach(() => {
    jest.resetModules();
    tempFs.cleanup();
    process.chdir(cwd);
  });

  it('should create nodes with clean,format targets for any project', async () => {
    await tempFs.createFiles({
      'proj/project.json': serializeJson({}),
      'proj/package.json': serializeJson({}),
    });
    const results = await createNodesFunction(['proj/project.json'], {}, context);

    expect(getTargetsNames(results)).toEqual(['clean', 'format', 'type-check']);
  });

  it('should add lint,test task only if configuration exists', async () => {
    await tempFs.createFiles({
      'proj/project.json': serializeJson({}),
      'proj/package.json': serializeJson({}),
      'proj/.eslintrc.json': '{}',
      'proj/jest.config.js': 'module.exports = {}',
    });
    const results = await createNodesFunction(['proj/project.json'], {}, context);
    const targets = getTargets(results);

    expect(targets?.lint).toMatchInlineSnapshot(`
      Object {
        "cache": true,
        "command": "yarn eslint src",
        "inputs": Array [
          "default",
          "{projectRoot}/.eslintrc.json",
          "{projectRoot}/.eslintrc.js",
          "{workspaceRoot}/.eslintrc.json",
          "{workspaceRoot}/.eslintignore",
          "{workspaceRoot}/eslint.config.js",
          Object {
            "externalDependencies": Array [
              "eslint",
            ],
          },
        ],
        "metadata": Object {
          "description": "Runs ESLint on project",
          "help": Object {
            "command": "yarn eslint --help",
            "example": Object {
              "options": Object {
                "max-warnings": 0,
              },
            },
          },
          "technologies": Array [
            "eslint",
          ],
        },
        "options": Object {
          "cwd": "proj",
        },
        "outputs": Array [
          "{options.outputFile}",
        ],
      }
    `);

    expect(targets?.test).toMatchInlineSnapshot(`
      Object {
        "cache": true,
        "command": "yarn jest",
        "inputs": Array [
          "default",
          "^production",
          "{workspaceRoot}/jest.preset.js",
          Object {
            "externalDependencies": Array [
              "jest",
            ],
          },
        ],
        "metadata": Object {
          "description": "Run Jest Tests",
          "help": Object {
            "command": "yarn jest --help",
            "example": Object {
              "options": Object {
                "coverage": true,
              },
            },
          },
          "technologies": Array [
            "jest",
          ],
        },
        "options": Object {
          "cwd": "proj",
          "passWithNoTests": true,
        },
        "outputs": Array [
          "{projectRoot}/coverage",
        ],
      }
    `);
  });

  describe(`v9 project nodes`, () => {
    it('should create default nodes for v9 library project', async () => {
      await tempFs.createFiles({
        'proj/library/project.json': serializeJson({
          root: 'proj',
          name: 'proj',
          projectType: 'library',
          tags: ['vNext'],
        } satisfies ProjectConfiguration),
        'proj/library/package.json': serializeJson({
          name: '@proj/proj',
          private: true,
        } satisfies Partial<PackageJson>),
        'proj/stories/project.json': serializeJson({
          root: 'proj/stories',
          name: 'proj-stories',
        } satisfies ProjectConfiguration),
      });
      const results = await createNodesFunction(['proj/library/project.json'], {}, context);

      expect(getTargetsNames(results, 'proj/library')).toEqual([
        'clean',
        'format',
        'type-check',
        'generate-api',
        'build',
        'storybook',
        'start',
      ]);

      expect(results).toMatchInlineSnapshot(`
        Array [
          Array [
            "proj/library/project.json",
            Object {
              "projects": Object {
                "proj/library": Object {
                  "targets": Object {
                    "build": Object {
                      "cache": true,
                      "executor": "@fluentui/workspace-plugin:build",
                      "inputs": Array [
                        "{projectRoot}/package.json",
                        "{projectRoot}/.swcrc",
                        "{projectRoot}/config/api-extractor.json",
                        "{projectRoot}/tsconfig.json",
                        "{projectRoot}/tsconfig.lib.json",
                        "{projectRoot}/src/**/*.tsx?",
                        Object {
                          "externalDependencies": Array [
                            "@microsoft/api-extractor",
                            "typescript",
                          ],
                        },
                        Object {
                          "externalDependencies": Array [
                            "@swc/core",
                            "@microsoft/api-extractor",
                            "typescript",
                          ],
                        },
                      ],
                      "metadata": Object {
                        "help": Object {
                          "command": "yarn nx run proj:build --help",
                          "example": Object {},
                        },
                        "technologies": Array [
                          "swc",
                          "typescript",
                          "api-extractor",
                        ],
                      },
                      "options": Object {
                        "moduleOutput": Array [
                          Object {
                            "module": "es6",
                            "outputPath": "lib",
                          },
                          Object {
                            "module": "commonjs",
                            "outputPath": "lib-commonjs",
                          },
                        ],
                        "outputPathRoot": "{projectRoot}",
                        "sourceRoot": "src",
                      },
                      "outputs": Array [
                        "{projectRoot}/lib",
                        "{projectRoot}/lib-commonjs",
                        "{projectRoot}/dist",
                        "{projectRoot}/dist/index.d.ts",
                        "{projectRoot}/etc/proj.api.md",
                      ],
                    },
                    "clean": Object {
                      "executor": "@fluentui/workspace-plugin:clean",
                    },
                    "format": Object {
                      "cache": true,
                      "command": "prettier --write {projectRoot}",
                      "configurations": Object {
                        "check": Object {
                          "command": "prettier --check {projectRoot}",
                        },
                      },
                      "inputs": Array [
                        "default",
                        "{workspaceRoot}/.prettierignore",
                        "{workspaceRoot}/prettier.config.js",
                        "{workspaceRoot}/prettier.config.json",
                        "{projectRoot}/**",
                      ],
                      "metadata": Object {
                        "description": "Format code with prettier",
                        "help": Object {
                          "command": "yarn prettier --help",
                          "example": Object {},
                        },
                        "technologies": Array [
                          "prettier",
                        ],
                      },
                    },
                    "generate-api": Object {
                      "cache": true,
                      "executor": "@fluentui/workspace-plugin:generate-api",
                      "inputs": Array [
                        "{projectRoot}/config/api-extractor.json",
                        "{projectRoot}/tsconfig.json",
                        "{projectRoot}/tsconfig.lib.json",
                        "{projectRoot}/src/**/*.tsx?",
                        Object {
                          "externalDependencies": Array [
                            "@microsoft/api-extractor",
                            "typescript",
                          ],
                        },
                      ],
                      "metadata": Object {
                        "help": Object {
                          "command": "yarn nx run proj:generate-api --help",
                          "example": Object {},
                        },
                        "technologies": Array [
                          "typescript",
                          "api-extractor",
                        ],
                      },
                      "outputs": Array [
                        "{projectRoot}/dist/index.d.ts",
                        "{projectRoot}/etc/proj.api.md",
                      ],
                    },
                    "start": Object {
                      "cache": true,
                      "command": "nx run proj-stories:storybook",
                    },
                    "storybook": Object {
                      "cache": true,
                      "command": "nx run proj-stories:storybook",
                    },
                    "type-check": Object {
                      "cache": true,
                      "executor": "@fluentui/workspace-plugin:type-check",
                      "inputs": Array [
                        "default",
                        "{projectRoot}/tsconfig.json",
                        "{projectRoot}/tsconfig.*.json",
                      ],
                      "metadata": Object {
                        "description": "Type check code with TypeScript",
                        "technologies": Array [
                          "typescript",
                        ],
                      },
                    },
                  },
                },
              },
            },
          ],
        ]
      `);
    });

    it('should create default nodes for v9 stories project', async () => {
      await tempFs.createFiles({
        'proj/stories/.storybook/main.js': '',
        'proj/stories/project.json': serializeJson({
          root: 'proj/stories',
          projectType: 'library',
          tags: ['vNext', 'type:stories'],
        } satisfies ProjectConfiguration),
        'proj/stories/package.json': serializeJson({
          name: '@proj/proj-stories',
          private: true,
        } satisfies Partial<PackageJson>),
      });
      const results = await createNodesFunction(['proj/stories/project.json'], {}, context);

      expect(getTargetsNames(results, 'proj/stories')).toEqual([
        'clean',
        'format',
        'type-check',
        'storybook',
        'test-ssr',
        'start',
      ]);

      const targets = getTargets(results, 'proj/stories');

      expect(targets?.storybook).toMatchInlineSnapshot(`
        Object {
          "cache": true,
          "command": "yarn storybook dev",
          "inputs": Array [
            "production",
            "{workspaceRoot}/.storybook/**",
            "{projectRoot}/.storybook/**",
            Object {
              "externalDependencies": Array [
                "storybook",
              ],
            },
          ],
          "metadata": Object {
            "help": Object {
              "command": "yarn storybook dev --help",
              "example": Object {},
            },
            "technologies": Array [
              "storybook",
            ],
          },
          "options": Object {
            "cwd": "proj/stories",
          },
        }
      `);
      expect(targets?.['test-ssr']).toMatchInlineSnapshot(`
        Object {
          "cache": true,
          "command": "yarn test-ssr \\"./src/**/*.stories.tsx\\"",
          "metadata": Object {
            "help": Object {
              "command": "yarn test-ssr --help",
              "example": Object {},
            },
            "technologies": Array [
              "test-ssr",
            ],
          },
          "options": Object {
            "cwd": "proj/stories",
          },
        }
      `);
    });

    it('should add verify-packaging task only if package is not private', async () => {
      await tempFs.createFiles({
        'proj/project.json': serializeJson({
          root: 'proj',
          projectType: 'library',
          tags: ['vNext'],
        } satisfies ProjectConfiguration),
        'proj/package.json': serializeJson({ name: '@proj/proj' } satisfies Partial<PackageJson>),
      });
      const results = await createNodesFunction(['proj/project.json'], {}, context);
      const targets = getTargets(results);

      expect(targets?.['verify-packaging']).toMatchInlineSnapshot(`
        Object {
          "executor": "@fluentui/workspace-plugin:verify-packaging",
        }
      `);
    });
  });
});

function getTargets(results: CreateNodesResultV2, projRoot = 'proj') {
  return results[0][1].projects?.[projRoot].targets;
}
function getTargetsNames(results: CreateNodesResultV2, projRoot = 'proj'): string[] {
  return Object.keys(getTargets(results, projRoot) ?? {});
}

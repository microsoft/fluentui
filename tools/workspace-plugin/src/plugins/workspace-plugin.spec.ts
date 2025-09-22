import { CreateNodesContext, CreateNodesResultV2, ProjectConfiguration, serializeJson } from '@nx/devkit';

import { TempFs } from './testing-utils/index';
import { WorkspacePluginOptions, createNodesV2 } from './workspace-plugin';
import { PackageJson } from '../types';

describe(`workspace-plugin`, () => {
  const [, createNodesFunction] = createNodesV2;
  let context: CreateNodesContext;
  let tempFs: TempFs;
  let cwd: string;
  const options: WorkspacePluginOptions = {
    reactIntegrationTesting: {
      reactVersions: ['17', '18'],
    },
  };

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
    const results = await createNodesFunction(['proj/project.json'], options, context);

    expect(getTargetsNames(results)).toEqual(['clean', 'format', 'type-check']);
  });

  it('should add lint,test task only if configuration exists', async () => {
    await tempFs.createFiles({
      'proj/project.json': serializeJson({}),
      'proj/package.json': serializeJson({}),
      'proj/.eslintrc.json': '{}',
      'proj/jest.config.js': 'module.exports = {}',
    });
    const results = await createNodesFunction(['proj/project.json'], options, context);
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
    describe(`React Integration Tester config`, () => {
      it(`should not create atomized targets if project doesnt have required configurations`, async () => {
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
        });
        const results = await createNodesFunction(['proj/library/project.json'], options, context);

        const targets = getTargets(results, 'proj/library')!;

        expect(targets['react-integration-testing'].dependsOn).toEqual([]);
        expect(targets['react-integration-testing--17']).toBeUndefined();
        expect(targets['react-integration-testing--18']).toBeUndefined();
      });

      it(`should not create atomized targets if project is explicitly excluded via plugin config#exclude`, async () => {
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
            tags: ['type:stories', 'vNext'],
          } satisfies ProjectConfiguration),
        });
        const results = await createNodesFunction(
          ['proj/library/project.json'],
          { reactIntegrationTesting: { exclude: ['proj'], reactVersions: ['17', '18'] } },
          context,
        );

        const targets = getTargets(results, 'proj/library')!;

        expect(targets['react-integration-testing']).toEqual(undefined);
        expect(targets['react-integration-testing--17']).toBeUndefined();
        expect(targets['react-integration-testing--18']).toBeUndefined();
      });

      it(`should create "--type-check" including "--prepare" atomized targets for "stories" projects`, async () => {
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
            tags: ['type:stories', 'vNext'],
          } satisfies ProjectConfiguration),
          'proj/stories/package.json': serializeJson({
            name: '@proj/proj-stories',
            private: true,
          } satisfies Partial<PackageJson>),
        });

        const results = await createNodesFunction(['proj/stories/project.json'], options, context);

        const targets = getTargets(results, 'proj/stories')!;

        expect(targets['react-integration-testing--17--type-check']).toMatchInlineSnapshot(`
          Object {
            "cache": true,
            "command": "yarn rit --project-id ci --react 17 --run type-check --verbose",
            "dependsOn": Array [
              "react-integration-testing--17--prepare",
            ],
            "inputs": Array [
              "default",
              "production",
              "^production",
              "{workspaceRoot}/jest.preset.js",
              "{workspaceRoot}/tools/react-integration-testing/**",
            ],
            "metadata": Object {
              "description": "Run react integration tests against React 17",
              "help": Object {
                "command": "yarn rit --help",
                "example": Object {},
              },
              "technologies": Array [
                "react-integration-tester",
              ],
            },
            "options": Object {
              "cwd": "{projectRoot}",
            },
            "outputs": Array [],
          }
        `);
        expect(targets['react-integration-testing--17--prepare']).toMatchInlineSnapshot(`
          Object {
            "cache": true,
            "command": "yarn rit --prepare-only --no-install --project-id ci --react 17 --verbose",
            "dependsOn": Array [],
            "inputs": Array [
              "default",
              "production",
              "^production",
              "{workspaceRoot}/jest.preset.js",
              "{workspaceRoot}/tools/react-integration-testing/**",
            ],
            "metadata": Object {
              "description": "Run react integration tests against React 17",
              "help": Object {
                "command": "yarn rit --help",
                "example": Object {},
              },
              "technologies": Array [
                "react-integration-tester",
              ],
            },
            "options": Object {
              "cwd": "{projectRoot}",
            },
            "outputs": Array [
              "{workspaceRoot}/tmp/rit/react-17/proj-stories-react-17-ci",
            ],
          }
        `);
      });

      it(`should --run type-check within targets for projects with "stories" sibling projects`, async () => {
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
            tags: ['type:stories', 'vNext'],
          } satisfies ProjectConfiguration),
        });

        const results = await createNodesFunction(['proj/library/project.json'], options, context);

        const targets = getTargets(results, 'proj/library')!;

        expect(targets['react-integration-testing--17--type-check']).toMatchInlineSnapshot(`
          Object {
            "cache": true,
            "dependsOn": Array [
              Object {
                "projects": "proj-stories",
                "target": "react-integration-testing--17--type-check",
              },
            ],
            "executor": "nx:noop",
          }
        `);
        expect(targets['react-integration-testing--17--prepare']).toBeUndefined();
      });

      it(`should --run e2e within targets for projects which have cypress config`, async () => {
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
          'proj/library/cypress.config.ts': `
           import { baseConfig } from '@proj/cypress';

           export default baseConfig;
          `,
        });

        const results = await createNodesFunction(['proj/library/project.json'], options, context);

        const targets = getTargets(results, 'proj/library')!;

        expect(targets['react-integration-testing--17--e2e'].command).toMatchInlineSnapshot(
          `"yarn rit --project-id ci --react 17 --run e2e --verbose"`,
        );
        expect(targets['react-integration-testing--17--prepare']).toBeDefined();
      });
      it(`should --run test within targets for projects which have jest config`, async () => {
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
          'proj/library/jest.config.js': `
            module.exports = {};
          `,
        });

        const results = await createNodesFunction(['proj/library/project.json'], options, context);

        const targets = getTargets(results, 'proj/library')!;

        expect(targets['react-integration-testing--17--test'].command).toMatchInlineSnapshot(
          `"yarn rit --project-id ci --react 17 --run test --verbose"`,
        );
        expect(targets['react-integration-testing--17--prepare']).toBeDefined();
      });
      it(`should create the targets name based on user provided options `, async () => {
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
          'proj/library/jest.config.js': `
            module.exports = {};
          `,
        });

        const results = await createNodesFunction(
          ['proj/library/project.json'],
          { reactIntegrationTesting: { reactVersions: ['17'], targetName: 'rit' } },
          context,
        );

        expect(getTargetsNames(results, 'proj/library')).toEqual(expect.arrayContaining(['rit', 'rit--17--test']));
      });
    });

    it('should create default nodes for v9 library project having stories project sibling', async () => {
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
          tags: ['type:stories', 'vNext'],
        } satisfies ProjectConfiguration),
      });
      const results = await createNodesFunction(['proj/library/project.json'], options, context);

      expect(getTargetsNames(results, 'proj/library')).toEqual([
        'clean',
        'format',
        'type-check',
        'generate-api',
        'build',
        'storybook',
        'start',
        'react-integration-testing--17--type-check',
        'react-integration-testing--18--type-check',
        'react-integration-testing',
      ]);

      expect(results).toMatchInlineSnapshot(`
        Array [
          Array [
            "proj/library/project.json",
            Object {
              "projects": Object {
                "proj/library": Object {
                  "metadata": Object {
                    "targetGroups": Object {
                      "React Integration Tester": Array [
                        "react-integration-testing--17--type-check",
                        "react-integration-testing--18--type-check",
                        "react-integration-testing",
                      ],
                    },
                  },
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
                        "enableGriffelRawStyles": true,
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
                    "react-integration-testing": Object {
                      "cache": true,
                      "dependsOn": Array [
                        Object {
                          "params": "forward",
                          "projects": "proj-stories",
                          "target": "react-integration-testing--17--type-check",
                        },
                        Object {
                          "params": "forward",
                          "projects": "proj-stories",
                          "target": "react-integration-testing--18--type-check",
                        },
                      ],
                      "executor": "nx:noop",
                      "inputs": Array [
                        "default",
                        "production",
                        "^production",
                        "{workspaceRoot}/jest.preset.js",
                        "{workspaceRoot}/tools/react-integration-testing/**",
                      ],
                      "metadata": Object {
                        "description": "Run react integration tests against React 17, 18",
                        "help": Object {
                          "command": "yarn rit --help",
                          "example": Object {},
                        },
                        "technologies": Array [
                          "react-integration-tester",
                        ],
                      },
                      "outputs": Array [],
                    },
                    "react-integration-testing--17--type-check": Object {
                      "cache": true,
                      "dependsOn": Array [
                        Object {
                          "projects": "proj-stories",
                          "target": "react-integration-testing--17--type-check",
                        },
                      ],
                      "executor": "nx:noop",
                    },
                    "react-integration-testing--18--type-check": Object {
                      "cache": true,
                      "dependsOn": Array [
                        Object {
                          "projects": "proj-stories",
                          "target": "react-integration-testing--18--type-check",
                        },
                      ],
                      "executor": "nx:noop",
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
      const results = await createNodesFunction(['proj/stories/project.json'], options, context);

      expect(getTargetsNames(results, 'proj/stories')).toEqual([
        'clean',
        'format',
        'type-check',
        'storybook',
        'test-ssr',
        'start',
        'react-integration-testing',
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
      const results = await createNodesFunction(['proj/project.json'], options, context);
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

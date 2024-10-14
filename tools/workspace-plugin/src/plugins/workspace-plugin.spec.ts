import { CreateNodesContext, ProjectConfiguration, serializeJson } from '@nx/devkit';

import { TempFs } from './testing-utils/index';
import { createNodesV2 } from './workspace-plugin';

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

  it('should create nodes with empty targets for non v9 project', async () => {
    await tempFs.createFiles({
      'proj/project.json': '{}',
      'proj/package.json': '{}',
    });
    const results = await createNodesFunction(['proj/project.json'], {}, context);

    expect(results).toMatchInlineSnapshot(`
      Array [
        Array [
          "proj/project.json",
          Object {
            "projects": Object {
              "proj": Object {
                "targets": Object {},
              },
            },
          },
        ],
      ]
    `);
  });

  it('should create nodes for v9 project', async () => {
    await tempFs.createFiles({
      'proj/project.json': serializeJson({
        root: 'proj',
        projectType: 'library',
        tags: ['vNext'],
      } satisfies ProjectConfiguration),
      'proj/package.json': '{}',
    });
    const results = await createNodesFunction(['proj/project.json'], {}, context);

    expect(Object.keys(results[0][1].projects?.proj.targets ?? {})).toEqual([
      'clean',
      'format',
      'type-check',
      'generate-api',
      'build',
      'start',
      'storybook',
      'verify-packaging',
    ]);

    expect(results).toMatchInlineSnapshot(`
      Array [
        Array [
          "proj/project.json",
          Object {
            "projects": Object {
              "proj": Object {
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
                        "command": "npx nx run undefined:build --help",
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
                      "{projectRoot}/etc/undefined.api.md",
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
                        "command": "npx prettier --help",
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
                        "command": "npx nx run undefined:generate-api --help",
                        "example": Object {},
                      },
                      "technologies": Array [
                        "typescript",
                        "api-extractor",
                      ],
                    },
                    "outputs": Array [
                      "{projectRoot}/dist/index.d.ts",
                      "{projectRoot}/etc/undefined.api.md",
                    ],
                  },
                  "start": Object {
                    "command": "npx storybook",
                    "options": Object {
                      "cwd": "proj",
                    },
                  },
                  "storybook": Object {
                    "cache": true,
                    "command": "npx --cwd ../stories storybook",
                    "metadata": Object {
                      "technologies": Array [
                        "storybook",
                      ],
                    },
                    "options": Object {
                      "cwd": "proj",
                    },
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
                  "verify-packaging": Object {
                    "executor": "@fluentui/workspace-plugin:verify-packaging",
                  },
                },
              },
            },
          },
        ],
      ]
    `);
  });
});

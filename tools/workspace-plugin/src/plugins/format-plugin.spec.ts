import { CreateNodesContext } from '@nx/devkit';

import { TempFs } from './testing-utils/index';
import { createNodesV2 } from './format-plugin';

describe(`format-plugin`, () => {
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

    await tempFs.createFiles({
      'proj/project.json': '{}',
      'proj/package.json': '{}',
    });
  });

  afterEach(() => {
    jest.resetModules();
    tempFs.cleanup();
    process.chdir(cwd);
  });

  it('should create nodes', async () => {
    // await tempFs.createFiles({

    // });
    const results = await createNodesFunction(['proj/project.json'], { targetName: 'format' }, context);

    expect(results).toMatchInlineSnapshot(`
      Array [
        Array [
          "proj/project.json",
          Object {
            "projects": Object {
              "proj": Object {
                "targets": Object {
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
                        "command": "yarn run -TB prettier --help",
                        "example": Object {},
                      },
                      "technologies": Array [
                        "prettier",
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
});

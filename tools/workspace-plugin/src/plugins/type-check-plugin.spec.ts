import { CreateNodesContext } from '@nx/devkit';

import { TempFs } from './testing-utils/index';
import { createNodesV2 } from './type-check-plugin';

describe(`type-check-plugin`, () => {
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
    await tempFs.createFiles({
      'proj/tsconfig.json': `{}`,
      'proj/tsconfig.lib.json': '{}',
      'proj/tsconfig.spec.json': '{}',
    });
    const results = await createNodesFunction(['proj/tsconfig.json'], { targetName: 'type-check' }, context);

    expect(results).toMatchInlineSnapshot(`
      Array [
        Array [
          "proj/tsconfig.json",
          Object {
            "projects": Object {
              "proj": Object {
                "targets": Object {
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
});

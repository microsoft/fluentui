import { CreateNodesContext } from '@nx/devkit';

import { TempFs } from './testing-utils/index';
import { createNodesV2 } from './clean-plugin';

describe(`clean-plugin`, () => {
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
    const results = await createNodesFunction(['proj/project.json'], { targetName: 'clean' }, context);

    expect(results).toMatchInlineSnapshot(`
      Array [
        Array [
          "proj/project.json",
          Object {
            "projects": Object {
              "proj": Object {
                "targets": Object {
                  "clean": Object {
                    "executor": "@fluentui/workspace-plugin:clean",
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

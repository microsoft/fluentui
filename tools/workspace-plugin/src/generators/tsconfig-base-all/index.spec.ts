import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, writeJson, readJson, updateJson } from '@nx/devkit';

import generator from './index';
import { TsconfigBaseAllGeneratorSchema } from './schema';

describe('tsconfig-base-all generator', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};
  let tree: Tree;
  const options: TsconfigBaseAllGeneratorSchema = {};

  beforeEach(() => {
    jest.restoreAllMocks();

    jest.spyOn(console, 'log').mockImplementation(noop);

    tree = createTreeWithEmptyWorkspace();
    writeJson(tree, '/tsconfig.base.v0.json', {
      compilerOptions: {
        paths: {
          '@proj/v0-one': ['packages/v0-one/src/index.ts'],
          '@proj/v0-two': ['packages/v0-two/src/index.ts'],
        },
      },
    });
    writeJson(tree, '/tsconfig.base.v8.json', {
      compilerOptions: {
        paths: {
          '@proj/v8-one': ['packages/v8-one/src/index.ts'],
          '@proj/v8-two': ['packages/v8-two/src/index.ts'],
        },
      },
    });
    writeJson(tree, '/tsconfig.base.json', {
      compilerOptions: {
        paths: {
          '@proj/one': ['packages/one/src/index.ts'],
          '@proj/two': ['packages/two/src/index.ts'],
        },
      },
    });
  });

  it('should run successfully', async () => {
    await generator(tree, options);
    const baseAllJson = readJson(tree, '/tsconfig.base.all.json');

    expect(baseAllJson).toMatchInlineSnapshot(`
      Object {
        "compilerOptions": Object {
          "baseUrl": ".",
          "forceConsistentCasingInFileNames": true,
          "isolatedModules": true,
          "moduleResolution": "node",
          "paths": Object {
            "@proj/one": Array [
              "packages/one/src/index.ts",
            ],
            "@proj/two": Array [
              "packages/two/src/index.ts",
            ],
            "@proj/v0-one": Array [
              "packages/v0-one/src/index.ts",
            ],
            "@proj/v0-two": Array [
              "packages/v0-two/src/index.ts",
            ],
            "@proj/v8-one": Array [
              "packages/v8-one/src/index.ts",
            ],
            "@proj/v8-two": Array [
              "packages/v8-two/src/index.ts",
            ],
          },
          "preserveConstEnums": true,
          "pretty": true,
          "rootDir": ".",
          "skipLibCheck": true,
          "sourceMap": true,
          "typeRoots": Array [
            "node_modules/@types",
            "./typings",
          ],
        },
      }
    `);
  });

  describe(`--verify`, () => {
    it(`should pass if base all config is up to date`, async () => {
      expect.assertions(1);
      await generator(tree, {});

      updateJson(tree, '/tsconfig.base.json', json => {
        json.compilerOptions.paths['@proj/three'] = ['packages/three/src/index.ts'];
        return json;
      });

      await generator(tree, {});

      await expect(generator(tree, { verify: true })).resolves.toBe(undefined);
    });

    it(`should fail if base all config is not up to date`, async () => {
      expect.assertions(1);
      await generator(tree, {});

      updateJson(tree, '/tsconfig.base.json', json => {
        json.compilerOptions.paths['@proj/three'] = ['packages/three/src/index.ts'];
        return json;
      });

      try {
        await generator(tree, { verify: true });
      } catch (err) {
        expect((err as Error).message).toMatchInlineSnapshot(`
          "
                🚨 /tsconfig.base.all.json is out of date.

                Please update it by running  'yarn nx g @fluentui/workspace-plugin:tsconfig-base-all'.
              "
        `);
      }
    });
  });
});

import { join } from 'node:path';

// ==== mock start ====
import { cp } from 'node:fs/promises';
// ==== mock end ====

import { assetGlobsToFiles, copyAssets } from './assets';

jest.mock('node:fs/promises', () => {
  return {
    cp: jest.fn(async () => {
      return;
    }),
  };
});
const cpMock = cp as jest.Mock;

describe(`assets`, () => {
  const rootDir = join(__dirname, '../__fixtures__/assets');
  it(`should copy assets in string or glob format`, async () => {
    const actual = await copyAssets(
      assetGlobsToFiles(
        [
          'libs/proj/world.md',
          {
            input: 'libs/proj',
            output: 'copied-assets',
            glob: '*.txt',
          },
        ],
        rootDir,
        'libs/proj/dist',
      ),
    );

    expect(actual).toBe(true);
    expect(cpMock.mock.calls.flat()).toEqual([
      // from
      `${rootDir}/libs/proj/world.md`,
      // to
      `${rootDir}/libs/proj/dist/world.md`,
      {
        recursive: true,
      },
      // from
      `${rootDir}/libs/proj/hello.txt`,
      // to
      `${rootDir}/libs/proj/dist/copied-assets/hello.txt`,
      {
        recursive: true,
      },
    ]);
  });
  it(`should support substitutions`, async () => {
    const actual = await copyAssets(
      assetGlobsToFiles(
        [
          {
            input: 'libs/proj',
            output: 'copied-assets',
            glob: '*__tmpl__',
            substitutions: {
              __tmpl__: '',
            },
          },
        ],
        rootDir,
        'libs/proj/dist',
      ),
    );

    expect(actual).toBe(true);
    expect(cpMock.mock.calls.flat()).toEqual([
      // from
      `${rootDir}/libs/proj/hello.md__tmpl__`,
      // to
      `${rootDir}/libs/proj/dist/copied-assets/hello.md`,
      {
        recursive: true,
      },
    ]);
  });
});

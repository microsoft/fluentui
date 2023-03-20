import { argv } from 'just-scripts';
import { Arguments } from 'yargs';

import { getJustArgv } from './argv';

jest.mock('just-scripts', () => {
  return {
    __esModule: true,
    argv: jest.fn(() => ({ _: [], $0: '' })),
  };
});

const argvMock = argv as jest.Mock;

describe(`argv`, () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe(`#getJustArgv`, () => {
    describe(`--module`, () => {
      it(`should do nothing if not used`, () => {
        argvMock.mockImplementationOnce(() => {
          return { _: [], $0: '' } as Arguments;
        });
        const actual = getJustArgv();

        expect(actual.module).toEqual(undefined);
      });
      it(`should process --module`, () => {
        argvMock.mockImplementationOnce(() => {
          return { module: 'esm', _: [], $0: '' } as Arguments;
        });

        let actual = getJustArgv();
        let expected = { module: { esm: true, cjs: false, amd: false } };

        expect(actual).toEqual(expect.objectContaining(expected));

        argvMock.mockImplementationOnce(() => {
          return { module: 'cjs', _: [], $0: '' } as Arguments;
        });
        actual = getJustArgv();
        expected = { module: { esm: false, cjs: true, amd: false } };

        expect(actual).toEqual(expect.objectContaining(expected));
      });

      it(`should process --module as array`, () => {
        argvMock.mockImplementationOnce(() => {
          return { module: 'esm,cjs', _: [], $0: '' } as Arguments;
        });

        let actual = getJustArgv();
        const expected = { module: { esm: true, cjs: true, amd: false } };

        expect(actual).toEqual(expect.objectContaining(expected));

        argvMock.mockImplementationOnce(() => {
          return { module: ['esm', 'cjs'], _: [], $0: '' } as Arguments;
        });

        actual = getJustArgv();

        expect(actual).toEqual(expect.objectContaining(expected));
      });
    });
  });
});

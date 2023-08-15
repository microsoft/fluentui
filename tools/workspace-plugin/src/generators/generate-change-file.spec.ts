import { logger } from '@nx/devkit';
import chalk from 'chalk';

import { disableChalk, formatMockedCalls } from '../utils-testing';
import { generateChangeFilesHelp } from './generate-change-files';

describe(`generate change file task`, () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};
  disableChalk(chalk);

  beforeEach(() => {
    jest.restoreAllMocks();

    jest.spyOn(console, 'log').mockImplementation(noop);
    jest.spyOn(console, 'info').mockImplementation(noop);
    jest.spyOn(console, 'warn').mockImplementation(noop);
  });

  describe(`#generateChangeFilesHelp`, () => {
    it(`should print help`, () => {
      const loggerInfoSpy = jest.spyOn(logger, 'info');
      generateChangeFilesHelp({
        message: 'it iiiiz wat it iiiz',
        type: 'none',
        dependentChangeType: 'none',
      });

      expect(formatMockedCalls(loggerInfoSpy.mock.calls)).toMatchInlineSnapshot(`
        ">  Changefiles generation instructions:
        1. Make sure your files are staged
        2. Run following command:

        yarn beachball change --scope \\"!packages/fluentui/*\\" --no-commit --message \\"it iiiiz wat it iiiz\\" --type \\"none\\" --dependent-change-type \\"none\\"
        "
      `);
    });
  });
});

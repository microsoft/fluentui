import { logger } from '@nrwl/devkit';
import { printUserLogs } from './utils';

describe(`utils`, () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};

  describe(`#printUserLogs`, () => {
    beforeEach(() => {
      jest.restoreAllMocks();

      jest.spyOn(console, 'log').mockImplementation(noop);
      jest.spyOn(console, 'info').mockImplementation(noop);
      jest.spyOn(console, 'warn').mockImplementation(noop);
      jest.spyOn(console, 'error').mockImplementation(noop);
    });

    it(`should print nothing if logs are empty`, () => {
      const loggerInfoSpy = jest.spyOn(logger, 'info');
      printUserLogs([]);

      expect(loggerInfoSpy).not.toHaveBeenCalled();
    });

    it(`should print logs based on type`, () => {
      const loggerInfoSpy = jest.spyOn(logger, 'info');
      const loggerWarnSpy = jest.spyOn(logger, 'warn');
      const loggerErrorSpy = jest.spyOn(logger, 'error');
      printUserLogs([
        { type: 'info', message: 'info log' },
        { type: 'warn', message: 'warn log' },
        { type: 'error', message: 'error log' },
      ]);

      expect(loggerInfoSpy).toHaveBeenCalledWith('info log');
      expect(loggerWarnSpy).toHaveBeenCalledWith('warn log');
      expect(loggerErrorSpy).toHaveBeenCalledWith('error log');
    });
  });
});

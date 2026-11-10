import { createLogger } from '../logger';

describe('logger', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('prefix contains rit and react version; routes to console.log/info/warn/error', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const infoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const logger = createLogger({ react: 18, verbose: false });

    logger.log('hello', 1);
    logger.info('info');
    logger.warn('warn');
    logger.error('err');

    // validate the first arg is the header and contains version text regardless of ANSI
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('rit / v18'), 'hello', 1);
    expect(infoSpy).toHaveBeenCalledWith(expect.stringContaining('rit / v18'), 'info');
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('rit / v18'), 'warn');
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('rit / v18'), 'err');
  });

  test('verbose() logs only when verbose=true', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const silent = createLogger({ react: 17, verbose: false });
    silent.verbose('silence');
    expect(logSpy).not.toHaveBeenCalled();

    const noisy = createLogger({ react: 19, verbose: true });
    noisy.verbose('loud');
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('rit / v19'), 'loud');
  });
});

import { handler } from './handler';

jest.mock('./impl/short-report', () => ({
  runShortReport: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('./impl/long-report', () => ({
  runLongReport: jest.fn().mockResolvedValue(undefined),
}));

describe('report handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delegate to short report by default', async () => {
    await handler({ _: ['report'], $0: 'fluentui-cli', type: 'short' });

    const { runShortReport } = require('./impl/short-report');
    expect(runShortReport).toHaveBeenCalledTimes(1);
  });

  it('should delegate to long report when type is "long"', async () => {
    await handler({ _: ['report'], $0: 'fluentui-cli', type: 'long', path: '/some/path', reporter: 'json' });

    const { runLongReport } = require('./impl/long-report');
    expect(runLongReport).toHaveBeenCalledWith('/some/path', 'json', undefined, undefined);
  });

  it('should delegate to long report with undefined path when not provided', async () => {
    await handler({ _: ['report'], $0: 'fluentui-cli', type: 'long' });

    const { runLongReport } = require('./impl/long-report');
    expect(runLongReport).toHaveBeenCalledWith(undefined, undefined, undefined, undefined);
  });

  it('should pass markdown reporter to long report', async () => {
    await handler({ _: ['report'], $0: 'fluentui-cli', type: 'long', reporter: 'markdown' });

    const { runLongReport } = require('./impl/long-report');
    expect(runLongReport).toHaveBeenCalledWith(undefined, 'markdown', undefined, undefined);
  });

  it('should pass html reporter to long report', async () => {
    await handler({ _: ['report'], $0: 'fluentui-cli', type: 'long', reporter: 'html' });

    const { runLongReport } = require('./impl/long-report');
    expect(runLongReport).toHaveBeenCalledWith(undefined, 'html', undefined, undefined);
  });

  it('should pass include and exclude to long report', async () => {
    await handler({
      _: ['report'],
      $0: 'fluentui-cli',
      type: 'long',
      reporter: 'json',
      include: ['src/**'],
      exclude: ['**/*.test.*'],
    });

    const { runLongReport } = require('./impl/long-report');
    expect(runLongReport).toHaveBeenCalledWith(undefined, 'json', ['src/**'], ['**/*.test.*']);
  });

  it('should not call long report when type is "short"', async () => {
    await handler({ _: ['report'], $0: 'fluentui-cli', type: 'short' });

    const { runLongReport } = require('./impl/long-report');
    expect(runLongReport).not.toHaveBeenCalled();
  });
});

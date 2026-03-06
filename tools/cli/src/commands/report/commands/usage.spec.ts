jest.mock('../impl/long-report', () => ({
  runLongReport: jest.fn().mockResolvedValue(undefined),
}));

describe('report usage command', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call runLongReport with default args', async () => {
    const usageCommand = (await import('./usage')).default;

    await (usageCommand.handler as Function)({
      _: ['report', 'usage'],
      $0: 'fluentui-cli',
      reporter: 'json',
    });

    const { runLongReport } = require('../impl/long-report');
    expect(runLongReport).toHaveBeenCalledWith(undefined, 'json', undefined, undefined, undefined);
  });

  it('should pass path and reporter to runLongReport', async () => {
    const usageCommand = (await import('./usage')).default;

    await (usageCommand.handler as Function)({
      _: ['report', 'usage'],
      $0: 'fluentui-cli',
      path: '/some/path',
      reporter: 'markdown',
    });

    const { runLongReport } = require('../impl/long-report');
    expect(runLongReport).toHaveBeenCalledWith('/some/path', 'markdown', undefined, undefined, undefined);
  });

  it('should pass html reporter to runLongReport', async () => {
    const usageCommand = (await import('./usage')).default;

    await (usageCommand.handler as Function)({
      _: ['report', 'usage'],
      $0: 'fluentui-cli',
      reporter: 'html',
    });

    const { runLongReport } = require('../impl/long-report');
    expect(runLongReport).toHaveBeenCalledWith(undefined, 'html', undefined, undefined, undefined);
  });

  it('should pass include and exclude to runLongReport', async () => {
    const usageCommand = (await import('./usage')).default;

    await (usageCommand.handler as Function)({
      _: ['report', 'usage'],
      $0: 'fluentui-cli',
      reporter: 'json',
      include: ['src/**'],
      exclude: ['**/*.test.*'],
    });

    const { runLongReport } = require('../impl/long-report');
    expect(runLongReport).toHaveBeenCalledWith(undefined, 'json', ['src/**'], ['**/*.test.*'], undefined);
  });

  it('should pass output to runLongReport', async () => {
    const usageCommand = (await import('./usage')).default;

    await (usageCommand.handler as Function)({
      _: ['report', 'usage'],
      $0: 'fluentui-cli',
      reporter: 'json',
      output: 'report.json',
    });

    const { runLongReport } = require('../impl/long-report');
    expect(runLongReport).toHaveBeenCalledWith(undefined, 'json', undefined, undefined, 'report.json');
  });
});

jest.mock('../impl/usage-report', () => ({
  runUsageReport: jest.fn().mockResolvedValue(undefined),
}));

describe('report usage command', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call runUsageReport with default args', async () => {
    const usageCommand = (await import('./usage')).default;

    await (usageCommand.handler as Function)({
      _: ['report', 'usage'],
      $0: 'fluentui-cli',
      reporter: 'json',
    });

    const { runUsageReport } = require('../impl/usage-report');
    expect(runUsageReport).toHaveBeenCalledWith(undefined, 'json', undefined, undefined, undefined);
  });

  it('should pass path and reporter to runUsageReport', async () => {
    const usageCommand = (await import('./usage')).default;

    await (usageCommand.handler as Function)({
      _: ['report', 'usage'],
      $0: 'fluentui-cli',
      path: '/some/path',
      reporter: 'markdown',
    });

    const { runUsageReport } = require('../impl/usage-report');
    expect(runUsageReport).toHaveBeenCalledWith('/some/path', 'markdown', undefined, undefined, undefined);
  });

  it('should pass html reporter to runUsageReport', async () => {
    const usageCommand = (await import('./usage')).default;

    await (usageCommand.handler as Function)({
      _: ['report', 'usage'],
      $0: 'fluentui-cli',
      reporter: 'html',
    });

    const { runUsageReport } = require('../impl/usage-report');
    expect(runUsageReport).toHaveBeenCalledWith(undefined, 'html', undefined, undefined, undefined);
  });

  it('should pass include and exclude to runUsageReport', async () => {
    const usageCommand = (await import('./usage')).default;

    await (usageCommand.handler as Function)({
      _: ['report', 'usage'],
      $0: 'fluentui-cli',
      reporter: 'json',
      include: ['src/**'],
      exclude: ['**/*.test.*'],
    });

    const { runUsageReport } = require('../impl/usage-report');
    expect(runUsageReport).toHaveBeenCalledWith(undefined, 'json', ['src/**'], ['**/*.test.*'], undefined);
  });

  it('should pass output to runUsageReport', async () => {
    const usageCommand = (await import('./usage')).default;

    await (usageCommand.handler as Function)({
      _: ['report', 'usage'],
      $0: 'fluentui-cli',
      reporter: 'json',
      output: 'report.json',
    });

    const { runUsageReport } = require('../impl/usage-report');
    expect(runUsageReport).toHaveBeenCalledWith(undefined, 'json', undefined, undefined, 'report.json');
  });
});

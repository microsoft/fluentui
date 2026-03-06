jest.mock('../impl/short-report', () => ({
  runShortReport: jest.fn().mockResolvedValue(undefined),
}));

describe('report info command', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call runShortReport', async () => {
    const infoCommand = (await import('./info')).default;

    await (infoCommand.handler as Function)({ _: ['report', 'info'], $0: 'fluentui-cli' });

    const { runShortReport } = require('../impl/short-report');
    expect(runShortReport).toHaveBeenCalledTimes(1);
  });
});

jest.mock('../impl/info-report', () => ({
  runInfoReport: jest.fn().mockResolvedValue(undefined),
}));

describe('report info command', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call runInfoReport with no output', async () => {
    const infoCommand = (await import('./info')).default;

    await (infoCommand.handler as Function)({ _: ['report', 'info'], $0: 'fluentui-cli' });

    const { runInfoReport } = require('../impl/info-report');
    expect(runInfoReport).toHaveBeenCalledWith(undefined);
  });

  it('should pass output to runInfoReport', async () => {
    const infoCommand = (await import('./info')).default;

    await (infoCommand.handler as Function)({ _: ['report', 'info'], $0: 'fluentui-cli', output: 'info.txt' });

    const { runInfoReport } = require('../impl/info-report');
    expect(runInfoReport).toHaveBeenCalledWith('info.txt');
  });
});

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
    expect(runInfoReport).toHaveBeenCalledWith(undefined, {
      config: undefined,
      system: undefined,
      package: undefined,
      metadataMode: undefined,
    });
  });

  it('should pass output to runInfoReport', async () => {
    const infoCommand = (await import('./info')).default;

    await (infoCommand.handler as Function)({ _: ['report', 'info'], $0: 'fluentui-cli', output: 'info.txt' });

    const { runInfoReport } = require('../impl/info-report');
    expect(runInfoReport).toHaveBeenCalledWith('info.txt', {
      config: undefined,
      system: undefined,
      package: undefined,
      metadataMode: undefined,
    });
  });

  it('should pass catalog selection options', async () => {
    const infoCommand = (await import('./info')).default;

    await (infoCommand.handler as Function)({
      _: ['report', 'info'],
      $0: 'fluentui-cli',
      system: ['headless'],
      metadataMode: 'off',
    });

    const { runInfoReport } = require('../impl/info-report');
    expect(runInfoReport).toHaveBeenLastCalledWith(undefined, {
      config: undefined,
      system: ['headless'],
      package: undefined,
      metadataMode: 'off',
    });
  });
});

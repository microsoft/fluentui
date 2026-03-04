import { handler } from './handler';

describe('migrate handler', () => {
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('should execute without errors', async () => {
    await handler({ _: ['migrate'], $0: 'fluentui-cli' });

    expect(logSpy).toHaveBeenCalledWith('migrate command - not yet implemented');
  });
});

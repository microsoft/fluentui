import { handler } from './handler';

describe('report handler', () => {
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('should execute without errors', async () => {
    await handler({ _: ['report'], $0: 'fluentui-cli' });

    expect(logSpy).toHaveBeenCalledWith('report command - not yet implemented');
  });
});

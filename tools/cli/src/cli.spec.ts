import { CliError } from './utils/diagnostics';
import { handleFatalError, main } from './cli';

describe('CLI failure boundary', () => {
  beforeEach(() => {
    jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
    jest.spyOn(process.stderr, 'write').mockImplementation(() => true);
    jest.spyOn(console, 'log').mockImplementation();
    process.exitCode = undefined;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    process.exitCode = undefined;
  });

  it('emits one stable JSON error document', async () => {
    await handleFatalError(new CliError('CLI_API_NOT_FOUND', 'Missing', 2), ['api', 'Missing', '--json']);

    expect(process.stderr.write).not.toHaveBeenCalled();
    expect(process.stdout.write).toHaveBeenCalledTimes(1);
    expect(JSON.parse((process.stdout.write as jest.Mock).mock.calls[0][0])).toEqual(
      expect.objectContaining({
        apiVersion: '1',
        type: 'fluentui.error',
        data: { code: 'CLI_API_NOT_FOUND', message: 'Missing' },
        status: 'unavailable',
      }),
    );
    expect(process.exitCode).toBe(2);
  });

  it.each([
    ['equals syntax', ['api', '--json=true']],
    ['separate boolean syntax', ['api', '--json', 'true']],
    ['dense JSON', ['api', '--json', '--dense']],
  ])('emits JSON errors for --json using %s', async (_name, argv) => {
    await handleFatalError(new CliError('CLI_USAGE', 'Invalid', 2), argv);

    expect(process.stderr.write).not.toHaveBeenCalled();
    expect(JSON.parse((process.stdout.write as jest.Mock).mock.calls[0][0]).type).toBe('fluentui.error');
  });

  it.each([
    ['equals false', ['api', '--json=false']],
    ['negated syntax', ['api', '--no-json']],
    ['later false override', ['api', '--json=true', '--json=false']],
    ['later negated override', ['api', '--json', '--no-json']],
    ['dense Markdown', ['api', '--dense']],
  ])('keeps errors human-readable for %s', async (_name, argv) => {
    await handleFatalError(new CliError('CLI_USAGE', 'Invalid', 2), argv);

    expect(process.stdout.write).not.toHaveBeenCalled();
    expect(process.stderr.write).toHaveBeenCalledWith('CLI_USAGE: Invalid\n');
  });

  it('keeps human failures on stderr', async () => {
    await handleFatalError(new Error('boom'), ['doctor']);

    expect(process.stdout.write).not.toHaveBeenCalled();
    expect(process.stderr.write).toHaveBeenCalledWith('CLI_UNEXPECTED: boom\n');
    expect(process.exitCode).toBe(1);
  });

  it('uses equals JSON syntax for yargs parse failures before a handler runs', async () => {
    const argv = ['api', '--cwd', '.', '--path', '.', '--json=true'];
    const error = await main(argv).catch(value => value);

    await handleFatalError(error, argv);

    expect(process.stderr.write).not.toHaveBeenCalled();
    const output = JSON.parse((process.stdout.write as jest.Mock).mock.calls[0][0]);
    expect(output).toEqual(
      expect.objectContaining({
        type: 'fluentui.error',
        data: expect.objectContaining({ code: 'CLI_USAGE' }),
      }),
    );
    expect(process.exitCode).toBe(2);
  });

  it('respects a false JSON override for yargs parse failures', async () => {
    const argv = ['api', '--cwd', '.', '--path', '.', '--json=true', '--json=false'];
    const error = await main(argv).catch(value => value);

    await handleFatalError(error, argv);

    expect(process.stdout.write).not.toHaveBeenCalled();
    expect(process.stderr.write).toHaveBeenCalledWith(expect.stringContaining('CLI_USAGE:'));
    expect(process.exitCode).toBe(2);
  });

  it('routes manifest through the registered command modules', async () => {
    await main(['manifest', '--json']);

    const output = JSON.parse((process.stdout.write as jest.Mock).mock.calls[0][0]);
    expect(output.type).toBe('fluentui.command-manifest');
  });

  it('shows metadata subcommand usage for the bare command', async () => {
    const error = await main(['metadata']).catch(value => value);

    expect(error).toEqual(
      expect.objectContaining({
        code: 'CLI_USAGE',
        message: expect.stringContaining('Usage: fluentui-cli metadata <generate|validate> [options]'),
      }),
    );
  });

  it.each(['--entry', '--reporter'])('rejects removed bare metadata flag %s', async flag => {
    const argv = ['metadata', flag, 'legacy'];
    const error = await main(argv).catch(value => value);

    expect(error).toEqual(
      expect.objectContaining({
        code: 'CLI_USAGE',
        message: expect.stringMatching(/Unknown argument|Usage: fluentui-cli metadata/),
      }),
    );
  });

  it('keeps command help and doctor loading parser-free', async () => {
    await main(['init', '--help']);
    await import('./commands/doctor/handler');

    const loadedModules = Object.keys(require.cache);
    expect(loadedModules.some(modulePath => modulePath.includes('/ts-morph/'))).toBe(false);
    expect(
      loadedModules.some(
        modulePath => modulePath.includes('/@fluentui/api-metadata/') && modulePath.includes('/generator'),
      ),
    ).toBe(false);
  });
});

import { handler } from './handler';

describe('manifest handler', () => {
  beforeEach(() => {
    jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('emits the registered command contract without command implementations', async () => {
    await handler({ _: ['manifest'], $0: 'fluentui-cli', json: true });

    const output = JSON.parse((process.stdout.write as jest.Mock).mock.calls[0][0]);
    expect(output.type).toBe('fluentui.command-manifest');
    const api = output.data.commands.find((command: { command: string }) => command.command === 'api [symbol]');
    expect(api.options.from).toEqual(expect.objectContaining({ type: 'string' }));
    for (const name of ['package', 'entrypoint', 'namespace']) {
      expect(api.options[name].hidden).toBe(true);
    }
    expect(output.data.commands.map((command: { command: string }) => command.command)).toEqual([
      'report',
      'metadata',
      'api [symbol]',
      'doctor',
      'manifest',
      'init',
    ]);
    const report = output.data.commands.find((command: { command: string }) => command.command === 'report');
    const usage = report.subcommands.find((command: { command: string }) => command.command === 'usage');
    expect(usage.options).toEqual(
      expect.objectContaining({
        path: expect.objectContaining({ alias: 'p' }),
        reporter: expect.objectContaining({ alias: 'r', default: 'json' }),
        include: expect.objectContaining({ array: true }),
        exclude: expect.objectContaining({ array: true }),
        output: expect.objectContaining({ alias: 'o' }),
        metadataMode: expect.objectContaining({ alias: 'metadata-mode', default: 'prefer' }),
      }),
    );

    const metadata = output.data.commands.find((command: { command: string }) => command.command === 'metadata');
    expect(metadata.options).toEqual({});
    expect(metadata.subcommands.map((command: { command: string }) => command.command)).toEqual([
      'generate',
      'validate [input]',
    ]);

    const init = output.data.commands.find((command: { command: string }) => command.command === 'init');
    expect(init.options).toEqual(
      expect.objectContaining({
        cwd: expect.objectContaining({ type: 'string' }),
        system: expect.objectContaining({ array: true }),
        'dry-run': expect.objectContaining({ default: false }),
        json: expect.objectContaining({ default: false }),
      }),
    );
  });

  it('formats the human manifest as Markdown', async () => {
    await handler({ _: ['manifest'], $0: 'fluentui-cli' });
    const output = (process.stdout.write as jest.Mock).mock.calls[0][0];
    expect(output).toContain('# Fluent UI CLI commands');
    expect(output).toContain('## `api [symbol]`');
    expect(output).toContain('## `init`');
    expect(output).toContain('| Option | Description |');
    expect(output).toContain('| `--include-inherited` |');
    const api = output.split('## `api [symbol]`')[1].split('## `doctor`')[0];
    expect(api).toContain('| `--from` |');
    expect(api).not.toMatch(/--(?:package|entrypoint|namespace)\b/);
    expect(output).toContain('| Code | Meaning |');
  });
});

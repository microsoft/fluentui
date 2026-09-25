import type { Argv, CommandModule } from 'yargs';
import yargs = require('yargs/yargs');
import apiCommand from '../commands/api';

import metadataCommand from '../commands/metadata';
import infoCommand from '../commands/report/commands/info';
import usageCommand from '../commands/report/commands/usage';
import {
  API_COMMAND_SPEC,
  METADATA_COMMAND_SPEC,
  METADATA_GENERATE_COMMAND_SPEC,
  REPORT_INFO_COMMAND_SPEC,
  REPORT_USAGE_COMMAND_SPEC,
  getCommandManifest,
} from './command-spec';

describe('command manifest contract', () => {
  it('publishes metadata only as generate and validate subcommands', () => {
    expect(Object.keys(METADATA_COMMAND_SPEC.options)).toEqual([]);
    expect(METADATA_COMMAND_SPEC.subcommands?.map(command => command.command)).toEqual([
      'generate',
      'validate [input]',
    ]);
    expect(() => parseCommand(metadataCommand, [])).toThrow(
      'Usage: fluentui-cli metadata <generate|validate> [options]',
    );
  });

  it('publishes the actual report info flags and catalog selectors', () => {
    const actual = parseCommand(infoCommand, ['-o', 'info.txt', '--metadata-mode', 'off', '--system', 'headless']);

    expect(Object.keys(REPORT_INFO_COMMAND_SPEC.options)).toEqual([
      'output',
      'config',
      'system',
      'package',
      'metadataMode',
    ]);
    expect(REPORT_INFO_COMMAND_SPEC.options).toEqual(
      expect.objectContaining({
        output: expect.objectContaining({ alias: 'o' }),
        metadataMode: expect.objectContaining({ alias: 'metadata-mode', default: 'prefer' }),
      }),
    );
    expect(actual).toEqual(
      expect.objectContaining({
        output: 'info.txt',
        metadataMode: 'off',
        system: ['headless'],
      }),
    );
  });

  it('publishes the actual report usage flags, aliases, arrays, and defaults', () => {
    const defaults = parseCommand(usageCommand, []);
    const actual = parseCommand(usageCommand, [
      '-p',
      'src',
      '-r',
      'html',
      '--include',
      'src/**',
      '--include',
      'test/**',
      '--exclude',
      '**/*.spec.ts',
      '-o',
      'usage.html',
      '--system',
      'headless',
      '--system',
      'product',
    ]);

    expect(Object.keys(REPORT_USAGE_COMMAND_SPEC.options)).toEqual([
      'path',
      'reporter',
      'include',
      'exclude',
      'output',
      'config',
      'system',
      'package',
      'metadataMode',
    ]);
    expect(REPORT_USAGE_COMMAND_SPEC.options).toEqual(
      expect.objectContaining({
        path: expect.objectContaining({ alias: 'p' }),
        reporter: expect.objectContaining({ alias: 'r', default: 'json' }),
        include: expect.objectContaining({ array: true }),
        exclude: expect.objectContaining({ array: true }),
        output: expect.objectContaining({ alias: 'o' }),
        metadataMode: expect.objectContaining({ alias: 'metadata-mode', default: 'prefer' }),
      }),
    );
    expect(defaults).toEqual(expect.objectContaining({ reporter: 'json', metadataMode: 'prefer' }));
    expect(actual).toEqual(
      expect.objectContaining({
        path: 'src',
        reporter: 'html',
        include: ['src/**', 'test/**'],
        exclude: ['**/*.spec.ts'],
        output: 'usage.html',
        system: ['headless', 'product'],
      }),
    );
  });

  it('publishes new command selectors and metadata generation', () => {
    expect(Object.keys(API_COMMAND_SPEC.options)).toEqual(
      expect.arrayContaining(['cwd', 'path', 'config', 'system', 'from', 'package', 'metadataMode', 'json', 'output']),
    );
    expect(API_COMMAND_SPEC.options.metadataMode).toEqual(
      expect.objectContaining({
        alias: 'metadata-mode',
        choices: ['prefer', 'required', 'off'],
        default: 'prefer',
      }),
    );
    const metadata = getCommandManifest().commands.find(command => command.command === 'metadata');
    expect(metadata?.subcommands).toContain(METADATA_GENERATE_COMMAND_SPEC);
  });

  it('advertises import-path selection while keeping advanced selectors parseable', () => {
    const parser = yargs([]).command(apiCommand).exitProcess(false);
    let help = '';
    parser.parseSync(['api', '--help'], {}, (_error, _argv, output) => {
      help = output;
    });
    expect(help).toContain('--from');
    expect(help).toContain('--dense');
    expect(help).not.toMatch(/--(?:package|entrypoint|namespace)\b/);
    expect(parseCommand(apiCommand, ['--from', '@fluentui/example/button'])).toEqual(
      expect.objectContaining({ from: '@fluentui/example/button' }),
    );
    expect(
      parseCommand(apiCommand, ['--package', '@fluentui/example', '--entrypoint', './button', '--namespace', 'type']),
    ).toEqual(expect.objectContaining({ package: '@fluentui/example', entrypoint: './button', namespace: 'type' }));
    expect(API_COMMAND_SPEC.options.package.hidden).toBe(true);
    expect(REPORT_INFO_COMMAND_SPEC.options.package.hidden).toBeUndefined();
    expect(REPORT_USAGE_COMMAND_SPEC.options.package.hidden).toBeUndefined();
  });

  it('advertises opt-in dense responses and keeps presentation options independently parseable', () => {
    expect(
      parseCommand(apiCommand, ['--json', '--dense', '--include-inherited', '--expand-types', '--verbose']),
    ).toMatchObject({
      json: true,
      dense: true,
      includeInherited: true,
      expandTypes: true,
      verbose: true,
    });
    expect(parseCommand(apiCommand, ['--json'])).toMatchObject({ dense: false });
    expect(API_COMMAND_SPEC.responses).toEqual(
      expect.arrayContaining(['fluentui.api-detail.dense', 'fluentui.api-index.dense']),
    );
  });

  it.each(['--package', '--entrypoint'])('rejects combining --from with %s at the parser boundary', flag => {
    expect(() => parseCommand(apiCommand, ['--from', '@fluentui/example', flag, '.'])).toThrow(/mutually exclusive/i);
  });
});

function parseCommand(command: CommandModule, args: string[]): Record<string, unknown> {
  const parser = yargs([]);
  const built =
    typeof command.builder === 'function'
      ? command.builder(parser)
      : command.builder
      ? parser.options(command.builder)
      : parser;
  const parsed = (built as Argv)
    .exitProcess(false)
    .showHelpOnFail(false)
    .fail(message => {
      throw new Error(message);
    })
    .parse(args);
  if (parsed instanceof Promise) {
    throw new Error('Expected a synchronous command builder');
  }
  return parsed;
}

import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import yargs from 'yargs';

import { cli, parseBootstrapArgs, parseConfigPath } from '../cli';
import { loadRcaConfig, validateRcaConfig } from '../config';
import { createAnalyzeCommand } from '../commands/analyze';
import { createLintCommand } from '../commands/lint';
import { CliError } from '../commands/shared';
import type { RcaConfig } from '../types';

const SCHEMA_PATH = join(__dirname, '..', '..', 'rca.config.schema.json');

describe('rca.config.json', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = mkdtempSync(join(__dirname, '../../.rca-config-'));
  });
  afterEach(() => rmSync(tempDir, { recursive: true, force: true }));

  function writeConfig(config: unknown, name = 'rca.config.json'): string {
    const configPath = join(tempDir, name);
    writeFileSync(configPath, JSON.stringify(config));
    return configPath;
  }

  it('uses an empty config when the implicit cwd config is absent', () => {
    expect(loadRcaConfig(undefined, tempDir)).toEqual({ config: {}, path: undefined });
  });

  it('loads rca.config.json from the cwd', () => {
    const configPath = writeConfig({ mode: 'all', analyze: { quote: 'double' } });
    expect(loadRcaConfig(undefined, tempDir)).toEqual({
      config: { mode: 'all', analyze: { quote: 'double', risks: undefined } },
      path: configPath,
    });
  });

  it('fails when an explicit config does not exist', () => {
    expect(() => loadRcaConfig('missing.json', tempDir)).toThrow(CliError);
    expect(() => loadRcaConfig('missing.json', tempDir)).toThrow(/could not read RCA config/);
  });

  it('loads an explicit config instead of the cwd default', () => {
    writeConfig({ mode: 'infer' });
    const explicitPath = writeConfig({ mode: 'all' }, 'custom.json');
    expect(loadRcaConfig('custom.json', tempDir)).toEqual({ config: { mode: 'all' }, path: explicitPath });
  });

  it('reports malformed and non-object JSON', () => {
    writeFileSync(join(tempDir, 'rca.config.json'), '{');
    expect(() => loadRcaConfig(undefined, tempDir)).toThrow(/could not read RCA config/);

    writeConfig([]);
    expect(() => loadRcaConfig(undefined, tempDir)).toThrow(/must be object/);
  });

  it('reports nested schema validation errors', () => {
    writeConfig({ analyze: { risks: { resolveWrappers: 'yes' } } });
    expect(() => loadRcaConfig(undefined, tempDir)).toThrow(/analyze\/risks\/resolveWrappers.*boolean/);
  });

  it('rejects malformed store-accessor regexes at config load, before scanning', () => {
    const configPath = writeConfig({ analyze: { risks: { storeAccessorPattern: '[' } } });
    expect(() => loadRcaConfig(undefined, tempDir)).toThrow(CliError);
    expect(() => loadRcaConfig(undefined, tempDir)).toThrow(
      `invalid RCA config '${configPath}': analyze.risks.storeAccessorPattern is not a valid regex`,
    );
    expect(() => validateRcaConfig({ analyze: { risks: { storeAccessorPattern: '[' } } }, 'in-memory')).toThrow(
      /invalid RCA config in-memory: analyze\.risks\.storeAccessorPattern is not a valid regex/,
    );
  });

  it('accepts valid store-accessor regexes', () => {
    writeConfig({ analyze: { risks: { storeAccessorPattern: 'Store$' } } });
    expect(loadRcaConfig(undefined, tempDir).config.analyze?.risks?.storeAccessorPattern).toBe('Store$');
  });

  it('exits with a config error instead of reporting analysis success for a bad regex', async () => {
    const configPath = writeConfig({ analyze: { risks: { storeAccessorPattern: '[' } } });
    const originalArgv = process.argv;
    const originalExitCode = process.exitCode;
    const error = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    try {
      process.argv = [
        'node',
        'react-compiler-analyzer',
        'analyze',
        tempDir,
        '--config',
        configPath,
        '--format',
        'json',
      ];
      process.exitCode = undefined;
      await cli();
      expect(process.exitCode).toBe(1);
      expect(error).toHaveBeenCalledWith(
        expect.stringContaining('analyze.risks.storeAccessorPattern is not a valid regex'),
      );
    } finally {
      process.argv = originalArgv;
      process.exitCode = originalExitCode;
      error.mockRestore();
    }
  });

  it('rejects CLI-only and unknown options', () => {
    writeConfig({ paths: ['src'], analyze: { annotate: 'all' } });
    expect(() => loadRcaConfig(undefined, tempDir)).toThrow(/additional properties/);
  });

  it('preserves explicit package resolution policy without manual aliases', () => {
    writeConfig({
      analyze: {
        risks: {
          detectGetStateReads: true,
          resolveWrappers: true,
          resolver: { additionalConditionNames: ['source'], mainFields: ['source', 'module', 'main'] },
        },
      },
    });

    expect(loadRcaConfig(undefined, tempDir).config.analyze?.risks?.resolver).toEqual({
      additionalConditionNames: ['source'],
      mainFields: ['source', 'module', 'main'],
    });
  });

  it('rejects removed aliases with actionable per-project migration guidance', () => {
    writeConfig({
      analyze: { risks: { pathAliases: { baseUrl: '.', paths: { '@app/*': ['*'] } } } },
    });

    expect(() => loadRcaConfig(undefined, tempDir)).toThrow(/pathAliases was removed.*tsconfig paths/);
  });

  it('rejects removed parser configuration with native grammar migration guidance', () => {
    writeConfig({ parserPlugins: ['decorators-legacy'] });
    expect(() => loadRcaConfig(undefined, tempDir)).toThrow(/parserPlugins was removed.*file extension/);
  });

  it('warns only when wrapper resolution is explicitly enabled without a leaf rule', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    writeConfig({ analyze: { risks: { resolveWrappers: true } } });

    loadRcaConfig(undefined, tempDir);

    expect(warn).toHaveBeenCalledWith(expect.stringContaining('enables no leaf rule'));
    expect(warn).toHaveBeenCalledTimes(1);
    warn.mockRestore();
  });

  it.each([
    {},
    { resolveWrappers: false },
    { detectGetStateReads: true },
    { detectGetStateReads: true, resolveWrappers: true },
  ])('does not warn for default or useful wrapper policy %j', risks => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    writeConfig({ analyze: { risks } });

    loadRcaConfig(undefined, tempDir);

    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it.each([
    { additionalConditionNames: ['source', 'source'] },
    { additionalConditionNames: [''] },
    { additionalConditionNames: ['   '] },
    { additionalConditionNames: 'source' },
    { mainFields: [] },
    { mainFields: ['main', 'main'] },
    { mainFields: [''] },
    { mainFields: {} },
    { unknown: true },
  ])('rejects malformed resolver policy %j', resolver => {
    writeConfig({ analyze: { risks: { resolver } } });
    expect(() => loadRcaConfig(undefined, tempDir)).toThrow(/invalid RCA config/);
  });
});

describe('--config parsing', () => {
  it('accepts separated and equals forms', () => {
    expect(parseConfigPath(['analyze', 'src', '--config', 'one.json'])).toBe('one.json');
    expect(parseConfigPath(['--config=two.json', 'lint', 'src'])).toBe('two.json');
  });

  it('rejects a missing value', () => {
    expect(() => parseConfigPath(['analyze', 'src', '--config'])).toThrow(/Not enough arguments following: config/);
  });

  it('ignores config-like values after the option terminator', () => {
    expect(parseConfigPath(['analyze', 'src', '--', '--config', 'ignored.json'])).toBeUndefined();
  });

  it('identifies init when global options appear before or after the command', () => {
    expect(parseBootstrapArgs(['init', '--config', 'new.json', '--yes'])).toEqual({
      command: 'init',
      configPath: 'new.json',
    });
    expect(parseBootstrapArgs(['--config=other.json', 'init'])).toEqual({
      command: 'init',
      configPath: 'other.json',
    });
  });
});

describe('configured command defaults', () => {
  async function parseAnalyze(config: RcaConfig, args: string[]): Promise<Record<string, unknown>> {
    let parsed: Record<string, unknown> | undefined;
    const command = createAnalyzeCommand(config);
    command.handler = argv => {
      parsed = argv;
    };
    const parser = yargs(args).exitProcess(false).command(command);
    await (parser as unknown as { parseAsync(): Promise<unknown> }).parseAsync();
    return parsed!;
  }

  async function parseLint(config: RcaConfig, args: string[]): Promise<Record<string, unknown>> {
    let parsed: Record<string, unknown> | undefined;
    const command = createLintCommand(config);
    command.handler = argv => {
      parsed = argv;
    };
    const parser = yargs(args).exitProcess(false).command(command);
    await (parser as unknown as { parseAsync(): Promise<unknown> }).parseAsync();
    return parsed!;
  }

  it('uses shared and analyze config values as defaults', async () => {
    const parsed = await parseAnalyze(
      { mode: 'all', verbose: true, exclude: ['**/generated/**'], analyze: { quote: 'double' } },
      ['analyze', 'src'],
    );

    expect(parsed).toMatchObject({ mode: 'all', verbose: true, exclude: ['**/generated/**'], quote: 'double' });
  });

  it('lets explicit scalar, boolean, and array CLI options override config', async () => {
    const parsed = await parseAnalyze({ mode: 'all', verbose: true, exclude: ['**/generated/**'] }, [
      'analyze',
      'src',
      '--mode',
      'infer',
      '--no-verbose',
      '--exclude',
      '**/vendor/**',
    ]);

    expect(parsed).toMatchObject({ mode: 'infer', verbose: false, exclude: ['**/vendor/**'] });
  });

  it('uses shared config values for lint while keeping fix CLI-only', async () => {
    const parsed = await parseLint({ mode: 'annotation', strictPaths: true }, ['lint', 'src']);

    expect(parsed).toMatchObject({ mode: 'annotation', 'strict-paths': true, fix: false });
  });
});

describe('rca.config.schema.json', () => {
  const schema = JSON.parse(readFileSync(SCHEMA_PATH, 'utf-8'));

  it('is a strict draft-07 object schema', () => {
    expect(schema.$schema).toBe('http://json-schema.org/draft-07/schema#');
    expect(schema.type).toBe('object');
    expect(schema.additionalProperties).toBe(false);
    expect(schema.properties.analyze.additionalProperties).toBe(false);
    expect(schema.properties.analyze.properties.risks.additionalProperties).toBe(false);
  });

  it('documents every named property', () => {
    const visit = (definition: Record<string, unknown>) => {
      const properties = definition['properties'] as Record<string, Record<string, unknown>> | undefined;
      for (const property of Object.values(properties ?? {})) {
        expect(typeof property['description']).toBe('string');
        visit(property);
      }
    };
    visit(schema);
  });
});

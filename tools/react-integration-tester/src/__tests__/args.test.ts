import { TempFs } from './fixtures/temp-fs';
import { parseArgs } from '../args';

describe('parseArgs', () => {
  let fs: TempFs;

  afterEach(() => {
    if (fs) {
      fs.cleanup();
      // @ts-expect-error reset ref for safety
      fs = undefined;
    }
  });

  test('throws when --react is missing', () => {
    expect(() => parseArgs(['--run', 'test'])).toThrow(/Missing required --react/);
  });

  test('throws when neither --run nor --prepare-only nor --install-deps provided', () => {
    expect(() => parseArgs(['--react', '18'])).toThrow(/Provide at least one --run or use --prepare-only/);
  });

  test('parses basic run with defaults', () => {
    const args = parseArgs(['--react', '18', '--run', 'test']);
    expect(args.react).toBe(18);
    expect(args.run).toEqual(['test']);
    expect(args.prepareOnly).toBe(false);
    expect(args.noInstall).toBe(false); // default is install=true -> noInstall=false
    expect(args.cleanup).toBe(true); // default
    expect(args.installDeps).toBe(false);
    expect(args.configPath).toBe('');
    expect(args.cwd).toBe(process.cwd());
  });

  test('resolves default config from ./rit.config.js if present', () => {
    fs = new TempFs('rit-args-default-config');
    fs.createFileSync('rit.config.js', 'module.exports = { react: { "18": {} } };');
    const args = parseArgs(['--react', '18', '--run', 'test', '--cwd', fs.tempDir]);
    expect(args.configPath).toMatch(/rit\.config\.js$/);
  });

  test('uses explicit --config when provided and exists', () => {
    fs = new TempFs('rit-args-explicit-config');
    fs.createFileSync('custom.config.js', 'module.exports = { react: { "19": {} } };');
    const args = parseArgs(['--react', '19', '--run', 'test', '--config', './custom.config.js', '--cwd', fs.tempDir]);
    expect(args.configPath).toMatch(/custom\.config\.js$/);
  });

  test('throws if --config path does not exist', () => {
    fs = new TempFs('rit-args-missing-config');
    expect(() =>
      parseArgs(['--react', '17', '--run', 'test', '--config', './does-not-exist.js', '--cwd', fs.tempDir]),
    ).toThrow(/Config not found at:/);
  });

  test('invalid combo: --run with --prepare-only', () => {
    fs = new TempFs('rit-args-invalid-combo-prepare');
    expect(() => parseArgs(['--react', '18', '--run', 'test', '--prepare-only', '--cwd', fs.tempDir])).toThrow(
      /--prepare-only cannot be used together with --run/,
    );
  });

  test('invalid: --prepare-only without --project-id', () => {
    fs = new TempFs('rit-args-prepare-only-requires-id');
    expect(() => parseArgs(['--react', '18', '--prepare-only', '--cwd', fs.tempDir])).toThrow(
      /--prepare-only requires --project-id/,
    );
  });

  test('invalid combo: --run with --no-install', () => {
    fs = new TempFs('rit-args-invalid-combo-no-install');
    expect(() => parseArgs(['--react', '18', '--run', 'test', '--no-install', '--cwd', fs.tempDir])).toThrow(
      /--no-install cannot be used together with --run/,
    );
  });

  test('prepare-only + --no-install toggles noInstall', () => {
    fs = new TempFs('rit-args-prepare-noinstall');
    const args = parseArgs([
      '--react',
      '19',
      '--prepare-only',
      '--project-id',
      'ci',
      '--no-install',
      '--cwd',
      fs.tempDir,
    ]);
    expect(args.prepareOnly).toBe(true);
    expect(args.noInstall).toBe(true);
  });

  test('install-deps only mode is accepted', () => {
    fs = new TempFs('rit-args-install-deps');
    const args = parseArgs(['--react', '19', '--install-deps', '--cwd', fs.tempDir]);
    expect(args.installDeps).toBe(true);
    expect(args.run).toEqual([]);
    expect(args.prepareOnly).toBe(false);
  });

  test('captures project-id and --no-cleanup', () => {
    fs = new TempFs('rit-args-project-id');
    const args = parseArgs([
      '--react',
      '17',
      '--run',
      'type-check',
      '--project-id',
      'abc123',
      '--no-cleanup',
      '--cwd',
      fs.tempDir,
    ]);
    expect(args.projectId).toBe('abc123');
    expect(args.cleanup).toBe(false);
  });
});

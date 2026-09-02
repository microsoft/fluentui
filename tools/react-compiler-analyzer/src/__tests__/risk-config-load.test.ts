import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

import { loadRiskConfig, runAnalyze } from '../commands/analyze';
import { CliError } from '../commands/shared';
import { createModuleResolver, createResolverStats, compilePathAliases, findDeadAliases } from '../module-resolver';

describe('loadRiskConfig', () => {
  let tempDir: string;
  let warnings: string[];
  let originalWarn: typeof console.warn;
  const originalCwd = process.cwd();

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'risk-config-'));
    mkdirSync(join(tempDir, 'app', 'src'), { recursive: true });
    warnings = [];
    originalWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      warnings.push(args.map(String).join(' '));
    };
  });

  afterEach(() => {
    console.warn = originalWarn;
    process.chdir(originalCwd);
  });

  function writeConfig(name: string, config: unknown): string {
    const configPath = join(tempDir, 'app', name);
    writeFileSync(configPath, JSON.stringify(config));
    return configPath;
  }

  it('returns an empty config when no path is given', () => {
    expect(loadRiskConfig(undefined)).toEqual({});
  });

  it('rejects unknown keys', () => {
    const configPath = writeConfig('bad.json', { nope: true });
    expect(() => loadRiskConfig(configPath)).toThrow(/unknown key/);
  });

  describe('pathAliases.baseUrl', () => {
    it('resolves a relative baseUrl against the config file, not the cwd', () => {
      const configPath = writeConfig('rc.json', {
        detectGetStateReads: true,
        resolveWrappers: true,
        pathAliases: { baseUrl: './src', paths: { '@app/*': ['*'] } },
      });

      // Same config, two very different working directories — must resolve identically.
      process.chdir(tempDir);
      const fromParent = loadRiskConfig(configPath);
      process.chdir(originalCwd);
      const fromRepoRoot = loadRiskConfig(configPath);

      expect(fromParent.pathAliases!.baseUrl).toBe(join(tempDir, 'app', 'src'));
      expect(fromRepoRoot.pathAliases!.baseUrl).toBe(fromParent.pathAliases!.baseUrl);
    });

    it('leaves an absolute baseUrl untouched', () => {
      const absolute = join(tempDir, 'app', 'src');
      const configPath = writeConfig('abs.json', {
        detectGetStateReads: true,
        resolveWrappers: true,
        pathAliases: { baseUrl: absolute, paths: { '@app/*': ['*'] } },
      });
      expect(loadRiskConfig(configPath).pathAliases!.baseUrl).toBe(absolute);
    });

    it('fails when baseUrl points at a directory that does not exist', () => {
      const configPath = writeConfig('missing.json', {
        detectGetStateReads: true,
        resolveWrappers: true,
        pathAliases: { baseUrl: './not-here', paths: { '@app/*': ['*'] } },
      });
      expect(() => loadRiskConfig(configPath)).toThrow(CliError);
      expect(() => loadRiskConfig(configPath)).toThrow(/does not exist/);
    });
  });

  describe('no-op warnings', () => {
    it('warns when resolveWrappers is set with no leaf rule', () => {
      loadRiskConfig(writeConfig('no-leaf.json', { resolveWrappers: true }));
      expect(warnings.some(w => w.includes('enables no leaf rule'))).toBe(true);
    });

    it('warns when resolveWrappers is set without pathAliases', () => {
      loadRiskConfig(writeConfig('no-alias.json', { detectGetStateReads: true, resolveWrappers: true }));
      expect(warnings.some(w => w.includes('without pathAliases'))).toBe(true);
    });

    it('stays quiet for a fully configured wrapper setup', () => {
      loadRiskConfig(
        writeConfig('ok.json', {
          detectGetStateReads: true,
          resolveWrappers: true,
          pathAliases: { baseUrl: './src', paths: { '@app/*': ['*'] } },
        }),
      );
      expect(warnings).toHaveLength(0);
    });

    it('warns when a pathAlias target directory does not exist', () => {
      loadRiskConfig(
        writeConfig('dead-alias.json', {
          detectGetStateReads: true,
          resolveWrappers: true,
          pathAliases: { baseUrl: './src', paths: { '@app/*': ['*'], '@ghost/*': ['ghost/*'] } },
        }),
      );

      const warning = warnings.find(w => w.includes('target'));
      expect(warning).toBeDefined();
      expect(warning).toContain('@ghost/');
      expect(warning).toContain('can never resolve');
    });

    it('stays quiet when wrapper resolution is off', () => {
      loadRiskConfig(writeConfig('local-only.json', { detectGetStateReads: true }));
      expect(warnings).toHaveLength(0);
    });
  });
});

describe('--annotate under --mode annotation', () => {
  const WRAPPERS = join(__dirname, '__fixtures__', 'risk', 'wrappers');
  let warnings: string[];
  let originalWarn: typeof console.warn;
  let originalLog: typeof console.log;

  beforeEach(() => {
    warnings = [];
    originalWarn = console.warn;
    originalLog = console.log;
    console.warn = (...args: unknown[]) => {
      warnings.push(args.map(String).join(' '));
    };
    console.log = () => undefined;
  });

  afterEach(() => {
    console.warn = originalWarn;
    console.log = originalLog;
  });

  function argv(overrides: Record<string, unknown>) {
    return {
      paths: [WRAPPERS],
      verbose: false,
      concurrency: 2,
      'full-reasons': false,
      exclude: [],
      mode: 'annotation' as const,
      format: 'md' as const,
      'strict-paths': false,
      annotate: undefined,
      'risk-config': undefined,
      quote: 'single' as const,
      ...overrides,
    };
  }

  it('warns that nothing is discoverable', async () => {
    await runAnalyze(argv({ annotate: 'all' }) as never);
    expect(warnings.some(w => w.includes('--annotate does nothing under --mode annotation'))).toBe(true);
  });

  it('stays quiet without --annotate', async () => {
    await runAnalyze(argv({}) as never);
    expect(warnings).toHaveLength(0);
  });

  it('stays quiet under a discovery mode', async () => {
    await runAnalyze(argv({ annotate: 'bailout-only', mode: 'infer' }) as never);
    expect(warnings).toHaveLength(0);
  });
});

describe('wrapper resolution reporting', () => {
  const WRAPPERS = join(__dirname, '__fixtures__', 'risk', 'wrappers');
  let captured: string[];
  let originalLog: typeof console.log;

  beforeEach(() => {
    captured = [];
    originalLog = console.log;
    console.log = (...args: unknown[]) => {
      captured.push(args.map(String).join(' '));
    };
  });

  afterEach(() => {
    console.log = originalLog;
  });

  function argv(riskConfigPath: string) {
    return {
      paths: [WRAPPERS],
      verbose: false,
      concurrency: 2,
      'full-reasons': false,
      exclude: [],
      mode: 'infer' as const,
      format: 'md' as const,
      'strict-paths': false,
      annotate: undefined,
      'risk-config': riskConfigPath,
    };
  }

  it('reports how many imports resolved, so a clean report can be trusted', async () => {
    const configPath = join(mkdtempSync(join(tmpdir(), 'wrap-stats-')), 'rc.json');
    writeFileSync(configPath, JSON.stringify({ detectGetStateReads: true, resolveWrappers: true }));

    await runAnalyze(argv(configPath) as never);

    const output = captured.join('\n');
    expect(output).toMatch(/Wrapper resolution: \d+ import\(s\) resolved/);
    expect(output).toContain('stopped at the package boundary');
    expect(output).toContain('baseUrl: (none configured)');
  });

  it('lists per-alias hit counts so an alias that never matched is obvious', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'wrap-alias-'));
    mkdirSync(join(dir, 'live'), { recursive: true });
    mkdirSync(join(dir, 'idle'), { recursive: true });
    const configPath = join(dir, 'rc.json');
    writeFileSync(
      configPath,
      JSON.stringify({
        detectGetStateReads: true,
        resolveWrappers: true,
        pathAliases: { baseUrl: dir, paths: { '@live/*': ['live/*'], '@idle/*': ['idle/*'] } },
      }),
    );

    await runAnalyze(argv(configPath) as never);

    const output = captured.join('\n');
    expect(output).toContain('aliases: 0/2 matched at least one import');
    expect(output).toContain('never matched');
  });

  it('omits the line entirely when wrapper resolution is off', async () => {
    const configPath = join(mkdtempSync(join(tmpdir(), 'wrap-off-')), 'rc.json');
    writeFileSync(configPath, JSON.stringify({ detectGetStateReads: true }));

    await runAnalyze(argv(configPath) as never);

    expect(captured.some(l => l.includes('Wrapper resolution:'))).toBe(false);
  });
});

describe('resolver stats', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'resolver-stats-'));
    mkdirSync(join(tempDir, 'src'), { recursive: true });
    writeFileSync(join(tempDir, 'src', 'store.ts'), 'export const a = 1;\n');
  });

  it('counts resolved, package-boundary and unresolvable specifiers separately', () => {
    const stats = createResolverStats();
    const resolve = createModuleResolver({
      aliases: compilePathAliases({ '@app/*': ['*'] }, join(tempDir, 'src')),
      stats,
    });
    const from = join(tempDir, 'src', 'component.tsx');

    expect(resolve('./store', from)).not.toBeNull();
    expect(resolve('@app/store', from)).not.toBeNull();
    expect(resolve('react', from)).toBeNull();
    expect(resolve('./nope', from)).toBeNull();

    expect(stats).toEqual({
      resolved: 2,
      unresolvedBare: 1,
      unresolvedRelative: 1,
      aliasHits: new Map([['@app/', 1]]),
    });
  });

  it('reports zero resolved bare specifiers when aliases are missing', () => {
    const stats = createResolverStats();
    const resolve = createModuleResolver({ stats });
    resolve('@app/store', join(tempDir, 'src', 'component.tsx'));

    // This is the shape of a "clean report that means nothing".
    expect(stats.resolved).toBe(0);
    expect(stats.unresolvedBare).toBe(1);
  });

  it('seeds every configured alias so one that never matches shows as 0', () => {
    const stats = createResolverStats();
    createModuleResolver({
      aliases: compilePathAliases({ '@app/*': ['*'], '@never/*': ['nope/*'] }, join(tempDir, 'src')),
      stats,
    });

    expect(stats.aliasHits.get('@app/')).toBe(0);
    expect(stats.aliasHits.get('@never/')).toBe(0);
  });
});

describe('findDeadAliases', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = mkdtempSync(join(tmpdir(), 'dead-alias-'));
    mkdirSync(join(tempDir, 'real'), { recursive: true });
  });

  it('flags aliases whose every target directory is absent', () => {
    const aliases = compilePathAliases({ '@real/*': ['real/*'], '@ghost/*': ['ghost/*'] }, tempDir);

    expect(findDeadAliases(aliases).map(a => a.prefix)).toEqual(['@ghost/']);
  });

  it('keeps an alias when at least one target exists', () => {
    const aliases = compilePathAliases({ '@mixed/*': ['ghost/*', 'real/*'] }, tempDir);

    expect(findDeadAliases(aliases)).toHaveLength(0);
  });
});

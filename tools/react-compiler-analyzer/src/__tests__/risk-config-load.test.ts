import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

import { runAnalyze } from '../commands/analyze';
import { createModuleResolver, createResolverStats, compilePathAliases, findDeadAliases } from '../module-resolver';

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
      riskConfig: undefined,
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

  function argv(riskConfig: Record<string, unknown>) {
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
      riskConfig,
      quote: 'single' as const,
    };
  }

  it('reports how many imports resolved, so a clean report can be trusted', async () => {
    await runAnalyze(argv({ detectGetStateReads: true, resolveWrappers: true }) as never);

    const output = captured.join('\n');
    expect(output).toMatch(/Wrapper resolution: \d+ import\(s\) resolved/);
    expect(output).toContain('stopped at the package boundary');
    expect(output).toContain('baseUrl: (none configured)');
  });

  it('lists per-alias hit counts so an alias that never matched is obvious', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'wrap-alias-'));
    mkdirSync(join(dir, 'live'), { recursive: true });
    mkdirSync(join(dir, 'idle'), { recursive: true });
    await runAnalyze(
      argv({
        detectGetStateReads: true,
        resolveWrappers: true,
        pathAliases: { baseUrl: dir, paths: { '@live/*': ['live/*'], '@idle/*': ['idle/*'] } },
      }) as never,
    );

    const output = captured.join('\n');
    expect(output).toContain('aliases: 0/2 matched at least one import');
    expect(output).toContain('never matched');
  });

  it('omits the line entirely when wrapper resolution is off', async () => {
    await runAnalyze(argv({ detectGetStateReads: true }) as never);

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

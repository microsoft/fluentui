import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

import { runAnalyze } from '../commands/analyze';
import { createModuleResolver, createResolverStats } from '../module-resolver';
import { createWorkspace } from './workspace-helpers';

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
    await runAnalyze({ ...argv({ detectGetStateReads: true, resolveWrappers: true }), verbose: true } as never);

    const output = captured.join('\n');
    expect(output).toMatch(/Wrapper resolution: \d+ first-party import\(s\) resolved/);
    expect(output).toContain('package boundaries');
    expect(output).toContain('conditions: import, node, default');
    expect(output).toContain('mainFields: module, main');
  });

  it('reports the active explicit resolution policy without implying consumer build parity', async () => {
    await runAnalyze({
      ...argv({
        detectGetStateReads: true,
        resolveWrappers: true,
        resolver: { additionalConditionNames: ['source'], mainFields: ['source', 'module', 'main'] },
      }),
      verbose: true,
    } as never);

    const output = captured.join('\n');
    expect(output).toContain('conditions: import, node, default, source');
    expect(output).toContain('mainFields: source, module, main');
  });

  it('omits the line entirely when wrapper resolution is off', async () => {
    await runAnalyze({ ...argv({ detectGetStateReads: true, resolveWrappers: false }), verbose: true } as never);

    expect(captured.some(l => l.includes('Wrapper resolution:'))).toBe(false);
  });
});

describe('resolver stats', () => {
  let workspace: ReturnType<typeof createWorkspace>;

  beforeEach(() => {
    workspace = createWorkspace();
  });
  afterEach(() => workspace.cleanup());

  it('counts resolved, package-boundary and unresolvable specifiers separately', () => {
    const stats = createResolverStats();
    const resolve = createModuleResolver({ stats });
    const from = workspace.file('packages/app/src/index.tsx');

    expect(resolve('./relative', from)).not.toBeNull();
    expect(resolve('@ws/store', from)).not.toBeNull();
    expect(resolve('third-party-store', from)).toBeNull();
    expect(resolve('./nope', from)).toBeNull();

    expect(stats.resolved).toBe(2);
    expect(stats.packageBoundaries).toBe(1);
    expect(stats.unresolved).toEqual(new Map([['./nope', 1]]));
    expect(stats.tsconfigsUsed).toEqual(new Set([workspace.file('packages/app/tsconfig.json')]));
  });

  it('records unresolved imports instead of implying a clean analysis', () => {
    const stats = createResolverStats();
    const resolve = createModuleResolver({ stats });
    resolve('@missing/store', workspace.file('packages/app/src/index.tsx'));

    expect(stats.resolved).toBe(0);
    expect(stats.unresolved.get('@missing/store')).toBe(1);
    expect(stats.diagnostics).toContainEqual(
      expect.objectContaining({ kind: 'unresolved', specifier: '@missing/store' }),
    );
  });

  it('records the actual condition and entry-field policy even before resolving', () => {
    const stats = createResolverStats();
    createModuleResolver({
      additionalConditionNames: ['source'],
      mainFields: ['source', 'main'],
      stats,
    });

    expect(stats.conditionNames).toEqual(['import', 'node', 'default', 'source']);
    expect(stats.mainFields).toEqual(['source', 'main']);
    expect(stats.aliasHits.size).toBe(0);
  });
});

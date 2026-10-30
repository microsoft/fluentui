import { readFileSync, writeFileSync } from 'node:fs';
import { createCallGraphAnalyzer } from '../call-graph';
import { createModuleResolver, createResolverStats, type ResolverOptions } from '../module-resolver';
import { createWorkspace, WORKSPACE_FIXTURES } from './workspace-helpers';
import { join } from 'node:path';

describe('mocked multi-package workspace wrapper resolution', () => {
  let workspace: ReturnType<typeof createWorkspace>;
  beforeEach(() => {
    workspace = createWorkspace();
  });
  afterEach(() => workspace.cleanup());

  function analyze(options: ResolverOptions = {}, relative = 'packages/app/src/index.tsx') {
    const stats = createResolverStats();
    const analyzer = createCallGraphAnalyzer(
      createModuleResolver({ ...options, stats }),
      { detectGetStateReads: true },
      stats,
    );
    const file = workspace.file(relative);
    const lines = readFileSync(file, 'utf8').split('\n');
    const findings = analyzer.analyzeFile(file).map(finding => ({
      file: '../app/src/index.tsx',
      package: '@ws/app',
      line: finding.line,
      column: finding.column,
      function: /function\s+(\w+)/.exec(lines[finding.declarationStart.line - 1])?.[1],
      ruleId: finding.risk.leaf.ruleId,
      severity: finding.risk.leaf.severity,
      symbol: finding.risk.leaf.symbol,
      message: `reached via \`${finding.risk.chain.join(' → ')}\`: ${finding.risk.leaf.message}`,
    }));
    return { findings, stats };
  }

  it('exactly preserves the Babel path/relative/barrel findings and adds only newly supported resolution scenarios', () => {
    const golden = JSON.parse(readFileSync(join(WORKSPACE_FIXTURES, 'expected-findings.json'), 'utf8'));
    const { findings } = analyze();
    // Compiler acceptance is independently tested by the backend suites; this oracle is for risk findings.
    const expected = golden.findings.map(({ compiled: _compiled, ...finding }: { compiled: boolean }) => finding);
    const oldNames = new Set(['PathsWidget', 'BarrelWidget', 'RelativeWidget']);
    expect(findings.filter(finding => oldNames.has(finding.function!))).toEqual(expected);
    expect(findings.filter(finding => !oldNames.has(finding.function!)).map(finding => finding.function)).toEqual([
      'FeatureWidget',
      'BuiltWidget',
      'InternalWidget',
      'NodeNextWidget',
    ]);
  });

  it('follows per-package aliases through symlink exports with the exact transitive chain', () => {
    const { findings, stats } = analyze();
    expect(findings).toContainEqual(
      expect.objectContaining({
        function: 'FeatureWidget',
        line: 15,
        column: 47,
        ruleId: 'nonreactive-store-read',
        message: expect.stringContaining('`readFeature → readFeatureLeaf`'),
      }),
    );
    expect(stats.tsconfigsUsed).toContain(workspace.file('packages/feature/tsconfig.json'));
  });

  it('does not silently treat unbuilt first-party packages, CommonJS, or external implementations as clean code', () => {
    const { findings, stats } = analyze();
    expect(findings.some(finding => ['UnbuiltWidget', 'CjsWidget', 'ExternalWidget'].includes(finding.function!))).toBe(
      false,
    );
    expect(stats.unresolved.get('@ws/refs-unbuilt')).toBeGreaterThan(0);
    expect(stats.unsupportedTargets).toBeGreaterThan(0);
    expect(stats.packageBoundaries).toBeGreaterThan(0);
  });

  function conditionalEntry() {
    const relative = 'packages/app/src/conditional.tsx';
    writeFileSync(
      workspace.file(relative),
      [
        "import { readTypography } from '@ws/controls/typography';",
        "import { readSearchBox } from '@ws/controls/search-box';",
        "import { readTeachingPopover } from '@ws/controls/teaching-popover';",
        'export function TypographyWidget() { return <div>{readTypography()}</div>; }',
        'export function SearchBoxWidget() { return <div>{readSearchBox()}</div>; }',
        'export function TeachingPopoverWidget() { return <div>{readTeachingPopover()}</div>; }',
      ].join('\n'),
    );
    return relative;
  }

  it('zero-config inspects the built default branch, not custom source branches', () => {
    const { findings, stats } = analyze({}, conditionalEntry());
    expect(findings).toEqual([]);
    expect(stats.unresolved.get('@ws/controls/search-box')).toBeGreaterThan(0);
    expect(stats.diagnostics).toContainEqual(
      expect.objectContaining({ kind: 'resolved', target: workspace.file('packages/controls/lib/typography.js') }),
    );
  });

  it('explicit source opt-in reveals distinguishable source risks without reordering default-first exports', () => {
    const { findings, stats } = analyze({ additionalConditionNames: ['source'] }, conditionalEntry());
    expect(findings.map(finding => finding.function)).toEqual(['TypographyWidget', 'SearchBoxWidget']);
    expect(findings[0].message).toContain('`readTypography`');
    expect(findings[1].message).toContain('`readSearchBox`');
    expect(stats.unresolved.size).toBe(0);
    expect(stats.diagnostics).toContainEqual(
      expect.objectContaining({
        kind: 'resolved',
        target: workspace.file('packages/controls/lib/teaching-popover.js'),
      }),
    );
  });
});

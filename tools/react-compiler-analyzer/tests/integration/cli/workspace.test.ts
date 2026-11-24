import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createWorkspace, WORKSPACE_FIXTURES } from '../../../src/__tests__/workspace-helpers';

describe('built CLI multi-package workspace resolution', () => {
  let workspace: ReturnType<typeof createWorkspace>;
  beforeEach(() => {
    workspace = createWorkspace();
  });
  afterEach(() => workspace.cleanup());

  function analyze(paths: string[]) {
    const result = spawnSync(
      process.execPath,
      [join(__dirname, '../../../bin/react-compiler-analyzer.js'), 'analyze', ...paths, '--format', 'json'],
      {
        cwd: workspace.file('packages/tool'),
        encoding: 'utf8',
        timeout: 30000,
        maxBuffer: 2 * 1024 * 1024,
      },
    );
    if (result.error) {
      throw result.error;
    }
    if (result.status !== 0) {
      throw new Error(`Workspace CLI failed (${result.status}): ${result.stderr}\n${result.stdout}`);
    }
    return { document: JSON.parse(result.stdout), stderr: result.stderr };
  }

  it('scans sibling packages from the tool package with default wrapper resolution and no pathAliases', () => {
    const golden = JSON.parse(readFileSync(join(WORKSPACE_FIXTURES, 'expected-findings.json'), 'utf8'));
    const { document, stderr } = analyze(['../app', '../feature']);
    const oldNames = new Set(golden.findings.map((finding: { function: string }) => finding.function));
    expect(document.findings.filter((finding: { function: string }) => oldNames.has(finding.function))).toEqual(
      golden.findings,
    );
    expect(document.findings.map((finding: { function: string }) => finding.function)).toEqual([
      'PathsWidget',
      'BarrelWidget',
      'RelativeWidget',
      'FeatureWidget',
      'BuiltWidget',
      'InternalWidget',
      'NodeNextWidget',
    ]);
    expect(stderr).toContain('@ws/refs-unbuilt');
  }, 35000);

  it('honors config source conditions and ordered mainFields while zero-config selects built implementations', () => {
    writeFileSync(
      workspace.file('packages/app/src/policy.tsx'),
      [
        "import { readTypography } from '@ws/controls/typography';",
        "import { readSearchBox } from '@ws/controls/search-box';",
        "import { readTeachingPopover } from '@ws/controls/teaching-popover';",
        "import { readEntry } from '@ws/entries';",
        'export function TypographyWidget() { return <div>{readTypography()}</div>; }',
        'export function SearchBoxWidget() { return <div>{readSearchBox()}</div>; }',
        'export function TeachingPopoverWidget() { return <div>{readTeachingPopover()}</div>; }',
        'export function EntryWidget() { return <div>{readEntry()}</div>; }',
      ].join('\n'),
    );
    const defaults = analyze(['../app/src/policy.tsx']);
    expect(defaults.document.findings).toEqual([]);
    expect(defaults.stderr).toContain('@ws/controls/search-box');
    writeFileSync(
      workspace.file('packages/tool/rca.config.json'),
      JSON.stringify({
        analyze: {
          risks: {
            detectGetStateReads: true,
            resolver: { additionalConditionNames: ['source'], mainFields: ['source', 'module', 'main'] },
          },
        },
      }),
    );
    const optedIn = analyze(['../app/src/policy.tsx']);
    expect(optedIn.document.findings.map((finding: { function: string }) => finding.function)).toEqual([
      'TypographyWidget',
      'SearchBoxWidget',
      'EntryWidget',
    ]);
  }, 65000);
});

import { createFormatter } from '../formatter';
import { printReport as printReportImpl, printSummary as printSummaryImpl } from '../reporter';
import type { DirectiveAnalysis } from '../types';

/** Render via the markdown formatter so existing snapshots stay stable. */
function printReport(results: DirectiveAnalysis[], workspaceRoot: string, fullReasons: boolean): void {
  printReportImpl(createFormatter('md'), results, workspaceRoot, fullReasons);
}

/** Render via the markdown formatter so existing snapshots stay stable. */
function printSummary(results: DirectiveAnalysis[]): void {
  printSummaryImpl(createFormatter('md'), results);
}

function captureConsole(fn: () => void): string {
  const logs: string[] = [];
  const originalLog = console.log;
  console.log = (...args: unknown[]) => logs.push(args.join(' '));
  try {
    fn();
  } finally {
    console.log = originalLog;
  }
  return logs.join('\n');
}

function makeResult(overrides: Partial<DirectiveAnalysis>): DirectiveAnalysis {
  return {
    filePath: '/workspace/src/Component.tsx',
    packageName: '@test/pkg',
    line: 5,
    functionName: 'MyComponent',
    status: 'active',
    compilerEvent: 'CompileSuccess',
    directiveType: 'use-memo',
    ...overrides,
  };
}

describe('printReport', () => {
  it('shows "Active (compilable)" section for use-memo directives', () => {
    const results: DirectiveAnalysis[] = [makeResult({ directiveType: 'use-memo', status: 'active' })];

    const output = captureConsole(() => printReport(results, '/workspace', false));

    expect(output).toMatchInlineSnapshot(`
      "
      ## @test/pkg

      ### Active (compilable)

      | Location | Function | Compiler Event | Reason |
      |----------|----------|----------------|--------|
      | src/Component.tsx:5 | MyComponent | CompileSuccess |  |
      "
    `);
    expect(output).not.toContain('needs `// justified:` comment');
  });

  it('shows "Active (needs // justified: comment)" section for use-no-memo directives', () => {
    const results: DirectiveAnalysis[] = [makeResult({ directiveType: 'use-no-memo', status: 'active' })];

    const output = captureConsole(() => printReport(results, '/workspace', false));

    expect(output).toMatchInlineSnapshot(`
      "
      ## @test/pkg

      ### Active (needs \`// justified:\` comment)

      | Location | Function | Compiler Event | Reason |
      |----------|----------|----------------|--------|
      | src/Component.tsx:5 | MyComponent | CompileSuccess |  |
      "
    `);
    expect(output).not.toContain('Active (compilable)');
  });

  it('shows both sections when both directive types are active', () => {
    const results: DirectiveAnalysis[] = [
      makeResult({ directiveType: 'use-memo', status: 'active', functionName: 'CompA' }),
      makeResult({ directiveType: 'use-no-memo', status: 'active', functionName: 'CompB', line: 10 }),
    ];

    const output = captureConsole(() => printReport(results, '/workspace', false));

    expect(output).toMatchInlineSnapshot(`
      "
      ## @test/pkg

      ### Active (needs \`// justified:\` comment)

      | Location | Function | Compiler Event | Reason |
      |----------|----------|----------------|--------|
      | src/Component.tsx:10 | CompB | CompileSuccess |  |

      ### Active (compilable)

      | Location | Function | Compiler Event | Reason |
      |----------|----------|----------------|--------|
      | src/Component.tsx:5 | CompA | CompileSuccess |  |
      "
    `);
  });

  it('prints "No directives found." when results are empty', () => {
    const output = captureConsole(() => printReport([], '/workspace', false));

    expect(output).toMatchInlineSnapshot(`
      "
      No directives found."
    `);
  });

  it('shows Redundant section for redundant directives', () => {
    const results: DirectiveAnalysis[] = [
      makeResult({
        directiveType: 'use-no-memo',
        status: 'redundant',
        compilerEvent: 'CompileError',
        reason: 'mutates ref',
      }),
    ];

    const output = captureConsole(() => printReport(results, '/workspace', false));

    expect(output).toMatchInlineSnapshot(`
      "
      ## @test/pkg

      ### Redundant (removable)

      | Location | Function | Compiler Event | Reason |
      |----------|----------|----------------|--------|
      | src/Component.tsx:5 | MyComponent | CompileError | mutates ref |
      "
    `);
  });
});

describe('printSummary', () => {
  it('shows "Active use memo (compilable)" for use-memo only results', () => {
    const results: DirectiveAnalysis[] = [
      makeResult({ directiveType: 'use-memo', status: 'active' }),
      makeResult({ directiveType: 'use-memo', status: 'active', functionName: 'CompB', line: 10 }),
    ];

    const output = captureConsole(() => printSummary(results));

    expect(output).toMatchInlineSnapshot(`
      "## Summary

      - **Total directives:** 2
      - **Redundant** (removable): 0
      - **Active** \`'use memo'\` (compilable): 2
      - **Skipped** (already justified): 0

      > All directives are valid. Nothing to do.
      "
    `);
    expect(output).not.toContain('needs `// justified:` comment): ');
  });

  it('shows "Active use no memo (needs justified)" for use-no-memo only results', () => {
    const results: DirectiveAnalysis[] = [makeResult({ directiveType: 'use-no-memo', status: 'active' })];

    const output = captureConsole(() => printSummary(results));

    expect(output).toMatchInlineSnapshot(`
      "## Summary

      - **Total directives:** 1
      - **Redundant** (removable): 0
      - **Active** \`'use no memo'\` (needs \`// justified:\` comment): 1
      - **Skipped** (already justified): 0

      > **1** active \`'use no memo'\` directive(s) need a \`// justified: <reason>\` comment.
      > Run with \`--fix\` to annotate them.
      "
    `);
    expect(output).not.toContain('compilable');
  });

  it('shows redundant use-no-memo messaging with --fix suggestion', () => {
    const results: DirectiveAnalysis[] = [
      makeResult({ directiveType: 'use-no-memo', status: 'redundant', compilerEvent: 'CompileError' }),
    ];

    const output = captureConsole(() => printSummary(results));

    expect(output).toMatchInlineSnapshot(`
      "## Summary

      - **Total directives:** 1
      - **Redundant** (removable): 1
      - **Skipped** (already justified): 0

      > **1** redundant \`'use no memo'\` directive(s) found.
      > Run with \`--fix\` to auto-remove them.
      "
    `);
  });

  it('shows combined messaging when both redundant and active use-no-memo exist', () => {
    const results: DirectiveAnalysis[] = [
      makeResult({ directiveType: 'use-no-memo', status: 'redundant', compilerEvent: 'CompileError' }),
      makeResult({ directiveType: 'use-no-memo', status: 'active', functionName: 'CompB', line: 10 }),
    ];

    const output = captureConsole(() => printSummary(results));

    expect(output).toMatchInlineSnapshot(`
      "## Summary

      - **Total directives:** 2
      - **Redundant** (removable): 1
      - **Active** \`'use no memo'\` (needs \`// justified:\` comment): 1
      - **Skipped** (already justified): 0

      > **1** redundant \`'use no memo'\` directive(s) can be safely removed.
      > **1** active \`'use no memo'\` directive(s) need a \`// justified: <reason>\` comment.
      >
      > Run with \`--fix\` to auto-remove redundant directives and annotate active ones.
      "
    `);
  });

  it('shows broken messaging for broken use-memo', () => {
    const results: DirectiveAnalysis[] = [
      makeResult({
        directiveType: 'use-memo',
        status: 'broken',
        compilerEvent: 'CompileError',
        reason: 'mutates ref',
      }),
    ];

    const output = captureConsole(() => printSummary(results));

    expect(output).toMatchInlineSnapshot(`
      "## Summary

      - **Total directives:** 1
      - **Redundant** (removable): 0
      - **Skipped** (already justified): 0
      - **Broken** ('use memo' on non-compilable): 1

      > ⚠ **1** broken \`'use memo'\` directive(s) — function cannot be compiled.
      "
    `);
  });

  it('does not show justified/fix messaging when only use-memo active exists', () => {
    const results: DirectiveAnalysis[] = [makeResult({ directiveType: 'use-memo', status: 'active' })];

    const output = captureConsole(() => printSummary(results));

    expect(output).not.toContain('needs `// justified:` comment): ');
    expect(output).not.toContain('Run with `--fix`');
  });
});

describe('multi-path reporting', () => {
  it('printReport groups results by package in alphabetical order with correct sections', () => {
    const results: DirectiveAnalysis[] = [
      makeResult({
        packageName: '@scope/pkg-alpha',
        functionName: 'CompA',
        status: 'active',
        directiveType: 'use-no-memo',
      }),
      makeResult({
        packageName: '@scope/pkg-beta',
        functionName: 'CompB',
        status: 'redundant',
        directiveType: 'use-no-memo',
        compilerEvent: 'CompileError',
      }),
    ];

    const output = captureConsole(() => printReport(results, '/workspace', false));

    expect(output).toMatchInlineSnapshot(`
      "
      ## @scope/pkg-alpha

      ### Active (needs \`// justified:\` comment)

      | Location | Function | Compiler Event | Reason |
      |----------|----------|----------------|--------|
      | src/Component.tsx:5 | CompA | CompileSuccess |  |


      ## @scope/pkg-beta

      ### Redundant (removable)

      | Location | Function | Compiler Event | Reason |
      |----------|----------|----------------|--------|
      | src/Component.tsx:5 | CompB | CompileError |  |
      "
    `);
    // Alpha appears before Beta (alphabetical)
    expect(output).not.toContain('Active (compilable)');
  });

  it('printSummary aggregates counts across multiple packages', () => {
    const results: DirectiveAnalysis[] = [
      makeResult({
        packageName: '@scope/pkg-alpha',
        status: 'active',
        directiveType: 'use-no-memo',
      }),
      makeResult({
        packageName: '@scope/pkg-beta',
        status: 'active',
        directiveType: 'use-no-memo',
        functionName: 'CompB',
      }),
      makeResult({
        packageName: '@scope/pkg-beta',
        status: 'redundant',
        directiveType: 'use-no-memo',
        compilerEvent: 'CompileError',
        functionName: 'CompC',
      }),
    ];

    const output = captureConsole(() => printSummary(results));

    expect(output).toMatchInlineSnapshot(`
      "## Summary

      - **Total directives:** 3
      - **Redundant** (removable): 1
      - **Active** \`'use no memo'\` (needs \`// justified:\` comment): 2
      - **Skipped** (already justified): 0

      > **1** redundant \`'use no memo'\` directive(s) can be safely removed.
      > **2** active \`'use no memo'\` directive(s) need a \`// justified: <reason>\` comment.
      >
      > Run with \`--fix\` to auto-remove redundant directives and annotate active ones.
      "
    `);
    expect(output).not.toContain('compilable');
  });
});

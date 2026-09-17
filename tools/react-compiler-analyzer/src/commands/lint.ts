import type { CommandModule } from 'yargs';

import { analyzeNoMemoDirectives, deriveMemoDirectiveStatuses } from '../analyzer';
import { compileFilesStreaming } from '../compiler';
import { discoverFilesWithDirectives } from '../discovery';
import { applyFixes } from '../fixer';
import { printReport, printSummary } from '../reporter';
import { toLintDocument, writeDocument } from '../serializer';
import type { DirectiveAnalysis, RcaConfig } from '../types';
import { runReport, sharedOptions, sortByLocation, type SharedArgv } from './shared';

type LintArgv = SharedArgv & { fix: boolean };

async function analyzeDirectiveFiles(
  files: Parameters<typeof compileFilesStreaming>[0],
  argv: LintArgv,
  verbose = argv.verbose,
): Promise<DirectiveAnalysis[]> {
  const results: DirectiveAnalysis[] = [];
  await compileFilesStreaming(
    files,
    {
      concurrency: argv.concurrency,
      verbose,
      compilationMode: argv.mode,
      workspaceRoot: process.cwd(),
      parserPlugins: argv['parser-plugin'],
    },
    async compiled => {
      results.push(...deriveMemoDirectiveStatuses(compiled, argv.mode));
      results.push(
        ...(await analyzeNoMemoDirectives(compiled, argv.mode, verbose, {
          parserPlugins: argv['parser-plugin'],
        })),
      );
    },
  );
  sortByLocation(results);
  return results;
}

/**
 * `--fix` rewrites redundant and conflicting directives, so those stop being failures. A broken
 * `'use memo'` has no automated repair and must still fail the run.
 */
function lintExitCode(results: DirectiveAnalysis[], fixed: boolean): number {
  const fixableFailures =
    results.some(r => r.status === 'redundant' && r.directiveType === 'use-no-memo') ||
    results.some(r => r.status === 'conflicting');
  const unfixableFailures = results.some(r => r.status === 'broken');

  return unfixableFailures || (fixableFailures && !fixed) ? 1 : 0;
}

/** Command body, separated from the yargs wiring so tests can assert on the exit code. */
export async function runLint(argv: LintArgv): Promise<number> {
  return runReport(argv, {
    title: 'React Compiler Lint',
    discover: discoverFilesWithDirectives,
    emptyMessage: 'No files with directives found.',
    countLabel: 'Files with directives',
    run: async ({ f, files, endScanLog }) => {
      const results = await analyzeDirectiveFiles(files, argv);

      endScanLog();

      const workspaceRoot = process.cwd();
      const fixResult = argv.fix ? await applyFixes(results) : undefined;
      const validationResults =
        argv.fix && fixResult!.filesModified > 0 ? await analyzeDirectiveFiles(files, argv, false) : results;
      const exitCode = lintExitCode(validationResults, false);

      if (argv.format === 'json') {
        writeDocument(toLintDocument(results, { mode: argv.mode, workspaceRoot }));
        return exitCode;
      }

      printReport(f, results, workspaceRoot, argv.verbose);
      printSummary(f, results);

      if (argv.fix) {
        const fixable = results.filter(
          r =>
            (r.status === 'redundant' && r.directiveType === 'use-no-memo') ||
            (r.status === 'active' && r.directiveType === 'use-no-memo') ||
            r.status === 'conflicting',
        );
        if (fixable.length > 0) {
          f.line('Applying fixes...');
          const parts: string[] = [];
          if (fixResult!.directivesRemoved > 0) {
            parts.push(`${fixResult!.directivesRemoved} redundant directive(s) removed`);
          }
          if (fixResult!.directivesJustified > 0) {
            parts.push(`${fixResult!.directivesJustified} active directive(s) annotated with // justified:`);
          }
          f.line(`Fixed: ${parts.join(', ')} across ${fixResult!.filesModified} file(s).`);
          f.blank();
        } else {
          f.line('Nothing to fix.');
          f.blank();
        }
      }

      return exitCode;
    },
  });
}

export function createLintCommand(config: RcaConfig): CommandModule<{}, LintArgv> {
  return {
    command: 'lint <paths..>',
    describe: "Lint 'use no memo' and 'use memo' directives for redundancy (CI gate)",
    builder: yarg =>
      sharedOptions(yarg, config).option('fix', {
        type: 'boolean' as const,
        describe: 'Auto-remove redundant directives and resolve conflicts',
        default: false,
      }),
    handler: async argv => {
      process.exitCode = await runLint(argv);
    },
  };
}

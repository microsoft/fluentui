import type { CommandModule } from 'yargs';

import { analyzeNoMemoDirectives, deriveMemoDirectiveStatuses } from '../analyzer';
import { compileFilesStreaming } from '../compiler';
import { discoverFilesWithDirectives } from '../discovery';
import { applyFixes } from '../fixer';
import { printReport, printSummary } from '../reporter';
import { toLintDocument, writeDocument } from '../serializer';
import type { DirectiveAnalysis } from '../types';
import { runReport, sharedOptions, sortByLocation, type SharedArgv } from './shared';

type LintArgv = SharedArgv & { fix: boolean };

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
      const results: DirectiveAnalysis[] = [];

      await compileFilesStreaming(
        files,
        {
          concurrency: argv.concurrency,
          verbose: argv.verbose,
          compilationMode: argv.mode,
          parserPlugins: argv['parser-plugin'],
        },
        async compiled => {
          // 'use memo' statuses come directly from first compilation (no recompile)
          results.push(...deriveMemoDirectiveStatuses(compiled, argv.mode, { fullReasons: argv['full-reasons'] }));
          // 'use no memo' requires strip + recompile, which needs the source still in hand
          results.push(
            ...(await analyzeNoMemoDirectives(compiled, argv.mode, argv.verbose, {
              fullReasons: argv['full-reasons'],
            })),
          );
        },
      );

      endScanLog();

      sortByLocation(results);

      const workspaceRoot = process.cwd();

      if (argv.format === 'json') {
        writeDocument(toLintDocument(results, { mode: argv.mode, workspaceRoot }));
        return lintExitCode(results, argv.fix);
      }

      printReport(f, results, workspaceRoot, argv['full-reasons']);
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
          const fixResult = await applyFixes(results);
          const parts: string[] = [];
          if (fixResult.directivesRemoved > 0) {
            parts.push(`${fixResult.directivesRemoved} redundant directive(s) removed`);
          }
          if (fixResult.directivesJustified > 0) {
            parts.push(`${fixResult.directivesJustified} active directive(s) annotated with // justified:`);
          }
          f.line(`Fixed: ${parts.join(', ')} across ${fixResult.filesModified} file(s).`);
          f.blank();
        } else {
          f.line('Nothing to fix.');
          f.blank();
        }
      }

      return lintExitCode(results, argv.fix);
    },
  });
}

export const lintCommand: CommandModule<{}, LintArgv> = {
  command: 'lint <paths..>',
  describe: "Lint 'use no memo' and 'use memo' directives for redundancy (CI gate)",
  builder: yarg =>
    sharedOptions(yarg).option('fix', {
      type: 'boolean' as const,
      describe: 'Auto-remove redundant directives and resolve conflicts',
      default: false,
    }),
  handler: async argv => {
    process.exitCode = await runLint(argv);
  },
};

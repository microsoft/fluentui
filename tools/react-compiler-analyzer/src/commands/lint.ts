import type { CommandModule } from 'yargs';

import { analyzeNoMemoDirectives, deriveMemoDirectiveStatuses, revalidateJustifiedDirectives } from '../analyzer';
import { compileFilesStreaming } from '../compiler';
import { normalizeCompilerEvents } from '../compiler-events';
import { discoverFilesWithDirectives } from '../discovery';
import { applyFixes } from '../fixer';
import { compareText } from '../ordering';
import { toWorkspacePath } from '../path-utils';
import { printReport, printSummary } from '../reporter';
import { toLintDocument, writeDocument } from '../serializer';
import type { DirectiveAnalysis, RcaConfig } from '../types';
import { runReport, sharedOptions, sortByLocation, type SharedArgv } from './shared';

type LintArgv = SharedArgv & { fix: boolean; 'revalidate-justified'?: boolean };

async function analyzeDirectiveFiles(
  files: Parameters<typeof compileFilesStreaming>[0],
  argv: LintArgv,
  verbose = argv.verbose,
): Promise<{ results: DirectiveAnalysis[]; unparseable: { file: string; error: string }[] }> {
  const results: DirectiveAnalysis[] = [];
  const unparseable: { file: string; error: string }[] = [];
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
      if (compiled.error) {
        unparseable.push({ file: compiled.filePath, error: compiled.error.message });
        return;
      }
      const { unattributedErrors } = normalizeCompilerEvents(
        compiled.events,
        compiled.source,
        compiled.sourceFunctions,
        {
          includeFullDiagnostics: verbose,
          includeMutationMetadata: false,
        },
      );
      if (unattributedErrors.length > 0) {
        unparseable.push({
          file: compiled.filePath,
          error: unattributedErrors.map(error => `${error.kind}: ${error.reason}`).join('; '),
        });
        return;
      }
      const options = { parserPlugins: argv['parser-plugin'], revalidateJustified: argv['revalidate-justified'] };
      results.push(...deriveMemoDirectiveStatuses(compiled, argv.mode, options));
      results.push(...(await analyzeNoMemoDirectives(compiled, argv.mode, verbose, options)));
      if (argv['revalidate-justified']) {
        results.push(...(await revalidateJustifiedDirectives(compiled, argv.mode, options)));
      }
    },
  );
  sortByLocation(results);
  unparseable.sort((a, b) => compareText(a.file, b.file) || compareText(a.error, b.error));
  return { results, unparseable };
}

/** Check the final directive statuses and any files that could not be analyzed. */
function lintExitCode(results: DirectiveAnalysis[], unparseableCount: number): number {
  const fixableFailures =
    results.some(r => r.status === 'redundant' && (r.directiveType === 'use-no-memo' || r.revalidated)) ||
    results.some(r => r.status === 'conflicting');
  const unfixableFailures = results.some(r => r.status === 'broken');

  return unfixableFailures || fixableFailures || unparseableCount > 0 ? 1 : 0;
}

/** Command body, separated from the yargs wiring so tests can assert on the exit code. */
export async function runLint(argv: LintArgv): Promise<number> {
  return runReport(argv, {
    title: 'React Compiler Lint',
    discover: discoverFilesWithDirectives,
    emptyMessage: 'No files with directives found.',
    countLabel: 'Files with directives',
    run: async ({ f, files, endScanLog }) => {
      const { results, unparseable } = await analyzeDirectiveFiles(files, argv);

      endScanLog();

      const workspaceRoot = process.cwd();
      const fixResult = argv.fix ? await applyFixes(results) : undefined;
      const validation =
        argv.fix && fixResult!.filesModified > 0
          ? await analyzeDirectiveFiles(files, argv, false)
          : { results, unparseable };
      const exitCode = lintExitCode(validation.results, validation.unparseable.length);

      if (argv.format === 'json') {
        writeDocument(
          toLintDocument(validation.results, { mode: argv.mode, workspaceRoot, unparseable: validation.unparseable }),
        );
        return exitCode;
      }

      printReport(f, results, workspaceRoot, argv.verbose);
      printSummary(f, results);
      if (validation.unparseable.length > 0) {
        f.heading(2, 'Files not analyzed (parse/compile errors)');
        f.blank();
        for (const { file, error } of validation.unparseable) {
          f.line(`${toWorkspacePath(workspaceRoot, file)}: ${error}`);
        }
        f.blank();
      }

      if (argv.fix) {
        if (fixResult!.filesModified > 0) {
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
          f.line(exitCode === 0 ? 'Nothing to fix.' : 'No automatic fixes applied.');
          f.blank();
        }
        if (exitCode !== 0) {
          f.line('Remaining lint failures require manual review; justified directives are report-only.');
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
      sharedOptions(yarg, config)
        .option('revalidate-justified', {
          type: 'boolean',
          default: false,
          describe: 'Revalidate justified directives against Babel without modifying them, even with --fix',
        })
        .option('fix', {
          type: 'boolean' as const,
          describe: 'Auto-remove redundant directives and resolve conflicts',
          default: false,
        }),
    handler: async argv => {
      process.exitCode = await runLint(argv);
    },
  };
}

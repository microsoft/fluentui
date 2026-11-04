import type { CommandModule } from 'yargs';

import { analyzeNoMemoDirectives, deriveMemoDirectiveStatuses, revalidateJustifiedDirectives } from '../analyzer';
import { compileFilesStreaming } from '../compiler';
import { normalizeCompilerEvents } from '../compiler-events';
import { errorCode, isParseError } from '../coverage-analyzer';
import { discoverFilesWithDirectives } from '../discovery';
import { applyFixes } from '../fixer';
import { compareText } from '../ordering';
import { printFileDiagnostics } from '../coverage-reporter';
import { printReport, printSummary } from '../reporter';
import { toLintDocument, writeDocument } from '../serializer';
import type { CoverageAccounting, DirectiveAnalysis, FileDiagnostic, RcaConfig } from '../types';
import { runReport, sharedOptions, sortByLocation, type SharedArgv } from './shared';

type LintArgv = SharedArgv & { fix: boolean; 'revalidate-justified'?: boolean };

async function analyzeDirectiveFiles(
  files: Parameters<typeof compileFilesStreaming>[0],
  argv: LintArgv,
  verbose = argv.verbose,
): Promise<{
  results: DirectiveAnalysis[];
  unparseable: { file: string; error: string }[];
  fileDiagnostics: FileDiagnostic[];
  coverage: CoverageAccounting;
  outcomes: Map<string, 'processed' | 'failed' | 'incomplete'>;
}> {
  const results: DirectiveAnalysis[] = [];
  const unparseable: { file: string; error: string }[] = [];
  const fileDiagnostics: FileDiagnostic[] = [];
  const outcomes = new Map<string, 'processed' | 'failed' | 'incomplete'>();
  await compileFilesStreaming(
    files,
    {
      concurrency: argv.concurrency,
      verbose,
      compilationMode: argv.mode,
      workspaceRoot: process.cwd(),
    },
    async compiled => {
      let hasFileFailure = false;
      if (compiled.error) {
        hasFileFailure = true;
        const parseError = isParseError(compiled.error);
        const code = errorCode(compiled.error);
        const inputError = parseError || code === 'RCA_INPUT_READ_ERROR';
        fileDiagnostics.push({
          file: compiled.filePath,
          package: compiled.packageName,
          stage: inputError ? 'input' : 'backend',
          category: parseError
            ? 'parse'
            : code === 'RCA_INPUT_READ_ERROR'
            ? 'read'
            : code === 'RCA_OUTPUT_PARSE_ERROR'
            ? 'output-parse'
            : code === 'RCA_RESOLUTION_ERROR'
            ? 'resolution'
            : 'backend',
          severity: 'error',
          attribution: 'file',
          count: 1,
          message: compiled.error.message,
          ...(code ? { code } : {}),
        });
        if (parseError) {
          unparseable.push({ file: compiled.filePath, error: compiled.error.message });
        }
      }
      const { unattributedErrors, analyses } = normalizeCompilerEvents(
        compiled.events,
        compiled.source,
        compiled.sourceFunctions,
        {
          includeFullDiagnostics: verbose,
          includeMutationMetadata: false,
        },
      );
      const attributedPipeline = new Map<string, { line?: number; column?: number; message: string; count: number }>();
      for (const event of compiled.events) {
        if (event.kind !== 'PipelineError') {
          continue;
        }
        const fn = compiled.sourceFunctions.resolveRawLocation(event.fnLoc);
        if (!fn) {
          continue;
        }
        const line = event.fnLoc?.start.line;
        const column = event.fnLoc?.start.column;
        const message = event.data || 'compiler pipeline failed';
        const key = JSON.stringify([fn.id, line, column, message]);
        const existing = attributedPipeline.get(key);
        if (existing) {
          existing.count++;
        } else {
          attributedPipeline.set(key, { line, column, message, count: 1 });
        }
      }
      for (const diagnostic of attributedPipeline.values()) {
        hasFileFailure = true;
        fileDiagnostics.push({
          file: compiled.filePath,
          package: compiled.packageName,
          stage: 'backend',
          category: 'pipeline',
          severity: 'error',
          attribution: 'function',
          ...(diagnostic.line !== undefined ? { line: diagnostic.line } : {}),
          ...(diagnostic.column !== undefined ? { column: diagnostic.column } : {}),
          count: diagnostic.count,
          message: diagnostic.message,
        });
      }
      if (unattributedErrors.length > 0) {
        hasFileFailure = true;
        for (const diagnostic of unattributedErrors) {
          fileDiagnostics.push({
            file: compiled.filePath,
            package: compiled.packageName,
            stage: diagnostic.kind === 'PipelineError' ? 'backend' : 'compiler',
            category:
              diagnostic.category === 'Suppression'
                ? 'suppression'
                : diagnostic.kind === 'PipelineError'
                ? 'pipeline'
                : 'compiler',
            severity: 'error',
            attribution: 'unresolved',
            ...(diagnostic.span ? { line: diagnostic.span.start.line, column: diagnostic.span.start.column } : {}),
            count: diagnostic.count,
            message: diagnostic.reason,
          });
        }
      }
      const options = { revalidateJustified: argv['revalidate-justified'] };
      const fileResults = [
        ...deriveMemoDirectiveStatuses(compiled, argv.mode, options),
        ...(await analyzeNoMemoDirectives(compiled, argv.mode, verbose, options)),
      ];
      if (argv['revalidate-justified']) {
        fileResults.push(...(await revalidateJustifiedDirectives(compiled, argv.mode, options)));
      }
      results.push(...fileResults);
      for (const result of fileResults) {
        if (
          result.status === 'broken' &&
          result.reason &&
          /(?:probe failed|probe unavailable|revalidation unavailable)/i.test(result.reason)
        ) {
          hasFileFailure = true;
          fileDiagnostics.push({
            file: result.filePath,
            package: result.packageName,
            stage: 'probe',
            category: 'probe',
            severity: 'error',
            attribution: 'unresolved',
            line: result.line,
            ...(result.column !== undefined ? { column: result.column } : {}),
            count: 1,
            message: result.reason,
          });
        }
      }
      if (hasFileFailure) {
        outcomes.set(compiled.filePath, analyses.length > 0 || fileResults.length > 0 ? 'incomplete' : 'failed');
      } else {
        outcomes.set(compiled.filePath, 'processed');
      }
    },
  );
  sortByLocation(results);
  unparseable.sort((a, b) => compareText(a.file, b.file) || compareText(a.error, b.error));
  fileDiagnostics.sort(
    (a, b) =>
      compareText(a.file, b.file) ||
      compareText(a.stage, b.stage) ||
      (a.line ?? 0) - (b.line ?? 0) ||
      compareText(a.category, b.category) ||
      compareText(a.message, b.message),
  );
  return {
    results,
    unparseable,
    fileDiagnostics,
    coverage: {
      discoveredFiles: files.length,
      processedFiles: [...outcomes.values()].filter(outcome => outcome === 'processed').length,
      failedFiles: [...outcomes.values()].filter(outcome => outcome === 'failed').length,
      incompleteFiles: [...outcomes.values()].filter(outcome => outcome === 'incomplete').length,
    },
    outcomes,
  };
}

/** Check the final directive statuses and any files that could not be analyzed. */
function lintExitCode(results: DirectiveAnalysis[], diagnosticCount: number): number {
  const fixableFailures =
    results.some(r => r.status === 'redundant' && (r.directiveType === 'use-no-memo' || r.revalidated)) ||
    results.some(r => r.status === 'conflicting');
  const unfixableFailures = results.some(r => r.status === 'broken');

  return unfixableFailures || fixableFailures || diagnosticCount > 0 ? 1 : 0;
}

/** Command body, separated from the yargs wiring so tests can assert on the exit code. */
export async function runLint(argv: LintArgv): Promise<number> {
  return runReport(argv, {
    title: 'React Compiler Lint',
    discover: discoverFilesWithDirectives,
    emptyMessage: 'No files with directives found.',
    countLabel: 'Files with directives',
    run: async ({ f, files, endScanLog }) => {
      const initial = await analyzeDirectiveFiles(files, argv);

      endScanLog();

      const workspaceRoot = process.cwd();
      const affectedFiles = new Set(initial.fileDiagnostics.map(diagnostic => diagnostic.file));
      const safeFixes = initial.results.filter(result => !affectedFiles.has(result.filePath));
      const fixResult = argv.fix ? await applyFixes(safeFixes) : undefined;
      const validation =
        argv.fix && fixResult!.filesModified > 0 ? await analyzeDirectiveFiles(files, argv, false) : initial;
      if (argv.fix && fixResult!.filesModified > 0 && affectedFiles.size > 0) {
        const preserved = initial.results.filter(result => affectedFiles.has(result.filePath));
        validation.results = [
          ...validation.results.filter(result => !affectedFiles.has(result.filePath)),
          ...preserved,
        ].sort((a, b) => compareText(a.filePath, b.filePath) || a.line - b.line || (a.column ?? 0) - (b.column ?? 0));
        validation.fileDiagnostics = [
          ...validation.fileDiagnostics.filter(diagnostic => !affectedFiles.has(diagnostic.file)),
          ...initial.fileDiagnostics,
        ];
        validation.unparseable = [
          ...validation.unparseable.filter(item => !affectedFiles.has(item.file)),
          ...initial.unparseable,
        ];
        for (const file of affectedFiles) {
          const outcome = initial.outcomes.get(file);
          if (outcome) {
            validation.outcomes.set(file, outcome);
          }
        }
        validation.coverage = {
          discoveredFiles: files.length,
          processedFiles: [...validation.outcomes.values()].filter(outcome => outcome === 'processed').length,
          failedFiles: [...validation.outcomes.values()].filter(outcome => outcome === 'failed').length,
          incompleteFiles: [...validation.outcomes.values()].filter(outcome => outcome === 'incomplete').length,
        };
      }
      const exitCode = lintExitCode(validation.results, validation.fileDiagnostics.length);

      if (argv.format === 'json') {
        writeDocument(
          toLintDocument(validation.results, {
            mode: argv.mode,
            workspaceRoot,
            unparseable: validation.unparseable,
            fileDiagnostics: validation.fileDiagnostics,
            coverage: validation.coverage,
          }),
        );
        return exitCode;
      }

      printReport(f, validation.results, workspaceRoot, argv.verbose);
      printSummary(f, validation.results);
      printFileDiagnostics(f, validation.fileDiagnostics, workspaceRoot);

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
          describe: 'Revalidate justified directives against Oxc without modifying them, even with --fix',
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

import type { CommandModule, Argv } from 'yargs';
import { deriveCandidates, isRiskAnalysisConfigured } from '../candidates';
import { compileFilesStreaming } from '../compiler';
import { deriveCompilerAnalysis, errorCode, isParseError } from '../coverage-analyzer';
import { applyAnnotations } from '../coverage-fixer';
import {
  printCoverageReport,
  printCoverageSummary,
  printFileDiagnostics,
  printRuntimeRisks,
  printSuppressionProtection,
  printUnparseableFiles,
} from '../coverage-reporter';
import { discoverAllFiles } from '../discovery';
import { compareText } from '../ordering';
import { toWorkspacePath } from '../path-utils';
import type { ResolverStats } from '../module-resolver';
import { toAnalysisDocument, writeDocument } from '../serializer';
import { applySuppressionProtection, planSuppressionProtection } from '../suppression-protection';
import type {
  AnnotateMode,
  CoverageAccounting,
  FileDiagnostic,
  FunctionAnalysis,
  QuoteStyle,
  RcaConfig,
  RiskConfig,
  SuppressionProtectionReport,
} from '../types';
import { CliError, runReport, sharedOptions, sortByLocation, type SharedArgv } from './shared';

type AnalyzeArgv = SharedArgv & {
  annotate: AnnotateMode | undefined;
  quote: QuoteStyle;
  riskConfig?: RiskConfig;
  'dry-run'?: boolean;
  'protect-suppressions'?: boolean;
};

/**
 * Report what wrapper resolution actually reached.
 *
 * Written with `console.log` rather than the formatter on purpose: under `--format json` the
 * formatter sink is discarded, and this is the one diagnostic that distinguishes "no risks found"
 * from "nothing resolved, so nothing could be found". `withReportOutput` redirects `console.log`
 * to stderr for json and into the buffer for html, so it survives every format.
 */
function reportWrapperResolution(stats: ResolverStats, verbose: boolean): void {
  if (verbose) {
    console.log(
      `Wrapper resolution: ${stats.resolved} first-party import(s) resolved, ` +
        `${stats.packageBoundaries} package boundaries, ${stats.unsupportedTargets} unsupported targets; ` +
        `${stats.tsconfigsUsed.size} tsconfig(s) used.`,
    );
    console.log(`  conditions: ${stats.conditionNames.join(', ')}`);
    console.log(`  mainFields: ${stats.mainFields.join(', ')}`);
    for (const diagnostic of stats.diagnostics) {
      console.log(`  ${JSON.stringify(diagnostic)}`);
    }
  }
  for (const diagnostic of stats.diagnostics) {
    if (['tsconfig-fallback', 'unsupported-target', 'error'].includes(diagnostic.kind)) {
      console.warn(`Warning: wrapper resolution ${diagnostic.kind}: ${diagnostic.message}`);
    }
  }
  if (stats.unresolved.size > 0) {
    console.warn(
      'Warning: unresolved first-party imports can hide runtime risks. Check the importing project’s tsconfig paths and package exports/imports.',
    );
    for (const [specifier, count] of [...stats.unresolved]
      .sort((a, b) => b[1] - a[1] || compareText(a[0], b[0]))
      .slice(0, 10)) {
      console.warn(`  ${specifier}: ${count}`);
    }
  }
}

/** Command body, separated from the yargs wiring so tests can assert on the exit code. */
export async function runAnalyze(argv: AnalyzeArgv): Promise<number> {
  if (argv['dry-run'] && !argv.annotate && !argv['protect-suppressions']) {
    throw new CliError('--dry-run requires --annotate or --protect-suppressions');
  }
  if (argv['protect-suppressions'] && argv.annotate) {
    throw new CliError('--protect-suppressions cannot be combined with --annotate');
  }
  const configuredRisk = argv.riskConfig;
  const riskConfig = configuredRisk ?? {};

  if (argv.annotate && argv.mode === 'annotation') {
    // In annotation mode the compiler only reports functions that already carry 'use memo', so
    // there is nothing left for --annotate to discover. Generate annotations with infer or all.
    console.warn(
      "Warning: --annotate does nothing under --mode annotation, which only compiles functions that already have 'use memo'. " +
        'Run with --mode infer or --mode all to discover functions to annotate.',
    );
  }

  return runReport(argv, {
    title: 'React Compiler Analysis',
    discover: discoverAllFiles,
    emptyMessage: 'No TypeScript files found.',
    countLabel: 'Files to analyze',
    run: async ({ f, files, endScanLog }) => {
      // Derive the compact analysis per file and drop the compilation result immediately — see
      // compileFilesStreaming for why retaining them does not scale.
      const coverageResults: FunctionAnalysis[] = [];
      const unparseable: { file: string; error: string }[] = [];
      const fileDiagnostics: FileDiagnostic[] = [];
      const suppressionPlans: ReturnType<typeof planSuppressionProtection>[] = [];
      const outcomes = new Map<string, 'processed' | 'failed' | 'incomplete'>();
      await compileFilesStreaming(
        files,
        {
          concurrency: argv.concurrency,
          verbose: argv.verbose,
          compilationMode: argv.mode,
          workspaceRoot: process.cwd(),
          riskConfig,
          onResolverStats: stats => {
            if (stats) {
              reportWrapperResolution(stats, argv.verbose);
            }
          },
        },
        result => {
          if (argv['protect-suppressions']) {
            suppressionPlans.push(planSuppressionProtection(result.source, result.filePath, { quote: argv.quote }));
          }
          const normalized = deriveCompilerAnalysis(result, {
            includeFullDiagnostics: argv.verbose,
            includeMutationMetadata: Boolean(argv.annotate),
          });
          coverageResults.push(...normalized.analyses);

          let hasFileFailure = false;
          const attributedPipeline = new Map<
            string,
            { line?: number; column?: number; message: string; count: number }
          >();
          for (const event of result.events) {
            if (event.kind !== 'PipelineError') {
              continue;
            }
            const fn = result.sourceFunctions.resolveRawLocation(event.fnLoc);
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
              file: result.filePath,
              package: result.packageName,
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
          if (result.error) {
            hasFileFailure = true;
            const parseError = isParseError(result.error);
            const code = errorCode(result.error);
            const inputError = parseError || code === 'RCA_INPUT_READ_ERROR';
            const diagnostic: FileDiagnostic = {
              file: result.filePath,
              package: result.packageName,
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
              message: result.error.message,
              ...(code ? { code } : {}),
            };
            fileDiagnostics.push(diagnostic);
            if (parseError) {
              unparseable.push({ file: result.filePath, error: result.error.message });
            }
          }

          const unattributed = normalized.unattributedErrors;
          if (unattributed.length > 0) {
            hasFileFailure = true;
            for (const diagnostic of unattributed) {
              fileDiagnostics.push({
                file: result.filePath,
                package: result.packageName,
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
          outcomes.set(
            result.filePath,
            hasFileFailure ? (normalized.analyses.length > 0 ? 'incomplete' : 'failed') : 'processed',
          );
        },
      );

      endScanLog();

      sortByLocation(coverageResults);
      unparseable.sort((a, b) => compareText(a.file, b.file) || compareText(a.error, b.error));
      fileDiagnostics.sort(
        (a, b) =>
          compareText(a.file, b.file) ||
          compareText(a.stage, b.stage) ||
          (a.line ?? 0) - (b.line ?? 0) ||
          compareText(a.category, b.category) ||
          compareText(a.message, b.message),
      );

      const workspaceRoot = process.cwd();
      const coverage: CoverageAccounting = {
        discoveredFiles: files.length,
        processedFiles: [...outcomes.values()].filter(outcome => outcome === 'processed').length,
        failedFiles: [...outcomes.values()].filter(outcome => outcome === 'failed').length,
        incompleteFiles: [...outcomes.values()].filter(outcome => outcome === 'incomplete').length,
      };
      const incompleteFiles = new Set(
        [...outcomes].filter(([, outcome]) => outcome !== 'processed').map(([file]) => file),
      );
      const candidates = deriveCandidates(coverageResults, isRiskAnalysisConfigured(configuredRisk));

      // Only fully attributable files are eligible for annotations.
      const annotatableResults = coverageResults.filter(result => !incompleteFiles.has(result.filePath));

      // Annotation writes to disk and is independent of how the report is rendered, so it must
      // run before the format branches — otherwise `--format json --annotate` silently does nothing.
      const annotate = argv.annotate
        ? {
            mode: argv.annotate,
            ...(await applyAnnotations(annotatableResults, argv.annotate, {
              quote: argv.quote,
              dryRun: argv['dry-run'],
            })),
          }
        : undefined;
      let resolvedProtection: SuppressionProtectionReport | undefined;
      if (argv['protect-suppressions']) {
        const result = await applySuppressionProtection(suppressionPlans, { dryRun: argv['dry-run'] });
        resolvedProtection = {
          ...(argv['dry-run'] ? { dryRun: true as const } : {}),
          filesModified: result.filesModified,
          filesPlanned: result.filesPlanned,
          results: result.results.map(({ filePath, ...item }) => ({
            file: filePath,
            ...item,
          })),
        };
      }
      const protectionConflict = resolvedProtection?.results.some(result => result.status === 'conflict') ?? false;

      if (argv.format === 'json') {
        writeDocument(
          toAnalysisDocument(coverageResults, {
            mode: argv.mode,
            workspaceRoot,
            unparseable,
            coverage,
            fileDiagnostics,
            annotate,
            suppressionProtection: resolvedProtection,
          }),
        );
        return coverage.failedFiles + coverage.incompleteFiles > 0 || protectionConflict ? 1 : 0;
      }
      printCoverageReport(f, coverageResults, workspaceRoot, argv.verbose, candidates);
      if (argv.verbose) {
        printRuntimeRisks(f, coverageResults, workspaceRoot);
      }
      printUnparseableFiles(f, unparseable, workspaceRoot);
      printFileDiagnostics(
        f,
        fileDiagnostics.filter(diagnostic => diagnostic.stage !== 'input'),
        workspaceRoot,
      );
      printCoverageSummary(f, coverageResults, argv.verbose, unparseable.length);
      if (resolvedProtection) {
        printSuppressionProtection(f, resolvedProtection, workspaceRoot);
      }

      if (annotate) {
        const counts = annotate.planned ?? annotate;
        const touched = counts.functionsAnnotated + counts.functionsBailedOut;
        f.blank();
        if (annotate.dryRun) {
          f.line('Dry run: no source files were modified.');
        }
        for (const target of annotate.targets ?? []) {
          f.line(
            `${toWorkspacePath(workspaceRoot, target.filePath)}:${target.line} ${
              target.functionName ?? '(anonymous)'
            }: ${annotate.dryRun ? 'insert' : 'inserted'} '${target.directive}' — ${
              target.rationale
            }; reported memo cache=${target.reportedMemoCache}; emitted caching=${target.emittedCaching}`,
          );
        }
        if (touched > 0) {
          const parts: string[] = [];
          if (counts.functionsAnnotated > 0) {
            parts.push(
              `${annotate.dryRun ? 'would annotate' : 'annotated'} ${
                counts.functionsAnnotated
              } function(s) with 'use memo'`,
            );
          }
          if (counts.functionsBailedOut > 0) {
            parts.push(
              `${annotate.dryRun ? 'would bail out' : 'bailed out'} ${
                counts.functionsBailedOut
              } risky function(s) with justified 'use no memo'`,
            );
          }
          f.line(`✓ ${parts.join('; ')} in ${counts.filesModified} file(s) (mode: ${annotate.mode}).`);
        } else {
          f.line('No functions to annotate.');
        }
      }

      if (argv.verbose) {
        f.blank();
        f.line('> **Tip:** Run `lint <path>` for directive health checks.');
      }

      return coverage.failedFiles + coverage.incompleteFiles > 0 || protectionConflict ? 1 : 0;
    },
  });
}

export function createAnalyzeCommand(config: RcaConfig): CommandModule<{}, AnalyzeArgv> {
  return {
    command: 'analyze <paths..>',
    describe: 'Analyze React Compiler coverage and migration potential',
    builder: yarg =>
      sharedOptions(yarg, config)
        .option('protect-suppressions', {
          type: 'boolean',
          default: false,
          describe:
            'Add a justified module-level use no memo guard to files with compiler-relevant ESLint suppressions',
        })
        .option('dry-run', {
          type: 'boolean',
          default: false,
          describe: 'Preview --annotate or --protect-suppressions edits without modifying source',
        })
        .option('annotate', {
          type: 'string' as const,
          describe:
            "Insert directives into compilable functions. 'manual-memo': 'use memo' on those with useMemo/useCallback/React.memo. 'all': 'use memo' on all. 'all-safe': like 'all' but risky functions (per rca.config.json) get a justified 'use no memo' bailout instead. 'bailout-only': write only the bailouts, no opt-ins.",
          choices: ['manual-memo', 'all', 'all-safe', 'bailout-only'] as const,
        })
        .option('quote', {
          type: 'string' as const,
          describe: 'Quote style for directives written by --annotate',
          choices: ['single', 'double'] as const,
          default: config.analyze?.quote ?? ('single' as QuoteStyle),
        }) as Argv<AnalyzeArgv>,
    handler: async argv => {
      process.exitCode = await runAnalyze({ ...argv, riskConfig: config.analyze?.risks });
    },
  };
}

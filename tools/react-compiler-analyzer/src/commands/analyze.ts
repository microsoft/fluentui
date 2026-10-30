import type { CommandModule, Argv } from 'yargs';
import { deriveCandidates, isRiskAnalysisConfigured } from '../candidates';
import { compileFilesStreaming } from '../compiler';
import { deriveCompilerAnalysis, isParseError } from '../coverage-analyzer';
import { applyAnnotations } from '../coverage-fixer';
import {
  printCoverageReport,
  printCoverageSummary,
  printRuntimeRisks,
  printUnparseableFiles,
} from '../coverage-reporter';
import { discoverAllFiles } from '../discovery';
import { compareText } from '../ordering';
import { toWorkspacePath } from '../path-utils';
import type { ResolverStats } from '../module-resolver';
import { toAnalysisDocument, writeDocument } from '../serializer';
import type { AnnotateMode, FunctionAnalysis, QuoteStyle, RcaConfig, RiskConfig } from '../types';
import { CliError, runReport, sharedOptions, sortByLocation, type SharedArgv } from './shared';

type AnalyzeArgv = SharedArgv & {
  annotate: AnnotateMode | undefined;
  quote: QuoteStyle;
  riskConfig?: RiskConfig;
  'dry-run'?: boolean;
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
  if (argv['dry-run'] && !argv.annotate) {
    throw new CliError('--dry-run requires --annotate');
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
      const compilerFailures: { file: string; error: string }[] = [];
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
          if (result.error) {
            if (isParseError(result.error)) {
              unparseable.push({ file: result.filePath, error: result.error.message });
            } else {
              compilerFailures.push({ file: result.filePath, error: result.error.message });
            }
            return;
          }
          const normalized = deriveCompilerAnalysis(result, {
            includeFullDiagnostics: argv.verbose,
            includeMutationMetadata: Boolean(argv.annotate),
          });
          if (normalized.unattributedErrors.length > 0) {
            compilerFailures.push({
              file: result.filePath,
              error: normalized.unattributedErrors.map(error => `${error.kind}: ${error.reason}`).join('; '),
            });
            return;
          }
          coverageResults.push(...normalized.analyses);
        },
      );

      endScanLog();

      if (compilerFailures.length > 0) {
        compilerFailures.sort((a, b) => compareText(a.file, b.file) || compareText(a.error, b.error));
        throw new CliError(
          `Compiler failed for ${compilerFailures.length} file(s):\n${compilerFailures
            .map(({ file, error }) => `  ${file}: ${error}`)
            .join('\n')}`,
        );
      }

      sortByLocation(coverageResults);
      unparseable.sort((a, b) => compareText(a.file, b.file) || compareText(a.error, b.error));

      const workspaceRoot = process.cwd();
      const candidates = deriveCandidates(coverageResults, isRiskAnalysisConfigured(configuredRisk));

      // Annotation writes to disk and is independent of how the report is rendered, so it must
      // run before the format branches — otherwise `--format json --annotate` silently does nothing.
      const annotate = argv.annotate
        ? {
            mode: argv.annotate,
            ...(await applyAnnotations(coverageResults, argv.annotate, {
              quote: argv.quote,
              dryRun: argv['dry-run'],
            })),
          }
        : undefined;

      if (argv.format === 'json') {
        writeDocument(
          toAnalysisDocument(coverageResults, {
            mode: argv.mode,
            workspaceRoot,
            unparseable,
            annotate,
          }),
        );
        return unparseable.length > 0 ? 1 : 0;
      }
      printCoverageReport(f, coverageResults, workspaceRoot, argv.verbose, candidates);
      if (argv.verbose) {
        printRuntimeRisks(f, coverageResults, workspaceRoot);
        printUnparseableFiles(f, unparseable, workspaceRoot);
      }
      printCoverageSummary(f, coverageResults, argv.verbose, unparseable.length);

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

      return unparseable.length > 0 ? 1 : 0;
    },
  });
}

export function createAnalyzeCommand(config: RcaConfig): CommandModule<{}, AnalyzeArgv> {
  return {
    command: 'analyze <paths..>',
    describe: 'Analyze React Compiler coverage and migration potential',
    builder: yarg =>
      sharedOptions(yarg, config)
        .option('dry-run', {
          type: 'boolean',
          default: false,
          describe: 'Preview --annotate insertions without modifying source',
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

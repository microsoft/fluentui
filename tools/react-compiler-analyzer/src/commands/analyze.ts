import type { CommandModule, Argv } from 'yargs';

import { existsSync, readFileSync } from 'node:fs';
import { dirname, isAbsolute, resolve } from 'node:path';

import { compileFilesStreaming } from '../compiler';
import { deriveCoverage } from '../coverage-analyzer';
import { applyAnnotations } from '../coverage-fixer';
import {
  printCoverageReport,
  printCoverageSummary,
  printMigrationCandidates,
  printRuntimeRisks,
  printUnparseableFiles,
} from '../coverage-reporter';
import { discoverAllFiles } from '../discovery';
import { compilePathAliases, findDeadAliases, type ResolverStats } from '../module-resolver';
import { toAnalysisDocument, writeDocument } from '../serializer';
import type { AnnotateMode, FunctionAnalysis, QuoteStyle, RiskConfig } from '../types';
import { CliError, runReport, sharedOptions, sortByLocation, type SharedArgv } from './shared';

type AnalyzeArgv = SharedArgv & {
  annotate: AnnotateMode | undefined;
  'risk-config': string | undefined;
  quote: QuoteStyle;
};

/** Keys allowed in a risk-config file, mirroring `risk-config.schema.json`. */
export const RISK_CONFIG_KEYS = new Set([
  '$schema',
  'storeAccessorPattern',
  'detectGetStateReads',
  'selectorHookProperties',
  'resolveWrappers',
  'pathAliases',
]);

/** Load and validate an optional risk-detection config JSON file. */
export function loadRiskConfig(path: string | undefined): RiskConfig {
  if (!path) {
    return {};
  }
  const resolved = resolve(path);
  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(resolved, 'utf-8'));
  } catch (err) {
    throw new CliError(`could not read risk config '${resolved}': ${(err as Error).message}`);
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new CliError(`risk config '${resolved}' must be a JSON object.`);
  }

  const unknownKeys = Object.keys(parsed).filter(k => !RISK_CONFIG_KEYS.has(k));
  if (unknownKeys.length > 0) {
    throw new CliError(
      `risk config '${resolved}' has unknown key(s): ${unknownKeys.join(', ')}. ` +
        'See risk-config.schema.json for the supported options.',
    );
  }

  // `$schema` is an editor-only hint; strip it before handing the config to the plugin.
  const { $schema: _schema, ...config } = parsed as RiskConfig & { $schema?: string };

  if (config.pathAliases) {
    // Anchor a relative baseUrl to the config file, not the cwd — otherwise running from the
    // wrong directory silently resolves nothing and still exits 0.
    const { baseUrl } = config.pathAliases;
    const absoluteBaseUrl = isAbsolute(baseUrl) ? baseUrl : resolve(dirname(resolved), baseUrl);
    if (!existsSync(absoluteBaseUrl)) {
      throw new CliError(
        `risk config '${resolved}' has pathAliases.baseUrl '${baseUrl}' which resolves to ` +
          `'${absoluteBaseUrl}', but that directory does not exist.`,
      );
    }
    config.pathAliases = { ...config.pathAliases, baseUrl: absoluteBaseUrl };
  }

  warnOnNoOpConfig(config, resolved);

  return config;
}

/**
 * Flag configurations that produce a clean report because nothing ran, rather than because
 * nothing was found. Both cases below exit 0 with an empty risk section.
 */
function warnOnNoOpConfig(config: RiskConfig, configPath: string): void {
  if (!config.resolveWrappers) {
    return;
  }
  const hasLeafRule =
    config.detectGetStateReads === true ||
    typeof config.storeAccessorPattern === 'string' ||
    (config.selectorHookProperties?.length ?? 0) > 0;

  if (!hasLeafRule) {
    console.warn(
      `Warning: risk config '${configPath}' sets resolveWrappers but enables no leaf rule ` +
        '(detectGetStateReads / storeAccessorPattern / selectorHookProperties), so wrapper ' +
        'resolution will not run.',
    );
  }
  if (!config.pathAliases) {
    console.warn(
      `Warning: risk config '${configPath}' sets resolveWrappers without pathAliases — wrappers ` +
        'imported through workspace aliases will not resolve. Relative imports still work.',
    );
    return;
  }

  // A target directory that does not exist can never resolve, so the alias is dead weight and the
  // run would report nothing for everything behind it.
  const dead = findDeadAliases(compilePathAliases(config.pathAliases.paths, config.pathAliases.baseUrl));
  if (dead.length > 0) {
    console.warn(
      `Warning: risk config '${configPath}' has ${dead.length} pathAlias(es) whose target ` +
        `directories do not exist, so they can never resolve: ` +
        dead.map(a => `${a.prefix}* -> ${a.targets.join(', ')}`).join('; '),
    );
  }
}

/**
 * Report what wrapper resolution actually reached.
 *
 * Written with `console.log` rather than the formatter on purpose: under `--format json` the
 * formatter sink is discarded, and this is the one diagnostic that distinguishes "no risks found"
 * from "nothing resolved, so nothing could be found". `withReportOutput` redirects `console.log`
 * to stderr for json and into the buffer for html, so it survives every format.
 */
function reportWrapperResolution(stats: ResolverStats, pathAliases: RiskConfig['pathAliases']): void {
  console.log(
    `Wrapper resolution: ${stats.resolved} import(s) resolved, ` +
      `${stats.unresolvedBare} stopped at the package boundary, ` +
      `${stats.unresolvedRelative} unresolvable.`,
  );
  console.log(`  baseUrl: ${pathAliases?.baseUrl ?? '(none configured)'}`);

  const hits = [...stats.aliasHits.entries()];
  if (hits.length > 0) {
    const used = hits.filter(([, n]) => n > 0).length;
    console.log(`  aliases: ${used}/${hits.length} matched at least one import`);
    for (const [prefix, n] of hits.sort((a, b) => b[1] - a[1])) {
      console.log(`    ${prefix.padEnd(24)} ${String(n).padStart(6)}${n === 0 ? '   ← never matched' : ''}`);
    }
  }

  if (stats.unresolvedBare > 0 && hits.every(([, n]) => n === 0)) {
    console.warn(
      `Warning: wrapper resolution matched no aliases, so all ${stats.unresolvedBare} bare import(s) ` +
        'stopped at the package boundary. Cross-package wrappers were not followed and any clean ' +
        'risk report below says nothing about them. Check pathAliases.baseUrl and paths.',
    );
  }
}

/** Command body, separated from the yargs wiring so tests can assert on the exit code. */
export async function runAnalyze(argv: AnalyzeArgv): Promise<number> {
  const riskConfig = loadRiskConfig(argv['risk-config']);

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
      await compileFilesStreaming(
        files,
        {
          concurrency: argv.concurrency,
          verbose: argv.verbose,
          compilationMode: argv.mode,
          riskConfig,
          parserPlugins: argv['parser-plugin'],
          onResolverStats: stats => {
            if (stats) {
              reportWrapperResolution(stats, riskConfig.pathAliases);
            }
          },
        },
        result => {
          if (result.error) {
            unparseable.push({ file: result.filePath, error: result.error.message });
          }
          coverageResults.push(...deriveCoverage(result, { fullReasons: argv['full-reasons'] }));
        },
      );

      endScanLog();

      sortByLocation(coverageResults);

      const workspaceRoot = process.cwd();

      // Annotation writes to disk and is independent of how the report is rendered, so it must
      // run before the format branches — otherwise `--format json --annotate` silently does nothing.
      const annotate = argv.annotate
        ? { mode: argv.annotate, ...(await applyAnnotations(coverageResults, argv.annotate, { quote: argv.quote })) }
        : undefined;

      if (argv.format === 'json') {
        writeDocument(toAnalysisDocument(coverageResults, { mode: argv.mode, workspaceRoot, unparseable, annotate }));
        return 0;
      }
      printCoverageReport(f, coverageResults, workspaceRoot, argv.verbose, argv['full-reasons']);
      printRuntimeRisks(f, coverageResults, workspaceRoot);
      printUnparseableFiles(f, unparseable, workspaceRoot);
      printMigrationCandidates(f, coverageResults, workspaceRoot);
      printCoverageSummary(f, coverageResults, argv.verbose, unparseable.length);

      if (annotate) {
        const touched = annotate.functionsAnnotated + annotate.functionsBailedOut;
        f.blank();
        if (touched > 0) {
          const parts: string[] = [];
          if (annotate.functionsAnnotated > 0) {
            parts.push(`annotated ${annotate.functionsAnnotated} function(s) with 'use memo'`);
          }
          if (annotate.functionsBailedOut > 0) {
            parts.push(`bailed out ${annotate.functionsBailedOut} risky function(s) with justified 'use no memo'`);
          }
          f.line(`✓ ${parts.join('; ')} in ${annotate.filesModified} file(s) (mode: ${annotate.mode}).`);
        } else {
          f.line('No functions to annotate.');
        }
      }

      f.blank();
      f.line('> **Tip:** Run `lint <path>` for directive health checks.');

      return 0;
    },
  });
}

export const analyzeCommand: CommandModule<{}, AnalyzeArgv> = {
  command: 'analyze <paths..>',
  describe: 'Analyze React Compiler coverage and migration potential',
  builder: yarg =>
    sharedOptions(yarg)
      .option('annotate', {
        type: 'string' as const,
        describe:
          "Insert directives into compilable functions. 'manual-memo': 'use memo' on those with useMemo/useCallback/React.memo. 'all': 'use memo' on all. 'all-safe': like 'all' but risky functions (per --risk-config) get a justified 'use no memo' bailout instead. 'bailout-only': write only the bailouts, no opt-ins.",
        choices: ['manual-memo', 'all', 'all-safe', 'bailout-only'] as const,
      })
      .option('quote', {
        type: 'string' as const,
        describe: 'Quote style for directives written by --annotate',
        choices: ['single', 'double'] as const,
        default: 'single' as QuoteStyle,
      })
      .option('risk-config', {
        type: 'string' as const,
        describe:
          'Path to a JSON file enabling risk detection (storeAccessorPattern, detectGetStateReads, selectorHookProperties).',
      }) as Argv<AnalyzeArgv>,
  handler: async argv => {
    process.exitCode = await runAnalyze(argv);
  },
};

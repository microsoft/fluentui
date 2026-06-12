import type { CommandModule, Argv } from 'yargs';

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { compileFiles } from '../compiler';
import { deriveCoverage } from '../coverage-analyzer';
import { applyAnnotations } from '../coverage-fixer';
import {
  printCoverageReport,
  printCoverageSummary,
  printMigrationCandidates,
  printRuntimeRisks,
} from '../coverage-reporter';
import { discoverAllFiles, dedupeFileEntries, findPackageName } from '../discovery';
import type { AnnotateMode, CompilationMode, FileEntry, OutputFormat, RiskConfig } from '../types';
import {
  closeScanLog,
  openScanLog,
  sharedOptions,
  validateConcurrency,
  validatePaths,
  withReportOutput,
} from './shared';

type AnalyzeArgv = {
  paths: string[];
  verbose: boolean;
  concurrency: number;
  'full-reasons': boolean;
  exclude: string[];
  mode: CompilationMode;
  format: OutputFormat;
  annotate: AnnotateMode | undefined;
  'risk-config': string | undefined;
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
function loadRiskConfig(path: string | undefined): RiskConfig {
  if (!path) {
    return {};
  }
  const resolved = resolve(path);
  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(resolved, 'utf-8'));
  } catch (err) {
    console.error(`Error: could not read risk config '${resolved}': ${(err as Error).message}`);
    process.exit(1);
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    console.error(`Error: risk config '${resolved}' must be a JSON object.`);
    process.exit(1);
  }

  const unknownKeys = Object.keys(parsed).filter(k => !RISK_CONFIG_KEYS.has(k));
  if (unknownKeys.length > 0) {
    console.error(
      `Error: risk config '${resolved}' has unknown key(s): ${unknownKeys.join(', ')}. ` +
        'See risk-config.schema.json for the supported options.',
    );
    process.exit(1);
  }

  // `$schema` is an editor-only hint; strip it before handing the config to the plugin.
  const { $schema: _schema, ...config } = parsed as RiskConfig & { $schema?: string };
  return config;
}

export const analyzeCommand: CommandModule<{}, AnalyzeArgv> = {
  command: 'analyze <paths..>',
  describe: 'Analyze React Compiler coverage and migration potential',
  builder: yarg =>
    sharedOptions(yarg)
      .option('annotate', {
        type: 'string' as const,
        describe:
          "Insert directives into compilable functions. 'manual-memo': 'use memo' on those with useMemo/useCallback/React.memo. 'all': 'use memo' on all. 'all-safe': like 'all' but risky functions (per --risk-config) get a justified 'use no memo' bailout instead.",
        choices: ['manual-memo', 'all', 'all-safe'] as const,
      })
      .option('risk-config', {
        type: 'string' as const,
        describe:
          'Path to a JSON file enabling risk detection (storeAccessorPattern, detectGetStateReads, selectorHookProperties).',
      }) as Argv<AnalyzeArgv>,
  handler: async argv => {
    const resolvedPaths = validatePaths(argv.paths);
    validateConcurrency(argv.concurrency);

    await withReportOutput(argv.format, 'React Compiler Analysis', async f => {
      openScanLog(f, 'Scan & compile log');

      const collected: FileEntry[] = [];

      for (const resolvedPath of resolvedPaths) {
        const packageName = await findPackageName(resolvedPath);

        f.heading(2, `Scanning: ${resolvedPath}`);
        f.line(`   Package: ${packageName}`);
        f.line(`   Mode: ${argv.mode}`);
        f.blank();

        const discovered = await discoverAllFiles(resolvedPath, packageName, argv.exclude, argv.verbose);
        collected.push(...discovered);
      }

      // Combining overlapping paths (e.g. a directory plus a file inside it) can surface
      // the same file more than once — process each file a single time.
      const files = dedupeFileEntries(collected);

      if (files.length === 0) {
        closeScanLog(f);
        f.line('No TypeScript files found.');
        return 0;
      }

      f.line(`Files to analyze: ${files.length}`);
      f.blank();

      // Single compilation pass for all files
      const compilationResults = await compileFiles(files, {
        concurrency: argv.concurrency,
        verbose: argv.verbose,
        compilationMode: argv.mode,
        riskConfig: loadRiskConfig(argv['risk-config']),
      });

      closeScanLog(f);

      // Derive coverage from compilation results
      const coverageResults = compilationResults.flatMap(r => deriveCoverage(r, { fullReasons: argv['full-reasons'] }));

      const workspaceRoot = process.cwd();
      printCoverageReport(f, coverageResults, workspaceRoot, argv.verbose, argv['full-reasons']);
      printRuntimeRisks(f, coverageResults, workspaceRoot);
      printMigrationCandidates(f, coverageResults, workspaceRoot);
      printCoverageSummary(f, coverageResults, argv.verbose);

      if (argv.annotate) {
        const outcome = await applyAnnotations(coverageResults, argv.annotate);
        const touched = outcome.functionsAnnotated + outcome.functionsBailedOut;
        if (touched > 0) {
          f.blank();
          const parts: string[] = [];
          if (outcome.functionsAnnotated > 0) {
            parts.push(`annotated ${outcome.functionsAnnotated} function(s) with 'use memo'`);
          }
          if (outcome.functionsBailedOut > 0) {
            parts.push(`bailed out ${outcome.functionsBailedOut} risky function(s) with justified 'use no memo'`);
          }
          f.line(`✓ ${parts.join('; ')} in ${outcome.filesModified} file(s) (mode: ${argv.annotate}).`);
        } else {
          f.blank();
          f.line('No functions to annotate.');
        }
      }

      f.blank();
      f.line('> **Tip:** Run `lint <path>` for directive health checks.');

      return 0;
    });
  },
};

import type { CommandModule, Argv } from 'yargs';

import { compileFiles } from '../compiler';
import { deriveCoverage } from '../coverage-analyzer';
import { applyAnnotations } from '../coverage-fixer';
import { printCoverageReport, printCoverageSummary, printMigrationCandidates } from '../coverage-reporter';
import { discoverAllFiles, dedupeFileEntries, findPackageName } from '../discovery';
import type { AnnotateMode, CompilationMode, FileEntry, OutputFormat } from '../types';
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
};

export const analyzeCommand: CommandModule<{}, AnalyzeArgv> = {
  command: 'analyze <paths..>',
  describe: 'Analyze React Compiler coverage and migration potential',
  builder: yarg =>
    sharedOptions(yarg).option('annotate', {
      type: 'string' as const,
      describe:
        "Insert 'use memo' into compilable functions. 'manual-memo': only those with useMemo/useCallback/React.memo. 'all': all compilable functions.",
      choices: ['manual-memo', 'all'] as const,
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
      });

      closeScanLog(f);

      // Derive coverage from compilation results
      const coverageResults = compilationResults.flatMap(r => deriveCoverage(r, { fullReasons: argv['full-reasons'] }));

      const workspaceRoot = process.cwd();
      printCoverageReport(f, coverageResults, workspaceRoot, argv.verbose, argv['full-reasons']);
      printMigrationCandidates(f, coverageResults, workspaceRoot);
      printCoverageSummary(f, coverageResults, argv.verbose);

      if (argv.annotate) {
        const outcome = await applyAnnotations(coverageResults, argv.annotate);
        if (outcome.functionsAnnotated > 0) {
          f.blank();
          f.line(
            `✓ Annotated ${outcome.functionsAnnotated} function(s) in ${outcome.filesModified} file(s) with 'use memo' (mode: ${argv.annotate}).`,
          );
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

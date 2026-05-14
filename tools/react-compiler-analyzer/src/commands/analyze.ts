import type { CommandModule, Argv } from 'yargs';

import { compileFiles } from '../compiler';
import { deriveCoverage } from '../coverage-analyzer';
import { applyAnnotations } from '../coverage-fixer';
import { printCoverageReport, printCoverageSummary, printMigrationCandidates } from '../coverage-reporter';
import { discoverAllFiles, findPackageName } from '../discovery';
import type { AnnotateMode, CompilationMode, FileEntry } from '../types';
import { sharedOptions, validateConcurrency, validatePaths } from './shared';

type AnalyzeArgv = {
  paths: string[];
  verbose: boolean;
  concurrency: number;
  'full-reasons': boolean;
  exclude: string[];
  mode: CompilationMode;
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

    console.log('━━ React Compiler Analysis ━━\n');

    const files: FileEntry[] = [];

    for (const resolvedPath of resolvedPaths) {
      const packageName = await findPackageName(resolvedPath);

      console.log(`## Scanning: ${resolvedPath}`);
      console.log(`   Package: ${packageName}`);
      console.log(`   Mode: ${argv.mode}\n`);

      const discovered = await discoverAllFiles(resolvedPath, packageName, argv.exclude, argv.verbose);
      files.push(...discovered);
    }

    if (files.length === 0) {
      console.log('No TypeScript files found.');
      process.exit(0);
    }

    console.log(`Files to analyze: ${files.length}\n`);

    // Single compilation pass for all files
    const compilationResults = await compileFiles(files, {
      concurrency: argv.concurrency,
      verbose: argv.verbose,
      compilationMode: argv.mode,
    });

    // Derive coverage from compilation results
    const coverageResults = compilationResults.flatMap(deriveCoverage);

    const workspaceRoot = process.cwd();
    printCoverageReport(coverageResults, workspaceRoot, argv.verbose, argv['full-reasons']);
    printMigrationCandidates(coverageResults, workspaceRoot);
    printCoverageSummary(coverageResults, argv.verbose);

    if (argv.annotate) {
      const outcome = await applyAnnotations(coverageResults, argv.annotate);
      if (outcome.functionsAnnotated > 0) {
        console.log(
          `\n✓ Annotated ${outcome.functionsAnnotated} function(s) in ${outcome.filesModified} file(s) with 'use memo' (mode: ${argv.annotate}).`,
        );
      } else {
        console.log('\nNo functions to annotate.');
      }
    }

    console.log("\nTip: Run 'lint <path>' for directive health checks.");

    process.exit(0);
  },
};

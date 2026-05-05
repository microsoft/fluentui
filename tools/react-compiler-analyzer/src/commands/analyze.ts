import type { CommandModule } from 'yargs';

import { compileFiles } from '../compiler';
import { deriveCoverage } from '../coverage-analyzer';
import { applyAnnotations } from '../coverage-fixer';
import { printCoverageReport, printCoverageSummary, printMigrationCandidates } from '../coverage-reporter';
import { discoverAllFiles, findPackageName } from '../discovery';
import type { CompilationMode } from '../types';
import { sharedOptions, validateConcurrency, validatePath } from './shared';

type AnalyzeArgv = {
  path: string;
  verbose: boolean;
  concurrency: number;
  'full-reasons': boolean;
  exclude: string[];
  mode: CompilationMode;
  annotate: boolean;
};

export const analyzeCommand: CommandModule<{}, AnalyzeArgv> = {
  command: 'analyze <path>',
  describe: 'Analyze React Compiler coverage and migration potential',
  builder: yarg =>
    sharedOptions(yarg).option('annotate', {
      type: 'boolean' as const,
      describe: "Insert 'use memo' into compilable functions that use manual memoization",
      default: false,
    }),
  handler: async argv => {
    const resolvedPath = validatePath(argv.path);
    validateConcurrency(argv.concurrency);

    console.log('━━ React Compiler Analysis ━━\n');

    const packageName = await findPackageName(resolvedPath);

    console.log(`## Scanning: ${resolvedPath}`);
    console.log(`   Package: ${packageName}`);
    console.log(`   Mode: ${argv.mode}\n`);

    const files = await discoverAllFiles(resolvedPath, packageName, argv.exclude, argv.verbose);

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
      const outcome = await applyAnnotations(coverageResults);
      if (outcome.functionsAnnotated > 0) {
        console.log(
          `\n✓ Annotated ${outcome.functionsAnnotated} function(s) in ${outcome.filesModified} file(s) with 'use memo'.`,
        );
      } else {
        console.log('\nNo functions to annotate.');
      }
    }

    console.log("\nTip: Run 'lint <path>' for directive health checks.");

    process.exit(0);
  },
};

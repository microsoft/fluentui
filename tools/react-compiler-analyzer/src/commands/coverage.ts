import type { CommandModule } from 'yargs';

import { analyzeFilesForCoverage } from '../coverage-analyzer';
import { printCoverageReport, printCoverageSummary } from '../coverage-reporter';
import { discoverAllFiles, findPackageName } from '../discovery';
import type { CompilationMode } from '../types';
import { sharedOptions, validateConcurrency, validatePath } from './shared';

type CoverageArgv = {
  path: string;
  verbose: boolean;
  concurrency: number;
  'full-reasons': boolean;
  exclude: string[];
  mode: CompilationMode;
};

export const coverageCommand: CommandModule<{}, CoverageArgv> = {
  command: 'coverage <path>',
  describe: 'Analyze which functions the React Compiler will memoize',
  builder: yarg =>
    sharedOptions(yarg).option('mode', {
      type: 'string' as const,
      describe: 'React Compiler compilation mode',
      choices: ['infer', 'annotation', 'all'] as const,
      default: 'infer' as CompilationMode,
    }) as any,
  handler: async argv => {
    const resolvedPath = validatePath(argv.path);
    validateConcurrency(argv.concurrency);

    console.log('━━ React Compiler Coverage Analyzer ━━\n');

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

    const results = await analyzeFilesForCoverage(files, {
      concurrency: argv.concurrency,
      verbose: argv.verbose,
      compilationMode: argv.mode,
    });

    const workspaceRoot = process.cwd();
    printCoverageReport(results, workspaceRoot, argv.verbose, argv['full-reasons']);
    printCoverageSummary(results);

    process.exit(0);
  },
};

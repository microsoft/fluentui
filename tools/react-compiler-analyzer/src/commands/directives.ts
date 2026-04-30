import type { CommandModule } from 'yargs';

import { analyzeFiles } from '../analyzer';
import { discoverDirectiveFiles, findPackageName } from '../discovery';
import { applyFixes } from '../fixer';
import { printReport, printSummary } from '../reporter';
import { sharedOptions, validateConcurrency, validatePath } from './shared';

type DirectivesArgv = {
  path: string;
  verbose: boolean;
  concurrency: number;
  'full-reasons': boolean;
  exclude: string[];
  fix: boolean;
};

export const directivesCommand: CommandModule<{}, DirectivesArgv> = {
  command: 'directives <path>',
  describe: "Analyze and detect redundant 'use no memo' directives",
  builder: yarg =>
    sharedOptions(yarg).option('fix', {
      type: 'boolean' as const,
      describe: "Auto-remove redundant 'use no memo' directives from source files",
      default: false,
    }),
  handler: async argv => {
    const resolvedPath = validatePath(argv.path);
    validateConcurrency(argv.concurrency);

    console.log('━━ React Compiler No-Memo Analyzer ━━\n');

    const packageName = await findPackageName(resolvedPath);

    console.log(`## Scanning: ${resolvedPath}`);
    console.log(`   Package: ${packageName}\n`);

    const files = await discoverDirectiveFiles(resolvedPath, packageName, argv.exclude, argv.verbose);

    if (files.length === 0) {
      console.log("No files with 'use no memo' directives found.");
      process.exit(0);
    }

    console.log(`Files with 'use no memo': ${files.length}\n`);

    const results = await analyzeFiles(files, {
      concurrency: argv.concurrency,
      verbose: argv.verbose,
    });

    const workspaceRoot = process.cwd();
    printReport(results, workspaceRoot, argv['full-reasons']);
    printSummary(results);

    if (argv.fix) {
      const fixable = results.filter(r => r.status === 'redundant' || r.status === 'active');
      if (fixable.length > 0) {
        console.log('Applying fixes...');
        const fixResult = await applyFixes(results);
        const parts: string[] = [];
        if (fixResult.directivesRemoved > 0) {
          parts.push(`${fixResult.directivesRemoved} redundant directive(s) removed`);
        }
        if (fixResult.directivesJustified > 0) {
          parts.push(`${fixResult.directivesJustified} active directive(s) annotated with // justified:`);
        }
        console.log(`Fixed: ${parts.join(', ')} across ${fixResult.filesModified} file(s).\n`);
      } else {
        console.log('Nothing to fix.\n');
      }
    }

    const hasRedundant = results.some(r => r.status === 'redundant');
    process.exit(hasRedundant && !argv.fix ? 1 : 0);
  },
};

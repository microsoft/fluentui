import type { CommandModule } from 'yargs';

import { analyzeFiles } from '../analyzer';
import { discoverFilesWithDirectives, findPackageName } from '../discovery';
import { applyFixes } from '../fixer';
import { printReport, printSummary } from '../reporter';
import type { CompilationMode } from '../types';
import { sharedOptions, validateConcurrency, validatePath } from './shared';

type LintArgv = {
  path: string;
  verbose: boolean;
  concurrency: number;
  'full-reasons': boolean;
  exclude: string[];
  fix: boolean;
  mode: CompilationMode;
};

export const lintCommand: CommandModule<{}, LintArgv> = {
  command: 'lint <path>',
  describe: "Lint 'use no memo' and 'use memo' directives for redundancy (CI gate)",
  builder: yarg =>
    sharedOptions(yarg).option('fix', {
      type: 'boolean' as const,
      describe: 'Auto-remove redundant directives and resolve conflicts',
      default: false,
    }),
  handler: async argv => {
    const resolvedPath = validatePath(argv.path);
    validateConcurrency(argv.concurrency);

    console.log('━━ React Compiler Lint ━━\n');

    const packageName = await findPackageName(resolvedPath);

    console.log(`## Scanning: ${resolvedPath}`);
    console.log(`   Package: ${packageName}`);
    console.log(`   Mode: ${argv.mode}\n`);

    const files = await discoverFilesWithDirectives(resolvedPath, packageName, argv.exclude, argv.verbose);

    if (files.length === 0) {
      console.log('No files with directives found.');
      process.exit(0);
    }

    console.log(`Files with directives: ${files.length}\n`);

    const results = await analyzeFiles(files, {
      concurrency: argv.concurrency,
      verbose: argv.verbose,
      compilationMode: argv.mode,
    });

    const workspaceRoot = process.cwd();
    printReport(results, workspaceRoot, argv['full-reasons']);
    printSummary(results);

    if (argv.fix) {
      const fixable = results.filter(
        r =>
          (r.status === 'redundant' && r.directiveType === 'use-no-memo') ||
          (r.status === 'active' && r.directiveType === 'use-no-memo') ||
          r.status === 'conflicting',
      );
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

    // Exit code logic:
    // Exit 1 if: any 'use no memo' is redundant OR any 'use memo' is broken OR any directives are conflicting
    const hasFailure =
      results.some(r => r.status === 'redundant' && r.directiveType === 'use-no-memo') ||
      results.some(r => r.status === 'broken') ||
      results.some(r => r.status === 'conflicting');

    process.exit(hasFailure && !argv.fix ? 1 : 0);
  },
};

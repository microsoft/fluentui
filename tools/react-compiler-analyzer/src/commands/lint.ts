import type { CommandModule } from 'yargs';

import { analyzeNoMemoDirectives, deriveMemoDirectiveStatuses } from '../analyzer';
import { compileFiles } from '../compiler';
import { discoverFilesWithDirectives, dedupeFileEntries, findPackageName } from '../discovery';
import { applyFixes } from '../fixer';
import { printReport, printSummary } from '../reporter';
import type { CompilationMode, DirectiveAnalysis, FileEntry, OutputFormat } from '../types';
import {
  closeScanLog,
  openScanLog,
  sharedOptions,
  validateConcurrency,
  validatePaths,
  withReportOutput,
} from './shared';

type LintArgv = {
  paths: string[];
  verbose: boolean;
  concurrency: number;
  'full-reasons': boolean;
  exclude: string[];
  fix: boolean;
  mode: CompilationMode;
  format: OutputFormat;
};

export const lintCommand: CommandModule<{}, LintArgv> = {
  command: 'lint <paths..>',
  describe: "Lint 'use no memo' and 'use memo' directives for redundancy (CI gate)",
  builder: yarg =>
    sharedOptions(yarg).option('fix', {
      type: 'boolean' as const,
      describe: 'Auto-remove redundant directives and resolve conflicts',
      default: false,
    }),
  handler: async argv => {
    const resolvedPaths = validatePaths(argv.paths);
    validateConcurrency(argv.concurrency);

    await withReportOutput(
      argv.format,
      'React Compiler Lint',
      async f => {
        openScanLog(f, 'Scan & compile log');

        const collected: FileEntry[] = [];

        for (const resolvedPath of resolvedPaths) {
          const packageName = await findPackageName(resolvedPath);

          f.heading(2, `Scanning: ${resolvedPath}`);
          f.line(`   Package: ${packageName}`);
          f.line(`   Mode: ${argv.mode}`);
          f.blank();

          const discovered = await discoverFilesWithDirectives(resolvedPath, packageName, argv.exclude, argv.verbose);
          collected.push(...discovered);
        }

        // Combining overlapping paths (e.g. a directory plus a file inside it) can surface
        // the same file more than once — process each file a single time.
        const files = dedupeFileEntries(collected);

        if (files.length === 0) {
          closeScanLog(f);
          f.line('No files with directives found.');
          return 0;
        }

        f.line(`Files with directives: ${files.length}`);
        f.blank();

        // Single compilation pass for all directive files
        const compilationResults = await compileFiles(files, {
          concurrency: argv.concurrency,
          verbose: argv.verbose,
          compilationMode: argv.mode,
        });

        // Derive directive statuses from compilation results
        const results: DirectiveAnalysis[] = [];

        for (const compiled of compilationResults) {
          // 'use memo' statuses come directly from first compilation (no recompile)
          results.push(...deriveMemoDirectiveStatuses(compiled, argv.mode, { fullReasons: argv['full-reasons'] }));
          // 'use no memo' requires strip + recompile
          results.push(
            ...(await analyzeNoMemoDirectives(compiled, argv.mode, argv.verbose, {
              fullReasons: argv['full-reasons'],
            })),
          );
        }

        closeScanLog(f);

        const workspaceRoot = process.cwd();
        printReport(f, results, workspaceRoot, argv['full-reasons']);
        printSummary(f, results);

        if (argv.fix) {
          const fixable = results.filter(
            r =>
              (r.status === 'redundant' && r.directiveType === 'use-no-memo') ||
              (r.status === 'active' && r.directiveType === 'use-no-memo') ||
              r.status === 'conflicting',
          );
          if (fixable.length > 0) {
            f.line('Applying fixes...');
            const fixResult = await applyFixes(results);
            const parts: string[] = [];
            if (fixResult.directivesRemoved > 0) {
              parts.push(`${fixResult.directivesRemoved} redundant directive(s) removed`);
            }
            if (fixResult.directivesJustified > 0) {
              parts.push(`${fixResult.directivesJustified} active directive(s) annotated with // justified:`);
            }
            f.line(`Fixed: ${parts.join(', ')} across ${fixResult.filesModified} file(s).`);
            f.blank();
          } else {
            f.line('Nothing to fix.');
            f.blank();
          }
        }

        // Exit code logic:
        // Exit 1 if: any 'use no memo' is redundant OR any 'use memo' is broken OR any directives are conflicting
        const hasFailure =
          results.some(r => r.status === 'redundant' && r.directiveType === 'use-no-memo') ||
          results.some(r => r.status === 'broken') ||
          results.some(r => r.status === 'conflicting');

        return hasFailure && !argv.fix ? 1 : 0;
      },
      [{ label: 'Mode', value: argv.mode }],
    );
  },
};

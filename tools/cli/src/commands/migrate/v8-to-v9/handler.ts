import * as fs from 'fs/promises';
import type { CommandHandler } from '../../../utils/types';
import { analyzeFiles, writeAnnotations } from './utils/annotator';
import type { FileAnalysis } from './utils/annotator';
import { isSkillInstalled, printSkillHint } from './utils/skill-check';

interface V8ToV9Args {
  path: string;
  dryRun: boolean;
}

export const handler: CommandHandler<V8ToV9Args> = async argv => {
  let stat: Awaited<ReturnType<typeof fs.stat>>;
  try {
    stat = await fs.stat(argv.path);
  } catch {
    throw new Error(`Error: --path does not exist: ${argv.path}`);
  }

  if (!stat.isDirectory()) {
    throw new Error(`Error: --path must be a directory, got a file: ${argv.path}`);
  }

  const results = await analyzeFiles(argv.path);

  if (argv.dryRun) {
    printDryRunReport(results);
    printSkillHintIfNeeded();
    return;
  }

  const { filesChanged } = await writeAnnotations(results, argv.path);
  printSummary(results, filesChanged);
  printSkillHintIfNeeded();
};

function countByAction(results: FileAnalysis[]) {
  const counts = { auto: 0, scaffold: 0, manual: 0, noEquivalent: 0 };
  for (const file of results) {
    for (const a of file.annotations) {
      if (a.action === 'auto') {
        counts.auto++;
      } else if (a.action === 'scaffold') {
        counts.scaffold++;
      } else if (a.action === 'manual') {
        counts.manual++;
      } else if (a.action === 'no-equivalent') {
        counts.noEquivalent++;
      }
    }
  }
  return counts;
}

function collectDeps(results: FileAnalysis[]): Array<{ name: string; reason: string }> {
  const seen = new Set<string>();
  const deps: Array<{ name: string; reason: string }> = [];
  for (const file of results) {
    for (const dep of file.missingDeps) {
      if (!seen.has(dep.name)) {
        seen.add(dep.name);
        deps.push(dep);
      }
    }
  }
  return deps;
}

function printSummary(results: FileAnalysis[], filesChanged: number): void {
  const counts = countByAction(results);
  const deps = collectDeps(results);

  console.log(`\nAnnotated ${filesChanged} ${filesChanged === 1 ? 'file' : 'files'}`);
  console.log(`  auto          ${counts.auto.toString().padStart(4)}  (safe to apply mechanically)`);
  console.log(`  scaffold      ${counts.scaffold.toString().padStart(4)}  (boilerplate needed)`);
  console.log(`  manual        ${counts.manual.toString().padStart(4)}  (requires judgment)`);
  console.log(`  no-equivalent ${counts.noEquivalent.toString().padStart(4)}  (no v9 replacement)`);

  if (deps.length > 0) {
    console.log('\nRequired packages (not in package.json):');
    for (const dep of deps) {
      console.log(`  ${dep.name.padEnd(35)} — ${dep.reason}`);
    }
  }
}

function printDryRunReport(results: FileAnalysis[]): void {
  const counts = countByAction(results);
  const deps = collectDeps(results);

  console.log('\n[dryRun] No files were modified.\n');
  console.log(`Would annotate ${results.length} files`);
  console.log(`  auto          ${counts.auto.toString().padStart(4)}  (safe to apply mechanically)`);
  console.log(`  scaffold      ${counts.scaffold.toString().padStart(4)}  (boilerplate needed)`);
  console.log(`  manual        ${counts.manual.toString().padStart(4)}  (requires judgment)`);
  console.log(`  no-equivalent ${counts.noEquivalent.toString().padStart(4)}  (no v9 replacement)`);

  if (deps.length > 0) {
    console.log('\nRequired packages (not in package.json):');
    for (const dep of deps) {
      console.log(`  ${dep.name.padEnd(35)} — ${dep.reason}`);
    }
  }

  if (results.length > 0) {
    console.log('\nFiles that would be annotated:');
    for (const file of results) {
      console.log(`  ${file.filePath}  (${file.annotations.length} annotations)`);
    }
  }
}

function printSkillHintIfNeeded(): void {
  if (!isSkillInstalled()) {
    printSkillHint();
  }
}

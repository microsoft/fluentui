import * as fs from 'fs/promises';
import * as path from 'path';
import type { FileAnalysis, AnnotationResult } from './types';

const ANNOTATION_TAG = '@fluent-migrate:';
const METADATA_DIR = '.fluent-migrate';
const METADATA_FILE = 'metadata.json';

function formatAnnotation(a: AnnotationResult): string {
  const parts = [a.action, a.codemod, a.payload];
  if (a.note) {
    parts.push(a.note);
  }
  const body = `${ANNOTATION_TAG}${parts.join(' | ')}`;
  return a.insideJsx ? `{/* ${body} */}` : `// ${body}`;
}

/**
 * Inserts @fluent-migrate: comments into source files based on FileAnalysis results.
 * Idempotent: skips if an identical comment already exists on the line above the target.
 *
 * When `projectRoot` is provided, writes `.fluent-migrate/metadata.json` listing
 * all annotated file paths so the skill can locate them without re-scanning.
 */
export async function writeAnnotations(
  results: FileAnalysis[],
  projectRoot?: string,
): Promise<{ filesChanged: number }> {
  let filesChanged = 0;
  const annotatedFiles: string[] = [];

  for (const file of results) {
    if (file.annotations.length === 0) {
      continue;
    }

    const content = await fs.readFile(file.filePath, 'utf8');
    const lines = content.split('\n');

    // Sort annotations by line descending so insertions don't shift line numbers
    const sorted = [...file.annotations].sort((a, b) => b.line - a.line);

    let changed = false;

    for (const annotation of sorted) {
      const targetLine = annotation.line - 1; // convert to 0-based
      const comment = formatAnnotation(annotation);

      // Check if an identical annotation already exists on the line above (trimmed to ignore indent)
      const lineAbove = lines[targetLine - 1]?.trim();
      if (lineAbove === comment.trim()) {
        continue;
      }

      // Determine indentation from the target line
      const indent = lines[targetLine]?.match(/^(\s*)/)?.[1] ?? '';

      lines.splice(targetLine, 0, `${indent}${comment}`);
      changed = true;
    }

    if (changed) {
      await fs.writeFile(file.filePath, lines.join('\n'), 'utf8');
      filesChanged++;
    }

    annotatedFiles.push(file.filePath);
  }

  if (projectRoot && annotatedFiles.length > 0) {
    const metaDir = path.join(projectRoot, METADATA_DIR);
    await fs.mkdir(metaDir, { recursive: true });
    const metadata = {
      version: 1,
      annotatedFiles: annotatedFiles.map(f => path.relative(projectRoot, f)),
    };
    await fs.writeFile(path.join(metaDir, METADATA_FILE), JSON.stringify(metadata, null, 2) + '\n', 'utf8');
  }

  return { filesChanged };
}

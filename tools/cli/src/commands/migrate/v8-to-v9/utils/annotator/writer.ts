import * as fs from 'fs/promises';
import type { FileAnalysis, AnnotationResult } from './types';

const ANNOTATION_TAG = '@fluent-migrate:';

function formatAnnotation(a: AnnotationResult): string {
  const parts = [a.action, a.codemod, a.payload];
  if (a.note) parts.push(a.note);
  const body = `${ANNOTATION_TAG}${parts.join(' | ')}`;
  return a.insideJsx ? `{/* ${body} */}` : `// ${body}`;
}

/**
 * Inserts @fluent-migrate: comments into source files based on FileAnalysis results.
 * Idempotent: skips if an identical comment already exists on the line above the target.
 */
export async function writeAnnotations(results: FileAnalysis[]): Promise<{ filesChanged: number }> {
  let filesChanged = 0;

  for (const file of results) {
    if (file.annotations.length === 0) continue;

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
      if (lineAbove === comment.trim()) continue;

      // Determine indentation from the target line
      const indent = lines[targetLine]?.match(/^(\s*)/)?.[1] ?? '';

      lines.splice(targetLine, 0, `${indent}${comment}`);
      changed = true;
    }

    if (changed) {
      await fs.writeFile(file.filePath, lines.join('\n'), 'utf8');
      filesChanged++;
    }
  }

  return { filesChanged };
}

import * as fs from 'fs/promises';
import * as path from 'path';
import type { FileAnalysis, AnnotationResult } from './types';

const ANNOTATION_TAG = '@fluent-migrate:';
const METADATA_DIR = '.fluent-migrate';
const METADATA_FILE = 'metadata.json';

/**
 * Searches backward from targetLine through consecutive annotation comment lines to detect
 * whether an identical comment already exists. This handles the case where multiple
 * annotations target the same original source line — a simple one-line-above check
 * would miss duplicates that were inserted in previous runs.
 */
function annotationAlreadyPresent(lines: string[], targetLine: number, comment: string): boolean {
  const commentTrimmed = comment.trim();
  let i = targetLine - 1;
  while (i >= 0) {
    const lineTrimmed = lines[i].trim();
    if (lineTrimmed === commentTrimmed) {
      return true;
    }
    // Stop at the first line that is not a fluent-migrate annotation comment
    if (!lineTrimmed.startsWith('// @fluent-migrate:') && !lineTrimmed.startsWith('{/* @fluent-migrate:')) {
      break;
    }
    i--;
  }
  return false;
}

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
 * Idempotent: skips if an identical comment already exists in the annotation block above the target.
 * Handles multiple annotations targeting the same source line by tracking per-line insertion offsets.
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

    // Sort annotations by line descending so insertions at higher lines don't shift lower ones.
    const sorted = [...file.annotations].sort((a, b) => b.line - a.line);

    let changed = false;
    // Track how many annotations have been inserted for each original source line so that
    // subsequent insertions at the same line land after the already-inserted ones.
    const sameLineInsertions = new Map<number, number>();

    for (const annotation of sorted) {
      const existingInsertions = sameLineInsertions.get(annotation.line) ?? 0;
      // Offset targetLine by the number of annotations already inserted at this original line
      const targetLine = annotation.line - 1 + existingInsertions; // convert to 0-based + offset
      const comment = formatAnnotation(annotation);

      // Search backward through the annotation block above the target for an identical comment
      if (annotationAlreadyPresent(lines, targetLine, comment)) {
        continue;
      }

      // Determine indentation from the target line
      const indent = lines[targetLine]?.match(/^(\s*)/)?.[1] ?? '';

      lines.splice(targetLine, 0, `${indent}${comment}`);
      sameLineInsertions.set(annotation.line, existingInsertions + 1);
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

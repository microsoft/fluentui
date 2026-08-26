import type { FileEntry } from './types';

/**
 * Run `processFn` over every file with a bounded worker pool, discarding each result once the
 * callback has consumed it. Nothing is accumulated here, so a large scan stays flat in memory.
 *
 * Files are handed out as workers free up, so completion order does not track input order —
 * callers that render or serialize results must sort them first.
 */
export async function forEachFileConcurrently(
  files: FileEntry[],
  processFn: (entry: FileEntry) => Promise<void>,
  options: { concurrency: number; verbose: boolean },
): Promise<void> {
  const { concurrency, verbose } = options;

  let index = 0;

  async function worker(): Promise<void> {
    while (index < files.length) {
      const entry = files[index++];

      if (verbose) {
        console.log(`Analyzing: ${entry.filePath}`);
      }

      await processFn(entry);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, files.length) }, () => worker()));
}

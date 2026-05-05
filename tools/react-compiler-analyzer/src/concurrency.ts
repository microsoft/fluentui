import type { FileEntry } from './types';

/**
 * Process files with concurrency-limited parallelism.
 * Generic worker pool that runs `processFn` on each file entry.
 */
export async function processFilesConcurrently<T>(
  files: FileEntry[],
  processFn: (entry: FileEntry) => Promise<T[]>,
  options: { concurrency: number; verbose: boolean },
): Promise<T[]> {
  const allResults: T[] = [];
  const { concurrency, verbose } = options;

  let index = 0;

  async function worker(): Promise<void> {
    while (index < files.length) {
      const current = index++;
      const entry = files[current];

      if (verbose) {
        console.log(`Analyzing: ${entry.filePath}`);
      }

      const results = await processFn(entry);
      allResults.push(...results);
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, files.length) }, () => worker());
  await Promise.all(workers);

  return allResults;
}

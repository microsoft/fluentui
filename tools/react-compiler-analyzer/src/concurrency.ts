/**
 * Run `processFn` over every item with a bounded worker pool, discarding each result once the
 * callback has consumed it. Nothing is accumulated here, so a large scan stays flat in memory.
 *
 * Files are handed out as workers free up, so completion order does not track input order —
 * callers that render or serialize results must sort them first.
 */
export async function forEachConcurrently<T>(
  items: T[],
  processFn: (item: T, index: number) => Promise<void>,
  options: { concurrency: number; verbose: boolean },
): Promise<void> {
  const { concurrency } = options;

  let index = 0;

  async function worker(): Promise<void> {
    while (index < items.length) {
      const currentIndex = index++;

      await processFn(items[currentIndex], currentIndex);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()));
}

export async function mapConcurrently<T, R>(
  items: T[],
  processFn: (item: T, index: number) => Promise<R>,
  options: { concurrency: number; verbose: boolean },
): Promise<R[]> {
  const results = new Array<R>(items.length);
  await forEachConcurrently(
    items,
    async (item, index) => {
      results[index] = await processFn(item, index);
    },
    options,
  );
  return results;
}

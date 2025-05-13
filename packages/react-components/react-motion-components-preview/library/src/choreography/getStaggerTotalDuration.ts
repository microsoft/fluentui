/**
 * Calculate the total stagger duration—from the moment stagger begins
 * until the final item’s animation completes.
 *
 * Uses the formula:
 *   max(0, delay * (count - 1) + itemDuration)
 *
 * @param params.count        Total number of items to stagger
 * @param params.delay        Milliseconds between the start of each item
 * @param params.itemDuration Milliseconds each item’s animation lasts (default 0)
 * @returns                   Total duration in milliseconds (never negative)
 */
export function getStaggerTotalDuration({
  count,
  delay,
  itemDuration = 0,
}: {
  count: number;
  delay: number;
  itemDuration?: number;
}): number {
  if (count <= 1) {
    return Math.max(0, itemDuration);
  }
  const staggerDuration = delay * (count - 1);
  return Math.max(0, staggerDuration + itemDuration);
}

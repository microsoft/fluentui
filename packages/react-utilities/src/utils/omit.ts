/**
 * Tiny helper to do the minimal amount of work in duplicating an object but omitting some
 * props. This ends up faster than using object ...rest or reduce to filter.
 *
 * This behaves very much like filteredAssign, but does not merge many objects together,
 * uses an exclusion object map, and avoids spreads all for optimal performance.
 *
 * See perf test for background:
 * https://jsperf.com/omit-vs-rest-vs-reduce/1
 *
 * @param obj - The object to clone
 * @param exclusions - The array of keys to exclude
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function omit<TObj extends Record<string, any>, Exclusions extends (keyof TObj)[]>(
  obj: TObj,
  exclusions: Exclusions,
): Omit<TObj, Exclusions[number]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (exclusions.indexOf(key) === -1 && obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  }

  return result as TObj;
}

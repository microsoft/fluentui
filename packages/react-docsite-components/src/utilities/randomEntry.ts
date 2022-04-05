/**
 * Returns a single random entry from an array.
 * @param arr Array you want a random entry from.
 */
export function randomEntry<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

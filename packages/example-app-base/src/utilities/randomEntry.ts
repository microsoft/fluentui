/** Returns a single random entry from an array. */
// tslint:disable-next-line no-any
export function randomEntry<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

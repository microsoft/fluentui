export function uniqueArray<T extends unknown>(value: T[]) {
  return Array.from(new Set(value));
}

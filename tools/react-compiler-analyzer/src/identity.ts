export function locationKey(location: { line: number; column: number }): string {
  return `${location.line}:${location.column}`;
}

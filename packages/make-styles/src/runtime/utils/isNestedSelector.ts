const regex = /^(:|\[|>|&)/;

export function isNestedSelector(property: string): boolean {
  return regex.test(property);
}

export function isSupportQuerySelector(property: string): boolean {
  return property.substr(0, 9) === '@supports';
}

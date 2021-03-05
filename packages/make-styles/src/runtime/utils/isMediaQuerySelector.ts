export function isMediaQuerySelector(property: string): boolean {
  return property.substr(0, 6) === '@media';
}

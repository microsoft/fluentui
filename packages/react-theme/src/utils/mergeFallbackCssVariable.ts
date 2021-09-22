/*
 * Function that accepts either a var(--value) or --value CSS prop, and returns a var()
 * declaration with a fallback: var(--value, fallback).
 * If an undefined or non-string cssVariable is passed in, the fallback is returned directly.
 */
export function mergeFallbackCssVariable(cssVariable: string | undefined, fallback: string): string {
  if (typeof cssVariable !== 'string') {
    return fallback;
  }

  const variableParts = cssVariable
    .split(/[\(\)\,]/)
    .map(part => part.trim())
    .filter(part => part.length > 0 && part !== 'var');

  // if both a css variable and fallback were passed in, return a var(value, fallback) declaration
  if (variableParts.length > 0 && fallback) {
    return `var(${variableParts[0]}, ${fallback})`;
  }
  // if the original cssVariable couldn't be processed, return the fallback
  return fallback;
}

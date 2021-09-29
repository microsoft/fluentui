import type { Theme } from '../types';

export function themeToCSSVariables(theme: Theme): Record<string, string> {
  const result: Record<string, string> = {};

  for (const propertyName in theme) {
    if (Object.prototype.hasOwnProperty.call(theme, propertyName)) {
      result[`--${propertyName}`] = theme[propertyName as keyof Theme];
    }
  }

  return result;
}

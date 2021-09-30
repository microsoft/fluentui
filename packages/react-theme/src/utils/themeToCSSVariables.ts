import type { Theme } from '../types';

export function themeToCSSVariables(theme: Theme): Record<string, string | number> {
  const result: ReturnType<typeof themeToCSSVariables> = {};

  for (const propertyName in theme) {
    if (Object.prototype.hasOwnProperty.call(theme, propertyName)) {
      result[`--${propertyName}`] = theme[propertyName as keyof Theme];
    }
  }

  return result;
}

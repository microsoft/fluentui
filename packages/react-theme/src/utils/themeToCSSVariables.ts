import { Theme } from '../types';

function flattenThemeToCSSVariables(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  themePart: Record<string, any>,
  parentKey: string = '',
  result: Record<string, string> = {},
) {
  for (const propertyName in themePart) {
    if (Object.prototype.hasOwnProperty.call(themePart, propertyName)) {
      const variableName = parentKey ? parentKey + '-' + propertyName : `--${propertyName}`;

      if (typeof themePart[propertyName] === 'object') {
        flattenThemeToCSSVariables(themePart[propertyName], variableName, result);
      } else {
        result[variableName] = themePart[propertyName];
      }
    }
  }
  return result;
}

export function themeToCSSVariables(theme: Theme): Record<string, string> {
  return flattenThemeToCSSVariables(theme);
}

import { getTheme } from '../../Styling';

const defaultTheme = getTheme(true);

export const defaultPalette = Object.keys(defaultTheme.palette).map(variableName => ({
  key: variableName,
  name: variableName,
  value: (defaultTheme.palette as any)[variableName],
  description: '',
}));

export const defaultSemanticColors = Object.keys(defaultTheme.semanticColors).map(variableName => ({
  key: variableName,
  name: variableName,
  value: (defaultTheme.semanticColors as any)[variableName],
  description: (defaultTheme.semanticColors as any)[variableName].indexOf('@deprecated') >= 0 ? 'Deprecated' : '',
}));

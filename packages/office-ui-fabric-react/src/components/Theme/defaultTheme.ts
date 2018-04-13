import { loadTheme } from '../../Styling';

const defaultTheme = loadTheme({});

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
  description: '',
}));

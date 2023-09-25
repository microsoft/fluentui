import { NamedPalette, NamedTheme } from './types';

export const paletteTemplate = (id: string): NamedPalette & { id: string } => ({
  id,
  name: '',
  keyColor: [44.51, 39.05, 288.84],
  darkCp: 2 / 3,
  lightCp: 1 / 3,
  hueTorsion: 0,
});

export const themeTemplate = (id: string): NamedTheme & { id: string } => ({
  id,
  name: '',
  backgrounds: {},
  foregrounds: {},
});

import type { Theme } from '@fluentui/react-theme';

export const themes = [
  { id: 'masons-light', label: 'Masons Light' },
  { id: 'masons-dark', label: 'Masons Dark' },
] as const;

export const defaultTheme = themes[0];

export type ThemeIds = (typeof themes)[number]['id'];
export type ThemeLabels = (typeof themes)[number]['label'];

export type { Theme };

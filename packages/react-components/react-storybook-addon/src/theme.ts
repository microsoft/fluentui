export const themes = [
  { id: 'web-light', label: 'Web Light' },
  { id: 'web-dark', label: 'Web Dark' },
  { id: 'teams-light', label: 'Teams Light' },
  { id: 'teams-dark', label: 'Teams Dark' },
  { id: 'teams-light-v21', label: 'Teams Light V2.1' },
  { id: 'teams-dark-v21', label: 'Teams Dark V2.1' },
  { id: 'teams-high-contrast', label: 'Teams High Contrast' },
] as const;

export const defaultTheme = themes[0];

export type ThemeIds = (typeof themes)[number]['id'];
export type ThemeLabels = (typeof themes)[number]['label'];

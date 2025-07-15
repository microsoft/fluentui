export const themes = [
  { id: 'web-light', label: 'Web Light' },
  { id: 'web-dark', label: 'Web Dark' },
  { id: 'teams-light', label: 'Teams Light' },
  { id: 'teams-dark', label: 'Teams Dark' },
  { id: 'teams-high-contrast', label: 'Teams High Contrast' },
  // TODO: Remove this when merging Semantic tokens to master
  { id: 'semantic-kumo', label: 'Semantic Kumo (Experimental)' },
  { id: 'semantic-copilot-light', label: 'Semantic Copilot Light (Experimental)' },
] as const;

export const defaultTheme = themes[0];

export type ThemeIds = (typeof themes)[number]['id'];
export type ThemeLabels = (typeof themes)[number]['label'];

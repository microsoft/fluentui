import {
  webLightTheme,
  webDarkTheme,
  webHighContrastTheme,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
} from '@fluentui/react-theme';
import { select } from '@storybook/addon-knobs';
import type { Theme } from '@fluentui/react-theme';

const themeSelectorLabel = 'Theme';

const themeOptions = [
  { label: 'Web Light', theme: webLightTheme },
  { label: 'Web Dark', theme: webDarkTheme },
  { label: 'Web High Contrast', theme: webHighContrastTheme },
  { label: 'Teams Light', theme: teamsLightTheme },
  { label: 'Teams Dark', theme: teamsDarkTheme },
  { label: 'Teams High Contrast', theme: teamsHighContrastTheme },
];

export const useFluentTheme = (): { label: string; theme: Theme } => {
  // Casting any here due to issue: https://github.com/storybookjs/storybook/issues/9751
  const themeLabels = themeOptions.map(option => ({ label: option.label }));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { label } = select(themeSelectorLabel, themeLabels, themeLabels[0] as any);

  // Can't trust storybook not to HTML encode theme values
  const { theme } = themeOptions.find(pair => pair.label === label) || { theme: webLightTheme };
  return { label, theme };
};

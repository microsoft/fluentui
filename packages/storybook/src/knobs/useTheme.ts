import { select } from '@storybook/addon-knobs';
import * as V8Themes from '../themes/v8/index';
import * as V7Themes from '../themes/v7/index';

const themeSelectorLabel = 'Theme';

const defaultThemeOption = { label: 'None', theme: undefined };
const v8ThemeOptions = [{ label: 'V8 - Fluent', theme: V8Themes.FluentTheme }];
const v7ThemeOptions = [
  { label: 'V7 - Fluent', theme: V7Themes.FluentTheme },
  { label: 'V7 - Dark', theme: V7Themes.DarkTheme, isDark: true },
  { label: 'V7 - Word', theme: V7Themes.WordTheme },
  { label: 'V7 - Teams', theme: V7Themes.TeamsTheme },
  { label: 'V7 - Azure Light', theme: V7Themes.AzureLightTheme },
  { label: 'V7 - Azure Dark', theme: V7Themes.AzureDarkTheme, isDark: true },
];

const themeOptions = [defaultThemeOption, ...v8ThemeOptions, ...v7ThemeOptions];

export const useTheme = () =>
  // Casting any here due to issue: https://github.com/storybookjs/storybook/issues/9751
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  select(themeSelectorLabel, themeOptions as any, defaultThemeOption as any);

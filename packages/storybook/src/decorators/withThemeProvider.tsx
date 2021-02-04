import * as React from 'react';
import { makeDecorator } from '@storybook/addons';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import {
  webLightTheme,
  teamsLightTheme,
  webDarkTheme,
  teamsDarkTheme,
  webHighContrastTheme,
  teamsHighContrastTheme,
  Theme,
} from '@fluentui/react-theme';
// import { useTheme } from '../knobs/useTheme';

import { StorybookThemeGlobal } from '../../types';

const themes = {
  web: {
    debugName: 'webTheme',
    friendlyName: 'Web',
    light: webLightTheme,
    dark: webDarkTheme,
    highContrast: webHighContrastTheme,
  },

  teams: {
    debugName: 'teamsTheme',
    friendlyName: 'Teams',
    light: teamsLightTheme,
    dark: teamsDarkTheme,
    highContrast: teamsHighContrastTheme,
  },
} as {
  web: StorybookThemeGlobal;
  teams: StorybookThemeGlobal;
};

const ThemeProviderWrapper: React.FunctionComponent<{ theme?: Theme | undefined }> = props => {
  const [themeBrand, setConvergedThemes] = React.useState('web');
  // const { theme, isDark } = useTheme();

  const theme = themes[themeBrand] as StorybookThemeGlobal;

  return (
    <div>
      <select>
        <option onClick={() => setConvergedThemes('web')}>Web</option>
        <option onClick={() => setConvergedThemes('teams')}>Teams</option>
      </select>

      <ThemeProvider theme={theme.light /*props.theme || theme*/}>{props.children}</ThemeProvider>
      <ThemeProvider theme={theme.dark /*props.theme || theme*/}>{props.children}</ThemeProvider>
      <ThemeProvider theme={theme.highContrast /*props.theme || theme*/}>{props.children}</ThemeProvider>
    </div>
  );
};

export const withThemeProvider = makeDecorator({
  name: 'withThemeProvider',
  parameterName: 'theme',
  skipIfNoParametersOrOptions: false,
  wrapper: (storyFn, context, { options, parameters }) => {
    const theme = (options?.theme || parameters) as Theme;
    return <ThemeProviderWrapper theme={theme}>{storyFn(context)}</ThemeProviderWrapper>;
  },
});

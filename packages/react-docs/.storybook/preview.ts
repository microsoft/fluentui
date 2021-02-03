import { withThemeProvider } from '../src/decorators/withThemeProvider';
// import { withNorthstarProvider, themes } from '../src/decorators/withThemeProvider';
import {
  webLightTheme,
  teamsLightTheme,
  webDarkTheme,
  teamsDarkTheme,
  webHighContrastTheme,
  teamsHighContrastTheme,
} from '@fluentui/react-theme';
import { StorybookThemeGlobal } from '../src/types';

const webThemes: StorybookThemeGlobal = {
  debugName: 'webTheme',
  friendlyName: 'Web',
  light: webLightTheme,
  dark: webDarkTheme,
  highContrast: webHighContrastTheme,
};

const teamsThemes: StorybookThemeGlobal = {
  debugName: 'teamsTheme',
  friendlyName: 'Teams',
  light: teamsLightTheme,
  dark: teamsDarkTheme,
  highContrast: teamsHighContrastTheme,
};

export const parameters = {
  // layout: 'centered',
};

export const globalTypes = {
  theme: {
    name: 'Brand',
    description: 'Global theme for components',
    defaultValue: webThemes,
    toolbar: {
      items: [
        { title: 'Web', value: webThemes },
        { title: 'Teams', value: teamsThemes },
      ],
    },
  },

  // TODO: standardize from Nova interfaces
  // locale: {
  //   name: 'Locale',
  //   description: 'Internationalization locale',
  //   defaultValue: 'en',
  //   toolbar: {
  //     icon: 'globe',
  //     items: [
  //       { value: 'en', right: '🇺🇸', title: 'English' },
  //       { value: 'fr', right: '🇫🇷', title: 'Français' },
  //       { value: 'es', right: '🇪🇸', title: 'Español' },
  //       { value: 'zh', right: '🇨🇳', title: '中文' },
  //       { value: 'kr', right: '🇰🇷', title: '한국어' },
  //     ],
  //   },
  // },
};

export const decorators = [withThemeProvider];

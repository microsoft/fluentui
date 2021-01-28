import { withThemeProvider } from '../src/decorators/withThemeProvider';
// import { withNorthstarProvider, themes } from '../src/decorators/withThemeProvider';
import * as themeBase from '../src/themes/theme-base';
import * as themeTeams from '../src/themes/theme-teams';
import { mergeThemes } from '../src/themes/mergeThemes';

export const parameters = {
  layout: 'centered',
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'Teams',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { title: 'theme-base', value: themeBase },
        { title: 'theme-teams', value: mergeThemes(themeBase, themeTeams) },
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

import { withThemeProvider, themes } from '../src/decorators/withThemeProvider';

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'Teams',
    toolbar: {
      icon: 'paintbrush',
      items: Object.keys(themes),
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

import { select } from '@storybook/addon-knobs';

const themeSelectorLabel = 'Theme';

const TeamsTheme = {
  tokens: {
    body: {
      background: 'white',
      contentColor: 'black',
    },

    card: {
      size: {
        small: {
          height: '100%',
          width: '200px',
        },
        smaller: {
          height: '100%',
          width: '200px',
        },
        smallest: {
          height: '100%',
          width: '200px',
        },
        medium: {
          height: '100%',
          width: '300px',
        },
        large: {
          height: '100%',
          width: '500px',
        },
        larger: {
          height: '100%',
          width: '500px',
        },
        largest: {
          height: '100%',
          width: '500px',
        },
      },
    },
  },
  stylesheets: [],
};

const themeOptions = [{ label: 'Teams', theme: TeamsTheme }];
const defaultThemeOption = themeOptions[0];

export const useTheme = () => select(themeSelectorLabel, themeOptions, defaultThemeOption);

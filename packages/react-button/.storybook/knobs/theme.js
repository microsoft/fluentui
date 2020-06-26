import { select } from '@storybook/addon-knobs';

const themeSelectorLabel = 'Theme';

const FluentTheme = {
  tokens: {
    palette: {
      accent: '#0078D4',
    },

    body: {
      background: 'white',
      contentColor: 'black',
    },

    accent: {
      background: 'var(--palette-accent)',
      disabled: {
        background: '#FAFAFA',
      },
      hovered: {
        background: '#0072C9',
      },
      pressed: {
        background: '#0078D4',
      },
    },

    button: {
      background: '#F5F5F5',
      disabled: {
        background: '#FAFAFA',
      },
      hovered: {
        background: '#F2F2F2',
      },
      pressed: {
        background: '#F7F7F7',
      },
    },
  },
  stylesheets: [],
};

const themeOptions = [
  { label: 'Teams', theme: undefined },
  { label: 'Fluent', theme: FluentTheme },
];
const defaultThemeOption = themeOptions[0];

export const useTheme = () => select(themeSelectorLabel, themeOptions, defaultThemeOption);

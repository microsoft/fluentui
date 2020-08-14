import { PartialTheme } from '@fluentui/react-theme-provider';

export const FluentTheme: PartialTheme = {
  tokens: {
    body: {
      background: 'white',
      contentColor: 'black',
    },

    accent: {
      background: 'var(--palette-accent)',
      dividerColor: '#EAEAEA',
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

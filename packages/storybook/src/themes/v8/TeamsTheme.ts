import { PartialTheme } from '@fluentui/react-theme-provider';

export const TeamsTheme: PartialTheme = {
  tokens: {
    accent: {
      background: '#6264a7',

      disabled: {
        background: '#edebe9',
        contentColor: '#c8c6c4',
      },
      pressed: {
        background: '#464775',
      },

      focused: {
        background: '#585a96',
      },

      hovered: {
        background: '#585a96',
      },
    },

    button: {
      padding: '0 24px',
      fontWeight: 600,
      borderColor: '#e1dfdd',
      transition: 'all 100ms ease 0s',
      boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0.2rem 0.4rem -0.075rem',

      disabled: {
        background: '#edebe9',
        borderColor: 'var(--button-borderColor)',
        contentColor: '#c8c6c4',
        boxShadow: 'none',
      },
      hovered: {
        background: '#edebe9',
        borderColor: 'var(--button-borderColor)',
        contentColor: 'var(--button-contentColor)',
      },
      pressed: {
        background: '#e1dfdd',
        borderColor: 'var(--button-borderColor)',
        contentColor: 'var(--button-contentColor)',
        transition: 'all 50ms ease 0s',
        boxShadow: 'none',
      },
    },
  },
};

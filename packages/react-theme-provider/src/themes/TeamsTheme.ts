import { PartialTheme } from '../types';

export const TeamsTheme: PartialTheme = {
  tokens: {
    accent: {
      background: '#6264a7',

      disabled: {
        background: '#edebe9',
        contentColor: '#c8c6c4',
        borderColor: 'var(--accent-disabled-background)',
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
      paddingLeft: 24,
      paddingRight: 24,
      fontFamily: `"Segoe UI", "Helvetica Neue", "Apple Color Emoji", "Segoe UI Emoji", Helvetica, Arial, sans-serif`,
      fontWeight: 600,
      borderColor: '#e1dfdd',
      transition: 'all 100ms ease 0s',
      boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0.2rem 0.4rem -0.075rem',

      contentColor: '#252423',
      focusColor: '#000',

      disabled: {
        background: '#edebe9',
        contentColor: '#c8c6c4',
        borderColor: 'var(--button-disabled-background)',
        boxShadow: 'none',
      },
      hovered: {
        background: '#edebe9',
        contentColor: 'var(--button-contentColor)',
        borderColor: 'var(--button-borderColor)',
      },
      pressed: {
        background: '#e1dfdd',
        contentColor: 'var(--button-contentColor)',
        borderColor: 'var(--button-borderColor)',
        transition: 'all 50ms ease 0s',
        boxShadow: 'none',
      },
    },
  },
};

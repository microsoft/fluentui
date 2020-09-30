import { PartialTheme } from '@fluentui/theme';

export const TeamsTheme: PartialTheme = {
  tokens: {
    color: {
      brand: {
        background: '#6264a7',

        disabled: {
          background: '#edebe9',
          contentColor: '#c8c6c4',
          borderColor: 'var(--color-brand-disabled-background)',
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
    },

    button: {
      paddingLeft: '24px',
      paddingRight: '24px',
      fontFamily: `"Segoe UI", "Helvetica Neue", "Apple Color Emoji", "Segoe UI Emoji", Helvetica, Arial, sans-serif`,
      fontWeight: '600',
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

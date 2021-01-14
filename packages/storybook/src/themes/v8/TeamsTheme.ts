import { PartialTheme } from '@fluentui/theme';

const tokens = {
  color: {
    brand: {
      background: '#6264a7',

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
};

export const TeamsTheme: PartialTheme = {
  tokens,
  components: {
    Button: {
      variants: {
        root: {
          paddingLeft: '24px',
          paddingRight: '24px',
          fontFamily:
            `"Segoe UI", "Helvetica Neue", "Apple Color Emoji", ` + `"Segoe UI Emoji", Helvetica, Arial, sans-serif`,
          fontWeight: '600',
          borderColor: '#e1dfdd',
          transition: 'all 100ms ease 0s',
          boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0.2rem 0.4rem -0.075rem',

          contentColor: '#252423',
          focusColor: '#000',

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
        primary: {
          background: tokens.color.brand.background,
          contentColor: 'white',

          hovered: {
            background: tokens.color.brand.hovered.background,
            contentColor: 'white',
          },

          pressed: {
            background: tokens.color.brand.pressed.background,
            contentColor: 'white',
          },
        },
        disabled: {
          background: '#edebe9',
          contentColor: '#c8c6c4',
          borderColor: '#edebe9',
          boxShadow: 'none',
        },
      },
    },
    CompoundButton: {
      variants: {
        disabled: {
          secondaryContentColor: '#c8c6c4',
        },
      },
    },
  },
};

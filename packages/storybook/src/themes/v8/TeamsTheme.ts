import { PartialTheme } from '@fluentui/react-theme-provider';

export const TeamsTheme: PartialTheme = {
  tokens: {
    body: {
      background: 'white',
      contentColor: 'black',
    },

    accent: {
      background: '#6264a7',
      borderColor: 'transparent',
      contentColor: 'white',
      iconColor: 'inherit',

      disabled: {
        background: '#edebe9',
        borderColor: 'var(--accent-disabled-background)',
        contentColor: '#c8c6c4',
        iconColor: 'var(--accent-disabled-contentColor)',
      },
      pressed: {
        background: '#464775',
        borderColor: 'var(--accent-borderColor)',
        contentColor: 'var(--accent-contentColor)',
        iconColor: 'var(--accent-iconColor)',
      },

      focused: {
        background: '#585a96',
        borderColor: 'var(--accent-borderColor)',
        contentColor: 'var(--accent-contentColor)',
        iconColor: 'var(--accent-iconColor)',
      },

      hovered: {
        background: '#585a96',
        borderColor: 'var(--accent-borderColor)',
        contentColor: 'var(--accent-contentColor)',
        iconColor: 'var(--accent-icon)',
      },
    },

    button: {
      size: {
        smallest: '8px',
        smaller: '16px',
        small: '24px',
        regular: '32px',
        large: '40px',
        larger: '48px',
        largest: '64px',
      },
      padding: '0 24px',
      height: 'var(--button-size-regular)',
      minHeight: 'var(--button-size-regular)',
      contentGap: '10px',
      iconSize: '16px',
      borderRadius: '2px',
      borderWidth: '1px',
      boxShadow: ' 0px 2px 4px -0.75px rgba(0, 0, 0, 0.1)',

      fontFamily: `'Segoe UI', 'Helvetica Neue', 'Apple Color Emoji', 'Segoe UI Emoji', Helvetica, Arial, sans-serif`,
      fontSize: '14px',
      fontWeight: 600,

      focusColor: '#000',
      focusInnerColor: '#fff',

      background: 'white',
      borderColor: '#e1dfdd',
      contentColor: '#2c2621',
      iconColor: 'inherit',

      hovered: {
        background: '#edebe9',
        borderColor: 'var(--button-borderColor)',
        contentColor: 'var(--button-contentColor)',
        iconColor: 'var(--button-iconColor)',
      },
      focused: {
        background: 'var(--button-background)',
        borderColor: 'var(--button-borderColor)',
        contentColor: 'var(--button-contentColor)',
        iconColor: 'var(--button-iconColor)',
      },
      pressed: {
        transform: 'scale(0.95)',
        transition: 'transform 0.1s linear',
        background: '#e1dfdd',
        borderColor: 'var(--button-borderColor)',
        contentColor: 'var(--button-contentColor)',
        iconColor: 'var(--button-iconColor)',
      },
      disabled: {
        boxShadow: 'none',
        background: '#edebe9',
        borderColor: 'var(--button-disabled-background)',
        contentColor: '#c8c6c4',
        iconColor: 'var(--button-disabled-contentColor)',
      },
    },
  },
};

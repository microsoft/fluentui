import { makeClasses } from '@fluentui/react-theme-provider';

export const useSplitButtonClasses = makeClasses({
  root: {
    display: 'inline-flex',
    justifyContent: 'stretch',
  },

  button: {
    '--button-borderRightWidth': 0,
    '--button-borderTopRightRadius': 0,
    '--button-borderBottomRightRadius': 0,
  },

  menuButton: {
    '--button-borderLeftWidth': 0,
    '--button-borderTopLeftRadius': 0,
    '--button-borderBottomLeftRadius': 0,
  },

  divider: {
    display: 'inline-block',
    borderLeft: 'var(--button-dividerThickness) solid var(--button-dividerColor)',
    width: '0px',
  },

  _fluid: {
    width: '100%',
    maxWidth: '100%',
  },
});

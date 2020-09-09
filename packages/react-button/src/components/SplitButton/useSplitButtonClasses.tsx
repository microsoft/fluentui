/* eslint-disable @typescript-eslint/naming-convention */
// eslint-disable @typescript-eslint/naming-convention
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

  _size_smallest: {
    '--button-minHeight': 'var(--button-size-smallest)',
  },

  _size_smaller: {
    '--button-minHeight': 'var(--button-size-smaller)',
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _size_small: {
    '--button-minHeight': 'var(--button-size-small)',
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _size_large: {
    '--button-minHeight': 'var(--button-size-large)',
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _size_larger: {
    '--button-minHeight': 'var(--button-size-larger)',
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _size_largest: {
    '--button-minHeight': 'var(--button-size-largest)',
  },
});

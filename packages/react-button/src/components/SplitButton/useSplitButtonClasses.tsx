/* eslint-disable @typescript-eslint/naming-convention */
import { makeClasses } from '@fluentui/react-theme-provider';

const GlobalClassNames = {
  button: 'ms-SplitButton-button',
  menuButton: 'ms-SplitButton-menuButton',
};

// TODO: move this to a token.
const menuButtonWidth = 32;

export const useSplitButtonClasses = makeClasses({
  root: {
    display: 'inline-flex',
    justifyContent: 'stretch',
    position: 'relative',
  },

  button: [
    GlobalClassNames.button,
    {
      '--button-borderRightWidth': 0,
      '--button-borderTopRightRadius': 0,
      '--button-borderBottomRightRadius': 0,
    },
  ],

  menuButton: [
    GlobalClassNames.menuButton,
    {
      '--button-borderLeftWidth': 0,
      '--button-borderTopLeftRadius': 0,
      '--button-borderBottomLeftRadius': 0,
      '--button-width': menuButtonWidth,
      '--button-paddingLeft': 0,
      '--button-paddingRight': 0,
    },
  ],

  divider: {
    width: 'var(--button-dividerThickness)',
    backgroundColor: 'var(--button-dividerColor)',
    position: 'absolute',
    right: menuButtonWidth,
    top: 'calc(100% - var(--button-dividerLength, 100% + 8px))',
    bottom: 'calc(100% - var(--button-dividerLength, 100% + 8px))',
  },

  _fluid: {
    width: '100%',
    maxWidth: '100%',

    [`.${GlobalClassNames.button}`]: {
      flexGrow: 1,
    },

    [`.${GlobalClassNames.menuButton}`]: {
      width: menuButtonWidth,
    },
  },

  _size_smallest: {
    '--button-minHeight': 'var(--button-size-smallest)',
  },

  _size_smaller: {
    '--button-minHeight': 'var(--button-size-smaller)',
  },

  _size_small: {
    '--button-minHeight': 'var(--button-size-small)',
  },

  _size_large: {
    '--button-minHeight': 'var(--button-size-large)',
  },

  _size_larger: {
    '--button-minHeight': 'var(--button-size-larger)',
  },

  _size_largest: {
    '--button-minHeight': 'var(--button-size-largest)',
  },
});

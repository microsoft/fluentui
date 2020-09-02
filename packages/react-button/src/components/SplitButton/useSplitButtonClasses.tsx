/* eslint-disable @typescript-eslint/naming-convention */
import { makeClasses } from '@fluentui/react-theme-provider';

const commonButtonStyles = {
  alignItems: 'center',
  background: 'inherit',
  border: 'none',
  boxShadow: 'none',
  color: 'inherit',
  cursor: 'pointer',
  display: 'flex',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  height: 'var(--button-height)',
  justifyContent: 'center',
  minHeight: 'var(--button-minHeight)',
  // @include focus-border($thickness: 0);
};

const GlobalClassNames = {
  root: 'ms-SplitButton',
  button: 'ms-SplitButton-button',
  divider: 'ms-SplitButton-divider',
  menuButton: 'ms-SplitButton-menuButton',
};

export const useSplitButtonClasses = makeClasses({
  root: [
    GlobalClassNames.root,
    {
      width: 'auto',
      padding: 0,
      overflow: 'hidden',
      boxSizing: 'border-box',

      '& > *:not(:first-child)': {
        marginLeft: 0,
      },
    },
  ],

  button: [
    GlobalClassNames.button,
    commonButtonStyles,
    {
      paddingLeft: 'var(--button-paddingLeft)',
      paddingRight: 'var(--button-paddingRight)',
      paddingTop: 'var(--button-paddingTop)',
      paddingBottom: 'var(--button-paddingBottom)',

      '& > *:not(:first-child)': {
        marginLeft: 'var(--button-contentGap)',
      },
    },
  ],

  menuButton: [
    GlobalClassNames.menuButton,
    commonButtonStyles,
    {
      '--button-paddingLeft': 0,
      '--button-paddingRight': 0,
      '--button-width': 'var(--button-height, var(--button-minHeight))',
      width: 'var(--button-height, var(--button-minHeight))',
    },
  ],

  divider: {
    borderLeft: 'var(--button-dividerThickness) solid var(--button-dividerColor)',
    height: 'var(--button-dividerLength)',
    width: '0px',

    '._primary &': {
      buttonDividerColor: 'var(--accent-dividerColor)',
    },

    '._disabled &': {
      buttonDividerColor: 'var(--accent-disabled-dividerColor)',
    },
  },

  icon: {},

  _circular: {
    [GlobalClassNames.button]: {
      // borderTopLeftRadius: 'var(--button-borderRadius)',
      // borderBottomLeftRadius: 'var(--button-borderRadius)',
    },
  },

  _size_smallest: {
    '--button-dividerLength': 'var(--button-size-smallest)',
  },

  _size_smaller: {
    '--button-dividerLength': 'var(--button-size-smaller)',
  },

  _size_small: {
    '--button-dividerLength': 'var(--button-size-small)',
  },

  _size_large: {
    '--button-dividerLength': 'var(--button-size-large)',
  },

  _size_larger: {
    '--button-dividerLength': 'var(--button-size-larger)',
  },

  _size_largest: {
    '--button-dividerLength': 'var(--button-size-largest)',
  },
});

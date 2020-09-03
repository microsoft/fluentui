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
});

import { makeStyles, shorthands } from '@fluentui/react-components';

export const useRootStyles = makeStyles({
  base: {
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
    verticalAlign: 'middle',

    ...shorthands.margin(0),
    ...shorthands.padding('4px'),
    ...shorthands.overflow('hidden'),

    backgroundColor: 'transparent',
    color: '#000000',

    ...shorthands.border('1px', 'solid', 'transparent'),
    ...shorthands.borderRadius('4px'),

    fontFamily: 'Arial',
    fontSize: '14px',

    ':hover': {
      ...shorthands.border('1px', 'solid', '#000000'),
      cursor: 'pointer',
      backgroundColor: 'aliceblue',
    },

    ':hover:active': {
      backgroundColor: 'darkgrey',
    },
  },

  // High contrast styles
  highContrast: {
    '@media (forced-colors: active)': {
      ':focus': {
        ...shorthands.borderColor('ButtonText'),
      },

      ':hover': {
        backgroundColor: 'HighlightText',
        ...shorthands.borderColor('Highlight'),
        color: 'Highlight',
        forcedColorAdjust: 'none',
      },

      ':hover:active': {
        backgroundColor: 'HighlightText',
        ...shorthands.borderColor('Highlight'),
        color: 'Highlight',
        forcedColorAdjust: 'none',
      },
    },
  },
});

export const useRootDisabledStyles = makeStyles({
  base: {
    color: 'lightgrey',
    cursor: 'not-allowed',

    ':hover,:hover:active': {
      color: 'lightgrey',
      cursor: 'not-allowed',
    },
  },

  // High contrast styles
  highContrast: {
    '@media (forced-colors: active)': {
      ...shorthands.borderColor('GrayText'),
      color: 'GrayText',

      ':focus': {
        ...shorthands.borderColor('GrayText'),
      },

      ':hover': {
        ...shorthands.borderColor('GrayText'),
        color: 'GrayText',
      },

      ':hover:active': {
        ...shorthands.borderColor('GrayText'),
        color: 'GrayText',
      },
    },
  },
});

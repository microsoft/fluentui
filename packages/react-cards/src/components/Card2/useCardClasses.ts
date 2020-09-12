import { makeClasses } from '@fluentui/react-theme-provider';
import { CardState } from './Card.types';

const GlobalClassNames = {
  root: 'ms-Card',
};

export const useCardClasses = makeClasses<CardState>({
  root: [
    GlobalClassNames.root,
    {
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',

      backgroundColor: 'var(--card-backgroundColor)',
      borderColor: 'var(--card-borderColor)',
      borderRadius: 'var(--card-borderRadius)',
      borderWidth: 'var(--card-borderWidth)',
      height: 'var(--card-height)',
      margin: 'var(--card-margin)',
      minHeight: 'var(--card-minHeight)',
      minWidth: 'var(--card-minWidth)',
      padding: 'var(--card-padding)',
      width: 'var(--card-width)',

      '--card-borderRadius': 'var(--card-size-medium-borderRadius)',
      '--card-height': 'var(--card-size-medium-height)',
      '--card-margin': 'var(--card-size-medium-margin)',
      '--card-padding': 'var(--card-size-medium-padding)',
      '--card-width': 'var(--card-size-medium-width)',

      '--card-hovered-backgroundColor': 'var(--card-backgroundColor)',
      '--card-hovered-borderColor': 'var(--card-borderColor)',
      '--card-hovered-borderWidth': 'var(--card-borderWidth)',
      '--card-hovered-boxShadow': 'var(--card-boxShadow)',

      '--card-pressed-backgroundColor': 'var(--card-backgroundColor)',
      '--card-pressed-borderColor': 'var(--card-borderColor)',
      '--card-pressed-borderWidth': 'var(--card-borderWidth)',
      '--card-pressed-boxShadow': 'var(--card-boxShadow)',

      ':global(.ms-Fabric--isFocusVisible) &:focus::after': {
        content: '""',
        position: 'absolute',
        left: 1,
        right: 1,
        top: 1,
        bottom: 1,
        borderWidth: 'var(--card-focusWidth, 1px)',
        borderStyle: 'solid',
        borderColor: 'var(--card-focusBorderColor, white)',
        outlineWidth: 'var(--card-focusWidth, 1px)',
        outlineStyle: 'solid',
        outlineColor: 'var(--card-focusOutlineColor, #605e5c)',
      },

      '&:hover': {
        background: 'var(--card-hovered-background, var(--card-background))',
        borderColor: 'var(--card-hovered-borderColor, var(--card-borderColor))',
        borderWidth: 'var(--card-hovered-borderWidth, var(--card-borderWidth))',
        boxShadow: 'var(--card-hovered-boxShadow, var(--card-boxShadow))',
      },

      '&:active': {
        background: 'var(--card-pressed-background, var(--card-background))',
        borderColor: 'var(--card-pressed-borderColor, var(--card-borderColor))',
        borderWidth: 'var(--card-pressed-borderWidth, var(--card-borderWidth))',
        boxShadow: 'var(--card-pressed-boxShadow, var(--card-boxShadow))',
      },
    },
  ],

  _onClick: {
    cursor: 'pointer',

    '--card-backgroundColor': 'var(--card-clickable-backgroundColor)',
    '--card-borderColor': 'var(--card-clickable-borderColor)',
    '--card-borderWidth': 'var(--card-clickable-borderWidth)',
    '--card-boxShadow': 'var(--card-clickable-boxShadow)',

    /* selectors */
    '&:hover': {
      '--card-hovered-backgroundColor': 'var(--card-clickable-hovered-backgroundColor)',
      '--card-hovered-borderColor': 'var(--card-clickable-hovered-borderColor)',
      '--card-hovered-borderWidth': 'var(--card-clickable-hovered-borderWidth)',
      '--card-hovered-boxShadow': 'var(--card-clickable-hovered-boxShadow)',
    },

    '&:active': {
      '--card-pressed-backgroundColor': 'var(--card-clickable-pressed-backgroundColor)',
      '--card-pressed-borderColor': 'var(--card-clickable-pressed-borderColor)',
      '--card-pressed-borderWidth': 'var(--card-clickable-pressed-borderWidth)',
      '--card-pressed-boxShadow': 'var(--card-clickable-pressed-boxShadow)',
    },
  },

  _compact: {
    '--card-padding': 'var(--card-compact-padding)',
  },

  _disabled: {
    cursor: 'not-allowed',

    '--card-backgroundColor': 'var(--card-disabled-backgroundColor)',
    '--card-borderColor': 'var(--card-disabled-borderColor)',
    '--card-borderWidth': 'var(--card-disabled-borderWidth)',
    '--card-boxShadow': 'var(--card-disabled-boxShadow)',

    /* selectors */
    '&:hover': {
      '--card-hovered-backgroundColor': 'var(--card-disabled-backgroundColor)',
      '--card-hovered-borderColor': 'var(--card-disabled-borderColor)',
      '--card-hovered-borderWidth': 'var(--card-disabled-borderWidth)',
      '--card-hovered-boxShadow': 'var(--card-disabled-boxShadow)',
    },

    '&:active': {
      '--card-pressed-backgroundColor': 'var(--card-disabled-backgroundColor)',
      '--card-pressed-borderColor': 'var(--card-disabled-borderColor)',
      '--card-pressed-borderWidth': 'var(--card-disabled-borderWidth)',
      '--card-pressed-boxShadow': 'var(--card-disabled-boxShadow)',
    },
  },

  _fluid: {
    '--card-height': 'var(--card-fluid-height)',
    '--card-width': 'var(--card-fluid-width)',
  },

  _selected: {
    '--card-backgroundColor': 'var(--card-selected-backgroundColor)',
    '--card-borderColor': 'var(--card-selected-borderColor)',
    '--card-borderWidth': 'var(--card-selected-borderWidth)',
    '--card-boxShadow': 'var(--card-selected-boxShadow)',
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _size_smallest: {
    '--card-borderRadius': 'var(--card-size-smallest-borderRadius)',
    '--card-height': 'var(--card-size-smallest-height)',
    '--card-margin': 'var(--card-size-smallest-margin)',
    '--card-padding': 'var(--card-size-smallest-padding)',
    '--card-width': 'var(--card-size-smallest-width)',
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _size_smaller: {
    '--card-borderRadius': 'var(--card-size-smaller-borderRadius)',
    '--card-height': 'var(--card-size-smaller-height)',
    '--card-margin': 'var(--card-size-smaller-margin)',
    '--card-padding': 'var(--card-size-smaller-padding)',
    '--card-width': 'var(--card-size-smaller-width)',
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _size_small: {
    '--card-borderRadius': 'var(--card-size-small-borderRadius)',
    '--card-height': 'var(--card-size-small-height)',
    '--card-margin': 'var(--card-size-small-margin)',
    '--card-padding': 'var(--card-size-small-padding)',
    '--card-width': 'var(--card-size-small-width)',
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _size_large: {
    '--card-borderRadius': 'var(--card-size-large-borderRadius)',
    '--card-height': 'var(--card-size-large-height)',
    '--card-margin': 'var(--card-size-large-margin)',
    '--card-padding': 'var(--card-size-large-padding)',
    '--card-width': 'var(--card-size-large-width)',
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _size_larger: {
    '--card-borderRadius': 'var(--card-size-larger-borderRadius)',
    '--card-height': 'var(--card-size-larger-height)',
    '--card-margin': 'var(--card-size-larger-margin)',
    '--card-padding': 'var(--card-size-larger-padding)',
    '--card-width': 'var(--card-size-larger-width)',
  },

  // eslint-disable-next-line @typescript-eslint/naming-convention
  _size_largest: {
    '--card-borderRadius': 'var(--card-size-largest-borderRadius)',
    '--card-height': 'var(--card-size-largest-height)',
    '--card-margin': 'var(--card-size-largest-margin)',
    '--card-padding': 'var(--card-size-largest-padding)',
    '--card-width': 'var(--card-size-largest-width)',
  },
});

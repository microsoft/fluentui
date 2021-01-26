/* eslint-disable @typescript-eslint/naming-convention */
import { makeVariantClasses } from '@fluentui/react-theme-provider/lib/compat';
import { Theme } from '@fluentui/theme';
import { CardState, CardVariants } from './Card.types';

const GlobalClassNames = {
  root: 'ms-Card',
};

export const CardSizeVariants = {
  size_smallest: {
    borderRadius: 'var(--card-size-smallest-borderRadius)',
    height: 'var(--card-size-smallest-height)',
    margin: 'var(--card-size-smallest-margin)',
    padding: 'var(--card-size-smallest-padding)',
    width: 'var(--card-size-smallest-width)',
  },

  size_smaller: {
    borderRadius: 'var(--card-size-smaller-borderRadius)',
    height: 'var(--card-size-smaller-height)',
    margin: 'var(--card-size-smaller-margin)',
    padding: 'var(--card-size-smaller-padding)',
    width: 'var(--card-size-smaller-width)',
  },

  size_small: {
    borderRadius: 'var(--card-size-small-borderRadius)',
    height: 'var(--card-size-small-height)',
    margin: 'var(--card-size-small-margin)',
    padding: 'var(--card-size-small-padding)',
    width: 'var(--card-size-small-width)',
  },

  size_large: {
    borderRadius: 'var(--card-size-large-borderRadius)',
    height: 'var(--card-size-large-height)',
    margin: 'var(--card-size-large-margin)',
    padding: 'var(--card-size-large-padding)',
    width: 'var(--card-size-large-width)',
  },

  size_larger: {
    borderRadius: 'var(--card-size-larger-borderRadius)',
    height: 'var(--card-size-larger-height)',
    margin: 'var(--card-size-larger-margin)',
    padding: 'var(--card-size-larger-padding)',
    width: 'var(--card-size-larger-width)',
  },

  size_largest: {
    borderRadius: 'var(--card-size-largest-borderRadius)',
    height: 'var(--card-size-largest-height)',
    margin: 'var(--card-size-largest-margin)',
    padding: 'var(--card-size-largest-padding)',
    width: 'var(--card-size-largest-width)',
  },
};

const smallCard = {
  borderRadius: '4px',
  height: 'auto',
  margin: '0',
  padding: '8px',
  width: 'auto',
};
const largeCard = {
  borderRadius: '6px',
  height: 'auto',
  margin: '0',
  padding: '16px',
  width: 'auto',
};

export const useCardClasses = makeVariantClasses<CardState, CardVariants>({
  name: 'Card',
  prefix: '--card',

  styles: {
    root: [
      GlobalClassNames.root,
      {
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',

        background: 'var(--card-background)',
        borderColor: 'var(--card-borderColor)',
        borderRadius: 'var(--card-borderRadius)',
        borderStyle: 'var(--card-borderStyle)',
        borderWidth: 'var(--card-borderWidth)',
        boxShadow: 'var(--card-boxShadow)',
        color: 'var(--card-contentColor)',
        cursor: 'var(--card-cursor)',
        height: 'var(--card-height)',
        margin: 'var(--card-margin)',
        minHeight: 'var(--card-minHeight)',
        minWidth: 'var(--card-minWidth)',
        padding: 'var(--card-padding)',
        width: 'var(--card-width)',

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
          color: 'var(--card-hovered-contentColor, var(--card-contentColor))',
        },

        '&:active': {
          background: 'var(--card-pressed-background, var(--card-background))',
          borderColor: 'var(--card-pressed-borderColor, var(--card-borderColor))',
          borderWidth: 'var(--card-pressed-borderWidth, var(--card-borderWidth))',
          boxShadow: 'var(--card-pressed-boxShadow, var(--card-boxShadow))',
          color: 'var(--card-pressed-contentColor, var(--card-contentColor))',
        },

        '&[aria-disabled=true]': {
          background: 'var(--card-disabled-background)',
          borderColor: 'var(--card-disabled-borderColor)',
          borderWidth: 'var(--card-disabled-borderWidth)',
          boxShadow: 'var(--card-disabled-boxShadow)',
          color: 'var(--card-disabled-contentColor)',
          cursor: 'var(--card-disabled-cursor)',
        },
      },
    ],

    _selected: {
      background: 'var(--card-selected-background)',
      borderColor: 'var(--card-selected-borderColor)',
      borderWidth: 'var(--card-selected-borderWidth)',
      boxShadow: 'var(--card-selected-boxShadow)',
      color: 'var(--card-selected-contentColor)',
    },
  },

  variants: (theme: Theme): CardVariants => {
    return {
      root: {
        size: {
          smallest: smallCard,
          smaller: smallCard,
          small: smallCard,
          medium: {
            borderRadius: '4px',
            height: 'auto',
            margin: '0',
            padding: '16px',
            width: 'auto',
          },
          large: largeCard,
          larger: largeCard,
          largest: largeCard,
        },

        background: '#ffffff',
        borderColor: 'transparent',
        borderWidth: '1px',
        boxShadow: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.1)',
        minHeight: '32px',
        minWidth: '100px',

        borderRadius: 'var(--card-size-medium-borderRadius)',
        height: 'var(--card-size-medium-height)',
        margin: 'var(--card-size-medium-margin)',
        padding: 'var(--card-size-medium-padding)',
        width: 'var(--card-size-medium-width)',

        hovered: {
          background: 'var(--card-background)',
          borderColor: 'var(--card-borderColor)',
          borderWidth: 'var(--card-borderWidth)',
          boxShadow: 'var(--card-boxShadow)',
        },

        pressed: {
          background: 'var(--card-background)',
          borderColor: 'var(--card-borderColor)',
          borderWidth: 'var(--card-borderWidth)',
          boxShadow: 'var(--card-boxShadow)',
        },

        selected: {
          background: '#fafafa',
          borderColor: 'var(--card-borderColor)',
          borderWidth: 'var(--card-borderWidth)',
          boxShadow: 'var(--card-boxShadow)',
        },

        disabled: {
          background: '#f0f0f0',
          borderColor: 'var(--card-borderColor)',
          borderWidth: 'var(--card-borderWidth)',
          boxShadow: '0 0.8px 1.8px 0 rgba(0, 0, 0, 0.1)',
          cursor: 'not-allowed',
        },
      },

      onClick: {
        background: '#ffffff',
        borderColor: 'transparent',
        borderWidth: '1px',
        boxShadow: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',

        hovered: {
          background: '#fafafa',
          borderColor: 'var(--card-clickable-borderColor)',
          borderWidth: 'var(--card-clickable-borderWidth)',
          boxShadow: '0 3.2px 7.2px 0 rgba(0, 0, 0, 0.1)',
        },

        pressed: {
          background: '#f5f5f5',
          borderColor: 'var(--card-clickable-borderColor)',
          borderWidth: '2px',
          boxShadow: 'var(--card-clickable-boxShadow)',
        },
      },

      compact: {
        padding: '0',
      },

      block: {
        height: '100%',
        width: '100%',
      },

      ...CardSizeVariants,
    };
  },
});

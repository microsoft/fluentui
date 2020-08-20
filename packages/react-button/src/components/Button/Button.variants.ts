import { ButtonTokenSet } from './Button.types';
import { RecursivePartial } from '../../utils/tempTypes';

export const buttonVariants: Record<string, RecursivePartial<ButtonTokenSet>> = {
  base: {
    size: {
      smallest: '24px',
      smaller: '24px',
      small: '24px',
      regular: '32px',
      large: '40px',
      larger: '48px',
      largest: '64px',
    },

    padding: '0 24px',
    margin: '0',

    minWidth: '96px',
    width: 'auto',
    maxWidth: '280px',

    minHeight: 'var(--button-size-regular)',

    contentGap: '10px',
    iconSize: '16px',

    borderRadius: '2px',
    borderWidth: '1px',
    boxShadow: '0px 2px 4px -0.75px rgba(0, 0, 0, 0.1)',

    fontFamily: '"Segoe UI", "Helvetica Neue", "Apple Color Emoji", "Segoe UI Emoji", Helvetica, Arial, sans-serif',
    fontSize: '14px',
    fontWeight: '600',

    focusColor: '#000',
    focusInnerColor: '#fff',

    background: 'white',
    borderColor: 'rgb(225, 223, 221)',
    contentColor: 'rgb(44, 38, 33)',
    iconColor: 'inherit',

    hovered: {
      background: 'rgb(237, 235, 233)',
      borderColor: 'var(--button-borderColor)',
      contentColor: 'var(--button-contentColor)',
      iconColor: 'var(--button-iconColor)',
    },

    pressed: {
      transform: 'scale(0.95)',
      transition: 'transform 0.1s linear',

      background: 'rgb(225, 223, 221)',
      borderColor: 'var(--button-borderColor)',
      contentColor: 'var(--button-contentColor)',
      iconColor: 'var(--button-iconColor)',
    },

    disabled: {
      // boxShadow: 'none',
      background: 'rgb(237, 235, 233)',
      borderColor: 'transparent',
      contentColor: 'rgb(200, 198, 196)',
      iconColor: 'var(--button-disabled-contentColor)',
    },
  },

  iconOnly: {
    width: 'var(--button-height, var(--button-minHeight))',
    padding: '0',
  },

  circular: {
    borderRadius: '50000px',
  },

  fluid: {
    width: '100%',
    maxWidth: '100%',
  },

  primary: {
    background: 'var(--color-brand-background, rgb(98, 100, 167))',
    borderColor: 'transparent',
    contentColor: 'white',
    iconColor: 'inherit',

    hovered: {
      background: 'var(--color-brand-hovered-background, rgb(88, 90, 150))',
      borderColor: 'var(--color-brand-hovered-borderColor)',
      contentColor: 'var(--color-brand-hovered-contentColor)',
      iconColor: 'var(--color-brand-icon)',
    },

    pressed: {
      background: 'rgb(70, 71, 117)',
      borderColor: 'var(--color-brand-borderColor)',
      contentColor: 'var(--color-brand-contentColor)',
      iconColor: 'var(--color-brand-iconColor)',
    },
  },
};

import { ButtonVariants } from './Button.types';

export const buttonVariants: ButtonVariants = {
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

    // fontWeight: 600, // fonts?.medium?.fontWeight,
    // fontSize: fonts?.medium?.fontSize,
    // fontFamily: fonts?.medium?.fontFamily,
    // iconSize: fonts?.mediumPlus?.fontSize,
    // borderRadius: effects?.roundedCorner2,
    // focusColor: palette?.black,
    // focusInnerColor: palette?.white,

    // background: semanticColors?.buttonBackground,
    // borderColor: semanticColors?.buttonBorder,
    // contentColor: semanticColors?.buttonText,
    // dividerColor: palette?.neutralTertiaryAlt,

    // hovered: {
    //   background: semanticColors?.buttonBackgroundHovered,
    //   borderColor: semanticColors?.buttonBorder,
    //   contentColor: semanticColors?.buttonTextHovered,
    // },

    // pressed: {
    //   background: semanticColors?.buttonBackgroundPressed,
    //   borderColor: semanticColors?.buttonBorder,
    //   contentColor: semanticColors?.buttonTextPressed,
    // },

    // checked: {
    //   background: semanticColors?.buttonBackgroundPressed,
    //   contentColor: semanticColors?.buttonTextChecked,
    // },

    // checkedHovered: {
    //   background: semanticColors?.buttonBackgroundPressed,
    //   contentColor: semanticColors?.buttonTextCheckedHovered,
    // },

    // disabled: {
    //   background: semanticColors?.buttonBackgroundDisabled,
    //   borderColor: semanticColors?.buttonBorderDisabled,
    //   contentColor: semanticColors?.buttonTextDisabled,
    // },

    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '0',
    paddingBottom: '0',

    margin: '0',

    minWidth: '96px',
    width: 'auto',
    maxWidth: '280px',

    minHeight: 'var(--button-size-regular)',

    contentGap: '8px',
    iconSize: '16px',

    borderRadius: '2px',
    borderWidth: '1px',
    boxShadow: 'none',

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
      transform: 'none',
      transition: 'none',

      background: 'var(--color-button-background)',
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
    minWidth: 'var(--button-height)',
    width: 'var(--button-height, var(--button-minHeight))',
    paddingLeft: '0',
    paddingRight: '0',
  },

  circular: {
    borderRadius: '50000px',
  },

  fluid: {
    width: '100%',
    maxWidth: '100%',
  },

  primary: {
    background: 'var(--color-brand-background)',
    borderColor: 'var(--color-brand-borderColor)',
    contentColor: 'var(--color-brand-contentColor)',
    iconColor: 'inherit',

    hovered: {
      background: 'var(--color-brand-hovered-background)',
      borderColor: 'var(--color-brand-hovered-borderColor)',
      contentColor: 'var(--color-brand-hovered-contentColor)',
    },

    pressed: {
      background: 'var(--color-brand-pressed-background)',
      borderColor: 'var(--color-brand-pressed-borderColor)',
      contentColor: 'var(--color-brand-pressed-contentColor)',
    },
  },
};

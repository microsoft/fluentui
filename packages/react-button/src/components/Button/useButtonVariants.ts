import { ButtonVariants } from './Button.types';
import { makeVariants, Theme } from '@fluentui/react-theme-provider';

export const useButtonVariants = makeVariants<ButtonVariants>('Button', '--button', (theme: Theme) => {
  const { fonts, effects, palette, semanticColors } = theme;

  return {
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

      // Sizing tokens
      iconSize: fonts?.mediumPlus?.fontSize,
      borderWidth: '1px',
      boxShadow: 'none',
      borderRadius: effects?.roundedCorner2,
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingTop: '0',
      paddingBottom: '0',
      margin: '0',
      width: 'auto',
      minWidth: '96px',
      maxWidth: '280px',
      minHeight: 'var(--button-size-regular)',
      contentGap: '8px',

      // Font tokens
      fontWeight: '600',
      fontSize: fonts?.medium?.fontSize,
      fontFamily: fonts?.medium?.fontFamily,
      secondaryContentFontSize: fonts?.small.fontSize,

      // Color tokens
      focusColor: palette?.black,
      focusInnerColor: palette?.white,
      background: semanticColors?.buttonBackground,
      borderColor: semanticColors?.buttonBorder,
      contentColor: semanticColors?.buttonText,
      iconColor: 'inherit',
      dividerColor: palette?.neutralTertiaryAlt,
      secondaryContentColor: palette?.neutralSecondary,

      hovered: {
        background: semanticColors?.buttonBackgroundHovered,
        borderColor: semanticColors?.buttonBorder,
        contentColor: semanticColors?.buttonTextHovered,
        secondaryContentColor: palette?.neutralDark,
      },

      pressed: {
        background: semanticColors?.buttonBackgroundPressed,
        borderColor: semanticColors?.buttonBorder,
        contentColor: semanticColors?.buttonTextPressed,
        secondaryContentColor: semanticColors?.buttonTextPressed,
      },

      checked: {
        background: semanticColors?.buttonBackgroundPressed,
        contentColor: semanticColors?.buttonTextChecked,
      },

      checkedHovered: {
        background: semanticColors?.buttonBackgroundPressed,
        contentColor: semanticColors?.buttonTextCheckedHovered,
      },

      disabled: {
        background: semanticColors?.buttonBackgroundDisabled,
        borderColor: semanticColors?.buttonBorderDisabled,
        contentColor: semanticColors?.buttonTextDisabled,
        secondaryContentColor: semanticColors?.buttonTextDisabled,
      },
    },

    iconOnly: {
      minWidth: 'var(--button-height)',
      width: 'var(--button-height, var(--button-minHeight))',
      paddingTop: '0',
      paddingBottom: '0',
      paddingLeft: '0',
      paddingRight: '0',
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

    // TODO: no references to palette.
    ghost: {
      background: 'transparent',
      borderColor: 'transparent',
      contentColor: palette?.neutralPrimary,
      menuIconColor: palette?.neutralSecondary,
      secondaryContentColor: palette?.neutralPrimary,

      checked: {
        background: palette?.neutralLight,
        contentColor: palette?.black,
        iconColor: palette?.themeDarker,
      },

      checkedHovered: {
        background: palette?.neutralQuaternaryAlt,
        contentColor: palette?.themePrimary,
        iconColor: palette?.themePrimary,
      },

      disabled: {
        contentColor: palette?.neutralTertiary,
        iconColor: 'inherit',
        secondaryContentColor: palette?.neutralTertiary,
        background: semanticColors?.disabledBackground,
      },

      expanded: {
        contentColor: palette?.themePrimary,
      },

      focused: {
        borderColor: 'transparent',
        contentColor: palette?.neutralPrimary,
        iconColor: palette?.themeDarkAlt,
        secondaryContentColor: palette?.neutralPrimary,
      },

      hovered: {
        borderColor: 'transparent',
        background: palette?.neutralLighter,
        contentColor: palette?.neutralPrimary,
        menuIconColor: palette?.neutralSecondary,
        secondaryContentColor: palette?.neutralPrimary,
      },

      pressed: {
        borderColor: 'transparent',
        background: palette?.neutralLight,
        contentColor: palette?.black,
        iconColor: palette?.themeDarker,
        secondaryContentColor: palette?.black,
      },
    },
  };
});

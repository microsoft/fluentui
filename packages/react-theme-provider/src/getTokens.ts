import { Tokens, Theme } from '@fluentui/theme';
import { merge } from '@uifabric/utilities';

/**
 * Get tokens from theme object.
 */
export function getTokens(theme: Theme): Tokens {
  const { tokens } = theme;
  const { fonts, effects, palette, semanticColors } = theme;

  const preparedTokens: Tokens = merge(
    {
      color: {
        body: {
          background: semanticColors.bodyBackground,
          contentColor: semanticColors.bodyText,
        },

        // accent is currently only mapped for primary button to use.
        brand: {
          background: semanticColors.primaryButtonBackground,
          borderColor: semanticColors.primaryButtonBorder,
          contentColor: semanticColors.primaryButtonText,
          iconColor: palette.white,
          dividerColor: palette.white,
          secondaryContentColor: palette.white,

          hovered: {
            background: semanticColors.primaryButtonBackgroundHovered,
            contentColor: semanticColors.primaryButtonTextHovered,
            secondaryContentColor: palette.white,
            borderColor: 'var(--color-brand-borderColor)',
          },

          pressed: {
            background: semanticColors.primaryButtonBackgroundPressed,
            contentColor: semanticColors.primaryButtonTextPressed,
            secondaryContentColor: semanticColors.primaryButtonTextPressed,
            borderColor: 'var(--color-brand-borderColor)',
            iconColor: 'var(--color-brand-iconColor)',
          },

          focused: {
            background: 'var(--color-brand-background)',
            borderColor: 'var(--color-brand-borderColor)',
            contentColor: 'var(--color-brand-contentColor)',
            iconColor: 'var(--color-brand-iconColor)',
            secondaryContentColor: 'var(--color-brand-focused-contentColor)',
          },

          disabled: {
            background: semanticColors.primaryButtonBackgroundDisabled,
            contentColor: semanticColors.buttonTextDisabled,
            dividerColor: palette.neutralTertiaryAlt,
            secondaryContentColor: 'var(--color-brand-disabled-contentColor)',
            borderColor: 'var(--color-brand-disabled-background)',
            iconColor: 'var(--color-brand-disabled-contentColor)',
          },

          checked: {
            background: semanticColors.primaryButtonBackgroundPressed,
            contentColor: semanticColors.primaryButtonTextPressed,
          },

          checkedHovered: {
            background: semanticColors.primaryButtonBackgroundPressed,
            contentColor: semanticColors.primaryButtonTextPressed,
          },
        },
      },

      body: {
        fontFamily: fonts.medium.fontFamily,
        fontWeight: fonts.medium.fontWeight,
        fontSize: fonts.medium.fontSize,
        mozOsxFontSmoothing: fonts.medium.MozOsxFontSmoothing,
        webkitFontSmoothing: fonts.medium.WebkitFontSmoothing,
      },

      // TODO: This will be moved out as a button variant.
      ghost: {
        contentColor: palette.neutralPrimary,
        iconColor: palette.themeDarkAlt,
        menuIconColor: palette.neutralSecondary,
        secondaryContentColor: palette.neutralPrimary,
        fontWeight: 'normal',
        background: 'transparent',
        borderColor: 'transparent',

        checked: {
          background: palette.neutralLight,
          contentColor: palette.black,
          iconColor: palette.themeDarker,
          borderColor: 'var(--ghost-borderColor)',
        },

        checkedHovered: {
          background: palette.neutralQuaternaryAlt,
          contentColor: palette.themePrimary,
          iconColor: palette.themePrimary,
          borderColor: 'var(--ghost-borderColor)',
        },

        disabled: {
          contentColor: palette.neutralTertiary,
          iconColor: 'inherit',
          background: semanticColors.disabledBackground,
          borderColor: 'var(--ghost-borderColor)',
          secondaryContentColor: palette.neutralTertiary,
        },

        expanded: {
          contentColor: palette.themePrimary,
        },

        focused: {
          contentColor: palette.neutralPrimary,
          iconColor: palette.themeDarkAlt,
          secondaryContentColor: palette.neutralPrimary,
          background: 'var(--ghost-background)',
          borderColor: 'var(--ghost-borderColor)',
        },

        hovered: {
          background: palette.neutralLighter,
          contentColor: palette.themePrimary,
          iconColor: palette.themePrimary,
          secondaryContentColor: palette.themePrimary,
          borderColor: 'var(--ghost-borderColor)',
        },

        pressed: {
          background: palette.neutralLight,
          contentColor: palette.black,
          iconColor: palette.themeDarker,
          secondaryContentColor: palette.black,
          borderColor: 'var(--ghost-borderColor)',
        },
      },

      // TODO: This will be moved out as a button variant.
      button: {
        fontWeight: '600',
        fontSize: fonts.medium.fontSize,
        fontFamily: fonts.medium.fontFamily,
        iconSize: fonts.mediumPlus.fontSize,
        borderRadius: effects.roundedCorner2,
        focusColor: palette.black,
        focusInnerColor: palette.white,

        background: semanticColors.buttonBackground,
        borderColor: semanticColors.buttonBorder,
        contentColor: semanticColors.buttonText,
        dividerColor: palette.neutralTertiaryAlt,

        secondaryContentColor: palette.neutralSecondary,
        secondaryContentFontSize: fonts.small.fontSize,

        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '0',
        paddingBottom: '0',
        height: 'var(--button-size-regular)',
        minHeight: 'var(--button-size-regular)',
        contentGap: '8px',
        borderWidth: '1px',
        focusWidth: '2px',
        innerFocusWidth: '2px',
        iconColor: 'inherit',
        menuIconColor: 'inherit',
        menuIconSize: '12px',
        dividerThickness: 'var(--button-borderWidth)',
        secondaryContentFontWeight: 'normal',
        secondaryContentMarginTop: '5px',

        size: {
          // smallest size supported by default theme is 24px.
          smallest: '24px',
          smaller: '24px',
          small: '24px',
          regular: '32px',
          large: '40px',
          larger: '48px',
          largest: '64px',
        },

        hovered: {
          background: semanticColors.buttonBackgroundHovered,
          borderColor: semanticColors.buttonBorder,
          contentColor: semanticColors.buttonTextHovered,
          secondaryContentColor: palette.neutralDark,
          iconColor: 'var(--button-iconColor)',
          menuIconColor: 'var(--button-menuIconColor)',
        },

        pressed: {
          background: semanticColors.buttonBackgroundPressed,
          borderColor: semanticColors.buttonBorder,
          contentColor: semanticColors.buttonTextPressed,
          secondaryContentColor: semanticColors.buttonTextPressed,
          iconColor: 'var(--button-iconColor)',
          menuIconColor: 'var(--button-menuIconColor)',
        },

        focused: {
          background: 'var(--button-background)',
          borderColor: 'var(--button-borderColor)',
          contentColor: 'var(--button-contentColor)',
          iconColor: 'var(--button-iconColor)',
          menuIconColor: 'var(--button-menuIconColor)',
          secondaryContentColor: 'var(--button-focused-contentColor)',
        },

        checked: {
          background: semanticColors.buttonBackgroundPressed,
          contentColor: semanticColors.buttonTextChecked,
        },

        checkedHovered: {
          background: semanticColors.buttonBackgroundPressed,
          contentColor: semanticColors.buttonTextCheckedHovered,
        },

        disabled: {
          background: semanticColors.buttonBackgroundDisabled,
          borderColor: semanticColors.buttonBorderDisabled,
          contentColor: semanticColors.buttonTextDisabled,
          secondaryContentColor: semanticColors.buttonTextDisabled,
          iconColor: 'var(--button-disabled-contentColor)',
        },
      },
    },
    tokens,
  );

  return preparedTokens;
}

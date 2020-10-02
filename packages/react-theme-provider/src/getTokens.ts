import { Tokens, Theme, RecursivePartial } from '@fluentui/theme';
import { merge } from '@uifabric/utilities';

/**
 * Get tokens from theme object.
 */
export function getTokens(theme: Theme, userTokens?: RecursivePartial<Tokens>): Tokens {
  const tokens = getTokensFromLegacyTheme(theme);
  const preparedTokens: Tokens = userTokens ? (merge(tokens, userTokens) as Tokens) : tokens;

  return preparedTokens;
}

function getTokensFromLegacyTheme(theme: Theme): Tokens {
  const { fonts, effects, palette, semanticColors } = theme;
  return {
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

    // TODO: This will be moved out as a card variant.
    card: {
      size: {
        smallest: {
          borderRadius: '4px',
          height: 'auto',
          margin: 0,
          padding: '8px',
          width: 'auto',
        },
        smaller: {
          borderRadius: '4px',
          height: 'auto',
          margin: 0,
          padding: '8px',
          width: 'auto',
        },
        small: {
          borderRadius: '4px',
          height: 'auto',
          margin: 0,
          padding: '8px',
          width: 'auto',
        },
        medium: {
          borderRadius: '4px',
          height: 'auto',
          margin: 0,
          padding: '16px',
          width: 'auto',
        },
        large: {
          borderRadius: '6px',
          height: 'auto',
          margin: 0,
          padding: '16px',
          width: 'auto',
        },
        larger: {
          borderRadius: '6px',
          height: 'auto',
          margin: 0,
          padding: '16px',
          width: 'auto',
        },
        largest: {
          borderRadius: '6px',
          height: 'auto',
          margin: 0,
          padding: '16px',
          width: 'auto',
        },
      },

      backgroundColor: '#ffffff',
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
        backgroundColor: 'var(--card-backgroundColor)',
        borderColor: 'var(--card-borderColor)',
        borderWidth: 'var(--card-borderWidth)',
        boxShadow: 'var(--card-boxShadow)',
      },

      pressed: {
        backgroundColor: 'var(--card-backgroundColor)',
        borderColor: 'var(--card-borderColor)',
        borderWidth: 'var(--card-borderWidth)',
        boxShadow: 'var(--card-boxShadow)',
      },

      selected: {
        backgroundColor: '#fafafa',
        borderColor: 'var(--card-borderColor)',
        borderWidth: 'var(--card-borderWidth)',
        boxShadow: 'var(--card-boxShadow)',
      },

      disabled: {
        backgroundColor: '#f0f0f0',
        borderColor: 'var(--card-borderColor)',
        borderWidth: 'var(--card-borderWidth)',
        boxShadow: '0 0.8px 1.8px 0 rgba(0, 0, 0, 0.1)',
      },

      clickable: {
        backgroundColor: '#ffffff',
        borderColor: 'transparent',
        borderWidth: '1px',
        boxShadow: '0 1.6px 3.6px 0 rgba(0, 0, 0, 0.1)',

        hovered: {
          backgroundColor: '#fafafa',
          borderColor: 'var(--card-clickable-borderColor)',
          borderWidth: 'var(--card-clickable-borderWidth)',
          boxShadow: '0 3.2px 7.2px 0 rgba(0, 0, 0, 0.1)',
        },

        pressed: {
          backgroundColor: '#f5f5f5',
          borderColor: 'var(--card-clickable-borderColor)',
          borderWidth: '2px',
          boxShadow: 'var(--card-clickable-boxShadow)',
        },
      },

      compact: {
        padding: 0,
      },

      fluid: {
        height: '100%',
        width: '100%',
      },
    },
  };
}

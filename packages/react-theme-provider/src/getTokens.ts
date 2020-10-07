import { Tokens, Theme } from '@fluentui/theme';
import { merge } from '@uifabric/utilities';

/**
 * Get tokens from theme object.
 */
export function getTokens(theme: Theme): Tokens {
  const { tokens, fonts } = theme;
  const { palette, semanticColors } = theme;

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
    },

    tokens,
  );

  return preparedTokens;
}

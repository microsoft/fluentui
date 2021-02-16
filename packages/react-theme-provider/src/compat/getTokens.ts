import { Tokens, Theme, RecursivePartial } from './types';
import { merge } from '@fluentui/utilities';

/**
 * Get tokens from theme object.
 */
export function getTokens(theme: Theme, userTokens?: RecursivePartial<Tokens>): RecursivePartial<Tokens> {
  const { fonts } = theme;
  const { palette, semanticColors } = theme;

  const preparedTokens = merge<RecursivePartial<Tokens>>(
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
            borderColor: semanticColors.primaryButtonBorder,
          },

          pressed: {
            background: semanticColors.primaryButtonBackgroundPressed,
            contentColor: semanticColors.primaryButtonTextPressed,
            secondaryContentColor: semanticColors.primaryButtonTextPressed,
            borderColor: semanticColors.primaryButtonBorder,
            iconColor: palette.white,
          },

          focused: {
            background: semanticColors.primaryButtonBackground,
            borderColor: semanticColors.primaryButtonBorder,
            contentColor: semanticColors.primaryButtonText,
            iconColor: palette.white,
            secondaryContentColor: semanticColors.primaryButtonText,
          },

          disabled: {
            background: semanticColors.primaryButtonBackgroundDisabled,
            contentColor: semanticColors.buttonTextDisabled,
            dividerColor: palette.neutralTertiaryAlt,
            secondaryContentColor: semanticColors.buttonTextDisabled,
            borderColor: semanticColors.primaryButtonBackgroundDisabled,
            iconColor: semanticColors.buttonTextDisabled,
          },

          checked: {
            background: semanticColors.primaryButtonBackgroundPressed,
            contentColor: semanticColors.primaryButtonTextPressed,
            iconColor: semanticColors.primaryButtonTextPressed,
          },

          checkedHovered: {
            background: semanticColors.primaryButtonBackgroundPressed,
            contentColor: semanticColors.primaryButtonTextPressed,
            iconColor: semanticColors.primaryButtonTextPressed,
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

      // TODO: This will be moved out as a text variant.
      text: {
        variant: {
          caption: {
            fontSize: '12px',
            fontWeight: '400',
            lineHeight: '14px',
          },
          body: {
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '20px',
          },

          subHeadline: {
            fontSize: '16px',
            fontWeight: '600',
            lineHeight: '22px',
          },
          headline: {
            fontSize: '20px',
            fontWeight: '600',
            lineHeight: '28px',
          },

          title3: {
            fontSize: '24px',
            fontWeight: '600',
            lineHeight: '32px',
          },
          title2: {
            fontSize: '28px',
            fontWeight: '600',
            lineHeight: '36px',
          },
          title1: {
            fontSize: '32px',
            fontWeight: '600',
            lineHeight: '40px',
          },

          largeTitle: {
            fontSize: '40px',
            fontWeight: '600',
            lineHeight: '52px',
          },
          display: {
            fontSize: '68px',
            fontWeight: '600',
            lineHeight: '92px',
          },
        },
      },
    },

    userTokens,
  );

  return preparedTokens;
}

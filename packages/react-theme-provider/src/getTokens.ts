import { Tokens, Theme, RecursivePartial } from '@fluentui/theme';
import { merge } from '@uifabric/utilities';

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
            hovered: {
              background: semanticColors.primaryButtonBackgroundPressed,
              contentColor: semanticColors.primaryButtonTextPressed,
            },
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

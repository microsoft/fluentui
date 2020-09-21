import { Tokens, Theme } from '@fluentui/theme';
import { defaultTokens } from './createDefaultTheme';
import { merge } from '@uifabric/utilities';

/**
 * Get tokens from theme object.
 */
export function getTokens(theme: Theme): Tokens {
  // TODO: ensure only used tokens are converted before shipping Fluent v8.
  const {
    components,
    schemes,
    rtl,
    isInverted,
    disableGlobalClassNames,
    tokens,
    stylesheets,
    ...passThroughTokens
  } = theme;
  const { fonts, palette, semanticColors } = theme;

  const preparedTokens: Tokens = merge(
    {},
    defaultTokens,
    {
      color: {
        body: {
          background: semanticColors?.bodyBackground,
          contentColor: semanticColors?.bodyText,
          fontFamily: fonts?.medium.fontFamily,
          fontWeight: fonts?.medium.fontWeight,
          fontSize: fonts?.medium.fontSize,
          mozOsxFontSmoothing: fonts?.medium.MozOsxFontSmoothing,
          webkitFontSmoothing: fonts?.medium.WebkitFontSmoothing,
        },

        // accent is currently only mapped for primary button to use.
        brand: {
          background: semanticColors?.primaryButtonBackground,
          borderColor: semanticColors?.primaryButtonBorder,
          contentColor: semanticColors?.primaryButtonText,
          iconColor: palette?.white,
          dividerColor: palette?.white,
          secondaryContentColor: palette?.white,

          hovered: {
            background: semanticColors?.primaryButtonBackgroundHovered,
            contentColor: semanticColors?.primaryButtonTextHovered,
            secondaryContentColor: palette?.white,
          },

          pressed: {
            background: semanticColors?.primaryButtonBackgroundPressed,
            contentColor: semanticColors?.primaryButtonTextPressed,
            secondaryContentColor: semanticColors?.primaryButtonTextPressed,
          },

          disabled: {
            background: semanticColors?.primaryButtonBackgroundDisabled,
            contentColor: semanticColors?.buttonTextDisabled,
            dividerColor: palette?.neutralTertiaryAlt,
            secondaryContentColor: semanticColors?.buttonTextDisabled,
          },

          checked: {
            background: semanticColors?.primaryButtonBackgroundPressed,
            contentColor: semanticColors?.primaryButtonTextPressed,
          },

          checkedHovered: {
            background: semanticColors?.primaryButtonBackgroundPressed,
            contentColor: semanticColors?.primaryButtonTextPressed,
          },
        },
      },
    },

    tokens,
  );

  return { ...((passThroughTokens as unknown) as Tokens), ...preparedTokens };
}

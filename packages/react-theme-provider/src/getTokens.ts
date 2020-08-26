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
  const { fonts, effects, palette, semanticColors } = theme;

  const preparedTokens: Tokens = merge(
    {},
    defaultTokens,
    {
      // accent is currently only mapped for primary button to use.
      accent: {
        background: semanticColors?.primaryButtonBackground,
        borderColor: semanticColors?.primaryButtonBorder,
        contentColor: semanticColors?.primaryButtonText,
        iconColor: palette?.white,
        dividerColor: palette?.white,

        hovered: {
          background: semanticColors?.primaryButtonBackgroundHovered,
          contentColor: semanticColors?.primaryButtonTextHovered,
        },

        pressed: {
          background: semanticColors?.primaryButtonBackgroundPressed,
          contentColor: semanticColors?.primaryButtonTextPressed,
        },

        disabled: {
          background: semanticColors?.primaryButtonBackgroundDisabled,
          contentColor: semanticColors?.buttonTextDisabled,
          dividerColor: palette?.neutralTertiaryAlt,
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

      body: {
        background: semanticColors?.bodyBackground,
      },

      button: {
        fontWeight: 600, // fonts?.medium?.fontWeight,
        fontSize: fonts?.medium?.fontSize,
        fontFamily: fonts?.medium?.fontFamily,
        iconSize: fonts?.mediumPlus?.fontSize,
        borderRadius: effects?.roundedCorner2,
        focusColor: palette?.neutralSecondary,
        focusInnerColor: palette?.white,

        background: semanticColors?.buttonBackground,
        borderColor: semanticColors?.buttonBorder,
        contentColor: semanticColors?.buttonText,
        dividerColor: palette?.neutralTertiaryAlt,

        hovered: {
          background: semanticColors?.buttonBackgroundHovered,
          borderColor: semanticColors?.buttonBorder,
          contentColor: semanticColors?.buttonTextHovered,
        },

        pressed: {
          background: semanticColors?.buttonBackgroundPressed,
          contentColor: semanticColors?.buttonTextPressed,
          borderColor: semanticColors?.buttonBorder,
        },

        disabled: {
          background: semanticColors?.buttonBackgroundDisabled,
          borderColor: semanticColors?.buttonBorderDisabled,
          contentColor: semanticColors?.buttonTextDisabled,
        },

        checked: {
          background: semanticColors?.buttonBackgroundPressed,
          contentColor: semanticColors?.buttonTextChecked,
        },

        checkedHovered: {
          background: semanticColors?.buttonBackgroundPressed,
          contentColor: semanticColors?.buttonTextCheckedHovered,
        },
      },
    },
    tokens,
  );

  return { ...((passThroughTokens as unknown) as Tokens), ...preparedTokens };
}

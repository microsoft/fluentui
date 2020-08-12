import { Tokens, Theme } from './types';
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
    defaultFontStyle,
    tokens,
    stylesheets,
    ...passThroughTokens
  } = theme;
  const { fonts, effects, palette, semanticColors } = theme;

  const tokensFromCompatTheme: Tokens | undefined = palette &&
    semanticColors &&
    fonts &&
    effects && {
      accent: {
        background: palette.themePrimary,
        contentColor: palette.white,
        iconColor: palette.white,

        hovered: {
          background: palette.themeDarkAlt,
          contentColor: palette.white,
          iconColor: palette.white,
        },
      },

      body: {
        background: semanticColors.bodyBackground,
      },

      button: {
        fontWeight: fonts.medium?.fontWeight,
        fontSize: fonts.medium?.fontSize,
        fontFamily: fonts.medium?.fontFamily,
        iconSize: fonts.mediumPlus?.fontSize,
        borderRadius: effects.roundedCorner2,
        focusColor: palette.neutralSecondary,
        focusInnerColor: palette.white,

        background: semanticColors.buttonBackground,
        borderColor: semanticColors.buttonBorder,
        contentColor: semanticColors.buttonText,

        hovered: {
          background: semanticColors.buttonBackgroundHovered,
          borderColor: semanticColors.buttonBorder,
          contentColor: semanticColors.buttonTextHovered,
        },

        pressed: {
          background: semanticColors.buttonBackgroundPressed,
          contentColor: semanticColors.buttonTextPressed,
          borderColor: semanticColors.buttonBorder,
        },

        disabled: {
          background: semanticColors.buttonBackgroundDisabled,
          borderColor: semanticColors.buttonBorderDisabled,
          contentColor: semanticColors.buttonTextDisabled,
        },
      },
    };

  return merge({}, defaultTokens, tokensFromCompatTheme, tokens, passThroughTokens as Tokens);
}

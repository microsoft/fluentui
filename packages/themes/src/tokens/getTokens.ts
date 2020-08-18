import { merge } from '@uifabric/utilities';
import { Tokens, Theme } from '../types';
import { defaultTokens } from './defaultTokens';
import { getButtonTokensFromCompatTheme } from './button/tokens';

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
  const { palette, semanticColors } = theme;

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

      button: getButtonTokensFromCompatTheme(theme),
    },
    tokens,
  );

  return { ...(passThroughTokens as Tokens), ...preparedTokens };
}

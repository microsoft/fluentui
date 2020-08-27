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
    defaultFontStyle,
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

      // ghost is currently only mapped for ghost button to use.
      ghost: {
        background: semanticColors?.bodyBackground,
        borderColor: 'transparent',
        contentColor: palette?.neutralPrimary,
        iconColor: palette?.themeDarkAlt,
        menuIconColor: palette?.neutralSecondary,

        checked: {
          background: semanticColors?.bodyBackground,
          borderColor: 'transparent',
          contentColor: palette?.black,
          iconColor: palette?.themeDarker,
        },

        checkedHovered: {
          background: semanticColors?.bodyBackground,
          borderColor: 'transparent',
          contentColor: palette?.themePrimary,
          iconColor: palette?.themePrimary,
        },

        disabled: {
          background: semanticColors?.bodyBackground,
          borderColor: 'transparent',
          contentColor: palette?.neutralTertiary,
          iconColor: 'inherit',
        },

        expanded: {
          contentColor: palette?.themePrimary,
        },

        focused: {
          background: semanticColors?.bodyBackground,
          borderColor: 'transparent',
          contentColor: palette?.neutralPrimary,
          iconColor: palette?.themeDarkAlt,
        },

        hovered: {
          background: semanticColors?.bodyBackground,
          borderColor: 'transparent',
          contentColor: palette?.themePrimary,
          iconColor: palette?.themePrimary,
        },

        pressed: {
          background: semanticColors?.bodyBackground,
          borderColor: 'transparent',
          contentColor: palette?.black,
          iconColor: palette?.themeDarker,
        },
      },

      body: {
        background: semanticColors?.bodyBackground,
      },

      button: {
        fontWeight: fonts?.medium?.fontWeight,
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

  return { ...(passThroughTokens as Tokens), ...preparedTokens };
}

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
        secondaryTextColor: palette?.white,

        hovered: {
          background: semanticColors?.primaryButtonBackgroundHovered,
          contentColor: semanticColors?.primaryButtonTextHovered,
          secondaryTextColor: palette?.white,
        },

        pressed: {
          background: semanticColors?.primaryButtonBackgroundPressed,
          contentColor: semanticColors?.primaryButtonTextPressed,
          secondaryTextColor: semanticColors?.primaryButtonTextPressed,
        },

        disabled: {
          background: semanticColors?.primaryButtonBackgroundDisabled,
          contentColor: semanticColors?.buttonTextDisabled,
          dividerColor: palette?.neutralTertiaryAlt,
          secondaryTextColor: semanticColors?.buttonTextDisabled,
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
        secondaryTextColor: palette?.neutralPrimary,

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
          secondaryTextColor: palette?.neutralTertiary,
        },

        expanded: {
          contentColor: palette?.themePrimary,
        },

        focused: {
          background: semanticColors?.bodyBackground,
          borderColor: 'transparent',
          contentColor: palette?.neutralPrimary,
          iconColor: palette?.themeDarkAlt,
          secondaryTextColor: palette?.neutralPrimary,
        },

        hovered: {
          background: semanticColors?.bodyBackground,
          borderColor: 'transparent',
          contentColor: palette?.themePrimary,
          iconColor: palette?.themePrimary,
          secondaryTextColor: palette?.themePrimary,
        },

        pressed: {
          background: semanticColors?.bodyBackground,
          borderColor: 'transparent',
          contentColor: palette?.black,
          iconColor: palette?.themeDarker,
          secondaryTextColor: palette?.black,
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

        secondaryTextColor: palette?.neutralSecondary,
        secondaryTextFontSize: fonts?.small.fontSize,

        hovered: {
          background: semanticColors?.buttonBackgroundHovered,
          borderColor: semanticColors?.buttonBorder,
          contentColor: semanticColors?.buttonTextHovered,
          secondaryTextColor: palette?.neutralDark,
        },

        pressed: {
          background: semanticColors?.buttonBackgroundPressed,
          contentColor: semanticColors?.buttonTextPressed,
          borderColor: semanticColors?.buttonBorder,
          secondaryTextColor: semanticColors?.buttonTextPressed,
        },

        disabled: {
          background: semanticColors?.buttonBackgroundDisabled,
          borderColor: semanticColors?.buttonBorderDisabled,
          contentColor: semanticColors?.buttonTextDisabled,
          secondaryTextColor: semanticColors?.buttonTextDisabled,
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

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
      color: {
        body: {
          background: semanticColors?.bodyBackground,
          contentColor: semanticColors?.bodyText,
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

      // TODO: This will be moved out as a button variant.
      ghost: {
        background: semanticColors?.bodyBackground,
        borderColor: 'transparent',
        contentColor: palette?.neutralPrimary,
        iconColor: palette?.themeDarkAlt,
        menuIconColor: palette?.neutralSecondary,
        secondaryContentColor: palette?.neutralPrimary,

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
          secondaryContentColor: palette?.neutralTertiary,
        },

        expanded: {
          contentColor: palette?.themePrimary,
        },

        focused: {
          background: semanticColors?.bodyBackground,
          borderColor: 'transparent',
          contentColor: palette?.neutralPrimary,
          iconColor: palette?.themeDarkAlt,
          secondaryContentColor: palette?.neutralPrimary,
        },

        hovered: {
          background: semanticColors?.bodyBackground,
          borderColor: 'transparent',
          contentColor: palette?.themePrimary,
          iconColor: palette?.themePrimary,
          secondaryContentColor: palette?.themePrimary,
        },

        pressed: {
          background: semanticColors?.bodyBackground,
          borderColor: 'transparent',
          contentColor: palette?.black,
          iconColor: palette?.themeDarker,
          secondaryContentColor: palette?.black,
        },
      },

      // TODO: This will be moved out as a button variant.
      button: {
        fontWeight: '600',
        fontSize: fonts?.medium?.fontSize,
        fontFamily: fonts?.medium?.fontFamily,
        iconSize: fonts?.mediumPlus?.fontSize,
        borderRadius: effects?.roundedCorner2,
        focusColor: palette?.black,
        focusInnerColor: palette?.white,

        background: semanticColors?.buttonBackground,
        borderColor: semanticColors?.buttonBorder,
        contentColor: semanticColors?.buttonText,
        dividerColor: palette?.neutralTertiaryAlt,

        secondaryContentColor: palette?.neutralSecondary,
        secondaryContentFontSize: fonts?.small.fontSize,

        hovered: {
          background: semanticColors?.buttonBackgroundHovered,
          borderColor: semanticColors?.buttonBorder,
          contentColor: semanticColors?.buttonTextHovered,
          secondaryContentColor: palette?.neutralDark,
        },

        pressed: {
          background: semanticColors?.buttonBackgroundPressed,
          borderColor: semanticColors?.buttonBorder,
          contentColor: semanticColors?.buttonTextPressed,
          secondaryContentColor: semanticColors?.buttonTextPressed,
        },

        checked: {
          background: semanticColors?.buttonBackgroundPressed,
          contentColor: semanticColors?.buttonTextChecked,
        },

        checkedHovered: {
          background: semanticColors?.buttonBackgroundPressed,
          contentColor: semanticColors?.buttonTextCheckedHovered,
        },

        disabled: {
          background: semanticColors?.buttonBackgroundDisabled,
          borderColor: semanticColors?.buttonBorderDisabled,
          contentColor: semanticColors?.buttonTextDisabled,
          secondaryContentColor: semanticColors?.buttonTextDisabled,
        },
      },
      //   button: {
      //     fontWeight: 600, // fonts?.medium?.fontWeight,
      //     fontSize: fonts?.medium?.fontSize,
      //     fontFamily: fonts?.medium?.fontFamily,
      //     iconSize: fonts?.mediumPlus?.fontSize,
      //     borderRadius: effects?.roundedCorner2,
      //     focusColor: palette?.black,
      //     focusInnerColor: palette?.white,

      //     background: semanticColors?.buttonBackground,
      //     borderColor: semanticColors?.buttonBorder,
      //     contentColor: semanticColors?.buttonText,
      //     dividerColor: palette?.neutralTertiaryAlt,

      //     hovered: {
      //       background: semanticColors?.buttonBackgroundHovered,
      //       borderColor: semanticColors?.buttonBorder,
      //       contentColor: semanticColors?.buttonTextHovered,
      //     },

      //     pressed: {
      //       background: semanticColors?.buttonBackgroundPressed,
      //       borderColor: semanticColors?.buttonBorder,
      //       contentColor: semanticColors?.buttonTextPressed,
      //     },

      //     checked: {
      //       background: semanticColors?.buttonBackgroundPressed,
      //       contentColor: semanticColors?.buttonTextChecked,
      //     },

      //     checkedHovered: {
      //       background: semanticColors?.buttonBackgroundPressed,
      //       contentColor: semanticColors?.buttonTextCheckedHovered,
      //     },

      //     disabled: {
      //       background: semanticColors?.buttonBackgroundDisabled,
      //       borderColor: semanticColors?.buttonBorderDisabled,
      //       contentColor: semanticColors?.buttonTextDisabled,
      //     },
      //   },
    },
    tokens,
  );

  return { ...((passThroughTokens as unknown) as Tokens), ...preparedTokens };
}

/* eslint-disable @typescript-eslint/naming-convention */
import { makeVariantClasses, Theme } from '@fluentui/react-theme-provider';
import { EdgeChromiumHighContrastSelector } from '@uifabric/styling';
import { ButtonState } from './Button.types';

const GlobalClassNames = {
  root: 'ms-Button',
  icon: 'ms-Button-icon',
};

export const ButtonSizeVariants = {
  size_smallest: {
    height: 'var(--button-size-smallest)',
    minHeight: 'var(--button-size-smallest)',
  },

  size_smaller: {
    height: 'var(--button-size-smaller)',
    minHeight: 'var(--button-size-smaller)',
  },

  size_small: {
    height: 'var(--button-size-small)',
    minHeight: 'var(--button-size-small)',
  },

  size_large: {
    height: 'var(--button-size-large)',
    minHeight: 'var(--button-size-large)',
  },

  size_larger: {
    height: 'var(--button-size-larger)',
    minHeight: 'var(--button-size-larger)',
  },

  size_largest: {
    height: 'var(--button-size-largest)',
    minHeight: 'var(--button-size-largest)',
  },
};

export const useButtonClasses = makeVariantClasses<ButtonState>({
  name: 'Button',
  prefix: '--button',

  styles: {
    root: [
      GlobalClassNames.root,
      {
        cursor: 'pointer',
        alignItems: 'center',
        borderStyle: 'solid',
        display: 'inline-flex',
        justifyContent: 'center',
        outline: 'none',
        position: 'relative',
        userSelect: 'none',
        boxSizing: 'border-box',
        verticalAlign: 'middle',
        textDecoration: 'none',
        background: 'var(--button-background)',
        color: 'var(--button-contentColor)',

        borderColor: 'var(--button-borderColor)',
        borderTopLeftRadius: 'var(--button-borderTopLeftRadius, var(--button-borderRadius))',
        borderTopRightRadius: 'var(--button-borderTopRightRadius, var(--button-borderRadius))',
        borderBottomLeftRadius: 'var(--button-borderBottomLeftRadius, var(--button-borderRadius))',
        borderBottomRightRadius: 'var(--button-borderBottomRightRadius, var(--button-borderRadius))',
        borderLeftWidth: 'var(--button-borderLeftWidth, var(--button-borderWidth))',
        borderRightWidth: 'var(--button-borderRightWidth, var(--button-borderWidth))',
        borderTopWidth: 'var(--button-borderTopWidth, var(--button-borderWidth))',
        borderBottomWidth: 'var(--button-borderBottomWidth, var(--button-borderWidth))',
        boxShadow: 'var(--button-boxShadow)',

        width: 'var(--button-width)',
        maxWidth: 'var(--button-maxWidth)',
        minWidth: 'var(--button-minWidth)',
        height: 'var(--button-height)',
        minHeight: 'var(--button-minHeight)',

        paddingLeft: 'var(--button-paddingLeft)',
        paddingRight: 'var(--button-paddingRight)',
        paddingTop: 'var(--button-paddingTop)',
        paddingBottom: 'var(--button-paddingBottom)',

        transition: 'var(--button-transition)',
        whiteSpace: 'var(--button-whiteSpace)',

        fontFamily: 'var(--button-fontFamily)',
        fontSize: 'var(--button-fontSize)',
        fontWeight: 'var(--button-fontWeight)',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',

        ':global(.ms-Fabric--isFocusVisible) &:focus::after': {
          content: '""',
          position: 'absolute',
          left: -1,
          right: -1,
          top: -1,
          bottom: -1,
          borderWidth: 'var(--button-focusWidth, 2px)',
          borderStyle: 'solid',
          borderColor: 'var(--button-focusColor, black)',
          borderTopLeftRadius: 'var(--button-borderTopLeftRadius, var(--button-borderRadius))',
          borderTopRightRadius: 'var(--button-borderTopRightRadius, var(--button-borderRadius))',
          borderBottomLeftRadius: 'var(--button-borderBottomLeftRadius, var(--button-borderRadius))',
          borderBottomRightRadius: 'var(--button-borderBottomRightRadius, var(--button-borderRadius))',
          boxShadow: '0 0 0 var(--button-focusInnerWidth, 1px) var(--button-focusInnerColor, white) inset',
          zIndex: 1,

          [EdgeChromiumHighContrastSelector]: {
            borderColor: 'var(--button-highContrast-focusColor)',
            boxShadow: '0 0 0 var(--button-focusInnerWidth, 1px) var(--button-highContrast-focusInnerColor) inset',
          },
        },

        ['& > *:not(:first-child)']: {
          marginLeft: 'var(--button-contentGap)',
        },

        [EdgeChromiumHighContrastSelector]: {
          forcedColorAdjust: 'var(--button-forcedColorAdjust)',

          background: 'var(--button-highContrast-background)',
          borderColor: 'var(--button-highContrast-borderColor)',
          color: 'var(--button-highContrast-contentColor)',

          [`.${GlobalClassNames.icon}`]: {
            color: 'var(--button-highContrast-iconColor)',
          },
        },

        '&:hover': {
          background: 'var(--button-hovered-background, var(--button-background))',
          color: 'var(--button-hovered-contentColor, var(--button-contentColor))',
          borderColor: 'var(--button-hovered-borderColor, var(--button-borderColor))',
          boxShadow: 'var(--button-hovered-boxShadow, var(--button-boxShadow))',

          [`.${GlobalClassNames.icon}`]: {
            color: 'var(--button-hovered-iconColor, var(--button-iconColor))',
          },

          [EdgeChromiumHighContrastSelector]: {
            background: 'var(--button-highContrast-hovered-background, var(--button-highContrast-background))',
            borderColor: 'var(--button-highContrast-hovered-borderColor, var(--button-highContrast-borderColor))',
            color: 'var(--button-highContrast-hovered-contentColor, var(--button-highContrast-contentColor))',
            [`.${GlobalClassNames.icon}`]: {
              color: 'var(--button-highContrast-hovered-iconColor, --button-highContrast-iconColor)',
            },
          },
        },

        '&:active': {
          background: 'var(--button-pressed-background, var(--button-hovered-background))',
          color: 'var(--button-pressed-contentColor, var(--button-hovered-contentColor, var(--button-contentColor)))',
          borderColor:
            'var(--button-pressed-borderColor, var(--button-hovered-borderColor, var(--button-borderColor)))',
          boxShadow: 'var(--button-pressed-boxShadow, var(--button-hovered-boxShadow, var(--button-boxShadow)))',

          transform: 'var(--button-pressed-transform)',
          transition: 'var(--button-pressed-transition)',

          [`.${GlobalClassNames.icon}`]: {
            color: 'var(--button-pressed-iconColor, var(--button-iconColor))',
          },

          [EdgeChromiumHighContrastSelector]: {
            background:
              'var(--button-highContrast-pressed-background, ' +
              'var(--button-highContrast-hovered-background, ' +
              'var(--button-highContrast-background)))',
            borderColor:
              'var(--button-highContrast-pressed-borderColor, ' +
              'var(--button-highContrast-hovered-borderColor, ' +
              'var(--button-highContrast-borderColor)))',
            color:
              'var(--button-highContrast-pressed-contentColor, ' +
              'var(--button-highContrast-hovered-contentColor, ' +
              'var(--button-highContarst-contentColor)))',
            [`.${GlobalClassNames.icon}`]: {
              color:
                'var(--button-highContrast-pressed-iconColor, ' +
                'var(--button-highContrast-hovered-iconColor, ' +
                'var(--button-highContrast-iconColor)))',
            },
          },
        },

        '&[aria-disabled=true]': {
          pointerEvents: 'none',
          opacity: 'var(--button-disabled-opacity)',
          backgroundColor: 'var(--button-disabled-background)',
          color: 'var(--button-disabled-contentColor)',
          borderColor: 'var(--button-disabled-borderColor)',
          boxShadow: 'var(--button-disabled-boxShadow)',

          [`.${GlobalClassNames.icon}`]: {
            color: 'var(--button-disabled-iconColor)',
          },

          [EdgeChromiumHighContrastSelector]: {
            background: 'var(--button-highContrast-disabled-background, var(--button-highContrast-background))',
            borderColor: 'var(--button-highContrast-disabled-borderColor, var(--button-highContrast-borderColor))',
            color: 'var(--button-highContrast-disabled-contentColor, var(--button-highContrast-contentColor))',
            [`.${GlobalClassNames.icon}`]: {
              color: 'var(--button-highContrast-disabled-iconColor, --button-highContrast-iconColor)',
            },
          },
        },
      },
    ],

    icon: [
      GlobalClassNames.icon,
      {
        color: 'var(--button-iconColor)',
        display: 'flex',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: 'var(--button-iconSize)',
        height: 'var(--button-iconSize)',
        fontSize: 'var(--button-iconSize, inherit)',
        fontWeight: 'normal',
        lineHeight: '1',
      },
    ],

    content: {
      lineHeight: '1',
    },
  },

  variants: (theme: Theme) => {
    const { fonts, effects, palette, semanticColors } = theme;

    return {
      root: {
        size: {
          smallest: '24px',
          smaller: '24px',
          small: '24px',
          regular: '32px',
          large: '40px',
          larger: '48px',
          largest: '64px',
        },

        // Sizing tokens
        iconSize: fonts?.mediumPlus?.fontSize,
        borderWidth: '1px',
        boxShadow: 'none',
        borderRadius: effects?.roundedCorner2,
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingTop: '0',
        paddingBottom: '0',
        margin: '0',
        width: 'auto',
        minWidth: '96px',
        maxWidth: '280px',
        minHeight: 'var(--button-size-regular)',
        contentGap: '8px',

        // Font tokens
        fontWeight: '600',
        fontSize: fonts?.medium?.fontSize,
        fontFamily: fonts?.medium?.fontFamily,
        secondaryContentFontSize: fonts?.small.fontSize,

        // Color tokens
        focusColor: palette?.black,
        focusInnerColor: palette?.white,
        background: semanticColors?.buttonBackground,
        borderColor: semanticColors?.buttonBorder,
        contentColor: semanticColors?.buttonText,
        iconColor: 'inherit',
        secondaryContentColor: palette?.neutralSecondary,

        hovered: {
          background: semanticColors?.buttonBackgroundHovered,
          contentColor: semanticColors?.buttonTextHovered,
          secondaryContentColor: palette?.neutralDark,
        },

        pressed: {
          background: semanticColors?.buttonBackgroundPressed,
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

        highContrast: {
          borderColor: 'WindowText',
          contentColor: 'WindowText',
          iconColor: 'WindowText',

          hovered: {
            borderColor: 'Highlight',
            contentColor: 'Highlight',
            iconColor: 'Highlight',
          },

          pressed: {
            borderColor: 'Highlight',
            contentColor: 'WindowText',
            iconColor: 'WindowText',
          },

          disabled: {
            background: 'Window',
            borderColor: 'GrayText',
            contentColor: 'GrayText',
            iconColor: 'GrayText',
          },
        },
      },

      circular: {
        borderRadius: '50000px',
      },

      fluid: {
        width: '100%',
        maxWidth: 'none',
      },

      iconOnly: {
        minWidth: 'var(--button-height)',
        width: 'var(--button-height, var(--button-minHeight))',
        paddingTop: '0',
        paddingBottom: '0',
        paddingLeft: '0',
        paddingRight: '0',
      },

      primary: {
        background: 'var(--color-brand-background)',
        borderColor: 'var(--color-brand-borderColor)',
        contentColor: 'var(--color-brand-contentColor)',
        iconColor: 'inherit',
        forcedColorAdjust: 'none',

        hovered: {
          background: 'var(--color-brand-hovered-background)',
          borderColor: 'var(--color-brand-hovered-borderColor)',
          contentColor: 'var(--color-brand-hovered-contentColor)',
        },

        pressed: {
          background: 'var(--color-brand-pressed-background)',
          borderColor: 'var(--color-brand-pressed-borderColor)',
          contentColor: 'var(--color-brand-pressed-contentColor)',
        },

        highContrast: {
          background: 'WindowText',
          borderColor: 'WindowText',
          contentColor: 'Window',
          focusColor: 'WindowText',
          focusInnerColor: 'Window',
          iconColor: 'Window',

          hovered: {
            background: 'Highlight',
            borderColor: 'Highlight',
            contentColor: 'Window',
            iconColor: 'Window',
          },

          pressed: {
            background: 'WindowText',
            borderColor: 'WindowText',
            contentColor: 'Window',
            iconColor: 'Window',
          },

          disabled: {
            background: 'Window',
            borderColor: 'GrayText',
            contentColor: 'GrayText',
            iconColor: 'GrayText',
          },
        },
      },

      // TODO: no references to palette.
      ghost: {
        background: 'transparent',
        borderColor: 'transparent',
        contentColor: palette?.neutralPrimary,
        fontWeight: 'normal',
        iconColor: palette?.themeDarkAlt,
        menuIconColor: palette?.neutralSecondary,
        secondaryContentColor: palette?.neutralPrimary,
        forcedColorAdjust: 'none',

        checked: {
          background: palette?.neutralLight,
          contentColor: palette?.black,
          iconColor: palette?.themeDarker,
        },

        checkedHovered: {
          background: palette?.neutralQuaternaryAlt,
          contentColor: palette?.themePrimary,
          iconColor: palette?.themePrimary,
        },

        disabled: {
          background: semanticColors?.disabledBackground,
          contentColor: palette?.neutralTertiary,
          iconColor: 'inherit',
          secondaryContentColor: palette?.neutralTertiary,
        },

        expanded: {
          contentColor: palette?.themePrimary,
        },

        focused: {
          contentColor: palette?.neutralPrimary,
          iconColor: palette?.themeDarkAlt,
          secondaryContentColor: palette?.neutralPrimary,
        },

        hovered: {
          background: palette?.neutralLighter,
          contentColor: palette?.themePrimary,
          iconColor: palette?.themePrimary,
          secondaryContentColor: palette?.neutralPrimary,
        },

        pressed: {
          background: palette?.neutralLight,
          contentColor: palette?.black,
          iconColor: palette?.themeDarker,
          secondaryContentColor: palette?.black,
        },

        highContrast: {
          background: 'Window',
          borderColor: 'transparent',
          contentColor: 'WindowText',
          iconColor: 'WindowText',

          hovered: {
            background: 'Window',
            borderColor: 'transparent',
            contentColor: 'Highlight',
            iconColor: 'Highlight',
          },

          pressed: {
            background: 'Window',
            borderColor: 'transparent',
            contentColor: 'Highlight',
            iconColor: 'Highlight',
          },

          disabled: {
            background: 'Window',
            borderColor: 'transparent',
            contentColor: 'GrayText',
            iconColor: 'GrayText',
          },
        },
      },
      ...ButtonSizeVariants,
    };
  },
});

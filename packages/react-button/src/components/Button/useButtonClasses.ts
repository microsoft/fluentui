import { makeStyles } from '@fluentui/react-theme-provider';

export const ButtonClassNames = {
  root: 'ms-Button',
  content: 'ms-Button-content',
  icon: 'ms-Button-icon',
};

export const useButtonStyles = makeStyles([
  /* --- CSS definition --- */
  [
    null,
    {
      cursor: 'pointer',
      alignItems: 'center',
      display: 'inline-flex',
      justifyContent: 'center',
      outline: 'none',
      position: 'relative',
      userSelect: 'none',
      boxSizing: 'border-box',
      verticalAlign: 'middle',
      textDecoration: 'none',

      // colors
      background: 'var(--button-background)',
      color: 'var(--button-content-color)',

      // border
      borderColor: 'var(--button-border-color)',
      borderTopLeftRadius: 'var(--button-border-top-left-radius, var(--button-border-radius))',
      borderTopRightRadius: 'var(--button-border-top-right-radius, var(--button-border-radius))',
      borderBottomLeftRadius: 'var(--button-border-bottom-left-radius, var(--button-border-radius))',
      borderBottomRightRadius: 'var(--button-border-bottom-right-radius, var(--button-border-radius))',
      borderLeftWidth: 'var(--button-border-left-width, var(--button-border-width))',
      borderRightWidth: 'var(--button-border-right-width, var(--button-border-width))',
      borderTopWidth: 'var(--button-border-top-width, var(--button-border-width))',
      borderBottomWidth: 'var(--button-border-bottom-width, var(--button-border-width))',
      boxShadow: 'var(--button-box-shadow)',
      borderStyle: 'solid',

      // dimensions
      width: 'var(--button-width)',
      maxWidth: 'var(--button-max-width)',
      minWidth: 'var(--button-min-width)',
      height: 'var(--button-height)',
      minHeight: 'var(--button-min-height)',

      // padding
      paddingLeft: 'var(--button-padding-left)',
      paddingRight: 'var(--button-padding-right)',
      paddingTop: 'var(--button-padding-top)',
      paddingBottom: 'var(--button-padding-bottom)',

      // fonts
      fontFamily: 'var(--button-font-family)',
      fontSize: 'var(--button-font-size)',
      fontWeight: 'var(--button-font-weight)',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',

      // other
      opacity: 'var(--button-opacity)',
      transition: 'var(--button-transition)',
      whiteSpace: 'var(--button-white-space)',

      // content spacing
      ['& > *:not(:first-child)']: {
        marginLeft: 'var(--button-content-gap)',
      },

      // icon
      [`> .${ButtonClassNames.icon}`]: {
        color: 'var(--button-icon-color)',
      },

      // hovered state
      '&:hover': {
        background: 'var(--button-hovered-background, var(--button-background))',
        color: 'var(--button-hovered-content-color, var(--button-content-color))',
        borderColor: 'var(--button-hovered-border-color, var(--button-border-color))',
        boxShadow: 'var(--button-hovered-box-shadow, var(--button-box-shadow))',

        [`> .${ButtonClassNames.icon}`]: {
          color: 'var(--button-hovered-icon-color, var(--button-icon-color))',
        },
      },

      // pressed state
      '&:active': {
        background: 'var(--button-pressed-background, var(--button-hovered-background))',
        color: 'var(--button-pressed-content-color, var(--button-hovered-content-color, var(--button-content-color)))',
        borderColor:
          'var(--button-pressed-border-color, var(--button-hovered-border-color, var(--button-border-color)))',
        boxShadow: 'var(--button-pressed-box-shadow, var(--button-hovered-box-shadow, var(--button-box-shadow)))',

        transform: 'var(--button-pressed-transform)',
        transition: 'var(--button-pressed-transition)',

        [`> .${ButtonClassNames.icon}`]: {
          color: 'var(--button-pressed-icon-color, var(--button-icon-color))',
        },
      },
    },
  ],
  /* --- Default state --- */
  [
    null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      // sizes
      '--button-size-smallest': tokens.buttonSizeSmallest || '24px',
      '--button-size-smaller': tokens.buttonSizeSmaller || '24px',
      '--button-size-small': tokens.buttonSizeSmall || '24px',
      '--button-size-regular': tokens.buttonSizeRegular || '32px',
      '--button-size-large': tokens.buttonSizeLarge || '40px',
      '--button-size-larger': tokens.buttonSizeLarger || '48px',
      '--button-size-largest': tokens.buttonSizeLargest || '64px',

      // colors
      '--button-background': tokens.buttonBackground || tokens.semanticColors?.buttonBackground,
      '--button-content-color': tokens.buttonContentColor || tokens.semanticColors?.buttonText,

      // border
      '--button-border-color': tokens.buttonBorderColor || tokens.semanticColors?.buttonBorder,
      '--button-border-radius': tokens.buttonBorderRadius || tokens.effects?.roundedCorner2,
      '--button-border-top-left-radius': tokens.buttonBorderTopLeftRadius,
      '--button-border-top-right-radius': tokens.buttonBorderTopRightRadius,
      '--button-border-bottom-left-radius': tokens.buttonBorderBottomLeftRadius,
      '--button-border-bottom-right-radius': tokens.buttonBorderBottomRightRadius,
      '--button-border-width': tokens.buttonBorderWidth || '1px',
      '--button-border-left-width': tokens.buttonBorderLeftWidth,
      '--button-border-right-width': tokens.buttonBorderRightWidth,
      '--button-border-top-width': tokens.buttonBorderTopWidth,
      '--button-border-bottom-width': tokens.buttonBorderBottomWidth,
      '--button-box-shadow': tokens.buttonBoxShadow || 'none',

      // dimensions
      '--button-width': tokens.buttonWidth || 'auto',
      '--button-max-width': tokens.buttonMaxWidth || '280px',
      '--button-min-width': tokens.buttonMinWidth || '96px',
      '--button-height': tokens.buttonHeight,
      '--button-min-height': tokens.buttonMinHeight || 'var(--button-size-regular)',

      // padding
      '--button-padding-left': tokens.buttonPaddingLeft || '20px',
      '--button-padding-right': tokens.buttonPaddingRight || '20px',
      '--button-padding-top': tokens.buttonPaddingTop || '0',
      '--button-padding-bottom': tokens.buttonPaddingBottom || '0',

      // fonts
      '--button-font-family': tokens.buttonFontFamily || tokens.fonts?.medium?.fontFamily,
      '--button-font-size': tokens.buttonFontSize || tokens.fonts?.medium?.fontSize,
      '--button-font-weight': tokens.buttonFontWeight || '600',

      // other
      '--button-opacity': tokens.buttonOpacity,
      '--button-transition': tokens.buttonTransition,
      '--button-white-space': tokens.buttonWhiteSpace,

      // content spacing
      '--button-content-gap': tokens.buttonContentGap || '8px',

      // hovered state
      '--button-hovered-background': tokens.buttonHoveredBackground || tokens.semanticColors?.buttonBackgroundHovered,
      '--button-hovered-border-color': tokens.buttonHoveredBorderColor,
      '--button-hovered-box-shadow': tokens.buttonHoveredBoxShadow,
      '--button-hovered-content-color': tokens.buttonHoveredContentColor || tokens.semanticColors?.buttonTextHovered,

      // pressed state
      '--button-pressed-background': tokens.buttonPressedBackground || tokens.semanticColors?.buttonBackgroundPressed,
      '--button-pressed-border-color': tokens.buttonPressedBorderColor,
      '--button-pressed-box-shadow': tokens.buttonPressedBoxShadow,
      '--button-pressed-content-color': tokens.buttonPressedContentColor || tokens.semanticColors?.buttonTextPressed,
      '--button-pressed-transform': tokens.buttonPressedTransform,
      '--button-pressed-transition': tokens.buttonPressedTransition,
    }),
  ],
  /* --- Circular state --- */
  [
    { circular: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-border-radius': tokens.buttonCircularBorderRadius || '50000px',
    }),
  ],
  /* --- Block state --- */
  [
    { block: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-max-width': tokens.buttonBlockMaxWidth || 'none',
      '--button-width': tokens.buttonBlockWidth || '100%',
    }),
  ],
  /* --- Icon-only state --- */
  [
    { iconOnly: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-min-width': tokens.buttonIconOnlyMinWidth || 'var(--button-height)',
      '--button-padding-bottom': tokens.buttonIconOnlyPaddingBottom || '0',
      '--button-padding-left': tokens.buttonIconOnlyPaddingLeft || '0',
      '--button-padding-right': tokens.buttonIconOnlyPaddingRight || '0',
      '--button-padding-top': tokens.buttonIconOnlyPaddingTop || '0',
      '--button-width': tokens.buttonIconOnlyWidth || 'var(--button-height, var(--button-min-height))',
    }),
  ],
  /* --- Primary state --- */
  [
    { primary: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-background': tokens.buttonPrimaryBackground || tokens.color?.brand?.background,
      '--button-border-color': tokens.buttonPrimaryBorderColor || tokens.color?.brand?.borderColor,
      '--button-content-color': tokens.buttonPrimaryContentColor || tokens.color?.brand?.contentColor,
      // forcedColorAdjust: 'none',

      // hovered state
      '--button-hovered-background': tokens.buttonPrimaryHoveredBackground || tokens.color?.brand?.hovered?.background,
      '--button-hovered-border-color':
        tokens.buttonPrimaryHoveredBorderColor || tokens.color?.brand?.hovered?.borderColor,
      '--button-hovered-content-color':
        tokens.buttonPrimaryHoveredContentColor || tokens.color?.brand?.hovered?.contentColor,

      // pressed state
      '--button-pressed-background': tokens.buttonPrimaryPressedBackground || tokens.color?.brand?.pressed?.background,
      '--button-pressed-border-color':
        tokens.buttonPrimaryPressedBorderColor || tokens.color?.brand?.pressed?.borderColor,
      '--button-pressed-content-color':
        tokens.buttonPrimaryPressedContentColor || tokens.color?.brand?.pressed?.contentColor,
    }),
  ],
  /* --- Ghost state --- */
  [
    { ghost: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-background': tokens.buttonGhostBackground || 'transparent',
      '--button-border-color': tokens.buttonGhostBorderColor || 'transparent',
      '--button-content-color': tokens.buttonGhostContentColor || tokens.palette?.neutralPrimary,
      '--button-font-weight': tokens.buttonGhostFontWeight || 'normal',

      // hovered state
      '--button-hovered-background': tokens.buttonGhostHoveredBackground || tokens.palette?.neutralLighter,
      '--button-hovered-content-color': tokens.buttonGhostHoveredContentColor || tokens.palette?.themePrimary,

      // pressed state
      '--button-pressed-background': tokens.buttonGhostPressedBackground || tokens.palette?.neutralLight,
      '--button-pressed-content-color': tokens.buttonGhostPressedContentColor || tokens.palette?.black,
    }),
  ],
  /* --- Transparent state --- */
  [
    { transparent: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-background': tokens.buttonTransparentBackground || 'transparent',
      '--button-border-color': tokens.buttonTransparentBorderColor || 'transparent',
      '--button-content-color': tokens.buttonTransparentContentColor || tokens.palette?.neutralPrimary,
      '--button-font-weight': tokens.buttonTransparentFontWeight || 'normal',

      // hovered state
      '--button-hovered-background': tokens.buttonTransparentHoveredBackground || 'transparent',
      '--button-hovered-content-color': tokens.buttonTransparentHoveredContentColor || tokens.palette?.themePrimary,

      // pressed state
      '--button-pressed-background': tokens.buttonTransparentPressedBackground || 'transparent',
      '--button-pressed-content-color': tokens.buttonTransparentPressedContentColor || tokens.palette?.black,
    }),
  ],
  /* --- Disabled state --- */
  [
    { disabled: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      pointerEvents: 'none',
      '--button-background': tokens.buttonDisabledBackground || tokens.semanticColors?.buttonBackgroundDisabled,
      '--button-border-color': tokens.buttonDisabledBorderColor || tokens.semanticColors?.buttonBorderDisabled,
      '--button-content-color': tokens.buttonDisabledContentColor || tokens.semanticColors?.buttonTextDisabled,
    }),
  ],
  /* --- Ghost and disabled states --- */
  [
    { disabled: true, ghost: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-background': tokens.buttonGhostDisabledBackground || tokens.semanticColors?.disabledBackground,
      '--button-content-color': tokens.buttonGhostDisabledContentColor || tokens.palette?.neutralTertiary,
    }),
  ],
  /* --- Transparent and disabled states --- */
  [
    { disabled: true, transparent: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-background': tokens.buttonTransparentDisabledBackground || 'transparent',
      '--button-border-color': tokens.buttonTransparentDisabledBorderColor || 'transparent',
      '--button-content-color': tokens.buttonTransparentDisabledContentColor || tokens.palette?.neutralTertiary,
    }),
  ],
  /* --- Size - Smallest --- */
  [
    { size: 'smallest' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-height': tokens.buttonSizeSmallestHeight || 'var(--button-size-smallest)',
      '--button-min-height': tokens.buttonSizeSmallestMinHeight || 'var(--button-size-smallest)',
    }),
  ],
  /* --- Size - Smaller --- */
  [
    { size: 'smaller' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-height': tokens.buttonSizeSmallerHeight || 'var(--button-size-smaller)',
      '--button-min-height': tokens.buttonSizeSmallerMinHeight || 'var(--button-size-smaller)',
    }),
  ],
  /* --- Size - Small --- */
  [
    { size: 'small' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-height': tokens.buttonSizeSmallHeight || 'var(--button-size-small)',
      '--button-min-height': tokens.buttonSizeSmallMinHeight || 'var(--button-size-small)',
    }),
  ],
  /* --- Size - Large --- */
  [
    { size: 'large' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-height': tokens.buttonSizeLargeHeight || 'var(--button-size-large)',
      '--button-min-height': tokens.buttonSizeLargeMinHeight || 'var(--button-size-large)',
    }),
  ],
  /* --- Size - Larger --- */
  [
    { size: 'larger' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-height': tokens.buttonSizeLargerHeight || 'var(--button-size-larger)',
      '--button-min-height': tokens.buttonSizeLargerMinHeight || 'var(--button-size-larger)',
    }),
  ],
  /* --- Size - Largest --- */
  [
    { size: 'largest' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-height': tokens.buttonSizeLargestHeight || 'var(--button-size-largest)',
      '--button-min-height': tokens.buttonSizeLargestMinHeight || 'var(--button-size-largest)',
    }),
  ],
]);

export const useButtonIconStyles = makeStyles([
  /* --- CSS definition --- */
  [
    null,
    {
      alignItems: 'center',
      display: 'flex',
      flexShrink: 0,
      fontWeight: 'normal',
      justifyContent: 'center',
      lineHeight: '1',

      fontSize: 'var(--button-icon-size, inherit)',
      height: 'var(--button-icon-size)',
      width: 'var(--button-icon-size)',
    },
  ],
  /* --- Default state --- */
  [
    null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-icon-color': tokens.buttonIconColor || 'inherit',
      '--button-hovered-icon-color': tokens.buttonHoveredIconColor,
      '--button-pressed-icon-color': tokens.buttonPressedIconColor,

      '--button-icon-size': tokens.buttonIconSize || (tokens.fonts?.mediumPlus?.fontSize as string),
    }),
  ],
  /* --- Primary state --- */
  [
    { primary: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-icon-color': tokens.buttonPrimaryIconColor || 'inherit',
    }),
  ],
  /* --- Ghost state --- */
  [
    { ghost: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-icon-color': tokens.buttonGhostIconColor || tokens.palette?.themeDarkAlt,
      '--button-hovered-icon-color': tokens.buttonGhostHoveredIconColor || tokens.palette?.themePrimary,
      '--button-pressed-icon-color': tokens.buttonGhostPressedIconColor || tokens.palette?.themeDarker,
    }),
  ],
  /* --- Transparent state --- */
  [
    { transparent: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-icon-color': tokens.buttonTransparentIconColor || tokens.palette?.themeDarkAlt,
      '--button-hovered-icon-color': tokens.buttonTransparentHoveredIconColor || tokens.palette?.themePrimary,
      '--button-pressed-icon-color': tokens.buttonTransparentPressedIconColor || tokens.palette?.themeDarker,
    }),
  ],
  /* --- Disabled state --- */
  [
    { disabled: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-icon-color': tokens.buttonDisabledIconColor || 'inherit',
    }),
  ],
]);

export const useButtonContentStyles = makeStyles([
  /* --- CSS definition --- */
  [null, { lineHeight: '1' }],
]);

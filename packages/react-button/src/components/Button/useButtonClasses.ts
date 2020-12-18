import * as React from 'react';
import { makeStyles } from '@fluentui/react-theme-provider';
import { ButtonState } from './Button.types';
// import { EdgeChromiumHighContrastSelector } from '@fluentui/style-utilities';

/* eslint-disable @fluentui/max-len */

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
      fontWeight: 'var(--button-font-weight)' as React.CSSProperties['fontWeight'],
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',

      // other
      opacity: 'var(--button-opacity)',
      transition: 'var(--button-transition)',
      whiteSpace: 'var(--button-white-space)' as React.CSSProperties['whiteSpace'],

      // content spacing
      ['& > *:not(:first-child)']: {
        marginLeft: 'var(--button-content-gap)',
      },

      // icon
      [`> .${ButtonClassNames.icon}`]: {
        color: 'var(--button-icon-color)',
      },

      // high contrast
      // [EdgeChromiumHighContrastSelector]: {
      //   forcedColorAdjust: 'var(--button-forcedColorAdjust)',

      //   background: 'var(--button-highContrast-background)',
      //   borderColor: 'var(--button-highContrast-borderColor)',
      //   color: 'var(--button-highContrast-contentColor)',

      //   [`.${GlobalClassNames.icon}`]: {
      //     color: 'var(--button-highContrast-iconColor)',
      //   },
      // },

      // hovered state
      '&:hover': {
        background: 'var(--button-hovered-background, var(--button-background))',
        color: 'var(--button-hovered-content-color, var(--button-content-color))',
        borderColor: 'var(--button-hovered-border-color, var(--button-border-color))',
        boxShadow: 'var(--button-hovered-box-shadow, var(--button-box-shadow))',

        [`> .${ButtonClassNames.icon}`]: {
          color: 'var(--button-hovered-icon-color, var(--button-icon-color))',
        },

        // [EdgeChromiumHighContrastSelector]: {
        //   background: 'var(--button-highContrast-hovered-background, var(--button-highContrast-background))',
        //   borderColor: 'var(--button-highContrast-hovered-borderColor, var(--button-highContrast-borderColor))',
        //   color: 'var(--button-highContrast-hovered-contentColor, var(--button-highContrast-contentColor))',
        //   [`.${GlobalClassNames.icon}`]: {
        //     color: 'var(--button-highContrast-hovered-iconColor, --button-highContrast-iconColor)',
        //   },
        // },
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

        // [EdgeChromiumHighContrastSelector]: {
        //   background:
        //     'var(--button-highContrast-pressed-background, ' +
        //     'var(--button-highContrast-hovered-background, ' +
        //     'var(--button-highContrast-background)))',
        //   borderColor:
        //     'var(--button-highContrast-pressed-borderColor, ' +
        //     'var(--button-highContrast-hovered-borderColor, ' +
        //     'var(--button-highContrast-borderColor)))',
        //   color:
        //     'var(--button-highContrast-pressed-contentColor, ' +
        //     'var(--button-highContrast-hovered-contentColor, ' +
        //     'var(--button-highContarst-contentColor)))',
        //   [`.${GlobalClassNames.icon}`]: {
        //     color:
        //       'var(--button-highContrast-pressed-iconColor, ' +
        //       'var(--button-highContrast-hovered-iconColor, ' +
        //       'var(--button-highContrast-iconColor)))',
        //   },
        // },
      },

      // focused state
      // ':global(.ms-Fabric--isFocusVisible)': {
      //   '> div': {
      //     content: '"whatevs"',
      //     position: 'absolute',
      //     left: -1,
      //     right: -1,
      //     top: -1,
      //     bottom: -1,
      //     borderWidth: 'var(--button-focus-width, 2px)',
      //     borderStyle: 'solid',
      //     borderColor: 'var(--button-focus-color, black)',
      //     borderTopLeftRadius: 'var(--button-border-top-left-radius, var(--button-border-radius))',
      //     borderTopRightRadius: 'var(--button-border-top-right-radius, var(--button-border-radius))',
      //     borderBottomLeftRadius: 'var(--button-border-bottom-left-radius, var(--button-border-radius))',
      //     borderBottomRightRadius: 'var(--button-border-bottom-right-radius, var(--button-border-radius))',
      //     boxShadow: '0 0 0 var(--button-focus-inner-width, 1px) var(--button-focusInnerColor, white) inset',
      //     zIndex: 1,
      //   },

      //   [EdgeChromiumHighContrastSelector]: {
      //     borderColor: 'var(--button-highContrast-focusColor)',
      //     boxShadow: '0 0 0 var(--button-focusInnerWidth, 1px) var(--button-highContrast-focusInnerColor) inset',
      //   },
      // },
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

      // focus
      '--button-focus-color': tokens.buttonFocusColor || tokens.palette?.black,
      '--button-focus-inner-color': tokens.buttonFocusInnerColor || tokens.palette?.white,

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

      // icon styling
      '--button-icon-color': tokens.buttonIconColor || 'inherit',
      '--button-hovered-icon-color': tokens.buttonHoveredIconColor,
      '--button-pressed-icon-color': tokens.buttonPressedIconColor,

      '--button-icon-size': tokens.buttonIconSize || (tokens.fonts?.mediumPlus?.fontSize as string),
    }),
  ],
  /* --- Circular state --- */
  [
    (selectors: ButtonState) => selectors.circular,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-border-radius': tokens.buttonCircularBorderRadius || '50000px',
    }),
  ],
  /* --- Block state --- */
  [
    (selectors: ButtonState) => selectors.block,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-max-width': tokens.buttonBlockMaxWidth || 'none',
      '--button-width': tokens.buttonBlockWidth || '100%',
    }),
  ],
  /* --- Icon-only state --- */
  [
    (selectors: ButtonState) => selectors.iconOnly,
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
    (selectors: ButtonState) => selectors.primary,
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

      // icon styling
      '--button-icon-color': tokens.buttonPrimaryIconColor || 'inherit',
    }),
  ],
  /* --- Ghost state --- */
  [
    (selectors: ButtonState) => selectors.ghost,
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

      // icon styling
      '--button-icon-color': tokens.buttonGhostIconColor || tokens.palette?.themeDarkAlt,
      '--button-hovered-icon-color': tokens.buttonGhostHoveredIconColor || tokens.palette?.themePrimary,
      '--button-pressed-icon-color': tokens.buttonGhostPressedIconColor || tokens.palette?.themeDarker,
    }),
  ],
  /* --- Transparent state --- */
  [
    (selectors: ButtonState) => selectors.transparent,
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

      // icon styling
      '--button-icon-color': tokens.buttonTransparentIconColor || tokens.palette?.themeDarkAlt,
      '--button-hovered-icon-color': tokens.buttonTransparentHoveredIconColor || tokens.palette?.themePrimary,
      '--button-pressed-icon-color': tokens.buttonTransparentPressedIconColor || tokens.palette?.themeDarker,
    }),
  ],
  /* --- Disabled state --- */
  [
    (selectors: ButtonState) => selectors.disabled,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      pointerEvents: 'none',
      '--button-background': tokens.buttonDisabledBackground || tokens.semanticColors?.buttonBackgroundDisabled,
      '--button-border-color': tokens.buttonDisabledBorderColor || tokens.semanticColors?.buttonBorderDisabled,
      '--button-content-color': tokens.buttonDisabledContentColor || tokens.semanticColors?.buttonTextDisabled,

      // icon styling
      '--button-icon-color': tokens.buttonDisabledIconColor || 'inherit',
    }),
  ],
  /* --- Ghost and disabled states --- */
  [
    (selectors: ButtonState) => selectors.disabled && selectors.ghost,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-background': tokens.buttonGhostDisabledBackground || tokens.semanticColors?.disabledBackground,
      '--button-content-color': tokens.buttonGhostDisabledContentColor || tokens.palette?.neutralTertiary,
    }),
  ],
  /* --- Transparent and disabled states --- */
  [
    (selectors: ButtonState) => selectors.disabled && selectors.transparent,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-background': tokens.buttonTransparentDisabledBackground || 'transparent',
      '--button-border-color': tokens.buttonTransparentDisabledBorderColor || 'transparent',
      '--button-content-color': tokens.buttonTransparentDisabledContentColor || tokens.palette?.neutralTertiary,
    }),
  ],
  /* --- Size - Smallest --- */
  [
    (selectors: ButtonState) => selectors.size === 'smallest',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-height': tokens.buttonSizeSmallestHeight || 'var(--button-size-smallest)',
      '--button-min-height': tokens.buttonSizeSmallestMinHeight || 'var(--button-size-smallest)',
    }),
  ],
  /* --- Size - Smaller --- */
  [
    (selectors: ButtonState) => selectors.size === 'smaller',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-height': tokens.buttonSizeSmallerHeight || 'var(--button-size-smaller)',
      '--button-min-height': tokens.buttonSizeSmallerMinHeight || 'var(--button-size-smaller)',
    }),
  ],
  /* --- Size - Small --- */
  [
    (selectors: ButtonState) => selectors.size === 'small',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-height': tokens.buttonSizeSmallHeight || 'var(--button-size-small)',
      '--button-min-height': tokens.buttonSizeSmallMinHeight || 'var(--button-size-small)',
    }),
  ],
  /* --- Size - Large --- */
  [
    (selectors: ButtonState) => selectors.size === 'large',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-height': tokens.buttonSizeLargeHeight || 'var(--button-size-large)',
      '--button-min-height': tokens.buttonSizeLargeMinHeight || 'var(--button-size-large)',
    }),
  ],
  /* --- Size - Larger --- */
  [
    (selectors: ButtonState) => selectors.size === 'larger',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-height': tokens.buttonSizeLargerHeight || 'var(--button-size-larger)',
      '--button-min-height': tokens.buttonSizeLargerMinHeight || 'var(--button-size-larger)',
    }),
  ],
  /* --- Size - Largest --- */
  [
    (selectors: ButtonState) => selectors.size === 'largest',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (tokens: any) => ({
      '--button-height': tokens.buttonSizeLargestHeight || 'var(--button-size-largest)',
      '--button-min-height': tokens.buttonSizeLargestMinHeight || 'var(--button-size-largest)',
    }),
  ],
]);

// const staticButtonStyles = [
//   [
//     0,
//     null,
//     {
//       cursor: ['a1k6fduh', '.a1k6fduh{cursor:pointer;}'],
//       alignItems: [
//         'a122n59',
//         '.a122n59{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}',
//       ],
//       display: [
//         'atuwxu6',
//         '.atuwxu6{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;}',
//       ],
//       justifyContent: [
//         'a4d9j23',
//         '.a4d9j23{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}',
//       ],
//       position: ['a10pi13n', '.a10pi13n{position:relative;}'],
//       userSelect: [
//         'a1xqy1su',
//         '.a1xqy1su{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;}',
//       ],
//       boxSizing: ['a1ewtqcl', '.a1ewtqcl{box-sizing:border-box;}'],
//       verticalAlign: ['amrv4ls', '.amrv4ls{vertical-align:middle;}'],
//       textDecoration: ['a1lzbuw2', '.a1lzbuw2{-webkit-text-decoration:none;text-decoration:none;}'],
//       background: ['aim6dvu', '.aim6dvu{background:var(--button-background);}'],
//       color: ['a1f4c47i', '.a1f4c47i{color:var(--button-content-color);}'],
//       borderTopLeftRadius: [
//         'a1iedgaj',
//         '.a1iedgaj{border-top-left-radius:var(--button-border-top-left-radius,var(--button-border-radius));}',
//         '.ra1iedgaj{border-top-right-radius:var(--button-border-top-left-radius,var(--button-border-radius));}',
//       ],
//       borderTopRightRadius: [
//         'aw1n0wr',
//         '.aw1n0wr{border-top-right-radius:var(--button-border-top-right-radius,var(--button-border-radius));}',
//         '.raw1n0wr{border-top-left-radius:var(--button-border-top-right-radius,var(--button-border-radius));}',
//       ],
//       borderBottomLeftRadius: [
//         'a70odt1',
//         '.a70odt1{border-bottom-left-radius:var(--button-border-bottom-left-radius,var(--button-border-radius));}',
//         '.ra70odt1{border-bottom-right-radius:var(--button-border-bottom-left-radius,var(--button-border-radius));}',
//       ],
//       borderBottomRightRadius: [
//         'a1vhwvfz',
//         '.a1vhwvfz{border-bottom-right-radius:var(--button-border-bottom-right-radius,var(--button-border-radius));}',
//         '.ra1vhwvfz{border-bottom-left-radius:var(--button-border-bottom-right-radius,var(--button-border-radius));}',
//       ],
//       borderLeftWidth: [
//         'a1cz3ezt',
//         '.a1cz3ezt{border-left-width:var(--button-border-left-width,var(--button-border-width));}',
//         '.ra1cz3ezt{border-right-width:var(--button-border-left-width,var(--button-border-width));}',
//       ],
//       borderRightWidth: [
//         'a1oddkp7',
//         '.a1oddkp7{border-right-width:var(--button-border-right-width,var(--button-border-width));}',
//         '.ra1oddkp7{border-left-width:var(--button-border-right-width,var(--button-border-width));}',
//       ],
//       borderTopWidth: [
//         'a13kh4da',
//         '.a13kh4da{border-top-width:var(--button-border-top-width,var(--button-border-width));}',
//       ],
//       borderBottomWidth: [
//         'act4cwl',
//         '.act4cwl{border-bottom-width:var(--button-border-bottom-width,var(--button-border-width));}',
//       ],
//       boxShadow: ['ahp4f9l', '.ahp4f9l{box-shadow:var(--button-box-shadow);}'],
//       width: ['aeo0lyr', '.aeo0lyr{width:var(--button-width);}'],
//       maxWidth: ['a1whg1k0', '.a1whg1k0{max-width:var(--button-max-width);}'],
//       minWidth: ['a7uf1io', '.a7uf1io{min-width:var(--button-min-width);}'],
//       height: ['azb318i', '.azb318i{height:var(--button-height);}'],
//       minHeight: ['a1hju0nx', '.a1hju0nx{min-height:var(--button-min-height);}'],
//       paddingLeft: [
//         'a1k1mxt7',
//         '.a1k1mxt7{padding-left:var(--button-padding-left);}',
//         '.ra1k1mxt7{padding-right:var(--button-padding-left);}',
//       ],
//       paddingRight: [
//         'a1egkakw',
//         '.a1egkakw{padding-right:var(--button-padding-right);}',
//         '.ra1egkakw{padding-left:var(--button-padding-right);}',
//       ],
//       paddingTop: ['aofteie', '.aofteie{padding-top:var(--button-padding-top);}'],
//       paddingBottom: ['a16j5cmg', '.a16j5cmg{padding-bottom:var(--button-padding-bottom);}'],
//       fontFamily: ['a1745qu5', '.a1745qu5{font-family:var(--button-font-family);}'],
//       fontSize: ['a1q4sedi', '.a1q4sedi{font-size:var(--button-font-size);}'],
//       fontWeight: ['a1uyijub', '.a1uyijub{font-weight:var(--button-font-weight);}'],
//       WebkitFontSmoothing: ['a1o7jddm', '.a1o7jddm{-webkit-font-smoothing:antialiased;}'],
//       MozOsxFontSmoothing: ['a1648qya', '.a1648qya{-moz-osx-font-smoothing:grayscale;}'],
//       opacity: ['a1qr8kil', '.a1qr8kil{opacity:var(--button-opacity);}'],
//       transition: [
//         'adhe3jx',
//         '.adhe3jx{-webkit-transition:var(--button-transition);transition:var(--button-transition);}',
//       ],
//       whiteSpace: ['a1ow1jxr', '.a1ow1jxr{white-space:var(--button-white-space);}'],
//       ' > *:not(:first-child)marginLeft': [
//         'a15t8rk3',
//         '.a15t8rk3>*:not(:first-child){margin-left:var(--button-content-gap);}',
//         '.ra15t8rk3>*:not(:first-child){margin-right:var(--button-content-gap);}',
//       ],
//       '> .ms-Button-iconcolor': ['a1qruv96', '.a1qruv96>.ms-Button-icon{color:var(--button-icon-color);}'],
//       ':hoverbackground': [
//         'a33d3hg',
//         '.a33d3hg:hover{background:var(--button-hovered-background,var(--button-background));}',
//       ],
//       ':hovercolor': [
//         'a19jhgz2',
//         '.a19jhgz2:hover{color:var(--button-hovered-content-color,var(--button-content-color));}',
//       ],
//       ':hoverboxShadow': [
//         'ajd3y3t',
//         '.ajd3y3t:hover{box-shadow:var(--button-hovered-box-shadow,var(--button-box-shadow));}',
//       ],
//       ':hover> .ms-Button-iconcolor': [
//         'a24elfs',
//         '.a24elfs:hover>.ms-Button-icon{color:var(--button-hovered-icon-color,var(--button-icon-color));}',
//       ],
//       ':hoverborderTopColor': [
//         'a1uo23zi',
//         '.a1uo23zi:hover{border-top-color:var(--button-hovered-border-color,var(--button-border-color));}',
//       ],
//       ':hoverborderRightColor': [
//         'a13lmprv',
//         '.a13lmprv:hover{border-right-color:var(--button-hovered-border-color,var(--button-border-color));}',
//         '.ra13lmprv:hover{border-left-color:var(--button-hovered-border-color,var(--button-border-color));}',
//       ],
//       ':hoverborderBottomColor': [
//         'a123g821',
//         '.a123g821:hover{border-bottom-color:var(--button-hovered-border-color,var(--button-border-color));}',
//       ],
//       ':hoverborderLeftColor': [
//         'a196fwmc',
//         '.a196fwmc:hover{border-left-color:var(--button-hovered-border-color,var(--button-border-color));}',
//         '.ra196fwmc:hover{border-right-color:var(--button-hovered-border-color,var(--button-border-color));}',
//       ],
//       ':activebackground': [
//         'aydxa82',
//         '.aydxa82:active{background:var(--button-pressed-background,var(--button-hovered-background));}',
//       ],
//       ':activecolor': [
//         'aldjma3',
//         '.aldjma3:active{color:var(--button-pressed-content-color,var(--button-hovered-content-color,var(--button-content-color)));}',
//       ],
//       ':activeboxShadow': [
//         'agsy9ym',
//         '.agsy9ym:active{box-shadow:var(--button-pressed-box-shadow,var(--button-hovered-box-shadow,var(--button-box-shadow)));}',
//       ],
//       ':activetransform': [
//         'a1gk5ei5',
//         '.a1gk5ei5:active{-webkit-transform:var(--button-pressed-transform);-ms-transform:var(--button-pressed-transform);transform:var(--button-pressed-transform);}',
//       ],
//       ':activetransition': [
//         'a1qoqgcf',
//         '.a1qoqgcf:active{-webkit-transition:var(--button-pressed-transition);transition:var(--button-pressed-transition);}',
//       ],
//       ':active> .ms-Button-iconcolor': [
//         'a57year',
//         '.a57year:active>.ms-Button-icon{color:var(--button-pressed-icon-color,var(--button-icon-color));}',
//       ],
//       ':activeborderTopColor': [
//         'a11leut1',
//         '.a11leut1:active{border-top-color:var(--button-pressed-border-color,var(--button-hovered-border-color,var(--button-border-color)));}',
//       ],
//       ':activeborderRightColor': [
//         'a195mrzw',
//         '.a195mrzw:active{border-right-color:var(--button-pressed-border-color,var(--button-hovered-border-color,var(--button-border-color)));}',
//         '.ra195mrzw:active{border-left-color:var(--button-pressed-border-color,var(--button-hovered-border-color,var(--button-border-color)));}',
//       ],
//       ':activeborderBottomColor': [
//         'adg5kxv',
//         '.adg5kxv:active{border-bottom-color:var(--button-pressed-border-color,var(--button-hovered-border-color,var(--button-border-color)));}',
//       ],
//       ':activeborderLeftColor': [
//         'a8v4fns',
//         '.a8v4fns:active{border-left-color:var(--button-pressed-border-color,var(--button-hovered-border-color,var(--button-border-color)));}',
//         '.ra8v4fns:active{border-right-color:var(--button-pressed-border-color,var(--button-hovered-border-color,var(--button-border-color)));}',
//       ],
//       outlineStyle: ['a1s6fcnf', '.a1s6fcnf{outline-style:none;}'],
//       borderTopColor: ['afwnqy8', '.afwnqy8{border-top-color:var(--button-border-color);}'],
//       borderRightColor: [
//         'avpzubt',
//         '.avpzubt{border-right-color:var(--button-border-color);}',
//         '.ravpzubt{border-left-color:var(--button-border-color);}',
//       ],
//       borderBottomColor: ['a16c20uz', '.a16c20uz{border-bottom-color:var(--button-border-color);}'],
//       borderLeftColor: [
//         'avjb07u',
//         '.avjb07u{border-left-color:var(--button-border-color);}',
//         '.ravjb07u{border-right-color:var(--button-border-color);}',
//       ],
//       borderTopStyle: ['azkkow9', '.azkkow9{border-top-style:solid;}'],
//       borderRightStyle: ['acdblym', '.acdblym{border-right-style:solid;}', '.racdblym{border-left-style:solid;}'],
//       borderBottomStyle: ['ag706s2', '.ag706s2{border-bottom-style:solid;}'],
//       borderLeftStyle: ['ajik90z', '.ajik90z{border-left-style:solid;}', '.rajik90z{border-right-style:solid;}'],
//     },
//   ],
//   [
//     0,
//     null,
//     {
//       '--button-size-smallest': ['a1cz6fjg', '.a1cz6fjg{--button-size-smallest:24px;}'],
//       '--button-size-smaller': ['a1c5wrov', '.a1c5wrov{--button-size-smaller:24px;}'],
//       '--button-size-small': ['akjzyke', '.akjzyke{--button-size-small:24px;}'],
//       '--button-size-regular': ['a1tdbhw7', '.a1tdbhw7{--button-size-regular:32px;}'],
//       '--button-size-large': ['a1w5j6e3', '.a1w5j6e3{--button-size-large:40px;}'],
//       '--button-size-larger': ['a1ehx0w9', '.a1ehx0w9{--button-size-larger:48px;}'],
//       '--button-size-largest': ['asy0rpt', '.asy0rpt{--button-size-largest:64px;}'],
//       '--button-background': ['aceram3', '.aceram3{--button-background:#ffffff;}'],
//       '--button-content-color': ['a1z0nw44', '.a1z0nw44{--button-content-color:#323130;}'],
//       '--button-border-color': ['a1skbnxh', '.a1skbnxh{--button-border-color:#8a8886;}'],
//       '--button-border-radius': ['a10mxtua', '.a10mxtua{--button-border-radius:2px;}'],
//       '--button-border-width': ['axvxnzq', '.axvxnzq{--button-border-width:1px;}'],
//       '--button-box-shadow': ['a1g55moa', '.a1g55moa{--button-box-shadow:none;}'],
//       '--button-width': ['a73moe9', '.a73moe9{--button-width:auto;}'],
//       '--button-max-width': ['agbiby7', '.agbiby7{--button-max-width:280px;}'],
//       '--button-min-width': ['abc200g', '.abc200g{--button-min-width:96px;}'],
//       '--button-min-height': ['aoplg7s', '.aoplg7s{--button-min-height:var(--button-size-regular);}'],
//       '--button-padding-left': ['azrdz31', '.azrdz31{--button-padding-left:20px;}'],
//       '--button-padding-right': ['a11ryrmu', '.a11ryrmu{--button-padding-right:20px;}'],
//       '--button-padding-top': ['a1bi4j9d', '.a1bi4j9d{--button-padding-top:0;}'],
//       '--button-padding-bottom': ['a1hwvjsp', '.a1hwvjsp{--button-padding-bottom:0;}'],
//       '--button-font-family': [
//         'anqe8ok',
//         ".anqe8ok{--button-font-family:'Segoe UI','Segoe UI Web (West European)','Segoe UI',-apple-system,BlinkMacSystemFont,'Roboto','Helvetica Neue',sans-serif;}",
//       ],
//       '--button-font-size': ['a1qcrciv', '.a1qcrciv{--button-font-size:14px;}'],
//       '--button-font-weight': ['a3djwgc', '.a3djwgc{--button-font-weight:600;}'],
//       '--button-content-gap': ['aeujwd0', '.aeujwd0{--button-content-gap:8px;}'],
//       '--button-hovered-background': ['a1iz7v4o', '.a1iz7v4o{--button-hovered-background:#f3f2f1;}'],
//       '--button-hovered-content-color': ['a1g3gtvs', '.a1g3gtvs{--button-hovered-content-color:#201f1e;}'],
//       '--button-pressed-background': ['a1parrb9', '.a1parrb9{--button-pressed-background:#edebe9;}'],
//       '--button-pressed-content-color': ['a1cef4xo', '.a1cef4xo{--button-pressed-content-color:#201f1e;}'],
//     },
//   ],
//   [1, null, { '--button-border-radius': ['a18swz6d', '.a18swz6d{--button-border-radius:50000px;}'] }],
//   [
//     2,
//     null,
//     {
//       '--button-max-width': ['a1nh3o6k', '.a1nh3o6k{--button-max-width:none;}'],
//       '--button-width': ['a1p92vgo', '.a1p92vgo{--button-width:100%;}'],
//     },
//   ],
//   [
//     4,
//     null,
//     {
//       '--button-min-width': ['agacytd', '.agacytd{--button-min-width:var(--button-height);}'],
//       '--button-padding-bottom': ['a1hwvjsp', '.a1hwvjsp{--button-padding-bottom:0;}'],
//       '--button-padding-left': ['auv3803', '.auv3803{--button-padding-left:0;}'],
//       '--button-padding-right': ['arfyqzs', '.arfyqzs{--button-padding-right:0;}'],
//       '--button-padding-top': ['a1bi4j9d', '.a1bi4j9d{--button-padding-top:0;}'],
//       '--button-width': ['axdv31r', '.axdv31r{--button-width:var(--button-height,var(--button-min-height));}'],
//     },
//   ],
//   [
//     8,
//     null,
//     {
//       '--button-background': ['a1bnvck0', '.a1bnvck0{--button-background:#0078d4;}'],
//       '--button-border-color': ['a135zgpe', '.a135zgpe{--button-border-color:transparent;}'],
//       '--button-content-color': ['a1bnixht', '.a1bnixht{--button-content-color:#ffffff;}'],
//       '--button-hovered-background': ['a110dz3h', '.a110dz3h{--button-hovered-background:#106ebe;}'],
//       '--button-hovered-border-color': ['a1i4tqxa', '.a1i4tqxa{--button-hovered-border-color:transparent;}'],
//       '--button-hovered-content-color': ['a1zocld', '.a1zocld{--button-hovered-content-color:#ffffff;}'],
//       '--button-pressed-background': ['agps35i', '.agps35i{--button-pressed-background:#005a9e;}'],
//       '--button-pressed-border-color': ['a2hmzya', '.a2hmzya{--button-pressed-border-color:transparent;}'],
//       '--button-pressed-content-color': ['a193u50d', '.a193u50d{--button-pressed-content-color:#ffffff;}'],
//     },
//   ],
//   [
//     256,
//     null,
//     {
//       '--button-background': ['a14qiakg', '.a14qiakg{--button-background:transparent;}'],
//       '--button-border-color': ['a135zgpe', '.a135zgpe{--button-border-color:transparent;}'],
//       '--button-content-color': ['a1z0nw44', '.a1z0nw44{--button-content-color:#323130;}'],
//       '--button-font-weight': ['a1w5wezo', '.a1w5wezo{--button-font-weight:normal;}'],
//       '--button-hovered-background': ['a1iz7v4o', '.a1iz7v4o{--button-hovered-background:#f3f2f1;}'],
//       '--button-hovered-content-color': ['anmlcw7', '.anmlcw7{--button-hovered-content-color:#0078d4;}'],
//       '--button-pressed-background': ['a1parrb9', '.a1parrb9{--button-pressed-background:#edebe9;}'],
//       '--button-pressed-content-color': ['aqcp0tr', '.aqcp0tr{--button-pressed-content-color:#000000;}'],
//     },
//   ],
//   [
//     1024,
//     null,
//     {
//       '--button-background': ['a14qiakg', '.a14qiakg{--button-background:transparent;}'],
//       '--button-border-color': ['a135zgpe', '.a135zgpe{--button-border-color:transparent;}'],
//       '--button-content-color': ['a1z0nw44', '.a1z0nw44{--button-content-color:#323130;}'],
//       '--button-font-weight': ['a1w5wezo', '.a1w5wezo{--button-font-weight:normal;}'],
//       '--button-hovered-background': ['a3615mr', '.a3615mr{--button-hovered-background:transparent;}'],
//       '--button-hovered-content-color': ['anmlcw7', '.anmlcw7{--button-hovered-content-color:#0078d4;}'],
//       '--button-pressed-background': ['ailih6g', '.ailih6g{--button-pressed-background:transparent;}'],
//       '--button-pressed-content-color': ['aqcp0tr', '.aqcp0tr{--button-pressed-content-color:#000000;}'],
//     },
//   ],
//   [
//     512,
//     null,
//     {
//       pointerEvents: ['a1aehjj5', '.a1aehjj5{pointer-events:none;}'],
//       '--button-background': ['a1ueb7ur', '.a1ueb7ur{--button-background:#f3f2f1;}'],
//       '--button-border-color': ['afy3336', '.afy3336{--button-border-color:#f3f2f1;}'],
//       '--button-content-color': ['a1ik6wn0', '.a1ik6wn0{--button-content-color:#a19f9d;}'],
//     },
//   ],
//   [
//     768,
//     null,
//     {
//       '--button-background': ['a1ueb7ur', '.a1ueb7ur{--button-background:#f3f2f1;}'],
//       '--button-content-color': ['a1ik6wn0', '.a1ik6wn0{--button-content-color:#a19f9d;}'],
//     },
//   ],
//   [
//     1536,
//     null,
//     {
//       '--button-background': ['a14qiakg', '.a14qiakg{--button-background:transparent;}'],
//       '--button-border-color': ['a135zgpe', '.a135zgpe{--button-border-color:transparent;}'],
//       '--button-content-color': ['a1ik6wn0', '.a1ik6wn0{--button-content-color:#a19f9d;}'],
//     },
//   ],
//   [
//     2048,
//     null,
//     {
//       '--button-height': ['a1q1gjpc', '.a1q1gjpc{--button-height:var(--button-size-smallest);}'],
//       '--button-min-height': ['axiuny', '.axiuny{--button-min-height:var(--button-size-smallest);}'],
//     },
//   ],
//   [
//     4096,
//     null,
//     {
//       '--button-height': ['a61vcxr', '.a61vcxr{--button-height:var(--button-size-smaller);}'],
//       '--button-min-height': ['ajsai05', '.ajsai05{--button-min-height:var(--button-size-smaller);}'],
//     },
//   ],
//   [
//     8192,
//     null,
//     {
//       '--button-height': ['a11cfhhr', '.a11cfhhr{--button-height:var(--button-size-small);}'],
//       '--button-min-height': ['a1r4ctnr', '.a1r4ctnr{--button-min-height:var(--button-size-small);}'],
//     },
//   ],
//   [
//     16384,
//     null,
//     {
//       '--button-height': ['a7xv9lr', '.a7xv9lr{--button-height:var(--button-size-large);}'],
//       '--button-min-height': ['a1ekvrcm', '.a1ekvrcm{--button-min-height:var(--button-size-large);}'],
//     },
//   ],
//   [
//     32768,
//     null,
//     {
//       '--button-height': ['a1gv5n59', '.a1gv5n59{--button-height:var(--button-size-larger);}'],
//       '--button-min-height': ['ajos8ch', '.ajos8ch{--button-min-height:var(--button-size-larger);}'],
//     },
//   ],
//   [
//     65536,
//     null,
//     {
//       '--button-height': ['a18cyma4', '.a18cyma4{--button-height:var(--button-size-largest);}'],
//       '--button-min-height': ['abwah6s', '.abwah6s{--button-min-height:var(--button-size-largest);}'],
//     },
//   ],
// ];
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// staticButtonStyles.mapping = {
//   circulartrue: 1,
//   blocktrue: 2,
//   iconOnlytrue: 4,
//   primarytrue: 8,
//   ghosttrue: 256,
//   transparenttrue: 1024,
//   disabledtrue: 512,
//   sizesmallest: 2048,
//   sizesmaller: 4096,
//   sizesmall: 8192,
//   sizelarge: 16384,
//   sizelarger: 32768,
//   sizelargest: 65536,
// };
// export const useStaticButtonStyles = makeStyles(staticButtonStyles);

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
]);

// const staticButtonIconStyles = [
//   [
//     0,
//     null,
//     {
//       alignItems: [
//         'a122n59',
//         '.a122n59{-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}',
//       ],
//       display: ['a22iagw', '.a22iagw{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}'],
//       flexShrink: ['ai64zpg', '.ai64zpg{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;}'],
//       fontWeight: ['a5ljve1', '.a5ljve1{font-weight:normal;}'],
//       justifyContent: [
//         'a4d9j23',
//         '.a4d9j23{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}',
//       ],
//       lineHeight: ['ap6vxd', '.ap6vxd{line-height:1;}'],
//       fontSize: ['a1yrg6cp', '.a1yrg6cp{font-size:var(--button-icon-size,inherit);}'],
//       height: ['a10564oz', '.a10564oz{height:var(--button-icon-size);}'],
//       width: ['aiw6ee6', '.aiw6ee6{width:var(--button-icon-size);}'],
//     },
//   ],
//   [
//     0,
//     null,
//     {
//       '--button-icon-color': ['a7i9xs0', '.a7i9xs0{--button-icon-color:inherit;}'],
//       '--button-icon-size': ['a1mdaal6', '.a1mdaal6{--button-icon-size:16px;}'],
//     },
//   ],
//   [1, null, { '--button-icon-color': ['a7i9xs0', '.a7i9xs0{--button-icon-color:inherit;}'] }],
//   [
//     2,
//     null,
//     {
//       '--button-icon-color': ['adarsur', '.adarsur{--button-icon-color:#106ebe;}'],
//       '--button-hovered-icon-color': ['a4va83', '.a4va83{--button-hovered-icon-color:#0078d4;}'],
//       '--button-pressed-icon-color': ['a15jls3h', '.a15jls3h{--button-pressed-icon-color:#004578;}'],
//     },
//   ],
//   [
//     4,
//     null,
//     {
//       '--button-icon-color': ['adarsur', '.adarsur{--button-icon-color:#106ebe;}'],
//       '--button-hovered-icon-color': ['a4va83', '.a4va83{--button-hovered-icon-color:#0078d4;}'],
//       '--button-pressed-icon-color': ['a15jls3h', '.a15jls3h{--button-pressed-icon-color:#004578;}'],
//     },
//   ],
//   [8, null, { '--button-icon-color': ['a7i9xs0', '.a7i9xs0{--button-icon-color:inherit;}'] }],
// ];
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// staticButtonIconStyles.mapping = { primarytrue: 1, ghosttrue: 2, transparenttrue: 4, disabledtrue: 8 };

// export const useStaticButtonIconStyles = makeStyles(staticButtonIconStyles);

export const useButtonContentStyles = makeStyles([
  /* --- CSS definition --- */
  [null, { lineHeight: '1' }],
]);

// const staticButtonContentStyles = [[0, null, { lineHeight: ['ap6vxd', '.ap6vxd{line-height:1;}'] }]];
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore
// staticButtonContentStyles.mapping = {};

// export const useStaticButtonContentStyles = makeStyles(staticButtonContentStyles);

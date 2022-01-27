import {
  hcButtonFace,
  hcButtonText,
  hcCanvas,
  hcCanvasText,
  hcDisabled,
  hcHighlight,
  hcHighlightText,
  hcHyperlink,
  sharedColors,
  white,
  black,
} from '../global/colors';
import type { GlobalSharedColors, ColorTokens, ColorPaletteTokens } from '../types';

export const generateColorTokens = (): ColorTokens => ({
  colorNeutralForeground1: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorNeutralForeground1Hover: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorNeutralForeground1Pressed: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorNeutralForeground1Selected: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorNeutralForeground2: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorNeutralForeground2Hover: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorNeutralForeground2Pressed: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorNeutralForeground2Selected: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorNeutralForeground2BrandHover: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorNeutralForeground2BrandPressed: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorNeutralForeground2BrandSelected: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorNeutralForeground3: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorNeutralForeground3Hover: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorNeutralForeground3Pressed: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorNeutralForeground3Selected: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorNeutralForeground3BrandHover: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorNeutralForeground3BrandPressed: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorNeutralForeground3BrandSelected: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorNeutralForeground4: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorNeutralForegroundDisabled: hcDisabled, // #3ff23f Global.Color.hcDisabled
  colorNeutralForegroundInvertedDisabled: hcDisabled, // #3ff23f Global.Color.hcDisabled
  colorBrandForegroundLink: hcHyperlink, // #ffff00 Global.Color.hcHyperlink
  colorBrandForegroundLinkHover: hcHyperlink, // #ffff00 Global.Color.hcHyperlink
  colorBrandForegroundLinkPressed: hcHyperlink, // #ffff00 Global.Color.hcHyperlink
  colorBrandForegroundLinkSelected: hcHyperlink, // #ffff00 Global.Color.hcHyperlink
  colorCompoundBrandForeground1: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorCompoundBrandForeground1Hover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorCompoundBrandForeground1Pressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorBrandForeground1: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorBrandForeground2: hcButtonText, // #000000 Global.Color.hcButtonText
  colorNeutralForeground1Static: hcCanvas, // #000000 Global.Color.hcCanvas
  colorNeutralForegroundInverted: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorNeutralForegroundInvertedHover: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorNeutralForegroundInvertedPressed: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorNeutralForegroundInvertedSelected: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorNeutralForegroundOnBrand: hcButtonText, // #000000 Global.Color.hcButtonText
  colorNeutralForegroundInvertedLink: hcHyperlink, // #ffff00 Global.Color.hcHyperlink
  colorNeutralForegroundInvertedLinkHover: hcHyperlink, // #ffff00 Global.Color.hcHyperlink
  colorNeutralForegroundInvertedLinkPressed: hcHyperlink, // #ffff00 Global.Color.hcHyperlink
  colorNeutralForegroundInvertedLinkSelected: hcHyperlink, // #ffff00 Global.Color.hcHyperlink
  colorBrandForegroundInverted: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorBrandForegroundInvertedHover: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorBrandForegroundInvertedPressed: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorBrandForegroundOnLight: hcButtonText, // #000000 Global.Color.hcButtonText
  colorBrandForegroundOnLightHover: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorBrandForegroundOnLightPressed: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorBrandForegroundOnLightSelected: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorNeutralBackground1: hcCanvas, // #000000 Global.Color.hcCanvas
  colorNeutralBackground1Hover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorNeutralBackground1Pressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorNeutralBackground1Selected: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorNeutralBackground2: hcCanvas, // #000000 Global.Color.hcCanvas
  colorNeutralBackground2Hover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorNeutralBackground2Pressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorNeutralBackground2Selected: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorNeutralBackground3: hcCanvas, // #000000 Global.Color.hcCanvas
  colorNeutralBackground3Hover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorNeutralBackground3Pressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorNeutralBackground3Selected: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorNeutralBackground4: hcCanvas, // #000000 Global.Color.hcCanvas
  colorNeutralBackground4Hover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorNeutralBackground4Pressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorNeutralBackground4Selected: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorNeutralBackground5: hcCanvas, // #000000 Global.Color.hcCanvas
  colorNeutralBackground5Hover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorNeutralBackground5Pressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorNeutralBackground5Selected: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorNeutralBackground6: hcCanvas, // #000000 Global.Color.hcCanvas
  colorNeutralBackgroundInverted: hcCanvas, // #000000 Global.Color.hcCanvas
  colorSubtleBackground: 'transparent', // transparent undefined
  colorSubtleBackgroundHover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorSubtleBackgroundPressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorSubtleBackgroundSelected: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorSubtleBackgroundLightAlphaHover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorSubtleBackgroundLightAlphaPressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorSubtleBackgroundLightAlphaSelected: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorSubtleBackgroundInverted: 'transparent', // transparent undefined
  colorSubtleBackgroundInvertedHover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorSubtleBackgroundInvertedPressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorSubtleBackgroundInvertedSelected: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorTransparentBackground: 'transparent', // transparent undefined
  colorTransparentBackgroundHover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorTransparentBackgroundPressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorTransparentBackgroundSelected: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorNeutralBackgroundDisabled: hcCanvas, // #000000 Global.Color.hcCanvas
  colorNeutralBackgroundInvertedDisabled: hcCanvas, // #000000 Global.Color.hcCanvas
  colorNeutralStencil1: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorNeutralStencil2: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorBrandBackground: hcButtonFace, // #ffffff Global.Color.hcButtonFace
  colorBrandBackgroundHover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorBrandBackgroundPressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorBrandBackgroundSelected: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorCompoundBrandBackground: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorCompoundBrandBackgroundHover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorCompoundBrandBackgroundPressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorBrandBackgroundStatic: hcCanvas, // #000000 Global.Color.hcCanvas
  colorBrandBackground2: hcButtonFace, // #ffffff Global.Color.hcButtonFace
  colorBrandBackgroundInverted: hcButtonFace, // #ffffff Global.Color.hcButtonFace
  colorBrandBackgroundInvertedHover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorBrandBackgroundInvertedPressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorBrandBackgroundInvertedSelected: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorNeutralStrokeAccessible: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorNeutralStrokeAccessibleHover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorNeutralStrokeAccessiblePressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorNeutralStrokeAccessibleSelected: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorNeutralStroke1: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorNeutralStroke1Hover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorNeutralStroke1Pressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorNeutralStroke1Selected: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorNeutralStroke2: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorNeutralStroke3: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorNeutralStrokeOnBrand: hcCanvas, // #000000 Global.Color.hcCanvas
  colorNeutralStrokeOnBrand2: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorNeutralStrokeOnBrand2Hover: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorNeutralStrokeOnBrand2Pressed: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorNeutralStrokeOnBrand2Selected: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorBrandStroke1: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorBrandStroke2: hcCanvas, // #000000 Global.Color.hcCanvas
  colorCompoundBrandStroke: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorCompoundBrandStrokeHover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorCompoundBrandStrokePressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorNeutralStrokeDisabled: hcDisabled, // #3ff23f Global.Color.hcDisabled
  colorNeutralStrokeInvertedDisabled: hcDisabled, // #3ff23f Global.Color.hcDisabled
  colorTransparentStroke: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorTransparentStrokeInteractive: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorTransparentStrokeDisabled: hcDisabled, // #3ff23f Global.Color.hcDisabled
  colorStrokeFocus1: hcCanvas, // #000000 Global.Color.hcCanvas
  colorStrokeFocus2: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorNeutralShadowAmbient: 'rgba(0,0,0,0.24)', // rgba(0,0,0,0.24) undefined
  colorNeutralShadowKey: 'rgba(0,0,0,0.28)', // rgba(0,0,0,0.28) undefined
  colorNeutralShadowAmbientLighter: 'rgba(0,0,0,0.12)', // rgba(0,0,0,0.12) undefined
  colorNeutralShadowKeyLighter: 'rgba(0,0,0,0.14)', // rgba(0,0,0,0.14) undefined
  colorNeutralShadowAmbientDarker: 'rgba(0,0,0,0.40)', // rgba(0,0,0,0.40) undefined
  colorNeutralShadowKeyDarker: 'rgba(0,0,0,0.48)', // rgba(0,0,0,0.48) undefined
  colorBrandShadowAmbient: 'rgba(0,0,0,0.30)', // rgba(0,0,0,0.30) undefined
  colorBrandShadowKey: 'rgba(0,0,0,0.25)', // rgba(0,0,0,0.25) undefined
});

export const colorPaletteTokens: ColorPaletteTokens = (Object.keys(sharedColors) as Array<
  keyof GlobalSharedColors
>).reduce((acc, sharedColor) => {
  const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
  const sharedColorTokens = {
    [`colorPalette${color}Background1`]: white,
    [`colorPalette${color}Background2`]: black,
    [`colorPalette${color}Background3`]: white,
    [`colorPalette${color}Foreground1`]: black,
    [`colorPalette${color}Foreground2`]: white,
    [`colorPalette${color}Foreground3`]: white,
    [`colorPalette${color}BorderActive`]: hcHighlight,
    [`colorPalette${color}Border1`]: white,
    [`colorPalette${color}Border2`]: white,
  };

  return { ...acc, ...sharedColorTokens };
}, {} as ColorPaletteTokens);

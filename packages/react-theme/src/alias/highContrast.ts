import type { GlobalSharedColors, NeutralColorTokens, SharedColorTokens, Theme } from '../types';

export const generateNeutralColorTokens: (global: Theme['global']) => NeutralColorTokens = global => ({
  neutralForeground1: global.color.hcCanvasText, // #ffffff Global.Color.hcCanvasText
  neutralForeground2: global.color.hcCanvasText, // #ffffff Global.Color.hcCanvasText
  neutralForeground2Hover: global.color.hcHighlightText, // #000000 Global.Color.hcHighlightText
  neutralForeground2Pressed: global.color.hcHighlightText, // #000000 Global.Color.hcHighlightText
  neutralForeground2Selected: global.color.hcHighlightText, // #000000 Global.Color.hcHighlightText
  neutralForeground2BrandHover: global.color.hcHighlightText, // #000000 Global.Color.hcHighlightText
  neutralForeground2BrandPressed: global.color.hcHighlightText, // #000000 Global.Color.hcHighlightText
  neutralForeground2BrandSelected: global.color.hcHighlightText, // #000000 Global.Color.hcHighlightText
  neutralForeground3: global.color.hcCanvasText, // #ffffff Global.Color.hcCanvasText
  neutralForeground3Hover: global.color.hcHighlightText, // #000000 Global.Color.hcHighlightText
  neutralForeground3Pressed: global.color.hcHighlightText, // #000000 Global.Color.hcHighlightText
  neutralForeground3Selected: global.color.hcHighlightText, // #000000 Global.Color.hcHighlightText
  neutralForeground3BrandHover: global.color.hcHighlightText, // #000000 Global.Color.hcHighlightText
  neutralForeground3BrandPressed: global.color.hcHighlightText, // #000000 Global.Color.hcHighlightText
  neutralForeground3BrandSelected: global.color.hcHighlightText, // #000000 Global.Color.hcHighlightText
  neutralForeground4: global.color.hcCanvasText, // #ffffff Global.Color.hcCanvasText
  neutralForegroundDisabled: global.color.hcDisabled, // #3ff23f Global.Color.hcDisabled
  brandForegroundLink: global.color.hcHyperlink, // #ffff00 Global.Color.hcHyperlink
  brandForegroundLinkHover: global.color.hcHyperlink, // #ffff00 Global.Color.hcHyperlink
  brandForegroundLinkPressed: global.color.hcHyperlink, // #ffff00 Global.Color.hcHyperlink
  brandForegroundLinkSelected: global.color.hcHyperlink, // #ffff00 Global.Color.hcHyperlink
  compoundBrandForeground1: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  compoundBrandForeground1Hover: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  compoundBrandForeground1Pressed: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  brandForeground1: global.color.hcCanvasText, // #ffffff Global.Color.hcCanvasText
  brandForeground2: global.color.hcButtonText, // #000000 Global.Color.hcButtonText
  neutralForegroundInverted: global.color.hcCanvas, // #000000 Global.Color.hcCanvas
  neutralForegroundOnBrand: global.color.hcButtonText, // #000000 Global.Color.hcButtonText
  neutralForegroundInvertedLink: global.color.hcHyperlink, // #ffff00 Global.Color.hcHyperlink
  neutralForegroundInvertedLinkHover: global.color.hcHyperlink, // #ffff00 Global.Color.hcHyperlink
  neutralForegroundInvertedLinkPressed: global.color.hcHyperlink, // #ffff00 Global.Color.hcHyperlink
  neutralForegroundInvertedLinkSelected: global.color.hcHyperlink, // #ffff00 Global.Color.hcHyperlink
  neutralBackground1: global.color.hcCanvas, // #000000 Global.Color.hcCanvas
  neutralBackground1Hover: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  neutralBackground1Pressed: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  neutralBackground1Selected: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  neutralBackground2: global.color.hcCanvas, // #000000 Global.Color.hcCanvas
  neutralBackground2Hover: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  neutralBackground2Pressed: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  neutralBackground2Selected: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  neutralBackground3: global.color.hcCanvas, // #000000 Global.Color.hcCanvas
  neutralBackground3Hover: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  neutralBackground3Pressed: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  neutralBackground3Selected: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  neutralBackground4: global.color.hcCanvas, // #000000 Global.Color.hcCanvas
  neutralBackground4Hover: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  neutralBackground4Pressed: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  neutralBackground4Selected: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  neutralBackground5: global.color.hcCanvas, // #000000 Global.Color.hcCanvas
  neutralBackground5Hover: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  neutralBackground5Pressed: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  neutralBackground5Selected: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  neutralBackground6: global.color.hcCanvas, // #000000 Global.Color.hcCanvas
  neutralBackgroundInverted: global.color.hcCanvasText, // #ffffff Global.Color.hcCanvasText
  subtleBackground: 'transparent', // transparent undefined
  subtleBackgroundHover: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  subtleBackgroundPressed: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  subtleBackgroundSelected: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  transparentBackground: 'transparent', // transparent undefined
  transparentBackgroundHover: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  transparentBackgroundPressed: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  transparentBackgroundSelected: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  neutralBackgroundDisabled: global.color.hcCanvas, // #000000 Global.Color.hcCanvas
  neutralStencil1: global.palette.grey[8], // #141414 Global.Color.Grey.8
  neutralStencil2: global.palette.grey[52], // #858585 Global.Color.Grey.52
  brandBackground: global.color.hcButtonFace, // #ffffff Global.Color.hcButtonFace
  brandBackgroundHover: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  brandBackgroundPressed: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  brandBackgroundSelected: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  compoundBrandBackground: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  compoundBrandBackgroundHover: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  compoundBrandBackgroundPressed: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  brandBackgroundStatic: global.color.hcCanvas, // #000000 Global.Color.hcCanvas
  brandBackground2: global.color.hcButtonFace, // #ffffff Global.Color.hcButtonFace
  neutralStrokeAccessible: global.color.hcCanvasText, // #ffffff Global.Color.hcCanvasText
  neutralStrokeAccessibleHover: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  neutralStrokeAccessiblePressed: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  neutralStrokeAccessibleSelected: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  neutralStroke1: global.color.hcCanvasText, // #ffffff Global.Color.hcCanvasText
  neutralStroke1Hover: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  neutralStroke1Pressed: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  neutralStroke1Selected: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  neutralStroke2: global.color.hcCanvasText, // #ffffff Global.Color.hcCanvasText
  neutralStroke3: global.color.hcCanvasText, // #ffffff Global.Color.hcCanvasText
  brandStroke1: global.color.hcCanvasText, // #ffffff Global.Color.hcCanvasText
  brandStroke2: global.color.hcCanvas, // #000000 Global.Color.hcCanvas
  compoundBrandStroke: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  compoundBrandStrokeHover: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  compoundBrandStrokePressed: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  neutralStrokeDisabled: global.color.hcDisabled, // #3ff23f Global.Color.hcDisabled
  transparentStroke: global.color.hcCanvasText, // #ffffff Global.Color.hcCanvasText
  transparentStrokeInteractive: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  transparentStrokeDisabled: global.color.hcDisabled, // #3ff23f Global.Color.hcDisabled
  strokeFocus1: global.color.hcCanvas, // #000000 Global.Color.hcCanvas
  strokeFocus2: global.color.hcHighlight, // #1aebff Global.Color.hcHighlight
  neutralShadowAmbient: 'rgba(0,0,0,0.24)', // rgba(0,0,0,0.24) undefined
  neutralShadowKey: 'rgba(0,0,0,0.28)', // rgba(0,0,0,0.28) undefined
  neutralShadowAmbientLighter: 'rgba(0,0,0,0.12)', // rgba(0,0,0,0.12) undefined
  neutralShadowKeyLighter: 'rgba(0,0,0,0.14)', // rgba(0,0,0,0.14) undefined
  neutralShadowAmbientDarker: 'rgba(0,0,0,0.40)', // rgba(0,0,0,0.40) undefined
  neutralShadowKeyDarker: 'rgba(0,0,0,0.48)', // rgba(0,0,0,0.48) undefined
  brandShadowAmbient: 'rgba(0,0,0,0.30)', // rgba(0,0,0,0.30) undefined
  brandShadowKey: 'rgba(0,0,0,0.25)', // rgba(0,0,0,0.25) undefined
});

export const generateSharedColorTokens: (
  globalSharedTokens: GlobalSharedColors,
  globalColors: Theme['global']['color'],
) => Record<keyof GlobalSharedColors, SharedColorTokens> = (globalSharedTokens, globalColors) => {
  return (Object.keys(globalSharedTokens) as Array<keyof GlobalSharedColors>).reduce((acc, sharedColor) => {
    acc[sharedColor] = {
      background1: globalColors.white,
      background2: globalColors.black,
      background3: globalColors.white,
      foreground1: globalColors.black,
      foreground2: globalColors.white,
      foreground3: globalColors.white,
      borderActive: globalColors.hcHighlight,
      border2: globalColors.white,
    };
    return acc;
  }, {} as Record<keyof GlobalSharedColors, SharedColorTokens>);
};

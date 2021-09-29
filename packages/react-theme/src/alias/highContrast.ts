import {
  hcCanvasText,
  hcHighlightText,
  hcDisabled,
  hcHyperlink,
  hcHighlight,
  hcButtonText,
  hcCanvas,
  hcButtonFace,
  grey,
  sharedColors,
  white,
  black,
} from '../global';
import type {
  GlobalSharedColors,
  ColorAliasTokens,
  SharedColorTokens,
  SharedColorT,
  GlobalSharedColorsT,
} from '../types';

export const generateColorAliasTokens = (): ColorAliasTokens => ({
  colorAliasNeutralForeground1: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorAliasNeutralForeground2: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorAliasNeutralForeground2Hover: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorAliasNeutralForeground2Pressed: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorAliasNeutralForeground2Selected: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorAliasNeutralForeground2BrandHover: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorAliasNeutralForeground2BrandPressed: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorAliasNeutralForeground2BrandSelected: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorAliasNeutralForeground3: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorAliasNeutralForeground3Hover: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorAliasNeutralForeground3Pressed: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorAliasNeutralForeground3Selected: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorAliasNeutralForeground3BrandHover: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorAliasNeutralForeground3BrandPressed: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorAliasNeutralForeground3BrandSelected: hcHighlightText, // #000000 Global.Color.hcHighlightText
  colorAliasNeutralForeground4: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorAliasNeutralForegroundDisabled: hcDisabled, // #3ff23f Global.Color.hcDisabled
  colorAliasBrandForegroundLink: hcHyperlink, // #ffff00 Global.Color.hcHyperlink
  colorAliasBrandForegroundLinkHover: hcHyperlink, // #ffff00 Global.Color.hcHyperlink
  colorAliasBrandForegroundLinkPressed: hcHyperlink, // #ffff00 Global.Color.hcHyperlink
  colorAliasBrandForegroundLinkSelected: hcHyperlink, // #ffff00 Global.Color.hcHyperlink
  colorAliasCompoundBrandForeground1: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasCompoundBrandForeground1Hover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasCompoundBrandForeground1Pressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasBrandForeground1: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorAliasBrandForeground2: hcButtonText, // #000000 Global.Color.hcButtonText
  colorAliasNeutralForegroundInverted: hcCanvas, // #000000 Global.Color.hcCanvas
  colorAliasNeutralForegroundOnBrand: hcButtonText, // #000000 Global.Color.hcButtonText
  colorAliasNeutralForegroundInvertedLink: hcHyperlink, // #ffff00 Global.Color.hcHyperlink
  colorAliasNeutralForegroundInvertedLinkHover: hcHyperlink, // #ffff00 Global.Color.hcHyperlink
  colorAliasNeutralForegroundInvertedLinkPressed: hcHyperlink, // #ffff00 Global.Color.hcHyperlink
  colorAliasNeutralForegroundInvertedLinkSelected: hcHyperlink, // #ffff00 Global.Color.hcHyperlink
  colorAliasNeutralBackground1: hcCanvas, // #000000 Global.Color.hcCanvas
  colorAliasNeutralBackground1Hover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasNeutralBackground1Pressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasNeutralBackground1Selected: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasNeutralBackground2: hcCanvas, // #000000 Global.Color.hcCanvas
  colorAliasNeutralBackground2Hover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasNeutralBackground2Pressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasNeutralBackground2Selected: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasNeutralBackground3: hcCanvas, // #000000 Global.Color.hcCanvas
  colorAliasNeutralBackground3Hover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasNeutralBackground3Pressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasNeutralBackground3Selected: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasNeutralBackground4: hcCanvas, // #000000 Global.Color.hcCanvas
  colorAliasNeutralBackground4Hover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasNeutralBackground4Pressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasNeutralBackground4Selected: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasNeutralBackground5: hcCanvas, // #000000 Global.Color.hcCanvas
  colorAliasNeutralBackground5Hover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasNeutralBackground5Pressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasNeutralBackground5Selected: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasNeutralBackground6: hcCanvas, // #000000 Global.Color.hcCanvas
  colorAliasNeutralBackgroundInverted: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorAliasSubtleBackground: 'transparent', // transparent undefined
  colorAliasSubtleBackgroundHover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasSubtleBackgroundPressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasSubtleBackgroundSelected: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasTransparentBackground: 'transparent', // transparent undefined
  colorAliasTransparentBackgroundHover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasTransparentBackgroundPressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasTransparentBackgroundSelected: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasNeutralBackgroundDisabled: hcCanvas, // #000000 Global.Color.hcCanvas
  colorAliasNeutralStencil1: grey[8], // #141414 Global.Color.Grey.8
  colorAliasNeutralStencil2: grey[52], // #858585 Global.Color.Grey.52
  colorAliasBrandBackground: hcButtonFace, // #ffffff Global.Color.hcButtonFace
  colorAliasBrandBackgroundHover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasBrandBackgroundPressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasBrandBackgroundSelected: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasCompoundBrandBackground: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasCompoundBrandBackgroundHover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasCompoundBrandBackgroundPressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasBrandBackgroundStatic: hcCanvas, // #000000 Global.Color.hcCanvas
  colorAliasBrandBackground2: hcButtonFace, // #ffffff Global.Color.hcButtonFace
  colorAliasNeutralStrokeAccessible: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorAliasNeutralStrokeAccessibleHover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasNeutralStrokeAccessiblePressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasNeutralStrokeAccessibleSelected: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasNeutralStroke1: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorAliasNeutralStroke1Hover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasNeutralStroke1Pressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasNeutralStroke1Selected: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasNeutralStroke2: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorAliasNeutralStroke3: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorAliasBrandStroke1: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorAliasBrandStroke2: hcCanvas, // #000000 Global.Color.hcCanvas
  colorAliasCompoundBrandStroke: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasCompoundBrandStrokeHover: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasCompoundBrandStrokePressed: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasNeutralStrokeDisabled: hcDisabled, // #3ff23f Global.Color.hcDisabled
  colorAliasTransparentStroke: hcCanvasText, // #ffffff Global.Color.hcCanvasText
  colorAliasTransparentStrokeInteractive: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasTransparentStrokeDisabled: hcDisabled, // #3ff23f Global.Color.hcDisabled
  colorAliasStrokeFocus1: hcCanvas, // #000000 Global.Color.hcCanvas
  colorAliasStrokeFocus2: hcHighlight, // #1aebff Global.Color.hcHighlight
  colorAliasNeutralShadowAmbient: 'rgba(0,0,0,0.24)', // rgba(0,0,0,0.24) undefined
  colorAliasNeutralShadowKey: 'rgba(0,0,0,0.28)', // rgba(0,0,0,0.28) undefined
  colorAliasNeutralShadowAmbientLighter: 'rgba(0,0,0,0.12)', // rgba(0,0,0,0.12) undefined
  colorAliasNeutralShadowKeyLighter: 'rgba(0,0,0,0.14)', // rgba(0,0,0,0.14) undefined
  colorAliasNeutralShadowAmbientDarker: 'rgba(0,0,0,0.40)', // rgba(0,0,0,0.40) undefined
  colorAliasNeutralShadowKeyDarker: 'rgba(0,0,0,0.48)', // rgba(0,0,0,0.48) undefined
  colorAliasBrandShadowAmbient: 'rgba(0,0,0,0.30)', // rgba(0,0,0,0.30) undefined
  colorAliasBrandShadowKey: 'rgba(0,0,0,0.25)', // rgba(0,0,0,0.25) undefined
});

export const sharedColorTokens: SharedColorTokens = (Object.keys(sharedColors) as Array<
  keyof GlobalSharedColors
>).reduce((acc, sharedColor) => {
  const color: GlobalSharedColorsT = (sharedColor.slice(0, 1).toUpperCase() +
    sharedColor.slice(1)) as GlobalSharedColorsT;
  const sharedColorTokens: Partial<Record<SharedColorT<GlobalSharedColorsT>, string>> = {
    [`color${color}Background1`]: white,
    [`color${color}Background2`]: black,
    [`color${color}Background3`]: white,
    [`color${color}Foreground1`]: black,
    [`color${color}Foreground2`]: white,
    [`color${color}Foreground3`]: white,
    [`color${color}BorderActive`]: hcHighlight,
    [`color${color}Border2`]: white,
  };

  return { ...acc, ...sharedColorTokens };
}, {} as SharedColorTokens);

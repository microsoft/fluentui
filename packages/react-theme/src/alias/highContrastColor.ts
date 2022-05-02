import {
  blackAlpha,
  hcButtonFace,
  hcButtonText,
  hcCanvas,
  hcCanvasText,
  hcDisabled,
  hcHighlight,
  hcHighlightText,
  hcHyperlink,
} from '../global/colors';
import type { ColorTokens } from '../types';

export const generateColorTokens = (): ColorTokens => ({
  colorNeutralForeground1: hcCanvasText, // CanvasText Global.Color.hcCanvasText
  colorNeutralForeground1Hover: hcHighlightText, // HighlightText Global.Color.hcHighlightText
  colorNeutralForeground1Pressed: hcHighlightText, // HighlightText Global.Color.hcHighlightText
  colorNeutralForeground1Selected: hcHighlightText, // HighlightText Global.Color.hcHighlightText
  colorNeutralForeground2: hcCanvasText, // CanvasText Global.Color.hcCanvasText
  colorNeutralForeground2Hover: hcHighlightText, // HighlightText Global.Color.hcHighlightText
  colorNeutralForeground2Pressed: hcHighlightText, // HighlightText Global.Color.hcHighlightText
  colorNeutralForeground2Selected: hcHighlightText, // HighlightText Global.Color.hcHighlightText
  colorNeutralForeground2BrandHover: hcHighlightText, // HighlightText Global.Color.hcHighlightText
  colorNeutralForeground2BrandPressed: hcHighlightText, // HighlightText Global.Color.hcHighlightText
  colorNeutralForeground2BrandSelected: hcHighlightText, // HighlightText Global.Color.hcHighlightText
  colorNeutralForeground3: hcCanvasText, // CanvasText Global.Color.hcCanvasText
  colorNeutralForeground3Hover: hcHighlightText, // HighlightText Global.Color.hcHighlightText
  colorNeutralForeground3Pressed: hcHighlightText, // HighlightText Global.Color.hcHighlightText
  colorNeutralForeground3Selected: hcHighlightText, // HighlightText Global.Color.hcHighlightText
  colorNeutralForeground3BrandHover: hcHighlightText, // HighlightText Global.Color.hcHighlightText
  colorNeutralForeground3BrandPressed: hcHighlightText, // HighlightText Global.Color.hcHighlightText
  colorNeutralForeground3BrandSelected: hcHighlightText, // HighlightText Global.Color.hcHighlightText
  colorNeutralForeground4: hcCanvasText, // CanvasText Global.Color.hcCanvasText
  colorNeutralForegroundDisabled: hcDisabled, // GrayText Global.Color.hcDisabled
  colorNeutralForegroundInvertedDisabled: hcDisabled, // GrayText Global.Color.hcDisabled
  colorBrandForegroundLink: hcHyperlink, // LinkText Global.Color.hcHyperlink
  colorBrandForegroundLinkHover: hcHyperlink, // LinkText Global.Color.hcHyperlink
  colorBrandForegroundLinkPressed: hcHyperlink, // LinkText Global.Color.hcHyperlink
  colorBrandForegroundLinkSelected: hcHyperlink, // LinkText Global.Color.hcHyperlink
  colorNeutralForeground2Link: hcHyperlink, // LinkText Global.Color.hcHyperlink
  colorNeutralForeground2LinkHover: hcHyperlink, // LinkText Global.Color.hcHyperlink
  colorNeutralForeground2LinkPressed: hcHyperlink, // LinkText Global.Color.hcHyperlink
  colorNeutralForeground2LinkSelected: hcHyperlink, // LinkText Global.Color.hcHyperlink
  colorCompoundBrandForeground1: hcHighlight, // Highlight Global.Color.hcHighlight
  colorCompoundBrandForeground1Hover: hcHighlight, // Highlight Global.Color.hcHighlight
  colorCompoundBrandForeground1Pressed: hcHighlight, // Highlight Global.Color.hcHighlight
  colorBrandForeground1: hcCanvasText, // CanvasText Global.Color.hcCanvasText
  colorBrandForeground2: hcButtonText, // ButtonText Global.Color.hcButtonText
  colorNeutralForeground1Static: hcCanvas, // Canvas Global.Color.hcCanvas
  colorNeutralForegroundInverted: hcCanvasText, // CanvasText Global.Color.hcCanvasText
  colorNeutralForegroundInvertedHover: hcHighlightText, // HighlightText Global.Color.hcHighlightText
  colorNeutralForegroundInvertedPressed: hcHighlightText, // HighlightText Global.Color.hcHighlightText
  colorNeutralForegroundInvertedSelected: hcHighlightText, // HighlightText Global.Color.hcHighlightText
  colorNeutralForegroundOnBrand: hcButtonText, // ButtonText Global.Color.hcButtonText
  colorNeutralForegroundInvertedLink: hcHyperlink, // LinkText Global.Color.hcHyperlink
  colorNeutralForegroundInvertedLinkHover: hcHyperlink, // LinkText Global.Color.hcHyperlink
  colorNeutralForegroundInvertedLinkPressed: hcHyperlink, // LinkText Global.Color.hcHyperlink
  colorNeutralForegroundInvertedLinkSelected: hcHyperlink, // LinkText Global.Color.hcHyperlink
  colorBrandForegroundInverted: hcCanvasText, // CanvasText Global.Color.hcCanvasText
  colorBrandForegroundInvertedHover: hcCanvasText, // CanvasText Global.Color.hcCanvasText
  colorBrandForegroundInvertedPressed: hcCanvasText, // CanvasText Global.Color.hcCanvasText
  colorBrandForegroundOnLight: hcButtonText, // ButtonText Global.Color.hcButtonText
  colorBrandForegroundOnLightHover: hcHighlightText, // HighlightText Global.Color.hcHighlightText
  colorBrandForegroundOnLightPressed: hcHighlightText, // HighlightText Global.Color.hcHighlightText
  colorBrandForegroundOnLightSelected: hcHighlightText, // HighlightText Global.Color.hcHighlightText
  colorNeutralBackground1: hcCanvas, // Canvas Global.Color.hcCanvas
  colorNeutralBackground1Hover: hcHighlight, // Highlight Global.Color.hcHighlight
  colorNeutralBackground1Pressed: hcHighlight, // Highlight Global.Color.hcHighlight
  colorNeutralBackground1Selected: hcHighlight, // Highlight Global.Color.hcHighlight
  colorNeutralBackground2: hcCanvas, // Canvas Global.Color.hcCanvas
  colorNeutralBackground2Hover: hcHighlight, // Highlight Global.Color.hcHighlight
  colorNeutralBackground2Pressed: hcHighlight, // Highlight Global.Color.hcHighlight
  colorNeutralBackground2Selected: hcHighlight, // Highlight Global.Color.hcHighlight
  colorNeutralBackground3: hcCanvas, // Canvas Global.Color.hcCanvas
  colorNeutralBackground3Hover: hcHighlight, // Highlight Global.Color.hcHighlight
  colorNeutralBackground3Pressed: hcHighlight, // Highlight Global.Color.hcHighlight
  colorNeutralBackground3Selected: hcHighlight, // Highlight Global.Color.hcHighlight
  colorNeutralBackground4: hcCanvas, // Canvas Global.Color.hcCanvas
  colorNeutralBackground4Hover: hcHighlight, // Highlight Global.Color.hcHighlight
  colorNeutralBackground4Pressed: hcHighlight, // Highlight Global.Color.hcHighlight
  colorNeutralBackground4Selected: hcHighlight, // Highlight Global.Color.hcHighlight
  colorNeutralBackground5: hcCanvas, // Canvas Global.Color.hcCanvas
  colorNeutralBackground5Hover: hcHighlight, // Highlight Global.Color.hcHighlight
  colorNeutralBackground5Pressed: hcHighlight, // Highlight Global.Color.hcHighlight
  colorNeutralBackground5Selected: hcHighlight, // Highlight Global.Color.hcHighlight
  colorNeutralBackground6: hcCanvas, // Canvas Global.Color.hcCanvas
  colorNeutralBackgroundInverted: hcCanvas, // Canvas Global.Color.hcCanvas
  colorSubtleBackground: 'transparent', // transparent undefined
  colorSubtleBackgroundHover: hcHighlight, // Highlight Global.Color.hcHighlight
  colorSubtleBackgroundPressed: hcHighlight, // Highlight Global.Color.hcHighlight
  colorSubtleBackgroundSelected: hcHighlight, // Highlight Global.Color.hcHighlight
  colorSubtleBackgroundLightAlphaHover: hcHighlight, // Highlight Global.Color.hcHighlight
  colorSubtleBackgroundLightAlphaPressed: hcHighlight, // Highlight Global.Color.hcHighlight
  colorSubtleBackgroundLightAlphaSelected: hcHighlight, // Highlight Global.Color.hcHighlight
  colorSubtleBackgroundInverted: 'transparent', // transparent undefined
  colorSubtleBackgroundInvertedHover: hcHighlight, // Highlight Global.Color.hcHighlight
  colorSubtleBackgroundInvertedPressed: hcHighlight, // Highlight Global.Color.hcHighlight
  colorSubtleBackgroundInvertedSelected: hcHighlight, // Highlight Global.Color.hcHighlight
  colorTransparentBackground: 'transparent', // transparent undefined
  colorTransparentBackgroundHover: hcHighlight, // Highlight Global.Color.hcHighlight
  colorTransparentBackgroundPressed: hcHighlight, // Highlight Global.Color.hcHighlight
  colorTransparentBackgroundSelected: hcHighlight, // Highlight Global.Color.hcHighlight
  colorNeutralBackgroundDisabled: hcCanvas, // Canvas Global.Color.hcCanvas
  colorNeutralBackgroundInvertedDisabled: hcCanvas, // Canvas Global.Color.hcCanvas
  colorNeutralStencil1: hcCanvasText, // CanvasText Global.Color.hcCanvasText
  colorNeutralStencil2: hcCanvasText, // CanvasText Global.Color.hcCanvasText
  colorBackgroundOverlay: blackAlpha[50], // rgba(0, 0, 0, 0.5) Global.Color.BlackAlpha.50
  colorScrollbarOverlay: hcButtonFace, // ButtonFace Global.Color.hcButtonFace
  colorBrandBackground: hcButtonFace, // ButtonFace Global.Color.hcButtonFace
  colorBrandBackgroundHover: hcHighlight, // Highlight Global.Color.hcHighlight
  colorBrandBackgroundPressed: hcHighlight, // Highlight Global.Color.hcHighlight
  colorBrandBackgroundSelected: hcHighlight, // Highlight Global.Color.hcHighlight
  colorCompoundBrandBackground: hcHighlight, // Highlight Global.Color.hcHighlight
  colorCompoundBrandBackgroundHover: hcHighlight, // Highlight Global.Color.hcHighlight
  colorCompoundBrandBackgroundPressed: hcHighlight, // Highlight Global.Color.hcHighlight
  colorBrandBackgroundStatic: hcCanvas, // Canvas Global.Color.hcCanvas
  colorBrandBackground2: hcButtonFace, // ButtonFace Global.Color.hcButtonFace
  colorBrandBackgroundInverted: hcButtonFace, // ButtonFace Global.Color.hcButtonFace
  colorBrandBackgroundInvertedHover: hcHighlight, // Highlight Global.Color.hcHighlight
  colorBrandBackgroundInvertedPressed: hcHighlight, // Highlight Global.Color.hcHighlight
  colorBrandBackgroundInvertedSelected: hcHighlight, // Highlight Global.Color.hcHighlight
  colorNeutralStrokeAccessible: hcCanvasText, // CanvasText Global.Color.hcCanvasText
  colorNeutralStrokeAccessibleHover: hcHighlight, // Highlight Global.Color.hcHighlight
  colorNeutralStrokeAccessiblePressed: hcHighlight, // Highlight Global.Color.hcHighlight
  colorNeutralStrokeAccessibleSelected: hcHighlight, // Highlight Global.Color.hcHighlight
  colorNeutralStroke1: hcCanvasText, // CanvasText Global.Color.hcCanvasText
  colorNeutralStroke1Hover: hcHighlight, // Highlight Global.Color.hcHighlight
  colorNeutralStroke1Pressed: hcHighlight, // Highlight Global.Color.hcHighlight
  colorNeutralStroke1Selected: hcHighlight, // Highlight Global.Color.hcHighlight
  colorNeutralStroke2: hcCanvasText, // CanvasText Global.Color.hcCanvasText
  colorNeutralStroke3: hcCanvasText, // CanvasText Global.Color.hcCanvasText
  colorNeutralStrokeOnBrand: hcCanvas, // Canvas Global.Color.hcCanvas
  colorNeutralStrokeOnBrand2: hcCanvasText, // CanvasText Global.Color.hcCanvasText
  colorNeutralStrokeOnBrand2Hover: hcCanvasText, // CanvasText Global.Color.hcCanvasText
  colorNeutralStrokeOnBrand2Pressed: hcCanvasText, // CanvasText Global.Color.hcCanvasText
  colorNeutralStrokeOnBrand2Selected: hcCanvasText, // CanvasText Global.Color.hcCanvasText
  colorBrandStroke1: hcCanvasText, // CanvasText Global.Color.hcCanvasText
  colorBrandStroke2: hcCanvas, // Canvas Global.Color.hcCanvas
  colorCompoundBrandStroke: hcHighlight, // Highlight Global.Color.hcHighlight
  colorCompoundBrandStrokeHover: hcHighlight, // Highlight Global.Color.hcHighlight
  colorCompoundBrandStrokePressed: hcHighlight, // Highlight Global.Color.hcHighlight
  colorNeutralStrokeDisabled: hcDisabled, // GrayText Global.Color.hcDisabled
  colorNeutralStrokeInvertedDisabled: hcDisabled, // GrayText Global.Color.hcDisabled
  colorTransparentStroke: hcCanvasText, // CanvasText Global.Color.hcCanvasText
  colorTransparentStrokeInteractive: hcHighlight, // Highlight Global.Color.hcHighlight
  colorTransparentStrokeDisabled: hcDisabled, // GrayText Global.Color.hcDisabled
  colorStrokeFocus1: hcCanvas, // Canvas Global.Color.hcCanvas
  colorStrokeFocus2: hcHighlight, // Highlight Global.Color.hcHighlight
  colorNeutralShadowAmbient: 'rgba(0,0,0,0.24)', // rgba(0,0,0,0.24) undefined
  colorNeutralShadowKey: 'rgba(0,0,0,0.28)', // rgba(0,0,0,0.28) undefined
  colorNeutralShadowAmbientLighter: 'rgba(0,0,0,0.12)', // rgba(0,0,0,0.12) undefined
  colorNeutralShadowKeyLighter: 'rgba(0,0,0,0.14)', // rgba(0,0,0,0.14) undefined
  colorNeutralShadowAmbientDarker: 'rgba(0,0,0,0.40)', // rgba(0,0,0,0.40) undefined
  colorNeutralShadowKeyDarker: 'rgba(0,0,0,0.48)', // rgba(0,0,0,0.48) undefined
  colorBrandShadowAmbient: 'rgba(0,0,0,0.30)', // rgba(0,0,0,0.30) undefined
  colorBrandShadowKey: 'rgba(0,0,0,0.25)', // rgba(0,0,0,0.25) undefined
});

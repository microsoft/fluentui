import type { Theme } from './types';

export const tokens: Record<keyof Theme, string> = {
  // Color tokens
  colorNeutralForeground1: 'var(--test, var(--test2, var(--test3, var(--colorNeutralForeground1))))',
  colorNeutralForeground1Hover: 'var(--test, var(--test2, var(--test3, var(--colorNeutralForeground1Hover))))',
  colorNeutralForeground1Pressed: 'var(--test, var(--test2, var(--test3, var(--colorNeutralForeground1Pressed))))',
  colorNeutralForeground1Selected: 'var(--test, var(--test2, var(--test3, var(--colorNeutralForeground1Selected))))',
  colorNeutralForeground2: 'var(--test, var(--test2, var(--test3, var(--colorNeutralForeground2))))',
  colorNeutralForeground2Hover: 'var(--test, var(--test2, var(--test3, var(--colorNeutralForeground2Hover))))',
  colorNeutralForeground2Pressed: 'var(--test, var(--test2, var(--test3, var(--colorNeutralForeground2Pressed))))',
  colorNeutralForeground2Selected: 'var(--test, var(--test2, var(--test3, var(--colorNeutralForeground2Selected))))',
  colorNeutralForeground2BrandHover:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralForeground2BrandHover))))',
  colorNeutralForeground2BrandPressed:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralForeground2BrandPressed))))',
  colorNeutralForeground2BrandSelected:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralForeground2BrandSelected))))',
  colorNeutralForeground3: 'var(--test, var(--test2, var(--test3, var(--colorNeutralForeground3))))',
  colorNeutralForeground3Hover: 'var(--test, var(--test2, var(--test3, var(--colorNeutralForeground3Hover))))',
  colorNeutralForeground3Pressed: 'var(--test, var(--test2, var(--test3, var(--colorNeutralForeground3Pressed))))',
  colorNeutralForeground3Selected: 'var(--test, var(--test2, var(--test3, var(--colorNeutralForeground3Selected))))',
  colorNeutralForeground3BrandHover:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralForeground3BrandHover))))',
  colorNeutralForeground3BrandPressed:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralForeground3BrandPressed))))',
  colorNeutralForeground3BrandSelected:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralForeground3BrandSelected))))',
  colorNeutralForeground4: 'var(--test, var(--test2, var(--test3, var(--colorNeutralForeground4))))',
  colorNeutralForegroundDisabled: 'var(--test, var(--test2, var(--test3, var(--colorNeutralForegroundDisabled))))',
  colorBrandForegroundLink: 'var(--test, var(--test2, var(--test3, var(--colorBrandForegroundLink))))',
  colorBrandForegroundLinkHover: 'var(--test, var(--test2, var(--test3, var(--colorBrandForegroundLinkHover))))',
  colorBrandForegroundLinkPressed: 'var(--test, var(--test2, var(--test3, var(--colorBrandForegroundLinkPressed))))',
  colorBrandForegroundLinkSelected: 'var(--test, var(--test2, var(--test3, var(--colorBrandForegroundLinkSelected))))',
  colorNeutralForeground2Link: 'var(--test, var(--test2, var(--test3, var(--colorNeutralForeground2Link))))',
  colorNeutralForeground2LinkHover: 'var(--test, var(--test2, var(--test3, var(--colorNeutralForeground2LinkHover))))',
  colorNeutralForeground2LinkPressed:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralForeground2LinkPressed))))',
  colorNeutralForeground2LinkSelected:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralForeground2LinkSelected))))',
  colorCompoundBrandForeground1: 'var(--test, var(--test2, var(--test3, var(--colorCompoundBrandForeground1))))',
  colorCompoundBrandForeground1Hover:
    'var(--test, var(--test2, var(--test3, var(--colorCompoundBrandForeground1Hover))))',
  colorCompoundBrandForeground1Pressed:
    'var(--test, var(--test2, var(--test3, var(--colorCompoundBrandForeground1Pressed))))',
  colorNeutralForegroundOnBrand: 'var(--test, var(--test2, var(--test3, var(--colorNeutralForegroundOnBrand))))',
  colorNeutralForegroundInverted: 'var(--test, var(--test2, var(--test3, var(--colorNeutralForegroundInverted))))',
  colorNeutralForegroundInvertedHover:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralForegroundInvertedHover))))',
  colorNeutralForegroundInvertedPressed:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralForegroundInvertedPressed))))',
  colorNeutralForegroundInvertedSelected:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralForegroundInvertedSelected))))',
  colorNeutralForegroundInverted2: 'var(--test, var(--test2, var(--test3, var(--colorNeutralForegroundInverted2))))',
  colorNeutralForegroundStaticInverted:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralForegroundStaticInverted))))',
  colorNeutralForegroundInvertedLink:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralForegroundInvertedLink))))',
  colorNeutralForegroundInvertedLinkHover:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralForegroundInvertedLinkHover))))',
  colorNeutralForegroundInvertedLinkPressed:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralForegroundInvertedLinkPressed))))',
  colorNeutralForegroundInvertedLinkSelected:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralForegroundInvertedLinkSelected))))',
  colorNeutralForegroundInvertedDisabled:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralForegroundInvertedDisabled))))',
  colorBrandForeground1: 'var(--test, var(--test2, var(--test3, var(--colorBrandForeground1))))',
  colorBrandForeground2: 'var(--test, var(--test2, var(--test3, var(--colorBrandForeground2))))',
  colorBrandForeground2Hover: 'var(--test, var(--test2, var(--test3, var(--colorBrandForeground2Hover))))',
  colorBrandForeground2Pressed: 'var(--test, var(--test2, var(--test3, var(--colorBrandForeground2Pressed))))',
  colorNeutralForeground1Static: 'var(--test, var(--test2, var(--test3, var(--colorNeutralForeground1Static))))',
  colorBrandForegroundInverted: 'var(--test, var(--test2, var(--test3, var(--colorBrandForegroundInverted))))',
  colorBrandForegroundInvertedHover:
    'var(--test, var(--test2, var(--test3, var(--colorBrandForegroundInvertedHover))))',
  colorBrandForegroundInvertedPressed:
    'var(--test, var(--test2, var(--test3, var(--colorBrandForegroundInvertedPressed))))',
  colorBrandForegroundOnLight: 'var(--test, var(--test2, var(--test3, var(--colorBrandForegroundOnLight))))',
  colorBrandForegroundOnLightHover: 'var(--test, var(--test2, var(--test3, var(--colorBrandForegroundOnLightHover))))',
  colorBrandForegroundOnLightPressed:
    'var(--test, var(--test2, var(--test3, var(--colorBrandForegroundOnLightPressed))))',
  colorBrandForegroundOnLightSelected:
    'var(--test, var(--test2, var(--test3, var(--colorBrandForegroundOnLightSelected))))',
  colorNeutralBackground1: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackground1))))',
  colorNeutralBackground1Hover: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackground1Hover))))',
  colorNeutralBackground1Pressed: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackground1Pressed))))',
  colorNeutralBackground1Selected: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackground1Selected))))',
  colorNeutralBackground2: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackground2))))',
  colorNeutralBackground2Hover: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackground2Hover))))',
  colorNeutralBackground2Pressed: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackground2Pressed))))',
  colorNeutralBackground2Selected: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackground2Selected))))',
  colorNeutralBackground3: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackground3))))',
  colorNeutralBackground3Hover: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackground3Hover))))',
  colorNeutralBackground3Pressed: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackground3Pressed))))',
  colorNeutralBackground3Selected: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackground3Selected))))',
  colorNeutralBackground4: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackground4))))',
  colorNeutralBackground4Hover: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackground4Hover))))',
  colorNeutralBackground4Pressed: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackground4Pressed))))',
  colorNeutralBackground4Selected: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackground4Selected))))',
  colorNeutralBackground5: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackground5))))',
  colorNeutralBackground5Hover: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackground5Hover))))',
  colorNeutralBackground5Pressed: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackground5Pressed))))',
  colorNeutralBackground5Selected: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackground5Selected))))',
  colorNeutralBackground6: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackground6))))',
  colorNeutralBackgroundInverted: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackgroundInverted))))',
  colorNeutralBackgroundStatic: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackgroundStatic))))',
  colorNeutralBackgroundAlpha: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackgroundAlpha))))',
  colorNeutralBackgroundAlpha2: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackgroundAlpha2))))',
  colorSubtleBackground: 'var(--test, var(--test2, var(--test3, var(--colorSubtleBackground))))',
  colorSubtleBackgroundHover: 'var(--test, var(--test2, var(--test3, var(--colorSubtleBackgroundHover))))',
  colorSubtleBackgroundPressed: 'var(--test, var(--test2, var(--test3, var(--colorSubtleBackgroundPressed))))',
  colorSubtleBackgroundSelected: 'var(--test, var(--test2, var(--test3, var(--colorSubtleBackgroundSelected))))',
  colorSubtleBackgroundLightAlphaHover:
    'var(--test, var(--test2, var(--test3, var(--colorSubtleBackgroundLightAlphaHover))))',
  colorSubtleBackgroundLightAlphaPressed:
    'var(--test, var(--test2, var(--test3, var(--colorSubtleBackgroundLightAlphaPressed))))',
  colorSubtleBackgroundLightAlphaSelected:
    'var(--test, var(--test2, var(--test3, var(--colorSubtleBackgroundLightAlphaSelected))))',
  colorSubtleBackgroundInverted: 'var(--test, var(--test2, var(--test3, var(--colorSubtleBackgroundInverted))))',
  colorSubtleBackgroundInvertedHover:
    'var(--test, var(--test2, var(--test3, var(--colorSubtleBackgroundInvertedHover))))',
  colorSubtleBackgroundInvertedPressed:
    'var(--test, var(--test2, var(--test3, var(--colorSubtleBackgroundInvertedPressed))))',
  colorSubtleBackgroundInvertedSelected:
    'var(--test, var(--test2, var(--test3, var(--colorSubtleBackgroundInvertedSelected))))',
  colorTransparentBackground: 'var(--test, var(--test2, var(--test3, var(--colorTransparentBackground))))',
  colorTransparentBackgroundHover: 'var(--test, var(--test2, var(--test3, var(--colorTransparentBackgroundHover))))',
  colorTransparentBackgroundPressed:
    'var(--test, var(--test2, var(--test3, var(--colorTransparentBackgroundPressed))))',
  colorTransparentBackgroundSelected:
    'var(--test, var(--test2, var(--test3, var(--colorTransparentBackgroundSelected))))',
  colorNeutralBackgroundDisabled: 'var(--test, var(--test2, var(--test3, var(--colorNeutralBackgroundDisabled))))',
  colorNeutralBackgroundInvertedDisabled:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralBackgroundInvertedDisabled))))',
  colorNeutralStencil1: 'var(--test, var(--test2, var(--test3, var(--colorNeutralStencil1))))',
  colorNeutralStencil2: 'var(--test, var(--test2, var(--test3, var(--colorNeutralStencil2))))',
  colorNeutralStencil1Alpha: 'var(--test, var(--test2, var(--test3, var(--colorNeutralStencil1Alpha))))',
  colorNeutralStencil2Alpha: 'var(--test, var(--test2, var(--test3, var(--colorNeutralStencil2Alpha))))',
  colorBackgroundOverlay: 'var(--test, var(--test2, var(--test3, var(--colorBackgroundOverlay))))',
  colorScrollbarOverlay: 'var(--test, var(--test2, var(--test3, var(--colorScrollbarOverlay))))',
  colorBrandBackground: 'var(--test, var(--test2, var(--test3, var(--colorBrandBackground))))',
  colorBrandBackgroundHover: 'var(--test, var(--test2, var(--test3, var(--colorBrandBackgroundHover))))',
  colorBrandBackgroundPressed: 'var(--test, var(--test2, var(--test3, var(--colorBrandBackgroundPressed))))',
  colorBrandBackgroundSelected: 'var(--test, var(--test2, var(--test3, var(--colorBrandBackgroundSelected))))',
  colorCompoundBrandBackground: 'var(--test, var(--test2, var(--test3, var(--colorCompoundBrandBackground))))',
  colorCompoundBrandBackgroundHover:
    'var(--test, var(--test2, var(--test3, var(--colorCompoundBrandBackgroundHover))))',
  colorCompoundBrandBackgroundPressed:
    'var(--test, var(--test2, var(--test3, var(--colorCompoundBrandBackgroundPressed))))',
  colorBrandBackgroundStatic: 'var(--test, var(--test2, var(--test3, var(--colorBrandBackgroundStatic))))',
  colorBrandBackground2: 'var(--test, var(--test2, var(--test3, var(--colorBrandBackground2))))',
  colorBrandBackground2Hover: 'var(--test, var(--test2, var(--test3, var(--colorBrandBackground2Hover))))',
  colorBrandBackground2Pressed: 'var(--test, var(--test2, var(--test3, var(--colorBrandBackground2Pressed))))',
  colorBrandBackground3Static: 'var(--test, var(--test2, var(--test3, var(--colorBrandBackground3Static))))',
  colorBrandBackground4Static: 'var(--test, var(--test2, var(--test3, var(--colorBrandBackground4Static))))',
  colorBrandBackgroundInverted: 'var(--test, var(--test2, var(--test3, var(--colorBrandBackgroundInverted))))',
  colorBrandBackgroundInvertedHover:
    'var(--test, var(--test2, var(--test3, var(--colorBrandBackgroundInvertedHover))))',
  colorBrandBackgroundInvertedPressed:
    'var(--test, var(--test2, var(--test3, var(--colorBrandBackgroundInvertedPressed))))',
  colorBrandBackgroundInvertedSelected:
    'var(--test, var(--test2, var(--test3, var(--colorBrandBackgroundInvertedSelected))))',
  colorNeutralCardBackground: 'var(--test, var(--test2, var(--test3, var(--colorNeutralCardBackground))))',
  colorNeutralCardBackgroundHover: 'var(--test, var(--test2, var(--test3, var(--colorNeutralCardBackgroundHover))))',
  colorNeutralCardBackgroundPressed:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralCardBackgroundPressed))))',
  colorNeutralCardBackgroundSelected:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralCardBackgroundSelected))))',
  colorNeutralCardBackgroundDisabled:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralCardBackgroundDisabled))))',
  colorNeutralStrokeAccessible: 'var(--test, var(--test2, var(--test3, var(--colorNeutralStrokeAccessible))))',
  colorNeutralStrokeAccessibleHover:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralStrokeAccessibleHover))))',
  colorNeutralStrokeAccessiblePressed:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralStrokeAccessiblePressed))))',
  colorNeutralStrokeAccessibleSelected:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralStrokeAccessibleSelected))))',
  colorNeutralStroke1: 'var(--test, var(--test2, var(--test3, var(--colorNeutralStroke1))))',
  colorNeutralStroke1Hover: 'var(--test, var(--test2, var(--test3, var(--colorNeutralStroke1Hover))))',
  colorNeutralStroke1Pressed: 'var(--test, var(--test2, var(--test3, var(--colorNeutralStroke1Pressed))))',
  colorNeutralStroke1Selected: 'var(--test, var(--test2, var(--test3, var(--colorNeutralStroke1Selected))))',
  colorNeutralStroke2: 'var(--test, var(--test2, var(--test3, var(--colorNeutralStroke2))))',
  colorNeutralStroke3: 'var(--test, var(--test2, var(--test3, var(--colorNeutralStroke3))))',
  colorNeutralStrokeSubtle: 'var(--test, var(--test2, var(--test3, var(--colorNeutralStrokeSubtle))))',
  colorNeutralStrokeOnBrand: 'var(--test, var(--test2, var(--test3, var(--colorNeutralStrokeOnBrand))))',
  colorNeutralStrokeOnBrand2: 'var(--test, var(--test2, var(--test3, var(--colorNeutralStrokeOnBrand2))))',
  colorNeutralStrokeOnBrand2Hover: 'var(--test, var(--test2, var(--test3, var(--colorNeutralStrokeOnBrand2Hover))))',
  colorNeutralStrokeOnBrand2Pressed:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralStrokeOnBrand2Pressed))))',
  colorNeutralStrokeOnBrand2Selected:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralStrokeOnBrand2Selected))))',
  colorBrandStroke1: 'var(--test, var(--test2, var(--test3, var(--colorBrandStroke1))))',
  colorBrandStroke2: 'var(--test, var(--test2, var(--test3, var(--colorBrandStroke2))))',
  colorBrandStroke2Hover: 'var(--test, var(--test2, var(--test3, var(--colorBrandStroke2Hover))))',
  colorBrandStroke2Pressed: 'var(--test, var(--test2, var(--test3, var(--colorBrandStroke2Pressed))))',
  colorBrandStroke2Contrast: 'var(--test, var(--test2, var(--test3, var(--colorBrandStroke2Contrast))))',
  colorCompoundBrandStroke: 'var(--test, var(--test2, var(--test3, var(--colorCompoundBrandStroke))))',
  colorCompoundBrandStrokeHover: 'var(--test, var(--test2, var(--test3, var(--colorCompoundBrandStrokeHover))))',
  colorCompoundBrandStrokePressed: 'var(--test, var(--test2, var(--test3, var(--colorCompoundBrandStrokePressed))))',
  colorNeutralStrokeDisabled: 'var(--test, var(--test2, var(--test3, var(--colorNeutralStrokeDisabled))))',
  colorNeutralStrokeInvertedDisabled:
    'var(--test, var(--test2, var(--test3, var(--colorNeutralStrokeInvertedDisabled))))',
  colorTransparentStroke: 'var(--test, var(--test2, var(--test3, var(--colorTransparentStroke))))',
  colorTransparentStrokeInteractive:
    'var(--test, var(--test2, var(--test3, var(--colorTransparentStrokeInteractive))))',
  colorTransparentStrokeDisabled: 'var(--test, var(--test2, var(--test3, var(--colorTransparentStrokeDisabled))))',
  colorNeutralStrokeAlpha: 'var(--test, var(--test2, var(--test3, var(--colorNeutralStrokeAlpha))))',
  colorNeutralStrokeAlpha2: 'var(--test, var(--test2, var(--test3, var(--colorNeutralStrokeAlpha2))))',
  colorStrokeFocus1: 'var(--test, var(--test2, var(--test3, var(--colorStrokeFocus1))))',
  colorStrokeFocus2: 'var(--test, var(--test2, var(--test3, var(--colorStrokeFocus2))))',
  colorNeutralShadowAmbient: 'var(--test, var(--test2, var(--test3, var(--colorNeutralShadowAmbient))))',
  colorNeutralShadowKey: 'var(--test, var(--test2, var(--test3, var(--colorNeutralShadowKey))))',
  colorNeutralShadowAmbientLighter: 'var(--test, var(--test2, var(--test3, var(--colorNeutralShadowAmbientLighter))))',
  colorNeutralShadowKeyLighter: 'var(--test, var(--test2, var(--test3, var(--colorNeutralShadowKeyLighter))))',
  colorNeutralShadowAmbientDarker: 'var(--test, var(--test2, var(--test3, var(--colorNeutralShadowAmbientDarker))))',
  colorNeutralShadowKeyDarker: 'var(--test, var(--test2, var(--test3, var(--colorNeutralShadowKeyDarker))))',
  colorBrandShadowAmbient: 'var(--test, var(--test2, var(--test3, var(--colorBrandShadowAmbient))))',
  colorBrandShadowKey: 'var(--test, var(--test2, var(--test3, var(--colorBrandShadowKey))))',

  // Color palette tokens

  // Color palette red tokens
  colorPaletteRedBackground1: 'var(--test, var(--test2, var(--test3, var(--colorPaletteRedBackground1))))',
  colorPaletteRedBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteRedBackground2))))',
  colorPaletteRedBackground3: 'var(--test, var(--test2, var(--test3, var(--colorPaletteRedBackground3))))',
  colorPaletteRedBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPaletteRedBorderActive))))',
  colorPaletteRedBorder1: 'var(--test, var(--test2, var(--test3, var(--colorPaletteRedBorder1))))',
  colorPaletteRedBorder2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteRedBorder2))))',
  colorPaletteRedForeground1: 'var(--test, var(--test2, var(--test3, var(--colorPaletteRedForeground1))))',
  colorPaletteRedForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteRedForeground2))))',
  colorPaletteRedForeground3: 'var(--test, var(--test2, var(--test3, var(--colorPaletteRedForeground3))))',
  colorPaletteRedForegroundInverted:
    'var(--test, var(--test2, var(--test3, var(--colorPaletteRedForegroundInverted))))',

  // Color palette green tokens
  colorPaletteGreenBackground1: 'var(--test, var(--test2, var(--test3, var(--colorPaletteGreenBackground1))))',
  colorPaletteGreenBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteGreenBackground2))))',
  colorPaletteGreenBackground3: 'var(--test, var(--test2, var(--test3, var(--colorPaletteGreenBackground3))))',
  colorPaletteGreenBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPaletteGreenBorderActive))))',
  colorPaletteGreenBorder1: 'var(--test, var(--test2, var(--test3, var(--colorPaletteGreenBorder1))))',
  colorPaletteGreenBorder2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteGreenBorder2))))',
  colorPaletteGreenForeground1: 'var(--test, var(--test2, var(--test3, var(--colorPaletteGreenForeground1))))',
  colorPaletteGreenForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteGreenForeground2))))',
  colorPaletteGreenForeground3: 'var(--test, var(--test2, var(--test3, var(--colorPaletteGreenForeground3))))',
  colorPaletteGreenForegroundInverted:
    'var(--test, var(--test2, var(--test3, var(--colorPaletteGreenForegroundInverted))))',

  // Color palette dark orange tokens
  colorPaletteDarkOrangeBackground1:
    'var(--test, var(--test2, var(--test3, var(--colorPaletteDarkOrangeBackground1))))',
  colorPaletteDarkOrangeBackground2:
    'var(--test, var(--test2, var(--test3, var(--colorPaletteDarkOrangeBackground2))))',
  colorPaletteDarkOrangeBackground3:
    'var(--test, var(--test2, var(--test3, var(--colorPaletteDarkOrangeBackground3))))',
  colorPaletteDarkOrangeBorderActive:
    'var(--test, var(--test2, var(--test3, var(--colorPaletteDarkOrangeBorderActive))))',
  colorPaletteDarkOrangeBorder1: 'var(--test, var(--test2, var(--test3, var(--colorPaletteDarkOrangeBorder1))))',
  colorPaletteDarkOrangeBorder2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteDarkOrangeBorder2))))',
  colorPaletteDarkOrangeForeground1:
    'var(--test, var(--test2, var(--test3, var(--colorPaletteDarkOrangeForeground1))))',
  colorPaletteDarkOrangeForeground2:
    'var(--test, var(--test2, var(--test3, var(--colorPaletteDarkOrangeForeground2))))',
  colorPaletteDarkOrangeForeground3:
    'var(--test, var(--test2, var(--test3, var(--colorPaletteDarkOrangeForeground3))))',

  // Color palette yellow tokens
  colorPaletteYellowBackground1: 'var(--test, var(--test2, var(--test3, var(--colorPaletteYellowBackground1))))',
  colorPaletteYellowBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteYellowBackground2))))',
  colorPaletteYellowBackground3: 'var(--test, var(--test2, var(--test3, var(--colorPaletteYellowBackground3))))',
  colorPaletteYellowBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPaletteYellowBorderActive))))',
  colorPaletteYellowBorder1: 'var(--test, var(--test2, var(--test3, var(--colorPaletteYellowBorder1))))',
  colorPaletteYellowBorder2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteYellowBorder2))))',
  colorPaletteYellowForeground1: 'var(--test, var(--test2, var(--test3, var(--colorPaletteYellowForeground1))))',
  colorPaletteYellowForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteYellowForeground2))))',
  colorPaletteYellowForeground3: 'var(--test, var(--test2, var(--test3, var(--colorPaletteYellowForeground3))))',
  colorPaletteYellowForegroundInverted:
    'var(--test, var(--test2, var(--test3, var(--colorPaletteYellowForegroundInverted))))',

  // Color palette berry tokens
  colorPaletteBerryBackground1: 'var(--test, var(--test2, var(--test3, var(--colorPaletteBerryBackground1))))',
  colorPaletteBerryBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteBerryBackground2))))',
  colorPaletteBerryBackground3: 'var(--test, var(--test2, var(--test3, var(--colorPaletteBerryBackground3))))',
  colorPaletteBerryBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPaletteBerryBorderActive))))',
  colorPaletteBerryBorder1: 'var(--test, var(--test2, var(--test3, var(--colorPaletteBerryBorder1))))',
  colorPaletteBerryBorder2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteBerryBorder2))))',
  colorPaletteBerryForeground1: 'var(--test, var(--test2, var(--test3, var(--colorPaletteBerryForeground1))))',
  colorPaletteBerryForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteBerryForeground2))))',
  colorPaletteBerryForeground3: 'var(--test, var(--test2, var(--test3, var(--colorPaletteBerryForeground3))))',

  // Color palette marigold tokens
  colorPaletteMarigoldBackground1: 'var(--test, var(--test2, var(--test3, var(--colorPaletteMarigoldBackground1))))',
  colorPaletteMarigoldBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteMarigoldBackground2))))',
  colorPaletteMarigoldBackground3: 'var(--test, var(--test2, var(--test3, var(--colorPaletteMarigoldBackground3))))',
  colorPaletteMarigoldBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPaletteMarigoldBorderActive))))',
  colorPaletteMarigoldBorder1: 'var(--test, var(--test2, var(--test3, var(--colorPaletteMarigoldBorder1))))',
  colorPaletteMarigoldBorder2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteMarigoldBorder2))))',
  colorPaletteMarigoldForeground1: 'var(--test, var(--test2, var(--test3, var(--colorPaletteMarigoldForeground1))))',
  colorPaletteMarigoldForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteMarigoldForeground2))))',
  colorPaletteMarigoldForeground3: 'var(--test, var(--test2, var(--test3, var(--colorPaletteMarigoldForeground3))))',

  // Color palette light green tokens
  colorPaletteLightGreenBackground1:
    'var(--test, var(--test2, var(--test3, var(--colorPaletteLightGreenBackground1))))',
  colorPaletteLightGreenBackground2:
    'var(--test, var(--test2, var(--test3, var(--colorPaletteLightGreenBackground2))))',
  colorPaletteLightGreenBackground3:
    'var(--test, var(--test2, var(--test3, var(--colorPaletteLightGreenBackground3))))',
  colorPaletteLightGreenBorderActive:
    'var(--test, var(--test2, var(--test3, var(--colorPaletteLightGreenBorderActive))))',
  colorPaletteLightGreenBorder1: 'var(--test, var(--test2, var(--test3, var(--colorPaletteLightGreenBorder1))))',
  colorPaletteLightGreenBorder2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteLightGreenBorder2))))',
  colorPaletteLightGreenForeground1:
    'var(--test, var(--test2, var(--test3, var(--colorPaletteLightGreenForeground1))))',
  colorPaletteLightGreenForeground2:
    'var(--test, var(--test2, var(--test3, var(--colorPaletteLightGreenForeground2))))',
  colorPaletteLightGreenForeground3:
    'var(--test, var(--test2, var(--test3, var(--colorPaletteLightGreenForeground3))))',

  // Color palette anchor tokens
  colorPaletteAnchorBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteAnchorBackground2))))',
  colorPaletteAnchorBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPaletteAnchorBorderActive))))',
  colorPaletteAnchorForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteAnchorForeground2))))',

  // Color palette beige tokens
  colorPaletteBeigeBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteBeigeBackground2))))',
  colorPaletteBeigeBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPaletteBeigeBorderActive))))',
  colorPaletteBeigeForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteBeigeForeground2))))',

  // Color palette blue tokens
  colorPaletteBlueBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteBlueBackground2))))',
  colorPaletteBlueBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPaletteBlueBorderActive))))',
  colorPaletteBlueForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteBlueForeground2))))',

  // Color palette brass tokens
  colorPaletteBrassBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteBrassBackground2))))',
  colorPaletteBrassBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPaletteBrassBorderActive))))',
  colorPaletteBrassForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteBrassForeground2))))',

  // Color palette brown tokens
  colorPaletteBrownBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteBrownBackground2))))',
  colorPaletteBrownBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPaletteBrownBorderActive))))',
  colorPaletteBrownForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteBrownForeground2))))',

  // Color palette cornflower tokens
  colorPaletteCornflowerBackground2:
    'var(--test, var(--test2, var(--test3, var(--colorPaletteCornflowerBackground2))))',
  colorPaletteCornflowerBorderActive:
    'var(--test, var(--test2, var(--test3, var(--colorPaletteCornflowerBorderActive))))',
  colorPaletteCornflowerForeground2:
    'var(--test, var(--test2, var(--test3, var(--colorPaletteCornflowerForeground2))))',

  // Color palette cranberry tokens
  colorPaletteCranberryBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteCranberryBackground2))))',
  colorPaletteCranberryBorderActive:
    'var(--test, var(--test2, var(--test3, var(--colorPaletteCranberryBorderActive))))',
  colorPaletteCranberryForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteCranberryForeground2))))',

  // Color palette dark green tokens
  colorPaletteDarkGreenBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteDarkGreenBackground2))))',
  colorPaletteDarkGreenBorderActive:
    'var(--test, var(--test2, var(--test3, var(--colorPaletteDarkGreenBorderActive))))',
  colorPaletteDarkGreenForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteDarkGreenForeground2))))',

  // Color palette dark red tokens
  colorPaletteDarkRedBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteDarkRedBackground2))))',
  colorPaletteDarkRedBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPaletteDarkRedBorderActive))))',
  colorPaletteDarkRedForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteDarkRedForeground2))))',

  // Color palette forest tokens
  colorPaletteForestBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteForestBackground2))))',
  colorPaletteForestBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPaletteForestBorderActive))))',
  colorPaletteForestForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteForestForeground2))))',

  // Color palette gold tokens
  colorPaletteGoldBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteGoldBackground2))))',
  colorPaletteGoldBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPaletteGoldBorderActive))))',
  colorPaletteGoldForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteGoldForeground2))))',

  // Color palette grape tokens
  colorPaletteGrapeBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteGrapeBackground2))))',
  colorPaletteGrapeBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPaletteGrapeBorderActive))))',
  colorPaletteGrapeForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteGrapeForeground2))))',

  // Color palette lavender tokens
  colorPaletteLavenderBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteLavenderBackground2))))',
  colorPaletteLavenderBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPaletteLavenderBorderActive))))',
  colorPaletteLavenderForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteLavenderForeground2))))',

  // Color palette light teal tokens
  colorPaletteLightTealBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteLightTealBackground2))))',
  colorPaletteLightTealBorderActive:
    'var(--test, var(--test2, var(--test3, var(--colorPaletteLightTealBorderActive))))',
  colorPaletteLightTealForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteLightTealForeground2))))',

  // Color palette lilac tokens
  colorPaletteLilacBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteLilacBackground2))))',
  colorPaletteLilacBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPaletteLilacBorderActive))))',
  colorPaletteLilacForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteLilacForeground2))))',

  // Color palette magenta tokens
  colorPaletteMagentaBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteMagentaBackground2))))',
  colorPaletteMagentaBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPaletteMagentaBorderActive))))',
  colorPaletteMagentaForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteMagentaForeground2))))',

  // Color palette mink tokens
  colorPaletteMinkBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteMinkBackground2))))',
  colorPaletteMinkBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPaletteMinkBorderActive))))',
  colorPaletteMinkForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteMinkForeground2))))',

  // Color palette navy tokens
  colorPaletteNavyBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteNavyBackground2))))',
  colorPaletteNavyBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPaletteNavyBorderActive))))',
  colorPaletteNavyForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteNavyForeground2))))',

  // Color palette peach tokens
  colorPalettePeachBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPalettePeachBackground2))))',
  colorPalettePeachBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPalettePeachBorderActive))))',
  colorPalettePeachForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPalettePeachForeground2))))',

  // Color palette pink tokens
  colorPalettePinkBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPalettePinkBackground2))))',
  colorPalettePinkBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPalettePinkBorderActive))))',
  colorPalettePinkForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPalettePinkForeground2))))',

  // Color palette platinum tokens
  colorPalettePlatinumBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPalettePlatinumBackground2))))',
  colorPalettePlatinumBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPalettePlatinumBorderActive))))',
  colorPalettePlatinumForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPalettePlatinumForeground2))))',

  // Color palette plum tokens
  colorPalettePlumBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPalettePlumBackground2))))',
  colorPalettePlumBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPalettePlumBorderActive))))',
  colorPalettePlumForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPalettePlumForeground2))))',

  // Color palette pumpkin tokens
  colorPalettePumpkinBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPalettePumpkinBackground2))))',
  colorPalettePumpkinBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPalettePumpkinBorderActive))))',
  colorPalettePumpkinForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPalettePumpkinForeground2))))',

  // Color palette purple tokens
  colorPalettePurpleBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPalettePurpleBackground2))))',
  colorPalettePurpleBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPalettePurpleBorderActive))))',
  colorPalettePurpleForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPalettePurpleForeground2))))',

  // Color palette royal blue tokens
  colorPaletteRoyalBlueBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteRoyalBlueBackground2))))',
  colorPaletteRoyalBlueBorderActive:
    'var(--test, var(--test2, var(--test3, var(--colorPaletteRoyalBlueBorderActive))))',
  colorPaletteRoyalBlueForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteRoyalBlueForeground2))))',

  // Color palette seafoam tokens
  colorPaletteSeafoamBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteSeafoamBackground2))))',
  colorPaletteSeafoamBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPaletteSeafoamBorderActive))))',
  colorPaletteSeafoamForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteSeafoamForeground2))))',

  // Color palette steel tokens
  colorPaletteSteelBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteSteelBackground2))))',
  colorPaletteSteelBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPaletteSteelBorderActive))))',
  colorPaletteSteelForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteSteelForeground2))))',

  // Color palette teal tokens
  colorPaletteTealBackground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteTealBackground2))))',
  colorPaletteTealBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorPaletteTealBorderActive))))',
  colorPaletteTealForeground2: 'var(--test, var(--test2, var(--test3, var(--colorPaletteTealForeground2))))',

  // Color status success tokens
  colorStatusSuccessBackground1: 'var(--test, var(--test2, var(--test3, var(--colorStatusSuccessBackground1))))',
  colorStatusSuccessBackground2: 'var(--test, var(--test2, var(--test3, var(--colorStatusSuccessBackground2))))',
  colorStatusSuccessBackground3: 'var(--test, var(--test2, var(--test3, var(--colorStatusSuccessBackground3))))',
  colorStatusSuccessForeground1: 'var(--test, var(--test2, var(--test3, var(--colorStatusSuccessForeground1))))',
  colorStatusSuccessForeground2: 'var(--test, var(--test2, var(--test3, var(--colorStatusSuccessForeground2))))',
  colorStatusSuccessForeground3: 'var(--test, var(--test2, var(--test3, var(--colorStatusSuccessForeground3))))',
  colorStatusSuccessForegroundInverted:
    'var(--test, var(--test2, var(--test3, var(--colorStatusSuccessForegroundInverted))))',
  colorStatusSuccessBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorStatusSuccessBorderActive))))',
  colorStatusSuccessBorder1: 'var(--test, var(--test2, var(--test3, var(--colorStatusSuccessBorder1))))',
  colorStatusSuccessBorder2: 'var(--test, var(--test2, var(--test3, var(--colorStatusSuccessBorder2))))',

  // Color status warning tokens
  colorStatusWarningBackground1: 'var(--test, var(--test2, var(--test3, var(--colorStatusWarningBackground1))))',
  colorStatusWarningBackground2: 'var(--test, var(--test2, var(--test3, var(--colorStatusWarningBackground2))))',
  colorStatusWarningBackground3: 'var(--test, var(--test2, var(--test3, var(--colorStatusWarningBackground3))))',
  colorStatusWarningForeground1: 'var(--test, var(--test2, var(--test3, var(--colorStatusWarningForeground1))))',
  colorStatusWarningForeground2: 'var(--test, var(--test2, var(--test3, var(--colorStatusWarningForeground2))))',
  colorStatusWarningForeground3: 'var(--test, var(--test2, var(--test3, var(--colorStatusWarningForeground3))))',
  colorStatusWarningForegroundInverted:
    'var(--test, var(--test2, var(--test3, var(--colorStatusWarningForegroundInverted))))',
  colorStatusWarningBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorStatusWarningBorderActive))))',
  colorStatusWarningBorder1: 'var(--test, var(--test2, var(--test3, var(--colorStatusWarningBorder1))))',
  colorStatusWarningBorder2: 'var(--test, var(--test2, var(--test3, var(--colorStatusWarningBorder2))))',

  // Color status danger tokens
  colorStatusDangerBackground1: 'var(--test, var(--test2, var(--test3, var(--colorStatusDangerBackground1))))',
  colorStatusDangerBackground2: 'var(--test, var(--test2, var(--test3, var(--colorStatusDangerBackground2))))',
  colorStatusDangerBackground3: 'var(--test, var(--test2, var(--test3, var(--colorStatusDangerBackground3))))',
  colorStatusDangerBackground3Hover:
    'var(--test, var(--test2, var(--test3, var(--colorStatusDangerBackground3Hover))))',
  colorStatusDangerBackground3Pressed:
    'var(--test, var(--test2, var(--test3, var(--colorStatusDangerBackground3Pressed))))',
  colorStatusDangerForeground1: 'var(--test, var(--test2, var(--test3, var(--colorStatusDangerForeground1))))',
  colorStatusDangerForeground2: 'var(--test, var(--test2, var(--test3, var(--colorStatusDangerForeground2))))',
  colorStatusDangerForeground3: 'var(--test, var(--test2, var(--test3, var(--colorStatusDangerForeground3))))',
  colorStatusDangerForegroundInverted:
    'var(--test, var(--test2, var(--test3, var(--colorStatusDangerForegroundInverted))))',
  colorStatusDangerBorderActive: 'var(--test, var(--test2, var(--test3, var(--colorStatusDangerBorderActive))))',
  colorStatusDangerBorder1: 'var(--test, var(--test2, var(--test3, var(--colorStatusDangerBorder1))))',
  colorStatusDangerBorder2: 'var(--test, var(--test2, var(--test3, var(--colorStatusDangerBorder2))))',

  // Border radius tokens
  borderRadiusNone: 'var(--test, var(--test2, var(--test3, var(--borderRadiusNone))))',
  borderRadiusSmall: 'var(--test, var(--test2, var(--test3, var(--borderRadiusSmall))))',
  borderRadiusMedium: 'var(--test, var(--test2, var(--test3, var(--borderRadiusMedium))))',
  borderRadiusLarge: 'var(--test, var(--test2, var(--test3, var(--borderRadiusLarge))))',
  borderRadiusXLarge: 'var(--test, var(--test2, var(--test3, var(--borderRadiusXLarge))))',
  borderRadiusCircular: 'var(--test, var(--test2, var(--test3, var(--borderRadiusCircular))))',

  // Font family tokens
  fontFamilyBase: 'var(--test, var(--test2, var(--test3, var(--fontFamilyBase))))',
  fontFamilyMonospace: 'var(--test, var(--test2, var(--test3, var(--fontFamilyMonospace))))',
  fontFamilyNumeric: 'var(--test, var(--test2, var(--test3, var(--fontFamilyNumeric))))',

  // Font size tokens
  fontSizeBase100: 'var(--test, var(--test2, var(--test3, var(--fontSizeBase100))))',
  fontSizeBase200: 'var(--test, var(--test2, var(--test3, var(--fontSizeBase200))))',
  fontSizeBase300: 'var(--test, var(--test2, var(--test3, var(--fontSizeBase300))))',
  fontSizeBase400: 'var(--test, var(--test2, var(--test3, var(--fontSizeBase400))))',
  fontSizeBase500: 'var(--test, var(--test2, var(--test3, var(--fontSizeBase500))))',
  fontSizeBase600: 'var(--test, var(--test2, var(--test3, var(--fontSizeBase600))))',
  fontSizeHero700: 'var(--test, var(--test2, var(--test3, var(--fontSizeHero700))))',
  fontSizeHero800: 'var(--test, var(--test2, var(--test3, var(--fontSizeHero800))))',
  fontSizeHero900: 'var(--test, var(--test2, var(--test3, var(--fontSizeHero900))))',
  fontSizeHero1000: 'var(--test, var(--test2, var(--test3, var(--fontSizeHero1000))))',

  // Font weight tokens
  fontWeightRegular: 'var(--test, var(--test2, var(--test3, var(--fontWeightRegular))))',
  fontWeightMedium: 'var(--test, var(--test2, var(--test3, var(--fontWeightMedium))))',
  fontWeightSemibold: 'var(--test, var(--test2, var(--test3, var(--fontWeightSemibold))))',
  fontWeightBold: 'var(--test, var(--test2, var(--test3, var(--fontWeightBold))))',

  // Line height tokens
  lineHeightBase100: 'var(--test, var(--test2, var(--test3, var(--lineHeightBase100))))',
  lineHeightBase200: 'var(--test, var(--test2, var(--test3, var(--lineHeightBase200))))',
  lineHeightBase300: 'var(--test, var(--test2, var(--test3, var(--lineHeightBase300))))',
  lineHeightBase400: 'var(--test, var(--test2, var(--test3, var(--lineHeightBase400))))',
  lineHeightBase500: 'var(--test, var(--test2, var(--test3, var(--lineHeightBase500))))',
  lineHeightBase600: 'var(--test, var(--test2, var(--test3, var(--lineHeightBase600))))',
  lineHeightHero700: 'var(--test, var(--test2, var(--test3, var(--lineHeightHero700))))',
  lineHeightHero800: 'var(--test, var(--test2, var(--test3, var(--lineHeightHero800))))',
  lineHeightHero900: 'var(--test, var(--test2, var(--test3, var(--lineHeightHero900))))',
  lineHeightHero1000: 'var(--test, var(--test2, var(--test3, var(--lineHeightHero1000))))',

  // Shadow tokens
  shadow2: 'var(--test, var(--test2, var(--test3, var(--shadow2))))',
  shadow4: 'var(--test, var(--test2, var(--test3, var(--shadow4))))',
  shadow8: 'var(--test, var(--test2, var(--test3, var(--shadow8))))',
  shadow16: 'var(--test, var(--test2, var(--test3, var(--shadow16))))',
  shadow28: 'var(--test, var(--test2, var(--test3, var(--shadow28))))',
  shadow64: 'var(--test, var(--test2, var(--test3, var(--shadow64))))',

  // Shadow brand tokens
  shadow2Brand: 'var(--test, var(--test2, var(--test3, var(--shadow2Brand))))',
  shadow4Brand: 'var(--test, var(--test2, var(--test3, var(--shadow4Brand))))',
  shadow8Brand: 'var(--test, var(--test2, var(--test3, var(--shadow8Brand))))',
  shadow16Brand: 'var(--test, var(--test2, var(--test3, var(--shadow16Brand))))',
  shadow28Brand: 'var(--test, var(--test2, var(--test3, var(--shadow28Brand))))',
  shadow64Brand: 'var(--test, var(--test2, var(--test3, var(--shadow64Brand))))',

  // Stroke width tokens
  strokeWidthThin: 'var(--test, var(--test2, var(--test3, var(--strokeWidthThin))))',
  strokeWidthThick: 'var(--test, var(--test2, var(--test3, var(--strokeWidthThick))))',
  strokeWidthThicker: 'var(--test, var(--test2, var(--test3, var(--strokeWidthThicker))))',
  strokeWidthThickest: 'var(--test, var(--test2, var(--test3, var(--strokeWidthThickest))))',

  // Spacings
  spacingHorizontalNone: 'var(--test, var(--test2, var(--test3, var(--spacingHorizontalNone))))',
  spacingHorizontalXXS: 'var(--test, var(--test2, var(--test3, var(--spacingHorizontalXXS))))',
  spacingHorizontalXS: 'var(--test, var(--test2, var(--test3, var(--spacingHorizontalXS))))',
  spacingHorizontalSNudge: 'var(--test, var(--test2, var(--test3, var(--spacingHorizontalSNudge))))',
  spacingHorizontalS: 'var(--test, var(--test2, var(--test3, var(--spacingHorizontalS))))',
  spacingHorizontalMNudge: 'var(--test, var(--test2, var(--test3, var(--spacingHorizontalMNudge))))',
  spacingHorizontalM: 'var(--test, var(--test2, var(--test3, var(--spacingHorizontalM))))',
  spacingHorizontalL: 'var(--test, var(--test2, var(--test3, var(--spacingHorizontalL))))',
  spacingHorizontalXL: 'var(--test, var(--test2, var(--test3, var(--spacingHorizontalXL))))',
  spacingHorizontalXXL: 'var(--test, var(--test2, var(--test3, var(--spacingHorizontalXXL))))',
  spacingHorizontalXXXL: 'var(--test, var(--test2, var(--test3, var(--spacingHorizontalXXXL))))',

  spacingVerticalNone: 'var(--test, var(--test2, var(--test3, var(--spacingVerticalNone))))',
  spacingVerticalXXS: 'var(--test, var(--test2, var(--test3, var(--spacingVerticalXXS))))',
  spacingVerticalXS: 'var(--test, var(--test2, var(--test3, var(--spacingVerticalXS))))',
  spacingVerticalSNudge: 'var(--test, var(--test2, var(--test3, var(--spacingVerticalSNudge))))',
  spacingVerticalS: 'var(--test, var(--test2, var(--test3, var(--spacingVerticalS))))',
  spacingVerticalMNudge: 'var(--test, var(--test2, var(--test3, var(--spacingVerticalMNudge))))',
  spacingVerticalM: 'var(--test, var(--test2, var(--test3, var(--spacingVerticalM))))',
  spacingVerticalL: 'var(--test, var(--test2, var(--test3, var(--spacingVerticalL))))',
  spacingVerticalXL: 'var(--test, var(--test2, var(--test3, var(--spacingVerticalXL))))',
  spacingVerticalXXL: 'var(--test, var(--test2, var(--test3, var(--spacingVerticalXXL))))',
  spacingVerticalXXXL: 'var(--test, var(--test2, var(--test3, var(--spacingVerticalXXXL))))',

  // Durations
  durationUltraFast: 'var(--test, var(--test2, var(--test3, var(--durationUltraFast))))',
  durationFaster: 'var(--test, var(--test2, var(--test3, var(--durationFaster))))',
  durationFast: 'var(--test, var(--test2, var(--test3, var(--durationFast))))',
  durationNormal: 'var(--test, var(--test2, var(--test3, var(--durationNormal))))',
  durationGentle: 'var(--test, var(--test2, var(--test3, var(--durationGentle))))',
  durationSlow: 'var(--test, var(--test2, var(--test3, var(--durationSlow))))',
  durationSlower: 'var(--test, var(--test2, var(--test3, var(--durationSlower))))',
  durationUltraSlow: 'var(--test, var(--test2, var(--test3, var(--durationUltraSlow))))',

  // Curves
  curveAccelerateMax: 'var(--test, var(--test2, var(--test3, var(--curveAccelerateMax))))',
  curveAccelerateMid: 'var(--test, var(--test2, var(--test3, var(--curveAccelerateMid))))',
  curveAccelerateMin: 'var(--test, var(--test2, var(--test3, var(--curveAccelerateMin))))',
  curveDecelerateMax: 'var(--test, var(--test2, var(--test3, var(--curveDecelerateMax))))',
  curveDecelerateMid: 'var(--test, var(--test2, var(--test3, var(--curveDecelerateMid))))',
  curveDecelerateMin: 'var(--test, var(--test2, var(--test3, var(--curveDecelerateMin))))',
  curveEasyEaseMax: 'var(--test, var(--test2, var(--test3, var(--curveEasyEaseMax))))',
  curveEasyEase: 'var(--test, var(--test2, var(--test3, var(--curveEasyEase))))',
  curveLinear: 'var(--test, var(--test2, var(--test3, var(--curveLinear))))',
};

export { AnimationClassNames, FontClassNames, ColorClassNames } from './classNames/index';

export {
  AnimationStyles,
  AnimationVariables,
  DefaultPalette,
  DefaultEffects,
  DefaultFontStyles,
  registerDefaultFontFaces,
  FontSizes,
  FontWeights,
  IconFontSizes,
  createFontStyles,
  hiddenContentStyle,
  PulsingBeaconAnimationStyles,
  getGlobalClassNames,
  // eslint-disable-next-line deprecation/deprecation
  getFocusStyle,
  getFocusOutlineStyle,
  getInputFocusStyle,
  getThemedContext,
  focusClear,
  ThemeSettingName,
  getTheme,
  loadTheme,
  createTheme,
  registerOnThemeChangeCallback,
  removeOnThemeChangeCallback,
  HighContrastSelector,
  HighContrastSelectorWhite,
  HighContrastSelectorBlack,
  // eslint-disable-next-line deprecation/deprecation
  EdgeChromiumHighContrastSelector,
  ScreenWidthMinSmall,
  ScreenWidthMinMedium,
  ScreenWidthMinLarge,
  ScreenWidthMinXLarge,
  ScreenWidthMinXXLarge,
  ScreenWidthMinXXXLarge,
  ScreenWidthMaxSmall,
  ScreenWidthMaxMedium,
  ScreenWidthMaxLarge,
  ScreenWidthMaxXLarge,
  ScreenWidthMaxXXLarge,
  ScreenWidthMinUhfMobile,
  getScreenSelector,
  getHighContrastNoAdjustStyle,
  // eslint-disable-next-line deprecation/deprecation
  getEdgeChromiumNoHighContrastAdjustSelector,
  normalize,
  noWrap,
  getFadedOverflowStyle,
  getPlaceholderStyles,
  ZIndexes,
} from './styles/index';
export type { GlobalClassNames } from './styles/index';

export {
  buildClassMap,
  getIcon,
  registerIcons,
  registerIconAlias,
  unregisterIcons,
  setIconOptions,
  getIconClassName,
} from './utilities/index';
export type { IIconRecord, IIconSubset, IIconSubsetRecord, IIconOptions } from './utilities/index';

export type {
  IAnimationStyles,
  IAnimationVariables,
  IGetFocusStylesOptions,
  IEffects,
  IFontStyles,
  IPalette,
  ISemanticColors,
  ISemanticTextColors,
  ISpacing,
  ITheme,
  IPartialTheme,
  IScheme,
  ISchemeNames,
} from './interfaces/index';

export {
  InjectionMode,
  Stylesheet,
  concatStyleSets,
  concatStyleSetsWithProps,
  fontFace,
  keyframes,
  mergeStyleSets,
  mergeStyles,
} from './MergeStyles';
export type {
  IFontFace,
  IFontWeight,
  IRawStyle,
  IStyle,
  IStyleSet,
  IStyleSetBase,
  IProcessedStyleSet,
  IStyleSheetConfig,
  ICSPSettings,
  ShadowConfig,
} from './MergeStyles';

export { FLUENT_CDN_BASE_URL } from './cdn';

import './version';

// Ensure theme is initialized when this package is referenced.
import { initializeThemeInCustomizations } from './styles/theme';
initializeThemeInCustomizations();

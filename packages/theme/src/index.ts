export { mergeThemes } from './mergeThemes';
export type {
  ComponentStyles,
  ComponentsStyles,
  IAnimationStyles,
  IAnimationVariables,
  IEffects,
  IFontStyles,
  IPalette,
  IPartialTheme,
  IScheme,
  ISchemeNames,
  ISemanticColors,
  ISemanticTextColors,
  ISpacing,
  ITheme,
  PartialTheme,
  Theme,
} from './types/index';
export { CommunicationColors, DefaultPalette, NeutralColors, SharedColors } from './colors/index';
export { DefaultEffects, Depths } from './effects/index';
export { DefaultSpacing } from './spacing/index';
export { AnimationStyles, AnimationVariables, MotionAnimations, MotionDurations, MotionTimings } from './motion/index';
export {
  DefaultFontStyles,
  FontSizes,
  FontWeights,
  IconFontSizes,
  LocalizedFontFamilies,
  LocalizedFontNames,
  createFontStyles,
  registerDefaultFontFaces,
} from './fonts/index';
export { createTheme } from './createTheme';
export { FluentTheme } from './FluentTheme';

import './version';

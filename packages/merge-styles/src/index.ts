export type { IStyle, IStyleBase, IStyleBaseArray } from './IStyle';

export type { IRawStyle } from './IRawStyle';

export type { IKeyframes } from './IKeyframes';

export type { IStyleFunction, IStyleFunctionOrObject } from './IStyleFunction';

export type { DeepPartial } from './DeepPartial';

// eslint-disable-next-line deprecation/deprecation
export type { IConcatenatedStyleSet, IProcessedStyleSet, IStyleSet, Omit } from './IStyleSet';

export type {
  ICSSRule,
  ICSSPixelUnitRule,
  IFontFace,
  IFontWeight,
  IRawFontStyle,
  IRawStyleBase,
} from './IRawStyleBase';

export { mergeStyles, mergeCss } from './mergeStyles';

export { mergeStyleSets, mergeCssSets } from './mergeStyleSets';

export { concatStyleSets } from './concatStyleSets';

export { concatStyleSetsWithProps } from './concatStyleSetsWithProps';

export { fontFace } from './fontFace';

export { keyframes } from './keyframes';

export {
  InjectionMode,
  Stylesheet,
  SUPPORTS_CONSTRUCTABLE_STYLESHEETS,
  SUPPORTS_MODIFYING_ADOPTED_STYLESHEETS,
} from './Stylesheet';
export type {
  ICSPSettings,
  ISerializedStylesheet,
  IStyleSheetConfig,
  ExtendedCSSStyleSheet,
  InsertRuleCallback,
  AddSheetCallback,
} from './Stylesheet';

export { setRTL } from './StyleOptionsState';

export type { ObjectOnly } from './ObjectOnly';

export { DEFAULT_SHADOW_CONFIG, GLOBAL_STYLESHEET_KEY, makeShadowConfig } from './shadowConfig';
export type { ShadowConfig } from './shadowConfig';

export { cloneCSSStyleSheet } from './cloneCSSStyleSheet';

export { projectStylesToWindow } from './projectStylesToWindow';

import './version';

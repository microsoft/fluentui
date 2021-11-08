// This should be just "export * as shorthands from "
// https://github.com/microsoft/fluentui/issues/20694
import {
  border,
  borderLeft,
  borderBottom,
  borderRight,
  borderTop,
  borderColor,
  borderStyle,
  borderRadius,
  borderWidth,
  gap,
  margin,
  padding,
  overflow,
} from './shorthands/index';

export const shorthands = {
  border,
  borderLeft,
  borderBottom,
  borderRight,
  borderTop,
  borderColor,
  borderStyle,
  borderRadius,
  borderWidth,
  gap,
  margin,
  padding,
  overflow,
};

export { createDOMRenderer } from './renderer/createDOMRenderer';
export { styleBucketOrdering } from './renderer/getStyleSheetForBucket';
export { rehydrateRendererCache } from './renderer/rehydrateRendererCache';

export { mergeClasses } from './mergeClasses';
export { makeStaticStyles } from './makeStaticStyles';
export { makeStyles } from './makeStyles';
export { resolveStyleRulesForSlots } from './resolveStyleRulesForSlots';

// Private exports, are used by build time transforms
export { createCSSVariablesProxy, resolveProxyValues } from './runtime/createCSSVariablesProxy';
export { resolveStyleRules } from './runtime/resolveStyleRules';
export { __styles } from './__styles';

export * from './constants';
export type {
  // Static styles
  MakeStaticStylesStyle,
  MakeStaticStyles,
  // Styles
  MakeStylesAnimation,
  MakeStylesStyle,
  MakeStylesStyleRule,
  MakeStylesStyleFunctionRule,
  // Internal types
  CSSClasses,
  CSSClassesMapBySlot,
  CSSRulesByBucket,
  StyleBucketName,
  // Util
  MakeStaticStylesOptions,
  MakeStylesOptions,
  MakeStylesRenderer,
} from './types';

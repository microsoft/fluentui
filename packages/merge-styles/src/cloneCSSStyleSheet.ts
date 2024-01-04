import type { ExtendedCSSStyleSheet } from './Stylesheet';

export const cloneCSSStyleSheet = (srcSheet: CSSStyleSheet, targetSheet: CSSStyleSheet): CSSStyleSheet => {
  for (let i = 0; i < srcSheet.cssRules.length; i++) {
    targetSheet.insertRule(srcSheet.cssRules[i].cssText);
  }

  return targetSheet;
};

export const cloneExtendedCSSStyleSheet = (
  srcSheet: ExtendedCSSStyleSheet,
  targetSheet: ExtendedCSSStyleSheet,
): ExtendedCSSStyleSheet => {
  const clone = cloneCSSStyleSheet(srcSheet, targetSheet) as ExtendedCSSStyleSheet;

  clone.bucketName = srcSheet.bucketName;
  for (const key of Object.keys(srcSheet.metadata)) {
    clone.metadata[key] = srcSheet.metadata[key];
  }

  return clone;
};

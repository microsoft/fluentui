export const cloneCSSStyleSheet = (srcSheet: CSSStyleSheet, targetSheet: CSSStyleSheet): CSSStyleSheet => {
  for (let i = 0; i < srcSheet.cssRules.length; i++) {
    targetSheet.insertRule(srcSheet.cssRules[i].cssText);
  }

  return targetSheet;
};

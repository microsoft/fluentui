import { getGlobal, Stylesheet, STYLESHEET_SETTING } from './Stylesheet';
import { cloneExtendedCSSStyleSheet } from './cloneCSSStyleSheet';
import type { WindowWithMergeStyles } from './Stylesheet';

class ProjectedStylesheet extends Stylesheet {
  public createStyleElement(): HTMLStyleElement {
    return this._createStyleElement();
  }
}

export const projectStylesToWindow = (stylesheet: Stylesheet, targetWindow: Window): void => {
  const config = stylesheet.getConfig();
  const global = getGlobal(config.window);

  const serialized = JSON.parse(stylesheet.serialize());
  const targetStylesheet = new ProjectedStylesheet(
    {
      injectionMode: config.injectionMode,
      window: targetWindow,
    },
    serialized,
  );

  (targetWindow as WindowWithMergeStyles)[STYLESHEET_SETTING] = targetStylesheet;

  const sourceAdoptedSheets = stylesheet.getAdoptedSheets();
  sourceAdoptedSheets.forEach((srcSheet, key) => {
    const clonedSheet = cloneExtendedCSSStyleSheet(srcSheet, stylesheet.makeCSSStyleSheet(targetWindow));
    targetStylesheet.addAdoptableStyleSheet(key, clonedSheet);
  });

  if ((global as Window)?.document) {
    const globalStyles = (global as Window).document.querySelectorAll('[data-merge-styles-global]') || [];
    for (let i = 0; i < globalStyles.length; i++) {
      const styleTag = targetStylesheet.createStyleElement();
      targetWindow.document.head.appendChild(styleTag);
      const srcSheet = (globalStyles[i] as HTMLStyleElement).sheet;
      if (srcSheet) {
        for (let j = 0; j < srcSheet.cssRules.length; j++) {
          styleTag.sheet?.insertRule(srcSheet.cssRules[j].cssText);
        }
      }
    }
  }
};

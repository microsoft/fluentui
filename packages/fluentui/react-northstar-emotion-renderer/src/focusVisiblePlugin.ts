const notFocusVisibleRgxp = /:not\(:focus-visible\)/g;
const focusVisibleRgxp = /:focus-visible/g;
const toSingleSpace = (selector: string) => selector.trim().replace(/\s+/g, ' ');

/**
 * This is an custom implementation from original FocusVisiblePlugin
 * see https://github.com/quid/refraction/blob/master/packages/stylis-plugin-focus-visible/src/index.js
 */
export function focusVisiblePlugin(context: number, content: string, selectors: Array<string>) {
  if (context === 2) {
    selectors.forEach((selector, index) => {
      if (selector.match(notFocusVisibleRgxp)) {
        const cleanSelector = selector.replace(notFocusVisibleRgxp, ':focus');
        selectors[index] = toSingleSpace(`[data-whatinput]:not([data-whatinput="keyboard"]) ${cleanSelector}`);
      } else if (selector.match(focusVisibleRgxp)) {
        const cleanSelector = selector.replace(focusVisibleRgxp, ':focus');
        selectors[index] = toSingleSpace(`[data-whatinput="keyboard"] ${cleanSelector}`);
      }
    });
  }
  return content;
}

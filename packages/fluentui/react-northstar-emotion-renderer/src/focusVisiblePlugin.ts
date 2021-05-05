const notFocusVisibleRgxp = /:not\(:focus-visible\)/g;
const focusVisibleRgxp = /:focus-visible/g;
const trim = (selector: string) => selector.trim().replace(/\s+/g, ' ');
export function focusVisiblePlugin(context: number, content: string, selectors: Array<string>) {
  if (context === 2) {
    selectors.forEach((selector, index) => {
      if (selector.match(notFocusVisibleRgxp)) {
        const cleanSelector = selector.replace(notFocusVisibleRgxp, ':focus');
        selectors[index] = trim(`[data-whatinput]:not([data-whatinput="keyboard"]) ${cleanSelector}`);
      } else if (selector.match(focusVisibleRgxp)) {
        const cleanSelector = selector.replace(focusVisibleRgxp, ':focus');
        selectors[index] = trim(`[data-whatinput="keyboard"] ${cleanSelector}`);
      }
    });
  }
  return content;
}

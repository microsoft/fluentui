import { Middleware, RULESET } from 'stylis';

type MiddlewareParams = Parameters<Middleware>;

const notFocusVisibleRgxp = /:not\(:focus-visible\)/g;
const focusVisibleRgxp = /:focus-visible/g;
const toSingleSpace = (selector: string) => selector.trim().replace(/\s+/g, ' ');

/**
 * This is an custom implementation from original FocusVisiblePlugin
 * see https://github.com/quid/refraction/blob/master/packages/stylis-plugin-focus-visible/src/index.js
 */
export function focusVisiblePlugin(element: MiddlewareParams[0]): string | void {
  if (element.type === RULESET) {
    // can include other selectors, "#foo, #bar:focus-visible"
    if (element.value.indexOf(':focus-visible') >= 0) {
      (element.props as string[]).forEach((selector, index) => {
        if (selector.match(notFocusVisibleRgxp)) {
          const cleanSelector = selector.replace(notFocusVisibleRgxp, ':focus');

          (element.props as string[])[index] = toSingleSpace(
            `[data-whatinput]:not([data-whatinput="keyboard"]) ${cleanSelector}`,
          );
        } else if (selector.match(focusVisibleRgxp)) {
          const cleanSelector = selector.replace(focusVisibleRgxp, ':focus');

          (element.props as string[])[index] = toSingleSpace(`[data-whatinput="keyboard"] ${cleanSelector}`);
        }
      });
    }
  }
}

import type { FallbackRect } from '../fallback/computeFallbackPosition';

const OVERFLOW = /auto|scroll|overlay|hidden|clip/;

export const getViewportRect = (element: Element): FallbackRect => {
  const { clientWidth, clientHeight } = element.ownerDocument.documentElement;
  return { left: 0, top: 0, width: clientWidth, height: clientHeight };
};

/** The area inside the borders of an element, in the viewport */
export const getPaddingBox = (element: HTMLElement): FallbackRect => {
  const { left, top } = element.getBoundingClientRect();
  return {
    left: left + element.clientLeft,
    top: top + element.clientTop,
    width: element.clientWidth,
    height: element.clientHeight,
  };
};

export const intersect = (a: FallbackRect, b: FallbackRect): FallbackRect => {
  const left = Math.max(a.left, b.left);
  const top = Math.max(a.top, b.top);

  return {
    left,
    top,
    width: Math.max(0, Math.min(a.left + a.width, b.left + b.width) - left),
    height: Math.max(0, Math.min(a.top + a.height, b.top + b.height) - top),
  };
};

/** The ancestors that can clip the element, the closest first */
export const getScrollAncestors = (element: Element): HTMLElement[] => {
  const win = element.ownerDocument.defaultView;
  const root = element.ownerDocument.documentElement;
  const ancestors: HTMLElement[] = [];

  for (let node = element.parentElement; win && node && node !== root; node = node.parentElement) {
    const { overflow, overflowX, overflowY } = win.getComputedStyle(node);

    if (OVERFLOW.test(overflow + overflowX + overflowY)) {
      ancestors.push(node);
    }
  }

  return ancestors;
};

/** The visible area of an element: the viewport clipped by every scrollable ancestor */
export const getClippingRect = (element: Element): FallbackRect =>
  getScrollAncestors(element).reduce(
    (rect, ancestor) => intersect(rect, getPaddingBox(ancestor)),
    getViewportRect(element),
  );

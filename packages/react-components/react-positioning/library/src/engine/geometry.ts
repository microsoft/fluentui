import type { PlacementRect } from './computePlacement';
import { isContainingBlock } from './containingBlock';

const OVERFLOW = /auto|scroll|overlay|hidden|clip/;

export const getViewportRect = (element: Element): PlacementRect => {
  const { clientWidth, clientHeight } = element.ownerDocument.documentElement;
  return { left: 0, top: 0, width: clientWidth, height: clientHeight };
};

/** The area inside the borders of an element, in the viewport */
export const getPaddingBox = (element: HTMLElement): PlacementRect => {
  const { left, top } = element.getBoundingClientRect();
  return {
    left: left + element.clientLeft,
    top: top + element.clientTop,
    width: element.clientWidth,
    height: element.clientHeight,
  };
};

export const intersect = (a: PlacementRect, b: PlacementRect): PlacementRect => {
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
  const position = win?.getComputedStyle(element).position;
  let strategy: 'absolute' | 'fixed' | undefined =
    position === 'fixed' || position === 'absolute' ? position : undefined;

  for (let node = element.parentElement; win && node && node !== root; node = node.parentElement) {
    const style = win.getComputedStyle(node);
    const { overflow, overflowX, overflowY } = style;

    // Positioned descendants escape overflow between themselves and their containing block.
    if (strategy && isContainingBlock(style, strategy)) {
      strategy = undefined;
    }
    if (!strategy && OVERFLOW.test(overflow + overflowX + overflowY)) {
      ancestors.push(node);
    }
    if (style.position === 'fixed' || style.position === 'absolute') {
      strategy = style.position;
    }
  }

  return ancestors;
};

/** The visible area of an element: the viewport clipped by every scrollable ancestor */
export const getClippingRect = (element: Element): PlacementRect =>
  getScrollAncestors(element).reduce(
    (rect, ancestor) => intersect(rect, getPaddingBox(ancestor)),
    getViewportRect(element),
  );

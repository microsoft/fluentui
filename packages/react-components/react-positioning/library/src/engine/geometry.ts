import { getPhysicalParent, isContainingBlock, isTopLayer } from './containingBlock';
import { isHTMLElement } from '@fluentui/react-utilities';
import type { Rect } from '@floating-ui/dom';

const OVERFLOW = /auto|scroll|overlay|hidden|clip/;

export const intersect = (a: Rect, b: Rect): Rect => {
  const x = Math.max(a.x, b.x);
  const y = Math.max(a.y, b.y);

  return {
    x,
    y,
    width: Math.min(a.x + a.width, b.x + b.width) - x,
    height: Math.min(a.y + a.height, b.y + b.height) - y,
  };
};

/** The ancestors that can clip the element, the closest first */
export const getScrollAncestors = (element: Element): HTMLElement[] => {
  if (isTopLayer(element)) {
    return [];
  }
  const win = element.ownerDocument.defaultView;
  const root = element.ownerDocument.documentElement;
  const ancestors: HTMLElement[] = [];
  const position = win?.getComputedStyle(element).position;
  let strategy: 'absolute' | 'fixed' | undefined =
    position === 'fixed' || position === 'absolute' ? position : undefined;

  for (let node = getPhysicalParent(element); win && node && node !== root; node = getPhysicalParent(node)) {
    const style = win.getComputedStyle(node);
    const { overflow, overflowX, overflowY } = style;

    // Positioned descendants escape overflow between themselves and their containing block.
    if (strategy && isContainingBlock(style, strategy)) {
      strategy = undefined;
    }
    if (
      !strategy &&
      node !== element.ownerDocument.body &&
      isHTMLElement(node) &&
      style.display !== 'inline' &&
      style.display !== 'contents' &&
      OVERFLOW.test(overflow + overflowX + overflowY)
    ) {
      ancestors.push(node);
    }
    if (!strategy && (style.position === 'fixed' || style.position === 'absolute')) {
      strategy = style.position;
    }
  }

  return ancestors;
};

import { isHTMLElement } from '@fluentui/react-utilities';
import type { Boundary, ElementRects, Platform, Rect, Strategy } from '@floating-ui/dom';
import { getContainingBlock } from './containingBlock';
import { getScrollAncestors, intersect } from './geometry';

const style = (element: Element) => element.ownerDocument.defaultView!.getComputedStyle(element);

function getCssDimensions(element: Element) {
  const css = style(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const rounded =
    isHTMLElement(element) &&
    (Math.round(width) !== element.offsetWidth || Math.round(height) !== element.offsetHeight);
  if (rounded) {
    width = element.offsetWidth;
    height = element.offsetHeight;
  }
  return { width, height, rounded };
}

export function getDimensions(element: Element): { width: number; height: number } {
  const { width, height } = getCssDimensions(element);
  return { width, height };
}

export function getScale(element: HTMLElement): { x: number; y: number } {
  const rect = element.getBoundingClientRect();
  const { width, height, rounded } = getCssDimensions(element);
  const x = (rounded ? Math.round(rect.width) : rect.width) / width;
  const y = (rounded ? Math.round(rect.height) : rect.height) / height;
  return { x: x && Number.isFinite(x) ? x : 1, y: y && Number.isFinite(y) ? y : 1 };
}

export function getOffsetParent(element: HTMLElement): HTMLElement | null {
  const strategy = style(element).position === 'fixed' ? 'fixed' : 'absolute';
  let parent = strategy === 'fixed' ? null : element.offsetParent;
  while (isHTMLElement(parent) && /^(TABLE|TD|TH)$/.test(parent.tagName) && style(parent).position === 'static') {
    parent = parent.offsetParent;
  }
  if (isHTMLElement(parent)) {
    if (!/^(HTML|BODY)$/.test(parent.tagName) || style(parent).position !== 'static') {
      return parent;
    }
  }
  return getContainingBlock(element, strategy);
}

export function getCoordinateSpace(
  element: HTMLElement,
  strategy: Strategy,
): { x: number; y: number; scale: { x: number; y: number } } {
  const parent = getOffsetParent(element);
  if (parent) {
    const rect = parent.getBoundingClientRect();
    const scale = getScale(parent);
    return {
      scale,
      x: rect.left + parent.clientLeft * scale.x - parent.scrollLeft * scale.x,
      y: rect.top + parent.clientTop * scale.y - parent.scrollTop * scale.y,
    };
  }
  const root = element.ownerDocument.documentElement;
  const rect = root.getBoundingClientRect();
  return {
    scale: { x: 1, y: 1 },
    x: strategy === 'fixed' ? 0 : rect.left,
    y: strategy === 'fixed' ? 0 : rect.top,
  };
}

export function getElementRects({
  reference,
  floating,
  strategy,
}: Parameters<Platform['getElementRects']>[0]): ElementRects {
  const space = getCoordinateSpace(floating, strategy);
  const rect = reference.getBoundingClientRect();
  return {
    reference: {
      x: (rect.left - space.x) / space.scale.x,
      y: (rect.top - space.y) / space.scale.y,
      width: rect.width / space.scale.x,
      height: rect.height / space.scale.y,
    },
    floating: { x: 0, y: 0, ...getDimensions(floating) },
  };
}

export function getClippingRect(element: Element, boundary: Boundary): Rect {
  const root = element.ownerDocument.documentElement;
  const win = element.ownerDocument.defaultView!;
  const viewport = win.visualViewport;
  let clip = viewport
    ? { left: viewport.offsetLeft, top: viewport.offsetTop, width: viewport.width, height: viewport.height }
    : { left: 0, top: 0, width: root.clientWidth, height: root.clientHeight };
  const boundaries =
    boundary === 'clippingAncestors' ? getScrollAncestors(element) : Array.isArray(boundary) ? boundary : [boundary];
  for (const item of boundaries) {
    if (typeof item === 'object' && 'nodeType' in item) {
      const node = item as HTMLElement;
      const rect = node.getBoundingClientRect();
      const scale = getScale(node);
      clip = intersect(clip, {
        left: rect.left + node.clientLeft * scale.x,
        top: rect.top + node.clientTop * scale.y,
        width: node.clientWidth * scale.x,
        height: node.clientHeight * scale.y,
      });
    } else if (typeof item === 'object') {
      const rect: Rect = item;
      clip = intersect(clip, { left: rect.x, top: rect.y, width: rect.width, height: rect.height });
    }
  }
  return { x: clip.left, y: clip.top, width: clip.width, height: clip.height };
}

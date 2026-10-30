import { isHTMLElement } from '@fluentui/react-utilities';
import type { Boundary, ElementRects, Platform, Rect, Strategy } from '@floating-ui/dom';
import { getContainingBlock, isTopLayer } from './containingBlock';
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

function getWindowSpace(win: Window) {
  let x = 0;
  let y = 0;
  let scaleX = 1;
  let scaleY = 1;
  while (isHTMLElement(win.frameElement)) {
    const frame = win.frameElement;
    const rect = frame.getBoundingClientRect();
    const scale = getScale(frame);
    const css = style(frame);
    x = rect.left + (frame.clientLeft + (parseFloat(css.paddingLeft) || 0) + x) * scale.x;
    y = rect.top + (frame.clientTop + (parseFloat(css.paddingTop) || 0) + y) * scale.y;
    scaleX *= scale.x;
    scaleY *= scale.y;
    win = frame.ownerDocument.defaultView!;
  }
  return { x, y, scaleX, scaleY };
}

function convertWindowRect(rect: Rect, from: Window, to: Window): Rect {
  if (from === to) {
    return rect;
  }
  const source = getWindowSpace(from);
  const target = getWindowSpace(to);
  return {
    x: (source.x + rect.x * source.scaleX - target.x) / target.scaleX,
    y: (source.y + rect.y * source.scaleY - target.y) / target.scaleY,
    width: (rect.width * source.scaleX) / target.scaleX,
    height: (rect.height * source.scaleY) / target.scaleY,
  };
}

export function getOffsetParent(element: HTMLElement): HTMLElement | null {
  if (isTopLayer(element)) {
    return null;
  }
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
  const referenceWindow = ('ownerDocument' in reference ? reference : reference.contextElement)?.ownerDocument
    .defaultView;
  const rect = convertWindowRect(
    reference.getBoundingClientRect(),
    referenceWindow || floating.ownerDocument.defaultView!,
    floating.ownerDocument.defaultView!,
  );
  return {
    reference: {
      x: (rect.x - space.x) / space.scale.x,
      y: (rect.y - space.y) / space.scale.y,
      width: rect.width / space.scale.x,
      height: rect.height / space.scale.y,
    },
    floating: { x: 0, y: 0, ...getDimensions(floating) },
  };
}

export function getClippingRect(
  element: Element,
  boundary: Boundary,
  floatingWindow = element.ownerDocument.defaultView!,
): Rect {
  const root = element.ownerDocument.documentElement;
  const win = element.ownerDocument.defaultView!;
  const viewport = win.visualViewport;
  let clip = viewport
    ? { x: viewport.offsetLeft, y: viewport.offsetTop, width: viewport.width, height: viewport.height }
    : { x: 0, y: 0, width: root.clientWidth, height: root.clientHeight };
  const boundaries =
    boundary === 'clippingAncestors' ? getScrollAncestors(element) : Array.isArray(boundary) ? boundary : [boundary];
  for (const item of boundaries) {
    if (typeof item === 'object' && 'nodeType' in item) {
      const node = item as HTMLElement;
      const rect = node.getBoundingClientRect();
      const scale = getScale(node);
      const bounds = convertWindowRect(
        {
          x: rect.left + node.clientLeft * scale.x,
          y: rect.top + node.clientTop * scale.y,
          width: node.clientWidth * scale.x,
          height: node.clientHeight * scale.y,
        },
        node.ownerDocument.defaultView!,
        win,
      );
      clip = intersect(clip, bounds);
    } else if (typeof item === 'object') {
      const rect: Rect = item;
      clip = intersect(clip, rect);
    }
  }
  const result = convertWindowRect(clip, win, floatingWindow);
  const frame = win.frameElement;
  return boundary === 'clippingAncestors' && win !== floatingWindow && isHTMLElement(frame)
    ? intersect(result, getClippingRect(frame, boundary, floatingWindow))
    : result;
}

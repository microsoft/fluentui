import { isHTMLElement } from '@fluentui/react-utilities';
import type { Boundary, Rect, Strategy } from '@floating-ui/dom';

type Scale = { x: number; y: number };
type CoordinateSpace = Scale & { scale: Scale; parent?: HTMLElement | null };

// Expression-bodied helpers and plain property access keep the ES2019 output compact.

export const getWindow = (node: Node): Window => node.ownerDocument!.defaultView!;
export const getRoot = (node: Node): HTMLElement => node.ownerDocument!.documentElement;
export const getStyle = (element: Element): CSSStyleDeclaration => getWindow(element).getComputedStyle(element);

/** A CSS pixel value, an empty string removes the inline style */
export const px = (value: number | undefined): string => (value === undefined ? '' : `${value}px`);

// Properties that are not supported are empty strings (i.e. in jsdom)
const isSet = (value: string | undefined): boolean => !!value && value !== 'none';

/** Uses `CSS.supports()` of the element's window, which is unavailable in some environments (e.g. jsdom) */
const isWebKit = (element: Element): boolean => {
  const css = (getWindow(element) as Window & typeof globalThis).CSS;
  return !!css && !!css.supports && css.supports('-webkit-backdrop-filter', 'none');
};

/** Shared and never mutated */
export const NO_OFFSET: Scale = { x: 0, y: 0 };

const getVisualOffsets = (element: Element): Scale => {
  const viewport = getWindow(element).visualViewport;
  return isWebKit(element) && viewport ? { x: viewport.offsetLeft, y: viewport.offsetTop } : NO_OFFSET;
};

const getBounds = (target: { getBoundingClientRect(): DOMRect | Rect }) => target.getBoundingClientRect() as DOMRect;

export const rect = (x: number, y: number, width: number, height: number): Rect => ({ x, y, width, height });

export const intersect = (a: Rect, b: Rect): Rect => {
  const x = Math.max(a.x, b.x);
  const y = Math.max(a.y, b.y);

  return rect(x, y, Math.min(a.x + a.width, b.x + b.width) - x, Math.min(a.y + a.height, b.y + b.height) - y);
};

export const isContainingBlock = (
  element: Element,
  style: CSSStyleDeclaration,
  strategy: 'absolute' | 'fixed',
): boolean =>
  // Boxless elements can't form containing blocks, and WebKit ignores filters
  style.display !== 'contents' &&
  ((strategy === 'absolute' && !/^(static)?$/.test(style.position)) ||
    ('transform translate scale rotate perspective'.split(' ') as 'scale'[]).some(property => isSet(style[property])) ||
    ((isSet(style.filter) || isSet(style.backdropFilter)) && !isWebKit(element)) ||
    /auto|hidden/.test(style.contentVisibility) ||
    (!!style.containerType && style.containerType !== 'normal') ||
    /transform|perspective|filter/.test(style.willChange) ||
    /paint|layout|strict|content/.test(style.contain));

/** The parent element, through slot assignments and shadow roots but not virtual parents */
export const getPhysicalParent = (element: Element): Element | null => {
  if (isTopLayer(element)) {
    return null;
  }
  let parent: Node | null = element.assignedSlot || element.parentNode;
  if (parent && parent.nodeType === 11) {
    parent = (parent as ShadowRoot).host;
  }
  return parent && parent.nodeType === 1 ? (parent as Element) : null;
};

/** Open popovers and modal dialogs escape the clipping and containing blocks of their ancestors */
const isTopLayer = (element: Element): boolean => {
  try {
    // A single forgiving `:is()` match per ancestor: unsupported pseudo-classes never match, and environments
    // without `:is()` (e.g. jsdom) throw
    return element.matches(':is(:popover-open, :modal)');
  } catch {
    return false;
  }
};

/**
 * Walks the physical ancestors (including SVG elements) of an element up to (excluding) the root element,
 * stops when the callback returns true and returns that ancestor.
 */
export const findAncestor = (
  element: Element,
  callback: (node: Element, style: CSSStyleDeclaration) => unknown,
): Element | null => {
  const root = getRoot(element);
  for (let node = getPhysicalParent(element); node && node !== root; node = getPhysicalParent(node)) {
    if (callback(node, getStyle(node))) {
      return node;
    }
  }
  return null;
};

/** The ancestors that can clip the element, the closest first */
export const getScrollAncestors = (element: Element): HTMLElement[] => {
  const ancestors: HTMLElement[] = [];
  const isPositioned = (position: string) => position === 'fixed' || position === 'absolute';
  const { position } = getStyle(element);
  let strategy = isPositioned(position) ? position : '';

  findAncestor(element, (node, style) => {
    // Positioned descendants escape overflow between themselves and their containing block.
    if (strategy && isContainingBlock(node, style, strategy as 'absolute' | 'fixed')) {
      strategy = '';
    }
    // The overflow of the body propagates to the viewport, which is always part of the clipping rect
    if (
      !strategy &&
      node !== element.ownerDocument.body &&
      isHTMLElement(node) &&
      !/^(inline|contents)$/.test(style.display) &&
      /auto|scroll|overlay|hidden|clip/.test(style.overflow + style.overflowX + style.overflowY)
    ) {
      ancestors.push(node);
    }
    if (!strategy && isPositioned(style.position)) {
      strategy = style.position;
    }
  });

  return ancestors;
};

/** CSS dimensions, or the rounded layout dimensions when they differ after rounding */
export const getDimensions = (element: Element): { width: number; height: number; rounded: boolean } => {
  const css = getStyle(element);
  const width = parseFloat(css.width) || 0;
  const height = parseFloat(css.height) || 0;
  const rounded =
    isHTMLElement(element) &&
    (Math.round(width) !== element.offsetWidth || Math.round(height) !== element.offsetHeight);
  return {
    width: rounded ? (element as HTMLElement).offsetWidth : width,
    height: rounded ? (element as HTMLElement).offsetHeight : height,
    rounded,
  };
};

export const getScale = (element: HTMLElement): Scale => {
  const bounds = getBounds(element);
  const { width, height, rounded } = getDimensions(element);
  // Zero, infinite and NaN scales (e.g. of hidden elements) fall back to 1
  const finite = (value: number) => (value && Number.isFinite(value) ? value : 1);
  return {
    x: finite((rounded ? Math.round(bounds.width) : bounds.width) / width),
    y: finite((rounded ? Math.round(bounds.height) : bounds.height) / height),
  };
};

/** The viewport rect of the element's padding box, in CSS pixels of its own window */
const getClientRect = (element: HTMLElement): Rect & { scale: Scale } => {
  const bounds = getBounds(element);
  const scale = getScale(element);
  return {
    ...rect(
      bounds.left + element.clientLeft * scale.x,
      bounds.top + element.clientTop * scale.y,
      element.clientWidth * scale.x,
      element.clientHeight * scale.y,
    ),
    scale,
  };
};

/** The offset and scale of a window's viewport within the top-most same-origin window */
const getWindowSpace = (win: Window): CoordinateSpace => {
  const space = { x: 0, y: 0, scale: { x: 1, y: 1 } };
  for (let frame = win.frameElement; isHTMLElement(frame); frame = getWindow(frame).frameElement) {
    const bounds = getBounds(frame);
    const scale = getScale(frame);
    const css = getStyle(frame);
    space.x = bounds.left + (frame.clientLeft + (parseFloat(css.paddingLeft) || 0) + space.x) * scale.x;
    space.y = bounds.top + (frame.clientTop + (parseFloat(css.paddingTop) || 0) + space.y) * scale.y;
    space.scale.x *= scale.x;
    space.scale.y *= scale.y;
  }
  return space;
};

/** Converts a viewport rect of one window to a viewport rect of another (same-origin) window */
const convertWindowRect = (value: Rect, from: Window, to: Window): Rect => {
  if (from === to) {
    return value;
  }
  const { x, y, scale } = getWindowSpace(from);
  const target = getWindowSpace(to);
  const targetScale = target.scale;
  return rect(
    (x + value.x * scale.x - target.x) / targetScale.x,
    (y + value.y * scale.y - target.y) / targetScale.y,
    (value.width * scale.x) / targetScale.x,
    (value.height * scale.y) / targetScale.y,
  );
};

const isStatic = (element: Element) => getStyle(element).position === 'static';

export const getOffsetParent = (element: HTMLElement): HTMLElement | null => {
  if (isTopLayer(element)) {
    return null;
  }
  const strategy = getStyle(element).position === 'fixed' ? 'fixed' : 'absolute';
  let parent = strategy === 'fixed' ? null : element.offsetParent;
  while (isHTMLElement(parent) && /^(TABLE|TD|TH)$/.test(parent.tagName) && isStatic(parent)) {
    parent = parent.offsetParent;
  }
  return isHTMLElement(parent) && (!/^(HTML|BODY)$/.test(parent.tagName) || !isStatic(parent))
    ? parent
    : // The element that forms the containing block, `null` is the viewport or the initial containing block
      (findAncestor(
        element,
        (node, style) => isHTMLElement(node) && isContainingBlock(node, style, strategy),
      ) as HTMLElement | null);
};

/** The viewport offset and scale of the coordinate space used to position the element */
export const getCoordinateSpace = (element: HTMLElement, strategy: Strategy): CoordinateSpace => {
  const parent = getOffsetParent(element);
  if (parent) {
    const { x, y, scale } = getClientRect(parent);
    return { parent, scale, x: x - parent.scrollLeft * scale.x, y: y - parent.scrollTop * scale.y };
  }
  const bounds = getBounds(getRoot(element));
  return {
    scale: { x: 1, y: 1 },
    x: strategy === 'fixed' ? 0 : bounds.left,
    y: strategy === 'fixed' ? 0 : bounds.top,
  };
};

/**
 * The reference rect in the floating element's coordinate space, `context` is the reference element or the element
 * that a virtual reference is relative to (the floating element's root element by default).
 */
export const getReferenceRect = (
  reference: { getBoundingClientRect(): DOMRect | Rect },
  context: Element,
  floating: HTMLElement,
  space: CoordinateSpace,
  strategy: Strategy,
): Rect => {
  const floatingWindow = getWindow(floating);
  const referenceWindow = getWindow(context);
  const bounds = convertWindowRect(getBounds(reference), referenceWindow, floatingWindow);
  const visual =
    strategy === 'fixed' && referenceWindow === floatingWindow && !space.parent
      ? getVisualOffsets(floating)
      : NO_OFFSET;
  const { x, y, scale } = space;
  return rect(
    (bounds.x + visual.x - x) / scale.x,
    (bounds.y + visual.y - y) / scale.y,
    bounds.width / scale.x,
    bounds.height / scale.y,
  );
};

/** The visible area of the element within the boundary, in viewport pixels of `floatingWindow` */
export const getClippingRect = (
  element: Element,
  boundary: Boundary,
  floatingWindow = getWindow(element),
  strategy: Strategy = 'absolute',
): Rect => {
  const win = getWindow(element);
  const root = getRoot(element);
  const viewport = win.visualViewport;
  // WebKit lays out absolute elements relative to the layout viewport, rect boundaries are in its coordinates too
  const visual = getVisualOffsets(element);
  const layout = strategy === 'fixed' ? NO_OFFSET : visual;
  const clippingAncestors = boundary === 'clippingAncestors';
  let clip = viewport
    ? rect(viewport.offsetLeft - layout.x, viewport.offsetTop - layout.y, viewport.width, viewport.height)
    : rect(0, 0, root.clientWidth, root.clientHeight);
  for (const item of clippingAncestors ? getScrollAncestors(element) : ([] as unknown[]).concat(boundary)) {
    if (item && typeof item === 'object') {
      const { x, y, width, height } = item as Rect;
      clip = intersect(
        clip,
        'nodeType' in item
          ? convertWindowRect(getClientRect(item as HTMLElement), getWindow(item as Node), win)
          : rect(x - visual.x, y - visual.y, width, height),
      );
    }
  }
  const result = convertWindowRect(clip, win, floatingWindow);
  const frame = win.frameElement;
  return clippingAncestors && win !== floatingWindow && isHTMLElement(frame)
    ? intersect(result, getClippingRect(frame, boundary, floatingWindow, strategy))
    : result;
};

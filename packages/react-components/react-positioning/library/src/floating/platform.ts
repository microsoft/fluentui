import {
  getComputedStyle,
  getContainingBlock,
  getDocumentElement,
  getFrameElement,
  getNodeName,
  getNodeScroll,
  getOverflowAncestors,
  getParentNode,
  getWindow,
  isContainingBlock,
  isElement,
  isHTMLElement,
  isLastTraversableNode,
  isOverflowElement,
  isTableElement,
  isTopLayer,
  isWebKit,
} from './domUtils';
import type {
  Boundary,
  ClientRectObject,
  Coords,
  Dimensions,
  ElementRects,
  Elements,
  MiddlewareState,
  Rect,
  ReferenceElement,
  Strategy,
} from './types';
import { createCoords, max, min, rectToClientRect, round } from './utils';

function unwrapElement(element: ReferenceElement): Element | undefined {
  return !isElement(element) ? element.contextElement : element;
}

function isStaticPositioned(element: Element): boolean {
  return getComputedStyle(element).position === 'static';
}

function getCssDimensions(element: Element): Dimensions & { $: boolean } {
  const css = getComputedStyle(element);
  // In testing environments, the `width` and `height` properties are empty strings for SVG elements, returning NaN.
  // Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;

  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }

  return { width, height, $: shouldFallback };
}

/**
 * Scale of an element caused by CSS transforms.
 */
export function getScale(element: ReferenceElement): Coords {
  const domElement = unwrapElement(element);

  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }

  const rect = domElement.getBoundingClientRect();
  const { width, height, $ } = getCssDimensions(domElement);

  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }

  if (!y || !Number.isFinite(y)) {
    y = 1;
  }

  return { x, y };
}

function getVisualOffsets(win: Window | null): Coords {
  if (!isWebKit() || !win?.visualViewport) {
    return createCoords(0);
  }

  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop,
  };
}

function shouldAddVisualOffsets(
  win: Window | null,
  isFixed: boolean,
  floatingOffsetParent: Element | Window | undefined,
): boolean {
  if (!floatingOffsetParent || (isFixed && floatingOffsetParent !== win)) {
    return false;
  }

  return isFixed;
}

function getBoundingClientRect(
  element: ReferenceElement,
  includeScale = false,
  isFixedStrategy = false,
  offsetParent?: Element | Window,
): ClientRectObject {
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);

  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }

  // Virtual elements without a context element are measured relative to the floating element's window
  const win = getWindow(domElement ?? offsetParent);
  const visualOffsets = shouldAddVisualOffsets(win, isFixedStrategy, offsetParent)
    ? getVisualOffsets(win)
    : createCoords(0);

  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;

  if (domElement && win) {
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;

    let currentWin: Window | null = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;

      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;

      x += left;
      y += top;

      currentWin = getWindow(currentIFrame);
      currentIFrame = currentWin && getFrameElement(currentWin);
    }
  }

  return rectToClientRect({ width, height, x, y });
}

function getWindowScrollBarX(element: Element, rect?: DOMRect): number {
  const leftScroll = getNodeScroll(element).scrollLeft;

  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }

  return rect.left + leftScroll;
}

function getHTMLOffset(
  documentElement: HTMLElement,
  scroll: { scrollLeft: number; scrollTop: number },
  ignoreScrollbarX = false,
): Coords {
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - (ignoreScrollbarX ? 0 : getWindowScrollBarX(documentElement, htmlRect));
  const y = htmlRect.top + scroll.scrollTop;

  return { x, y };
}

function getRectRelativeToOffsetParent(
  element: ReferenceElement,
  offsetParent: Element | Window,
  strategy: Strategy,
): Rect {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === 'fixed';

  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);

  let scroll = { scrollLeft: 0, scrollTop: 0 };
  const offsets = createCoords(0);

  if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      // If the <body> scrollbar appears on the left (e.g. RTL systems).
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  const htmlOffset =
    documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);

  return {
    x: rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x,
    y: rect.top + scroll.scrollTop - offsets.y - htmlOffset.y,
    width: rect.width,
    height: rect.height,
  };
}

function getViewportRect(element: Element, strategy: Strategy): Rect {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win?.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();

    if (!visualViewportBased || (visualViewportBased && strategy === 'fixed')) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return { width, height, x, y };
}

function getTrueOffsetParent(element: Element): Element | null {
  if (!isHTMLElement(element) || getComputedStyle(element).position === 'fixed') {
    return null;
  }

  let rawOffsetParent = element.offsetParent;

  // Firefox returns the <html> element as the offsetParent if it's non-static,
  // while Chrome and Safari return the <body> element. The <body> element must
  // be used to perform the correct calculations even if the <html> element is
  // non-static.
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }

  return rawOffsetParent;
}

export function getOffsetParent(element: Element): Element | Window {
  const win = getWindow(element)!;

  if (isTopLayer(element)) {
    return win;
  }

  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }

  let offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (
    offsetParent &&
    isLastTraversableNode(offsetParent) &&
    isStaticPositioned(offsetParent) &&
    !isContainingBlock(offsetParent)
  ) {
    return win;
  }

  return offsetParent || getContainingBlock(element) || win;
}

export function getDimensions(element: Element): Dimensions {
  const { width, height } = getCssDimensions(element);
  return { width, height };
}

export function isRTL(element: Element): boolean {
  return getComputedStyle(element).direction === 'rtl';
}

export function getElementRects(reference: ReferenceElement, floating: HTMLElement, strategy: Strategy): ElementRects {
  const floatingDimensions = getDimensions(floating);

  return {
    reference: getRectRelativeToOffsetParent(reference, getOffsetParent(floating), strategy),
    floating: { x: 0, y: 0, width: floatingDimensions.width, height: floatingDimensions.height },
  };
}

export function convertOffsetParentRelativeRectToViewportRelativeRect(
  elements: Elements,
  rect: Rect,
  offsetParent: Element | Window,
  strategy: Strategy,
): Rect {
  const isFixed = strategy === 'fixed';
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = isTopLayer(elements.floating);

  if (offsetParent === documentElement || (topLayer && isFixed)) {
    return rect;
  }

  let scroll = { scrollLeft: 0, scrollTop: 0 };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);

  if (isOffsetParentAnElement || (!isOffsetParentAnElement && !isFixed)) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }

  const htmlOffset =
    documentElement && !isOffsetParentAnElement && !isFixed
      ? getHTMLOffset(documentElement, scroll, true)
      : createCoords(0);

  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y,
  };
}

// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element: Element, strategy: Strategy): Rect {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);

  return {
    width: element.clientWidth * scale.x,
    height: element.clientHeight * scale.y,
    x: left * scale.x,
    y: top * scale.y,
  };
}

function getClientRectFromClippingAncestor(
  element: Element,
  clippingAncestor: Element | Rect | 'viewport',
  strategy: Strategy,
): ClientRectObject {
  let rect: Rect;

  if (clippingAncestor === 'viewport') {
    rect = getViewportRect(element, strategy);
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(getWindow(element));
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height,
    };
  }

  return rectToClientRect(rect);
}

function hasFixedPositionAncestor(element: Element, stopNode: Node): boolean {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }

  return getComputedStyle(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
}

// A "clipping ancestor" is an `overflow` element able to clip the floating element's overflow.
// Fixed-position elements can only be clipped by ancestors that are their containing block.
function getClippingElementAncestors(element: Element, cache: MiddlewareState['clippingCache']): Element[] {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }

  let result: Element[] = getOverflowAncestors(element);
  let currentContainingBlockComputedStyle: CSSStyleDeclaration | null = null;
  const elementIsFixed = getComputedStyle(element).position === 'fixed';
  let currentNode: Node | null = elementIsFixed ? getParentNode(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);

    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }

    const shouldDropCurrentNode = elementIsFixed
      ? !currentNodeIsContaining && !currentContainingBlockComputedStyle
      : (!currentNodeIsContaining &&
          computedStyle.position === 'static' &&
          !!currentContainingBlockComputedStyle &&
          ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position)) ||
        (isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode));

    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // Record last containing block for next iteration.
      currentContainingBlockComputedStyle = computedStyle;
    }

    currentNode = getParentNode(currentNode);
  }

  cache.set(element, result);

  return result;
}

/**
 * Intersection of the boundaries and the viewport, relative to the viewport.
 */
export function getClippingRect(
  element: Element,
  boundary: Boundary,
  strategy: Strategy,
  cache: MiddlewareState['clippingCache'],
): Rect {
  const elementClippingAncestors =
    boundary === 'clippingAncestors'
      ? isTopLayer(element)
        ? []
        : getClippingElementAncestors(element, cache)
      : ([] as Array<Element | Rect>).concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, 'viewport' as const];
  const firstClippingAncestor = clippingAncestors[0];

  const clippingRect = clippingAncestors.reduce((accRect: ClientRectObject, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);

    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);

    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));

  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top,
  };
}

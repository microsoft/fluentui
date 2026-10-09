import { isHTMLElement } from '@fluentui/react-utilities';

export { isHTMLElement };

export function isNode(value: unknown): value is Node {
  return typeof value === 'object' && value !== null && typeof (value as Node).nodeType === 'number';
}

export function isElement(value: unknown): value is Element {
  return isNode(value) && value.nodeType === 1;
}

export function isShadowRoot(value: unknown): value is ShadowRoot {
  return isNode(value) && value.nodeType === 11 && 'host' in value;
}

export function getNodeName(node: Node | Window): string {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // `window` has no node name
  return '#document';
}

/**
 * Resolves the window that owns a node, or the window itself when given one.
 */
export function getWindow(node: Node | Window | null | undefined): Window | null {
  return (
    (node as Node | null | undefined)?.ownerDocument?.defaultView ?? (node as Window | null | undefined)?.window ?? null
  );
}

export function getDocumentElement(node: Node | Window): HTMLElement {
  return (isNode(node) ? node.ownerDocument ?? (node as Document) : node.document).documentElement;
}

export function isOverflowElement(element: Element): boolean {
  const { overflow, overflowX, overflowY, display } = getComputedStyle(element);
  return (
    /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) &&
    !['inline', 'contents'].includes(display)
  );
}

export function isTableElement(element: Element): boolean {
  return ['table', 'td', 'th'].includes(getNodeName(element));
}

export function isTopLayer(element: Element): boolean {
  return [':popover-open', ':modal'].some(selector => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}

export function isWebKit(): boolean {
  if (typeof CSS === 'undefined' || !CSS.supports) {
    return false;
  }
  return CSS.supports('-webkit-backdrop-filter', 'none');
}

export function isContainingBlock(elementOrCss: Element | CSSStyleDeclaration): boolean {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle(elementOrCss) : elementOrCss;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  return (
    css.transform !== 'none' ||
    css.perspective !== 'none' ||
    (css.containerType ? css.containerType !== 'normal' : false) ||
    (!webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false)) ||
    (!webkit && (css.filter ? css.filter !== 'none' : false)) ||
    ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) ||
    ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value))
  );
}

export function isLastTraversableNode(node: Node): boolean {
  return ['html', 'body', '#document'].includes(getNodeName(node));
}

export function getComputedStyle(element: Element): CSSStyleDeclaration {
  return getWindow(element)!.getComputedStyle(element);
}

export function getNodeScroll(element: Element | Window): { scrollLeft: number; scrollTop: number } {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop,
    };
  }

  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY,
  };
}

export function getParentNode(node: Node): Node {
  if (getNodeName(node) === 'html') {
    return node;
  }

  const result =
    // Step into the shadow DOM of the parent of a slotted node.
    (node as Element).assignedSlot ||
    // DOM Element detected.
    node.parentNode ||
    // ShadowRoot detected.
    (isShadowRoot(node) && node.host) ||
    // Fallback.
    getDocumentElement(node);

  return isShadowRoot(result) ? result.host : result;
}

export function getContainingBlock(element: Element): HTMLElement | null {
  let currentNode: Node | null = getParentNode(element);

  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }

    currentNode = getParentNode(currentNode);
  }

  return null;
}

/**
 * Lists the scrollable (overflow) ancestors of a node, excluding the `body`, `html` and the window.
 */
export function getOverflowAncestors(node: Node): HTMLElement[] {
  const list: HTMLElement[] = [];
  let parentNode = getParentNode(node);

  while (!isLastTraversableNode(parentNode)) {
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
      list.push(parentNode);
    }
    parentNode = getParentNode(parentNode);
  }

  return list;
}

export function getFrameElement(win: Window): Element | null {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

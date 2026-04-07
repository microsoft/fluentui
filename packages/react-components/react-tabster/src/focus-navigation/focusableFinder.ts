/**
 * Focusable element traversal utilities — replaces tabster's `focusable` module.
 *
 * An element is considered focusable when all of the following are true:
 *   - It can receive keyboard focus (has tabindex ≥ 0 or is a naturally tabbable element)
 *   - It is not disabled (disabled attribute or aria-disabled="true")
 *   - It is not hidden (display:none, visibility:hidden, hidden attribute)
 *   - It is not inside an `inert` subtree
 *   - Its computed visibility is not hidden
 */

import { isHTMLElement } from '@fluentui/react-utilities';

// Elements that are natively focusable without an explicit tabindex
const NATURALLY_FOCUSABLE = new Set([
  'BUTTON',
  'INPUT',
  'SELECT',
  'TEXTAREA',
  'A', // only when href is present — checked separately
  'AREA', // only when href is present
  'DETAILS',
  'SUMMARY',
  'AUDIO', // only when controls present
  'VIDEO', // only when controls present
]);

/**
 * Returns true when the element can receive keyboard focus.
 */
export function isFocusable(el: Element): el is HTMLElement {
  if (!isHTMLElement(el)) {
    return false;
  }

  // Must not be hidden via the `hidden` attribute
  if (el.hidden) {
    return false;
  }

  // Must not be inert (browser-native or polyfill via attribute)
  if (isInert(el)) {
    return false;
  }

  // Must not be disabled
  if (isDisabled(el)) {
    return false;
  }

  // Check computed style — skip elements that are display:none or visibility:hidden
  const win = el.ownerDocument?.defaultView;
  if (win) {
    const style = win.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') {
      return false;
    }
  }

  // tabindex attribute overrides everything
  const tabindexAttr = el.getAttribute('tabindex');
  if (tabindexAttr !== null) {
    return parseInt(tabindexAttr, 10) >= 0;
  }

  const tag = el.tagName;

  // Anchor / area: focusable only when they have an href
  if (tag === 'A' || tag === 'AREA') {
    return el.hasAttribute('href');
  }

  // Audio / video: focusable only when controls are shown
  if (tag === 'AUDIO' || tag === 'VIDEO') {
    return el.hasAttribute('controls');
  }

  // contenteditable without explicit tabindex=-1
  if ((el as HTMLElement).isContentEditable) {
    return true;
  }

  return NATURALLY_FOCUSABLE.has(tag);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isDisabled(el: HTMLElement): boolean {
  // Form elements support the `disabled` property
  if ('disabled' in el && (el as HTMLButtonElement).disabled) {
    return true;
  }
  // aria-disabled="true" is treated as disabled
  if (el.getAttribute('aria-disabled') === 'true') {
    return true;
  }
  return false;
}

function isInert(el: HTMLElement): boolean {
  // Walk up to detect inert ancestors (native or attribute-based polyfill)
  let node: HTMLElement | null = el;
  while (node) {
    if (node.inert || node.hasAttribute('inert')) {
      return true;
    }
    node = node.parentElement;
  }
  return false;
}

// ---------------------------------------------------------------------------
// TreeWalker-based traversal
// ---------------------------------------------------------------------------

function createFocusableWalker(container: HTMLElement): TreeWalker {
  return container.ownerDocument.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node: Node) => {
      const el = node as HTMLElement;
      // Skip inert subtrees entirely for performance
      if (el.inert || el.hasAttribute('inert')) {
        return NodeFilter.FILTER_REJECT;
      }
      if (isFocusable(el)) {
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_SKIP;
    },
  });
}

/**
 * Find all focusable elements within a container in DOM order.
 */
export function findAll(container: HTMLElement | null, acceptCondition?: (el: HTMLElement) => boolean): HTMLElement[] {
  if (!container) {
    return [];
  }
  const results: HTMLElement[] = [];
  const walker = createFocusableWalker(container);
  let node = walker.nextNode() as HTMLElement | null;
  while (node) {
    if (!acceptCondition || acceptCondition(node)) {
      results.push(node);
    }
    node = walker.nextNode() as HTMLElement | null;
  }
  return results;
}

/**
 * Find the first focusable element within a container.
 */
export function findFirst(container: HTMLElement | null): HTMLElement | null {
  if (!container) {
    return null;
  }
  const walker = createFocusableWalker(container);
  return (walker.nextNode() as HTMLElement | null) ?? null;
}

/**
 * Find the last focusable element within a container.
 */
export function findLast(container: HTMLElement | null): HTMLElement | null {
  if (!container) {
    return null;
  }
  const all = findAll(container);
  return all.length > 0 ? all[all.length - 1] : null;
}

/**
 * Find the next focusable element after `currentElement` within `container`.
 */
export function findNext(currentElement: HTMLElement | null, container: HTMLElement): HTMLElement | null {
  if (!currentElement) {
    return findFirst(container);
  }
  const all = findAll(container);
  const index = all.indexOf(currentElement);
  if (index === -1 || index === all.length - 1) {
    return null;
  }
  return all[index + 1];
}

/**
 * Find the previous focusable element before `currentElement` within `container`.
 */
export function findPrev(currentElement: HTMLElement | null, container: HTMLElement): HTMLElement | null {
  if (!currentElement) {
    return findLast(container);
  }
  const all = findAll(container);
  const index = all.indexOf(currentElement);
  if (index <= 0) {
    return null;
  }
  return all[index - 1];
}

// ---------------------------------------------------------------------------
// Grid navigation helpers
// ---------------------------------------------------------------------------

/**
 * For grid navigation: find the best focusable element in the direction
 * 'up' or 'down' that is visually in the same column as `current`.
 */
export function findNextInColumn(
  current: HTMLElement,
  container: HTMLElement,
  direction: 'up' | 'down',
): HTMLElement | null {
  const all = findAll(container);
  if (all.length === 0) {
    return null;
  }

  const currentRect = current.getBoundingClientRect();

  if (direction === 'down') {
    // Elements whose top edge is clearly below current's bottom
    const candidates = all.filter(el => {
      if (el === current) {
        return false;
      }
      const r = el.getBoundingClientRect();
      return r.top >= currentRect.bottom - 1;
    });
    return pickClosestColumn(candidates, currentRect, 'asc');
  } else {
    // Elements whose bottom edge is clearly above current's top
    const candidates = all.filter(el => {
      if (el === current) {
        return false;
      }
      const r = el.getBoundingClientRect();
      return r.bottom <= currentRect.top + 1;
    });
    return pickClosestColumn(candidates, currentRect, 'desc');
  }
}

/**
 * Among `candidates`, find the element in the row closest (vertically) to
 * `refRect` that best aligns horizontally with it.
 */
function pickClosestColumn(
  candidates: HTMLElement[],
  refRect: DOMRect,
  verticalOrder: 'asc' | 'desc',
): HTMLElement | null {
  if (candidates.length === 0) {
    return null;
  }

  // Sort by vertical proximity
  candidates.sort((a, b) => {
    const ra = a.getBoundingClientRect();
    const rb = b.getBoundingClientRect();
    return verticalOrder === 'asc' ? ra.top - rb.top : rb.bottom - ra.bottom;
  });

  // Identify the closest row (elements with the same top within a small tolerance)
  const firstRect = candidates[0].getBoundingClientRect();
  const rowEdge = verticalOrder === 'asc' ? firstRect.top : firstRect.bottom;
  const sameRow = candidates.filter(el => {
    const r = el.getBoundingClientRect();
    const edge = verticalOrder === 'asc' ? r.top : r.bottom;
    return Math.abs(edge - rowEdge) < 5;
  });

  // Pick the element in that row whose left edge is closest to refRect.left
  return sameRow.reduce((best, el) => {
    const elRect = el.getBoundingClientRect();
    const bestRect = best.getBoundingClientRect();
    return Math.abs(elRect.left - refRect.left) < Math.abs(bestRect.left - refRect.left) ? el : best;
  });
}

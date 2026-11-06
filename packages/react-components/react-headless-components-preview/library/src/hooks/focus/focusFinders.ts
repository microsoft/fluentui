import { isHTMLElement } from '@fluentui/react-utilities';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button',
  'input',
  'select',
  'textarea',
  'iframe',
  'object',
  'embed',
  'summary',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false" i])',
  '[tabindex]',
].join(', ');

// Node.DOCUMENT_POSITION_PRECEDING = 2, Node.DOCUMENT_POSITION_FOLLOWING = 4
const DOCUMENT_POSITION_PRECEDING = 2;
const DOCUMENT_POSITION_FOLLOWING = 4;

/**
 * Whether `other` comes after `reference` in DOM order (descendants of `reference` included).
 */
export const isFollowing = (reference: Node, other: Node): boolean =>
  // eslint-disable-next-line no-bitwise
  !!(reference.compareDocumentPosition(other) & DOCUMENT_POSITION_FOLLOWING);

/**
 * Whether `other` comes before `reference` in DOM order (ancestors of `reference` included).
 */
export const isPreceding = (reference: Node, other: Node): boolean =>
  // eslint-disable-next-line no-bitwise
  !!(reference.compareDocumentPosition(other) & DOCUMENT_POSITION_PRECEDING);

/**
 * A predicate used to narrow down the elements returned by the focus finders.
 */
export type FocusableAcceptCondition = (element: HTMLElement) => boolean;

const isVisible = (element: HTMLElement): boolean => {
  if (typeof element.checkVisibility === 'function') {
    return element.checkVisibility({ visibilityProperty: true, contentVisibilityAuto: true } as CheckVisibilityOptions);
  }

  return element.getClientRects().length > 0;
};

/**
 * Returns `true` when the element can receive focus, either by keyboard or programmatically
 * (`tabindex="-1"` elements are focusable but not tabbable).
 */
export const isFocusable = (element: Element): element is HTMLElement => {
  if (!isHTMLElement(element) || !element.matches(FOCUSABLE_SELECTOR)) {
    return false;
  }

  if ((element as HTMLButtonElement).disabled || element.closest('[inert]')) {
    return false;
  }

  return isVisible(element);
};

/**
 * Returns `true` when the element is reachable with the Tab key.
 */
export const isTabbable = (element: Element): element is HTMLElement => isFocusable(element) && element.tabIndex >= 0;

const collect = (
  container: HTMLElement,
  predicate: (element: HTMLElement) => boolean,
  acceptCondition?: FocusableAcceptCondition,
): HTMLElement[] => {
  const result: HTMLElement[] = [];
  container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR).forEach(element => {
    if (predicate(element) && (!acceptCondition || acceptCondition(element))) {
      result.push(element);
    }
  });

  return result;
};

/**
 * Returns all focusable descendants of `container` in DOM order.
 */
export const findAllFocusable = (container: HTMLElement, acceptCondition?: FocusableAcceptCondition): HTMLElement[] =>
  collect(container, isFocusable, acceptCondition);

/**
 * Returns all tabbable descendants of `container` in DOM order.
 */
export const findAllTabbable = (container: HTMLElement, acceptCondition?: FocusableAcceptCondition): HTMLElement[] =>
  collect(container, isTabbable, acceptCondition);

/**
 * Returns the first focusable descendant of `container`.
 */
export const findFirstFocusable = (container: HTMLElement): HTMLElement | null =>
  findAllFocusable(container)[0] ?? null;

/**
 * Returns the last focusable descendant of `container`.
 */
export const findLastFocusable = (container: HTMLElement): HTMLElement | null => {
  const focusable = findAllFocusable(container);
  return focusable[focusable.length - 1] ?? null;
};

/**
 * Returns the focusable element that follows `current` in DOM order, searching within `options.container`
 * (defaults to the owner document's body).
 */
export const findNextFocusable = (
  current: HTMLElement,
  options: { container?: HTMLElement } = {},
): HTMLElement | null => {
  const container = options.container ?? current.ownerDocument.body;
  return findAllFocusable(container).find(element => isFollowing(current, element)) ?? null;
};

/**
 * Returns the focusable element that precedes `current` in DOM order, searching within `options.container`
 * (defaults to the owner document's body).
 */
export const findPrevFocusable = (
  current: HTMLElement,
  options: { container?: HTMLElement } = {},
): HTMLElement | null => {
  const container = options.container ?? current.ownerDocument.body;
  const preceding = findAllFocusable(container).filter(element => isPreceding(current, element));

  return preceding[preceding.length - 1] ?? null;
};

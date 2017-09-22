/* tslint:disable:no-string-literal */

import { elementContains, getDocument } from './dom';

const IS_FOCUSABLE_ATTRIBUTE = 'data-is-focusable';
const IS_VISIBLE_ATTRIBUTE = 'data-is-visible';
const FOCUSZONE_ID_ATTRIBUTE = 'data-focuszone-id';
const FOCUSZONE_SUB_ATTRIBUTE = 'data-is-sub-focuszone';

/**
 * Gets the first focusable element.
 *
 * @public
 */
export function getFirstFocusable(
  rootElement: HTMLElement,
  currentElement: HTMLElement,
  includeElementsInFocusZones?: boolean): HTMLElement | null {

  return getNextElement(rootElement, currentElement, true, false, false, includeElementsInFocusZones);
}

/**
 * Gets the last focusable element.
 *
 * @public
 */
export function getLastFocusable(
  rootElement: HTMLElement,
  currentElement: HTMLElement,
  includeElementsInFocusZones?: boolean): HTMLElement | null {

  return getPreviousElement(rootElement, currentElement, true, false, true, includeElementsInFocusZones);
}

/**
 * Attempts to focus the first focusable element that is a child or child's child of the rootElement.
 *
 * @public
 * @param rootElement - Element to start the search for a focusable child.
 * @returns True if focus was set, false if it was not.
 */
export function focusFirstChild(
  rootElement: HTMLElement): boolean {
  let element: HTMLElement | null = getNextElement(rootElement, rootElement, true, false, false, true);

  if (element) {
    element.focus();
    return true;
  }
  return false;
}

/**
 * Traverse to find the previous element.
 *
 * @public
 */
export function getPreviousElement(
  rootElement: HTMLElement,
  currentElement: HTMLElement | null,
  checkNode?: boolean,
  suppressParentTraversal?: boolean,
  traverseChildren?: boolean,
  includeElementsInFocusZones?: boolean,
  allowFocusRoot?: boolean): HTMLElement | null {

  if (!currentElement ||
    (!allowFocusRoot && currentElement === rootElement)) {
    return null;
  }

  let isCurrentElementVisible = isElementVisible(currentElement);

  // Check its children.
  if (traverseChildren && isCurrentElementVisible &&
    (includeElementsInFocusZones || !(isElementFocusZone(currentElement) || isElementFocusSubZone(currentElement)))) {
    const childMatch = getPreviousElement(
      rootElement,
      currentElement.lastElementChild as HTMLElement,
      true,
      true,
      true,
      includeElementsInFocusZones,
      allowFocusRoot);

    if (childMatch) {
      return childMatch;
    }
  }

  // Check the current node, if it's not the first traversal.
  if (checkNode && isCurrentElementVisible && isElementTabbable(currentElement)) {
    return currentElement;
  }

  // Check its previous sibling.
  const siblingMatch = getPreviousElement(
    rootElement,
    currentElement.previousElementSibling as HTMLElement,
    true,
    true,
    true,
    includeElementsInFocusZones,
    allowFocusRoot);

  if (siblingMatch) {
    return siblingMatch;
  }

  // Check its parent.
  if (!suppressParentTraversal) {
    return getPreviousElement(rootElement, currentElement.parentElement, true, false, false, includeElementsInFocusZones,
      allowFocusRoot);
  }

  return null;
}

/**
 * Traverse to find the next focusable element.
 *
 * @public
 */
export function getNextElement(
  rootElement: HTMLElement,
  currentElement: HTMLElement | null,
  checkNode?: boolean,
  suppressParentTraversal?: boolean,
  suppressChildTraversal?: boolean,
  includeElementsInFocusZones?: boolean,
  allowFocusRoot?: boolean): HTMLElement | null {

  if (
    !currentElement ||
    (currentElement === rootElement && suppressChildTraversal && !allowFocusRoot)) {
    return null;
  }

  let isCurrentElementVisible = isElementVisible(currentElement);

  // Check the current node, if it's not the first traversal.
  if (checkNode && isCurrentElementVisible && isElementTabbable(currentElement)) {
    return currentElement;
  }

  // Check its children.
  if (!suppressChildTraversal && isCurrentElementVisible &&
    (includeElementsInFocusZones || !(isElementFocusZone(currentElement) || isElementFocusSubZone(currentElement)))) {
    const childMatch = getNextElement(
      rootElement,
      currentElement.firstElementChild as HTMLElement,
      true,
      true,
      false,
      includeElementsInFocusZones,
      allowFocusRoot);

    if (childMatch) {
      return childMatch;
    }
  }

  if (currentElement === rootElement) {
    return null;
  }

  // Check its sibling.
  const siblingMatch = getNextElement(
    rootElement,
    currentElement.nextElementSibling as HTMLElement,
    true,
    true,
    false,
    includeElementsInFocusZones,
    allowFocusRoot);

  if (siblingMatch) {
    return siblingMatch;
  }

  if (!suppressParentTraversal) {
    return getNextElement(rootElement, currentElement.parentElement, false, false, true, includeElementsInFocusZones,
      allowFocusRoot);
  }

  return null;
}

/**
 * Determines if an element is visible.
 *
 * @public
 */
export function isElementVisible(element: HTMLElement | undefined | null): boolean {
  // If the element is not valid, return false.
  if (!element || !element.getAttribute) {
    return false;
  }

  const visibilityAttribute = element.getAttribute(IS_VISIBLE_ATTRIBUTE);

  // If the element is explicitly marked with the visibility attribute, return that value as boolean.
  if (visibilityAttribute !== null && visibilityAttribute !== undefined) {
    return visibilityAttribute === 'true';
  }

  // Fallback to other methods of determining actual visibility.
  return (element.offsetHeight !== 0 ||
    element.offsetParent !== null ||
    // tslint:disable-next-line:no-any
    (element as any).isVisible === true); // used as a workaround for testing.
}

/**
 * Determines if an element can receive focus.
 *
 * @public
 */
export function isElementTabbable(element: HTMLElement): boolean {

  // If this element is null or is disabled, it is not considered tabbable.
  if (!element || (element as HTMLButtonElement).disabled) {
    return false;
  }

  let tabIndex = 0;
  let tabIndexAttributeValue = null;

  if (element && element.getAttribute) {
    tabIndexAttributeValue = element.getAttribute('tabIndex');

    if (tabIndexAttributeValue) {
      tabIndex = parseInt(tabIndexAttributeValue, 10);
    }
  }

  let isFocusableAttribute = element.getAttribute ? element.getAttribute(IS_FOCUSABLE_ATTRIBUTE) : null;
  let isTabIndexSet = tabIndexAttributeValue !== null && tabIndex >= 0;

  return (
    !!element &&
    isFocusableAttribute !== 'false' &&
    (element.tagName === 'A' ||
      (element.tagName === 'BUTTON') ||
      (element.tagName === 'INPUT') ||
      (element.tagName === 'TEXTAREA') ||
      isFocusableAttribute === 'true' ||
      isTabIndexSet ||
      element.getAttribute && element.getAttribute('role') === 'button'
    ));
}

/**
 * Determines if a given element is a focus zone.
 *
 * @public
 */
export function isElementFocusZone(element?: HTMLElement): boolean {
  return !!(element && element.getAttribute && !!element.getAttribute(FOCUSZONE_ID_ATTRIBUTE));
}

/**
 * Determines if a given element is a focus sub zone.
 *
 * @public
 */
export function isElementFocusSubZone(element?: HTMLElement): boolean {
  return !!(element && element.getAttribute && element.getAttribute(FOCUSZONE_SUB_ATTRIBUTE) === 'true');
}

/**
 * Determines if an element, or any of its children, contain focus.
 *
 * @public
 */
export function doesElementContainFocus(element: HTMLElement): boolean {
  let document = getDocument(element);
  let currentActiveElement: HTMLElement | undefined = document && document.activeElement as HTMLElement;
  if (currentActiveElement && elementContains(element, currentActiveElement)) {
    return true;
  }
  return false;
}

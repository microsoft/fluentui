/* tslint:disable:no-string-literal */

import { elementContains, getDocument } from './dom';

const IS_FOCUSABLE_ATTRIBUTE = 'data-is-focusable';
const IS_VISIBLE_ATTRIBUTE = 'data-is-visible';
const FOCUSZONE_ID_ATTRIBUTE = 'data-focuszone-id';

export function getFirstFocusable(
  rootElement: HTMLElement,
  currentElement: HTMLElement,
  includeElementsInFocusZones?: boolean): HTMLElement {

  return getNextElement(rootElement, currentElement, true, false, false, includeElementsInFocusZones);
}

export function getLastFocusable(
  rootElement: HTMLElement,
  currentElement: HTMLElement,
  includeElementsInFocusZones?: boolean): HTMLElement {

  return getPreviousElement(rootElement, currentElement, true, false, true, includeElementsInFocusZones);
}

/**
 * Attempts to focus the first focusable element that is a child or child's child of the rootElement.
 * @param rootElement - Element to start the search for a focusable child.
 * @returns True if focus was set, false if it was not.
 */
export function focusFirstChild(
  rootElement: HTMLElement): boolean {
  let element: HTMLElement = getNextElement(rootElement, rootElement, true, false, false, true);

  if (element) {
    element.focus();
    return true;
  }
  return false;
}

/** Traverse to find the previous element. */
export function getPreviousElement(
  rootElement: HTMLElement,
  currentElement: HTMLElement,
  checkNode?: boolean,
  suppressParentTraversal?: boolean,
  traverseChildren?: boolean,
  includeElementsInFocusZones?: boolean): HTMLElement {

  if (!currentElement ||
    currentElement === rootElement) {
    return null;
  }

  let isCurrentElementVisible = isElementVisible(currentElement);

  // Check its children.
  if (traverseChildren && (includeElementsInFocusZones || !isElementFocusZone(currentElement)) && isCurrentElementVisible) {
    const childMatch = getPreviousElement(
      rootElement,
      currentElement.lastElementChild as HTMLElement,
      true,
      true,
      true,
      includeElementsInFocusZones);

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
    includeElementsInFocusZones);

  if (siblingMatch) {
    return siblingMatch;
  }

  // Check its parent.
  if (!suppressParentTraversal) {
    return getPreviousElement(rootElement, currentElement.parentElement, true, false, false, includeElementsInFocusZones);
  }

  return null;
}

/** Traverse to find the next focusable element. */
export function getNextElement(
  rootElement: HTMLElement,
  currentElement: HTMLElement,
  checkNode?: boolean,
  suppressParentTraversal?: boolean,
  suppressChildTraversal?: boolean,
  includeElementsInFocusZones?: boolean): HTMLElement {

  if (
    !currentElement ||
    (currentElement === rootElement && suppressChildTraversal)) {
    return null;
  }

  let isCurrentElementVisible = isElementVisible(currentElement);

  // Check the current node, if it's not the first traversal.
  if (checkNode && isCurrentElementVisible && isElementTabbable(currentElement)) {
    return currentElement;
  }

  // Check its children.
  if (!suppressChildTraversal && isCurrentElementVisible && (includeElementsInFocusZones || !isElementFocusZone(currentElement))) {
    const childMatch = getNextElement(
      rootElement,
      currentElement.firstElementChild as HTMLElement,
      true,
      true,
      false,
      includeElementsInFocusZones);

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
    includeElementsInFocusZones);

  if (siblingMatch) {
    return siblingMatch;
  }

  if (!suppressParentTraversal) {
    return getNextElement(rootElement, currentElement.parentElement, false, false, true, includeElementsInFocusZones);
  }

  return null;
}

export function isElementVisible(element: HTMLElement): boolean {
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
    (element as any).isVisible === true); // used as a workaround for testing.
}

export function isElementTabbable(element: HTMLElement): boolean {

  // If this element is null or is disabled, it is not considered tabbable.
  if (!element || (element as HTMLButtonElement).disabled) {
    return false;
  }

  // In IE, element.tabIndex is default to 0. We need to use element get tabIndex attribute to get the correct tabIndex
  let tabIndex = -1;

  if (element && element.getAttribute) {
    tabIndex = parseInt(element.getAttribute('tabIndex'), 10);
  }

  let isFocusableAttribute: string = element.getAttribute ? element.getAttribute(IS_FOCUSABLE_ATTRIBUTE) : null;

  return (
    !!element && isFocusableAttribute !== 'false' &&
    (element.tagName === 'A' ||
      (element.tagName === 'BUTTON') ||
      (element.tagName === 'INPUT') ||
      (element.tagName === 'TEXTAREA') ||
      (tabIndex >= 0) ||
      (element.getAttribute && (
        isFocusableAttribute === 'true' ||
        element.getAttribute('role') === 'button'
      ))
    ));
}

export function isElementFocusZone(element?: HTMLElement): boolean {
  return element && !!element.getAttribute(FOCUSZONE_ID_ATTRIBUTE);
}

export function doesElementContainFocus(element: HTMLElement) {
  let currentActiveElement: HTMLElement = getDocument(element).activeElement as HTMLElement;
  if (currentActiveElement && elementContains(element, currentActiveElement)) {
    return true;
  }
  return false;
}

import { IS_FOCUSABLE_ATTRIBUTE } from '@fluentui/accessibility';
import { getWindow } from '../utils/getWindow';
import { getParent } from '@fluentui/dom-utilities';

export const IS_VISIBLE_ATTRIBUTE = 'data-is-visible';
export const FOCUSZONE_ID_ATTRIBUTE = 'data-focuszone-id';
export const FOCUSZONE_SUB_ATTRIBUTE = 'data-is-sub-focuszone';
export const HIDDEN_FROM_ACC_TREE = 'data-is-hidden-from-acc-tree';

export { getDocument } from '../utils/getDocument';
export { getWindow } from '../utils/getWindow';
export { getParent } from '@fluentui/dom-utilities';

/**
 * Gets the first focusable element.
 *
 * @public
 */
export function getFirstFocusable(
  rootElement: HTMLElement,
  currentElement: HTMLElement,
  includeElementsInFocusZones?: boolean,
): HTMLElement | null {
  return getNextElement(
    rootElement,
    currentElement,
    true /* checkNode */,
    false /* suppressParentTraversal */,
    false /* suppressChildTraversal */,
    includeElementsInFocusZones,
  );
}

/**
 * Gets the last focusable element.
 *
 * @public
 */
export function getLastFocusable(
  rootElement: HTMLElement,
  currentElement: HTMLElement,
  includeElementsInFocusZones?: boolean,
): HTMLElement | null {
  return getPreviousElement(
    rootElement,
    currentElement,
    true /* checkNode */,
    false /* suppressParentTraversal */,
    true /* traverseChildren */,
    includeElementsInFocusZones,
  );
}

/**
 * Gets the first tabbable element.
 * The difference between focusable and tabbable is that tabbable elements are focusable elements that also have tabIndex != -1.
 * @param rootElement - The parent element to search beneath.
 * @param currentElement - The descendant of rootElement to start the search at.  This element is the first one checked,
 * and iteration continues forward.  Typical use passes rootElement.firstChild.
 * @param includeElementsInFocusZones - true if traversal should go into FocusZone descendants.
 * @public
 */
export function getFirstTabbable(
  rootElement: HTMLElement,
  currentElement: HTMLElement,
  includeElementsInFocusZones?: boolean,
  checkNode?: boolean,
): HTMLElement | null {
  return getNextElement(
    rootElement,
    currentElement,
    checkNode,
    false /* suppressParentTraversal */,
    false /* suppressChildTraversal */,
    includeElementsInFocusZones,
    true /* tabbable */,
  );
}

/**
 * Gets the last tabbable element.
 * The difference between focusable and tabbable is that tabbable elements are focusable elements that also have tabIndex != -1.
 * @param rootElement - The parent element to search beneath.
 * @param currentElement - The descendant of rootElement to start the search at.  This element is the first one checked,
 * and iteration continues in reverse.  Typical use passes rootElement.lastChild.
 * @param includeElementsInFocusZones - true if traversal should go into FocusZone descendants.
 * @public
 */
export function getLastTabbable(
  rootElement: HTMLElement,
  currentElement: HTMLElement,
  includeElementsInFocusZones?: boolean,
  checkNode?: boolean,
): HTMLElement | null {
  return getPreviousElement(
    rootElement,
    currentElement,
    checkNode,
    false /* suppressParentTraversal */,
    true /* traverseChildren */,
    includeElementsInFocusZones,
    true /* tabbable */,
  );
}

/**
 * Traverse to find the previous element.
 * If tabbable is true, the element must have tabIndex != -1.
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
  tabbable?: boolean,
): HTMLElement | null {
  if (!currentElement || currentElement === rootElement) {
    return null;
  }

  const isCurrentElementVisible = isElementVisible(currentElement);

  // Check its children.
  if (
    traverseChildren &&
    isCurrentElementVisible &&
    (includeElementsInFocusZones || !(isElementFocusZone(currentElement) || isElementFocusSubZone(currentElement)))
  ) {
    const childMatch = getPreviousElement(
      rootElement,
      currentElement.lastElementChild as HTMLElement,
      true,
      true,
      true,
      includeElementsInFocusZones,
      tabbable,
    );

    if (childMatch) {
      if ((tabbable && isElementTabbable(childMatch, true)) || !tabbable) {
        return childMatch;
      }

      const childMatchSiblingMatch = getPreviousElement(
        rootElement,
        childMatch.previousElementSibling as HTMLElement,
        true,
        true,
        true,
        includeElementsInFocusZones,
        tabbable,
      );
      if (childMatchSiblingMatch) {
        return childMatchSiblingMatch;
      }

      let childMatchParent = childMatch.parentElement;

      // At this point if we have not found any potential matches
      // start looking at the rest of the subtree under the currentParent.
      // NOTE: We do not want to recurse here because doing so could
      // cause elements to get skipped.
      while (childMatchParent && childMatchParent !== currentElement) {
        const childMatchParentMatch = getPreviousElement(
          rootElement,
          childMatchParent.previousElementSibling as HTMLElement,
          true,
          true,
          true,
          includeElementsInFocusZones,
          tabbable,
        );

        if (childMatchParentMatch) {
          return childMatchParentMatch;
        }

        childMatchParent = childMatchParent.parentElement;
      }
    }
  }

  // Check the current node, if it's not the first traversal.
  if (checkNode && isCurrentElementVisible && isElementTabbable(currentElement, tabbable)) {
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
    tabbable,
  );

  if (siblingMatch) {
    return siblingMatch;
  }

  // Check its parent.
  if (!suppressParentTraversal) {
    return getPreviousElement(
      rootElement,
      currentElement.parentElement,
      true,
      false,
      false,
      includeElementsInFocusZones,
      tabbable,
    );
  }

  return null;
}

/**
 * Traverse to find the next focusable element.
 * If tabbable is true, the element must have tabIndex != -1.
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
  tabbable?: boolean,
): HTMLElement | null {
  if (!currentElement || (currentElement === rootElement && suppressChildTraversal)) {
    return null;
  }

  const isCurrentElementVisible = isElementVisible(currentElement);

  // Check the current node, if it's not the first traversal.
  if (checkNode && isCurrentElementVisible && isElementTabbable(currentElement, tabbable)) {
    return currentElement;
  }

  // Check its children.
  if (
    !suppressChildTraversal &&
    isCurrentElementVisible &&
    (includeElementsInFocusZones || !(isElementFocusZone(currentElement) || isElementFocusSubZone(currentElement)))
  ) {
    const childMatch = getNextElement(
      rootElement,
      currentElement.firstElementChild as HTMLElement,
      true,
      true,
      false,
      includeElementsInFocusZones,
      tabbable,
    );

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
    tabbable,
  );

  if (siblingMatch) {
    return siblingMatch;
  }

  if (!suppressParentTraversal) {
    return getNextElement(
      rootElement,
      currentElement.parentElement,
      false,
      false,
      true,
      includeElementsInFocusZones,
      tabbable,
    );
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
  return (
    element.offsetHeight !== 0 ||
    element.offsetParent !== null ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (element as any).isVisible === true
  ); // used as a workaround for testing.
}

/**
 * Determines if an element can receive focus programmatically or via a mouse click.
 * If checkTabIndex is true, additionally checks to ensure the element can be focused with the tab key, meaning tabIndex != -1.
 *
 * @public
 */
export function isElementTabbable(element: HTMLElement, checkTabIndex?: boolean): boolean {
  // If this element is null or is disabled, it is not considered tabbable.
  if (!element || (element as HTMLButtonElement).disabled) {
    return false;
  }

  let tabIndex = 0;
  let tabIndexAttributeValue: string | null = null;

  if (element && element.getAttribute) {
    tabIndexAttributeValue = element.getAttribute('tabIndex');

    if (tabIndexAttributeValue) {
      tabIndex = parseInt(tabIndexAttributeValue, 10);
    }
  }

  const isFocusableAttribute = element.getAttribute ? element.getAttribute(IS_FOCUSABLE_ATTRIBUTE) : null;
  const isTabIndexSet = tabIndexAttributeValue !== null && tabIndex >= 0;

  const result =
    !!element &&
    isFocusableAttribute !== 'false' &&
    (element.tagName === 'A' ||
      element.tagName === 'BUTTON' ||
      element.tagName === 'INPUT' ||
      element.tagName === 'TEXTAREA' ||
      isFocusableAttribute === 'true' ||
      isTabIndexSet ||
      (element.getAttribute && element.getAttribute('role') === 'button'));

  return checkTabIndex ? tabIndex !== -1 && result : result;
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

let targetToFocusOnNextRepaint: HTMLElement | { focus: () => void } | null | undefined = undefined;

/**
 * Sets focus to an element asynchronously. The focus will be set at the next browser repaint,
 * meaning it won't cause any extra recalculations. If more than one focusAsync is called during one frame,
 * only the latest called focusAsync element will actually be focused
 * @param element - The element to focus
 */
export function focusAsync(element: HTMLElement | { focus: () => void } | undefined | null): void {
  if (element) {
    // An element was already queued to be focused, so replace that one with the new element
    if (targetToFocusOnNextRepaint) {
      targetToFocusOnNextRepaint = element;
      return;
    }

    targetToFocusOnNextRepaint = element;

    const win = getWindow(element as Element);

    if (win) {
      // element.focus() is a no-op if the element is no longer in the DOM, meaning this is always safe
      win.requestAnimationFrame(() => {
        targetToFocusOnNextRepaint && targetToFocusOnNextRepaint.focus();

        // We are done focusing for this frame, so reset the queued focus element
        targetToFocusOnNextRepaint = undefined;
      });
    }
  }
}

/**
 * Finds the closest focusable element via an index path from a parent. See
 * `getElementIndexPath` for getting an index path from an element to a child.
 */
export function getFocusableByIndexPath(parent: HTMLElement, path: number[]): HTMLElement | undefined {
  let element = parent;

  for (const index of path) {
    const nextChild = element.children[Math.min(index, element.children.length - 1)] as HTMLElement;

    if (!nextChild) {
      break;
    }
    element = nextChild;
  }

  element =
    isElementTabbable(element) && isElementVisible(element)
      ? element
      : getNextElement(parent, element, true) || getPreviousElement(parent, element)!;

  return element as HTMLElement;
}

/**
 * Finds the element index path from a parent element to a child element.
 *
 * If you had this node structure: "A has children [B, C] and C has child D",
 * the index path from A to D would be [1, 0], or `parent.chidren[1].children[0]`.
 */
export function getElementIndexPath(fromElement: HTMLElement, toElement: HTMLElement): number[] {
  const path: number[] = [];
  let currentElement: HTMLElement = toElement;

  while (currentElement && fromElement && currentElement !== fromElement) {
    const parent = getParent(currentElement, false);

    if (parent === null) {
      return [];
    }

    path.unshift(Array.prototype.indexOf.call(parent.children, currentElement));
    currentElement = parent;
  }

  return path;
}

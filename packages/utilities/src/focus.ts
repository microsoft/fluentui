import { elementContainsAttribute } from './dom/elementContainsAttribute';
import { elementContains } from './dom/elementContains';
import { getParent } from './dom/getParent';
import { getWindow } from './dom/getWindow';
import { getDocument } from './dom/getDocument';

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
  includeElementsInFocusZones?: boolean,
  includeShadowRoots?: boolean,
): HTMLElement | null {
  return getNextElement(
    rootElement,
    currentElement,
    true /*checkNode*/,
    false /*suppressParentTraversal*/,
    false /*suppressChildTraversal*/,
    includeElementsInFocusZones,
    undefined,
    undefined,
    undefined,
    includeShadowRoots,
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
  includeShadowRoots?: boolean,
): HTMLElement | null {
  return getPreviousElement(
    rootElement,
    currentElement,
    true /*checkNode*/,
    false /*suppressParentTraversal*/,
    true /*traverseChildren*/,
    includeElementsInFocusZones,
    undefined,
    undefined,
    includeShadowRoots,
  );
}

/**
 * Gets the first tabbable element. (The difference between focusable and tabbable is that tabbable elements are
 * focusable elements that also have tabIndex != -1.)
 * @param rootElement - The parent element to search beneath.
 * @param currentElement - The descendant of rootElement to start the search at.  This element is the first one checked,
 * and iteration continues forward.  Typical use passes rootElement.firstChild.
 * @param includeElementsInFocusZones - true if traversal should go into FocusZone descendants.
 * @param checkNode - Include currentElement in search when true. Defaults to true.
 * @public
 */
export function getFirstTabbable(
  rootElement: HTMLElement,
  currentElement: HTMLElement,
  includeElementsInFocusZones?: boolean,
  checkNode: boolean = true,
  includeShadowRoots?: boolean,
): HTMLElement | null {
  return getNextElement(
    rootElement,
    currentElement,
    checkNode,
    false /*suppressParentTraversal*/,
    false /*suppressChildTraversal*/,
    includeElementsInFocusZones,
    false /*allowFocusRoot*/,
    true /*tabbable*/,
    undefined,
    includeShadowRoots,
  );
}

/**
 * Gets the last tabbable element. (The difference between focusable and tabbable is that tabbable elements are
 * focusable elements that also have tabIndex != -1.)
 * @param rootElement - The parent element to search beneath.
 * @param currentElement - The descendant of rootElement to start the search at.  This element is the first one checked,
 * and iteration continues in reverse.  Typical use passes rootElement.lastChild.
 * @param includeElementsInFocusZones - true if traversal should go into FocusZone descendants.
 * @param checkNode - Include currentElement in search when true. Defaults to true.
 * @public
 */
export function getLastTabbable(
  rootElement: HTMLElement,
  currentElement: HTMLElement,
  includeElementsInFocusZones?: boolean,
  checkNode: boolean = true,
  includeShadowRoots?: boolean,
): HTMLElement | null {
  return getPreviousElement(
    rootElement,
    currentElement,
    checkNode,
    false /*suppressParentTraversal*/,
    true /*traverseChildren*/,
    includeElementsInFocusZones,
    false /*allowFocusRoot*/,
    true /*tabbable*/,
    includeShadowRoots,
  );
}

/**
 * Attempts to focus the first focusable element that is a child or child's child of the rootElement.
 *
 * @public
 * @param rootElement - Element to start the search for a focusable child.
 * @param bypassHiddenElements - If true, focus will be not be set on hidden elements.
 * @returns True if focus was set, false if it was not.
 */
export function focusFirstChild(
  rootElement: HTMLElement,
  bypassHiddenElements?: boolean,
  includeShadowRoots?: boolean,
): boolean {
  let element: HTMLElement | null = getNextElement(
    rootElement,
    rootElement,
    true,
    false,
    false,
    true,
    undefined,
    undefined,
    bypassHiddenElements,
    includeShadowRoots,
  );

  if (element) {
    focusAsync(element);
    return true;
  }
  return false;
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
  allowFocusRoot?: boolean,
  tabbable?: boolean,
  includeShadowRoots?: boolean,
): HTMLElement | null {
  if (!currentElement || (!allowFocusRoot && currentElement === rootElement)) {
    return null;
  }

  let isCurrentElementVisible = isElementVisible(currentElement);

  // Check its children.
  if (
    traverseChildren &&
    isCurrentElementVisible &&
    (includeElementsInFocusZones || !(isElementFocusZone(currentElement) || isElementFocusSubZone(currentElement)))
  ) {
    const lastElementChild = (currentElement.lastElementChild ||
      (includeShadowRoots && currentElement.shadowRoot?.lastElementChild)) as HTMLElement;

    const childMatch = getPreviousElement(
      rootElement,
      lastElementChild,
      true,
      true,
      true,
      includeElementsInFocusZones,
      allowFocusRoot,
      tabbable,
      includeShadowRoots,
    );

    if (childMatch) {
      if ((tabbable && isElementTabbable(childMatch, true, includeShadowRoots)) || !tabbable) {
        return childMatch;
      }

      const childMatchSiblingMatch = getPreviousElement(
        rootElement,
        childMatch.previousElementSibling as HTMLElement,
        true,
        true,
        true,
        includeElementsInFocusZones,
        allowFocusRoot,
        tabbable,
        includeShadowRoots,
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
          allowFocusRoot,
          tabbable,
          includeShadowRoots,
        );

        if (childMatchParentMatch) {
          return childMatchParentMatch;
        }

        childMatchParent = childMatchParent.parentElement;
      }
    }
  }

  // Check the current node, if it's not the first traversal.
  if (checkNode && isCurrentElementVisible && isElementTabbable(currentElement, tabbable, includeShadowRoots)) {
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
    allowFocusRoot,
    tabbable,
    includeShadowRoots,
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
      allowFocusRoot,
      tabbable,
      includeShadowRoots,
    );
  }

  return null;
}

/**
 * Traverse to find the next focusable element.
 * If tabbable is true, the element must have tabIndex != -1.
 *
 * @public
 * @param checkNode - Include currentElement in search when true.
 */
export function getNextElement(
  rootElement: HTMLElement,
  currentElement: HTMLElement | null,
  checkNode?: boolean,
  suppressParentTraversal?: boolean,
  suppressChildTraversal?: boolean,
  includeElementsInFocusZones?: boolean,
  allowFocusRoot?: boolean,
  tabbable?: boolean,
  bypassHiddenElements?: boolean,
  includeShadowRoots?: boolean,
): HTMLElement | null {
  if (!currentElement || (currentElement === rootElement && suppressChildTraversal && !allowFocusRoot)) {
    return null;
  }

  const checkElementVisibility = bypassHiddenElements ? isElementVisibleAndNotHidden : isElementVisible;

  let isCurrentElementVisible = checkElementVisibility(currentElement);

  // Check the current node, if it's not the first traversal.
  if (checkNode && isCurrentElementVisible && isElementTabbable(currentElement, tabbable, includeShadowRoots)) {
    return currentElement;
  }

  // Check its children.
  if (
    !suppressChildTraversal &&
    isCurrentElementVisible &&
    (includeElementsInFocusZones || !(isElementFocusZone(currentElement) || isElementFocusSubZone(currentElement)))
  ) {
    const firstElementchild = (currentElement.firstElementChild ||
      (includeShadowRoots && currentElement.shadowRoot?.firstElementChild)) as HTMLElement;

    const childMatch = getNextElement(
      rootElement,
      firstElementchild,
      true,
      true,
      false,
      includeElementsInFocusZones,
      allowFocusRoot,
      tabbable,
      bypassHiddenElements,
      includeShadowRoots,
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
    allowFocusRoot,
    tabbable,
    bypassHiddenElements,
    includeShadowRoots,
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
      allowFocusRoot,
      tabbable,
      bypassHiddenElements,
      includeShadowRoots,
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
 * Determines if an element is visible and not hidden
 * @param element - Element to check
 * @returns Returns true if the given element is visible and not hidden
 *
 * @public
 */
export function isElementVisibleAndNotHidden(element: HTMLElement | undefined | null, win?: Window): boolean {
  const theWin = win ?? getWindow()!;
  return (
    !!element &&
    isElementVisible(element) &&
    !element.hidden &&
    theWin.getComputedStyle(element).visibility !== 'hidden'
  );
}

/**
 * Determines if an element can receive focus programmatically or via a mouse click.
 * If checkTabIndex is true, additionally checks to ensure the element can be focused with the tab key,
 * meaning tabIndex != -1.
 *
 * @public
 */
export function isElementTabbable(
  element: HTMLElement,
  checkTabIndex?: boolean,
  checkShadowRoot: boolean = true,
): boolean {
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
  let delegatesFocus = checkShadowRoot && element.shadowRoot ? !!element.shadowRoot.delegatesFocus : false;

  const result =
    !!element &&
    isFocusableAttribute !== 'false' &&
    (element.tagName === 'A' ||
      element.tagName === 'BUTTON' ||
      element.tagName === 'INPUT' ||
      element.tagName === 'TEXTAREA' ||
      element.tagName === 'SELECT' ||
      isFocusableAttribute === 'true' ||
      isTabIndexSet ||
      delegatesFocus);

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

/**
 * Determines if an element, or any of its children, contain focus.
 *
 * @public
 */
export function doesElementContainFocus(element: HTMLElement): boolean {
  let doc = getDocument(element);
  let currentActiveElement: HTMLElement | undefined = doc && (doc.activeElement as HTMLElement);
  if (currentActiveElement && elementContains(element, currentActiveElement)) {
    return true;
  }
  return false;
}

/**
 * Determines if an, or any of its ancestors, sepcificies that it doesn't want focus to wrap
 * @param element - element to start searching from
 * @param noWrapDataAttribute - the no wrap data attribute to match (either)
 * @returns true if focus should wrap, false otherwise
 */
export function shouldWrapFocus(
  element: HTMLElement,
  noWrapDataAttribute: 'data-no-vertical-wrap' | 'data-no-horizontal-wrap',
  doc?: Document,
): boolean {
  const theDoc = doc ?? getDocument()!;
  return elementContainsAttribute(element, noWrapDataAttribute, theDoc) === 'true' ? false : true;
}

let animationId: number | undefined = undefined;

/**
 * Sets focus to an element asynchronously. The focus will be set at the next browser repaint,
 * meaning it won't cause any extra recalculations. If more than one focusAsync is called during one frame,
 * only the latest called focusAsync element will actually be focused
 * @param element - The element to focus
 */
export function focusAsync(element: HTMLElement | { focus: () => void } | undefined | null): void {
  if (element) {
    const win = getWindow(element as Element);

    if (win) {
      // cancel any previous focus queues
      if (animationId !== undefined) {
        win.cancelAnimationFrame(animationId);
      }

      // element.focus() is a no-op if the element is no longer in the DOM, meaning this is always safe
      animationId = win.requestAnimationFrame(() => {
        element && element.focus();

        // We are done focusing for this frame, so reset the queued focus element
        animationId = undefined;
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

  while (toElement && fromElement && toElement !== fromElement) {
    const parent = getParent(toElement, true);

    if (parent === null) {
      return [];
    }

    path.unshift(Array.prototype.indexOf.call(parent.children, toElement));
    toElement = parent;
  }

  return path;
}

import DomTraversal from '../dom/DomTraversal';

/**
 * Utility methods that help with finding focusable elements in a DOM tree and navigating the focus between elements.
 * All the methods use the concept of 'Focusable Sub-Tree' defined as follows:
 * For any given DOM tree, the Focusable Sub-Tree is the sub-tree of DOM elements that are focusable except the root.
 * A focusable element is an element that browsers can set the focus to. For more details refer to the
 * documentations for isElementFocusable method.
 *
 * @public
 */
export default class Focus {
  /**
   * Checks if an element is independently (regardless of its children) focusable.
   * A DOM element is focusable if it meets all these requirements:
   * - Its hidden property (element.hidden) returns false.
   * - Its offsetParent property (element.offsetParent) returns true. This ensures that a non-fixed element
   *    is not hidden, but it doesn't work for fixed elements.
   * - In its computed style, 'display' !== 'none' and 'visibility' !== 'hidden'. This ensures the element is visible.
   * - The tabindex attribute value is not negative. (Not checked if ignoreTabIndex input parameter is true)
   * - It meets at least one of these conditions:
   *    1. <button>, <input>, <select> or <textarea> element that is not disabled
   *    2. <a> element with non-empty href attribute
   *    3. contenteditable attribute set to true
   *
   * Special case for compliance with office-ui-fabric-react: office-ui-fabric-react uses data-is-focusable attribute
   * for all elements that could be focusable inside a FocusZone and uses tabindex=0 to set the focus currently
   * focused element and all other elements that that are not currently focused have tabindex=-1. This can hide those
   * actually focusable elements from a standard search (because their tabindex is -1), therefore the ignoreTabIndex
   * input parameter is provided to make sure those elements are discoverable. In case you have office-ui-fabric-react
   * controls in your application, you may want to use this parameter depending on your scenario. Otherwise, you can
   * ignore the ignoreTabIndex parameter.
   */
  public static isElementFocusable(elem: HTMLElement, ignoreTabIndex: boolean = false): boolean {
    if (
      elem
      && !elem.hidden
      && elem.offsetParent
      && window.getComputedStyle(elem).display !== 'none'
      && window.getComputedStyle(elem).visibility !== 'hidden'
    ) {
      const tagName: string = elem.tagName.toLowerCase();
      const hasTabIndex: boolean = elem.hasAttribute('tabindex');
      const tabindex: number = parseInt(elem.getAttribute('tabindex') || '', 10);

      if (!ignoreTabIndex && hasTabIndex && tabindex < 0) {
        return false;
      }

      if (
        tagName === 'a' && !!(elem as HTMLAnchorElement).href ||
        elem.isContentEditable
      ) {
        return true;
      }

      if (
        (
          tagName === 'button' ||
          tagName === 'input' ||
          tagName === 'select' ||
          tagName === 'textarea'
        ) && !(elem as HTMLButtonElement).disabled
      ) {
        return true;
      }

      /**
       * There are few cases like office-ui-fabric-react's dropdown control, which do not
       * use the conventional HTML elements to create dropdown. Instead they are using a
       * data attribute 'is-focusable' and making it focusable. Hence to respect those elements
       * added this check. Check this only when the 'ignoreTabIndex' is true, this is because when
       * user doesn't want to ignore tabindexes then tabindex will get preference over this attribute.
       */
      if (ignoreTabIndex && elem.getAttribute('data-is-focusable') === 'true') {
        return true;
      }

      if (!ignoreTabIndex && hasTabIndex && tabindex > -1) {
        return true;
      }
    }

    return false;
  }

  /**
   * Gets all the immediate children of the given element's Focusable Sub-Tree. The order is the same as
   * the default tab order of the elements.
   */
  public static getFocusableChildren(element: HTMLElement, ignoreTabIndex: boolean = false): HTMLElement[] {
    const children: HTMLElement[] = [];
    const nodes: NodeList = Focus._queryFocusableSelector(element);
    for (let i: number = 0; i < nodes.length; i++) {
      const node: HTMLElement = nodes[i] as HTMLElement;
      if (Focus.isElementFocusable(node, ignoreTabIndex) && Focus.getFocusableParent(node, element) === element) {
        children.push(node);
      }
    }

    // Sort list to bring up the elements with non-zero tabindex
    // Using insertion sort to ensure stabe sorting
    for (let i: number = 0; i < children.length; i++) {
      const iTabIndex: number = parseInt(children[i].getAttribute('tabindex') || '0', 10);
      if (iTabIndex > 0) {
        const e: HTMLElement = children.splice(i, 1)[0];
        for (let j: number = 0; j < i; j++) {
          const jTabIndex: number = parseInt(children[j].getAttribute('tabindex') || '0', 10);
          if (jTabIndex === 0 || iTabIndex < jTabIndex) {
            children.splice(j, 0, e);
            break;
          }
        }
      }
    }

    return children;
  }

  /**
   * Gets the first focusable parent of a given element. The root parameter can be provided to scope the
   * search inside a given tree, otherwise the root defaults document body.
   *
   * @returns The focusable parent if it exists, otherwise the root
   *
   * @remarks The input element itself does not need to be focusable.
   */
  public static getFocusableParent(element: HTMLElement, root?: HTMLElement): HTMLElement {
    root = root || document.body;
    const parent: HTMLElement | undefined = DomTraversal.getFirstMatchingParent(element, this.isElementFocusable, root, false);
    return parent || root;
  }

  /**
   * Gets the first focusable child of a given element. The return value is equivalent of the first element
   * of getFocusableChildren, but this method is more performant.
   */
  public static getFirstFocusableChild(elem: HTMLElement, ignoreTabIndex: boolean = false): HTMLElement | undefined {
    const nodes: NodeList = Focus._queryFocusableSelector(elem);
    for (let i: number = 0; i < nodes.length; i++) {
      const node: HTMLElement = nodes[i] as HTMLElement;
      if (Focus.isElementFocusable(node, ignoreTabIndex)) {
        return node;
      }
    }
    return undefined;
  }

  /**
   * Gets all the descendants of the given element's Focusable Sub-Tree. The order is the same as
   * the default tab order of the elements.
   */
  public static getFocusableDescendants(
    element: HTMLElement,
    ignoreTabIndex: boolean = false
  ): HTMLElement[] {
    return Focus._getFocusableDescendants(element, ignoreTabIndex, []);
  }

  private static _getFocusableDescendants(
    element: HTMLElement,
    ignoreTabIndex: boolean = false,
    descendants: HTMLElement[]
  ): HTMLElement[] {
    descendants.push(element);
    const children: HTMLElement[] = Focus.getFocusableChildren(element, ignoreTabIndex);
    for (const child of children) {
      descendants.concat(Focus._getFocusableDescendants(child, ignoreTabIndex, descendants));
    }
    return descendants;
  }

  /**
   * Gets all the siblings of the given element inside the given root's Focusable Sub-Tree. The order is the
   * same as the default tab order of the elements. The root defaults to document body.
   *
   * @remarks The siblings are calculated by finding the parent and then returning its focusable children.
   * Therefore, the input element itself does not need to be a focusable element.
   */
  public static getFocusableSiblings(element: HTMLElement, root?: HTMLElement): HTMLElement[] {
    root = root || document.body;
    const parent: HTMLElement = Focus.getFocusableParent(element, root);
    if (parent) {
      const children: HTMLElement[] = Focus.getFocusableChildren(parent);
      // Remove input element and start the list from its next sibling
      const siblings: HTMLElement[] = [];
      let insertPointer: number = 0;
      for (const child of children) {
        if (child !== element) {
          siblings.splice(insertPointer++, 0, child);
        } else {
          insertPointer = 0;
        }
      }
      return siblings;
    }

    return [];
  }

  /**
   * Gets the next focusable sibling of the given element (assuming circular navigation)
   */
  public static getNextFocusableSibling(element: HTMLElement, root?: HTMLElement): HTMLElement {
    root = root || document.body;
    const siblings: HTMLElement[] = Focus.getFocusableSiblings(element, root);
    return siblings[0];
  }

  /**
   * Gets the previous focusable sibling of the given element (assuming circular navigation)
   */
  public static getPrevFocusableSibling(element: HTMLElement, root?: HTMLElement): HTMLElement {
    root = root || document.body;
    const siblings: HTMLElement[] = Focus.getFocusableSiblings(element, root);
    return siblings[siblings.length - 1];
  }

  /**
   * Navigates focus inside the element by setting focus on its first child in its Focusable Sub-Tree
   *
   * @returns true if the element has a focusable child
   */
  public static focusInside(element: HTMLElement): boolean {
    if (!element) {
      return false;
    }

    const children: HTMLElement[] = Focus.getFocusableChildren(element);
    if (children.length) {
      children[0].focus();
      return true;
    } else {
      return false;
    }
  }

  /**
   * Navigates focus to the element. If the element is not focusable, tries setting the focus inside the element
   *
   * @returns true if the element is focusable or has a focusable child
   */
  public static focusTo(element: HTMLElement): boolean {
    if (Focus.isElementFocusable(element)) {
      element.focus();
      return true;
    } else {
      return Focus.focusInside(element);
    }
  }

  /**
   * Navigates focus to the first focusable parent of the element. topElement parameter can be used to scope the
   *  parent search to a specific DOM tree. topElement defaults to document body.
   *
   * @returns true if a focusable parent is found
   */
  public static focusOutOf(element: HTMLElement, root: HTMLElement): boolean {
    root = root || document.body;
    const parent: HTMLElement = Focus.getFocusableParent(element, root);
    if (parent && parent !== root) {
      parent.focus();
      return true;
    } else {
      return false;
    }
  }

  /**
   * Checks if the given element has the focus
   *
   * @param element - the element to check
   * @param checkChildren - if the children of the given element should be also checked
   */
  public static hasFocus(element: HTMLElement, checkChildren: boolean = false): boolean {
    if (document.activeElement === element) {
      return true;
    }

    if (checkChildren && DomTraversal.contains(element, document.activeElement as HTMLElement)) {
      return true;
    }

    return false;
  }

  private static _queryFocusableSelector(element: HTMLElement): NodeList {
    const selector: string =
      'button,input,textarea,select,a[href]:not([href=\'\']),\
    [tabindex],[contenteditable=\'true\'], [data-is-focusable=\'true\']';
    return element.querySelectorAll(selector);
  }
}

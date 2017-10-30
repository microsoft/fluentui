/**
 * Utility methods that help with exploring elements in a DOM tree
 *
 * @public
 */
export default class DomTraversal {
  /**
   * Checks if the given parent element contains the given child element
   *
   * @param parent - The parent element
   * @param child  - The child element to be checked
   */
  public static contains(parent: HTMLElement, child: HTMLElement): boolean {
    // tslint:disable-next-line:no-bitwise
    return (child.compareDocumentPosition(parent) & Node.DOCUMENT_POSITION_CONTAINS) !== 0;
  }

  /**
   * Gets the path from a parent element in the DOM tree to its child.
   *
   * @param parent - The parent element that the path starts with
   * @param child - The child element that the path ends with
   * @param root - The root element of the DOM tree to scope the search tree
   *
   * @returns Array of elements containing all elements in the path including the parent as first element and
   *  the child as last element. Undefined if the path does not exist.
   */
  public static getElementPath(
    parent: HTMLElement,
    child: HTMLElement,
    root?: HTMLElement
  ): HTMLElement[] | undefined {
    root = root || document.body;
    const path: HTMLElement[] = [];
    let pathElem: HTMLElement | undefined = child;

    while (pathElem) {
      path.unshift(pathElem);
      if (pathElem === parent || pathElem === root || pathElem === document.body) {
        break;
      }
      pathElem = pathElem.parentElement || undefined;
    }

    return path[0] === parent ? path : undefined;
  }

  /**
   * Gets the lowest common ancestor element of two elements in the DOM tree
   */
  public static getLowestCommonAncestor(
    element1: HTMLElement,
    element2: HTMLElement,
    root?: HTMLElement
  ): HTMLElement | undefined {
    root = root || document.body;
    const path1: HTMLElement[] | undefined = DomTraversal.getElementPath(root, element1);
    const path2: HTMLElement[] | undefined = DomTraversal.getElementPath(root, element2);

    if (path1 && path2 && path1[0] === path2[0]) {
      for (let i: number = 1; i < path1.length; i++) {
        if (path1[i] !== path2[i]) {
          return path1[i - 1];
        }
      }
    }

    return undefined;
  }

  /**
   * Returns the first ancestor of the given element for which the matcher callback returns true.
   */
  public static getFirstMatchingParent(
    element: HTMLElement,
    matcher: (e: HTMLElement) => boolean,
    root?: HTMLElement,
    includeSelf: boolean = true
  ): HTMLElement | undefined {
    root = root || document.body;
    let currentElement: HTMLElement | undefined = element;
    if (!includeSelf && element) {
      currentElement = currentElement.parentElement || undefined;
    }

    while (currentElement && currentElement !== document.body) {
      if (matcher(currentElement)) {
        return currentElement;
      }
      if (currentElement === root) {
        break;
      }
      currentElement = currentElement.parentElement || undefined;
    }

    return undefined;
  }

  public static forEachElementInPath(
    src: HTMLElement | undefined,
    dest: HTMLElement | undefined,
    callback: (element: HTMLElement, isOutward: boolean) => void,
    root?: HTMLElement
  ): void {
    root = root || document.body;
    let outwardPath: HTMLElement[] | undefined;
    let inwardPath: HTMLElement[] | undefined;

    if (!src && dest) {
      // Getting focus from external element
      inwardPath = DomTraversal.getElementPath(root, dest);
    } else if (src && !dest) {
      // Losing focus to external element
      outwardPath = DomTraversal.getElementPath(root, src);
    } else if (src && dest) {
      // Going from parent to child?
      inwardPath = DomTraversal.getElementPath(src, dest);

      if (!inwardPath) {
        // Going from child to parent?
        outwardPath = DomTraversal.getElementPath(dest, src);
      }

      if (!inwardPath && !outwardPath) {
        // Going from one branch to another branch
        const lca: HTMLElement | undefined = DomTraversal.getLowestCommonAncestor(src, dest, root);
        if (lca) {
          outwardPath = DomTraversal.getElementPath(lca, src);
          inwardPath = DomTraversal.getElementPath(lca, dest);
        }
      }
    }

    // Remove the lca because the lca itself is not a part of the path
    if (inwardPath) {
      inwardPath.shift();
    }

    if (outwardPath) {
      outwardPath.shift();
    }

    outwardPath = outwardPath ? outwardPath.reverse() : undefined;

    if (outwardPath) {
      for (const elem of outwardPath) {
        callback(elem, true);
      }
    }

    if (inwardPath) {
      for (const elem of inwardPath) {
        callback(elem, false);
      }
    }
  }

}

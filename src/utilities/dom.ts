import { IRectangle } from '../common/IRectangle';

/**
 * Attached interface for elements which support virtual references.
 * Used internally by the virtual hierarchy methods.
 *
 * @interface IVirtualElement
 * @extends {HTMLElement}
 */
interface IVirtualElement extends HTMLElement {
  _virtual: {
    parent?: IVirtualElement;
    children: IVirtualElement[];
  };
}

/**
 * Sets the virtual parent of an element.
 * Pass `undefined` as the `parent` to clear the virtual parent.
 *
 * @export
 * @param {HTMLElement} child
 * @param {HTMLElement} parent
 */
export function setVirtualParent(child: HTMLElement, parent: HTMLElement) {
  let virtualChild = <IVirtualElement>child;
  let virtualParent = <IVirtualElement>parent;

  if (!virtualChild._virtual) {
    virtualChild._virtual = {
      children: []
    };
  }

  let oldParent = virtualChild._virtual.parent;

  if (oldParent && oldParent !== parent) {
    // Remove the child from its old parent.
    let index = oldParent._virtual.children.indexOf(virtualChild);

    if (index > -1) {
      oldParent._virtual.children.splice(index, 1);
    }
  }

  virtualChild._virtual.parent = virtualParent || undefined;

  if (virtualParent) {
    if (!virtualParent._virtual) {
      virtualParent._virtual = {
        children: []
      };
    }

    virtualParent._virtual.children.push(virtualChild);
  }
}

export function getVirtualParent(child: HTMLElement): HTMLElement {
  let parent: HTMLElement;

  if (child && isVirtualElement(child)) {
    parent = child._virtual.parent;
  }

  return parent;
}

/**
 * Gets the element which is the parent of a given element.
 * If `allowVirtuaParents` is `true`, this method prefers the virtual parent over
 * real DOM parent when present.
 *
 * @export
 * @param {HTMLElement} child
 * @param {boolean} [allowVirtualParents=true]
 * @returns {HTMLElement}
 */
export function getParent(child: HTMLElement, allowVirtualParents: boolean = true): HTMLElement {
  return child && (
    allowVirtualParents && getVirtualParent(child) ||
    child.parentNode && child.parentNode as HTMLElement
  );
}

/**
 * Determines whether or not a parent element contains a given child element.
 * If `allowVirtualParents` is true, this method may return `true` if the child
 * has the parent in its virtual element hierarchy.
 *
 * @export
 * @param {HTMLElement} parent
 * @param {HTMLElement} child
 * @param {boolean} [allowVirtualParents=true]
 * @returns {boolean}
 */
export function elementContains(parent: HTMLElement, child: HTMLElement, allowVirtualParents: boolean = true): boolean {
  let isContained: boolean = false;

  if (parent && child) {
    if (allowVirtualParents) {
      isContained = false;

      while (child) {
        let nextParent = getParent(child);

        if (nextParent === parent) {
          isContained = true;
          break;
        }

        child = nextParent;
      }
    } else if (parent.contains) {
      isContained = parent.contains(child);
    }
  }

  return isContained;
}

/** Helper to get bounding client rect, works with window. */
export function getRect(element: HTMLElement | Window): IRectangle {
  let rect: IRectangle;

  if (element) {
    if (element === window) {
      rect = {
        left: 0,
        top: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        right: window.innerWidth,
        bottom: window.innerHeight
      };
    } else if ((element as HTMLElement).getBoundingClientRect) {
      rect = (element as HTMLElement).getBoundingClientRect();
    }
  }

  return rect;
}

/**
 * Determines whether or not an element has the virtual hierarchy extension.
 *
 * @param {(HTMLElement | IVirtualElement)} element
 * @returns {element is IVirtualElement}
 */
function isVirtualElement(element: HTMLElement | IVirtualElement): element is IVirtualElement {
  return element && !!(<IVirtualElement>element)._virtual;
}
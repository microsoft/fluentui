import { getParent } from './getParent';
/**
 * Similar functionality to `element.contains` DOM API for use with out of order DOM elements that
 * checks the virtual parent hierarchy. If a virtual parents exists, it is chosen over the actual parent
 *
 * @returns true if the child can find the parent in its virtual hierarchy
 */
export function elementContains(parent: HTMLElement | null, child: HTMLElement | null): boolean {
  if (!parent || !child) {
    return false;
  }

  let isContained = false;
  if (parent === child) {
    isContained = true;
  } else {
    isContained = false;

    while (child) {
      const nextParent: HTMLElement | null = getParent(child);

      if (nextParent === parent) {
        isContained = true;
        break;
      }

      child = nextParent;
    }
  }

  return isContained;
}

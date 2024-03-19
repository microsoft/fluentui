import { getParent } from './getParent';

/**
 * Similar functionality to `element.contains` DOM API for use without of order DOM elements that
 * checks the virtual parent hierarchy. If a virtual parents exists, it is chosen over the actual parent
 *
 * @internal
 * @returns true if the child can find the parent in its virtual hierarchy
 */
export function elementContains(parent: Node | null, child: Node | null): boolean {
  if (!parent || !child) {
    return false;
  }

  if (parent === child) {
    return true;
  } else {
    // Tracks references of nodes that have been visited to prevent infinite loops
    const set = new WeakSet<Node>();

    while (child) {
      const nextParent: Node | null = getParent(child, {
        skipVirtual: set.has(child),
      });
      set.add(child);

      if (nextParent === parent) {
        return true;
      }

      child = nextParent;
    }
  }

  return false;
}

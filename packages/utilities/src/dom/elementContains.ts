import { getParent } from './getParent';
/**
 * Determines whether or not a parent element contains a given child element.
 * If `allowVirtualParents` is true, this method may return `true` if the child
 * has the parent in its virtual element hierarchy.
 *
 * @public
 */
export function elementContains(parent: HTMLElement | null, child: HTMLElement | null, allowVirtualParents: boolean = true): boolean {
  let isContained = false;
  if (parent && child) {
    if (allowVirtualParents) {
      isContained = false;
      while (child) {
        let nextParent: HTMLElement | null = getParent(child);
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

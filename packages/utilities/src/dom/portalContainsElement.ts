import { findElementRecursive } from './findElementRecursive';
import { DATA_PORTAL_ATTRIBUTE } from './setPortalAttribute';

/**
 * Determine whether a target is within a portal from perspective of root or optional parent.
 * This function only works against portal components that use the setPortalAttribute function.
 * If both parent and child are within the same portal this function will return false.
 * @param target - Element to query portal containment status of.
 * @param parent - Optional parent perspective. Search for containing portal stops at parent (or root if parent is undefined or invalid.)
 */
export function portalContainsElement(target: HTMLElement, parent?: HTMLElement): boolean {
  const elementMatch = findElementRecursive(
    target,
    (testElement: HTMLElement) => parent === testElement || testElement.hasAttribute(DATA_PORTAL_ATTRIBUTE)
  );
  return elementMatch !== null && elementMatch.hasAttribute(DATA_PORTAL_ATTRIBUTE);
}

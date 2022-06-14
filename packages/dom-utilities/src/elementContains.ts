import { getParent } from './getParent';

// const cnt = 0;
/**
 * Determines whether or not a parent element contains a given child element.
 * If `allowVirtualParents` is true, this method may return `true` if the child
 * has the parent in its virtual element hierarchy.
 *
 * @public
 */
export function elementContains(
  parent: HTMLElement | null,
  child: HTMLElement | null,
  allowVirtualParents: boolean = true,
): boolean {
  let isContained = false;

  if (parent && child) {
    if (allowVirtualParents) {
      if (parent === child) {
        isContained = true;
      } else {
        isContained = false;

        // console.log(`------${cnt++}------`);
        // console.log(parent);
        // console.log(child);
        // const originalChild = child;
        while (child) {
          const nextParent: HTMLElement | null = getParent(child);
          // console.log(nextParent);

          if (nextParent === parent) {
            isContained = true;
            break;
          }

          child = nextParent;
        }
        if (child === null) {
          // const doc = originalChild.ownerDocument;
          // console.log(doc.defaultView);
        }
        // console.log('------------');
      }
    } else if (parent.contains) {
      isContained = parent.contains(child);
    }
  }

  return isContained;
}

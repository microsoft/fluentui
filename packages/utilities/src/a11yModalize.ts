/**
 * The helper functions here will make the target element as modal to screen readers, by placing aria-hidden on elements
 * that are siblings to the target element and the target element's ancestors (because aria-hidden gets inherited).
 * That way, all other elements on the page are hidden to the screen reader.
 */

/** Call this on a target element to make it modal to screen readers.
 * This returns an array of elements, keep that array and pass it to removeModalize() when the target is no longer modal
 * or no longer on the page.
 */
export function modalize(target: HTMLElement): HTMLElement[] {
  const affectedNodes: HTMLElement[] = [];

  // start at target, then recurse and do the same for parent, until we reach <body>
  while (target !== document.body) {
    // grab all siblings of current element
    for (const sibling of (target.parentElement!.children as unknown) as Array<HTMLElement>) {
      // but ignore elements that are already aria-hidden
      if (sibling !== target && sibling.getAttribute('aria-hidden')?.toLowerCase() !== 'true') {
        affectedNodes.push(sibling);
      }
    }
    target = target.parentElement!;
  }

  // take all those elements and set aria-hidden=true on them
  affectedNodes.forEach(node => {
    node.setAttribute('aria-hidden', 'true');
  });

  return affectedNodes;
}

/** Undoes the changes that modalize() did. Pass in the array that modalize() returned.
 * HIGHLY recommend that you `delete` the array after calling this, to free up memory and remove unnecessary pointers to
 * random elements.
 */
export function unmodalize(affectedNodes: HTMLElement[]) {
  affectedNodes.forEach(node => {
    // set instead of removing in case other components explicitly set aria-hidden and do =="true" or =="false"
    node.setAttribute('aria-hidden', 'false');
  });
}

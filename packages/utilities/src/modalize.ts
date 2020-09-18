/**
 * The helper functions here will make the target element as modal to screen readers, by placing aria-hidden on elements
 * that are siblings to the target element and the target element's ancestors (because aria-hidden gets inherited).
 * That way, all other elements on the page are hidden to the screen reader.
 */

import { getDocument } from './dom/getDocument';

/**
 * Call this on a target element to make it modal to screen readers.
 * Returns a function that undoes the changes it made.
 */
export function modalize(target: HTMLElement): () => void {
  let affectedNodes: HTMLElement[] = [];
  const targetDocument = getDocument(target) || document;

  // start at target, then recurse and do the same for parent, until we reach <body>
  while (target !== targetDocument.body) {
    // grab all siblings of current element
    for (const sibling of (target.parentElement!.children as unknown) as Array<HTMLElement>) {
      // but ignore elements that are already aria-hidden
      if (sibling !== target && sibling.getAttribute('aria-hidden')?.toLowerCase() !== 'true') {
        affectedNodes.push(sibling);
      }
    }

    if (!target.parentElement) {
      break;
    }
    target = target.parentElement;
  }

  // take all those elements and set aria-hidden=true on them
  affectedNodes.forEach(node => {
    node.setAttribute('aria-hidden', 'true');
  });

  return () => {
    unmodalize(affectedNodes);
    affectedNodes = []; // dispose
  };
}

/**
 * Undoes the changes that modalize() did.
 */
function unmodalize(affectedNodes: HTMLElement[]) {
  affectedNodes.forEach(node => {
    // set instead of removing in case other components explicitly set aria-hidden and do =="true" or =="false"
    node.setAttribute('aria-hidden', 'false');
  });
}

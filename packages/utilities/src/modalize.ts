/**
 * The helper functions here will make the target element as modal to screen readers, by placing aria-hidden on elements
 * that are siblings to the target element and the target element's ancestors (because aria-hidden gets inherited).
 * That way, all other elements on the page are hidden to the screen reader.
 */

import { getDocument } from './dom/getDocument';

/** Tag names to ignore when modalizing */
const tagsToIgnore = ['TEMPLATE', 'STYLE', 'SCRIPT'];

/**
 * Call this on a target element to make it modal to screen readers.
 * Returns a function that undoes the changes it made.
 */
export function modalize(target: HTMLElement): () => void {
  const targetDocument = getDocument(target);
  if (!targetDocument) {
    // can't do this in SSR
    return () => undefined;
  }

  let affectedNodes: [HTMLElement, string | null][] = [];

  // start at target, then recurse and do the same for parent, until we reach <body>
  while (target !== targetDocument.body && target.parentElement) {
    // grab all siblings of current element
    for (const sibling of target.parentElement.children as unknown as HTMLElement[]) {
      // but ignore elements that are already aria-hidden
      const ariaHidden = sibling.getAttribute('aria-hidden');
      if (sibling !== target && ariaHidden?.toLowerCase() !== 'true' && tagsToIgnore.indexOf(sibling.tagName) === -1) {
        affectedNodes.push([sibling, ariaHidden]);
      }
    }

    target = target.parentElement;
  }

  // take all those elements and set aria-hidden=true on them
  affectedNodes.forEach(([node]) => {
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
function unmodalize(affectedNodes: [HTMLElement, string | null][]) {
  affectedNodes.forEach(([node, originalValue]) => {
    // Restore the original value (false or unset)
    if (originalValue) {
      node.setAttribute('aria-hidden', originalValue);
    } else {
      node.removeAttribute('aria-hidden');
    }
  });
}

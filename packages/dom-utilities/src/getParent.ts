import { getVirtualParent } from './getVirtualParent';
/**
 * Gets the element which is the parent of a given element.
 * If `allowVirtuaParents` is `true`, this method prefers the virtual parent over
 * real DOM parent when present.
 *
 * @public
 */
export function getParent(child: HTMLElement, allowVirtualParents: boolean = true): HTMLElement | null {
  if (!child) {
    return null;
  }

  const parent = allowVirtualParents && getVirtualParent(child);

  if (parent) {
    return parent;
  }

  // Support looking for parents in shadow DOM
  if (typeof (child as HTMLSlotElement).assignedElements !== 'function' && child.assignedSlot?.parentNode) {
    // Element is slotted
    return child.assignedSlot as HTMLElement;
  } else if (child.parentNode?.nodeType === 11) {
    // nodeType 11 is DOCUMENT_FRAGMENT
    // Element is in shadow root
    return (child.parentNode as ShadowRoot).host as HTMLElement;
  } else {
    return child.parentNode as HTMLElement;
  }
}

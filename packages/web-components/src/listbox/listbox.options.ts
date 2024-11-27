import type { Listbox } from './listbox.js';

/**
 * Determines if the provided element is a Listbox.
 *
 * @param element - the element to check
 * @public
 */
export function isListbox(element?: Node): element is Listbox {
  if (element?.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }

  return (element as Element).tagName.toLowerCase().endsWith('-listbox');
}

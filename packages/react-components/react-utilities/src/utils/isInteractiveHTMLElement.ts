import { isHTMLElement } from './isHTMLElement';

/**
 * @internal
 * Checks that the element has default behaviour from user input on click or 'Enter'/'Space' keys
 */
export function isInteractiveHTMLElement(element: unknown) {
  if (!isHTMLElement(element)) {
    return false;
  }

  const { tagName } = element;
  switch (tagName) {
    case 'BUTTON':
    case 'A':
    case 'INPUT':
    case 'TEXTAREA':
      return true;
  }

  return element.isContentEditable;
}

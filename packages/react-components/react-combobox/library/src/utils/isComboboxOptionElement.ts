/**
 * Checks whether the given element is a combobox option element.
 * Supports elements with role="option" or role="menuitemcheckbox".
 *
 * @param element - the element to check
 * @returns true if the element has a valid combobox option role, false otherwise
 */
export function isComboboxOptionElement(element: HTMLElement): boolean {
  return element.role === 'option' || element.role === 'menuitemcheckbox';
}

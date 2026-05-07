import { isComboboxOptionElement } from './isComboboxOptionElement';

/**
 * Helper function to create an element with a specified role
 */
function createElementWithRole(tagName: string, role?: string) {
  const element = document.createElement(tagName);
  if (role) {
    element.setAttribute('role', role);
  }
  return element;
}

describe('isComboboxOptionElement', () => {
  it('returns true for elements with role="option"', () => {
    const element = createElementWithRole('div', 'option');
    expect(isComboboxOptionElement(element)).toBe(true);
  });

  it('returns true for elements with role="menuitemcheckbox"', () => {
    const element = createElementWithRole('div', 'menuitemcheckbox');
    expect(isComboboxOptionElement(element)).toBe(true);
  });

  it('returns false for elements without role attribute', () => {
    const element = createElementWithRole('div');
    expect(isComboboxOptionElement(element)).toBe(false);
  });

  it('returns false for elements with other role values', () => {
    const element = createElementWithRole('div', 'listbox');
    expect(isComboboxOptionElement(element)).toBe(false);
  });
});

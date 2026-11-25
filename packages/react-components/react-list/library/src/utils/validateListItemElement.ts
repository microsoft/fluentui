import { validateGridCellsArePresent } from './validateGridCellsArePresent';
import { validateProperElementTypes } from './validateProperElementTypes';
import { validateProperRolesAreUsed } from './validateProperRolesAreUsed';

export type ValidateListItemElementOptions = {
  /** The element type the parent List renders as. */
  listRenderedAs: string;
  /** The resolved role of the parent List. */
  listRole: string;
  /** Whether the parent List has selection enabled. */
  hasSelection: boolean;
  /** Whether the list item contains focusable children. */
  hasFocusableChildren: boolean;
};

/**
 * Runs the development time validations for a single list item element.
 *
 * The focusable children detection is passed in so that callers can choose between a Tabster
 * aware implementation and a plain DOM one.
 */
export const validateListItemElement = (
  listItemEl: HTMLElement,
  { listRenderedAs, listRole, hasSelection, hasFocusableChildren }: ValidateListItemElementOptions,
): void => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  const itemRole = listItemEl.getAttribute('role') || '';

  validateProperElementTypes(listRenderedAs, listItemEl.tagName.toLocaleLowerCase());
  validateProperRolesAreUsed(listRole, itemRole, hasSelection, hasFocusableChildren);
  validateGridCellsArePresent(listRole, listItemEl);
};

/**
 * Validate that the proper roles are used for the given combination of roles and states.
 * If the roles are invalid and we're not running in production mode, an warning will be logged to the console.
 *
 * @param role - the role of the list
 * @param listItemRole - the role of the list item
 * @param hasSelection - whether the list has selection enabled
 * @param hasFocusableChildren - whether the list has focusable children
 * @returns
 */
export const validateProperRolesAreUsed = (
  role: string,
  listItemRole: string,
  hasSelection: boolean,
  hasFocusableChildren: boolean,
) => {
  // Explode when the pair of roles is invalid
  if (role === 'list' && listItemRole !== 'listitem') {
    throw new Error('When the List role is "list", ListItem role must be "listitem".');
  }
  if (role === 'listbox' && listItemRole !== 'option') {
    throw new Error('When the List role is "listbox", ListItem role must be "option".');
  }
  if (role === 'grid' && listItemRole !== 'row') {
    throw new Error('When the List role is "grid", ListItem role must be "row".');
  }

  const expectedRole = (() => {
    if (hasFocusableChildren) {
      return 'grid';
    } else {
      if (hasSelection) {
        return 'listbox';
      } else {
        return 'list';
      }
    }
  })();

  if (role !== expectedRole) {
    /* eslint-disable-next-line no-console */
    console.warn(`@fluentui/react-list-preview [useList]:\nThe role "${role}" does not match the expected role "${expectedRole}".\nPlease use the "navigationMode" property for automatic role assignment and keyboard navigation.\nIf you are using this role intentionally, make sure to verify screen reader support.
    `);
  }
};

/**
 * Calculate the role for the list item based on the list role.
 * @param listRole - the role of the list
 * @returns proper role for the list item
 */
export const calculateListItemRoleForListRole = (listRole: string): string => {
  switch (listRole) {
    case 'list':
      return 'listitem';
    case 'listbox':
      return 'option';
    case 'grid':
      return 'row';
    default:
      return 'listitem';
  }
};

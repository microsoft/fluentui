import { ListNavigationMode } from '../List';

/**
 * Calculate the role for the list based on the navigation mode and selectable state
 * @param navigationMode - the navigation mode of the list
 * @param selectable - whether the list is selectable
 * @returns 'grid' if navigationMode is 'composite', otherwise 'listbox' if selectable or 'list' if not
 */

export const calculateListRole = (navigationMode: ListNavigationMode | undefined, selectable: boolean) => {
  if (navigationMode === 'composite') {
    return 'grid';
  } else if (selectable) {
    return 'listbox';
  } else {
    return 'list';
  }
};

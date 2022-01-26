import type { IContextualMenuItem } from '../../index';

/**
 * Determines the effective checked state of a menu item.
 *
 * @param item {IContextualMenuItem} to get the check state of.
 * @returns {true} if the item is checked.
 * @returns {false} if the item is unchecked.
 * @returns {null} if the item is not checkable.
 */
export function getIsChecked(item: IContextualMenuItem): boolean | null {
  if (item.canCheck) {
    return !!(item.isChecked || item.checked);
  }

  if (typeof item.isChecked === 'boolean') {
    return item.isChecked;
  }

  if (typeof item.checked === 'boolean') {
    return item.checked;
  }

  // Item is not checkable.
  return null;
}

export function hasSubmenu(item: IContextualMenuItem): boolean {
  // eslint-disable-next-line deprecation/deprecation
  return !!(item.subMenuProps || item.items);
}

export function isItemDisabled(item: IContextualMenuItem): boolean {
  return !!(item.isDisabled || item.disabled);
}

export function getMenuItemAriaRole(item: IContextualMenuItem): string {
  const isChecked = getIsChecked(item);
  const canCheck: boolean = isChecked !== null;
  return canCheck ? 'menuitemcheckbox' : 'menuitem';
}

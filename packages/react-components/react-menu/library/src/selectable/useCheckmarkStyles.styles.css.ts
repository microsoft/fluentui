import { clsx } from 'clsx';
import type { MenuItemSelectableState } from './types';
import type { MenuItemState } from '../components/MenuItem/MenuItem.types';
import styles from './Checkmark.module.css';

/**
 * Applies styles to a checkmark slot for selectable menu items
 *
 * @param state - should contain a `checkmark` slot
 */
export const useCheckmarkStyles_unstable = (
  state: MenuItemSelectableState & Pick<MenuItemState, 'checkmark'>,
): void => {
  if (state.checkmark) {
    state.checkmark.className = clsx(styles.checkmark, state.checked && styles.checked, state.checkmark.className);
  }
};

import { clsx } from 'clsx';
import type { MenuItemSelectableState } from './types';
import type { MenuItemState } from '../components/MenuItem/MenuItem.types';

import styles from './Checkmark.module.css';

/**
 * Applies styles to a checkmark slot for selectable menu items
 *
 * Called once per render, from `useMenuItemStyles_unstable` — which every selectable menu
 * item's styles hook delegates to. It is deliberately NOT called a second time by
 * `useMenuItemCheckboxStyles_unstable` / `useMenuItemRadioStyles_unstable`: `mergeClasses`
 * used to collapse the duplicate atomics, `clsx` does not, and a doubled class token in the
 * rendered DOM is the only thing that would change.
 *
 * @param state - should contain a `checkmark` slot
 * @returns the state with the `checkmark` slot's composed className — callers must use the
 * returned value rather than relying on mutation (F1 of the D14 mutation removal).
 */
export const useCheckmarkStyles_unstable = (
  state: MenuItemSelectableState & Pick<MenuItemState, 'checkmark'>,
): MenuItemSelectableState & Pick<MenuItemState, 'checkmark'> => {
  if (state.checkmark) {
    // Composes AHEAD of whatever the caller already put on the slot (MenuItem's own
    // `.checkmark`, then the consumer's className), so the consumer's string stays last —
    // the `classname-overrides-win` contract (DECISIONS.md D9).
    state.checkmark.className = clsx(styles.root, state.checked && styles['root-checked'], state.checkmark.className);
  }

  return state;
};

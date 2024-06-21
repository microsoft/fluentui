import { mergeClasses, makeStyles } from '@griffel/react';
import type { MenuItemSelectableState } from './types';
import type { MenuItemState } from '../components/MenuItem/MenuItem.types';

const useStyles = makeStyles({
  root: {
    width: '16px',
    height: '16px',
    visibility: 'hidden',
  },
  rootChecked: {
    visibility: 'visible',
  },
});

/**
 * Applies styles to a checkmark slot for selectable menu items
 *
 * @param state - should contain a `checkmark` slot
 */
export const useCheckmarkStyles_unstable = (state: MenuItemSelectableState & Pick<MenuItemState, 'checkmark'>) => {
  'use no memo';

  const styles = useStyles();
  if (state.checkmark) {
    state.checkmark.className = mergeClasses(
      styles.root,
      state.checked && styles.rootChecked,
      state.checkmark.className,
    );
  }
};

import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import type { MenuItemSelectableState } from './types';
import type { MenuItemSlots } from '../components/MenuItem/MenuItem.types';

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
export const useCheckmarkStyles = (state: MenuItemSelectableState & Pick<MenuItemSlots, 'checkmark'>) => {
  const styles = useStyles();
  if (state.checkmark) {
    state.checkmark.className = mergeClasses(
      styles.root,
      state.checked && styles.rootChecked,
      state.checkmark.className,
    );
  }
};

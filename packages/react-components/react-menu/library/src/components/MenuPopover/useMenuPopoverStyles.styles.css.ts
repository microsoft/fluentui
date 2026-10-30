import { clsx } from 'clsx';
import type { MenuPopoverSlots, MenuPopoverState } from './MenuPopover.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import styles from './MenuPopover.module.css';

export const menuPopoverClassNames: SlotClassNames<MenuPopoverSlots> = {
  root: 'fui-MenuPopover',
};

/**
 * Apply styling to the Menu slots based on the state
 */
export const useMenuPopoverStyles_unstable = (state: MenuPopoverState): MenuPopoverState => {
  state.root.className = clsx(menuPopoverClassNames.root, styles.root, state.root.className);
  return state;
};

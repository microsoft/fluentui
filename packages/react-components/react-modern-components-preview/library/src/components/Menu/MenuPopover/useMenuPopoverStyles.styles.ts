import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MenuPopoverSlots, MenuPopoverState } from './MenuPopover.types';
import styles from './MenuPopover.module.css';

export const menuPopoverClassNames: SlotClassNames<MenuPopoverSlots> = { root: 'fui-MenuPopover' };

export const useMenuPopoverStyles = (state: MenuPopoverState): MenuPopoverState => {
  state.root.className = clsx(menuPopoverClassNames.root, styles.menuPopover, state.root.className);
  return state;
};

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ListItemSlots, ListItemState } from './ListItem.types';
import styles from './ListItem.module.css';

export const listItemClassNames: SlotClassNames<ListItemSlots> = {
  root: 'fui-ListItem',
  checkmark: 'fui-ListItem__checkmark',
};

export const useListItemStyles_unstable = (state: ListItemState): ListItemState => {
  state.root.className = clsx(
    listItemClassNames.root,
    styles.root,
    (state.selectable || state.navigable) && styles.interactive,
    state.disabled && styles.disabled,
    state.root.className,
  );
  if (state.checkmark) {
    state.checkmark.className = clsx(listItemClassNames.checkmark, styles.checkmark, state.checkmark.className);
  }
  return state;
};

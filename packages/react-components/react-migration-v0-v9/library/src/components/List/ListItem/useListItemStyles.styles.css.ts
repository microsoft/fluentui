import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ListItemSlots, ListItemState } from './ListItem.types';
import styles from './ListItem.module.css';

export const listItemClassNames: SlotClassNames<ListItemSlots> = {
  root: 'fui-ListItem',
  media: 'fui-ListItem__media',
  header: 'fui-ListItem__header',
  contentWrapper: 'fui-ListItem__contentWrapper',
  headerMedia: 'fui-ListItem__headerMedia',
  contentMedia: 'fui-ListItem__contentMedia',
  endMedia: 'fui-ListItem__endMedia',
};

/**
 * Apply styling to the ListItem slots based on the state
 */
export const useListItemStyles_unstable = (state: ListItemState): ListItemState => {
  state.root.className = clsx(
    listItemClassNames.root,
    styles.root,
    (state.selectable || state.navigable) && styles.clickable,
    state.selected && styles.selected,
    state.root.className,
  );

  if (state.header) {
    state.header.className = clsx(state.truncateHeader && styles.truncate, state.header?.className);
  }

  if (state.contentWrapper) {
    state.contentWrapper.className = clsx(
      styles.contentWrapper,
      state.truncateContent && styles.truncate,
      !state.contentMedia && styles.contentWrapperWithoutMedia,
      state.contentWrapper?.className,
    );
  }

  return state;
};

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ListSlots, ListState } from './List.types';
import styles from './List.module.css';

export const listClassNames: SlotClassNames<ListSlots> = {
  root: 'fui-List',
};

export const useListStyles_unstable = (state: ListState): ListState => {
  state.root.className = clsx(listClassNames.root, styles.root, state.root.className);
  return state;
};

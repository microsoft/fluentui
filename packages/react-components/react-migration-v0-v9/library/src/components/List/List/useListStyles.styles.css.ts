import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ListSlots, ListState } from './List.types';
import styles from './List.module.css';

export const listClassNames: SlotClassNames<ListSlots> = {
  root: 'fui-List',
};

/**
 * Apply styling to the List slots based on the state
 */
export const useListStyles_unstable = (state: ListState): ListState => {
  state.root.className = clsx(listClassNames.root, styles.root, styles[state.layout], state.root.className);

  return state;
};

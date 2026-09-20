import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ListboxSlots, ListboxState } from './Listbox.types';
import styles from './Listbox.module.css';

export const listboxClassNames: SlotClassNames<ListboxSlots> = {
  root: 'fui-Listbox',
};

export const useListboxStyles = (state: ListboxState): ListboxState => {
  state.root.className = clsx(listboxClassNames.root, styles.root, state.root.className);

  return state;
};

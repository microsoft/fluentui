import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SelectSlots, SelectState } from './Select.types';
import styles from './Select.module.css';

export const selectClassNames: SlotClassNames<SelectSlots> = {
  root: 'fui-Select',
  select: 'fui-Select__select',
  icon: 'fui-Select__icon',
};

export const useSelectStyles = (state: SelectState): SelectState => {
  state.root.className = clsx(selectClassNames.root, styles.root, state.root.className);
  state.select.className = clsx(selectClassNames.select, styles.select, state.select.className);

  if (state.icon) {
    state.icon.className = clsx(selectClassNames.icon, styles.icon, state.icon.className);
  }

  return state;
};

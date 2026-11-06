import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SelectState, SelectSlots } from './Select.types';
import styles from './Select.module.css';

export const selectClassNames: SlotClassNames<SelectSlots> = {
  root: 'fui-Select',
  select: 'fui-Select__select',
  icon: 'fui-Select__icon',
};

export const useSelectStyles_unstable = (state: SelectState): SelectState => {
  state.root.className = clsx(
    selectClassNames.root,
    styles.root,
    styles[state.size],
    styles[state.appearance],
    state.select.disabled && styles.disabled,
    String(state.select['aria-invalid']) === 'true' && styles.invalid,
    state.root.className,
  );
  state.select.className = clsx(selectClassNames.select, styles.select, state.select.className);
  if (state.icon) {
    state.icon.className = clsx(selectClassNames.icon, styles.icon, state.icon.className);
  }
  return state;
};

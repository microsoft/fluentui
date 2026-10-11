import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ComboboxSlots, ComboboxState } from './Combobox.types';
import styles from './Combobox.module.css';

export const comboboxClassNames: SlotClassNames<ComboboxSlots> = {
  root: 'fui-Combobox',
  input: 'fui-Combobox__input',
  expandIcon: 'fui-Combobox__expandIcon',
  clearIcon: 'fui-Combobox__clearIcon',
  listbox: 'fui-Combobox__listbox',
};

export const useComboboxStyles = (state: ComboboxState): ComboboxState => {
  state.root.className = clsx(comboboxClassNames.root, styles.root, state.root.className);
  state.input.className = clsx(comboboxClassNames.input, styles.input, state.input.className);

  if (state.listbox) {
    state.listbox.className = clsx(comboboxClassNames.listbox, styles.listbox, state.listbox.className);
  }
  if (state.expandIcon) {
    state.expandIcon.className = clsx(
      comboboxClassNames.expandIcon,
      styles.icon,
      styles.expandIcon,
      state.expandIcon.className,
    );
  }
  if (state.clearIcon) {
    state.clearIcon.className = clsx(
      comboboxClassNames.clearIcon,
      styles.icon,
      styles.clearIcon,
      state.clearIcon.className,
    );
  }

  return state;
};

import { clsx } from 'clsx';
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

export const useComboboxStyles_unstable = (state: ComboboxState): ComboboxState => {
  const invalid = `${state.input['aria-invalid']}` === 'true';
  const disabled = state.input.disabled;
  state.root.className = clsx(
    comboboxClassNames.root,
    styles.root,
    styles[state.appearance],
    styles[state.size],
    invalid && styles.invalid,
    disabled && styles.disabled,
    state.root.className,
  );
  state.input.className = clsx(comboboxClassNames.input, styles.input, state.input.className);
  if (state.listbox) {
    state.listbox.className = clsx(
      comboboxClassNames.listbox,
      styles.listbox,
      state.inlinePopup && styles.inline,
      !state.open && styles.collapsed,
      state.listbox.className,
    );
  }
  if (state.expandIcon) {
    state.expandIcon.className = clsx(
      comboboxClassNames.expandIcon,
      styles.icon,
      state.showClearIcon && styles.visuallyHidden,
      state.expandIcon.className,
    );
  }
  if (state.clearIcon) {
    state.clearIcon.className = clsx(
      comboboxClassNames.clearIcon,
      styles.icon,
      !state.showClearIcon && styles.hidden,
      state.clearIcon.className,
    );
  }
  return state;
};

import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DropdownSlots, DropdownState } from './Dropdown.types';
import styles from './Dropdown.module.css';

export const dropdownClassNames: SlotClassNames<DropdownSlots> = {
  root: 'fui-Dropdown',
  button: 'fui-Dropdown__button',
  clearButton: 'fui-Dropdown__clearButton',
  expandIcon: 'fui-Dropdown__expandIcon',
  listbox: 'fui-Dropdown__listbox',
};

export const useDropdownStyles_unstable = (state: DropdownState): DropdownState => {
  const invalid = `${state.button['aria-invalid']}` === 'true';
  const disabled = state.button.disabled;
  state.root.className = clsx(
    dropdownClassNames.root,
    styles.root,
    styles[state.appearance],
    styles[state.size],
    state.placeholderVisible && styles.placeholder,
    invalid && styles.invalid,
    disabled && styles.disabled,
    state.root.className,
  );
  state.button.className = clsx(dropdownClassNames.button, styles.button, state.button.className);
  if (state.listbox) {
    state.listbox.className = clsx(
      dropdownClassNames.listbox,
      styles.listbox,
      state.inlinePopup && styles.inline,
      !state.open && styles.collapsed,
      state.listbox.className,
    );
  }
  if (state.expandIcon) {
    state.expandIcon.className = clsx(
      dropdownClassNames.expandIcon,
      styles.icon,
      state.showClearButton && styles.hidden,
      state.expandIcon.className,
    );
  }
  if (state.clearButton) {
    state.clearButton.className = clsx(
      dropdownClassNames.clearButton,
      styles.clearButton,
      styles.icon,
      !state.showClearButton && styles.hidden,
      state.clearButton.className,
    );
  }
  return state;
};

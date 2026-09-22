import clsx from 'clsx';
import type { DropdownState } from './Dropdown.types';
import styles from './Dropdown.module.css';

export const dropdownClassNames: Record<keyof DropdownState['components'], string> = {
  root: 'fui-Dropdown',
  button: 'fui-Dropdown__button',
  clearButton: 'fui-Dropdown__clearButton',
  expandIcon: 'fui-Dropdown__expandIcon',
  listbox: 'fui-Dropdown__listbox',
};

export const useDropdownStyles = (state: DropdownState): DropdownState => {
  state.root.className = clsx(dropdownClassNames.root, styles.root, state.root.className);
  state.button.className = clsx(dropdownClassNames.button, styles.button, state.button.className);

  if (state.listbox) {
    state.listbox.className = clsx(dropdownClassNames.listbox, styles.listbox, state.listbox.className);
  }
  if (state.expandIcon) {
    state.expandIcon.className = clsx(
      dropdownClassNames.expandIcon,
      styles.icon,
      styles.expandIcon,
      state.expandIcon.className,
    );
  }
  if (state.clearButton) {
    state.clearButton.className = clsx(
      dropdownClassNames.clearButton,
      styles.clearButton,
      styles.icon,
      state.clearButton.className,
    );
  }

  return state;
};

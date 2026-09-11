import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { DropdownState } from './Dropdown.types';

import styles from './Dropdown.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const dropdownClassNames: { root: string } = {
  root: componentMarkers('dropdown'),
};

type DropdownRootDataAttributes = {
  'data-size'?: DropdownState['size'];
};

/** The expand icon and the clear button share one bucket and hide the same way, in inverse
 * conditions: whichever is not in play is removed outright. */
const iconClasses = (hidden: boolean): string => clsx(styles.icon, hidden && styles.iconHidden);

/**
 * Applies the visual contract, returning new state. The headless hook already stamps data-open,
 * data-disabled, data-placeholder, data-invalid and data-clearable; data-placeholder is the channel
 * the button's placeholder colour reads through, and data-invalid is deliberately unused — see
 * `useInputStyles`. Unlike Input, the invalid look is NOT gated on `!disabled` — Griffel's
 * Dropdown paints a disabled invalid field red, and the strict pixel gate is against it.
 */
export const useDropdownStyles = (state: DropdownState): DropdownState => {
  const { appearance, showClearButton, size } = state;
  const disabled = state.button.disabled;
  const invalid = `${state.button['aria-invalid']}` === 'true';

  const root: DropdownState['root'] & DropdownRootDataAttributes = {
    ...state.root,
    'data-size': size,
    className: clsx(
      dropdownClassNames.root,
      styles.root,
      appearance === 'outline' && styles.outline,
      appearance === 'underline' && styles.underline,
      appearance === 'filled-lighter' && styles.filledLighter,
      appearance === 'filled-darker' && styles.filledDarker,
      !disabled && appearance === 'outline' && styles.outlineInteractive,
      invalid && appearance !== 'underline' && styles.invalid,
      invalid && appearance === 'underline' && styles.invalidUnderline,
      disabled && styles.disabled,
      state.root.className,
    ),
  };

  return {
    ...state,
    root,
    button: slotClasses(state.button, styles.button),
    listbox: slotClasses(state.listbox, styles.listbox),
    expandIcon: slotClasses(state.expandIcon, iconClasses(!!showClearButton)),
    clearButton: slotClasses(state.clearButton, styles.clearButton, iconClasses(!showClearButton)),
  };
};

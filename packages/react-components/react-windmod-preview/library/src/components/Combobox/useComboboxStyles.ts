import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { ComboboxState } from './Combobox.types';

import styles from './Combobox.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const comboboxClassNames: { root: string } = {
  root: componentMarkers('combobox'),
};

type ComboboxRootDataAttributes = {
  'data-size'?: ComboboxState['size'];
};

/** The expand and clear icons share one bucket and hide by opposite mechanisms: the expand icon is
 * clipped (it stays in the accessibility tree) while the clear icon is removed. */
const iconClasses = (hidden: boolean, visuallyHidden: boolean): string =>
  clsx(styles.icon, hidden && styles.iconHidden, visuallyHidden && styles.iconVisuallyHidden);

/**
 * Applies the visual contract, returning new state. The headless hook already stamps data-open,
 * data-disabled, data-placeholder, data-invalid and data-clearable; data-invalid is deliberately
 * unused, because it is present for every non-boolean aria-invalid token while the invalid look
 * belongs only to `aria-invalid` true. Unlike Input, the invalid look is NOT gated on `!disabled` —
 * Griffel's Combobox paints a disabled invalid field red, and the strict pixel gate is against it.
 */
export const useComboboxStyles = (state: ComboboxState): ComboboxState => {
  const { appearance, showClearIcon, size } = state;
  const disabled = state.input.disabled;
  const invalid = `${state.input['aria-invalid']}` === 'true';

  const root: ComboboxState['root'] & ComboboxRootDataAttributes = {
    ...state.root,
    'data-size': size,
    className: clsx(
      comboboxClassNames.root,
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
    input: slotClasses(state.input, styles.input),
    listbox: slotClasses(state.listbox, styles.listbox),
    expandIcon: slotClasses(state.expandIcon, iconClasses(false, !!showClearIcon)),
    clearIcon: slotClasses(state.clearIcon, iconClasses(!showClearIcon, false)),
  };
};

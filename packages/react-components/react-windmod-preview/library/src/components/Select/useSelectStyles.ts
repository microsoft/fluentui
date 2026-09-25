import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { SelectState } from './Select.types';

import styles from './Select.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const selectClassNames: { root: string } = {
  root: componentMarkers('select'),
};

type SelectRootDataAttributes = {
  'data-size'?: SelectState['size'];
};

/** Applies the visual contract, returning new state. The headless hook already stamps
 * data-disabled and data-invalid; data-invalid is deliberately unused — see `useInputStyles`.
 * The select's appearance/invalid/disabled looks are module classes because their cascade is
 * carried by block order in Select.module.css. */
export const useSelectStyles = (state: SelectState): SelectState => {
  const { appearance, size } = state;
  const disabled = state.select.disabled;
  const invalid = `${state.select['aria-invalid']}` === 'true';
  const underline = appearance === 'underline';

  const root: SelectState['root'] & SelectRootDataAttributes = {
    ...state.root,
    'data-size': size,
    className: clsx(selectClassNames.root, styles.root, state.root.className),
  };

  return {
    ...state,
    root,
    select: slotClasses(
      state.select,
      styles.select,
      appearance === 'outline' && styles.outline,
      underline && styles.underline,
      appearance === 'filled-lighter' && styles.filledLighter,
      appearance === 'filled-darker' && styles.filledDarker,
      !disabled && appearance === 'outline' && styles.outlineInteractive,
      !disabled && invalid && !underline && styles.invalid,
      !disabled && invalid && underline && styles.invalidUnderline,
      disabled && styles.disabled,
      disabled && underline && styles.disabledUnderline,
    ),
    icon: slotClasses(state.icon, styles.icon),
  };
};

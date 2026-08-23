import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { CheckboxState } from './Checkbox.types';

import styles from './Checkbox.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const checkboxClassNames: { root: string } = {
  root: componentMarkers('checkbox'),
};

type CheckboxRootDataAttributes = {
  'data-size'?: CheckboxState['size'];
};

/** Applies the visual contract, returning new state. The headless hook already stamps
 * data-checked/-disabled/-label-position — data-label-position on every Checkbox whether or not a
 * label slot is present, so it is never a label-presence test. `data-size` is style-only, and
 * `shape` selects a class because only the indicator changes with it. */
export const useCheckboxStyles = (state: CheckboxState): CheckboxState => {
  const { shape, size } = state;

  const root: CheckboxState['root'] & CheckboxRootDataAttributes = {
    ...state.root,
    'data-size': size,
    className: clsx(checkboxClassNames.root, styles.root, state.root.className),
  };

  return {
    ...state,
    root,
    input: { ...state.input, className: clsx(styles.input, state.input.className) },
    indicator: state.indicator && {
      ...state.indicator,
      className: clsx(styles.indicator, shape === 'circular' && styles.circular, state.indicator.className),
    },
    label: state.label && { ...state.label, className: clsx(styles.label, state.label.className) },
  };
};

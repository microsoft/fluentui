import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { TagPickerInputState } from './TagPickerInput.types';

import styles from './TagPickerInput.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const tagPickerInputClassNames: { root: string } = {
  root: componentMarkers('tag-picker-input'),
};

/**
 * Applies the visual contract, returning new state. Griffel's five buckets collapse to one class:
 * the three size steps read the control root's picker-scale data-size through a group variant, and
 * the disabled look reads the data-disabled the headless hook already stamps here.
 */
export const useTagPickerInputStyles = (state: TagPickerInputState): TagPickerInputState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(tagPickerInputClassNames.root, styles.root, state.root.className),
  },
});

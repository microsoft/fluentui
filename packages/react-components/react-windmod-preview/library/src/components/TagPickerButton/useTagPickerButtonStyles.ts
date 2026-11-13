import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { TagPickerButtonState } from './TagPickerButton.types';

import styles from './TagPickerButton.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const tagPickerButtonClassNames: { root: string } = {
  root: componentMarkers('tag-picker-button'),
};

/**
 * Applies the visual contract, returning new state. Griffel's seventeen buckets collapse to two
 * classes: eleven of them are authored but never merged, three size steps read the control root's
 * picker-scale data-size through a group variant, and the collapse stays a JS gate because it is
 * driven by selection rather than by any attribute on this element.
 */
export const useTagPickerButtonStyles = (state: TagPickerButtonState): TagPickerButtonState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(
      tagPickerButtonClassNames.root,
      styles.root,
      state.hasSelectedOption && styles.visuallyHidden,
      state.root.className,
    ),
  },
});

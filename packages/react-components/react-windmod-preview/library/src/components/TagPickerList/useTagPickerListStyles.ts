import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { TagPickerListState } from './TagPickerList.types';

import styles from './TagPickerList.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const tagPickerListClassNames: { root: string } = {
  root: componentMarkers('tag-picker-list'),
};

/**
 * Applies the visual contract, returning new state. Griffel's `collapsed` bucket has no windmod
 * counterpart: the surface is a native top-layer popover the headless listbox slot shows and hides,
 * and the TagPicker root renders it only while open or focused.
 */
export const useTagPickerListStyles = (state: TagPickerListState): TagPickerListState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(tagPickerListClassNames.root, styles.root, state.root.className),
  },
});

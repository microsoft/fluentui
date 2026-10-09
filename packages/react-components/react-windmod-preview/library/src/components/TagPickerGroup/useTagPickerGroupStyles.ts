import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { TagPickerGroupState } from './TagPickerGroup.types';

import styles from './TagPickerGroup.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const tagPickerGroupClassNames: { root: string } = {
  root: componentMarkers('tag-picker-group'),
};

type TagPickerGroupRootDataAttributes = {
  'data-size'?: TagPickerGroupState['pickerSize'];
};

/**
 * Applies the visual contract, returning new state. `data-size` here is the PICKER scale, because
 * the gap and padding steps it selects are picker-scale steps; the tag scale travels to the Tags
 * below through a React context and never lands on an element. The headless hook already stamps
 * data-disabled.
 */
export const useTagPickerGroupStyles = (state: TagPickerGroupState): TagPickerGroupState => {
  const root: TagPickerGroupState['root'] & TagPickerGroupRootDataAttributes = {
    ...state.root,
    'data-size': state.pickerSize,
    className: clsx(tagPickerGroupClassNames.root, styles.root, state.root.className),
  };

  return { ...state, root };
};

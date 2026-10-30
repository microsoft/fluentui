import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { TagGroupState } from './TagGroup.types';

import styles from './TagGroup.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const tagGroupClassNames: { root: string } = {
  root: componentMarkers('tag-group'),
};

type TagGroupRootDataAttributes = {
  'data-size'?: TagGroupState['size'];
};

/**
 * Applies the visual contract, returning new state. `medium` is the base gap and carries no
 * class. The headless hook already stamps data-disabled and data-dismissible; only `data-size`
 * is missing, and the two gap overrides read it.
 */
export const useTagGroupStyles = (state: TagGroupState): TagGroupState => {
  const root: TagGroupState['root'] & TagGroupRootDataAttributes = {
    ...state.root,
    'data-size': state.size,
    className: clsx(tagGroupClassNames.root, styles.root, state.root.className),
  };

  return { ...state, root };
};

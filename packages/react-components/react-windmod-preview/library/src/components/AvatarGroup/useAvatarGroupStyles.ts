import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { AvatarGroupState } from './AvatarGroup.types';

import styles from './AvatarGroup.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const avatarGroupClassNames: { root: string } = {
  root: componentMarkers('avatar-group'),
};

type AvatarGroupRootDataAttributes = {
  'data-size'?: AvatarGroupState['size'];
};

/**
 * Applies the visual contract, returning new state. `data-layout` is already stamped by the
 * headless hook, so `data-size` is the only attribute added here — the pie box edge is the one
 * value CSS cannot bucket.
 */
export const useAvatarGroupStyles = (state: AvatarGroupState): AvatarGroupState => {
  const { layout, size } = state;

  const root: AvatarGroupState['root'] & AvatarGroupRootDataAttributes = {
    ...state.root,
    'data-size': size,
    className: clsx(avatarGroupClassNames.root, styles.root, layout === 'pie' && styles.pie, state.root.className),
  };

  return { ...state, root };
};

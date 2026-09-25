import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { SkeletonState } from './Skeleton.types';

import styles from './Skeleton.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const skeletonClassNames: { root: string } = {
  root: componentMarkers('skeleton'),
};

/**
 * Applies the visual contract, returning new state. The group's animation, appearance, size and
 * shape are resolved in JS and reach the items through context, so nothing in CSS selects on the
 * group and no data attribute is stamped here.
 */
export const useSkeletonStyles = (state: SkeletonState): SkeletonState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(skeletonClassNames.root, state.root.as === 'span' && styles.block, state.root.className),
  },
});

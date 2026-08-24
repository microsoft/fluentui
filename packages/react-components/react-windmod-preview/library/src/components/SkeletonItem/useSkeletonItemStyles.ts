import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { SkeletonItemState } from './SkeletonItem.types';

import styles from './SkeletonItem.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const skeletonItemClassNames: { root: string } = {
  root: componentMarkers('skeleton-item'),
};

type SkeletonItemRootDataAttributes = {
  'data-animation'?: SkeletonItemState['animation'];
  'data-appearance'?: SkeletonItemState['appearance'];
  'data-shape'?: SkeletonItemState['shape'];
  'data-size'?: SkeletonItemState['size'];
};

/**
 * Applies the visual contract, returning new state. `data-size` stays a number because the
 * stylesheet coerces it with `attr(data-size type(<number>), 16)`.
 */
export const useSkeletonItemStyles = (state: SkeletonItemState): SkeletonItemState => {
  const { animation, appearance, shape, size } = state;

  const root: SkeletonItemState['root'] & SkeletonItemRootDataAttributes = {
    ...state.root,
    'data-animation': animation,
    'data-appearance': appearance,
    'data-shape': shape,
    'data-size': size,
    className: clsx(
      skeletonItemClassNames.root,
      styles.root,
      state.root.as === 'span' && styles.block,
      state.root.className,
    ),
  };

  return { ...state, root };
};

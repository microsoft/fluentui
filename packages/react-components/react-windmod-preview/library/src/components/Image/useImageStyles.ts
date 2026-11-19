import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { ImageState } from './Image.types';

import styles from './Image.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const imageClassNames: { root: string } = {
  root: componentMarkers('image'),
};

/**
 * Applies the visual contract, returning new state. `fit-fill` exists because an img with no
 * width/height attribute sizes to its intrinsic dimensions, leaving object-fit nothing to do;
 * an explicit width or height means the consumer has taken over sizing. `default` fit and
 * `square` shape are the base look and carry no class.
 */
export const useImageStyles = (state: ImageState): ImageState => {
  const { block, bordered, fit, shadow, shape } = state;
  const { height, width } = state.root;
  const hasExplicitSize = (height !== undefined && height !== null) || (width !== undefined && width !== null);

  return {
    ...state,
    root: {
      ...state.root,
      className: clsx(
        imageClassNames.root,
        styles.root,
        block && styles.block,
        bordered && styles.bordered,
        shadow && styles.shadow,
        styles[fit],
        fit !== 'default' && !hasExplicitSize && styles.fitFill,
        styles[shape],
        state.root.className,
      ),
    },
  };
};

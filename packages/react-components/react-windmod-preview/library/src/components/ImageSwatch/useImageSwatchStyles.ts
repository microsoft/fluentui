import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { ImageSwatchState } from './ImageSwatch.types';

import styles from './ImageSwatch.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const imageSwatchClassNames: { root: string } = {
  root: componentMarkers('image-swatch'),
};

type ImageSwatchRootDataAttributes = {
  'data-size'?: ImageSwatchState['size'];
  'data-shape'?: ImageSwatchState['shape'];
};

/**
 * Applies the visual contract, returning new state. The background image is an inline style the
 * headless base hook writes; the module supplies only its sizing and repeat.
 */
export const useImageSwatchStyles = (state: ImageSwatchState): ImageSwatchState => {
  const root: ImageSwatchState['root'] & ImageSwatchRootDataAttributes = {
    ...state.root,
    'data-size': state.size,
    'data-shape': state.shape,
    className: clsx(imageSwatchClassNames.root, styles.root, state.root.className),
  };

  return {
    ...state,
    root,
  };
};

import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { EmptySwatchState } from './EmptySwatch.types';

import styles from './EmptySwatch.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const emptySwatchClassNames: { root: string } = {
  root: componentMarkers('empty-swatch'),
};

type EmptySwatchRootDataAttributes = {
  'data-size'?: EmptySwatchState['size'];
  'data-shape'?: EmptySwatchState['shape'];
};

/**
 * Applies the visual contract, returning new state. An empty swatch has no selected or disabled
 * look on either library, so size and shape are the only branches.
 */
export const useEmptySwatchStyles = (state: EmptySwatchState): EmptySwatchState => {
  const root: EmptySwatchState['root'] & EmptySwatchRootDataAttributes = {
    ...state.root,
    'data-size': state.size,
    'data-shape': state.shape,
    className: clsx(emptySwatchClassNames.root, styles.root, state.root.className),
  };

  return {
    ...state,
    root,
  };
};

import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { ColorAreaState } from './ColorArea.types';

import styles from './ColorArea.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const colorAreaClassNames: { root: string } = {
  root: componentMarkers('color-area'),
};

type ColorAreaRootDataAttributes = {
  'data-shape'?: ColorAreaState['shape'];
};

/**
 * Applies the visual contract, returning new state. The root's inline custom properties
 * (--fui-AreaX--progress / --fui-AreaY--progress and the two colours) are computed and written by
 * the headless hook; they pass through by spread and are never read or rewritten here. The headless
 * hook stamps nothing, so `data-shape` is the only attribute, and it is style-only. Both range
 * inputs take the same module class, matching @fluentui/react-color-picker.
 */
export const useColorAreaStyles = (state: ColorAreaState): ColorAreaState => {
  const root: ColorAreaState['root'] & ColorAreaRootDataAttributes = {
    ...state.root,
    'data-shape': state.shape,
    className: clsx(colorAreaClassNames.root, styles.root, state.root.className),
  };

  return {
    ...state,
    root,
    thumb: { ...state.thumb, className: clsx(styles.thumb, state.thumb.className) },
    inputX: { ...state.inputX, className: clsx(styles.input, state.inputX.className) },
    inputY: { ...state.inputY, className: clsx(styles.input, state.inputY.className) },
  };
};

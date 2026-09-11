import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { ColorSwatchState } from './ColorSwatch.types';

import styles from './ColorSwatch.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const colorSwatchClassNames: { root: string } = {
  root: componentMarkers('color-swatch'),
};

type ColorSwatchRootDataAttributes = {
  'data-size'?: ColorSwatchState['size'];
  'data-shape'?: ColorSwatchState['shape'];
};

/**
 * Applies the visual contract, returning new state. The disabledIcon slot carries the icon class
 * as well as its own, matching the size scale every icon in this component follows; the render
 * function draws it only on a disabled swatch, so decorating it unconditionally is safe.
 */
export const useColorSwatchStyles = (state: ColorSwatchState): ColorSwatchState => {
  const root: ColorSwatchState['root'] & ColorSwatchRootDataAttributes = {
    ...state.root,
    'data-size': state.size,
    'data-shape': state.shape,
    className: clsx(colorSwatchClassNames.root, styles.root, state.root.className),
  };

  return {
    ...state,
    root,
    icon: slotClasses(state.icon, styles.icon),
    disabledIcon: slotClasses(state.disabledIcon, styles.icon, styles.disabledIcon),
  };
};

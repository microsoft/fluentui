import { clsx } from 'clsx';

import { componentMarkers, peerMarker } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import type { ColorSliderState } from './ColorSlider.types';

import styles from './ColorSlider.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const colorSliderClassNames: { root: string } = {
  root: componentMarkers('color-slider'),
};

type ColorSliderRootDataAttributes = {
  'data-shape'?: ColorSliderState['shape'];
};

/**
 * Applies the visual contract, returning new state. The root's inline custom properties
 * (--fui-Slider--direction / --progress and the two colours) are computed and written by the
 * headless hook; they pass through by spread and are never read or rewritten here. The headless
 * hook also stamps data-channel and data-orientation, which the module selects on; `data-shape`
 * is style-only. The thumb's focus ring keys off the input's own :focus-visible, so the input
 * carries the peer marker.
 */
export const useColorSliderStyles = (state: ColorSliderState): ColorSliderState => {
  const root: ColorSliderState['root'] & ColorSliderRootDataAttributes = {
    ...state.root,
    'data-shape': state.shape,
    className: clsx(colorSliderClassNames.root, styles.root, state.root.className),
  };

  return {
    ...state,
    root,
    rail: slotClasses(state.rail, styles.rail),
    thumb: slotClasses(state.thumb, styles.thumb),
    input: slotClasses(state.input, styles.input, peerMarker('color-slider')),
  };
};

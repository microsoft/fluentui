import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { SliderState } from './Slider.types';

import styles from './Slider.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const sliderClassNames: { root: string } = {
  root: componentMarkers('slider'),
};

type SliderRootDataAttributes = {
  'data-size'?: SliderState['size'];
};

/**
 * Applies the visual contract, returning new state. The root's inline custom properties
 * (--fui-Slider--direction / --progress / --steps-percent) are computed and written by the
 * headless hook; they pass through by spread and are never read or rewritten here. The
 * headless hook also stamps data-disabled and data-vertical, which the module selects on.
 */
export const useSliderStyles = (state: SliderState): SliderState => {
  const root: SliderState['root'] & SliderRootDataAttributes = {
    ...state.root,
    'data-size': state.size,
    className: clsx(sliderClassNames.root, styles.root, state.root.className),
  };

  return {
    ...state,
    root,
    rail: { ...state.rail, className: clsx(styles.rail, state.rail.className) },
    thumb: { ...state.thumb, className: clsx(styles.thumb, state.thumb.className) },
    input: { ...state.input, className: clsx(styles.input, state.input.className) },
  };
};

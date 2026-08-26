'use client';

import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import { slotClasses } from '../../utils/slotClasses';
import { useColorSliderStyles } from '../ColorSlider/useColorSliderStyles';
import type { AlphaSliderState } from './AlphaSlider.types';

import styles from './AlphaSlider.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const alphaSliderClassNames: { root: string } = {
  root: componentMarkers('alpha-slider'),
};

/**
 * Applies the visual contract on top of ColorSlider's, returning new state. ColorSlider's rules
 * select through `group/fui-color-slider` and its input carries the peer marker, so the root must
 * keep ColorSlider's marker pair alongside its own and the input passes through untouched.
 * `data-shape` is stamped by the composed hook.
 */
export const useAlphaSliderStyles = (state: AlphaSliderState): AlphaSliderState => {
  const { input, rail, root, thumb } = useColorSliderStyles(state);

  return {
    ...state,
    root: { ...root, className: clsx(alphaSliderClassNames.root, root.className) },
    rail: slotClasses(rail, styles.rail),
    thumb: slotClasses(thumb, styles.thumb),
    input,
  };
};

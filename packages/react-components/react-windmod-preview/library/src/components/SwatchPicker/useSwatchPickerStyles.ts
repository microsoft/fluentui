import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { SwatchPickerState } from './SwatchPicker.types';

import styles from './SwatchPicker.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const swatchPickerClassNames: { root: string } = {
  root: componentMarkers('swatch-picker'),
};

type SwatchPickerRootDataAttributes = {
  'data-spacing'?: SwatchPickerState['spacing'];
};

/**
 * Applies the visual contract, returning new state. `data-layout` is the headless hook's stamp;
 * only the gap is windmod's.
 *
 * The root authors no typography or colour: the provider supplies the inherited base.
 */
export const useSwatchPickerStyles = (state: SwatchPickerState): SwatchPickerState => {
  const root: SwatchPickerState['root'] & SwatchPickerRootDataAttributes = {
    ...state.root,
    'data-spacing': state.spacing,
    className: clsx(swatchPickerClassNames.root, styles.root, state.root.className),
  };

  return {
    ...state,
    root,
  };
};

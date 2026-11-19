import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { SwatchPickerRowState } from './SwatchPickerRow.types';

import styles from './SwatchPickerRow.module.css';

/** The only public classes — see componentMarkers; internals are hashed idents. */
export const swatchPickerRowClassNames: { root: string } = {
  root: componentMarkers('swatch-picker-row'),
};

type SwatchPickerRowRootDataAttributes = {
  'data-spacing'?: SwatchPickerRowState['spacing'];
};

/** Applies the visual contract, returning new state. */
export const useSwatchPickerRowStyles = (state: SwatchPickerRowState): SwatchPickerRowState => {
  const root: SwatchPickerRowState['root'] & SwatchPickerRowRootDataAttributes = {
    ...state.root,
    'data-spacing': state.spacing,
    className: clsx(swatchPickerRowClassNames.root, styles.root, state.root.className),
  };

  return {
    ...state,
    root,
  };
};

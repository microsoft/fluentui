import { clsx } from 'clsx';

import { componentMarkers } from '../../utils/groupMarker';
import type { ColorPickerState } from './ColorPicker.types';

import styles from './ColorPicker.module.css';

/** The only public identity classes — see componentMarkers; internals are hashed idents. */
export const colorPickerClassNames: { root: string } = {
  root: componentMarkers('color-picker'),
};

/**
 * Applies the visual contract, returning new state. The picker stamps nothing: its module has no
 * state-dependent rule, and `shape` reaches the controls through the colorPicker context.
 */
export const useColorPickerStyles = (state: ColorPickerState): ColorPickerState => ({
  ...state,
  root: {
    ...state.root,
    className: clsx(colorPickerClassNames.root, styles.root, state.root.className),
  },
});

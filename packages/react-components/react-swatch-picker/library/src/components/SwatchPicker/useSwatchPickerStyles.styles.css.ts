import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SwatchPickerSlots, SwatchPickerState } from './SwatchPicker.types';
import styles from './SwatchPicker.module.css';

export const swatchPickerClassNames: SlotClassNames<SwatchPickerSlots> = {
  root: 'fui-SwatchPicker',
};

export const useSwatchPickerStyles_unstable = (state: SwatchPickerState): SwatchPickerState => {
  state.root.className = clsx(
    swatchPickerClassNames.root,
    styles.root,
    state.isGrid ? styles.grid : styles.row,
    styles[state.spacing === 'small' ? 'small' : 'medium'],
    state.root.className,
  );
  return state;
};

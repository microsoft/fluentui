import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SwatchPickerRowSlots, SwatchPickerRowState } from './SwatchPickerRow.types';
import styles from './SwatchPickerRow.module.css';

export const swatchPickerRowClassNames: SlotClassNames<SwatchPickerRowSlots> = {
  root: 'fui-SwatchPickerRow',
};

export const useSwatchPickerRowStyles_unstable = (state: SwatchPickerRowState): SwatchPickerRowState => {
  state.root.className = clsx(
    swatchPickerRowClassNames.root,
    styles.root,
    styles[state.spacing === 'small' ? 'small' : 'medium'],
    state.root.className,
  );
  return state;
};

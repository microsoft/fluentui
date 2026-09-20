import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ColorPickerSlots, ColorPickerState } from './ColorPicker.types';
import styles from './ColorPicker.module.css';

export const colorPickerClassNames: SlotClassNames<ColorPickerSlots> = {
  root: 'fui-ColorPicker',
};

export const useColorPickerStyles = (state: ColorPickerState): ColorPickerState => {
  state.root.className = clsx(colorPickerClassNames.root, styles.root, state.root.className);
  return state;
};

import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ColorAreaSlots, ColorAreaState } from './ColorArea.types';
import styles from './ColorArea.module.css';

export const colorAreaClassNames: SlotClassNames<ColorAreaSlots> = {
  root: 'fui-ColorArea',
  thumb: 'fui-ColorArea__thumb',
  inputX: 'fui-ColorArea__inputX',
  inputY: 'fui-ColorArea__inputY',
};

export const useColorAreaStyles = (state: ColorAreaState): ColorAreaState => {
  state.root.className = clsx(colorAreaClassNames.root, styles.root, state.root.className);
  state.thumb.className = clsx(colorAreaClassNames.thumb, styles.thumb, state.thumb.className);
  state.inputX.className = clsx(colorAreaClassNames.inputX, styles.input, state.inputX.className);
  state.inputY.className = clsx(colorAreaClassNames.inputY, styles.input, state.inputY.className);
  return state;
};

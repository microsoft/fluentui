import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ColorSliderSlots, ColorSliderState } from './ColorSlider.types';
import styles from './ColorSlider.module.css';

export const colorSliderClassNames: SlotClassNames<ColorSliderSlots> = {
  root: 'fui-ColorSlider',
  rail: 'fui-ColorSlider__rail',
  thumb: 'fui-ColorSlider__thumb',
  input: 'fui-ColorSlider__input',
};

export const useColorSliderStyles = <State extends ColorSliderState>(state: State): State => {
  state.root.className = clsx(colorSliderClassNames.root, styles.root, state.root.className);
  state.rail.className = clsx(colorSliderClassNames.rail, styles.rail, state.rail.className);
  state.thumb.className = clsx(colorSliderClassNames.thumb, styles.thumb, state.thumb.className);
  state.input.className = clsx(colorSliderClassNames.input, styles.input, state.input.className);
  return state;
};

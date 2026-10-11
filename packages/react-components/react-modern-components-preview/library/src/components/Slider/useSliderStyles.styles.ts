import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SliderSlots, SliderState } from './Slider.types';
import styles from './Slider.module.css';

export const sliderClassNames: SlotClassNames<SliderSlots> = {
  root: 'fui-Slider',
  rail: 'fui-Slider__rail',
  thumb: 'fui-Slider__thumb',
  input: 'fui-Slider__input',
};

/**
 * Apply styling to the Slider slots based on the state.
 */
export const useSliderStyles = (state: SliderState): SliderState => {
  state.root.className = clsx(sliderClassNames.root, styles.root, state.root.className);
  state.rail.className = clsx(sliderClassNames.rail, styles.rail, state.rail.className);
  state.thumb.className = clsx(sliderClassNames.thumb, styles.thumb, state.thumb.className);
  state.input.className = clsx(sliderClassNames.input, styles.input, state.input.className);

  return state;
};

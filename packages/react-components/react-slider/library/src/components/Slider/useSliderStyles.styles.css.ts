import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SliderState, SliderSlots } from './Slider.types';
import styles from './Slider.module.css';

export const sliderClassNames: SlotClassNames<SliderSlots> = {
  root: 'fui-Slider',
  rail: 'fui-Slider__rail',
  thumb: 'fui-Slider__thumb',
  input: 'fui-Slider__input',
};

export const useSliderStyles_unstable = (state: SliderState): SliderState => {
  state.root.className = clsx(
    sliderClassNames.root,
    styles.root,
    styles[state.size ?? 'medium'],
    state.vertical ? styles.vertical : styles.horizontal,
    state.disabled ? styles.disabled : styles.enabled,
    state.root.className,
  );
  state.rail.className = clsx(sliderClassNames.rail, styles.rail, state.rail.className);
  state.thumb.className = clsx(sliderClassNames.thumb, styles.thumb, state.thumb.className);
  state.input.className = clsx(sliderClassNames.input, styles.input, state.input.className);
  return state;
};

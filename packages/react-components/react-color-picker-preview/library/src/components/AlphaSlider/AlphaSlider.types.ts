import type { ComponentState } from '@fluentui/react-utilities';
import type { ColorSliderSlots, ColorSliderProps, ColorSliderState } from '../ColorSlider/ColorSlider.types';

export type AlphaSliderSlots = ColorSliderSlots;

/**
 * AlphaSlider Props
 */
export type AlphaSliderProps = ColorSliderProps;

/**
 * State used in rendering AlphaSlider
 */
export type AlphaSliderState = ComponentState<AlphaSliderSlots> &
  Pick<AlphaSliderProps, 'vertical'> &
  Omit<ColorSliderState, keyof ColorSliderSlots | 'components'>;

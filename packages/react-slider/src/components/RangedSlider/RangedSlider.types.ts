import * as React from 'react';
import { ComponentState, ComponentProps, IntrinsicShorthandProps } from '@fluentui/react-utilities';
import type { SliderSlots, SliderCommons } from '../Slider/Slider.types';

export type RangedSliderSlots = Omit<SliderSlots, 'thumb' | 'thumbWrapper' | 'input'> & {
  /**
   * The lower draggable icon used to select a given value in the RangedSlider.
   */
  lowerThumb: IntrinsicShorthandProps<'div'>;

  /**
   * The wrapper around the RangedSlider's lower thumb.
   * It is primarily used to handle the dragging animation from translateX.
   */
  lowerThumbWrapper: IntrinsicShorthandProps<'div'>;

  /**
   * The upper draggable icon used to select a given value in the RangedSlider.
   */
  upperThumb: IntrinsicShorthandProps<'div'>;

  /**
   * The wrapper around the RangedSlider's upper thumb.
   * It is primarily used to handle the dragging animation from translateX.
   */
  upperThumbWrapper: IntrinsicShorthandProps<'div'>;

  /**
   * The hidden input for the Slider's lower thumb.
   */
  inputLower: IntrinsicShorthandProps<'input'>;

  /**
   * The hidden input for the Slider's upper thumb.
   */
  inputUpper: IntrinsicShorthandProps<'input'>;
};

export interface RangedSliderCommons extends Omit<SliderCommons, 'value' | 'defaultValue' | 'origin' | 'onChange'> {
  /**
   * The starting value for an uncontrolled RangedSlider. The first value is always lower than the second value.
   * Mutually exclusive with `value` prop.
   */
  defaultValue?: [number, number];

  /**
   * The current value of the controlled RangedSlider. The first value is always lower than the second value.
   * Mutually exclusive with `defaultValue` prop.
   */
  value?: [number, number];

  /**
   * Triggers a callback when the value has been changed. This will be called on every individual step.
   */
  onChange?: (
    ev: React.PointerEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    data: { value: [number, number] },
  ) => void;
}

export interface RangedSliderProps
  extends Omit<ComponentProps<RangedSliderSlots>, 'onChange' | 'defaultValue'>,
    RangedSliderCommons {}

export interface RangedSliderState extends ComponentState<RangedSliderSlots>, RangedSliderCommons {}

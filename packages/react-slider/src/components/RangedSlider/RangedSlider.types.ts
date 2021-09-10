import * as React from 'react';
import { ComponentState, ComponentProps, ObjectShorthandProps } from '@fluentui/react-utilities';
import type { SliderSlots, SliderCommons } from '../Slider/Slider.types';

export type RangedSliderSlots = Omit<SliderSlots, 'thumb' | 'thumbWrapper' | 'input'> & {
  /**
   * The lower draggable icon used to select a given value in the RangedSlider.
   */
  lowerThumb?: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

  /**
   * The wrapper around the RangedSlider's lower thumb.
   * It is primarily used to handle the dragging animation from translateX.
   */
  lowerThumbWrapper?: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

  /**
   * The upper draggable icon used to select a given value in the RangedSlider.
   */
  upperThumb?: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

  /**
   * The wrapper around the RangedSlider's upper thumb.
   * It is primarily used to handle the dragging animation from translateX.
   */
  upperThumbWrapper?: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

  /**
   * The hidden input for the Slider's lower thumb.
   */
  inputLower: React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLElement>;

  /**
   * The hidden input for the Slider's upper thumb.
   */
  inputUpper: React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLElement>;
};

export type RangedSliderCommons = Omit<SliderCommons, 'value' | 'defaultValue' | 'origin'> & {
  /**
   * The starting value for an uncontrolled RangedSlider.
   * Mutually exclusive with `value` prop.
   */
  defaultValue?: { lowerValue: number; upperValue: number };

  /**
   * The current value of the controlled RangedSlider.
   * Mutually exclusive with `defaultValue` prop.
   */
  value?: { lowerValue: number; upperValue: number };
};

export interface RangedSliderProps
  extends Omit<ComponentProps<RangedSliderSlots>, 'onChange' | 'defaultValue'>,
    RangedSliderCommons {}

export interface RangedSliderState extends ComponentState<RangedSliderSlots>, RangedSliderCommons {}

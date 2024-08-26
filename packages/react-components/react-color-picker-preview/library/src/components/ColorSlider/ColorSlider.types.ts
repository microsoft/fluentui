import * as React from 'react';
import type { ComponentProps, ComponentState, Slot, EventHandler, EventData } from '@fluentui/react-utilities';

export type SliderOnChangeEventHandler = EventHandler<SliderOnChangeData>;

export type SliderOnChangeData = EventData<'change', React.ChangeEvent<HTMLInputElement>> & {
  value: number;
};

export type ColorSliderSlots = {
  root: NonNullable<Slot<'div'>>;
  rail: NonNullable<Slot<'div'>>;
  thumb: NonNullable<Slot<'div'>>;
  input: NonNullable<Slot<'input'>>;
};

/**
 * ColorSlider Props
 */
export type ColorSliderProps = Omit<
  ComponentProps<Partial<ColorSliderSlots>, 'input'>,
  'defaultValue' | 'onChange' | 'value'
> & {
  /**
   * The starting value for an uncontrolled ColorSlider.
   * Mutually exclusive with `value` prop.
   */
  defaultValue?: number;

  /**
   * The max value of the Slider.
   * @default 360
   */
  max?: number;

  /**
   * The min value of the Slider.
   * @default 0
   */
  min?: number;

  /**
   * Triggers a callback when the value has been changed. This will be called on every individual step.
   */
  onChange?: EventHandler<SliderOnChangeData>;

  /**
   * Render the Slider in a vertical orientation, smallest value on the bottom.
   * @default `false`
   */
  vertical?: boolean;

  /**
   * The current value of the controlled ColorSlider.
   * Mutually exclusive with `defaultValue` prop.
   */
  value?: number;
};

/**
 * State used in rendering ColorSlider
 */
export type ColorSliderState = ComponentState<ColorSliderSlots> & Pick<ColorSliderProps, 'vertical'>;

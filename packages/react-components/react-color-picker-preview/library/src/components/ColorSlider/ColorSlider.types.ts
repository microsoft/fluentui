import * as React from 'react';
import type { ComponentProps, ComponentState, Slot, EventHandler, EventData } from '@fluentui/react-utilities';

export type SliderOnChangeData = EventData<'change', React.ChangeEvent<HTMLInputElement>> & {
  color: string;
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
  channel?: string;

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
   * Color of the COlorPicker
   */
  color?: string;
};

/**
 * State used in rendering ColorSlider
 */
export type ColorSliderState = ComponentState<ColorSliderSlots> & Pick<ColorSliderProps, 'vertical'>;

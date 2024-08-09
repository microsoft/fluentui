import * as React from 'react';
import type { ComponentProps, ComponentState, Slot, EventHandler, EventData } from '@fluentui/react-utilities';

export type SliderOnSelectEventHandler = EventHandler<SliderOnChangeData>;

export type SliderOnChangeData = EventData<'click', React.MouseEvent<HTMLInputElement>> & {
  value: number;
};

export type NativeSliderSlots = {
  root: NonNullable<Slot<'input'>>;
};

/**
 * NativeSlider Props
 */
export type NativeSliderProps = ComponentProps<NativeSliderSlots> & {
  value?: number;
  /**
   * The max value of the Slider.
   * @default 100
   */
  max?: number;

  /**
   * The min value of the Slider.
   * @default 0
   */
  min?: number;

  onChange?: EventHandler<SliderOnChangeData>;

  /**
   * Render the Slider in a vertical orientation, smallest value on the bottom.
   * @default `false`
   */
  vertical?: boolean;
};

/**
 * State used in rendering NativeSlider
 */
export type NativeSliderState = ComponentState<NativeSliderSlots> & Pick<NativeSliderProps, 'vertical'>;

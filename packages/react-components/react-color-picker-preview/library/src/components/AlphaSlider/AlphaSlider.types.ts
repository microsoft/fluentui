import * as React from 'react';
import type { ComponentProps, ComponentState, Slot, EventHandler, EventData } from '@fluentui/react-utilities';

export type AlphaSliderSlots = {
  root: NonNullable<Slot<'div'>>;
  rail: NonNullable<Slot<'div'>>;
  thumb: NonNullable<Slot<'div'>>;
  input: NonNullable<Slot<'input'>> & {
    /**
     * Orient is a non standard attribute that allows for vertical orientation in Firefox. It is set internally
     * when `vertical` is set to true.
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range#non_standard_attributes
     * Webkit/Chromium support for vertical inputs is provided via -webkit-appearance css property
     */
    orient?: 'horizontal' | 'vertical';
  };
};

export type SliderOnSelectEventHandler = EventHandler<SliderOnChangeData>;

export type SliderOnChangeData = EventData<'click', React.MouseEvent<HTMLInputElement>> & {
  value: number;
};

/**
 * AlphaSlider Props
 */
export type AlphaSliderProps = Omit<
  ComponentProps<Partial<AlphaSliderSlots>, 'input'>,
  'defaultValue' | 'onChange' | 'size' | 'value'
> & {
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
  color?: string;
  overlayColor?: string;
};

/**
 * State used in rendering AlphaSlider
 */
export type AlphaSliderState = ComponentState<AlphaSliderSlots> & Pick<AlphaSliderProps, 'vertical'>;

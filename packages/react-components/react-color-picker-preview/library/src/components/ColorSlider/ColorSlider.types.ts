import * as React from 'react';
import type { ComponentProps, ComponentState, Slot, EventHandler, EventData } from '@fluentui/react-utilities';
import type { HsvColor } from '../../types/color';
import type { ColorPickerProps } from '../ColorPicker/ColorPicker.types';

export type SliderOnChangeData = EventData<'change', React.ChangeEvent<HTMLInputElement>> & {
  color: HsvColor;
};

export type ColorSliderSlots = {
  root: NonNullable<Slot<'div'>>;
  rail: NonNullable<Slot<'div'>>;
  thumb: NonNullable<Slot<'div'>>;
  input: NonNullable<Slot<'input'>>;
};

export type ColorChannel = 'hue' | 'saturation' | 'value';

/**
 * ColorSlider Props
 */
export type ColorSliderProps = Omit<
  ComponentProps<Partial<ColorSliderSlots>, 'input'>,
  'defaultValue' | 'onChange' | 'value' | 'color'
> &
  Pick<ColorPickerProps, 'shape'> & {
    /**
     * Color channel of the Slider.
     * @default `hue`
     */
    channel?: ColorChannel;

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
     * Color of the ColorPicker
     */
    color?: HsvColor;

    /**
     * The starting color for an uncontrolled ColorSlider.
     */
    defaultColor?: HsvColor;
  };

/**
 * State used in rendering ColorSlider
 */
export type ColorSliderState = ComponentState<ColorSliderSlots> &
  Pick<ColorSliderProps, 'vertical' | 'shape' | 'channel'>;

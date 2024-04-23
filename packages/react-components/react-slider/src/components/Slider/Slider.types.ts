import * as React from 'react';
import type { ComponentState, ComponentProps, Slot } from '@fluentui/react-utilities';

export type SliderSlots = {
  /**
   * The root of the Slider.
   * The root slot receives the `className` and `style` specified directly on the `<Slider>`.
   * All other native props will be applied to the primary slot, `input`.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * The Slider's base. It is used to visibly display the min and max selectable values.
   */
  rail: NonNullable<Slot<'div'>>;

  /**
   * The draggable icon used to select a given value from the Slider.
   * This is the element containing `role = 'slider'`.
   */
  thumb: NonNullable<Slot<'div'>>;

  /**
   * The hidden input for the Slider.
   * This is the PRIMARY slot: all native properties specified directly on `<Slider>` will be applied to this slot,
   * except `className` and `style`, which remain on the root slot.
   *
   */
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

export type SliderProps = Omit<
  ComponentProps<Partial<SliderSlots>, 'input'>,
  'defaultValue' | 'onChange' | 'size' | 'value'
> & {
  /**
   * The starting value for an uncontrolled Slider.
   * Mutually exclusive with `value` prop.
   */
  defaultValue?: number;

  /**
   *  Whether to render the Slider as disabled.
   *
   * @default `false` (renders enabled)
   */
  disabled?: boolean;

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

  /**
   * The size of the Slider.
   * @default 'medium'
   */
  size?: 'small' | 'medium';

  /**
   * The number of steps that the Slider's `value` will increment upon change. When provided, the Slider
   * will snap to the closest available value. This must be a positive value.
   * @default 1
   */
  step?: number;

  /**
   * The current value of the controlled Slider.
   * Mutually exclusive with `defaultValue` prop.
   */
  value?: number;

  /**
   * Render the Slider in a vertical orientation, smallest value on the bottom.
   * @default `false`
   */
  vertical?: boolean;

  /**
   * Triggers a callback when the value has been changed. This will be called on every individual step.
   */
  // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>, data: SliderOnChangeData) => void;
};

export type SliderOnChangeData = {
  value: number;
};

export type SliderState = ComponentState<SliderSlots> & Pick<SliderProps, 'disabled' | 'size' | 'vertical'>;

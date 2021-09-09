import * as React from 'react';
import { ComponentState, ComponentProps, ObjectShorthandProps } from '@fluentui/react-utilities';

export type SliderSlots = {
  /**
   * The root of the Slider.
   */
  root: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

  /**
   * The Slider's base. It is used to visibly display the min and max selectable values.
   */
  rail: React.HTMLAttributes<HTMLElement>;

  /**
   * The wrapper around the Slider component.
   */
  sliderWrapper: React.HTMLAttributes<HTMLElement>;

  /**
   * The wrapper around the Slider's track. It is primarily used to handle the positioning of the track.
   */
  trackWrapper: React.HTMLAttributes<HTMLElement>;

  /**
   * The bar showing the current selected area adjacent to the Slider's thumb.
   */
  track: React.HTMLAttributes<HTMLElement>;

  /**
   * The wrapper holding the marks and mark labels for the Slider.
   */
  marksWrapper: React.HTMLAttributes<HTMLElement>;

  /**
   * The wrapper around the Slider's thumb. It is primarily used to handle the dragging animation from translateX.
   */
  thumbWrapper: React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>;

  /**
   * The draggable icon used to select a given value from the Slider.
   * This is the element containing `role = 'slider'`.
   */
  thumb: React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>;

  /**
   * The area in which the Slider's rail allows for the thumb to be dragged.
   */
  activeRail: React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>;

  /**
   * The hidden input for the Slider.
   */
  input: React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLElement>;
};

export interface SliderCommons {
  /**
   * The starting value for an uncontrolled Slider.
   * Mutually exclusive with `value` prop.
   */
  defaultValue?: number;

  /**
   * The current value of the controlled Slider.
   * Mutually exclusive with `defaultValue` prop.
   */
  value?: number;

  /**
   * The min value of the Slider.
   * @default 0
   */
  min?: number;

  /**
   * The max value of the Slider.
   * @default 100
   */
  max?: number;

  /**
   * The number of steps that the Slider's `value` will increment upon change. When provided, the Slider
   * will snap to the closest available value. This must be a positive value.
   * @default 1
   */
  step?: number;

  /**
   * The number of steps that the Slider's value will change by during a key press. When provided, the `keyboardSteps`
   * will be separated from the pointer `steps` allowing for the value to go outside of pointer related
   * snapping values.
   *
   * @default `step` or 1
   */
  keyboardStep?: number;

  /**
   *  Whether to render the Slider as disabled.
   *
   * @default `false` (renders enabled)
   */
  disabled?: boolean;

  /**
   * Whether to render the Slider vertically.
   * @default `false` (renders horizontally)
   */
  vertical?: boolean;

  /**
   * When enabled, small marks are displayed across the Slider, showing potential steps.
   *
   * - If `true`, marks are visible at each `step`.
   * - If `number[]`, marks will be displayed at each provided number. Numbers must be in ascending order.
   * - If `{}[]` A mark is shown at the value location and displays any provided custom labels and marks.
   */
  marks?: boolean | (number | { value: number; label?: string | JSX.Element; mark?: JSX.Element })[];

  /**
   * The starting origin point for the Slider.
   * @default min
   */
  origin?: number;

  /**
   * The size of the Slider.
   * @default 'medium'
   */
  size?: 'small' | 'medium';

  /**
   * Triggers a callback when the value has been changed. This will be called on every individual step.
   */
  onChange?: (
    ev: React.PointerEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    data: { value: number },
  ) => void;

  /**
   * The Slider's current value label to be read by the screen reader.
   */
  ariaValueText?: (value: number) => string;
}

export interface SliderProps extends Omit<ComponentProps<SliderSlots>, 'onChange' | 'defaultValue'>, SliderCommons {}

export interface SliderState extends ComponentState<SliderSlots>, SliderCommons {}

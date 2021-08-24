import * as React from 'react';
import { ComponentPropsCompat, ComponentStateCompat, ShorthandPropsCompat } from '@fluentui/react-utilities';

export interface SliderProps
  extends ComponentPropsCompat,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /**
   * The Slider's base. It is used to visibly display the min and max selectable values.
   */
  rail?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * The wrapper around the Slider component.
   */
  sliderWrapper?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * The wrapper around the Slider's track. It is primarily used to handle the positioning of the track.
   */
  trackWrapper?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * The bar showing the current selected area adjacent to the Slider's thumb.
   */
  track?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * The container holding the marks and mark labels for the Slider.
   */
  marksWrapper?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * The wrapper around the Slider's thumb. It is primarily used to handle the dragging animation from translateX.
   */
  thumbWrapper?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;

  /**
   * The draggable icon used to select a given value from the Slider.
   * This is the element containing `role = 'slider'`.
   */
  thumb?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;

  /**
   * The area in which the Slider's rail allows for the thumb to be dragged.
   */
  activeRail?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>>;

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
   * will snap to the closest available value.
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
   * When enabled, small marks are displayed across the Sliders, showing potential steps. Any provided mark values
   * must be in numerical order.
   *
   * 1. `Boolean`: If true marks are visible.
   * 2. `number[]`: Marks will be displayed at each provided number.
   */
  marks?: boolean | number[];

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

/**
 * Names of the shorthand properties in SliderProps
 */
export type SliderShorthandProps =
  | 'rail'
  | 'sliderWrapper'
  | 'trackWrapper'
  | 'track'
  | 'marksWrapper'
  | 'thumbWrapper'
  | 'thumb'
  | 'activeRail';

/**
 * Names of SliderProps that have a default value in useSlider
 */
export type SliderDefaultedProps =
  | 'rail'
  | 'sliderWrapper'
  | 'trackWrapper'
  | 'track'
  | 'marksWrapper'
  | 'thumbWrapper'
  | 'thumb'
  | 'activeRail';

/**
 * State used in rendering Slider
 */
export interface SliderState extends ComponentStateCompat<SliderProps, SliderShorthandProps, SliderDefaultedProps> {
  /**
   * Ref to the root element
   */
  ref: React.Ref<HTMLElement>;
}

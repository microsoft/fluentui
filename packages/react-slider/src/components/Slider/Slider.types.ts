import * as React from 'react';
import { ComponentPropsCompat, ComponentStateCompat, ShorthandPropsCompat } from '@fluentui/react-utilities';

/**
 * The drag and change events used for Slider movement.
 */
export type DragChangeEvent = React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent;

/**
 * Slider public API
 */
export interface Slider extends HTMLElement {
  value: number | undefined;

  focus: () => void;
}

/**
 * Slider Props
 */
export interface SliderProps extends ComponentPropsCompat, React.HTMLAttributes<HTMLElement> {
  /**
   * The draggable icon used to select a given value from the **Slider**.
   */
  thumb?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * The **Slider's** base. It is used to visibly display the min and max selectable values.
   */
  rail?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * The bar showing the current selected area adjacent to the **Slider's** thumb.
   */
  track?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * CSS class name to attach to the root element.
   */
  className?: string;

  /**
   * The root element type of this component.
   *
   * @default div
   */
  as?: React.ElementType;

  /**
   * The starting value for an `uncontrolled` **Slider**.
   */
  defaultValue?: number;

  /**
   * The current value of the `controlled` **Slider**.
   */
  value?: number;

  /**
   * The min value of the **Slider**.
   * @default 0
   */
  min?: number;

  /**
   * The max value of the **Slider**.
   * @default 10
   */
  max?: number;

  /**
   * The number of steps that the **Slider's** `value` will increment upon change.
   * @default 1
   */
  step?: number;

  /**
   * Triggers a callback when the value has been changed. This will be called on every individual step.
   */
  onChange?: (value: number, ev?: DragChangeEvent) => void;

  /**
   * The **Slider's** current value label to be read by the screen reader.
   */
  ariaValueText?: (value: number) => string;
}

/**
 * Names of the shorthand properties in SliderProps
 */
export type SliderShorthandProps = 'thumb' | 'rail' | 'track';

/**
 * Names of SliderProps that have a default value in useSlider
 */
export type SliderDefaultedProps = 'thumb' | 'rail' | 'track';

/**
 * State used in rendering Slider
 */
export interface SliderState extends ComponentStateCompat<SliderProps, SliderShorthandProps, SliderDefaultedProps> {
  /**
   * Ref to the root element
   */
  ref: React.Ref<Slider>;
}

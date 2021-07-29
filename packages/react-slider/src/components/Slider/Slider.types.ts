import * as React from 'react';
import { ComponentPropsCompat, ComponentStateCompat, ShorthandPropsCompat } from '@fluentui/react-utilities';

export interface SliderPublicRef {
  value: number | undefined;
  focus: () => void;
}

/**
 * Slider Props
 */
export interface SliderProps
  extends ComponentPropsCompat,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /**
   * The **Slider's** base. It is used to visibly display the min and max selectable values.
   */
  rail?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * The bar showing the current selected area adjacent to the **Slider's** thumb.
   */
  track?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * The draggable icon used to select a given value from the **Slider**.
   */
  thumb?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

  /**
   * The area in which the **Slider's** rail allows for the thumb to be dragged.
   */
  activeRail?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;

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
   * Mutually exclusive with `value` prop.
   */
  defaultValue?: number;

  /**
   * The current value of the `controlled` **Slider**.
   * Mutually exclusive with `defaultValue` prop.
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
   * Whether the thumb will snap to the closest value while moving the **Slider**.
   * @default `false` (renders with smooth gliding)
   */
  snapToStep?: boolean;

  /**
   * Triggers a callback when the value has been changed. This will be called on every individual step.
   */
  onChange?: (value: number, ev?: PointerEvent) => void;

  /**
   * The **Slider's** current value label to be read by the screen reader.
   */
  ariaValueText?: (value: number) => string;
}

/**
 * Names of the shorthand properties in SliderProps
 */
export type SliderShorthandProps = 'rail' | 'track' | 'thumb' | 'activeRail';

/**
 * Names of SliderProps that have a default value in useSlider
 */
export type SliderDefaultedProps = 'rail' | 'track' | 'thumb' | 'activeRail';

/**
 * State used in rendering Slider
 */
export interface SliderState extends ComponentStateCompat<SliderProps, SliderShorthandProps, SliderDefaultedProps> {
  /**
   * Ref to the root element
   */
  ref: React.RefObject<HTMLElement & SliderPublicRef>;
}

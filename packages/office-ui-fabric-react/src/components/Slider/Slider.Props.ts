import * as React from 'react';

export interface ISlider {
  value: number | undefined;

  focus: () => void;
}

export interface ISliderProps {
  /**
   * Optional callback to access the ISlider interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: ISlider) => void;

  /**
   * Description label of the Slider
   */
  label?: string;

  /**
   * The initial value of the Slider. Use this if you intend for the Slider to be an uncontrolled component.
   * This value is mutually exclusive to value. Use one or the other.
   */
  defaultValue?: number;

  /**
   * The initial value of the Slider. Use this if you intend to pass in a new value as a result of onChange events.
   * This value is mutually exclusive to defaultValue. Use one or the other.
   */
  value?: number;

  /**
   * The min value of the Slider
   * @default 0
   */
  min?: number;

  /**
   * The max value of the Slider
   * @default 10
   */
  max?: number;

  /**
   * The diffrrence between the two adjacent values of the Slider
   * @default 1
   */
  step?: number;

  /**
   * Whether to show the value on the right of the Slider.
   * If you want to show the value by yourself, you may want to set this value to false.
   */
  showValue?: boolean;

  /**
   * Callback when the value has been changed
   */
  onChange?: (value: number) => void;

  /**
   * A description of the Slider for the benefit of screen readers.
   */
  ariaLabel?: string;

  /**
   * Whether or not the Slider is disabled.
   */
  disabled?: boolean;

  /**
  * Optional className for slider.
  */
  className?: string;

  /**
   * Optional mixin for additional props on the thumb button within the slider.
   */
  buttonProps?: React.HTMLAttributes<HTMLButtonElement>;
}

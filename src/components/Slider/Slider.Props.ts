import * as React from 'react';

export interface ISliderProps extends React.HTMLProps<HTMLInputElement> {
  /**
   * Description label of the Slider
   */
  label?: string;

  /**
   * The initial value of the Slider
   */
  initialValue?: number;

  /**
   * The min value of the Slider
   */
  min: number;

  /**
   * The max value of the Slider
   */
  max: number;

  /**
   * The diffrrence between the two adjacent values of the Slider
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
  onChanged?: (value: number) => void;

  /**
   * A description of the Slider for the benefit of screen readers.
   */
  ariaLabel?: string;

  /**
   * Whether or not the Slider is disabled.
   */
  isDisabled?: boolean;
}
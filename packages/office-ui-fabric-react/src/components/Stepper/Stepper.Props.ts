import * as React from 'react';
import { IStepperState } from './Stepper';

export interface IStepperProps {

  /**
   * The initial value of the Stepper. Use this if you intend for the Stepper to be an uncontrolled component.
   * This value is mutually exclusive to value. Use one or the other.
   * @default 0
   */
  defaultValue?: number;

  /**
   * The initial value of the Stepper. Use this if you intend to pass in a new value as a result of onChange events.
   * This value is mutually exclusive to defaultValue. Use one or the other.
   */
  value?: number;

  /**
   * The min value of the Stepper.
   * @default 0
   */
  min?: number;

  /**
   * The max value of the Stepper.
   * @default 10
   */
  max?: number;

  /**
   * The diffrrence between the two adjacent values of the Stepper.
   * @default 1
   */
  step?: number;

  /**
   * Callback when the value has been changed.
   */
  onChange?: (value: number) => void;

  /**
   * A description of the Stepper for the benefit of screen readers.
   */
  ariaLabel?: string;

  /**
   * Whether or not the Stepper is disabled.
   */
  disabled?: boolean;

  /**
  * Optional className for Stepper.
  */
  className?: string;

  /**
   * Acceptable units for spinner (e.g. suffix for the textFeild value), defaults to '' if nothing given here,
   * otherwise [0] is used by default.
   */
  validUnitOptions?: string[];

  /**
   * Label for the spinner.
   */
  label?: string;

  /**
   * The method is used to get the validation error message and determine whether the input value is valid or not.
   *
   *   When it returns string:
   *   - If valid, it returns empty string.
   *   - If invalid, it returns the error message string and the text field will
   *     show a red border and show an error message below the text field.
   *
   */
  onGetErrorMessage?: (value: string, state: IStepperState, props: IStepperProps) => string;
}

export interface IStepper {
  value?: number
}
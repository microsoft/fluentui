import * as React from 'react';
import { ISpinButtonState } from './SpinButton';
import { RectangleEdge } from '../../utilities/positioning'

export interface ISpinButtonProps {

  /**
   * The initial value of the SpinButton. Use this if you intend for the SpinButton to be an uncontrolled component.
   * This value is mutually exclusive to value. Use one or the other.
   * @default 0
   */
  defaultValue?: string;

  /**
   * The initial value of the SpinButton. Use this if you intend to pass in a new value as a result of onChange events.
   * This value is mutually exclusive to defaultValue. Use one or the other.
   */
  value?: string;

  /**
   * The width of the SpinButton (including the optional label).
   * @default 100%
   */
  width?: string;

  /**
   * The min value of the SpinButton.
   * @default 0
   */
  min?: number;

  /**
   * The max value of the SpinButton.
   * @default 10
   */
  max?: number;

  /**
   * The diffrrence between the two adjacent values of the SpinButton.
   * @default 1
   */
  step?: number;

  /**
   * Callback when the value has been changed.
   */
  onChange?: (value: number) => void;

  /**
   * A description of the SpinButton for the benefit of screen readers.
   */
  ariaLabel?: string;

  /**
   * Whether or not the SpinButton is disabled.
   */
  disabled?: boolean;

  /**
  * Optional className for SpinButton.
  */
  className?: string;

  /**
   * Descriptive label for the SpinButton.
   */
  label: string;

  /**
   * @default: Left
   */
  labelDirection?: RectangleEdge;

  labelGapSpace?: number;

  /**
   * The method is used to get the validation error message and determine whether the input value is valid or not.
   *
   *   When it returns string:
   *   - If valid, it returns empty string.
   *   - If invalid, it returns the error message string and the text field will
   *     show a red border and show an error message below the text field.
   *
   */
  onBlur?: (value: string) => string;

  /**
   * TODO
   */
  onIncrement?: (value: string) => string;

  /**
   * TODO
   */
  onDecrement?: (value: string) => string;
}

export interface ISpinButton {
  value?: number
}
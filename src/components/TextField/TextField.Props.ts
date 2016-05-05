import * as React from 'react';

/**
 * TextField component props.
 */
export interface ITextFieldProps extends React.HTMLProps<HTMLInputElement> {
  /**
   * Whether or not the textfield is a multiline textfield.
   * @default false
   */
  multiline?: boolean;

  /**
   * Whether or not the textfield is underlined.
   * @default false
   */
  underlined?: boolean;

  /**
   * Label for the textfield.
   */
  label?: string;

  /**
   * The textfield input description
   */
  description?: string;

  /**
   * CSS class for the icon.
   */
  iconClass?: string;

  /**
   * Default value of the textfield, if any.
   */
  value?: string;

  /**
   * Callback for the onChanged event.
   */
  onChanged?: (newValue: any) => void;

  /**
   * The method is used to get the validation error message and determine whether the input value is valid or not.
   *
   *   When it returns string:
   *   - If valid, it returns empty string.
   *   - If invalid, it returns the error message string and the text field will
   *     show a red border and show an error message below the text field.
   *
   *   When it returns Promise<any>:
   *   - If valid, the promise is fulfilled.
   *   - If invalid, the promise is rejected with an Error with error message.
   *
   */
  onGetErrorMessage?: (value: string) => string | Promise<any>;

  /**
   * Aria Label for textfield, if any.
   */
  ariaLabel?: string;
}

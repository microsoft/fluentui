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
   * Callback for the onBeforeChange event.
   */
  onBeforeChange?: (newValue: any) => void;

  /**
   * Callback for the onNotifyValidationResult event.
   */
  onNotifyValidationResult?: (errorMessage: string) => void;

  /**
   * The method is used to get the validation error message and determine whether the input value is valid or not.
   *
   *   When it returns string:
   *   - If valid, it returns empty string.
   *   - If invalid, it returns the error message string and the text field will
   *     show a red border and show an error message below the text field.
   *
   *   When it returns Promise<string>:
   *   - The resolved value is display as error message.
   *   - The rejected, the value is thrown away.
   *
   */
  onGetErrorMessage?: (value: string) => string | PromiseLike<string>;

  /**
   * Text field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
   * @default 200
   */
  deferredValidationTime?: number;

  /**
   * Aria Label for textfield, if any.
   */
  ariaLabel?: string;
}

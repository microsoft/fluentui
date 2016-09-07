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
   * Whether or not the multiline textfield is resizable.
   * @default true
   */
  resizable?: boolean;

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
   * Default value of the textfield, if any. Only provide this if the textfield is an uncontrolled component;
   * otherwise, use the "value" property.
   */
  defaultValue?: string;

  /**
   * Current value of the textfield. Only provide this if the textfield is a controlled component where you
   * are maintaining its current state; otherwise, use the "defaultValue" property.
   */
  value?: string;

  /**
   * The error message show show for an invalid value.
   */
  errorMessage?: string;

  /**
   * Callback for the onChanged event.
   */
  onChanged?: (newValue: any) => void;

  /**
   * Aria Label for textfield, if any.
   */
  ariaLabel?: string;
}

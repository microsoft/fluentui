import * as React from 'react';

/**
 * TextField component props.
 */
export interface ITextFieldProps extends React.DOMAttributes {
  /**
   * children, if any.
   */
  children?: any;

  /**
   * Whether or not the textfield is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether or not the textfield is a required field.
   * @default false
   */
  required?: boolean;

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
   * Placeholder text for the textfield.
   */
  placeholder?: string;

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
   * CSS class for the textfield.
   */
  className?: string;

  /**
   * Aria Label for textfield, if any.
   */
  ariaLabel?: string;
}
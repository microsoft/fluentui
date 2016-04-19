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
   */
  disabled?: boolean;

  /**
   * Whether or not the textfield is a required field.
   */
  required?: boolean;

  /**
   * Whether or not the textfield is a multiline textfield.
   */
  multiline?: boolean;

  /**
   * Whether or not the textfield is underlined.
   */
  underlined?: boolean;

  /**
   * Placeholder text for the textfield.
   */
  placeholder?: string;

  /**
   * Text for the textfield.
   */
  label?: string;

  /**
   * Description the textfield.
   */
  description?: string;

  /**
   * Css class for the icon.
   */
  iconClass?: string;

  /**
   * Defualt value of the textfield, if any.
   */
  value?: string;

  /**
   * Callback for the onChanged event.
   */
  onChanged?: (newValue: any) => void;

  /**
   * Css class for the textfield.
   */
  className?: string;
}
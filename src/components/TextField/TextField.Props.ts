import * as React from 'react';

export interface ITextFieldProps extends React.DOMAttributes {

  /**
   * Children of the component
   */
  children?: any;

  /**
   * Whether the textfield is diabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the textfield is required
   * @default false
   */
  required?: boolean;

  /**
   * Whether the textfield is multiline
   * @default false
   */
  multiline?: boolean;

  /**
   * Whether the textfield is underlined
   * @default false
   */
  underlined?: boolean;

  /**
   * The textfield placeholder text
   */
  placeholder?: string;

  /**
   * The textfield label text
   */
  label?: string;

  /**
   * The textfield input description
   */
  description?: string;

  /**
   * An icon to add to the label
   */
  iconClass?: string;

  /**
   * The input value of the textfield
   */
  value?: string;

  /**
  * A callback function for when the value of the textfield changes
  */
  onChanged?: (newValue: any) => void;

  /**
   * Additional css class that is appended to the existing class
   */
  className?: string;
}
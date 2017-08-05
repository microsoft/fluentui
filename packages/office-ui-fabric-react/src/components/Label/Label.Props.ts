/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

export interface ILabel {

}

export interface ILabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Optional callback to access the ILabel interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: ILabel) => void;

  /**
   * Whether the associated form field is required or not
   * @defaultvalue false
   */
  required?: boolean;

  /**
   * Renders the label as disabled.
   */
  disabled?: boolean;
}

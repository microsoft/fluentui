/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

export interface ILabelProps extends React.HTMLProps<HTMLLabelElement> {
  /**
   *  The id of the form element this label is describing
   */
  htmlFor?: string;

  /**
   * Whether the associated form field is disabled or not
   * @defaultvalue false
   */
  isDisabled?: boolean;

  /**
   * Whether the associated form field is required or not
   * @defaultvalue false
   */
  isRequired?: boolean;
}
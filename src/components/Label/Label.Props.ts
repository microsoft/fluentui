/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

export interface ILabelProps extends React.HTMLProps<HTMLLabelElement> {
  /**
   * Whether the associated form field is required or not
   * @defaultvalue false
   */
  required?: boolean;
}

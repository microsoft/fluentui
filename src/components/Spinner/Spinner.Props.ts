import * as React from 'react';
import { Spinner } from './Spinner';

export interface ISpinnerProps extends React.Props<Spinner> {
 /**
 * The type of the button to render. { normal, large }
 * @default SpinnerType.normal
 */
  type?: SpinnerType;

 /**
 * The label to show next to the spinner.
 */
  label?: string;
}

export enum SpinnerType {
  normal,
  large
}

import * as React from 'react';
import { Spinner } from './Spinner';

export interface ISpinnerProps extends React.Props<Spinner> {
  /**
  * The type of Spinner to render. { extraSmall, small, medium, normal, large }
  * @default SpinnerType.medium
  */
  type?: SpinnerType;

  /**
  * The label to show next to the Spinner.
  */
  label?: string;

  /**
   * Additional CSS class(es) to apply to the Spinner.
   */
  className?: string;
}

export enum SpinnerType {

  /**
   * 12px Spinner diameter
   */
  xSmall = 0,

  /**
   * 16px Spinner diameter
   */
  small = 1,

  /**
   * 20px Spinner diameter
   */
  medium = 2,

  /**
   * @deprecated
   * Deprecated and will be removed at >= 2.0.0. Use medium instead.
   */
  normal = 2,

  /**
   * 28px Spinner diameter
   */
  large = 3
}

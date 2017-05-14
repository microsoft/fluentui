import * as React from 'react';
import { Spinner } from './Spinner';

export interface ISpinner {

}

export interface ISpinnerProps extends React.Props<Spinner> {
  /**
   * Optional callback to access the ISpinner interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: ISpinner) => void;

  /**
   * Deprecated and will be removed at >= 2.0.0. Use SpinnerSize instead.
   * @deprecated
   */
  type?: SpinnerType;

  /**
  * The size of Spinner to render. { extraSmall, small, medium, large }
  * @default SpinnerType.medium
  */
  size?: SpinnerSize;

  /**
   * The label to show next to the Spinner. Label updates will be announced to the screen readers.
   * Use ariaLive to control politeness level.
   */
  label?: string;

  /**
   * Additional CSS class(es) to apply to the Spinner.
   */
  className?: string;

  /**
   * Politeness setting for label update announcement.
   * @default polite
   */
  ariaLive?: 'assertive' | 'polite' | 'off';

  /**
   * Alternative status label for screen reader
   */
  ariaLabel?: string;
}

export enum SpinnerSize {
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
   * 28px Spinner diameter
   */
  large = 3
}

/**
 * Deprecated at v2.0.0, use 'SpinnerSize' instead.
 * @deprecated
 */
export enum SpinnerType {
  /**
   * Deprecated and will be removed at >= 2.0.0. Use SpinnerSize.medium instead.
   */
  normal = 0,

  /**
   * Deprecated and will be removed at >= 2.0.0. Use SpinnerSize.large instead.
   */
  large = 1
}

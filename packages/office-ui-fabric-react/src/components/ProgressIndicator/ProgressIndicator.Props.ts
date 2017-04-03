import * as React from 'react';

export interface IProgressIndicator {

}

export interface IProgressIndicatorProps {
  /**
   * Optional callback to access the IProgressIndicator interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IProgressIndicator) => void;

  /**
   * Class name to apply to the root in addition to ms-ProgressIndicator.
   */
  className?: string;

  /**
   * Label to display above the control.
   */
  label?: string;

  /**
   * Text describing or supplementing the operation.
   */
  description?: string;

  /**
   * Percentage of the operation's completeness.
   */
  percentComplete?: number;

  /**
   * @deprecated
   * Deprecated at v0.43.0, to be removed at >= v0.53.0. Use 'label' instead.
   */
  title?: string;
}
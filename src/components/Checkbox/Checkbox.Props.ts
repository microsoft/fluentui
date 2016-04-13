import * as React from 'react';
import Checkbox from './Checkbox';

export interface ICheckboxProps extends React.Props<Checkbox> {
  /**
   * Label to display next to the checkbox.
   */
  text: string;

  /**
   * Whether the checkbox is checked or not.
   * @defaultvalue false
   */
  isChecked?: boolean;

  /**
   * Whether the checkbox is enabled or not.
   * @defaultvalue true
   */
  isEnabled?: boolean;

  /**
   * Callback that is called when the checked value has changed.
   */
  onChanged?: (isChecked: boolean) => void;

  /**
   * Optional class name to stamp on the root of the component.
   */
  className?: string;
}

import * as React from 'react';
import { Checkbox } from './Checkbox';

/**
 * Checkbox class interface.
 */
export interface ICheckbox {
  /** Gets the current checked state. */
  checked: boolean;

  /** Sets focus to the checkbox. */
  focus(): void;
}

/**
 * Checkbox properties.
 */
export interface ICheckboxProps extends React.Props<Checkbox> {
  /**
   * Additional class name to provide on the root element, in addition to the ms-Checkbox class.
   */
  className?: string;

  /**
   * Checked state.
   */
  checked?: boolean;

  /**
   * Default checked state. Mututally exclusive to "checked". Use this if you want an uncontrolled component.
   */
  defaultChecked?: boolean;

  /**
   * Label to display next to the checkbox.
   */
  label?: string;

  /**
   * Disabled state of the checkbox.
   */
  disabled?: boolean;

  /**
   * Callback that is called when the checked value has changed.
   */
  onChange?: (ev?: React.FormEvent, isChecked?: boolean) => void;

  /**
   * Input props that will be mixed into the input element, before other props are applied. This allows you to extend
   * the input element with additional attributes, such as data-automation-id needed for automation.
   */
  inputProps?: React.Props<HTMLInputElement>;
}

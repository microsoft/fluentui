import * as React from 'react';
import { Checkbox } from './Checkbox';

export interface ICheckbox {
  /** Gets the current checked state. */
  checked: boolean;

  /** Sets focus to the checkbox. */
  focus(): void;
}

export interface ICheckboxProps extends React.HTMLProps<HTMLInputElement> {
  /**
   * Label to display next to the checkbox.
   */
  label?: string;

  /**
   * Callback that is called when the checked value has changed.
   */
  onChange?: (ev?: React.FormEvent, isChecked?: boolean) => void;
}

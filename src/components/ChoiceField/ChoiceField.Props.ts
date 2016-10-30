import * as React from 'react';
import { ChoiceField } from './ChoiceField';

export interface IChoiceFieldProps extends React.Props<ChoiceField> {
  /**
   * Label to display next to the ChoiceField.
   */
  label?: string;

  /**
   * Checked state of the ChoiceField. Use this for a controlled ChoiceField. Otherwise refer to 'defaultChecked'.
   */
  checked?: boolean;

  /**
   * Initial checked state of the ChoiceField. Use this for an uncontrolled ChoiceField. Other refer to 'checked'.
   */
  defaultChecked?: boolean;

  /**
   * Set to true to disable the ChoiceField
   * @defaultvalue false
   */
  disabled?: boolean;

  /**
   * Callback when the checked value changes.
   */
  onChange?: (event: React.FormEvent, isChecked: boolean) => void;

  /**
   * Optional class name to stamp on the root of the component.
   */
  className?: string;

  /**
   * Name of the ChoiceField component.
   */
  id?: string;

  /**
   * Name of the ChoiceField input element.
   */
  name?: string;
}

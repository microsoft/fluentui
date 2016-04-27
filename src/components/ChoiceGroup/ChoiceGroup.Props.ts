import * as React from 'react';

export interface IChoiceGroupProps {
  /**
   * The options for the choice group.
   */
  options: IChoiceGroupOption[];

  /**
   * A callback for receiving a notification when the choice has been changed.
   */
  onChanged?: (option: IChoiceGroupOption, evt?: React.SyntheticEvent) => void;
}

export interface IChoiceGroupOption {
  /**
   * A required key to uniquely identify the option.
   */
  key: string;

  /**
   * The text string for the option.
   */
  text: string;

  /**
   * Whether the option is disabled or not.
   * @defaultvalue false
   */
  isDisabled?: boolean;

  /**
   * Whether the options is checked or not.
   * @defaultvalue false
   */
  isChecked?: boolean;
}

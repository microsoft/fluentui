export interface IDropdownProps {
  /**
   * Descriptive label for the Dropdown
   */
  label: string;

  /**
  * Id of the drop down
  */
  id?: string;

  /**
   * The key of the initially selected option
   */
  selectedKey?: string;

  /**
   * Collection of options for this Dropdown
   */
  options?: IDropdownOption[];

  /**
   * Callback issues when the selected option changes
   */
  onChanged?: (option: IDropdownOption, index?: number) => void;

  /**
   * Whether or not the Dropdown is disabled.
   */
  isDisabled?: boolean;
}

export interface IDropdownOption {
  /**
   * Arbitrary string associated with this option.
   */
  key: string;

  /**
   * Text to render for this option
   */
  text: string;

  /**
   * Index for this option
   */
  index?: number;

  /**
   * Whether this option is currently selected.
   */
  isSelected?: boolean;
}
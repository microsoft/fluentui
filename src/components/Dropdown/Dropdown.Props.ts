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
  selectedKey?: string | number;

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
  disabled?: boolean;

  // @todo: Update version numbers for depriate and removal
  /**
   * @deprecated
   * Deprecated at v0.52.0, to be removed at >= v1.0.0. Use 'disabled' instead.
   */
  isDisabled?: boolean;

}

export interface IDropdownOption {
  /**
   * Arbitrary string associated with this option.
   */
  key: string | number;

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

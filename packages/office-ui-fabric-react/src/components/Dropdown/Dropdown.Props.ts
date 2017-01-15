import { IRenderFunction } from '../../Utilities';
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
   * The key that will be initially used to set a selected item.
   */
  defaultSelectedKey?: string | number;

  /**
   * The key of the selected item. If you provide this, you must maintain selection
   * state by observing onChange events and passing a new value in when changed.
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
   * Optional custom renderer for the dropdown item
   */
  onRenderItem?: IRenderFunction<IDropdownOption>;

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

  /** If option is selected. */
  selected?: boolean;

  /**
   * @deprecated
   * Deprecated at v.65.1 and will be removed by v 1.0. Use 'selected' instead.
   */
  isSelected?: boolean;
}

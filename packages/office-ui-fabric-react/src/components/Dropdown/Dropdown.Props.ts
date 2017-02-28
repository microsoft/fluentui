import { IRenderFunction } from '../../Utilities';
import { Dropdown } from './Dropdown';

export interface IDropdownProps extends React.Props<Dropdown> {
  /**
   * Descriptive label for the Dropdown
   */
  label: string;

  /**
  * Aria Label for the Dropdown for screen reader users.
  */
  ariaLabel?: string;

  /**
  * Id of the drop down
  */
  id?: string;

  /**
   * If provided, additional class name to provide on the root element.
   */
  className?: string;

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
   * Optional custom renderer for selected option displayed in input
   */
  onRenderTitle?: IRenderFunction<IDropdownOption>;

  /**
    * Optional custom renderer for the dropdown container
    */
  onRenderContainer?: IRenderFunction<IDropdownProps>;

  /**
    * Optional custom renderer for the dropdown list
    */
  onRenderList?: IRenderFunction<IDropdownProps>;

  /**
   * Optional custom renderer for the dropdown options
   */
  onRenderItem?: IRenderFunction<IDropdownOption>;

  /**
   * Optional custom renderer for the dropdown option content
   */
  onRenderOption?: IRenderFunction<IDropdownOption>;

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

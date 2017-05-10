import * as React from 'react';
import { IRenderFunction } from '../../Utilities';
import { Dropdown } from './Dropdown';
import { ICalloutProps } from '../../Callout';

export enum DropdownMenuItemType {
  Normal = 0,
  Divider = 1,
  Header = 2
}

export interface IDropdown {

}

export interface IDropdownProps extends React.Props<Dropdown> {
  /**
   * Optional callback to access the IDropdown interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IDropdown) => void;

  /**
   * Descriptive label for the Dropdown
   */
  label?: string;

  /**
   * Input placeholder text. Displayed until option is selected.
   */
  placeHolder?: string;

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
   * Optional custom renderer for placeholder text
   */
  onRenderPlaceHolder?: IRenderFunction<IDropdownProps>;

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

  /**
   * Whether or not the Dropdown is required.
   */
  required?: boolean;

  /**
   * Custom properties for Dropdown's Callout used to render options.
   */
  calloutProps?: ICalloutProps;

  /**
   * Deprecated at v0.52.0, use 'disabled' instead.
   * @deprecated
   */
  isDisabled?: boolean;

  /**
   * Descriptive label for the Dropdown Error Message
   */
  errorMessage?: string;
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
   * Text to render for this option
   */
  itemType?: DropdownMenuItemType;

  /**
   * Index for this option
   */
  index?: number;

  /** If option is selected. */
  selected?: boolean;

  /**
   * Deprecated at v.65.1, use 'selected' instead.
   * @deprecated
   */
  isSelected?: boolean;
}

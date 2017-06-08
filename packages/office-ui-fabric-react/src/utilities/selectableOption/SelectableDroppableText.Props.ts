import * as React from 'react';
import { IRenderFunction } from '../../Utilities';
import { ICalloutProps } from '../../Callout';
import { ISelectableOption } from '../../Utilities/selectableOption/SelectableOption.Props';

export interface ISelectableDroppableTextProps<T> extends React.Props<T> {
  /**
  * Optional callback to access the IDropdown interface. Use this instead of ref for accessing
  * the public methods and properties of the component.
  */
  componentRef?: (component: T) => void;

  /**
   * Descriptive label for the Dropdown
   */
  label?: string;

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
  options?: ISelectableOption[];

  /**
   * Callback issues when the selected option changes
   */
  onChanged?: (option: ISelectableOption, index?: number) => void;

  /**
    * Optional custom renderer for the dropdown container
    */
  onRenderContainer?: IRenderFunction<ISelectableDroppableTextProps<T>>;

  /**
    * Optional custom renderer for the dropdown list
    */
  onRenderList?: IRenderFunction<ISelectableDroppableTextProps<T>>;

  /**
   * Optional custom renderer for the dropdown options
   */
  onRenderItem?: IRenderFunction<ISelectableOption>;

  /**
   * Optional custom renderer for the dropdown option content
   */
  onRenderOption?: IRenderFunction<ISelectableOption>;

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
   * Descriptive label for the Dropdown Error Message
   */
  errorMessage?: string;
}
import * as React from 'react';
import { IRenderFunction } from '../../Utilities';
import { ICalloutProps } from '../../Callout';
import { ISelectableOption } from '../../utilities/selectableOption/SelectableOption.Props';

export interface ISelectableDroppableTextProps<T> extends React.Props<T> {
  /**
  * Optional callback to access the ISelectableDroppableText interface. Use this instead of ref for accessing
  * the public methods and properties of the component.
  */
  componentRef?: (component: T) => void;

  /**
   * Descriptive label for the ISelectableDroppableText
   */
  label?: string;

  /**
  * Aria Label for the ISelectableDroppableText for screen reader users.
  */
  ariaLabel?: string;

  /**
  * Id of the ISelectableDroppableText
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
   * Collection of options for this ISelectableDroppableText
   */
  options?: any;

  /**
   * Callback issues when the selected option changes
   */
  onChanged?: (option: ISelectableOption, index?: number) => void;

  /**
    * Optional custom renderer for the ISelectableDroppableText container
    */
  onRenderContainer?: IRenderFunction<ISelectableDroppableTextProps<T>>;

  /**
    * Optional custom renderer for the ISelectableDroppableText list
    */
  onRenderList?: IRenderFunction<ISelectableDroppableTextProps<T>>;

  /**
   * Optional custom renderer for the ISelectableDroppableText options
   */
  onRenderItem?: IRenderFunction<ISelectableOption>;

  /**
   * Optional custom renderer for the ISelectableDroppableText option content
   */
  onRenderOption?: IRenderFunction<ISelectableOption>;

  /**
   * Whether or not the ISelectableDroppableText is disabled.
   */
  disabled?: boolean;

  /**
   * Whether or not the ISelectableDroppableText is required.
   */
  required?: boolean;

  /**
   * Custom properties for ISelectableDroppableText's Callout used to render options.
   */
  calloutProps?: ICalloutProps;

  /**
   * Descriptive label for the ISelectableDroppableText Error Message
   */
  errorMessage?: string;
}
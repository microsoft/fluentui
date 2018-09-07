import * as React from 'react';
import { IRefObject, IRenderFunction } from '../../Utilities';
import { ICalloutProps } from '../../Callout';
import { IPanelProps } from '../../Panel';
import { ISelectableOption } from '../../utilities/selectableOption/SelectableOption.types';

export interface ISelectableDroppableTextProps<T> extends React.HTMLAttributes<T> {
  /**
   * Optional callback to access the ISelectableDroppableText interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<T>;

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
   * The key(s) that will be initially used to set a selected item.
   */
  defaultSelectedKey?: string | number | string[] | number[];

  /**
   * The key(s) of the selected item. If you provide this, you must maintain selection
   * state by observing onChange events and passing a new value in when changed.
   */
  selectedKey?: string | number | string[] | number[];

  /**
   * Collection of options for this ISelectableDroppableText
   */
  options?: any;

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
   * Custom properties for ISelectableDroppableText's Panel used to render options on small devices.
   */
  panelProps?: IPanelProps;

  /**
   * Descriptive label for the ISelectableDroppableText Error Message
   */
  errorMessage?: string;
}

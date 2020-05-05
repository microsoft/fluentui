import * as React from 'react';
import { IRefObject, IRenderFunction } from '../../Utilities';
import { ICalloutProps } from '../../Callout';
import { IPanelProps } from '../../Panel';
import { ISelectableOption } from '../../utilities/selectableOption/SelectableOption.types';

/**
 * - `TComponent` - Component used for reference properties, such as `componentRef`.
 * - `TListenerElement` - Listener element associated with HTML event callbacks. Optional. If not provided,
 *   `TComponent` is assumed.
 * {@docCategory ISelectableDroppableTextProps}
 */
export interface ISelectableDroppableTextProps<TComponent, TListenerElement>
  extends React.HTMLAttributes<TListenerElement> {
  /**
   * Optional callback to access the ISelectableDroppableText interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<TComponent>;

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
   *
   * Mutually exclusive with `selectedKey`.
   * For Dropdown in multi-select mode, use `defaultSelectedKeys` instead.
   */
  defaultSelectedKey?: string | number | string[] | number[] | null;

  /**
   * The key(s) of the selected item. If you provide this, you must maintain selection
   * state by observing onChange events and passing a new value in when changed.
   * Note that passing in `null` will cause selection to be reset.
   *
   * Mutually exclusive with `defaultSelectedKey`.
   * For Dropdown in multi-select mode, use `selectedKeys` instead.
   */
  selectedKey?: string | number | string[] | number[] | null;

  /**
   * Optional prop that indicates if multi-choice selections are allowed or not.
   * @defaultvalue false
   */
  multiSelect?: boolean;

  /**
   * Collection of options for this ISelectableDroppableText
   */
  options?: any;

  /**
   * Optional custom renderer for the ISelectableDroppableText container
   */
  onRenderContainer?: IRenderFunction<ISelectableDroppableTextProps<TComponent, TListenerElement>>;

  /**
   * Optional custom renderer for the ISelectableDroppableText list
   */
  onRenderList?: IRenderFunction<ISelectableDroppableTextProps<TComponent, TListenerElement>>;

  /**
   * Optional custom renderer for the ISelectableDroppableText options
   */
  onRenderItem?: IRenderFunction<ISelectableOption>;

  /**
   * Optional custom renderer for the ISelectableDroppableText option content
   */
  onRenderOption?: IRenderFunction<ISelectableOption>;

  /**
   * Callback that is issued when the options callout is dismissed
   */
  onDismiss?: () => void;

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

  /**
   * Input placeholder text. Displayed until option is selected.
   */
  placeholder?: string;

  /**
   * Whether or not the ComboBox/Dropdown should expand on keyboard focus.
   * @defaultvalue false
   */
  openOnKeyboardFocus?: boolean;
}

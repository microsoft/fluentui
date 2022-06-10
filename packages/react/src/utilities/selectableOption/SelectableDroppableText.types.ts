import * as React from 'react';
import type { IRefObject, IRenderFunction } from '../../Utilities';
import type { ICalloutProps } from '../../Callout';
import type { IPanelProps } from '../../Panel';
import type { ISelectableOption } from '../../utilities/selectableOption/SelectableOption.types';

/**
 * - `TComponent` - Component used for reference properties, such as `componentRef`.
 * - `TListenerElement` - Listener element associated with HTML event callbacks. Optional. If not provided,
 *   `TComponent` is assumed.
 * {@docCategory ISelectableDroppableTextProps}
 */
export interface ISelectableDroppableTextProps<TComponent, TListenerElement>
  extends React.HTMLAttributes<TListenerElement> {
  /**
   * Optional callback to access the component interface (usually `IDropdown` or `IComboBox`).
   * Use this instead of `ref` for accessing the public methods and properties of the component.
   */
  componentRef?: IRefObject<TComponent>;

  /**
   * Descriptive label for the field
   */
  label?: string;

  /**
   * Aria Label for the field for screen reader users.
   */
  ariaLabel?: string;

  /**
   * ID of the field
   */
  id?: string;

  /**
   * Additional class name for the root element.
   */
  className?: string;

  /**
   * The key(s) that will be initially used to set a selected item.
   *
   * Mutually exclusive with `selectedKey`.
   * For Dropdown (but not ComboBox) in multi-select mode, use `defaultSelectedKeys` instead.
   */
  defaultSelectedKey?: string | number | string[] | number[] | null;

  /**
   * The key(s) of the selected item. If you provide this, you must maintain selection
   * state by observing onChange events and passing a new value in when changed.
   * Note that passing in `null` will cause selection to be reset.
   *
   * Mutually exclusive with `defaultSelectedKey`.
   * For Dropdown (but not ComboBox) in multi-select mode, use `selectedKeys` instead.
   */
  selectedKey?: string | number | string[] | number[] | null;

  /**
   * Whether multi-choice selections are allowed or not.
   * @defaultvalue false
   */
  multiSelect?: boolean;

  /**
   * Collection of options for this field
   */
  options?: any;

  /**
   * Optional custom renderer for the option list container
   */
  onRenderContainer?: IRenderFunction<ISelectableDroppableTextProps<TComponent, TListenerElement>>;

  /**
   * Optional custom renderer for the option list
   */
  onRenderList?: IRenderFunction<ISelectableDroppableTextProps<TComponent, TListenerElement>>;

  /**
   * Optional custom renderer for all items, including headers and dividers as well as normal options.
   */
  onRenderItem?: IRenderFunction<ISelectableOption>;

  /**
   * Optional custom renderer for normal and header options only.
   * Use `onRenderItem` to control rendering for separators as well.
   */
  onRenderOption?: IRenderFunction<ISelectableOption>;

  /**
   * Callback for when the options list callout is dismissed
   */
  onDismiss?: () => void;

  /**
   * Whether or not the field is disabled.
   */
  disabled?: boolean;

  /**
   * Whether or not the field is required.
   */
  required?: boolean;

  /**
   * Custom properties for the Callout used to render the option list.
   */
  calloutProps?: ICalloutProps;

  /**
   * Custom properties for the Panel used to render the option list on small devices.
   */
  panelProps?: IPanelProps;

  /**
   * Error message for the field.
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

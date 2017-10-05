import { IBaseFloatingPickerProps } from './BaseFloatingPicker.Props';
import * as React from 'react';
import { IPickerItemProps, BaseAutoFill, IBasePicker, IInputProps } from 'office-ui-fabric-react/lib/Pickers';
import { BaseFloatingPicker } from './BaseFloatingPicker';

export interface IBaseWellPicker<T> extends IBasePicker<T> {
  /** Forces the picker to resolve */
  forceResolve?: () => void;
}

// Type T is the type of the item that is displayed
// and searched for by the people picker. For example, if the picker is
// displaying persona's than type T could either be of Persona or Ipersona props
export interface IBaseWellPickerProps<T> {
  componentRef?: (component?: IBaseWellPicker<T>) => void;

  /**
   * Function that specifies how the selected item will appear.
   */
  onRenderItem?: (props: IPickerItemProps<T>) => JSX.Element;

  /**
   * Initial items that have already been selected and should appear in the people picker.
   */
  defaultSelectedItems?: T[];

  /**
   * A callback for when the selected list of items changes.
   */
  onChange?: (items?: T[]) => void;

  /**
   * A callback for when the user put focus on the picker
   */
  onFocus?: React.FocusEventHandler<HTMLInputElement | BaseAutoFill>;

  /**
   * A callback for when the user moves the focus away from the picker
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement | BaseAutoFill>;

  /**
   * ClassName for the picker.
   */
  className?: string;

  /**
   * The floating picker type
   */
  floatingPickerType?: new (props: IBaseFloatingPickerProps<T>) => BaseFloatingPicker<T, IBaseFloatingPickerProps<T>>;

  /**
   * The properties that will get passed to the floating picker component.
   */
  floatingPickerProps?: IBaseFloatingPickerProps<T>;

  /**
   * AutoFill input native props
   * @default undefined
   */
  inputProps?: IInputProps;

  /**
   * Flag for disabling the picker.
   * @default false
   */
  disabled?: boolean;

  /**
   * Restrict the amount of selectable items.
   * @default undefined
   */
  itemLimit?: number;

  /**
  * Aria label for the 'X' button in the selected item component.
  * @default ''
  */
  removeButtonAriaLabel?: string;

  /**
   * A callback to process a selection after the user selects something from the picker.
   */
  onItemSelected?: (selectedItem?: T) => T | PromiseLike<T>;
  /**
   * The items that the base picker should currently display as selected. If this is provided then the picker will act as a controlled
   * component.
   */
  selectedItems?: T[];
}

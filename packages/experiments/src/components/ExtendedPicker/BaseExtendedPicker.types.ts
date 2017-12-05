import * as React from 'react';
import { BaseAutoFill, IInputProps } from 'office-ui-fabric-react/lib/Pickers';
import { IBaseFloatingPickerProps } from '../../FloatingPicker';
import { IBaseSelectedItemsListProps } from '../../SelectedItemsList';

export interface IBaseExtendedPicker<T> {
  /** Forces the picker to resolve */
  forceResolve?: () => void;
  /** Gets the current value of the input. */
  items: T[] | undefined;
  /** Sets focus to the input. */
  focus: () => void;
}

// Type T is the type of the item that is displayed
// and searched for by the people picker. For example, if the picker is
// displaying persona's than type T could either be of Persona or Ipersona props
export interface IBaseExtendedPickerProps<T> {
  componentRef?: (component?: IBaseExtendedPicker<T>) => void;

  /**
   * Initial items that have already been selected and should appear in the people picker.
   */
  defaultSelectedItems?: T[];

  /**
   * A callback for when the selected list of items changes.
   */
  onChange?: (items?: T[]) => void;

  /**
   * A callback for when text is pasted into the input
   */
  onPaste?: (pastedText: string) => T[];

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
   * Function that specifies how the floating picker will appear.
   */
  onRenderFloatingPicker: (props: IBaseFloatingPickerProps<T>) => JSX.Element;

  /**
   * Function that specifies how the floating picker will appear.
   */
  onRenderSelectedItems: (props: IBaseSelectedItemsListProps<T>) => JSX.Element;

  /**
   * Floating picker properties
   */
  floatingPickerProps: IBaseFloatingPickerProps<T>;

  /**
   * Selected items list properties
   */
  selectedItemsListProps: IBaseSelectedItemsListProps<T>;

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
   * A callback to process a selection after the user selects something from the picker.
   */
  onItemSelected?: (selectedItem?: T) => T | PromiseLike<T>;
  /**
   * The items that the base picker should currently display as selected. If this is provided then the picker will act as a controlled
   * component.
   */
  selectedItems?: T[];
}
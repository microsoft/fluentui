import * as React from 'react';
import { IPickerItemProps, ISuggestionModel, ValidationState } from 'office-ui-fabric-react/lib/pickers';

export interface IBaseSelectionItemsList<T> {
  /** Gets the current value of the input. */
  items: T[] | undefined;

  addItem: (item: T) => void;
}

// Type T is the type of the item that is displayed
// For example, if the picker is
// displaying persona's than type T could either be of Persona or Ipersona props
export interface IBaseSelectionItemsListProps<T> extends React.Props<any> {
  componentRef?: (component?: IBaseSelectionItemsList<T>) => void;

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
   * ClassName for the picker.
   */
  className?: string;
  /**
   * Function that specifies how arbitrary text entered into the well is handled.
   */
  createGenericItem?: (input: string, ValidationState: ValidationState) => ISuggestionModel<T>;
  /**
   * Aria label for the "X" button in the selected item component.
   * @default ''
   */
  removeButtonAriaLabel?: string;
  /**
   * A callback to process a selection after the user selects something from the picker.
   */
  onItemSelected?: (selectedItem?: T) => T | PromiseLike<T>;
  /**
   * The items that the base picker should currently display as selected. If this is provided then the picker will act as a controlled component.
   */
  selectedItems?: T[];
}
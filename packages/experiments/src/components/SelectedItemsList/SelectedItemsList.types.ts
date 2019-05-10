import * as React from 'react';
import { IPickerItemProps, ISuggestionModel, ValidationState } from 'office-ui-fabric-react/lib/Pickers';
import { Selection } from 'office-ui-fabric-react/lib/Selection';
import { IRefObject } from 'office-ui-fabric-react/lib/Utilities';

export interface ISelectedItemsList<T> {
  /**
   * Current value of the input
   */
  items: T[];
  /**
   * The items that are in the selection -- either the one passed in
   * via props, or the internal selection maintained by the component
   * when no seleciton is provided in the props
   */
  itemsInSelection: T[] | undefined;
  /*
   * Adds items to the selection
   */
  addItems: (items: T[]) => void;
  /*
   * Removes all items from the selection.
   * If called with a selection passed in, this will mutate the
   * seelection in props. Prefer to update the selection yourself.
   */
  unselectAll: () => void;
  /**
   * Removes items from the selection
   */
  removeItems: (items: T[]) => void;
}

export interface ISelectedItemProps<T> extends IPickerItemProps<T> {
  onCopyItem: () => void;
  /**
   * Override onItemChange to support replacing an item with multiple items.
   */
  onItemChange: (newItem: T | T[], index: number) => void;
}

export type BaseSelectedItem = {
  key?: React.Key;
};

// Type T is the type of the item that is displayed
// For example, if the picker is displaying persona's than type T could either be of Persona or Ipersona props
// tslint:disable-next-line:no-any
export interface ISelectedItemsListProps<T> extends React.ClassAttributes<any> {
  componentRef?: IRefObject<ISelectedItemsList<T>>;

  /**
   * The selection
   */
  selection?: Selection;
  /**
   * Gets the copy text that will be set in the item.
   */
  getItemCopyText?: (items: T[]) => string;
  /**
   * Function that specifies how the selected item will appear.
   */
  onRenderItem: React.ComponentType<ISelectedItemProps<T>>;
  /**
   * Initial items that have already been selected and should appear in the people picker.
   */
  defaultSelectedItems?: T[];
  /**
   * A callback for when the selected list of items changes.
   */
  onChange?: (items?: T[]) => void;
  /**
   * Function that specifies how arbitrary text entered into the well is handled.
   */
  createGenericItem?: (input: string, ValidationState: ValidationState) => ISuggestionModel<T>;
  /**
   * The items that the base picker should currently display as selected. If this is provided then the picker will act as a
   * controlled component.
   */
  selectedItems?: T[];

  /**
   * Aria label for the 'X' button in the selected item component.
   * @defaultvalue ''
   */
  removeButtonAriaLabel?: string;

  /**
   * A callback when and item or items are removed
   */
  onItemsRemoved?: (removedItems: T[]) => void;

  /**
   * A callback on whether this item can be removed
   */
  canRemoveItem?: (item: T) => boolean;
}

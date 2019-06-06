import * as React from 'react';
import { IPickerItemProps } from 'office-ui-fabric-react/lib/Pickers';
import { Selection } from 'office-ui-fabric-react/lib/Selection';

/**
 * Ref type of the UncontrolledSelectedItemList
 */
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
  /**
   * Copies the current selected items to the clipboard.
   */
  copyItemsInSelectionToClipboard: () => void;
}

/**
 * Ref type of the ControlledSelectedItemList
 */
export interface IControlledSelectedItemsList {
  /**
   * Copies the current selected items to the clipboard.
   */
  copyItemsInSelectionToClipboard: () => void;
}

export interface ISelectedItemProps<T> extends IPickerItemProps<T> {
  /**
   * Override onItemChange to support replacing an item with multiple items.
   */
  onItemChange: (newItem: T | T[], index: number) => void;
}

export type BaseSelectedItem = {
  key?: React.Key;
};

/**
 * Props that are constant on the selected item list when used as controlled or uncontrolled.
 */
export interface ICommonSelectedItemListProps<T> {
  /**
   * Gets the copy text that will be set in the item.
   */
  getItemCopyText?: (items: T[]) => string;
  /**
   * Function that specifies how the selected item will appear.
   */
  onRenderItem: React.ComponentType<ISelectedItemProps<T>>;
  /**
   * Aria label for the 'X' button in the selected item component.
   * @defaultvalue ''
   */
  removeButtonAriaLabel?: string;

  /**
   * A callback on whether this item can be removed
   */
  canRemoveItem?: (item: T) => boolean;
}

/**
 * Legal props for the selecte items list hwen used as a controlled (managed) component.
 */
export interface IControlledSelectedItemListProps<T> extends ICommonSelectedItemListProps<T> {
  componentRef?: React.Ref<IControlledSelectedItemsList>;
  /**
   * The selection
   */
  selection: Selection;
  /**
   * The items that the base picker should currently display as selected.
   * controlled component.
   */
  selectedItems: T[];
  /**
   * A callback when and item or items are removed
   */
  onItemsRemoved: (removedItems: T[]) => void;
  /**
   * Override onItemChange to support replacing an item with multiple items.
   */
  onItemChange: (newItem: T | T[], index: number) => void;
}

/**
 * Legal props for the selected items list when used as an uncontrolled (self-managing) component
 */
export interface IUncontrolledSelectedItemListProps<T> extends ICommonSelectedItemListProps<T> {
  componentRef?: React.Ref<ISelectedItemsList<T>>;
  /**
   * The selection
   */
  selection?: Selection;
  /**
   * Initial items that have already been selected and should appear in the list.
   */
  defaultSelectedItems?: T[];
  /**
   * A callback for when the selected list of items changes.
   */
  onChange?: (items?: T[]) => void;
}

export type ISelectedItemsListProps<T> = IUncontrolledSelectedItemListProps<T> | IControlledSelectedItemListProps<T>;

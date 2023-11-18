import * as React from 'react';
import type { IPickerItemProps } from '@fluentui/react/lib/Pickers';
import type { IRefObject } from '@fluentui/react/lib/Utilities';
import type { IDragDropEvents, IDragDropHelper } from '@fluentui/react/lib/DragDrop';

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
  onCopyItem?: () => void;
  /**
   * Override onItemChange to support replacing an item with multiple items.
   */
  onItemChange: (newItem: T | T[], index: number) => void;

  /**
   * Handling drag and drop events
   */
  dragDropEvents?: IDragDropEvents;

  /**
   * Helper for the drag and drop
   */
  dragDropHelper?: IDragDropHelper;

  /**
   * A list of events to register
   */
  eventsToRegister?: { eventName: string; callback: (item?: any, index?: number, event?: any) => void }[];

  /**
   * Function that specifies how arbitrary text entered into the edit input is handled.
   */
  createGenericItem?: (input: string) => T;
}

export type BaseSelectedItem = {
  key?: React.Key | null;
};

// Type T is the type of the item that is displayed
// For example, if the picker is displaying persona's than type T could either be of Persona or Ipersona props
export interface ISelectedItemsListProps<T> extends React.ClassAttributes<any> {
  componentRef?: IRefObject<ISelectedItemsList<T>>;

  /**
   * The selection
   */
  focusedItemIndices?: number[];
  /**
   * Gets the copy text that will be set in the item.
   */
  getItemCopyText?: (items: T[]) => string;
  /**
   * Function that specifies how the selected item will appear.
   */
  onRenderItem?: React.ComponentType<ISelectedItemProps<T>>;
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
  createGenericItem?: (input: string, isValid?: boolean) => T;
  /**
   * The items that the base picker should currently display as selected. If this is provided then the picker will
   * act as a controlled component.
   */
  selectedItems?: T[];

  /**
   * Aria label for the 'X' button in the selected item component.
   * @defaultvalue ''
   */
  removeButtonAriaLabel?: string;

  /**
   * A callback when an item or items are removed
   */
  onItemsRemoved?: (removedItems: T[], removedIndices: number[]) => void;

  /**
   * A callback on whether this item can be removed
   */
  canRemoveItem?: (item: T) => boolean;

  /** Drag & drop event callback interface. */
  dragDropEvents?: IDragDropEvents;

  /**
   * Helper for the drag and drop
   */
  dragDropHelper?: IDragDropHelper;

  /**
   * Callback for when items need to be converted to a string for a drag action
   */
  serializeItemsForDrag?: (items: T[]) => string;

  /**
   * Callback for when a data transfer item (drag drop action) needs to be converted to an item or items
   */
  deserializeItemsFromDrop?: (input: string) => T[];

  /**
   * Callback for when an item or items needs to be inserted into the list
   */
  dropItemsAt?: (insertIndex: number, itemsToInsert: T[], indicesToRemove: number[]) => void;

  /**
   * Callback for when an item needs to be replaced with another item or items
   */
  replaceItem?: (newItem: T | T[], index: number) => void;

  /**
   * Callback to check to see if two items are equal
   * Should be used if it's possible to change some properties on items so a strict compare will fail
   */
  itemsAreEqual?: (item1?: any, item2?: any) => boolean;
}

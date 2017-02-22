import * as React from 'react';
export interface IPickerItemProps<T> extends React.Props<any> {
  item: T;
  index: number;
  selected?: boolean;
  onRemoveItem?: () => void;
  /**
   * Internal Use only, gives a callback to the renderer to call when an item has changed.
   * This allows the base picker to keep track of changes in the items.
   */
  onItemChange?: (item: T, index: number) => void;
}
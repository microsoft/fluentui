import * as React from 'react';
import { IRefObject } from '../../Utilities';

/**
 * PickerItem component.
 * {@docCategory Pickers}
 */
export interface IPickerItem {}

/**
 * PickerItem props common for any type of items.
 * {@docCategory Pickers}
 */
export interface IPickerItemProps<T> extends React.AllHTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the IPickerItem interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IPickerItem>;

  /** The item of Type T (Persona, Tag, or any other custom item provided). */
  item: T;

  /** Index number of the item in the array of picked items. */
  index: number;

  /** Whether the picked item is selected or not. */
  selected?: boolean;

  /** Callback issued when the item is removed from the array of picked items. */
  onRemoveItem?: () => void;

  /**
   * Internal Use only, gives a callback to the renderer to call when an item has changed.
   * This allows the base picker to keep track of changes in the items.
   */
  onItemChange?: (item: T, index: number) => void;

  /** Unique key for each picked item. */
  key?: string | number;

  /** Aria-label for the picked item remove button. */
  removeButtonAriaLabel?: string;
}

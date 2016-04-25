/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

export interface IPivotProps {
  /**
   * The items to display in the pivot
   */
  items: IPivotItem[];

  /**
   * The index of the pivot item initially selected
   */
  initialSelectedIndex?: number;

  /**
   * Callback issued when the selected pivot item is changed
   */
  onChange?: (item: IPivotItem) => void;

  /**
   * Whether to use the large format of the Picker
   */
  largeformat?: boolean;
}

export interface IPivotItem {
  /**
   * Arbitrary data to associate with this item.
   */
  key: string;

  /**
   * Text to render for this item.
   */
  text: string;
}
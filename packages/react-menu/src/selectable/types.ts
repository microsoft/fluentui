import * as React from 'react';

/**
 * Props for selecatble menu items
 */
export interface MenuItemSelectableProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Follows input convention
   * https://www.w3schools.com/jsref/prop_checkbox_name.asp
   */
  name: string;

  /**
   * Follows input convention
   * https://www.w3schools.com/jsref/prop_checkbox_value.asp
   */
  value: string;
}

/**
 * State for selectable menu items
 */
export interface MenuItemSelectableState extends MenuItemSelectableProps {
  /**
   * Checked items for a value with `name`
   */
  checkedItems: string[];

  /**
   * Callback when checked items changes for a given value with `name`
   */
  onCheckedValueChange: (e: React.MouseEvent | React.KeyboardEvent, name: string, checkedItems: string[]) => void;

  /**
   * Selectable is checked
   */
  checked: boolean;
}

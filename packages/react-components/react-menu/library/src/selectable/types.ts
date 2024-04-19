import * as React from 'react';

export type SelectableHandler = (
  e: React.MouseEvent | React.KeyboardEvent,
  name: string,
  value: string,
  checked: boolean,
) => void;

/**
 * Props for selecatble menu items
 */
export type MenuItemSelectableProps = {
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
};

/**
 * State for selectable menu items
 */
export type MenuItemSelectableState = MenuItemSelectableProps & {
  /**
   * Selectable is checked
   */
  checked: boolean;
};

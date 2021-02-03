import * as React from 'react';

/** Props for selecatble menu items */
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

/** State for selectable menu items */
export interface MenuItemSelectableState extends MenuItemSelectableProps {
  /** Checked values for a give `name` */
  checkedItems: string[];

  /** Callback when checked values changes for a given `name` */
  onCheckedValuesChange: (name: string, value: string[]) => void;

  /** Selectable is checked */
  checked: boolean;
}

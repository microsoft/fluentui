import * as React from 'react';
import { ComponentProps } from '@fluentui/react-utilities';
import { MenuListContextValue } from '../../contexts/menuListContext';
import { SelectableHandler } from '../../selectable/index';

export interface MenuListProps extends ComponentProps, React.HTMLAttributes<HTMLElement> {
  /**
   * Callback when checked items change for value with a name
   *
   * @param name - the name of the value
   * @param checkedItems - the items for this value that are checked
   */
  onCheckedValueChange?: (e: React.MouseEvent | React.KeyboardEvent, name: string, checkedItems: string[]) => void;

  /**
   * Map of all checked values
   */
  checkedValues?: Record<string, string[]>;

  /**
   * Default values to be checked on mount
   */
  defaultCheckedValues?: Record<string, string[]>;

  /**
   * States that menu items can contain icons and reserve slots for item alignment
   */
  hasIcons?: boolean;

  /**
   * States that menu items can contain selectable items and reserve slots for item alignment
   */
  hasCheckmarks?: boolean;
}

export interface MenuListState extends MenuListProps {
  /**
   * Ref to the root slot
   */
  ref: React.MutableRefObject<HTMLElement>;

  /**
   * Callback to set focus on the next menu item by first character
   */
  setFocusByFirstCharacter: MenuListContextValue['setFocusByFirstCharacter'];

  /*
   * Toggles the state of a checkbox item
   */
  toggleCheckbox: SelectableHandler;

  /**
   * Selects a radio item, will de-select the currently selected ratio item
   */
  selectRadio: SelectableHandler;
}

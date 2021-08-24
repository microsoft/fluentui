import * as React from 'react';
import { ComponentProps, ComponentState, ObjectShorthandProps } from '@fluentui/react-utilities';
import { MenuListContextValue } from '../../contexts/menuListContext';
import { SelectableHandler } from '../../selectable/index';

export interface MenuListCommons {
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
  checkedValues: Record<string, string[]>;

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

export type MenuListSlots = {
  root: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
};

export interface MenuListProps extends ComponentProps<MenuListSlots>, Partial<MenuListCommons> {}

export interface MenuListState extends ComponentState<MenuListSlots>, MenuListCommons {
  /**
   * Callback to set focus on the next menu item by first character
   */
  setFocusByFirstCharacter: NonNullable<MenuListContextValue['setFocusByFirstCharacter']>;

  /*
   * Toggles the state of a checkbox item
   */
  toggleCheckbox: SelectableHandler;

  /**
   * Selects a radio item, will de-select the currently selected ratio item
   */
  selectRadio: SelectableHandler;
}

export interface MenuListContextValues {
  menuList: MenuListContextValue;
}

export interface UninitializedMenuListState
  extends Omit<MenuListState, 'setFocusByFirstCharacter' | 'toggleCheckbox' | 'selectRadio' | 'checkedValues'>,
    Partial<Pick<MenuListState, 'checkedValues'>> {}

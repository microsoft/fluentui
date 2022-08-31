import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { MenuListContextValue } from '../../contexts/menuListContext';
import type { SelectableHandler } from '../../selectable/index';

export type MenuCheckedValueChangeEvent = React.MouseEvent | React.KeyboardEvent;

export type MenuCheckedValueChangeData = {
  /** The items for this value that are checked */
  checkedItems: string[];
  /** The name of the value */
  name: string;
};

export type MenuListSlots = {
  root: Slot<'div'>;
};

export type MenuListProps = ComponentProps<MenuListSlots> & {
  /**
   * Map of all checked values
   */
  checkedValues?: Record<string, string[]>;

  /**
   * Default values to be checked on mount
   */
  defaultCheckedValues?: Record<string, string[]>;

  /**
   * States that menu items can contain selectable items and reserve slots for item alignment
   */
  hasCheckmarks?: boolean;

  /**
   * States that menu items can contain icons and reserve slots for item alignment
   */
  hasIcons?: boolean;

  /**
   * Callback when checked items change for value with a name
   *
   * @param event - React's original SyntheticEvent
   * @param data - A data object with relevant information
   */
  onCheckedValueChange?: (e: MenuCheckedValueChangeEvent, data: MenuCheckedValueChangeData) => void;
};

export type MenuListState = ComponentState<MenuListSlots> &
  Pick<MenuListProps, 'defaultCheckedValues' | 'onCheckedValueChange'> &
  Required<Pick<MenuListProps, 'checkedValues' | 'hasCheckmarks' | 'hasIcons'>> & {
    /**
     * Selects a radio item, will de-select the currently selected ratio item
     */
    selectRadio: SelectableHandler;

    /**
     * Callback to set focus on the next menu item by first character
     */
    setFocusByFirstCharacter: NonNullable<MenuListContextValue['setFocusByFirstCharacter']>;

    /*
     * Toggles the state of a checkbox item
     */
    toggleCheckbox: SelectableHandler;
  };

export type MenuListContextValues = {
  menuList: MenuListContextValue;
};

export type UninitializedMenuListState = Omit<
  MenuListState,
  'checkedValues' | 'selectRadio' | 'setFocusByFirstCharacter' | 'toggleCheckbox'
> &
  Partial<Pick<MenuListState, 'checkedValues'>>;

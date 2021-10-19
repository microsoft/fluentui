import * as React from 'react';
import { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';
import { MenuListContextValue } from '../../contexts/menuListContext';
import { SelectableHandler } from '../../selectable/index';

export type MenuListCommons = {
  /**
   * Callback when checked items change for value with a name
   *
   * @param event - React's original SyntheticEvent
   * @param data - A data object with relevant information
   */
  onCheckedValueChange?: (
    e: React.MouseEvent | React.KeyboardEvent,
    data: {
      /** The name of the value */
      name: string;
      /** The items for this value that are checked */
      checkedItems: string[];
    },
  ) => void;

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
};

export type MenuListSlots = {
  root: IntrinsicShorthandProps<'div'>;
};

export type MenuListProps = ComponentProps<MenuListSlots> & Partial<MenuListCommons>;

export type MenuListState = ComponentState<MenuListSlots> &
  MenuListCommons & {
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
  };

export type MenuListContextValues = {
  menuList: MenuListContextValue;
};

export type UninitializedMenuListState = Omit<
  MenuListState,
  'setFocusByFirstCharacter' | 'toggleCheckbox' | 'selectRadio' | 'checkedValues'
> &
  Partial<Pick<MenuListState, 'checkedValues'>>;

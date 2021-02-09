import * as React from 'react';
import { ComponentProps, ObjectShorthandProps, ShorthandProps } from '@fluentui/react-utils';
import { MenuItemSelectableProps, MenuItemSelectableState } from '../../selectable';
import { MenuItemProps, MenuItemState } from '../MenuItem/MenuItem.types';

export interface MenuItemCheckboxProps
  extends ComponentProps,
    React.HTMLAttributes<HTMLElement>,
    MenuItemProps,
    MenuItemSelectableProps {
  /**
   * Icon slot rendered before children content
   */
  icon?: ShorthandProps;

  /**
   * Slot for the checkmark indicator
   */
  checkmark?: ShorthandProps;
}

export interface MenuItemCheckboxState extends MenuItemCheckboxProps, MenuItemState, MenuItemSelectableState {
  ref: React.MutableRefObject<HTMLElement>;

  /**
   * Icon slot rendered before children content
   */
  icon?: ObjectShorthandProps<HTMLElement>;

  /**
   * Slot for the checkmark indicator
   */
  checkmark?: ObjectShorthandProps<HTMLElement>;
}

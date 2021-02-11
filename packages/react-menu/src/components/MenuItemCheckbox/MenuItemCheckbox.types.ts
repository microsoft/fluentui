import * as React from 'react';
import { ComponentProps, ObjectShorthandProps, ShorthandProps } from '@fluentui/react-utils';
import { MenuItemSelectableProps, MenuItemSelectableState } from '../../selectable/index';
import { MenuItemProps, MenuItemState } from '../MenuItem/MenuItem.types';

/**
 * {@docCategory MenuItemCheckbox}
 */
export interface MenuItemCheckboxProps
  extends ComponentProps,
    React.HTMLAttributes<HTMLElement>,
    MenuItemProps,
    MenuItemSelectableProps {
  /**
   * Icon slot rendered before children content
   */
  icon?: ShorthandProps<HTMLElement>;

  /**
   * Slot for the checkmark indicator
   */
  checkmark?: ShorthandProps<HTMLElement>;
}

/**
 * {@docCategory MenuItemCheckbox}
 */
export interface MenuItemCheckboxState extends MenuItemCheckboxProps, MenuItemState, MenuItemSelectableState {
  ref: React.MutableRefObject<HTMLElement>;

  /**
   * Icon slot rendered before children content
   */
  icon?: ObjectShorthandProps<HTMLElement>;

  /**
   * Slot for the checkmark indicator
   */
  checkmark: ObjectShorthandProps<HTMLElement>;
}

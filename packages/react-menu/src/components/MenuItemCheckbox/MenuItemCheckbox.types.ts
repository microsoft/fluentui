import * as React from 'react';
import { ComponentPropsCompat, ObjectShorthandPropsCompat, ShorthandPropsCompat } from '@fluentui/react-utilities';
import { MenuItemSelectableProps, MenuItemSelectableState } from '../../selectable/index';
import { MenuItemProps, MenuItemState } from '../MenuItem/MenuItem.types';

/**
 * {@docCategory MenuItemCheckbox}
 */
export interface MenuItemCheckboxProps
  extends ComponentPropsCompat,
    React.HTMLAttributes<HTMLElement>,
    MenuItemProps,
    MenuItemSelectableProps {
  /**
   * Slot for the checkmark indicator
   */
  checkmark?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;
}

/**
 * {@docCategory MenuItemCheckbox}
 */
export interface MenuItemCheckboxState extends MenuItemState, MenuItemSelectableState {
  ref: React.MutableRefObject<HTMLElement>;

  /**
   * Slot for the checkmark indicator
   */
  checkmark: ObjectShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;
}

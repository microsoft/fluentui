import * as React from 'react';
import { ComponentProps, ObjectShorthandProps, ShorthandProps } from '@fluentui/react-utilities';
import { MenuItemSelectableProps, MenuItemSelectableState } from '../../selectable/index';
import { MenuItemProps } from '../MenuItem/MenuItem.types';

/**
 * {@docCategory MenuItemCheckbox}
 */
export interface MenuItemCheckboxProps
  extends ComponentProps,
    React.HTMLAttributes<HTMLElement>,
    MenuItemProps,
    MenuItemSelectableProps {
  /**
   * Slot for the checkmark indicator
   */
  checkmark?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;
}

/**
 * {@docCategory MenuItemCheckbox}
 */
export interface MenuItemCheckboxState extends MenuItemCheckboxProps, MenuItemSelectableState {
  ref: React.MutableRefObject<HTMLElement>;

  /**
   * Slot for the checkmark indicator
   */
  checkmark: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>>;
}

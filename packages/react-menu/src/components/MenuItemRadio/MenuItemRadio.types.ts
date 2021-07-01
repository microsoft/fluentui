import * as React from 'react';
import { ComponentPropsCompat, ObjectShorthandPropsCompat, ShorthandPropsCompat } from '@fluentui/react-utilities';
import { MenuItemSelectableProps, MenuItemSelectableState } from '../../selectable/index';
import { MenuItemProps, MenuItemState } from '../MenuItem/MenuItem.types';

/**
 * {@docCategory MenuItemRadio}
 */
export interface MenuItemRadioProps
  extends ComponentPropsCompat,
    React.HTMLAttributes<HTMLElement>,
    MenuItemProps,
    MenuItemSelectableProps {
  checkmark?: ShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;
}

/**
 * {@docCategory MenuItemRadio}
 */
export interface MenuItemRadioState extends MenuItemState, MenuItemSelectableState {
  ref: React.MutableRefObject<HTMLElement>;
  /**
   * Slot for the checkmark indicator
   */
  checkmark: ObjectShorthandPropsCompat<React.HTMLAttributes<HTMLElement>>;
}

import * as React from 'react';
import { ComponentProps, ObjectShorthandProps, ShorthandProps } from '@fluentui/react-utilities';
import { MenuItemSelectableProps, MenuItemSelectableState } from '../../selectable/index';
import { MenuItemProps, MenuItemState } from '../MenuItem/MenuItem.types';

/**
 * {@docCategory MenuItemRadio}
 */
export interface MenuItemRadioProps
  extends ComponentProps,
    React.HTMLAttributes<HTMLElement>,
    MenuItemProps,
    MenuItemSelectableProps {
  checkmark?: ShorthandProps<React.HTMLAttributes<HTMLElement>>;
}

/**
 * {@docCategory MenuItemRadio}
 */
export interface MenuItemRadioState extends MenuItemState, MenuItemSelectableState {
  ref: React.MutableRefObject<HTMLElement>;
  /**
   * Slot for the checkmark indicator
   */
  checkmark: ObjectShorthandProps<React.HTMLAttributes<HTMLElement>>;
}

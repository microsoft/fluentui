import * as React from 'react';
import { ComponentProps, ShorthandProps } from '@fluentui/react-utils';
import { MenuItemSelectableProps, MenuItemSelectableState } from '../selectable/types';
import { MenuItemProps } from '../MenuItem/MenuItem.types';

export interface MenuItemCheckboxProps
  extends ComponentProps,
    React.HTMLAttributes<HTMLElement>,
    MenuItemProps,
    MenuItemSelectableProps {
  checkmark?: ShorthandProps;
}

export interface MenuItemCheckboxState extends MenuItemCheckboxProps, MenuItemSelectableState {}

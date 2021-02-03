import * as React from 'react';
import { ComponentProps, ShorthandProps } from '@fluentui/react-utils';
import { MenuItemSelectableProps, MenuItemSelectableState } from '../selectable/types';

export interface MenuItemCheckboxProps
  extends ComponentProps,
    React.HTMLAttributes<HTMLElement>,
    MenuItemSelectableProps {
  icon?: ShorthandProps;

  checkmark?: ShorthandProps;
}

export interface MenuItemCheckboxState extends MenuItemCheckboxProps, MenuItemSelectableState {
  ref?: React.Ref<HTMLDivElement>;
}

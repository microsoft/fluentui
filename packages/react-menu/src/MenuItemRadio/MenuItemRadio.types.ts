import * as React from 'react';
import { ComponentProps, ShorthandProps } from '@fluentui/react-utils';
import { MenuItemSelectableProps, MenuItemSelectableState } from '../selectable/types';

export interface MenuItemRadioProps extends ComponentProps, React.HTMLAttributes<HTMLElement>, MenuItemSelectableProps {
  icon?: ShorthandProps;

  checkmark?: ShorthandProps;
}

export interface MenuItemRadioState extends MenuItemRadioProps, MenuItemSelectableState {
  ref?: React.Ref<HTMLDivElement>;
}

'use client';

import * as React from 'react';
import { useMenuItem as useMenuItemBase } from '@fluentui/react-headless-components-preview/menu';
import type { MenuItemProps, MenuItemState } from './MenuItem.types';

const defaultIcon = (name: string): React.ReactElement => React.createElement('span', { [`data-${name}`]: '' });

export const useMenuItem = (props: MenuItemProps, ref: Parameters<typeof useMenuItemBase>[1]): MenuItemState => {
  const state = useMenuItemBase(props, ref);

  return {
    ...state,
    submenuIndicator: state.submenuIndicator && {
      ...state.submenuIndicator,
      children: state.submenuIndicator.children ?? defaultIcon('default-submenu-indicator'),
    },
  };
};

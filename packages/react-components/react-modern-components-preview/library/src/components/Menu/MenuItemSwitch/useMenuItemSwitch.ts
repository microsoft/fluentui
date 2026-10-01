'use client';

import * as React from 'react';
import { useMenuItemSwitch as useMenuItemSwitchBase } from '@fluentui/react-headless-components-preview/menu';
import type { MenuItemSwitchProps, MenuItemSwitchState } from './MenuItemSwitch.types';

const defaultIcon = (name: string): React.ReactElement => React.createElement('span', { [`data-${name}`]: '' });

export const useMenuItemSwitch = (
  props: MenuItemSwitchProps,
  ref: Parameters<typeof useMenuItemSwitchBase>[1],
): MenuItemSwitchState => {
  const state = useMenuItemSwitchBase(props, ref);

  return {
    ...state,
    switchIndicator: state.switchIndicator && {
      ...state.switchIndicator,
      children: state.switchIndicator.children ?? defaultIcon('default-switch-thumb'),
    },
  };
};

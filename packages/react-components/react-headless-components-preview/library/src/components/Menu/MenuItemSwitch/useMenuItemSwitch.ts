'use client';

import type * as React from 'react';
import { useMenuItemSwitchBase_unstable } from '@fluentui/react-menu';
import { toDataAttributeValue } from '../../../utils';
import type { MenuItemSwitchProps, MenuItemSwitchState } from './MenuItemSwitch.types';

export const useMenuItemSwitch = (props: MenuItemSwitchProps, ref: React.Ref<HTMLDivElement>): MenuItemSwitchState => {
  const state: MenuItemSwitchState = useMenuItemSwitchBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled'] = toDataAttributeValue(state.disabled);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-checked'] = toDataAttributeValue(state.checked);

  return state;
};

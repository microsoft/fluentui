import * as React from 'react';
import { getSlots } from '@fluentui/react-utils';
import { MenuListState } from './MenuList.types';

/**
 * Define the render function. Given the state of a button, renders it.
 */
export const renderMenuList = (state: MenuListState) => {
  const { slots, slotProps } = getSlots(state);

  return <slots.root {...slotProps.root}>{state.children}</slots.root>;
};

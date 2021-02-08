import * as React from 'react';
import { getSlots } from '@fluentui/react-utils';
import { MenuListState } from './MenuList.types';

/**
 * Function that renders the final JSX of the component
 * @param state Component state
 */
export const renderMenuList = (state: MenuListState) => {
  const { slots, slotProps } = getSlots(state);

  return <slots.root {...slotProps.root}>{state.children}</slots.root>;
};

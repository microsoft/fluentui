import * as React from 'react';
import { getSlots } from '@fluentui/react-utils';
import { MenuGroupDividerState } from './MenuGroupDivider.types';

/**
 * Define the render function. Given the state of a button, renders it.
 */
export const renderMenuGroupDivider = (state: MenuGroupDividerState) => {
  const { slots, slotProps } = getSlots(state);

  return <slots.root {...slotProps.root}>{state.children}</slots.root>;
};

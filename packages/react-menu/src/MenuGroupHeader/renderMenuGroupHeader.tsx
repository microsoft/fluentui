import * as React from 'react';
import { getSlots } from '@fluentui/react-utils';
import { MenuGroupHeaderState } from './MenuGroupHeader.types';

/** Function that renders the final JSX of the component  */
export const renderMenuGroupHeader = (state: MenuGroupHeaderState) => {
  const { slots, slotProps } = getSlots(state);

  return <slots.root {...slotProps.root}>{state.children}</slots.root>;
};

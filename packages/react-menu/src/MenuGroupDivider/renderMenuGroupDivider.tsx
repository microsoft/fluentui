import * as React from 'react';
import { getSlots } from '@fluentui/react-utils';
import { MenuGroupDividerState } from './MenuGroupDivider.types';

/** Function that renders the final JSX of the component  */
export const renderMenuGroupDivider = (state: MenuGroupDividerState) => {
  const { slots, slotProps } = getSlots(state);

  return <slots.root {...slotProps.root}>{state.children}</slots.root>;
};

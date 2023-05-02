import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DrawerHeaderState, DrawerHeaderSlots } from './DrawerHeader.types';

/**
 * Render the final JSX of DrawerHeader
 */
export const renderDrawerHeader_unstable = (state: DrawerHeaderState) => {
  const { slots, slotProps } = getSlots<DrawerHeaderSlots>(state);
  const hasAnySlots = slots.navigation || slots.header;

  return (
    <slots.root {...slotProps.root}>
      {slots.navigation && <slots.navigation {...slotProps.navigation} />}
      {slots.header && <slots.header {...slotProps.header} />}
      {hasAnySlots && state.root.children ? <div {...state.content}>{state.root.children}</div> : state.root.children}
    </slots.root>
  );
};

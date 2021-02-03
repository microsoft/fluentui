import * as React from 'react';
import { getSlots } from '@fluentui/react-utils';
import { MenuGroupState } from './MenuGroup.types';
import { MenuGroupContextProvider } from '../menuGroupContext';

/** Function that renders the final JSX of the component  */
export const renderMenuGroup = (state: MenuGroupState) => {
  const { slots, slotProps } = getSlots(state);

  return (
    <MenuGroupContextProvider value={{ headerId: state.headerId }}>
      <slots.root {...slotProps.root}>{state.children}</slots.root>
    </MenuGroupContextProvider>
  );
};

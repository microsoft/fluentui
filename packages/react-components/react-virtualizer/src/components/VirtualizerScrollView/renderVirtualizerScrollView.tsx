import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { VirtualizerScrollViewSlots, VirtualizerScrollViewState } from './VirtualizerScrollView.types';

export const renderVirtualizerScrollView_unstable = (state: VirtualizerScrollViewState) => {
  const { slots, slotProps } = getSlots<VirtualizerScrollViewSlots>(state);

  return (
    <slots.container {...slotProps.container}>
      {/* The 'before' bookend to hold items in place and detect scroll previous */}
      <slots.beforeContainer {...slotProps.beforeContainer}>
        <slots.before {...slotProps.before} />
      </slots.beforeContainer>
      {/* The reduced list of non-virtualized children to be rendered */}
      {state.virtualizedChildren}
      {/* The 'after' bookend to hold items in place and detect scroll next */}
      <slots.afterContainer {...slotProps.afterContainer}>
        <slots.after {...slotProps.after} />
      </slots.afterContainer>
    </slots.container>
  );
};

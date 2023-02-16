import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { VirtualizerSlots, VirtualizerState } from './Virtualizer.types';

export const renderVirtualizer_unstable = (state: VirtualizerState) => {
  const { slots, slotProps } = getSlots<VirtualizerSlots>(state);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

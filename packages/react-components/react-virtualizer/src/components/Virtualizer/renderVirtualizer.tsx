/** @jsxRuntime classic */
/** @jsx createElement */

import * as React from 'react';
import type { VirtualizerSlots, VirtualizerState } from './Virtualizer.types';
import type { ReactNode } from 'react';

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';

export const renderVirtualizer_unstable = (state: VirtualizerState) => {
  const { slots, slotProps } = getSlotsNext<VirtualizerSlots>(state);

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

export const renderVirtualizerChildPlaceholder = (child: ReactNode, index: number) => {
  return (
    <React.Suspense key={`fui-virtualizer-placeholder-${index}`} fallback={null}>
      {child}
    </React.Suspense>
  );
};

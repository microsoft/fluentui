/** @jsxRuntime classic */
/** @jsx createElement */

import * as React from 'react';
import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import { VirtualizerSlots, VirtualizerState } from './Virtualizer.types';
import { ReactNode } from 'react';

export const renderVirtualizer_unstable = (state: VirtualizerState) => {
  assertSlots<VirtualizerSlots>(state);

  return (
    <React.Fragment>
      {/* The 'before' bookend to hold items in place and detect scroll previous */}
      <state.beforeContainer>
        <state.before />
      </state.beforeContainer>
      {/* The reduced list of non-virtualized children to be rendered */}
      {state.virtualizedChildren}
      {/* The 'after' bookend to hold items in place and detect scroll next */}
      <state.afterContainer>
        <state.after />
      </state.afterContainer>
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

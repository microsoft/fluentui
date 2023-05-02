import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import {
  VirtualizerScrollViewDynamicSlots,
  VirtualizerScrollViewDynamicState,
} from './VirtualizerScrollViewDynamic.types';
import { VirtualizerContextProvider } from '../../Utilities';
import { renderVirtualizer_unstable } from '../Virtualizer/renderVirtualizer';

export const renderVirtualizerScrollViewDynamic_unstable = (state: VirtualizerScrollViewDynamicState) => {
  const { slots, slotProps } = getSlots<VirtualizerScrollViewDynamicSlots>(state);

  return (
    <VirtualizerContextProvider value={state.contextValues}>
      <slots.container {...slotProps.container}>{renderVirtualizer_unstable(state)}</slots.container>
    </VirtualizerContextProvider>
  );
};

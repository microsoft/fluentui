import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { VirtualizerScrollViewSlots, VirtualizerScrollViewState } from './VirtualizerScrollView.types';
import { renderVirtualizer_unstable } from '../Virtualizer/renderVirtualizer';

export const renderVirtualizerScrollView_unstable = (state: VirtualizerScrollViewState) => {
  const { slots, slotProps } = getSlots<VirtualizerScrollViewSlots>(state);

  return <slots.container {...slotProps.container}>{renderVirtualizer_unstable(state)}</slots.container>;
};

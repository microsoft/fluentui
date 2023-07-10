/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import {
  VirtualizerScrollViewDynamicSlots,
  VirtualizerScrollViewDynamicState,
} from './VirtualizerScrollViewDynamic.types';
import { renderVirtualizer_unstable } from '../Virtualizer/renderVirtualizer';

export const renderVirtualizerScrollViewDynamic_unstable = (state: VirtualizerScrollViewDynamicState) => {
  const { slots, slotProps } = getSlotsNext<VirtualizerScrollViewDynamicSlots>(state);
  return <slots.container {...slotProps.container}>{renderVirtualizer_unstable(state)}</slots.container>;
};

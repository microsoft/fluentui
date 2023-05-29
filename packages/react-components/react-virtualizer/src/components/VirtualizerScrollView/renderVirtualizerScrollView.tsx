/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { assertSlots } from '@fluentui/react-utilities';
import { VirtualizerScrollViewSlots, VirtualizerScrollViewState } from './VirtualizerScrollView.types';
import { renderVirtualizer_unstable } from '../Virtualizer/renderVirtualizer';

export const renderVirtualizerScrollView_unstable = (state: VirtualizerScrollViewState) => {
  assertSlots<VirtualizerScrollViewSlots>(state);

  return <state.container>{renderVirtualizer_unstable(state)}</state.container>;
};

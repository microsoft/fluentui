/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import type { VirtualizerScrollViewSlots, VirtualizerScrollViewState } from './VirtualizerScrollView.types';

import { assertSlots } from '@fluentui/react-utilities';
import { renderVirtualizer_unstable } from '../Virtualizer/renderVirtualizer';

/**
 * @deprecated migrated to \@fluentui\-contrib/react\-virtualizer for stable release.
 */
export const renderVirtualizerScrollView_unstable = (state: VirtualizerScrollViewState) => {
  assertSlots<VirtualizerScrollViewSlots>(state);

  return <state.container>{renderVirtualizer_unstable(state)}</state.container>;
};

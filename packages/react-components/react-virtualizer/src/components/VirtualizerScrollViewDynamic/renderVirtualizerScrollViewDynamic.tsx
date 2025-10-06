/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import {
  VirtualizerScrollViewDynamicSlots,
  VirtualizerScrollViewDynamicState,
} from './VirtualizerScrollViewDynamic.types';
import { renderVirtualizer_unstable } from '../Virtualizer/renderVirtualizer';

/**
 * @deprecated migrated to \@fluentui\-contrib/react\-virtualizer for stable release.
 */
export const renderVirtualizerScrollViewDynamic_unstable = (state: VirtualizerScrollViewDynamicState) => {
  assertSlots<VirtualizerScrollViewDynamicSlots>(state);
  return <state.container>{renderVirtualizer_unstable(state)}</state.container>;
};

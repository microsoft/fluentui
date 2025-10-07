/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import type * as React from 'react';
import { assertSlots } from '@fluentui/react-utilities';
import {
  VirtualizerScrollViewDynamicSlots,
  VirtualizerScrollViewDynamicState,
} from './VirtualizerScrollViewDynamic.types';
import { renderVirtualizer_unstable } from '../Virtualizer/renderVirtualizer';

/**
 * @deprecated migrated to \@fluentui\-contrib/react\-virtualizer for stable release.
 */
export const renderVirtualizerScrollViewDynamic_unstable = (
  state: VirtualizerScrollViewDynamicState,
): React.ReactElement => {
  assertSlots<VirtualizerScrollViewDynamicSlots>(state);
  return <state.container>{renderVirtualizer_unstable(state)}</state.container>;
};

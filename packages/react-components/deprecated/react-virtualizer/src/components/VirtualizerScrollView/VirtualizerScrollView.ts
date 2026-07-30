'use client';

import type { VirtualizerScrollViewProps } from './VirtualizerScrollView.types';
import { useVirtualizerScrollView_unstable } from './useVirtualizerScrollView';
import { renderVirtualizerScrollView_unstable } from './renderVirtualizerScrollView';
import { useVirtualizerScrollViewStyles_unstable } from './useVirtualizerScrollViewStyles.styles';
import type * as React from 'react';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * Virtualizer ScrollView
 * @deprecated migrated to \@fluentui\-contrib/react\-virtualizer for stable release.
 */
export const VirtualizerScrollView: React.FC<VirtualizerScrollViewProps> = (props: VirtualizerScrollViewProps) => {
  let state = useVirtualizerScrollView_unstable(props);

  state = useVirtualizerScrollViewStyles_unstable(state);
  state = useCustomStyleHook_unstable('useVirtualizerScrollViewStyles_unstable')(state);

  return renderVirtualizerScrollView_unstable(state);
};

VirtualizerScrollView.displayName = 'VirtualizerScrollView';

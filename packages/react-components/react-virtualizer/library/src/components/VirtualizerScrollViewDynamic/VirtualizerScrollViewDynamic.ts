import type { VirtualizerScrollViewDynamicProps } from './VirtualizerScrollViewDynamic.types';
import { useVirtualizerScrollViewDynamic_unstable } from './useVirtualizerScrollViewDynamic';
import { renderVirtualizerScrollViewDynamic_unstable } from './renderVirtualizerScrollViewDynamic';
import { useVirtualizerScrollViewDynamicStyles_unstable } from './useVirtualizerScrollViewDynamicStyles.styles';
import * as React from 'react';
import type { VirtualizerContextProps } from '../../Utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * Virtualizer ScrollView
 * @deprecated migrated to \@fluentui\-contrib/react\-virtualizer for stable release.
 */
export const VirtualizerScrollViewDynamic: React.FC<VirtualizerScrollViewDynamicProps> = (
  props: VirtualizerScrollViewDynamicProps,
  context: React.Context<VirtualizerContextProps>,
) => {
  const state = useVirtualizerScrollViewDynamic_unstable(props);

  useVirtualizerScrollViewDynamicStyles_unstable(state);
  useCustomStyleHook_unstable('useVirtualizerScrollViewDynamicStyles_unstable')(state);

  return renderVirtualizerScrollViewDynamic_unstable(state);
};

VirtualizerScrollViewDynamic.displayName = 'VirtualizerScrollViewDynamic';

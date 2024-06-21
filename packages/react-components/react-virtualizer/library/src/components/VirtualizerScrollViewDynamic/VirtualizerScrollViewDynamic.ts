import type { VirtualizerScrollViewDynamicProps } from './VirtualizerScrollViewDynamic.types';
import { useVirtualizerScrollViewDynamic_unstable } from './useVirtualizerScrollViewDynamic';
import { renderVirtualizerScrollViewDynamic_unstable } from './renderVirtualizerScrollViewDynamic';
import { useVirtualizerScrollViewDynamicStyles_unstable } from './useVirtualizerScrollViewDynamicStyles.styles';
import * as React from 'react';
import type { VirtualizerContextProps } from '../../Utilities';

/**
 * Virtualizer ScrollView
 */

export const VirtualizerScrollViewDynamic: React.FC<VirtualizerScrollViewDynamicProps> = (
  props: VirtualizerScrollViewDynamicProps,
  context: React.Context<VirtualizerContextProps>,
) => {
  const state = useVirtualizerScrollViewDynamic_unstable(props);

  useVirtualizerScrollViewDynamicStyles_unstable(state);

  return renderVirtualizerScrollViewDynamic_unstable(state);
};

VirtualizerScrollViewDynamic.displayName = 'VirtualizerScrollViewDynamic';

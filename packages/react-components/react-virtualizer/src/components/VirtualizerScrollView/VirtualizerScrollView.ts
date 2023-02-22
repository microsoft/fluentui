import { VirtualizerScrollViewProps } from './VirtualizerScrollView.types';
import { useVirtualizerScrollView_unstable } from './useVirtualizerScrollView';
import { renderVirtualizerScrollView_unstable } from './renderVirtualizerScrollView';
import { useVirtualizerScrollViewStyles_unstable } from './useVirtualizerScrollViewStyles';
import { useStaticVirtualizerMeasure } from '../../Hooks';
import * as React from 'react';

/**
 * Virtualizer ScrollView
 */

export const VirtualizerScrollView: React.FC<VirtualizerScrollViewProps> = (props: VirtualizerScrollViewProps) => {
  const scrollRef = React.useRef<HTMLElement | null>(null);
  const { virtualizerLength, bufferItems, bufferSize } = useStaticVirtualizerMeasure(
    props.itemSize,
    scrollRef.current ?? null,
    props.axis ?? 'vertical',
  );

  const state = useVirtualizerScrollView_unstable(
    {
      ...props,
      bufferItems,
      bufferSize,
      scrollViewRef: scrollRef,
    },
    virtualizerLength,
  );

  useVirtualizerScrollViewStyles_unstable(state);

  console.log('Re-rendering: ', virtualizerLength);
  return renderVirtualizerScrollView_unstable(state);
};

VirtualizerScrollView.displayName = 'VirtualizerScrollView';

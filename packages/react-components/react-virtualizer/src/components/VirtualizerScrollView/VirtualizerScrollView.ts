import { VirtualizerScrollViewProps } from './VirtualizerScrollView.types';
import { useVirtualizerScrollView_unstable } from './useVirtualizerScrollView';
import { renderVirtualizerScrollView_unstable } from './renderVirtualizerScrollView';
import { useVirtualizerScrollViewStyles_unstable } from './useVirtualizerScrollViewStyles';
import { useStaticVirtualizerMeasure } from '../../Hooks';
import * as React from 'react';
import { ForwardRefComponent, useMergedRefs } from '@fluentui/react-utilities';

/**
 * Virtualizer ScrollView
 */

export const VirtualizerScrollView: ForwardRefComponent<VirtualizerScrollViewProps> = React.forwardRef((props, ref) => {
  const scrollViewRef = React.useRef<HTMLElement | null>(null);
  const { virtualizerLength, bufferItems, bufferSize } = useStaticVirtualizerMeasure(
    props.itemSize,
    scrollViewRef.current,
    props.axis ?? 'vertical',
  );

  const state = useVirtualizerScrollView_unstable(
    {
      ...props,
      virtualizerLength,
      bufferItems,
      bufferSize,
    },
    useMergedRefs(ref, scrollViewRef),
  );

  useVirtualizerScrollViewStyles_unstable(state);

  return renderVirtualizerScrollView_unstable(state);
});

VirtualizerScrollView.displayName = 'VirtualizerScrollView';

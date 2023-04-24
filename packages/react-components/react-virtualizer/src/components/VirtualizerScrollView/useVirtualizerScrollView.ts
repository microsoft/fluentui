import * as React from 'react';
import { resolveShorthand, useMergedRefs } from '@fluentui/react-utilities';
import { useVirtualizer_unstable } from '../Virtualizer/useVirtualizer';
import { VirtualizerScrollViewProps, VirtualizerScrollViewState } from './VirtualizerScrollView.types';
import { useStaticVirtualizerMeasure } from '../../Hooks';

export function useVirtualizerScrollView_unstable(props: VirtualizerScrollViewProps): VirtualizerScrollViewState {
  const { virtualizerLength, bufferItems, bufferSize, scrollRef } = useStaticVirtualizerMeasure({
    defaultItemSize: props.itemSize,
    direction: props.axis ?? 'vertical',
  });

  const iScrollRef = useMergedRefs(React.useRef<HTMLDivElement>(null), scrollRef);

  const virtualizerState = useVirtualizer_unstable({
    ...props,
    virtualizerLength,
    bufferItems,
    bufferSize,
    scrollViewRef: iScrollRef,
  });

  return {
    ...virtualizerState,
    components: {
      ...virtualizerState.components,
      container: 'div',
    },
    container: resolveShorthand(props.container, {
      required: true,
      defaultProps: {
        ref: iScrollRef as React.RefObject<HTMLDivElement>,
      },
    }),
  };
}

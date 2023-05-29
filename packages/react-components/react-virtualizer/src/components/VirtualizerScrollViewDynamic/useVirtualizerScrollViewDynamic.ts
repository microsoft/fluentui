import * as React from 'react';
import { slot, useMergedRefs } from '@fluentui/react-utilities';
import { useVirtualizer_unstable } from '../Virtualizer/useVirtualizer';
import {
  VirtualizerScrollViewDynamicProps,
  VirtualizerScrollViewDynamicState,
} from './VirtualizerScrollViewDynamic.types';
import { useDynamicVirtualizerMeasure } from '../../Hooks';
import { useVirtualizerContextState_unstable } from '../../Utilities';

export function useVirtualizerScrollViewDynamic_unstable(
  props: VirtualizerScrollViewDynamicProps,
): VirtualizerScrollViewDynamicState {
  const contextState = useVirtualizerContextState_unstable(props.virtualizerContext);

  const { virtualizerLength, bufferItems, bufferSize, scrollRef } = useDynamicVirtualizerMeasure({
    defaultItemSize: props.itemSize,
    direction: props.axis ?? 'vertical',
    getItemSize: props.getItemSize,
    currentIndex: contextState?.contextIndex ?? 0,
    numItems: props.numItems,
  });

  const iScrollRef = useMergedRefs(React.useRef<HTMLDivElement>(null), scrollRef) as React.RefObject<HTMLDivElement>;

  const virtualizerState = useVirtualizer_unstable({
    ...props,
    virtualizerLength,
    bufferItems,
    bufferSize,
    scrollViewRef: iScrollRef,
    virtualizerContext: contextState,
  });

  return {
    ...virtualizerState,
    components: {
      ...virtualizerState.components,
      container: 'div',
    },
    container: slot(props.container, {
      required: true,
      defaultProps: {
        ref: iScrollRef,
      },
      elementType: 'div',
    }),
  };
}

import * as React from 'react';
import { resolveShorthand, useMergedRefs } from '@fluentui/react-utilities';
import { useVirtualizer_unstable } from '../Virtualizer/useVirtualizer';
import type { VirtualizerScrollViewProps, VirtualizerScrollViewState } from './VirtualizerScrollView.types';
import { useStaticVirtualizerMeasure } from '../../Hooks';
import { useImperativeHandle } from 'react';
import { scrollToItemStatic } from '../../Utilities';
import type { VirtualizerDataRef } from '../Virtualizer/Virtualizer.types';

export function useVirtualizerScrollView_unstable(props: VirtualizerScrollViewProps): VirtualizerScrollViewState {
  const { imperativeRef, itemSize, numItems, axis = 'vertical', reversed } = props;
  const { virtualizerLength, bufferItems, bufferSize, scrollRef } = useStaticVirtualizerMeasure({
    defaultItemSize: props.itemSize,
    direction: props.axis ?? 'vertical',
  });

  const scrollViewRef = useMergedRefs(React.useRef<HTMLDivElement>(null), scrollRef) as React.RefObject<HTMLDivElement>;
  const imperativeVirtualizerRef = React.useRef<VirtualizerDataRef | null>(null);
  const scrollCallbackRef = React.useRef<null | ((index: number) => void)>(null);

  useImperativeHandle(
    imperativeRef,
    () => {
      return {
        scrollTo(index: number, behavior = 'auto', callback: ((index: number) => void) | undefined) {
          scrollCallbackRef.current = callback ?? null;
          imperativeVirtualizerRef.current?.setFlaggedIndex(index);
          scrollToItemStatic({
            index,
            itemSize,
            totalItems: numItems,
            scrollViewRef,
            axis,
            reversed,
            behavior,
          });
        },
      };
    },
    [axis, scrollViewRef, itemSize, numItems, reversed],
  );

  const handleRenderedIndex = (index: number) => {
    if (scrollCallbackRef.current) {
      scrollCallbackRef.current(index);
    }
  };

  const virtualizerState = useVirtualizer_unstable({
    ...props,
    virtualizerLength,
    bufferItems,
    bufferSize,
    scrollViewRef,
    onRenderedFlaggedIndex: handleRenderedIndex,
    imperativeVirtualizerRef,
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
        ref: scrollViewRef as React.RefObject<HTMLDivElement>,
      },
    }),
  };
}

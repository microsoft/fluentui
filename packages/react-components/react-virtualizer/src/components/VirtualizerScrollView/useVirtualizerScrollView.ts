import * as React from 'react';
import { slot, useMergedRefs } from '@fluentui/react-utilities';
import { useVirtualizer_unstable } from '../Virtualizer/useVirtualizer';
import type { VirtualizerScrollViewProps, VirtualizerScrollViewState } from './VirtualizerScrollView.types';
import { useStaticVirtualizerMeasure } from '../../Hooks';
import { useImperativeHandle } from 'react';
import { scrollToItemStatic } from '../../Utilities';
import type { VirtualizerDataRef } from '../Virtualizer/Virtualizer.types';
import { useStaticVirtualizerPagination } from '../../hooks/useStaticPagination';

export function useVirtualizerScrollView_unstable(props: VirtualizerScrollViewProps): VirtualizerScrollViewState {
  const { imperativeRef, itemSize, numItems, axis = 'vertical', reversed, enablePagination = false } = props;
  const { virtualizerLength, bufferItems, bufferSize, scrollRef } = useStaticVirtualizerMeasure({
    defaultItemSize: props.itemSize,
    direction: props.axis ?? 'vertical',
  });

  // Store the virtualizer length as a ref for imperative ref access
  const virtualizerLengthRef = React.useRef<number>(virtualizerLength);
  if (virtualizerLengthRef.current !== virtualizerLength) {
    virtualizerLengthRef.current = virtualizerLength;
  }

  const paginationRef = useStaticVirtualizerPagination({ axis, itemSize }, enablePagination);
  const scrollViewRef = useMergedRefs(props.scrollViewRef, scrollRef, paginationRef) as React.RefObject<HTMLDivElement>;
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
        currentIndex: imperativeVirtualizerRef.current?.currentIndex,
        virtualizerLength: virtualizerLengthRef,
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
    container: slot.always(props.container, {
      defaultProps: {
        ref: scrollViewRef as React.RefObject<HTMLDivElement>,
      },
      elementType: 'div',
    }),
  };
}

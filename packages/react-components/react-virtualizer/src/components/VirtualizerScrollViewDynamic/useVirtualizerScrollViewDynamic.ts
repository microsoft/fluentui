import * as React from 'react';
import { resolveShorthand, useMergedRefs } from '@fluentui/react-utilities';
import { useVirtualizer_unstable } from '../Virtualizer/useVirtualizer';
import type {
  VirtualizerScrollViewDynamicProps,
  VirtualizerScrollViewDynamicState,
} from './VirtualizerScrollViewDynamic.types';
import { useDynamicVirtualizerMeasure } from '../../Hooks';
import { useVirtualizerContextState_unstable, scrollToItemDynamic } from '../../Utilities';
import type { VirtualizerDataRef } from '../Virtualizer/Virtualizer.types';
import { useImperativeHandle } from 'react';

export function useVirtualizerScrollViewDynamic_unstable(
  props: VirtualizerScrollViewDynamicProps,
): VirtualizerScrollViewDynamicState {
  const contextState = useVirtualizerContextState_unstable(props.virtualizerContext);
  const { imperativeRef, axis = 'vertical', reversed, imperativeVirtualizerRef } = props;

  const { virtualizerLength, bufferItems, bufferSize, scrollRef } = useDynamicVirtualizerMeasure({
    defaultItemSize: props.itemSize,
    direction: props.axis ?? 'vertical',
    getItemSize: props.getItemSize,
    currentIndex: contextState?.contextIndex ?? 0,
    numItems: props.numItems,
  });

  const scrollViewRef = useMergedRefs(React.useRef<HTMLDivElement>(null), scrollRef) as React.RefObject<HTMLDivElement>;
  const scrollCallbackRef = React.useRef<null | ((index: number) => void)>(null);

  const _imperativeVirtualizerRef = useMergedRefs(React.useRef<VirtualizerDataRef>(null), imperativeVirtualizerRef);

  useImperativeHandle(
    imperativeRef,
    () => {
      return {
        scrollTo(index: number, behavior = 'auto', callback: undefined | ((index: number) => void)) {
          scrollCallbackRef.current = callback ?? null;
          if (_imperativeVirtualizerRef.current) {
            const progressiveSizes = _imperativeVirtualizerRef.current.progressiveSizes.current;
            const totalSize =
              progressiveSizes && progressiveSizes?.length > 0
                ? progressiveSizes[Math.max(progressiveSizes.length - 1, 0)]
                : 0;

            _imperativeVirtualizerRef.current.setFlaggedIndex(index);
            scrollToItemDynamic({
              index,
              itemSizes: _imperativeVirtualizerRef.current?.nodeSizes,
              totalSize,
              scrollViewRef,
              axis,
              reversed,
              behavior,
            });
          }
        },
      };
    },
    [axis, scrollViewRef, reversed, _imperativeVirtualizerRef],
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
    virtualizerContext: contextState,
    imperativeVirtualizerRef: _imperativeVirtualizerRef,
    onRenderedFlaggedIndex: handleRenderedIndex,
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
        ref: scrollViewRef,
      },
    }),
  };
}

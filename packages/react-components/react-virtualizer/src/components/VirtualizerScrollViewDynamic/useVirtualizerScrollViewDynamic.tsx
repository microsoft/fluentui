import * as React from 'react';
import { slot, useMergedRefs } from '@fluentui/react-utilities';
import { useVirtualizer_unstable } from '../Virtualizer/useVirtualizer';
import type {
  VirtualizerScrollViewDynamicProps,
  VirtualizerScrollViewDynamicState,
} from './VirtualizerScrollViewDynamic.types';
import { useDynamicVirtualizerMeasure } from '../../Hooks';
import { useVirtualizerContextState_unstable, scrollToItemDynamic } from '../../Utilities';
import type { VirtualizerDataRef } from '../Virtualizer/Virtualizer.types';
import { useImperativeHandle } from 'react';
import { IndexedResizeCallbackElement, useMeasureList } from '../../hooks/useMeasureList';

export function useVirtualizerScrollViewDynamic_unstable(
  props: VirtualizerScrollViewDynamicProps,
): VirtualizerScrollViewDynamicState {
  const contextState = useVirtualizerContextState_unstable(props.virtualizerContext);
  const { imperativeRef, axis = 'vertical', reversed, imperativeVirtualizerRef } = props;

  let sizeTrackingArray = React.useRef<number[]>(new Array(props.numItems));

  const getChildSizeAuto = React.useCallback(
    (index: number) => {
      if (sizeTrackingArray.current.length <= index || sizeTrackingArray.current[index] <= 0) {
        // Default size for initial state or untracked
        return props.itemSize;
      }
      /* Required prior to our measure function
       * we return a ref that we will update post-render
       */
      return sizeTrackingArray.current[index];
    },
    [sizeTrackingArray],
  );

  const { virtualizerLength, bufferItems, bufferSize, scrollRef } = useDynamicVirtualizerMeasure({
    defaultItemSize: props.itemSize,
    direction: props.axis ?? 'vertical',
    getItemSize: props.getItemSize ?? getChildSizeAuto,
    currentIndex: contextState?.contextIndex ?? 0,
    numItems: props.numItems,
  });

  // Store the virtualizer length as a ref for imperative ref access
  const virtualizerLengthRef = React.useRef<number>(virtualizerLength);
  if (virtualizerLengthRef.current !== virtualizerLength) {
    virtualizerLengthRef.current = virtualizerLength;
  }
  const scrollViewRef = useMergedRefs(props.scrollViewRef, scrollRef) as React.RefObject<HTMLDivElement>;
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
        currentIndex: _imperativeVirtualizerRef.current?.currentIndex,
        virtualizerLength: virtualizerLengthRef,
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

  const measureObject = useMeasureList(virtualizerState.virtualizerStartIndex, virtualizerLength, props.numItems);

  if (axis == 'horizontal') {
    sizeTrackingArray = measureObject.widthArray;
  } else {
    sizeTrackingArray = measureObject.heightArray;
  }

  if (!props.getItemSize) {
    // Auto-measuring is required
    React.Children.map(virtualizerState.virtualizedChildren, (child, index) => {
      if (React.isValidElement(child)) {
        virtualizerState.virtualizedChildren[index] = (
          <child.type
            {...child.props}
            ref={(element: HTMLElement & IndexedResizeCallbackElement) => {
              if (typeof child.props.ref === 'function') {
                child.props.ref(element);
              } else if (child.props.ref) {
                child.props.ref.current = element;
              }
              measureObject.createIndexedRef(index)(element);
            }}
          />
        );
      }
    });
  }

  return {
    ...virtualizerState,
    components: {
      ...virtualizerState.components,
      container: 'div',
    },
    container: slot.always(props.container, {
      defaultProps: {
        ref: scrollViewRef,
      },
      elementType: 'div',
    }),
  };
}

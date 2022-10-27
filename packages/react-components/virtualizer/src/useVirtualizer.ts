import { useIntersectionObserver } from './useIntersectionObserver';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as React from 'react';

import type { VirtualizerProps, VirtualizerState } from './Virtualizer.types';
import { VirtualizerFlow } from './Virtualizer.types';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';

export function useVirtualizer_unstable(props: VirtualizerProps, ref: React.Ref<HTMLElement>): VirtualizerState {
  const {
    children,
    sizeOfChild,
    itemSize = 45,
    virtualizerLength = 30,
    bufferItems = Math.round(virtualizerLength / 3),
    flow = VirtualizerFlow.Vertical,
    bufferSize = 250,
    scrollViewRef,
    isReversed = false,
    onUpdateIndex,
    onCalculateIndex,
  } = props;

  // Safe access array version of children
  const childArray = useMemo(() => (Array.isArray(children) ? children : [children]), [children]);

  // We store the previous child array to detect changes pre-emptively
  const prevChildren = useRef<ReactNode[] | null>(null);

  // Tracks the initial item to start virtualizer at
  const [virtualizerStartIndex, setVirtualizerStartIndex] = useState<number>(0);

  // Store ref to before padding element
  const beforeElementRef = useRef<Element | null>(null);

  // Store ref to before padding element
  const afterElementRef = useRef<Element | null>(null);

  // We need to store an array to track previous sizes, we can use this to incrementally update changes
  const childSizes = useRef<number[]>(new Array<number>(sizeOfChild ? childArray.length : 0));

  /* We keep track of the progressive sizing/placement down the list,
  this helps us skip re-calculations unless children/size changes */
  const childProgressiveSizes = useRef<number[]>(new Array<number>(sizeOfChild ? childArray.length : 0));

  const populateSizeArrays = React.useCallback(() => {
    if (!sizeOfChild) {
      // Static sizes, never mind!
      return;
    }

    childArray.forEach((child, index) => {
      childSizes.current[index] = sizeOfChild(child, index);

      if (index === 0) {
        childProgressiveSizes.current[index] = childSizes.current[index];
      } else {
        childProgressiveSizes.current[index] = childProgressiveSizes.current[index - 1] + childSizes.current[index];
      }
    });
  }, [childArray, sizeOfChild]);

  useEffect(() => {
    // TODO: Remove? (We calc size prior to render if children change)
    populateSizeArrays();
  }, [children, childArray, childArray.length, populateSizeArrays, sizeOfChild]);

  // Observe intersections of virtualized components
  const [setIOList, _setIOInit, _observer] = useIntersectionObserver(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      /* IO initiates this function when needed,
      we don't need to iterate through the results,
      we simply need to know that an interaction has happened to efficiently update based
      on scroll position from container ref */
      let measurementPos =
        flow === VirtualizerFlow.Vertical
          ? scrollViewRef?.current?.scrollTop ?? 0
          : scrollViewRef?.current?.scrollLeft ?? 0;

      if (!scrollViewRef) {
        // We are not inside a direct parent scroll view, use bookends to chop down until we find position.
        // We do NOT use scroll position as this implies we are unbounded - (scroll start pos may not be 0)
        const latestEntry = entries.find(entry => {
          return entry.intersectionRatio > 0;
        });

        if (!latestEntry) {
          // If we don't find an intersecting area, ignore for now.
          return;
        }

        if (latestEntry.target === afterElementRef.current) {
          measurementPos = calculateTotalSize() - calculateAfter();
        } else if (latestEntry.target === beforeElementRef.current) {
          measurementPos = calculateBefore();
        }
      }

      if (isReversed) {
        // We're reversed, up is down, left is right, reverso the metric .
        const sizeVar = VirtualizerFlow.Vertical
          ? scrollViewRef?.current?.scrollHeight ?? calculateTotalSize()
          : scrollViewRef?.current?.scrollWidth ?? calculateTotalSize();

        measurementPos = Math.max(sizeVar - measurementPos, 0);
      }

      // For now lets use hardcoded size to assess current element to paginate on
      const startIndex = getIndexFromScrollPosition(measurementPos);
      let bufferedIndex = Math.max(startIndex - bufferItems, 0);

      if (onCalculateIndex) {
        // User has chance to intervene/customize
        bufferedIndex = onCalculateIndex(bufferedIndex);
      }

      const maxIndex = Math.max(childArray.length - virtualizerLength, 0);
      // Safety limits
      const newStartIndex = Math.min(Math.max(bufferedIndex, 0), maxIndex);

      if (virtualizerStartIndex !== newStartIndex) {
        // Set new index, trigger render!
        if (onUpdateIndex) {
          onUpdateIndex(newStartIndex, virtualizerStartIndex);
        }
        setVirtualizerStartIndex(newStartIndex);
      }
    },
    {
      root: scrollViewRef ? scrollViewRef?.current : null,
      rootMargin: '0px',
      threshold: 0,
    },
  );

  const getIndexFromSizeArray = (scrollPos: number): number => {
    /* TODO: We should use some kind of logN calc, cut array in half and measure etc.
     * Just simple array iteration for now to ensure rest of design works in tandem.
     */
    if (
      scrollPos === 0 ||
      childProgressiveSizes.current.length === 0 ||
      scrollPos <= childProgressiveSizes.current[0]
    ) {
      // Check start
      return 0;
    }

    if (scrollPos >= childProgressiveSizes.current[childProgressiveSizes.current.length - 1]) {
      // Check end
      return childProgressiveSizes.current.length - 1;
    }

    for (let index = 1; index < childProgressiveSizes.current.length; index++) {
      const iBefore = Math.max(index - 1, 0);
      const iAfter = Math.min(index + 1, childProgressiveSizes.current.length - 1);
      const indexValue = childProgressiveSizes.current[index];
      const afterIndexValue = childProgressiveSizes.current[iAfter];
      const beforeIndexValue = childProgressiveSizes.current[iBefore];

      if (indexValue === scrollPos || (scrollPos < afterIndexValue && scrollPos > beforeIndexValue)) {
        // We've found our index
        return index;
      }
    }

    // Failed to find - return initial index
    return 0;
  };

  const getIndexFromScrollPosition = (scrollPos: number) => {
    if (!sizeOfChild) {
      return Math.round(scrollPos / itemSize);
    }

    return getIndexFromSizeArray(scrollPos);
  };

  const calculateTotalSize = () => {
    if (!sizeOfChild) {
      return itemSize * childArray.length;
    }

    // Time for custom size calcs
    return childProgressiveSizes.current[childArray.length - 1];
  };

  const calculateBefore = () => {
    if (!sizeOfChild) {
      // The missing items from before virtualization starts height
      return virtualizerStartIndex * itemSize;
    }

    if (virtualizerStartIndex === 0) {
      return 0;
    }

    // Time for custom size calcs
    return childProgressiveSizes.current[virtualizerStartIndex - 1];
  };

  const calculateAfter = () => {
    if (!sizeOfChild) {
      // The missing items from after virtualization ends height
      const lastItemIndex = virtualizerStartIndex + virtualizerLength;
      const remainingItems = childArray.length - lastItemIndex;

      return remainingItems * itemSize;
    }

    // Time for custom size calcs
    const lastItemIndex = virtualizerStartIndex + virtualizerLength;

    return childProgressiveSizes.current[childArray.length - 1] - childProgressiveSizes.current[lastItemIndex];
  };

  const generateRows = (): ReactNode[] => {
    if (childArray.length === 0) {
      /* Nothing to virtualize */

      return [];
    }

    const end = Math.min(virtualizerStartIndex + virtualizerLength, childArray.length);

    return childArray.slice(virtualizerStartIndex, end);
  };

  /*
    We need to trigger these calculations prior to render
    so that our calculations are always up to date / accurate.
  */
  if (
    sizeOfChild &&
    prevChildren &&
    (prevChildren.current !== childArray || prevChildren.current.length !== childArray.length)
  ) {
    populateSizeArrays();
    prevChildren.current = childArray;
  }

  const setBeforeRef = (element: HTMLDivElement) => {
    if (!element || beforeElementRef.current === element) {
      return;
    }
    beforeElementRef.current = element;
    const newList = [];

    newList.push(beforeElementRef.current);

    if (afterElementRef.current) {
      newList.push(afterElementRef.current);
    }

    // Ensure we update array if before element changed
    setIOList(newList);
  };

  const setAfterRef = (element: HTMLDivElement) => {
    if (!element || afterElementRef.current === element) {
      return;
    }
    afterElementRef.current = element;
    const newList = [];

    if (beforeElementRef.current) {
      newList.push(beforeElementRef.current);
    }

    newList.push(afterElementRef.current);

    // Ensure we update array if after element changed
    setIOList(newList);
  };

  return {
    components: {
      root: 'div',
      before: 'div',
      after: 'div',
      beforeContainer: 'div',
      afterContainer: 'div',
    },
    virtualizedChildren: generateRows(),
    root: getNativeElementProps('div', {
      ...props,
      ref,
    }),
    before: resolveShorthand(props.before ?? 'div', {
      defaultProps: {
        ref: setBeforeRef,
      },
    }),
    after: resolveShorthand(props.after ?? 'div', {
      defaultProps: {
        ref: setAfterRef,
      },
    }),
    beforeContainer: resolveShorthand(props.beforeContainer ?? 'div'),
    afterContainer: resolveShorthand(props.afterContainer ?? 'div'),
    beforeBufferHeight: calculateBefore(),
    afterBufferHeight: calculateAfter(),
    totalVirtualizerHeight: calculateTotalSize(),
    virtualizerStartIndex,
    flow,
    bufferSize,
  };
}

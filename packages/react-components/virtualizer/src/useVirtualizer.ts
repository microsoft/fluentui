import { useIntersectionObserver } from './useIntersectionObserver';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as React from 'react';

import type { VirtualizerProps, VirtualizerState } from './Virtualizer.types';
import { VirtualizerFlow } from './Virtualizer.types';
import { resolveShorthand } from '@fluentui/react-utilities';

export function useVirtualizer_unstable(props: React.PropsWithChildren<VirtualizerProps>): VirtualizerState {
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

  // Tracks the initial item to start virtualizer at
  const [virtualizerStartIndex, setVirtualizerStartIndex] = useState<number>(0);

  // Store ref to before padding element
  const beforeElementRef = useRef<Element | null>(null);

  // Store ref to before padding element
  const afterElementRef = useRef<Element | null>(null);

  // We need to store an array to track dynamic sizes, we can use this to incrementally update changes
  const childSizes = useRef<number[]>(new Array<number>(sizeOfChild ? childArray.length : 0));

  /* We keep track of the progressive sizing/placement down the list,
  this helps us skip re-calculations unless children/size changes */
  const childProgressiveSizes = useRef<number[]>(new Array<number>(sizeOfChild ? childArray.length : 0));

  const populateSizeArrays = React.useCallback(() => {
    if (!sizeOfChild) {
      // Static sizes, never mind!
      return;
    }

    if (childArray.length > childSizes.current.length) {
      childSizes.current = new Array<number>(childArray.length);
    }

    if (childArray.length > childProgressiveSizes.current.length) {
      childProgressiveSizes.current = new Array<number>(childArray.length);
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

  if (
    sizeOfChild &&
    (childArray.length !== childSizes.current.length || childArray.length !== childProgressiveSizes.current.length)
  ) {
    // Dynamically sized items.
    // Child length has changed, do a full recalculation.
    // Otherwise, incremental updater will handle.
    populateSizeArrays();
  }

  // Observe intersections of virtualized components
  const [setIOList, _setIOInit, _observer] = useIntersectionObserver(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      /* Sanity check - do we even need virtualization? */
      if (virtualizerLength > childArray.length) {
        if (virtualizerStartIndex !== 0) {
          onUpdateIndex?.(0, virtualizerStartIndex);
          setVirtualizerStartIndex(0);
        }
        // No-op
        return;
      }

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
        // We do NOT use scroll position as this implies we are unbounded - (scroll start pos may not be 0 or local)
        const latestEntry =
          entries.length === 1
            ? entries[0]
            : entries.find(entry => {
                return entry.intersectionRatio > 0;
              });

        if (!latestEntry) {
          // If we don't find an intersecting area, ignore for now.
          return;
        }

        const isVertical = flow == VirtualizerFlow.Vertical;
        if (latestEntry.target === afterElementRef.current) {
          measurementPos = isReversed ? calculateAfter() : calculateTotalSize() - calculateAfter();
          if (isVertical) {
            measurementPos += Math.abs(latestEntry.boundingClientRect.top);
          } else {
            measurementPos += Math.abs(latestEntry.boundingClientRect.left);
          }
        } else if (latestEntry.target === beforeElementRef.current) {
          measurementPos = isReversed ? calculateTotalSize() - calculateBefore() : calculateBefore();
          if (isVertical) {
            measurementPos -= Math.abs(latestEntry.boundingClientRect.bottom);
          } else {
            measurementPos -= Math.abs(latestEntry.boundingClientRect.right);
          }
          measurementPos -= latestEntry.intersectionRatio * measurementPos;
        }
      }

      if (isReversed) {
        // We're reversed, up is down, left is right, reverso the metric .
        const sizeVar =
          flow === VirtualizerFlow.Vertical
            ? scrollViewRef?.current?.scrollHeight ?? calculateTotalSize()
            : scrollViewRef?.current?.scrollWidth ?? calculateTotalSize();

        measurementPos = Math.max(sizeVar - measurementPos, 0);
      }

      // For now lets use hardcoded size to assess current element to paginate on
      const startIndex = getIndexFromScrollPosition(measurementPos);
      let bufferedIndex = Math.max(startIndex - bufferItems, 0);

      if (onCalculateIndex) {
        // User has chance to intervene/customize prior to render
        // They may want to normalize this value.
        bufferedIndex = onCalculateIndex(bufferedIndex);
      }

      // Safety limits
      const maxIndex = Math.max(childArray.length - virtualizerLength, 0);
      const newStartIndex = Math.min(Math.max(bufferedIndex, 0), maxIndex);

      if (virtualizerStartIndex !== newStartIndex) {
        // Set new index, trigger render!
        onUpdateIndex?.(newStartIndex, virtualizerStartIndex);
        setVirtualizerStartIndex(newStartIndex);
        /*
          We need to ensure our dynamic size array
          calculations are always up to date prior to render.
        */
        updateCurrentItemSizes();
      }
    },
    {
      root: scrollViewRef ? scrollViewRef?.current : null,
      rootMargin: '0px',
      threshold: 0,
    },
  );

  const findIndexRecursive = (scrollPos: number, lowIndex: number, highIndex: number): number => {
    if (lowIndex > highIndex) {
      // We shouldn't get here - but no-op the index if we do.
      return virtualizerStartIndex;
    }
    const midpoint = Math.floor((lowIndex + highIndex) / 2);
    const iBefore = Math.max(midpoint - 1, 0);
    const iAfter = Math.min(midpoint + 1, childProgressiveSizes.current.length - 1);
    const indexValue = childProgressiveSizes.current[midpoint];
    const afterIndexValue = childProgressiveSizes.current[iAfter];
    const beforeIndexValue = childProgressiveSizes.current[iBefore];
    if (indexValue === scrollPos || (scrollPos <= afterIndexValue && scrollPos >= beforeIndexValue)) {
      /* We've found our index - if we are exactly matching before/after index that's ok,
      better to reduce checks if it's right on the boundary. */
      return midpoint;
    }

    if (indexValue > scrollPos) {
      return findIndexRecursive(scrollPos, lowIndex, midpoint - 1);
    } else {
      return findIndexRecursive(scrollPos, midpoint + 1, highIndex);
    }
  };

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

    return findIndexRecursive(scrollPos, 0, childProgressiveSizes.current.length - 1);
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
    const lastItemIndex = Math.min(virtualizerStartIndex + virtualizerLength, childArray.length - 1);
    if (!sizeOfChild) {
      // The missing items from after virtualization ends height
      const remainingItems = childArray.length - lastItemIndex;

      return remainingItems * itemSize;
    }

    // Time for custom size calcs

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

  const updateCurrentItemSizes = () => {
    if (!sizeOfChild) {
      // Static sizes, not required.
      return;
    }
    // We should always call our size function on index change (only for the items that will be rendered)
    // This ensures we request the latest data for incoming items in case sizing has changed.
    const endIndex = Math.max(virtualizerStartIndex + virtualizerLength, childArray.length);

    let didUpdate = false;
    for (let i = virtualizerStartIndex; i < endIndex; i++) {
      const newSize = sizeOfChild(childArray[i], i);
      if (newSize !== childSizes.current[i]) {
        childSizes.current[i] = sizeOfChild(childArray[i], i);
        didUpdate = true;
      }
    }

    if (didUpdate) {
      // Update our progressive size array
      for (let i = virtualizerStartIndex; i < childArray.length; i++) {
        const prevSize = i > 0 ? childProgressiveSizes.current[i - 1] : 0;
        childProgressiveSizes.current[i] = prevSize + childSizes.current[i];
      }
    }
  };

  // Initialize the size array before first render.
  const hasInitialized = useRef<boolean>(false);
  const initializeSizeArray = () => {
    if (hasInitialized.current === false) {
      hasInitialized.current = true;
      populateSizeArrays();
    }
  };

  // Ensure we have run through and updated the whole size list array at least once.
  initializeSizeArray();

  return {
    components: {
      before: 'div',
      after: 'div',
      beforeContainer: 'div',
      afterContainer: 'div',
    },
    virtualizedChildren: generateRows(),
    before: resolveShorthand(props.before ?? { as: 'div' }, {
      defaultProps: {
        ref: setBeforeRef,
        role: 'none',
      },
    }),
    after: resolveShorthand(props.after ?? { as: 'div' }, {
      defaultProps: {
        ref: setAfterRef,
        role: 'none',
      },
    }),
    beforeContainer: resolveShorthand(props.beforeContainer ?? { as: 'div' }, {
      defaultProps: {
        role: 'none',
      },
    }),
    afterContainer: resolveShorthand(props.afterContainer ?? { as: 'div' }, {
      defaultProps: {
        role: 'none',
      },
    }),
    beforeBufferHeight: calculateBefore(),
    afterBufferHeight: calculateAfter(),
    totalVirtualizerHeight: calculateTotalSize(),
    virtualizerStartIndex,
    flow,
    bufferSize,
    isReversed,
  };
}

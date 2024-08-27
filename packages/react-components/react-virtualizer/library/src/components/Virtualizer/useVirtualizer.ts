import type { ReactNode } from 'react';
import type { VirtualizerProps, VirtualizerState } from './Virtualizer.types';

import { useEffect, useRef, useCallback, useReducer, useImperativeHandle, useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { flushSync } from 'react-dom';
import { useVirtualizerContextState_unstable } from '../../Utilities';
import { slot, useTimeout } from '@fluentui/react-utilities';

export function useVirtualizer_unstable(props: VirtualizerProps): VirtualizerState {
  'use no memo';

  const {
    itemSize,
    numItems,
    virtualizerLength,
    children: renderChild,
    getItemSize,
    bufferItems = Math.round(virtualizerLength / 4.0),
    bufferSize = Math.floor(bufferItems / 2.0) * itemSize,
    scrollViewRef,
    axis = 'vertical',
    reversed = false,
    virtualizerContext,
    onRenderedFlaggedIndex,
    imperativeVirtualizerRef,
    containerSizeRef,
  } = props;

  /* The context is optional, it's useful for injecting additional index logic, or performing uniform state updates*/
  const _virtualizerContext = useVirtualizerContextState_unstable(virtualizerContext);

  // We use this ref as a constant source to access the virtualizer's state imperatively
  const actualIndexRef = useRef<number>(_virtualizerContext.contextIndex);
  const flaggedIndex = useRef<number | null>(null);

  const actualIndex = _virtualizerContext.contextIndex;
  // Just in case our ref gets out of date vs the context during a re-render
  if (_virtualizerContext.contextIndex != actualIndexRef.current) {
    actualIndexRef.current = _virtualizerContext.contextIndex;
  }
  const setActualIndex = (index: number) => {
    _virtualizerContext.setContextIndex(index);
    actualIndexRef.current = index;
  };

  // Store ref to before padding element
  const beforeElementRef = useRef<Element | null>(null);

  // Store ref to before padding element
  const afterElementRef = useRef<Element | null>(null);

  // We need to store an array to track dynamic sizes, we can use this to incrementally update changes
  const childSizes = useRef<number[]>(new Array<number>(getItemSize ? numItems : 0));

  /* We keep track of the progressive sizing/placement down the list,
  this helps us skip re-calculations unless children/size changes */
  const childProgressiveSizes = useRef<number[]>(new Array<number>(getItemSize ? numItems : 0));

  // The internal tracking REF for child array (updates often).
  const childArray = useRef<ReactNode[]>(new Array(virtualizerLength));

  // We want to be methodical about updating the render with child reference array
  const forceUpdate = useReducer(() => ({}), {})[1];

  const populateSizeArrays = () => {
    if (!getItemSize) {
      // Static sizes, never mind!
      return;
    }

    if (numItems !== childSizes.current.length) {
      childSizes.current = new Array<number>(numItems);
    }

    if (numItems !== childProgressiveSizes.current.length) {
      childProgressiveSizes.current = new Array<number>(numItems);
    }

    for (let index = 0; index < numItems; index++) {
      childSizes.current[index] = getItemSize(index);
      if (index === 0) {
        childProgressiveSizes.current[index] = childSizes.current[index];
      } else {
        childProgressiveSizes.current[index] = childProgressiveSizes.current[index - 1] + childSizes.current[index];
      }
    }
  };

  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [setScrollTimer, clearScrollTimer] = useTimeout();
  const scrollCounter = useRef<number>(0);

  const initializeScrollingTimer = useCallback(() => {
    /*
     * This can be considered the 'velocity' required to start 'isScrolling'
     * INIT_SCROLL_FLAG_REQ: Number of renders required to activate isScrolling
     * INIT_SCROLL_FLAG_DELAY: Amount of time (ms) before current number of renders is reset
     *  - Maybe we should let users customize these in the future.
     */
    const INIT_SCROLL_FLAG_REQ = 10;
    const INIT_SCROLL_FLAG_DELAY = 100;

    scrollCounter.current++;
    if (scrollCounter.current >= INIT_SCROLL_FLAG_REQ) {
      setIsScrolling(true);
    }
    clearScrollTimer();
    setScrollTimer(() => {
      setIsScrolling(false);
      scrollCounter.current = 0;
    }, INIT_SCROLL_FLAG_DELAY);
  }, [clearScrollTimer, setScrollTimer]);

  useEffect(() => {
    initializeScrollingTimer();
  }, [actualIndex, initializeScrollingTimer]);

  const batchUpdateNewIndex = (index: number) => {
    // Local updates
    updateChildRows(index);
    updateCurrentItemSizes(index);

    // Set before 'setActualIndex' call & re-render
    // If it changes before render, or injected via context, re-render will update ref.
    actualIndexRef.current = index;

    // State setters
    setActualIndex(index);
  };

  // Observe intersections of virtualized components
  const { setObserverList } = useIntersectionObserver(
    // TODO: exclude types from this lint rule: https://github.com/microsoft/fluentui/issues/31286
    // eslint-disable-next-line no-restricted-globals
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      /* Sanity check - do we even need virtualization? */
      if (virtualizerLength > numItems) {
        if (actualIndex !== 0) {
          batchUpdateNewIndex(0);
        }
        // No-op
        return;
      }

      // Grab latest entry that is intersecting
      const latestEntry =
        entries.length === 1
          ? entries[0]
          : entries
              .sort((entry1, entry2) => entry2.time - entry1.time)
              .find(entry => {
                return entry.intersectionRatio > 0;
              });

      if (!latestEntry) {
        // If we don't find an intersecting area, ignore for now.
        return;
      }

      const calculateOverBuffer = (): number => {
        /**
         * We avoid using the scroll ref scrollTop, it may be incorrect
         * as virtualization may exist within a scroll view with other elements
         * The benefit of using IO is that we can detect relative scrolls,
         * so any items can be placed around the virtualizer in the scroll view
         */
        let measurementPos = 0;
        if (latestEntry.target === afterElementRef.current) {
          console.log('After');
          // Get after buffers position
          measurementPos = calculateTotalSize() - calculateAfter();
          // Get exact intersection position based on overflow size (how far into IO did we scroll?)
          const overflowAmount =
            axis === 'vertical' ? latestEntry.intersectionRect.height : latestEntry.intersectionRect.width;
          // Add to original after position
          measurementPos += overflowAmount;
          // Ignore buffer size (IO offset)
          measurementPos -= bufferSize;
          // we hit the after buffer and detected the end of view, we need to find the start index.
          measurementPos -= containerSizeRef.current;

          // Calculate how far past the window bounds we are (this will be zero if IO is within window)
          const hOverflow = latestEntry.boundingClientRect.top - latestEntry.intersectionRect.top;
          const wOverflow = latestEntry.boundingClientRect.left - latestEntry.intersectionRect.left;
          const additionalOverflow = axis === 'vertical' ? hOverflow : wOverflow;
          measurementPos -= additionalOverflow;
        } else if (latestEntry.target === beforeElementRef.current) {
          console.log('Before');
          // Get before buffers position
          measurementPos = calculateBefore();
          // Get exact intersection position based on overflow size (how far into window did we scroll IO?)
          const overflowAmount =
            axis === 'vertical' ? latestEntry.intersectionRect.height : latestEntry.intersectionRect.width;
          // Add to original after position
          measurementPos -= overflowAmount;
          // Ignore buffer size (IO offset)
          measurementPos -= bufferSize;

          // Calculate how far past the window bounds we are (this will be zero if IO is within window)
          const hOverflow = latestEntry.boundingClientRect.bottom - latestEntry.intersectionRect.bottom;
          const wOverflow = latestEntry.boundingClientRect.right - latestEntry.intersectionRect.right;
          const additionalOverflow = axis === 'vertical' ? hOverflow : wOverflow;
          measurementPos -= additionalOverflow;
        }

        return measurementPos;
      };

      // Get exact 'scrollTop' via IO values
      const measurementPos = calculateOverBuffer();

      /* dirMod: Set the index to before/after the current scroll top element (depending on direction) */
      const maxIndex = Math.max(numItems - virtualizerLength, 0);
      const halfBuffer = Math.ceil(bufferItems / 2);
      const startIndex = getIndexFromScrollPosition(measurementPos) - halfBuffer;

      // Safety limits
      const newStartIndex = Math.min(Math.max(startIndex, 0), maxIndex);

      if (actualIndex !== newStartIndex) {
        // We flush sync this and perform an immediate state update
        flushSync(() => {
          batchUpdateNewIndex(newStartIndex);
        });
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
      return actualIndex;
    }
    const midpoint = Math.floor((lowIndex + highIndex) / 2);
    const iBefore = Math.max(midpoint - 1, 0);
    const iAfter = Math.min(midpoint + 1, childProgressiveSizes.current.length - 1);
    const indexValue = childProgressiveSizes.current[midpoint];
    const afterIndexValue = childProgressiveSizes.current[iAfter];
    const beforeIndexValue = childProgressiveSizes.current[iBefore];
    if (scrollPos <= afterIndexValue && scrollPos >= beforeIndexValue) {
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
    /* Quick searches our progressive height array */
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
    if (!getItemSize) {
      return Math.round(scrollPos / itemSize);
    }

    return getIndexFromSizeArray(scrollPos);
  };

  const calculateTotalSize = useCallback(() => {
    if (!getItemSize) {
      return itemSize * numItems;
    }

    // Time for custom size calcs
    return childProgressiveSizes.current[numItems - 1];
  }, [getItemSize, itemSize, numItems]);

  const calculateBefore = useCallback(() => {
    const currentIndex = Math.min(actualIndexRef.current, numItems - 1);

    if (!getItemSize) {
      // The missing items from before virtualization starts height
      return currentIndex * itemSize;
    }

    if (currentIndex <= 0) {
      return 0;
    }

    // Time for custom size calcs
    return childProgressiveSizes.current[currentIndex - 1];
  }, [getItemSize, itemSize, numItems]);

  const calculateAfter = useCallback(() => {
    if (numItems === 0 || actualIndexRef.current + virtualizerLength >= numItems) {
      return 0;
    }

    const lastItemIndex = Math.min(actualIndexRef.current + virtualizerLength, numItems);
    if (!getItemSize) {
      // The missing items from after virtualization ends height
      const remainingItems = numItems - lastItemIndex;
      return remainingItems * itemSize;
    }

    // Time for custom size calcs
    return childProgressiveSizes.current[numItems - 1] - childProgressiveSizes.current[lastItemIndex - 1];
  }, [getItemSize, itemSize, numItems, virtualizerLength]);

  const updateChildRows = useCallback(
    (newIndex: number) => {
      if (numItems === 0) {
        /* Nothing to virtualize */
        return;
      }

      /*
        We reset the array every time to ensure children are re-rendered
        This function should only be called when update is nessecary
       */
      childArray.current = new Array(virtualizerLength);
      const _actualIndex = Math.max(newIndex, 0);
      const end = Math.min(_actualIndex + virtualizerLength, numItems);
      for (let i = _actualIndex; i < end; i++) {
        childArray.current[i - _actualIndex] = renderChild(i, isScrolling);
      }
    },
    [isScrolling, numItems, renderChild, virtualizerLength],
  );

  const setBeforeRef = useCallback(
    (element: HTMLDivElement) => {
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
      setObserverList(newList);
    },
    [setObserverList],
  );

  const setAfterRef = useCallback(
    (element: HTMLDivElement) => {
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
      setObserverList(newList);
    },
    [setObserverList],
  );

  const updateCurrentItemSizes = (newIndex: number) => {
    if (!getItemSize) {
      // Static sizes, not required.
      return;
    }
    // We should always call our size function on index change (only for the items that will be rendered)
    // This ensures we request the latest data for incoming items in case sizing has changed.
    const endIndex = Math.min(newIndex + virtualizerLength, numItems);
    const startIndex = Math.max(newIndex, 0);

    let didUpdate = false;
    for (let i = startIndex; i < endIndex; i++) {
      const newSize = getItemSize(i);
      if (newSize !== childSizes.current[i]) {
        childSizes.current[i] = newSize;
        didUpdate = true;
      }
    }

    if (didUpdate) {
      // Update our progressive size array
      for (let i = startIndex; i < numItems; i++) {
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

  useImperativeHandle(
    imperativeVirtualizerRef,
    () => {
      return {
        progressiveSizes: childProgressiveSizes,
        nodeSizes: childSizes,
        setFlaggedIndex: (index: number | null) => (flaggedIndex.current = index),
        currentIndex: actualIndexRef,
      };
    },
    [childProgressiveSizes, childSizes],
  );

  // Initialization on mount - update array index to 0 (ready state).
  // Only fire on mount (no deps).
  useEffect(() => {
    if (actualIndex < 0) {
      batchUpdateNewIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If the user passes in an updated renderChild function - update current children
  useEffect(() => {
    if (actualIndex >= 0) {
      updateChildRows(actualIndex);
      forceUpdate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderChild]);

  useEffect(() => {
    // Ensure we repopulate if getItemSize callback changes
    populateSizeArrays();

    // We only run this effect on getItemSize change (recalc dynamic sizes)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getItemSize]);

  // Effect to check flag index on updates
  useEffect(() => {
    if (!onRenderedFlaggedIndex || flaggedIndex.current === null) {
      return;
    }
    if (actualIndex <= flaggedIndex.current && actualIndex + virtualizerLength >= flaggedIndex.current) {
      onRenderedFlaggedIndex(flaggedIndex.current);
      flaggedIndex.current = null;
    }
  }, [actualIndex, onRenderedFlaggedIndex, virtualizerLength]);

  // Ensure we have run through and updated the whole size list array at least once.
  initializeSizeArray();

  if (getItemSize && (numItems !== childSizes.current.length || numItems !== childProgressiveSizes.current.length)) {
    // Child length mismatch, repopulate size arrays.
    populateSizeArrays();
  }

  // Ensure we recalc if virtualizer length changes
  const maxCompare = Math.min(virtualizerLength, numItems);
  if (childArray.current.length !== maxCompare && actualIndex + childArray.current.length < numItems) {
    updateChildRows(actualIndex);
  }

  const isFullyInitialized = hasInitialized.current && actualIndex >= 0;
  return {
    components: {
      before: 'div',
      after: 'div',
      beforeContainer: 'div',
      afterContainer: 'div',
    },
    virtualizedChildren: childArray.current,
    before: slot.always(props.before, {
      defaultProps: {
        ref: setBeforeRef,
        role: 'none',
      },
      elementType: 'div',
    }),
    after: slot.always(props.after, {
      defaultProps: {
        ref: setAfterRef,
        role: 'none',
      },
      elementType: 'div',
    }),
    beforeContainer: slot.always(props.beforeContainer, {
      defaultProps: {
        role: 'none',
      },
      elementType: 'div',
    }),
    afterContainer: slot.always(props.afterContainer, {
      defaultProps: {
        role: 'none',
      },
      elementType: 'div',
    }),
    beforeBufferHeight: isFullyInitialized ? calculateBefore() : 0,
    afterBufferHeight: isFullyInitialized ? calculateAfter() : 0,
    totalVirtualizerHeight: isFullyInitialized ? calculateTotalSize() : virtualizerLength * itemSize,
    virtualizerStartIndex: actualIndex,
    axis,
    bufferSize,
    reversed,
    childSizes,
    childProgressiveSizes,
  };
}

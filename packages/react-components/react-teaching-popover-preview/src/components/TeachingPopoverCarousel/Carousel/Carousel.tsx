import {
  isHTMLElement,
  useMergedRefs,
  useControllableState,
  type EventHandler,
  useEventCallback,
} from '@fluentui/react-utilities';
import * as React from 'react';

import { CAROUSEL_ITEM } from './constants';
import { useCarouselWalker_unstable } from './useCarouselWalker';
import { createCarouselStore } from './createCarouselStore';
import type { CarouselPageChangeData } from './Carousel.types';
import { CarouselContextValue } from './CarouselContext';

export type UseCarouselOptions = {
  defaultValue?: string;
  value?: string;

  onPageChange?: EventHandler<CarouselPageChangeData>;
  onFinish?: EventHandler<CarouselPageChangeData>;
};

// TODO: Migrate this into an external @fluentui/carousel component
// For now, we won't export this publicly, is only for internal TeachingPopover use until stabilized.
export function useCarousel_unstable(options: UseCarouselOptions) {
  const { onPageChange, onFinish } = options;

  const { ref: carouselRef, walker: carouselWalker } = useCarouselWalker_unstable();
  const [store] = React.useState(() => createCarouselStore());

  const [value, setValue] = useControllableState({
    defaultState: options.defaultValue,
    state: options.value,
    initialState: null,
  });
  const rootRef = React.useRef<HTMLDivElement>(null);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (value === null) {
        // eslint-disable-next-line no-console
        console.error(
          'useCarousel: Carousel needs to have a `defaultValue` or `value` prop set. If you want to control the value, use the `value` prop.',
        );
      }
    }, [value]);
  }

  React.useEffect(() => {
    const allItems = rootRef.current?.querySelectorAll(`[${CAROUSEL_ITEM}]`)!;

    for (let i = 0; i < allItems.length; i++) {
      store.addValue(allItems.item(i).getAttribute(CAROUSEL_ITEM)!);
    }

    return () => {
      store.clear();
    };
  }, [store]);

  React.useEffect(() => {
    const config: MutationObserverInit = {
      attributes: true,
      attributeFilter: [CAROUSEL_ITEM],
      childList: true,
      subtree: true,
    };

    // Callback function to execute when mutations are observed
    const callback: MutationCallback = mutationList => {
      for (const mutation of mutationList) {
        for (const addedNode of Array.from(mutation.addedNodes)) {
          if (isHTMLElement(addedNode) && addedNode.hasAttribute(CAROUSEL_ITEM)) {
            const newValue = addedNode.getAttribute(CAROUSEL_ITEM)!;
            let previousNode = addedNode.previousElementSibling;
            let previous = addedNode.previousElementSibling?.getAttribute(CAROUSEL_ITEM) ?? null;

            // Sometime the previous page might be an actual page we are currently on, so we track further in case.
            // This will also let us use hidden elements instead of conditional rendering if desired.
            while (previousNode && !previous) {
              previousNode = previousNode?.previousElementSibling;
              previous = previousNode?.getAttribute(CAROUSEL_ITEM) ?? null;
            }

            store.insertValue(newValue, previous);
          }
        }

        for (const removedNode of Array.from(mutation.removedNodes)) {
          if (isHTMLElement(removedNode) && removedNode?.hasAttribute(CAROUSEL_ITEM)) {
            const removedValue = removedNode.getAttribute(CAROUSEL_ITEM)!;

            store.removeValue(removedValue);
          }
        }
      }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(rootRef.current!, config);

    // Later, you can stop observing
    return () => {
      observer.disconnect();
    };
  }, [store]);

  const selectPageByDirection: CarouselContextValue['selectPageByDirection'] = useEventCallback((event, direction) => {
    const active = carouselWalker.active();

    if (!active?.value) {
      return;
    }

    const newPage =
      direction === 'prev' ? carouselWalker.prevPage(active.value) : carouselWalker.nextPage(active.value);

    if (newPage) {
      setValue(newPage?.value);
      onPageChange?.(event, { event, type: 'click', value: newPage?.value });
    } else {
      onFinish?.(event, { event, type: 'click', value: active?.value });
    }
  });
  const selectPageByValue: CarouselContextValue['selectPageByValue'] = useEventCallback((event, _value) => {
    setValue(_value);
    onPageChange?.(event, { event, type: 'click', value: _value });
  });

  return {
    carouselRef: useMergedRefs(rootRef, carouselRef),
    carousel: {
      store,
      value,
      selectPageByDirection,
      selectPageByValue,
    },
  };
}

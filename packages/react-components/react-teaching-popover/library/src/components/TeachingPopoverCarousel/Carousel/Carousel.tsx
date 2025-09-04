import * as React from 'react';
import { isHTMLElement, useMergedRefs, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import { useAnnounce, useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

import { CAROUSEL_ITEM } from './constants';
import { useCarouselWalker_unstable } from './useCarouselWalker';
import { createCarouselStore } from './createCarouselStore';
import type { CarouselStore, UseCarouselOptions } from './Carousel.types';
import { CarouselContextValue } from './CarouselContext';

// TODO: Migrate this into an external @fluentui/carousel component
// For now, we won't export this publicly, is only for internal TeachingPopover use until stabilized.
export function useCarousel_unstable(options: UseCarouselOptions): {
  carouselRef: React.RefObject<HTMLDivElement | null>;
  carousel: {
    store: CarouselStore;
    value: string | null;
    selectPageByDirection: (
      event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
      direction: 'next' | 'prev',
    ) => void;
    selectPageByValue: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, newValue: string) => void;
  };
} {
  'use no memo';

  const { announcement, onValueChange, onFinish } = options;

  const { targetDocument } = useFluent();
  const win = targetDocument?.defaultView;
  const { ref: carouselRef, walker: carouselWalker } = useCarouselWalker_unstable();
  const [store] = React.useState(() => createCarouselStore());

  const [value, setValue] = useControllableState({
    defaultState: options.defaultValue,
    state: options.value,
    initialState: null,
  });
  const rootRef = React.useRef<HTMLDivElement>(null);

  const { announce } = useAnnounce();

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
    if (!win) {
      return;
    }

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
            const newNode = carouselWalker.find(newValue);
            if (!newNode?.value) {
              return;
            }

            const previousNode = carouselWalker.prevPage(newNode?.value);
            store.insertValue(newValue, previousNode?.value ?? null);
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
    const observer = new win.MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(rootRef.current!, config);

    // Later, you can stop observing
    return () => {
      observer.disconnect();
    };
  }, [carouselWalker, store, win]);

  const updateSlide = useEventCallback(
    (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, newValue: string) => {
      setValue(newValue);
      onValueChange?.(event, { event, type: 'click', value: newValue });

      const announceText = announcement?.(newValue);
      if (announceText) {
        announce(announceText, { polite: true });
      }
    },
  );

  const selectPageByDirection: CarouselContextValue['selectPageByDirection'] = useEventCallback((event, direction) => {
    const active = carouselWalker.active();

    if (!active?.value) {
      return;
    }

    const newPage =
      direction === 'prev' ? carouselWalker.prevPage(active.value) : carouselWalker.nextPage(active.value);

    if (newPage) {
      updateSlide(event, newPage?.value);
    } else {
      onFinish?.(event, { event, type: 'click', value: active?.value });
    }
  });

  return {
    carouselRef: useMergedRefs(rootRef, carouselRef),
    carousel: {
      store,
      value,
      selectPageByDirection,
      selectPageByValue: updateSlide,
    },
  };
}

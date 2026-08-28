'use client';

import * as React from 'react';
import { isHTMLElement, useMergedRefs, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import { useAnnounce, useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

import { CAROUSEL_ITEM, CAROUSEL_TITLE } from './constants';
import { useCarouselWalker_unstable } from './useCarouselWalker';
import { createCarouselStore } from './createCarouselStore';
import type { CarouselStore, UseCarouselOptions } from './Carousel.types';
import type { CarouselContextValue } from './CarouselContext';

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

  // Tracks the value of a carousel page that is in the process of becoming active, so that focus is only moved
  // to a page's title when its DOM node mounts *because of* a navigation - not whenever any
  // `[data-carousel-title]` node happens to be added anywhere under the carousel (e.g. unrelated async content).
  const pendingFocusValueRef = React.useRef<string | null>(null);
  const isInitialRenderRef = React.useRef(true);

  React.useEffect(() => {
    if (isInitialRenderRef.current) {
      isInitialRenderRef.current = false;
      return;
    }

    pendingFocusValueRef.current = value;
  }, [value]);

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
          if (!isHTMLElement(addedNode)) {
            continue;
          }

          if (addedNode.hasAttribute(CAROUSEL_ITEM)) {
            const newValue = addedNode.getAttribute(CAROUSEL_ITEM)!;
            const newNode = carouselWalker.find(newValue);
            if (!newNode?.value) {
              return;
            }

            const previousNode = carouselWalker.prevPage(newNode?.value);
            store.insertValue(newValue, previousNode?.value ?? null);
          }

          // Move focus to a page's title only when it mounts as part of an actual navigation to it (tracked via
          // `pendingFocusValueRef`), so assistive technology announces the updated heading (and any
          // aria-describedby'd step count) in a single pass. A page's own root element (marked with
          // `data-carousel-item`) is never removed/re-added on navigation - only its children toggle - so the
          // title's *owning* item is resolved via the closest `[data-carousel-item]` ancestor and compared
          // against the pending value. This ensures unrelated title mounts elsewhere in the carousel - e.g. async
          // content added to a page that isn't the one just navigated to - never steal focus.
          if (pendingFocusValueRef.current !== null) {
            const titleEl = addedNode.matches(`[${CAROUSEL_TITLE}]`)
              ? addedNode
              : addedNode.querySelector<HTMLElement>(`[${CAROUSEL_TITLE}]`);

            const owningItemValue = titleEl?.closest(`[${CAROUSEL_ITEM}]`)?.getAttribute(CAROUSEL_ITEM);

            if (titleEl && owningItemValue === pendingFocusValueRef.current) {
              titleEl.focus({ preventScroll: true });
              pendingFocusValueRef.current = null;
            }
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

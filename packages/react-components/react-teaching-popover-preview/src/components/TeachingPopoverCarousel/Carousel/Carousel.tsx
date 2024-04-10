import { useControllableState } from '@fluentui/react-utilities';
import * as React from 'react';

import { CAROUSEL_ITEM } from './constants';
import { useCarouselCollection_unstable } from './useCarouselCollection';
import { useCarouselWalker_unstable } from './useCarouselWalker';
import { isHTMLElement, useMergedRefs } from '@fluentui/react-utilities';

type UseCarouselOptions = {
  defaultValue?: string;
  value?: string;
};

// TODO: Migrate this into an external @fluentui/carousel component
// For now, we won't export this publicly, is only for internal TeachingPopover use until stabilized.
export function useCarousel_unstable(options: UseCarouselOptions) {
  const { ref: carouselRef, walker: carouselWalker } = useCarouselWalker_unstable();
  const { store } = useCarouselCollection_unstable();

  const [value, setValue] = useControllableState({
    defaultState: options.defaultValue,
    state: options.value,
    initialState: '',
  });
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const allItems = rootRef.current?.querySelectorAll(`[${CAROUSEL_ITEM}]`)!;

    for (let i = 0; i < allItems.length; i++) {
      store.addValue(allItems.item(i).getAttribute(CAROUSEL_ITEM)!);
    }
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

  return {
    carouselRef: useMergedRefs(rootRef, carouselRef),
    carouselWalker,
    carousel: {
      store,
      value,
      setValue,
    },
  };
}

import * as React from 'react';
import { CAROUSEL_ITEM } from './constants';
import { useCarouselCollection } from './useCarouselCollection';
import { useCarouselWalker } from './useCarouselWalker';
import { useMergedRefs } from '@fluentui/react-utilities';

// TODO: Migrate this into an external @fluentui/carousel component
// For now, we won't export this publicly, is only for internal TeachingPopover use until stabilized.
export function useCarousel_unstable() {
  const { ref: carouselRef, walker: carouselWalker } = useCarouselWalker();
  const { store, value, setValue, currentIndex, setIndex, totalPages } = useCarouselCollection();

  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const allItems = rootRef.current?.querySelectorAll(`[${CAROUSEL_ITEM}]`)!;

    console.log('Got item: ', allItems);

    for (let i = 0; i < allItems.length; i++) {
      store.addValue(allItems.item(i).getAttribute(CAROUSEL_ITEM)!);
      console.log('Adding to store: ', store);
    }
  }, []);

  React.useEffect(() => {
    const config: MutationObserverInit = {
      attributes: true,
      attributeFilter: [CAROUSEL_ITEM],
      childList: true,
      subtree: true,
    };

    // Callback function to execute when mutations are observed
    const callback: MutationCallback = mutationList => {
      console.log('Mutation callback');
      for (const mutation of mutationList) {
        console.log('Mutation callback - added');
        for (const addedNode of Array.from(mutation.addedNodes)) {
          if (addedNode instanceof HTMLElement && addedNode.hasAttribute(CAROUSEL_ITEM)) {
            const newValue = addedNode.getAttribute(CAROUSEL_ITEM)!;
            const previous = addedNode.previousElementSibling?.getAttribute(CAROUSEL_ITEM) ?? null;

            console.log(previous);
            store.insertValue(newValue, previous);
          }
        }

        for (const removedNode of Array.from(mutation.removedNodes)) {
          if (removedNode instanceof HTMLElement && removedNode?.hasAttribute(CAROUSEL_ITEM)) {
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
      console.log('observer disconnect');
      observer.disconnect();
    };
  }, []);

  return {
    carouselRef: useMergedRefs(rootRef, carouselRef),
    carouselWalker,
    carousel: {
      store,
      value,
      setValue,
      setIndex,
      currentIndex,
      totalPages,
    },
  };
}

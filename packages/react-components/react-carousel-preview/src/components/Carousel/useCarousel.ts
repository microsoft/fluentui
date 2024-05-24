import * as React from 'react';
import {
  getIntrinsicElementProps,
  isHTMLElement,
  slot,
  useControllableState,
  useEventCallback,
  useMergedRefs,
} from '@fluentui/react-utilities';
import type { CarouselProps, CarouselState } from './Carousel.types';
import { useCarouselWalker_unstable } from '../useCarouselWalker';
import { createCarouselStore } from '../createCarouselStore';
import { CAROUSEL_ITEM } from '../constants';
import type { CarouselContextValue } from '../CarouselContext.types';

/**
 * Create the state required to render Carousel.
 *
 * The returned state can be modified with hooks such as useCarouselStyles_unstable,
 * before being passed to renderCarousel_unstable.
 *
 * @param props - props from this instance of Carousel
 * @param ref - reference to root HTMLDivElement of Carousel
 */
export function useCarousel_unstable(props: CarouselProps, ref: React.Ref<HTMLDivElement>): CarouselState {
  const { onValueChange, loop } = props;

  const { ref: carouselRef, walker: carouselWalker } = useCarouselWalker_unstable();
  const [store] = React.useState(() => createCarouselStore());

  const [value, setValue] = useControllableState({
    defaultState: props.defaultValue,
    state: props.value,
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
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(rootRef.current!, config);

    // Later, you can stop observing
    return () => {
      observer.disconnect();
    };
  }, [carouselWalker, store]);

  const selectPageByDirection: CarouselContextValue['selectPageByDirection'] = useEventCallback(
    (event, direction, _loop) => {
      const active = carouselWalker.active();

      if (!active?.value) {
        return;
      }

      let newPage =
        direction === 'prev' ? carouselWalker.prevPage(active.value) : carouselWalker.nextPage(active.value);

      if (!newPage && _loop) {
        if (direction === 'prev') {
          newPage = carouselWalker.nextPage(active.value);
          while (newPage && carouselWalker.nextPage(newPage?.value)) {
            newPage = carouselWalker.nextPage(newPage?.value);
          }
        } else {
          newPage = carouselWalker.prevPage(active.value);
          while (newPage && carouselWalker.prevPage(newPage?.value)) {
            newPage = carouselWalker.prevPage(newPage?.value);
          }
        }
      }

      if (newPage) {
        setValue(newPage?.value);
        onValueChange?.(event, { event, type: 'click', value: newPage?.value });
      }
    },
  );

  const selectPageByValue: CarouselContextValue['selectPageByValue'] = useEventCallback((event, _value) => {
    setValue(_value);
    onValueChange?.(event, { event, type: 'click', value: _value });
  });

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(ref, carouselRef, rootRef),
        role: 'region',
        'aria-roledescription': 'carousel',
        ...props,
      }),
      { elementType: 'div' },
    ),
    store,
    value,
    selectPageByDirection,
    selectPageByValue,
    loop,
  };
}

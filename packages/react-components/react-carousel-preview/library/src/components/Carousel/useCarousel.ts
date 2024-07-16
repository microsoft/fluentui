import {
  getIntrinsicElementProps,
  isHTMLElement,
  slot,
  useControllableState,
  useEventCallback,
  useFirstMount,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import * as React from 'react';

import type { CarouselProps, CarouselState } from './Carousel.types';
import { useCarouselWalker_unstable } from '../useCarouselWalker';
import { createCarouselStore } from '../createCarouselStore';
import { CAROUSEL_ITEM } from '../constants';
import type { CarouselContextValue } from '../CarouselContext.types';
import { useEmblaCarousel } from '../useEmblaCarousel';

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
  'use no memo';

  const { align = 'center', onValueChange, circular = false, groupSize = 1, containScroll = false } = props;

  const [startIndex, setStartIndex] = React.useState(0);

  const [value, setValue] = useControllableState({
    defaultState: props.defaultValue,
    state: props.value,
    initialState: null,
  });

  const { targetDocument, dir } = useFluent();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align,
    direction: dir,
    loop: circular,
    slidesToScroll: groupSize,
    startIndex,
    containScroll,
  });

  const [store] = React.useState(() => createCarouselStore(value));
  const rootRef = React.useRef<HTMLDivElement>(null);

  const { ref: carouselRef, walker: carouselWalker } = useCarouselWalker_unstable(groupSize);
  const isFirstMount = useFirstMount();

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

  useIsomorphicLayoutEffect(() => {
    store.setActiveValue(value);
  }, [store, value]);

  useIsomorphicLayoutEffect(() => {
    const allItems = rootRef.current?.querySelectorAll(`[${CAROUSEL_ITEM}]`)!;

    for (let i = 0; i < allItems.length; i++) {
      store.addValue(allItems.item(i).getAttribute(CAROUSEL_ITEM)!);
    }

    return () => {
      store.clearValues();
    };
  }, [store]);

  React.useEffect(() => {
    const win = targetDocument?.defaultView;

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
  }, [carouselWalker, store, targetDocument]);

  const scrollToValue = React.useCallback(
    (_value: string, jump?: boolean) => {
      const _groupSize = groupSize ?? 1;
      const values = store.getSnapshot().values;
      const index = values.indexOf(_value) / _groupSize;

      emblaApi?.scrollToIndex(index, jump);
    },
    [emblaApi, groupSize, store],
  );

  const selectPageByDirection: CarouselContextValue['selectPageByDirection'] = useEventCallback((event, direction) => {
    const active = carouselWalker.active();

    if (!active?.value) {
      return;
    }

    const newPage =
      direction === 'prev'
        ? carouselWalker.prevPage(active.value, circular)
        : carouselWalker.nextPage(active.value, circular);

    if (newPage) {
      setValue(newPage?.value);
      onValueChange?.(event, { event, type: 'click', value: newPage?.value });

      emblaApi.scrollInDirection(direction);
    }
  });

  const selectPageByValue: CarouselContextValue['selectPageByValue'] = useEventCallback((event, _value) => {
    setValue(_value);
    onValueChange?.(event, { event, type: 'click', value: _value });

    scrollToValue(_value);
  });

  useIsomorphicLayoutEffect(() => {
    // Set the initial card
    if (isFirstMount) {
      const _groupSize = groupSize ?? 1;
      const values = store.getSnapshot().values;
      let cardIndex = values.indexOf(value ?? values[0]);
      // Account for groups, we want to set the active index on 'first' in group.
      cardIndex = cardIndex - (cardIndex % groupSize);

      const index = Math.floor(cardIndex / _groupSize);
      // Sets the internal carousel index
      setStartIndex(index);
      // Sets the nav items
      setValue(values[cardIndex]);
    }
  }, [groupSize, isFirstMount, scrollToValue, setValue, store, value]);

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(ref, carouselRef, rootRef, emblaRef),
        role: 'region',
        ...props,
      }),
      { elementType: 'div' },
    ),
    store,
    selectPageByDirection,
    selectPageByValue,
    circular,
    groupSize,
  };
}

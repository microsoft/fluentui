import * as React from 'react';
import {
  getIntrinsicElementProps,
  isHTMLElement,
  slot,
  useControllableState,
  useEventCallback,
  useFirstMount,
  useIsomorphicLayoutEffect,
  useMergedRefs,
  usePrevious,
} from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

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
  'use no memo';

  const { onValueChange, circular, peeking } = props;

  const { targetDocument } = useFluent();
  const win = targetDocument?.defaultView;
  const { ref: carouselRef, walker: carouselWalker } = useCarouselWalker_unstable();

  const [value, setValue] = useControllableState({
    defaultState: props.defaultValue,
    state: props.value,
    initialState: null,
  });
  const [store] = React.useState(() => createCarouselStore(value));

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

  useIsomorphicLayoutEffect(() => {
    store.setActiveValue(value);
  }, [store, value]);

  React.useEffect(() => {
    const allItems = rootRef.current?.querySelectorAll(`[${CAROUSEL_ITEM}]`)!;

    for (let i = 0; i < allItems.length; i++) {
      store.addValue(allItems.item(i).getAttribute(CAROUSEL_ITEM)!);
    }

    return () => {
      store.clearValues();
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

  const selectPageByDirection: CarouselContextValue['selectPageByDirection'] = useEventCallback((event, direction) => {
    const active = carouselWalker.active();
    console.log('selectPageByDirection: ', { active, direction, circular });
    if (!active?.value) {
      return;
    }

    const newPage =
      direction === 'prev'
        ? carouselWalker.prevPage(active.value, circular)
        : carouselWalker.nextPage(active.value, circular);
    console.log('newPage: ', newPage);
    if (newPage) {
      setValue(newPage?.value);
      onValueChange?.(event, { event, type: 'click', value: newPage?.value });
    }
  });

  const selectPageByValue: CarouselContextValue['selectPageByValue'] = useEventCallback((event, _value) => {
    setValue(_value);
    onValueChange?.(event, { event, type: 'click', value: _value });
  });

  // TODO: use the same hook as in useMotion() to avoid scrolling
  const isFirstMount = useFirstMount();
  const previousValue = usePrevious(value);

  React.useLayoutEffect(() => {
    const scrollContainer = rootRef.current?.querySelector('.CarouselSlider');

    console.log('useLayoutEffect: ', { previousValue, value, isFirstMount });

    if (value) {
      let { el: targetEl } = carouselWalker.find(value) ?? { el: null };

      // TODO pure garbage, refactor it
      const fromEndToStart =
        previousValue === store.getSnapshot().values[store.getSnapshot().values.length - 1] &&
        value === store.getSnapshot().values[0];
      const fromStartToEnd =
        previousValue === store.getSnapshot().values[0] &&
        value === store.getSnapshot().values[store.getSnapshot().values.length - 1];

      console.log('movement: ', { fromEndToStart, fromStartToEnd, targetEl });

      function scrollTo(element: HTMLElement, behavior = isFirstMount ? 'instant' : 'smooth') {
        console.log('element', element.getBoundingClientRect());
        const left = element.offsetLeft; // - 100; /* TODO should be computed */

        // console.log('scrolling to: ', { targetEl, left, behavior });
        scrollContainer?.scrollTo({ left, behavior });
        // element.scrollIntoView({
        //   behavior,
        //   block: 'center',
        // });
      }

      if (targetEl) {
        // TODO get rid of setTimeout (problem with order of effects)
        setTimeout(() => {
          if (fromEndToStart) {
            targetEl = carouselWalker.find(previousValue)!.el.nextElementSibling as HTMLElement;

            const listener = () => {
              const { el } = carouselWalker.find(value)!;

              scrollTo(el!, 'instant');
              scrollContainer?.removeEventListener('scrollend', listener);
            };

            scrollTo(targetEl!);
            scrollContainer?.addEventListener('scrollend', listener);

            return;
          }

          if (fromStartToEnd) {
            targetEl = carouselWalker.find(previousValue)!.el.previousSibling as HTMLElement;

            const listener1 = () => {
              const { el } = carouselWalker.find(value)!;

              scrollTo(el!, 'instant');
            };

            scrollTo(targetEl!);
            scrollContainer?.addEventListener('scrollend', listener1);

            return;
          }

          scrollTo(targetEl!);
        }, 50);
      }

      // target?.el.scrol
    }
  }, [previousValue, value, isFirstMount]);

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(ref, carouselRef, rootRef),
        role: 'region',
        ...props,
      }),
      { elementType: 'div' },
    ),
    store,
    selectPageByDirection,
    selectPageByValue,
    circular,
    peeking,
  };
}

import {
  getIntrinsicElementProps,
  slot,
  useControllableState,
  useEventCallback,
  useIsomorphicLayoutEffect,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import * as React from 'react';

import type { CarouselProps, CarouselState } from './Carousel.types';
import { createCarouselStore } from '../createCarouselStore';
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

  const { align = 'center', circular = false } = props;

  const [store] = React.useState(() => createCarouselStore(props.defaultIndex ?? 0));

  useIsomorphicLayoutEffect(() => {
    // Allow user to control active index
    if (props.activeIndex !== undefined) {
      store.setActiveIndex(props.activeIndex);
    }
  }, [props.activeIndex]);

  const { dir } = useFluent();
  const [emblaRef, emblaApi, subscribeForValues] = useEmblaCarousel({
    align,
    direction: dir,
    loop: circular,
    startIndex: props.defaultIndex ?? 0,
    setActiveIndex: store.setActiveIndex,
  });

  const selectPageByIndex: CarouselContextValue['selectPageByIndex'] = useEventCallback((event, index, jump) => {
    emblaApi?.scrollToIndex(index, jump);
  });

  const selectPageByDirection: CarouselContextValue['selectPageByDirection'] = useEventCallback((event, direction) => {
    emblaApi.scrollInDirection(direction);
  });

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(ref, emblaRef),
        role: 'region',
        ...props,
      }),
      { elementType: 'div' },
    ),
    store,
    selectPageByDirection,
    selectPageByIndex,
    subscribeForValues,
    circular,
  };
}

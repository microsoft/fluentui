import * as React from 'react';
import { getIntrinsicElementProps, slot, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { CarouselAnnouncerProps, CarouselAnnouncerState } from './CarouselAnnouncer.types';
import { useCarouselContext_unstable as useCarouselContext } from '../CarouselContext';

/**
 * Create the state required to render CarouselAnnouncer.
 *
 * The returned state can be modified with hooks such as useCarouselAnnouncerStyles_unstable,
 * before being passed to renderCarouselAnnouncer_unstable.
 *
 * @param props - props from this instance of CarouselAnnouncer
 * @param ref - reference to root HTMLDivElement of CarouselAnnouncer
 */
export const useCarouselAnnouncer_unstable = (
  props: CarouselAnnouncerProps,
  ref: React.Ref<HTMLDivElement>,
): CarouselAnnouncerState => {
  const [totalSlides, setTotalSlides] = React.useState(0);
  const [slideGroupList, setSlideGroupList] = React.useState([[0]]);
  const subscribeForValues = useCarouselContext(ctx => ctx.subscribeForValues);
  const currentIndex = useCarouselContext(ctx => ctx.activeIndex);

  useIsomorphicLayoutEffect(() => {
    return subscribeForValues(data => {
      setTotalSlides(data.navItemsCount);
      setSlideGroupList(data.groupIndexList);
    });
  }, [subscribeForValues]);

  return {
    totalSlides,
    currentIndex,
    slideGroupList,
    renderAnnouncerChild: props.children,
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
        children: null,
      }),
      {
        elementType: 'div',
        defaultProps: {
          'aria-live': 'polite',
        },
      },
    ),
  };
};

import * as React from 'react';
import { getIntrinsicElementProps, slot, useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';
import type { CarouselAnnouncerProps, CarouselAnnouncerState } from './CarouselAnnouncer.types';
import { useCarouselContext_unstable as useCarouselContext } from '../CarouselContext';
import { useCallback } from 'react';

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
  const { children: renderAnnouncerText } = props;
  const subscribeForValues = useCarouselContext(ctx => ctx.subscribeForValues);
  const textRef: React.Ref<HTMLElement> = React.useRef(null);

  const currentIndex = useCarouselContext(ctx => ctx.activeIndex);
  const navLengthRef = React.useRef<number>(0);
  const navGroupRef = React.useRef<number[][]>([]);

  const updateInnerText = useCallback(
    (index: number, totalSlides: number, groupIndexList: number[][]) => {
      if (totalSlides <= 0) {
        // Ignore announcements until slides discovered
        return;
      }
      const announcementText = renderAnnouncerText(index, totalSlides, groupIndexList);

      if (textRef.current) {
        textRef.current.innerText = announcementText;
      }
    },
    [renderAnnouncerText],
  );

  useIsomorphicLayoutEffect(() => {
    return subscribeForValues(data => {
      navLengthRef.current = data.navItemsCount;
      navGroupRef.current = data.groupIndexList;
      updateInnerText(data.activeIndex, data.navItemsCount, data.groupIndexList);
    });
  }, [subscribeForValues, updateInnerText]);

  useIsomorphicLayoutEffect(() => {
    updateInnerText(currentIndex, navLengthRef.current, navGroupRef.current);
  }, [currentIndex, updateInnerText]);

  return {
    renderAnnouncerText,
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(ref, textRef),
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

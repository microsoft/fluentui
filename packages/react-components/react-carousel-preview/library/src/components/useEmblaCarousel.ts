import { useEventCallback } from '@fluentui/react-utilities';
import EmblaCarousel, { type EmblaCarouselType, type EmblaOptionsType } from 'embla-carousel';
import * as React from 'react';

import { carouselCardClassNames } from './CarouselCard/useCarouselCardStyles.styles';
import { carouselSliderClassNames } from './CarouselSlider/useCarouselSliderStyles.styles';
import { CarouselReinitData, CarouselVisibilityEventDetail } from '../Carousel';

const DEFAULT_EMBLA_OPTIONS: EmblaOptionsType = {
  containScroll: false,
  inViewThreshold: 0.99,
  watchDrag: false,

  container: `.${carouselSliderClassNames.root}`,
  slides: `.${carouselCardClassNames.root}`,
};

export const EMBLA_VISIBILITY_EVENT = 'embla:visibilitychange';

export function useEmblaCarousel({
  align,
  direction,
  loop,
  slidesToScroll,
  startIndex,
  setActiveIndex,
}: Pick<EmblaOptionsType, 'align' | 'direction' | 'loop' | 'slidesToScroll' | 'startIndex'> & {
  setActiveIndex: (newValue: number) => void;
}) {
  const emblaOptions = React.useRef<EmblaOptionsType>({ align, direction, loop, slidesToScroll, startIndex });
  const emblaApi = React.useRef<EmblaCarouselType | null>(null);

  // Listeners contains callbacks for UI elements that may require state update based on embla changes
  const listeners = React.useRef<Set<(data: CarouselReinitData) => void>>(new Set());
  const subscribeForValues = React.useCallback((listener: (data: CarouselReinitData) => void) => {
    listeners.current.add(listener);

    return () => {
      listeners.current.delete(listener);
    };
  }, []);

  const handleIndexChange = useEventCallback(() => {
    const activeIndex = emblaApi.current?.selectedScrollSnap() ?? startIndex ?? 0;

    setActiveIndex(activeIndex);
  });

  const handleReinit = () => {
    const nodes = emblaApi.current?.slideNodes() ?? [];
    const groupIndexList = emblaApi.current?.internalEngine().slideRegistry ?? [[]];

    const navItemsCount = groupIndexList.length > 0 ? groupIndexList.length : nodes.length;
    const data: CarouselReinitData = {
      nodes,
      groupIndexList,
      navItemsCount,
      activeIndex: emblaApi.current?.selectedScrollSnap() ?? 0,
    };

    for (const listener of listeners.current) {
      listener(data);
    }
  };

  const ref = React.useMemo(() => {
    let currentElement: HTMLDivElement | null = null;

    const handleVisibilityChange = () => {
      const cardElements = emblaApi.current?.slideNodes();
      const visibleIndexes = emblaApi.current?.slidesInView() ?? [];

      cardElements?.forEach((cardElement, index) => {
        cardElement.dispatchEvent(
          new CustomEvent<CarouselVisibilityEventDetail>(EMBLA_VISIBILITY_EVENT, {
            bubbles: false,
            detail: { isVisible: visibleIndexes.includes(index) },
          }),
        );
      });
    };

    return {
      set current(newElement: HTMLDivElement | null) {
        if (currentElement) {
          emblaApi.current?.off('slidesInView', handleVisibilityChange);
          emblaApi.current?.off('select', handleIndexChange);
          emblaApi.current?.off('reInit', handleReinit);
          emblaApi.current?.destroy();
        }

        if (newElement) {
          currentElement = newElement;
          emblaApi.current = EmblaCarousel(newElement, {
            ...emblaOptions.current,
            ...DEFAULT_EMBLA_OPTIONS,
          });

          emblaApi.current?.on('reInit', handleReinit);
          emblaApi.current?.on('slidesInView', handleVisibilityChange);
          emblaApi.current?.on('select', handleIndexChange);
        }
      },
    };
  }, [handleIndexChange]);

  const api = React.useMemo(
    () => ({
      scrollToIndex: (index: number, jump?: boolean) => {
        emblaApi.current?.scrollTo(index, jump);
      },
      scrollInDirection: (dir: 'prev' | 'next') => {
        if (dir === 'prev') {
          emblaApi.current?.scrollPrev();
        } else {
          emblaApi.current?.scrollNext();
        }

        return emblaApi.current?.selectedScrollSnap() ?? 0;
      },
    }),
    [],
  );

  React.useEffect(() => {
    emblaOptions.current = { align, direction, loop, slidesToScroll, startIndex };
    emblaApi.current?.reInit({
      ...emblaOptions.current,
      ...DEFAULT_EMBLA_OPTIONS,
    });
  }, [align, direction, loop, slidesToScroll, startIndex]);

  return [ref, api, subscribeForValues] as const;
}

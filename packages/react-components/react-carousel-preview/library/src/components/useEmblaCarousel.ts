import EmblaCarousel, { type EmblaCarouselType, type EmblaOptionsType } from 'embla-carousel';
import * as React from 'react';

import { carouselCardClassNames } from './CarouselCard/useCarouselCardStyles.styles';
import { carouselSliderClassNames } from './CarouselSlider/useCarouselSliderStyles.styles';
import { CarouselVisibilityEventDetail } from '../Carousel';

const DEFAULT_EMBLA_OPTIONS: EmblaOptionsType = {
  containScroll: false,
  inViewThreshold: 0.99,
  watchDrag: false,

  container: `.${carouselSliderClassNames.root}`,
  slides: `.${carouselCardClassNames.root}`,

  slidesToScroll: undefined,
  startIndex: 0,
};

export const EMBLA_VISIBILITY_EVENT = 'embla:visibilitychange';

export function useEmblaCarousel({
  align,
  direction,
  loop,
  slidesToScroll,
  startIndex,
  containScroll,
}: Pick<EmblaOptionsType, 'align' | 'direction' | 'loop' | 'slidesToScroll' | 'startIndex' | 'containScroll'>) {
  const emblaOptions = React.useRef<EmblaOptionsType>({
    align,
    direction,
    loop,
    slidesToScroll,
    startIndex,
    containScroll,
  });
  const emblaApi = React.useRef<EmblaCarouselType | null>(null);

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
          emblaApi.current?.destroy();
        }

        if (newElement) {
          currentElement = newElement;
          emblaApi.current = EmblaCarousel(newElement, {
            ...emblaOptions.current,
            ...DEFAULT_EMBLA_OPTIONS,
          });

          emblaApi.current?.on('slidesInView', handleVisibilityChange);
        }
      },
    };
  }, []);

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
      },
    }),
    [],
  );

  React.useEffect(() => {
    emblaOptions.current = { align, direction, loop, slidesToScroll, startIndex, containScroll };
    emblaApi.current?.reInit({
      ...DEFAULT_EMBLA_OPTIONS,
      ...emblaOptions.current,
    });
  }, [align, containScroll, direction, loop, slidesToScroll, startIndex]);

  return [ref, api] as const;
}

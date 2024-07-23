import EmblaCarousel, { type EmblaCarouselType, type EmblaOptionsType } from 'embla-carousel';
import * as React from 'react';

import { carouselCardClassNames } from './CarouselCard/useCarouselCardStyles.styles';
import { carouselSliderClassNames } from './CarouselSlider/useCarouselSliderStyles.styles';
import { CarouselGroupEventDetail, CarouselVisibilityEventDetail } from '../Carousel';

const DEFAULT_EMBLA_OPTIONS: EmblaOptionsType = {
  containScroll: false,
  inViewThreshold: 0.99,
  watchDrag: false,

  container: `.${carouselSliderClassNames.root}`,
  slides: `.${carouselCardClassNames.root}`,
};

export const EMBLA_VISIBILITY_EVENT = 'embla:visibilitychange';
export const EMBLA_REINIT_EVENT = 'embla:reinit';

export function useEmblaCarousel({
  align,
  direction,
  loop,
  slidesToScroll,
}: Pick<EmblaOptionsType, 'align' | 'direction' | 'loop' | 'slidesToScroll'>) {
  const emblaOptions = React.useRef<EmblaOptionsType>({
    align,
    direction,
    loop,
    slidesToScroll: slidesToScroll ?? 1, // Default to 1
  });
  const emblaApi = React.useRef<EmblaCarouselType | null>(null);
  const carouselGroupRef = React.useRef<number[][]>([[0]]);

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

    const handleReinit = () => {
      if (slidesToScroll === undefined) {
        // We only need this when grouping enabled
        return;
      }
      const carouselGroups = emblaApi.current?.internalEngine().slideRegistry;
      // TODO: Check if we have cases where the length is the same but nav points change, if so, compare array equality
      // Values array should handle id changes, we're just concerned with number of nav points.
      if (carouselGroups?.length !== carouselGroupRef.current.length) {
        carouselGroupRef.current = carouselGroups ?? [[]];
        currentElement?.dispatchEvent(
          new CustomEvent<CarouselGroupEventDetail>(EMBLA_REINIT_EVENT, {
            bubbles: false,
            detail: { groupIndex: carouselGroupRef.current },
          }),
        );
      }
    };

    return {
      set current(newElement: HTMLDivElement | null) {
        if (currentElement) {
          emblaApi.current?.off('slidesInView', handleVisibilityChange);
          emblaApi.current?.off('reInit', handleReinit);
          emblaApi.current?.off('init', handleReinit);
          emblaApi.current?.destroy();
        }

        if (newElement) {
          currentElement = newElement;
          emblaApi.current = EmblaCarousel(newElement, {
            ...emblaOptions.current,
            ...DEFAULT_EMBLA_OPTIONS,
          });

          emblaApi.current?.on('slidesInView', handleVisibilityChange);
          emblaApi.current?.on('reInit', handleReinit);
          emblaApi.current?.on('init', handleReinit);
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
    emblaOptions.current = { align, direction, loop };
    emblaApi.current?.reInit({
      ...emblaOptions.current,
      ...DEFAULT_EMBLA_OPTIONS,
    });
  }, [align, direction, loop]);

  return [ref, api] as const;
}

import { useControllableState } from '@fluentui/react-utilities';
import EmblaCarousel, { type EmblaCarouselType, type EmblaOptionsType } from 'embla-carousel';
import * as React from 'react';

import { carouselCardClassNames } from './CarouselCard/useCarouselCardStyles.styles';
import { carouselSliderClassNames } from './CarouselSlider/useCarouselSliderStyles.styles';
import { CarouselUpdateData, CarouselVisibilityEventDetail } from '../Carousel';
import Autoplay from 'embla-carousel-autoplay';

const DEFAULT_EMBLA_OPTIONS: EmblaOptionsType = {
  containScroll: false,
  inViewThreshold: 0.99,
  watchDrag: false,

  container: `.${carouselSliderClassNames.root}`,
  slides: `.${carouselCardClassNames.root}`,
};

export const EMBLA_VISIBILITY_EVENT = 'embla:visibilitychange';

export function useEmblaCarousel(
  options: Pick<EmblaOptionsType, 'align' | 'direction' | 'loop' | 'slidesToScroll'> & {
    defaultActiveIndex: number | undefined;
    activeIndex: number | undefined;
  },
) {
  const { align, direction, loop, slidesToScroll } = options;
  const [activeIndex, setActiveIndex] = useControllableState({
    defaultState: options.defaultActiveIndex,
    state: options.activeIndex,
    initialState: 0,
  });

  const emblaOptions = React.useRef<EmblaOptionsType>({
    align,
    direction,
    loop,
    slidesToScroll,
    startIndex: activeIndex,
  });
  const emblaApi = React.useRef<EmblaCarouselType | null>(null);

  const autoplayRef = React.useRef<boolean>(false);
  /* Our autoplay button, which is required by standards for autoplay to be enabled, will handle controlled state */
  const enableAutoplay = React.useCallback((autoplay: boolean) => {
    autoplayRef.current = autoplay;
    if (autoplay) {
      emblaApi.current?.plugins().autoplay.play();
    } else {
      emblaApi.current?.plugins().autoplay.stop();
    }
  }, []);

  // Listeners contains callbacks for UI elements that may require state update based on embla changes
  const listeners = React.useRef(new Set<(data: CarouselUpdateData) => void>());
  const subscribeForValues = React.useCallback((listener: (data: CarouselUpdateData) => void) => {
    listeners.current.add(listener);

    return () => {
      listeners.current.delete(listener);
    };
  }, []);

  const containerRef = React.useMemo(() => {
    let currentElement: HTMLDivElement | null = null;

    const handleIndexChange = () => {
      const newIndex = emblaApi.current?.selectedScrollSnap() ?? 0;

      setActiveIndex(newIndex);
    };
    const handleReinit = () => {
      const nodes = emblaApi.current?.slideNodes() ?? [];
      const groupIndexList = emblaApi.current?.internalEngine().slideRegistry ?? [];
      const navItemsCount = groupIndexList.length > 0 ? groupIndexList.length : nodes.length;

      const data: CarouselUpdateData = {
        navItemsCount,
        activeIndex: emblaApi.current?.selectedScrollSnap() ?? 0,
      };

      for (const listener of listeners.current) {
        listener(data);
      }
    };
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
          emblaApi.current = EmblaCarousel(
            newElement,
            {
              ...emblaOptions.current,
              ...DEFAULT_EMBLA_OPTIONS,
            },
            [Autoplay({ playOnInit: autoplayRef.current })],
          );

          emblaApi.current?.on('reInit', handleReinit);
          emblaApi.current?.on('slidesInView', handleVisibilityChange);
          emblaApi.current?.on('select', handleIndexChange);
        }
      },
    };
  }, [setActiveIndex]);

  const carouselApi = React.useMemo(
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
    const currentActiveIndex = emblaApi.current?.selectedScrollSnap() ?? 0;

    if (activeIndex !== currentActiveIndex) {
      emblaApi.current?.scrollTo(activeIndex);
    }
  }, [activeIndex]);

  React.useEffect(() => {
    emblaOptions.current = { align, direction, loop, slidesToScroll };
    emblaApi.current?.reInit(
      {
        ...emblaOptions.current,
        ...DEFAULT_EMBLA_OPTIONS,
      },
      [Autoplay({ playOnInit: autoplayRef.current })],
    );
  }, [align, direction, loop, slidesToScroll]);

  return {
    activeIndex,
    carouselApi,
    containerRef,
    subscribeForValues,
    enableAutoplay,
  };
}

import { type EventHandler, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import EmblaCarousel, { EmblaPluginType, type EmblaCarouselType, type EmblaOptionsType } from 'embla-carousel';
import * as React from 'react';

import { carouselCardClassNames } from './CarouselCard/useCarouselCardStyles.styles';
import { carouselSliderClassNames } from './CarouselSlider/useCarouselSliderStyles.styles';
import { CarouselMotion, CarouselUpdateData, CarouselVisibilityEventDetail } from '../Carousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { pointerEventPlugin } from './pointerEvents';
import type { CarouselIndexChangeData } from './CarouselContext.types';

type EmblaEventHandler = Parameters<EmblaCarouselType['on']>[1];

const sliderClassname = `.${carouselSliderClassNames.root}`;

const DEFAULT_EMBLA_OPTIONS: EmblaOptionsType = {
  containScroll: 'trimSnaps',
  inViewThreshold: 0.99,
  watchDrag: false,
  skipSnaps: true,

  container: sliderClassname,
  slides: `.${carouselCardClassNames.root}`,
};

export const EMBLA_VISIBILITY_EVENT = 'embla:visibilitychange';

export function setTabsterDefault(element: Element, isDefault: boolean): void {
  const tabsterAttr = element.getAttribute('data-tabster');

  if (tabsterAttr) {
    const tabsterAttributes = JSON.parse(tabsterAttr);
    if (tabsterAttributes.focusable) {
      // If tabster.focusable isn't present, we will ignore.
      tabsterAttributes.focusable.isDefault = isDefault;
      element.setAttribute('data-tabster', JSON.stringify(tabsterAttributes));
    }
  }
}

export function useEmblaCarousel(
  options: Pick<EmblaOptionsType, 'align' | 'direction' | 'loop' | 'slidesToScroll' | 'watchDrag' | 'containScroll'> & {
    defaultActiveIndex: number | undefined;
    activeIndex: number | undefined;
    motion?: CarouselMotion;
    onDragIndexChange?: EventHandler<CarouselIndexChangeData>;
    onAutoplayIndexChange?: EventHandler<CarouselIndexChangeData>;
    autoplayInterval?: number;
  },
): {
  activeIndex: number;
  carouselApi: {
    scrollToElement: (element: HTMLElement, jump?: boolean) => number;
    scrollToIndex: (index: number, jump?: boolean) => void;
    scrollInDirection: (dir: 'prev' | 'next') => number;
  };
  viewportRef: React.RefObject<HTMLDivElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  subscribeForValues: (listener: (data: CarouselUpdateData) => void) => () => void;
  enableAutoplay: (autoplay: boolean, temporary?: boolean) => void;
  resetAutoplay: () => void;
} {
  const {
    align,
    autoplayInterval,
    direction,
    loop,
    slidesToScroll,
    watchDrag,
    containScroll,
    motion,
    onDragIndexChange,
    onAutoplayIndexChange,
  } = options;

  const motionType = typeof motion === 'string' ? motion : motion?.kind ?? 'slide';
  const motionDuration = typeof motion === 'string' ? 25 : motion?.duration ?? 25;

  const [activeIndex, setActiveIndex] = useControllableState({
    defaultState: options.defaultActiveIndex,
    state: options.activeIndex,
    initialState: 0,
  });

  const onDragEvent = useEventCallback((event: PointerEvent | MouseEvent, index: number) => {
    onDragIndexChange?.(event, { event, type: 'drag', index });
  });

  const emblaOptions = React.useRef<EmblaOptionsType>({
    align,
    direction,
    loop,
    slidesToScroll,
    startIndex: activeIndex,
    watchDrag,
    containScroll,
    duration: motionDuration,
  });

  const emblaApi = React.useRef<EmblaCarouselType | null>(null);
  const autoplayRef = React.useRef<boolean>(false);

  const resetAutoplay = React.useCallback(() => {
    emblaApi.current?.plugins().autoplay?.reset();
  }, []);

  const getPlugins = React.useCallback(() => {
    const plugins: EmblaPluginType[] = [];

    plugins.push(
      Autoplay({
        playOnInit: autoplayRef.current,
        delay: autoplayInterval,
        /* stopOnInteraction: false causes autoplay to restart on interaction end*/
        /* we'll handle this logic to ensure autoplay state is respected */
        stopOnInteraction: true,
        stopOnFocusIn: false, // We'll handle this one manually to prevent conflicts with tabster
        stopOnMouseEnter: false, // We will handle this manually to align functionality
      }),
    );

    // Optionally add Fade plugin
    if (motionType === 'fade') {
      plugins.push(Fade());
    }

    if (watchDrag) {
      plugins.push(
        pointerEventPlugin({
          onSelectViaDrag: onDragEvent,
        }),
      );
    }

    return plugins;
  }, [motionType, onDragEvent, watchDrag, autoplayInterval]);

  /* This function enables autoplay to pause/play without affecting underlying state
   * Useful for pausing on focus etc. without having to reinitialize or set autoplay to off
   */
  const enableAutoplay = React.useCallback(
    (autoplay: boolean, temporary?: boolean) => {
      if (!temporary) {
        autoplayRef.current = autoplay;
      }

      if (autoplay && autoplayRef.current) {
        // Autoplay should only enable in the case where underlying state is true, temporary should not override
        emblaApi.current?.plugins().autoplay?.play();
        // Reset after play to ensure timing and any focus/mouse pause state is reset.
        resetAutoplay();
      } else if (!autoplay) {
        emblaApi.current?.plugins().autoplay?.stop();
      }
    },
    [resetAutoplay],
  );

  // Listeners contains callbacks for UI elements that may require state update based on embla changes
  const listeners = React.useRef(new Set<(data: CarouselUpdateData) => void>());
  const subscribeForValues = React.useCallback((listener: (data: CarouselUpdateData) => void) => {
    listeners.current.add(listener);

    return () => {
      listeners.current.delete(listener);
    };
  }, []);

  const updateIndex = () => {
    const newIndex = emblaApi.current?.selectedScrollSnap() ?? 0;
    const slides = emblaApi.current?.slideNodes();
    const slideRegistry = emblaApi.current?.internalEngine().slideRegistry;
    const actualIndex = slideRegistry?.[newIndex]?.[0] ?? 0;

    // We set the first card in the current group as the default tabster index for focus capture
    slides?.forEach((slide, slideIndex) => {
      setTabsterDefault(slide, slideIndex === actualIndex);
    });
    setActiveIndex(newIndex);
  };

  const handleReinit = useEventCallback(() => {
    const nodes: HTMLElement[] = emblaApi.current?.slideNodes() ?? [];
    const groupIndexList: number[][] = emblaApi.current?.internalEngine().slideRegistry ?? [];
    const navItemsCount = groupIndexList.length > 0 ? groupIndexList.length : nodes.length;
    const canLoop = emblaApi.current?.internalEngine().slideLooper.canLoop();

    const data: CarouselUpdateData = {
      navItemsCount,
      activeIndex: emblaApi.current?.selectedScrollSnap() ?? 0,
      groupIndexList,
      slideNodes: nodes,
      canLoop,
    };

    updateIndex();
    emblaApi.current?.scrollTo(activeIndex, false);
    for (const listener of listeners.current) {
      listener(data);
    }
  });

  const handleIndexChange: EmblaEventHandler = useEventCallback((_, eventType) => {
    const newIndex = emblaApi.current?.selectedScrollSnap() ?? 0;
    updateIndex();
    if (eventType === 'autoplay:select') {
      const noopEvent = new Event('autoplay');
      onAutoplayIndexChange?.(noopEvent, { event: noopEvent, type: 'autoplay', index: newIndex });
    }
  });

  const viewportRef: React.RefObject<HTMLDivElement | null> = React.useRef(null);
  const containerRef: React.RefObject<HTMLDivElement | null> = React.useMemo(() => {
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

    // Get plugins using autoplayRef to prevent state change recreating EmblaCarousel
    const plugins = getPlugins();

    return {
      set current(newElement: HTMLDivElement | null) {
        if (emblaApi.current) {
          // Stop autoplay before reinitializing.
          emblaApi.current.plugins?.().autoplay?.stop();
          emblaApi.current.off('slidesInView', handleVisibilityChange);
          emblaApi.current.off('select', handleIndexChange);
          emblaApi.current.off('reInit', handleReinit);
          emblaApi.current.off('autoplay:select', handleIndexChange);

          emblaApi.current.destroy();
          emblaApi.current = null;
        }

        if (newElement) {
          const newEmblaApi = EmblaCarousel(
            // Use direct viewport if available, else fallback to container (includes Carousel controls).
            viewportRef.current ?? newElement,
            {
              ...DEFAULT_EMBLA_OPTIONS,
              ...emblaOptions.current,
            },
            plugins,
          );

          newEmblaApi.on('reInit', handleReinit);
          newEmblaApi.on('slidesInView', handleVisibilityChange);
          newEmblaApi.on('select', handleIndexChange);
          newEmblaApi.on('autoplay:select', handleIndexChange);

          emblaApi.current = newEmblaApi;
        }
      },
    };
  }, [getPlugins, handleIndexChange, handleReinit]);

  const carouselApi = React.useMemo(
    () => ({
      scrollToElement: (element: HTMLElement, jump?: boolean) => {
        const cardElements = emblaApi.current?.slideNodes();
        const groupIndexList = emblaApi.current?.internalEngine().slideRegistry ?? [];
        const cardIndex = cardElements?.indexOf(element) ?? 0;
        const groupIndex = groupIndexList.findIndex(group => {
          return group.includes(cardIndex);
        });
        const indexFocus = groupIndex ?? cardIndex;
        emblaApi.current?.scrollTo(indexFocus, jump);

        return indexFocus;
      },
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
    const plugins = getPlugins();

    emblaOptions.current = {
      startIndex: emblaOptions.current.startIndex,
      align,
      direction,
      loop,
      slidesToScroll,
      watchDrag,
      containScroll,
      duration: motionDuration,
    };

    // Stop autoplay before reinitializing.
    emblaApi.current?.plugins?.().autoplay?.stop();
    emblaApi.current?.reInit(
      {
        ...DEFAULT_EMBLA_OPTIONS,
        ...emblaOptions.current,
      },
      plugins,
    );
  }, [align, containScroll, direction, getPlugins, loop, slidesToScroll, watchDrag, motionDuration]);

  React.useEffect(() => {
    // Scroll to controlled values on update
    // If active index is out of bounds, re-init will handle instead
    const currentActiveIndex = emblaApi.current?.selectedScrollSnap() ?? 0;
    const slideLength = emblaApi.current?.slideNodes()?.length ?? 0;
    emblaOptions.current.startIndex = activeIndex;
    if (activeIndex < slideLength && activeIndex !== currentActiveIndex) {
      emblaApi.current?.scrollTo(activeIndex);
    }
  }, [activeIndex]);

  return {
    activeIndex,
    carouselApi,
    viewportRef,
    containerRef,
    subscribeForValues,
    enableAutoplay,
    resetAutoplay,
  };
}

import { EventHandler, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import EmblaCarousel, { EmblaPluginType, type EmblaCarouselType, type EmblaOptionsType } from 'embla-carousel';
import * as React from 'react';

import { carouselCardClassNames } from './CarouselCard/useCarouselCardStyles.styles';
import { carouselSliderClassNames } from './CarouselSlider/useCarouselSliderStyles.styles';
import { CarouselMotion, CarouselUpdateData, CarouselVisibilityEventDetail } from '../Carousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { CarouselIndexChangeData } from './CarouselContext.types';

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

export function setTabsterDefault(element: Element, isDefault: boolean) {
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
  },
) {
  const { align, direction, loop, slidesToScroll, watchDrag, containScroll, motion, onDragIndexChange } = options;
  const [activeIndex, setActiveIndex] = useControllableState({
    defaultState: options.defaultActiveIndex,
    state: options.activeIndex,
    initialState: 0,
  });

  const onDragEvent = useEventCallback((event: TouchEvent | MouseEvent, index: number) => {
    onDragIndexChange?.(event, { event, type: 'drag', index });
  });
  const dragEventRef = React.useRef<MouseEvent | TouchEvent | undefined>(undefined);
  const watchDragEvent = React.useCallback(
    (_emblaApi: EmblaCarouselType, event: MouseEvent | TouchEvent) => {
      // Store drag event for callback in case of index update
      dragEventRef.current = event;
      if (typeof watchDrag === 'function') {
        return watchDrag(_emblaApi, event);
      }
      return watchDrag;
    },
    [watchDrag],
  );

  React.useEffect(() => {
    // Reset on controlled index change
    dragEventRef.current = undefined;
  }, [options.activeIndex, options.defaultActiveIndex]);

  const emblaOptions = React.useRef<EmblaOptionsType>({
    align,
    direction,
    loop,
    slidesToScroll,
    startIndex: activeIndex,
    watchDrag: watchDragEvent,
    containScroll,
  });

  const emblaApi = React.useRef<EmblaCarouselType | null>(null);
  const autoplayRef = React.useRef<boolean>(false);

  const resetAutoplay = React.useCallback(() => {
    emblaApi.current?.plugins().autoplay.reset();
  }, []);

  /* Our autoplay button, which is required by standards for autoplay to be enabled, will handle controlled state */
  const enableAutoplay = React.useCallback(
    (autoplay: boolean) => {
      autoplayRef.current = autoplay;
      if (autoplay) {
        emblaApi.current?.plugins().autoplay.play();
        // Reset after play to ensure timing and any focus/mouse pause state is reset.
        resetAutoplay();
      } else {
        emblaApi.current?.plugins().autoplay.stop();
      }
    },
    [resetAutoplay],
  );

  const getPlugins = React.useCallback(() => {
    const plugins: EmblaPluginType[] = [
      Autoplay({
        playOnInit: autoplayRef.current,
        stopOnInteraction: !autoplayRef.current,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
        rootNode: (emblaRoot: HTMLElement) => {
          return emblaRoot.querySelector(sliderClassname) ?? emblaRoot;
        },
      }),
    ];

    // Optionally add Fade plugin
    if (motion === 'fade') {
      plugins.push(Fade());
    }

    return plugins;
  }, [motion]);

  // Listeners contains callbacks for UI elements that may require state update based on embla changes
  const listeners = React.useRef(new Set<(data: CarouselUpdateData) => void>());
  const subscribeForValues = React.useCallback((listener: (data: CarouselUpdateData) => void) => {
    listeners.current.add(listener);

    return () => {
      listeners.current.delete(listener);
    };
  }, []);

  const containerRef: React.RefObject<HTMLDivElement> = React.useMemo(() => {
    let currentElement: HTMLDivElement | null = null;

    const handleIndexChange = () => {
      const newIndex = emblaApi.current?.selectedScrollSnap() ?? 0;
      const slides = emblaApi.current?.slideNodes();
      const actualIndex = emblaApi.current?.internalEngine().slideRegistry[newIndex][0] ?? 0;

      if (dragEventRef.current) {
        onDragEvent(dragEventRef.current, newIndex);
        dragEventRef.current = undefined;
      }
      // We set the active or first index of group on-screen as the selected tabster index
      slides?.forEach((slide, slideIndex) => {
        setTabsterDefault(slide, slideIndex === actualIndex);
      });
      setActiveIndex(newIndex);
    };
    const handleReinit = () => {
      const nodes: HTMLElement[] = emblaApi.current?.slideNodes() ?? [];
      const groupIndexList: number[][] = emblaApi.current?.internalEngine().slideRegistry ?? [];
      const navItemsCount = groupIndexList.length > 0 ? groupIndexList.length : nodes.length;

      const data: CarouselUpdateData = {
        navItemsCount,
        activeIndex: emblaApi.current?.selectedScrollSnap() ?? 0,
        groupIndexList,
        slideNodes: nodes,
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

    const plugins = getPlugins();

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
              ...DEFAULT_EMBLA_OPTIONS,
              ...emblaOptions.current,
            },
            plugins,
          );

          emblaApi.current?.on('reInit', handleReinit);
          emblaApi.current?.on('slidesInView', handleVisibilityChange);
          emblaApi.current?.on('select', handleIndexChange);
        }
      },
    };
  }, [getPlugins, onDragEvent, setActiveIndex]);

  const carouselApi = React.useMemo(
    () => ({
      scrollToElement: (element: HTMLElement, jump?: boolean) => {
        dragEventRef.current = undefined;
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
        dragEventRef.current = undefined;
        emblaApi.current?.scrollTo(index, jump);
      },
      scrollInDirection: (dir: 'prev' | 'next') => {
        dragEventRef.current = undefined;
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
    // Scroll to controlled values on update
    const currentActiveIndex = emblaApi.current?.selectedScrollSnap() ?? 0;
    emblaOptions.current.startIndex = activeIndex;
    if (activeIndex !== currentActiveIndex) {
      emblaApi.current?.scrollTo(activeIndex);
    }
  }, [activeIndex]);

  React.useEffect(() => {
    const plugins = getPlugins();

    emblaOptions.current = {
      startIndex: emblaOptions.current.startIndex,
      align,
      direction,
      loop,
      slidesToScroll,
      watchDrag: watchDragEvent,
      containScroll,
    };
    emblaApi.current?.reInit(
      {
        ...DEFAULT_EMBLA_OPTIONS,
        ...emblaOptions.current,
      },
      plugins,
    );
  }, [align, direction, loop, slidesToScroll, watchDragEvent, containScroll, getPlugins]);

  return {
    activeIndex,
    carouselApi,
    containerRef,
    subscribeForValues,
    enableAutoplay,
    resetAutoplay,
  };
}

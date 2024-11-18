import {
  type EventHandler,
  useAnimationFrame,
  useControllableState,
  useEventCallback,
  useTimeout,
} from '@fluentui/react-utilities';
import EmblaCarousel, { EmblaPluginType, type EmblaCarouselType, type EmblaOptionsType } from 'embla-carousel';
import * as React from 'react';

import { carouselCardClassNames } from './CarouselCard/useCarouselCardStyles.styles';
import { carouselSliderClassNames } from './CarouselSlider/useCarouselSliderStyles.styles';
import { CarouselMotion, CarouselProps, CarouselUpdateData, CarouselVisibilityEventDetail } from '../Carousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { pointerEventPlugin } from './pointerEvents';
import type { CarouselIndexChangeData } from './CarouselContext.types';

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
    onAutoplayIndexChange?: CarouselProps['onAutoplayIndexChange'];
  },
) {
  const {
    align,
    direction,
    loop,
    slidesToScroll,
    watchDrag,
    containScroll,
    motion,
    onDragIndexChange,
    onAutoplayIndexChange,
  } = options;
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
  });

  const emblaApi = React.useRef<EmblaCarouselType | null>(null);
  /* We store the autoplay as both a ref and as state:
   * State: Used to trigger a re-init on the carousel engine itself
   * Ref: Used to prevent getPlugin dependencies from recreating embla carousel
   */
  const [autoplay, setAutoplay] = React.useState<boolean>(false);
  const autoplayRef = React.useRef<boolean>(false);

  const resetAutoplay = React.useCallback(() => {
    emblaApi.current?.plugins().autoplay?.reset();
  }, []);

  /* Our autoplay button, which is required by standards for autoplay to be enabled, will handle controlled state */
  const enableAutoplay = React.useCallback(
    (_autoplay: boolean) => {
      autoplayRef.current = _autoplay;
      setAutoplay(_autoplay);

      if (_autoplay) {
        emblaApi.current?.plugins().autoplay?.play();
        // Reset after play to ensure timing and any focus/mouse pause state is reset.
        resetAutoplay();
      } else {
        emblaApi.current?.plugins().autoplay?.stop();
      }
    },
    [resetAutoplay],
  );

  const getPlugins = React.useCallback(
    (initAutoplay: boolean) => {
      const plugins: EmblaPluginType[] = [];

      if (initAutoplay) {
        plugins.push(
          Autoplay({
            playOnInit: true,
            /* stopOnInteraction: false causes autoplay to restart on interaction end*/
            /* we must remove/re-add plugin on autoplay state change*/
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            stopOnFocusIn: true,
          }),
        );
      }

      // Optionally add Fade plugin
      if (motion === 'fade') {
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
    },
    [motion, onDragEvent, watchDrag],
  );

  // Listeners contains callbacks for UI elements that may require state update based on embla changes
  const listeners = React.useRef(new Set<(data: CarouselUpdateData) => void>());
  const subscribeForValues = React.useCallback((listener: (data: CarouselUpdateData) => void) => {
    listeners.current.add(listener);

    return () => {
      listeners.current.delete(listener);
    };
  }, []);

  const handleReinit = useEventCallback(() => {
    const nodes: HTMLElement[] = emblaApi.current?.slideNodes() ?? [];
    const groupIndexList: number[][] = emblaApi.current?.internalEngine().slideRegistry ?? [];
    const navItemsCount = groupIndexList.length > 0 ? groupIndexList.length : nodes.length;

    const data: CarouselUpdateData = {
      navItemsCount,
      activeIndex: emblaApi.current?.selectedScrollSnap() ?? 0,
      groupIndexList,
      slideNodes: nodes,
    };

    emblaApi.current?.scrollTo(activeIndex, false);
    for (const listener of listeners.current) {
      listener(data);
    }
  });

  const handleIndexChange = React.useCallback(() => {
    const newIndex = emblaApi.current?.selectedScrollSnap() ?? 0;
    const slides = emblaApi.current?.slideNodes();
    const actualIndex = emblaApi.current?.internalEngine().slideRegistry[newIndex][0] ?? 0;

    // We set the active or first index of group on-screen as the selected tabster index
    slides?.forEach((slide, slideIndex) => {
      setTabsterDefault(slide, slideIndex === actualIndex);
    });
    setActiveIndex(newIndex);
  }, [setActiveIndex]);

  const handleAutoplayIndexChange = useEventCallback(() => {
    handleIndexChange();
    const newIndex = emblaApi.current?.selectedScrollSnap() ?? 0;
    onAutoplayIndexChange?.(null, { event: null, type: 'autoplay', index: newIndex });
  });

  const viewportRef: React.RefObject<HTMLDivElement> = React.useRef(null);
  const currentElementRef = React.useRef<HTMLDivElement | null>();
  const containerRef: React.RefObject<HTMLDivElement> = React.useMemo(() => {
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
    const plugins = getPlugins(autoplayRef.current);

    return {
      set current(newElement: HTMLDivElement | null) {
        if (currentElementRef.current) {
          emblaApi.current?.off('slidesInView', handleVisibilityChange);
          emblaApi.current?.off('select', handleIndexChange);
          emblaApi.current?.off('reInit', handleReinit);
          emblaApi.current?.off('autoplay:select', handleAutoplayIndexChange);
          emblaApi.current?.destroy();
        }

        // Use direct viewport if available, else fallback to container (includes Carousel controls).
        const wrapperElement = viewportRef.current ?? newElement;
        currentElementRef.current = wrapperElement;
        if (wrapperElement) {
          emblaApi.current = EmblaCarousel(
            wrapperElement,
            {
              ...DEFAULT_EMBLA_OPTIONS,
              ...emblaOptions.current,
            },
            plugins,
          );

          emblaApi.current?.on('reInit', handleReinit);
          emblaApi.current?.on('slidesInView', handleVisibilityChange);
          emblaApi.current?.on('select', handleIndexChange);
          emblaApi.current?.on('autoplay:select', handleAutoplayIndexChange);
        }
      },
    };
  }, [getPlugins, handleAutoplayIndexChange, handleIndexChange, handleReinit]);

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
    // Scroll to controlled values on update
    // If active index is out of bounds, re-init will handle instead
    const currentActiveIndex = emblaApi.current?.selectedScrollSnap() ?? 0;
    const slideLength = emblaApi.current?.slideNodes()?.length ?? 0;
    emblaOptions.current.startIndex = activeIndex;
    if (activeIndex < slideLength && activeIndex !== currentActiveIndex) {
      emblaApi.current?.scrollTo(activeIndex);
    }
  }, [activeIndex]);

  React.useEffect(() => {
    // Get plugins with autoplay state to trigger re-init when nessecary
    const plugins = getPlugins(autoplay);

    emblaOptions.current = {
      startIndex: emblaOptions.current.startIndex,
      align,
      direction,
      loop,
      slidesToScroll,
      watchDrag,
      containScroll,
    };

    emblaApi.current?.reInit(
      {
        ...DEFAULT_EMBLA_OPTIONS,
        ...emblaOptions.current,
      },
      plugins,
    );
  }, [align, direction, loop, slidesToScroll, watchDrag, containScroll, getPlugins, autoplay]);

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

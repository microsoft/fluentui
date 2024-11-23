import { ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { CarouselContextValue } from './CarouselContext.types';

export const carouselContextDefaultValue: CarouselContextValue = {
  activeIndex: 0,
  selectPageByElement: () => {
    return 0;
  },
  selectPageByDirection: () => {
    return 0;
  },
  selectPageByIndex: () => {
    /** noop */
  },
  subscribeForValues: () => () => {
    /** noop */
  },
  enableAutoplay: () => {
    /** noop */
  },
  resetAutoplay: () => {
    /** noop */
  },
  circular: false,
  containerRef: undefined,
  viewportRef: undefined,
};

const CarouselContext = createContext<CarouselContextValue | undefined>(undefined);

export const CarouselProvider = CarouselContext.Provider;

export const useCarouselContext_unstable = <T>(selector: ContextSelector<CarouselContextValue, T>): T =>
  useContextSelector(CarouselContext, (ctx = carouselContextDefaultValue) => selector(ctx));

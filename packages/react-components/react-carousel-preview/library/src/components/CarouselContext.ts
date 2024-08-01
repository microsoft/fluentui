import { ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import type { CarouselContextValue } from './CarouselContext.types';

export const carouselContextDefaultValue: CarouselContextValue = {
  activeIndex: 0,
  selectPageByDirection: () => {
    /** noop */
  },
  selectPageByIndex: () => {
    /** noop */
  },
  subscribeForValues: () => () => {
    /** noop */
  },
  circular: false,
};

const CarouselContext = createContext<CarouselContextValue | undefined>(undefined);

export const CarouselProvider = CarouselContext.Provider;

export const useCarouselContext_unstable = <T>(selector: ContextSelector<CarouselContextValue, T>): T =>
  useContextSelector(CarouselContext, (ctx = carouselContextDefaultValue) => selector(ctx));

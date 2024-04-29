import { type Context, ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';

import { createCarouselStore } from './createCarouselStore';
import { CarouselState } from '../Carousel';
import { CarouselContextValue, CarouselContextValues } from './CarouselContext.types';

export const carouselContextDefaultValue: CarouselContextValue = {
  store: createCarouselStore(),
  value: null,
  selectPageByDirection: () => {
    /** noop */
  },
  selectPageByValue: () => {
    /** noop */
  },
};

const CarouselContext: Context<CarouselContextValue> = createContext<CarouselContextValue | undefined>(
  undefined,
) as Context<CarouselContextValue>;

export const CarouselProvider = CarouselContext.Provider;

export const useCarouselContext_unstable = <T>(selector: ContextSelector<CarouselContextValue, T>): T =>
  useContextSelector(CarouselContext, (ctx = carouselContextDefaultValue) => selector(ctx));

export function useCarouselContextValues_unstable(state: CarouselState): CarouselContextValues {
  const { store, value, selectPageByDirection, selectPageByValue } = state;

  // This context is created with "@fluentui/react-context-selector", these is no sense to memoize it
  const carousel = {
    store,
    value,
    selectPageByDirection,
    selectPageByValue,
  };

  return { carousel };
}

import { Context, ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import { EventHandler } from '@fluentui/react-utilities';
import { CarouselPageChangeData, CarouselStore } from './Carousel.types';

import { createCarouselStore } from './createCarouselStore';

export type CarouselContextValue = {
  store: CarouselStore;
  value: string;
  setValue: (value: string) => void;
  onPageChange?: EventHandler<CarouselPageChangeData>;
};

export const carouselContextDefaultValue: CarouselContextValue = {
  store: createCarouselStore(),
  value: '',
  setValue: () => {},
  onPageChange: () => null,
};

export const CarouselContext: Context<CarouselContextValue> = createContext<CarouselContextValue | undefined>(
  undefined,
) as Context<CarouselContextValue>;

export const CarouselProvider = CarouselContext.Provider;

export const useCarouselContext_unstable = <T>(selector: ContextSelector<CarouselContextValue, T>): T =>
  useContextSelector(CarouselContext, (ctx = carouselContextDefaultValue) => selector(ctx));

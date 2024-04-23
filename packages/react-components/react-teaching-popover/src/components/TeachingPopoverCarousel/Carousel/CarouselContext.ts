import { type Context, ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import * as React from 'react';

import type { CarouselStore } from './Carousel.types';
import { createCarouselStore } from './createCarouselStore';

export type CarouselContextValue = {
  store: CarouselStore;
  value: string | null;
  selectPageByDirection: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    direction: 'next' | 'prev',
  ) => void;
  selectPageByValue: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, value: string) => void;
};

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

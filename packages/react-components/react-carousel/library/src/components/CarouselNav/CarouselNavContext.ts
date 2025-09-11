import * as React from 'react';
import type { CarouselNavContextValue, CarouselNavState } from './CarouselNav.types';

const carouselNavContext = React.createContext<CarouselNavContextValue | undefined>(undefined);

export const carouselNavContextDefaultValue: CarouselNavContextValue = {
  appearance: undefined,
};

export const useCarouselNavContext = (): CarouselNavContextValue =>
  React.useContext(carouselNavContext) ?? carouselNavContextDefaultValue;

export const CarouselNavContextProvider = carouselNavContext.Provider;

/**
 * Context shared between CarouselNav and its children components
 */
export type CarouselNavContextValues = {
  carouselNav: CarouselNavContextValue;
};

export function useCarouselNavContextValues_unstable(state: CarouselNavState): CarouselNavContextValues {
  const { appearance } = state;
  const carouselNav = React.useMemo(() => ({ appearance }), [appearance]);

  return { carouselNav };
}

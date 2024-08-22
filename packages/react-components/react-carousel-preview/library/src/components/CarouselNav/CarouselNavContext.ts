import * as React from 'react';
import { CarouselNavContextValue, CarouselNavState } from './CarouselNav.types';

const carouselNavContext = React.createContext<CarouselNavContextValue | undefined>(undefined);

export const carouselNavContextDefaultValue: CarouselNavContextValue = {
  index: 0,
  appearance: undefined,
};

export const useCarouselNavContext = () => React.useContext(carouselNavContext) ?? carouselNavContextDefaultValue;

export const CarouselNavContextProvider = carouselNavContext.Provider;

/**
 * Context shared between CarouselNav and its children components
 */
export type CarouselNavContextValues = {
  carouselNav: CarouselNavContextValue;
};

export function useCarouselNavContextValues_unstable(state: CarouselNavState): CarouselNavContextValues {
  const { appearance } = state;

  const carouselNav = React.useMemo(
    () => ({
      index: 0,
      appearance,
    }),
    [appearance],
  );

  return { carouselNav };
}

import * as React from 'react';
import { CarouselSliderContextValue, CarouselSliderState } from './CarouselSlider.types';

const carouselSliderContext = React.createContext<CarouselSliderContextValue | undefined>(undefined);

export const carouselSliderContextDefaultValue: CarouselSliderContextValue = {
  cardFocus: false,
};

export const useCarouselSliderContext = (): CarouselSliderContextValue =>
  React.useContext(carouselSliderContext) ?? carouselSliderContextDefaultValue;

export const CarouselSliderContextProvider = carouselSliderContext.Provider;

/**
 * Context shared between CarouselSlider and its children components
 */
export type CarouselSliderContextValues = {
  carouselSlider: CarouselSliderContextValue;
};

export function useCarouselSliderContextValues_unstable(state: CarouselSliderState): CarouselSliderContextValues {
  const { cardFocus } = state;
  const carouselSlider = React.useMemo(
    () => ({
      cardFocus,
    }),
    [cardFocus],
  );

  return { carouselSlider };
}

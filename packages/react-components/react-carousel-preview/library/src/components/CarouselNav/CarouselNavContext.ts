import * as React from 'react';
import { CarouselNavContextValue } from './CarouselNav.types';

const carouselNavContext = React.createContext<CarouselNavContextValue | undefined>(undefined);

export const carouselNavContextDefaultValue: CarouselNavContextValue = {
  index: 0,
  appearance: undefined,
};

export const useCarouselNavContext = () => React.useContext(carouselNavContext) ?? carouselNavContextDefaultValue;

export const CarouselNavContextProvider = carouselNavContext.Provider;

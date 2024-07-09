import * as React from 'react';

import { CarouselSliderContextValue } from './CarouselContext.types';

export const carouselSliderContextDefaultValue: CarouselSliderContextValue = {
  carouselSliderRef: undefined,
};

const CarouselSliderContext = React.createContext<CarouselSliderContextValue | undefined>(undefined);

export const CarouselSliderProvider = CarouselSliderContext.Provider;

export const useCarouselSliderContext_unstable = () =>
  React.useContext(CarouselSliderContext) ?? carouselSliderContextDefaultValue;

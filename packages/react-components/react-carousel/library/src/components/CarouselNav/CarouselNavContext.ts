'use client';

import * as React from 'react';
import type { CarouselNavContextValue } from './CarouselNav.types';

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

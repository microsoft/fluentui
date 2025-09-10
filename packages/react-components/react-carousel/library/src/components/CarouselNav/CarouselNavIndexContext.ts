import * as React from 'react';

const carouselNavIndexContext = React.createContext<number | undefined>(undefined);

export const carouselNavIndexContextDefaultValue: number = 0;

export const useCarouselNavIndexContext = (): number =>
  React.useContext(carouselNavIndexContext) ?? carouselNavIndexContextDefaultValue;

export const CarouselNavIndexContextProvider = carouselNavIndexContext.Provider;

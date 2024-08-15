import * as React from 'react';

const carouselNavContext = React.createContext<number | undefined>(undefined);

export const carouselNavContextDefaultValue = 0;

export const useCarouselNavContext = () => React.useContext(carouselNavContext) ?? carouselNavContextDefaultValue;

export const CarouselNavContextProvider = carouselNavContext.Provider;

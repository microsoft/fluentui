import * as React from 'react';

const carouselNavContext = React.createContext<string | undefined>(undefined);

export const carouselNavContextDefaultValue = '';

export const useCarouselNavContext = () => React.useContext(carouselNavContext) ?? carouselNavContextDefaultValue;

export const CarouselNavContextProvider = carouselNavContext.Provider;

import * as React from 'react';
import { type CarouselWalker } from './useCarouselWalker';

export type CarouselWalkerContextValue = CarouselWalker;

export const carouselWalkerContextDefaultValue: CarouselWalkerContextValue = {
  find: () => null,
  nextPage: () => null,
  prevPage: () => null,
  active: () => null,
};

export const CarouselWalkerContext = React.createContext<CarouselWalkerContextValue | undefined>(undefined);

export const CarouselWalkerProvider = CarouselWalkerContext.Provider;

export const useCarouselWalkerContext_unstable = <T>(): CarouselWalker =>
  React.useContext(CarouselWalkerContext) ?? carouselWalkerContextDefaultValue;

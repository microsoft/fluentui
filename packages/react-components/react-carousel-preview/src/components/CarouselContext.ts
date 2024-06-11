import * as React from 'react';

import { createCarouselStore } from './createCarouselStore';
import { CarouselContextValue } from './CarouselContext.types';

export const carouselContextDefaultValue: CarouselContextValue = {
  store: createCarouselStore(null),
  selectPageByDirection: () => {
    /** noop */
  },
  selectPageByValue: () => {
    /** noop */
  },
  circular: false,
  peeking: false,
};

const CarouselContext = React.createContext<CarouselContextValue | undefined>(undefined);

export const CarouselProvider = CarouselContext.Provider;

export const useCarouselContext_unstable = () => React.useContext(CarouselContext) ?? carouselContextDefaultValue;

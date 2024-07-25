import * as React from 'react';
import { EventData } from '@fluentui/react-utilities';
import { CarouselReinitData } from '../Carousel';

export type CarouselStore = {
  setActiveIndex: (newValue: number) => void;
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => {
    activeIndex: number;
  };
};

export type CarouselValueChangeData = EventData<'click', React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>> & {
  /**
   * The value to be set after event has occurred.
   */
  value?: number;
};

export type CarouselContextValue = {
  store: CarouselStore;
  selectPageByDirection: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    direction: 'next' | 'prev',
  ) => void;
  selectPageByIndex: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    value: number,
    jump?: boolean,
  ) => void;
  subscribeForValues: (listener: (data: CarouselReinitData) => void) => () => void;
  circular: boolean;
};

/**
 * Context shared between Carousel and its children components
 */
export type CarouselContextValues = {
  carousel: CarouselContextValue;
};

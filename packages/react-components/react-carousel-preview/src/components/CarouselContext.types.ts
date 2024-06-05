import * as React from 'react';
import { EventData } from '@fluentui/react-utilities';

export type CarouselStore = {
  setActiveValue: (newValue: string | null) => void;

  clearValues: () => void;
  addValue: (value: string) => void;
  insertValue: (value: string, prev: string | null) => void;
  removeValue: (value: string) => void;
  subscribe: (listener: () => void) => () => void;

  getSnapshot: () => {
    activeValue: string | null;
    values: string[];
  };
};

export type CarouselItem = {
  el: HTMLElement;
  value: string | null;
};

export type CarouselValueChangeData = EventData<'click', React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>> & {
  /**
   * The value to be set after event has occurred.
   */
  value?: string;
};

export type CarouselContextValue = {
  store: CarouselStore;
  selectPageByDirection: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    direction: 'next' | 'prev',
  ) => void;
  selectPageByValue: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, value: string) => void;
  circular?: Boolean;
  peeking?: Boolean;
};

/**
 * Context shared between Carousel and its children components
 */
export type CarouselContextValues = {
  carousel: CarouselContextValue;
};

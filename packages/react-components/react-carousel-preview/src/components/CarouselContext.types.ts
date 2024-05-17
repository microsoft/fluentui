import * as React from 'react';
import { EventData } from '@fluentui/react-utilities';

export type CarouselStore = {
  clear: () => void;
  addValue: (value: string) => void;
  insertValue: (value: string, prev: string | null) => void;
  removeValue: (value: string) => void;
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => string[];
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
  value: string | null;
  selectPageByDirection: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    direction: 'next' | 'prev',
  ) => void;
  selectPageByValue: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, value: string) => void;
};

/**
 * Context shared between Carousel and its children components
 */
export type CarouselContextValues = {
  carousel: CarouselContextValue;
};

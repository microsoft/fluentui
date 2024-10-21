import type { EventData } from '@fluentui/react-utilities';
import * as React from 'react';

import type { CarouselUpdateData } from '../Carousel';

export type CarouselIndexChangeData = EventData<
  'click' | 'focus' | 'drag',
  TouchEvent | MouseEvent | React.FocusEvent | React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
> & {
  /**
   * The index to be set after event has occurred.
   */
  index: number;
};

export type CarouselContextValue = {
  activeIndex: number;
  circular: boolean;
  selectPageByElement: (event: React.FocusEvent, element: HTMLElement, jump?: boolean) => number;
  selectPageByDirection: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    direction: 'next' | 'prev',
  ) => number;
  selectPageByIndex: (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    value: number,
    jump?: boolean,
  ) => void;
  subscribeForValues: (listener: (data: CarouselUpdateData) => void) => () => void;
  enableAutoplay: (autoplay: boolean) => void;
  resetAutoplay: () => void;
  containerRef?: React.RefObject<HTMLDivElement>;
};

/**
 * Context shared between Carousel and its children components
 */
export type CarouselContextValues = {
  carousel: CarouselContextValue;
};

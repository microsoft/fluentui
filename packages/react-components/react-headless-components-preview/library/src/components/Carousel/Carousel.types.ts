import type * as React from 'react';
import type { ComponentProps, ComponentState, EventData, EventHandler, Slot } from '@fluentui/react-utilities';
import type { CarouselContextValue } from './carouselContext';

export type CarouselSlots = {
  /** The labeled `role="region"` container. */
  root: Slot<'div'>;
};

/** A zero-based group selection, not an individual slide index. */
export type CarouselIndexChangeData = EventData<'select', React.SyntheticEvent | Event> & {
  index: number;
  reason: 'previous' | 'next' | 'nav' | 'autoplay';
};

/**
 * The region needs a name: the collection, like "Upcoming meetings", rather than the word "carousel". Either prop
 * is required; `Slot<'div'>` alone would leave both optional.
 */
export type CarouselName = { 'aria-label': string } | { 'aria-labelledby': string };

export type CarouselProps = ComponentProps<CarouselSlots> &
  CarouselName & {
    /** Number of slides shown together. The last group can contain fewer slides. Defaults to 1. */
    groupSize?: 1 | 2 | 3 | 4;
    /** Controlled zero-based group index. */
    activeIndex?: number;
    defaultActiveIndex?: number;
    onActiveIndexChange?: EventHandler<CarouselIndexChangeData>;
    /** Wrap sequential navigation and playback. Defaults to false. */
    circular?: boolean;
    /** Integer milliseconds between settled groups, from 1000 to 2147483647. Defaults to 4000. */
    autoplayInterval?: number;
    /** Localize a one-based group position. Defaults to "Page 1 of 3". */
    getPageLabel?: (position: number, total: number) => string;
    /** Localize a one-based slide position. Defaults to "Slide 1 of 5". */
    getSlideLabel?: (position: number, total: number) => string;
  };

export type CarouselState = ComponentState<CarouselSlots> &
  CarouselContextValue & {
    root: {
      'data-paged'?: string;
      'data-playing'?: string;
      'data-circular'?: string;
    };
  };

export type CarouselContextValues = {
  carousel: CarouselContextValue;
};

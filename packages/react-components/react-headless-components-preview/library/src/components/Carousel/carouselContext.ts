'use client';

import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

/** Compound parts whose presence changes how the collection behaves. */
export type CarouselPart = 'previous' | 'next' | 'nav' | 'autoplay';

export type CarouselContextValue = {
  idPrefix: string;
  viewportId: string;
  viewportRef: React.RefObject<HTMLDivElement | null>;
  groupSize: 1 | 2 | 3 | 4;
  slideCount: number;
  pageCount: number;
  /** Zero-based selected group. */
  activeIndex: number;
  /** Group playing its exit transition, if any. */
  outgoingIndex: number | undefined;
  /** True while a group transition is unsettled. */
  busy: boolean;
  /**
   * More than one group, with controls that reach every group: a `CarouselNav`, both Previous and Next, or one of
   * them in a circular collection. Otherwise static.
   */
  paged: boolean;
  /** Paged, with `CarouselPrevious`/`CarouselNext` rendered. */
  buttons: boolean;
  /** Paged, with `CarouselNav` rendered. */
  nav: boolean;
  /** Paged, with `CarouselAutoplayButton` rendered. */
  autoplay: boolean;
  playing: boolean;
  reducedMotion: boolean;
  previousUnavailable: boolean;
  nextUnavailable: boolean;
  /** Unavailable and no longer needed as a focus anchor for a running transition. */
  previousHidden: boolean;
  nextHidden: boolean;
  getPageLabel: (position: number, total: number) => string;
  getSlideLabel: (position: number, total: number) => string;
  /** Announces that a part is rendered. Returns the matching cleanup. */
  register: (part: CarouselPart) => () => void;
  setSlideCount: (count: number) => void;
  select: (index: number, event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
  previous: (event: React.MouseEvent<HTMLElement>) => void;
  next: (event: React.MouseEvent<HTMLElement>) => void;
  toggleAutoplay: (event: React.MouseEvent<HTMLElement>) => void;
  /** Handles arrow, Home and End keys on the tab at zero-based `index`. */
  onNavKeyDown: (event: React.KeyboardEvent<HTMLElement>, index: number) => void;
};

const noop = () => undefined;
const label = (position: number, total: number) => `${position} of ${total}`;

const defaultCarouselContextValue: CarouselContextValue = {
  idPrefix: '',
  viewportId: '',
  viewportRef: { current: null },
  groupSize: 1,
  slideCount: 0,
  pageCount: 0,
  activeIndex: 0,
  outgoingIndex: undefined,
  busy: false,
  paged: false,
  buttons: false,
  nav: false,
  autoplay: false,
  playing: false,
  reducedMotion: false,
  previousUnavailable: true,
  nextUnavailable: true,
  previousHidden: true,
  nextHidden: true,
  getPageLabel: label,
  getSlideLabel: label,
  register: () => noop,
  setSlideCount: noop,
  select: noop,
  previous: noop,
  next: noop,
  toggleAutoplay: noop,
  onNavKeyDown: noop,
};

export const CarouselContext = React.createContext<CarouselContextValue | undefined>(undefined);

export const useCarouselContext = (): CarouselContextValue =>
  React.useContext(CarouselContext) ?? defaultCarouselContextValue;

/** Zero-based position of a generated item (a slide inside the viewport, or a button inside `CarouselNav`). */
export const CarouselItemIndexContext = React.createContext<number | undefined>(undefined);

export const useCarouselItemIndex = (): number => React.useContext(CarouselItemIndexContext) ?? 0;

/**
 * Number of slides, provided by `CarouselViewport` while it renders. Unlike the root's `slideCount`, which the
 * viewport reports in a layout effect, it is known during the server render.
 */
export const CarouselSlideCountContext = React.createContext<number | undefined>(undefined);

/** Registers a compound part for as long as it is mounted. */
export const useCarouselPart = (part: CarouselPart): void => {
  const { register } = useCarouselContext();
  useIsomorphicLayoutEffect(() => register(part), [register, part]);
};

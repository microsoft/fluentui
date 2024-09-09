import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TeachingPopoverCarouselPageCountSlots = {
  root: Slot<'div'>;
};

export type TeachingPopoverCarouselPageCountRenderFunction = (
  currentPage: number,
  totalPages: number,
) => React.ReactNode;

/**
 * TeachingPopoverCarouselPageCount Props
 */
export type TeachingPopoverCarouselPageCountProps = Omit<
  ComponentProps<Partial<TeachingPopoverCarouselPageCountSlots>>,
  'children'
> & {
  children: TeachingPopoverCarouselPageCountRenderFunction;
};

/**
 * State used in rendering TeachingPopoverCarouselPageCount
 */
export type TeachingPopoverCarouselPageCountState = ComponentState<TeachingPopoverCarouselPageCountSlots> & {
  currentIndex: number;

  totalPages: number;

  renderPageCount: TeachingPopoverCarouselPageCountRenderFunction;
};

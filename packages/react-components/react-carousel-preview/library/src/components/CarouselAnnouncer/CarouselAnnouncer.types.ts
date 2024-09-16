import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import * as React from 'react';

export type CarouselAnnouncerSlots = {
  root: Slot<'div'>;
};

export type AnnouncerIndexRenderFunction = (
  index: number,
  totalSlides: number,
  slideGroupList: number[][],
) => React.ReactNode;
/**
 * CarouselAnnouncer Props
 */
export type CarouselAnnouncerProps = Omit<ComponentProps<Partial<CarouselAnnouncerSlots>>, 'children'> & {
  children: AnnouncerIndexRenderFunction;
};

/**
 * State used in rendering CarouselAnnouncer
 */
export type CarouselAnnouncerState = ComponentState<CarouselAnnouncerSlots> & {
  /**
   * The function that will render nav items based on total slides and their index.
   */
  renderAnnouncerChild: AnnouncerIndexRenderFunction;

  /**
   * The total number of slides passed in from carousel context.
   */
  totalSlides: number;

  /**
   * The current index passed in from carousel context.
   */
  currentIndex: number;

  /**
   * The list of cards in each slide based on index.
   */
  slideGroupList: number[][];
};

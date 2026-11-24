import type * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CarouselViewportSlots = {
  /** Clips the groups. Each direct child is one slide, usually a `CarouselCard`. */
  root: Slot<'div'>;
};

export type CarouselViewportProps = ComponentProps<CarouselViewportSlots>;

export type CarouselViewportState = ComponentState<CarouselViewportSlots> & {
  root: {
    'data-group-size': 1 | 2 | 3 | 4;
    'data-paged'?: string;
    'data-buttons'?: string;
    'data-nav'?: string;
    'data-transitioning'?: string;
  };
  /** Slides split into groups. The last group can be partially filled. */
  pages: React.ReactNode[][];
  idPrefix: string;
  groupSize: 1 | 2 | 3 | 4;
  activeIndex: number;
  outgoingIndex: number | undefined;
  paged: boolean;
  nav: boolean;
  getPageLabel: (position: number, total: number) => string;
};

import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CarouselSlots = {
  root: Slot<'div'>;
};

/**
 * Carousel Props
 */
export type CarouselProps = ComponentProps<CarouselSlots> & {};

/**
 * State used in rendering Carousel
 */
export type CarouselState = ComponentState<CarouselSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from CarouselProps.
// & Required<Pick<CarouselProps, 'propName'>>

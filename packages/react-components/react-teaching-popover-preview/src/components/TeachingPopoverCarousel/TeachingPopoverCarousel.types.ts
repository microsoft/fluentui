import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TeachingPopoverCarouselSlots = {
  root: Slot<'div'>;
};

/**
 * TeachingPopoverCarousel Props
 */
export type TeachingPopoverCarouselProps = ComponentProps<TeachingPopoverCarouselSlots> & {};

/**
 * State used in rendering TeachingPopoverCarousel
 */
export type TeachingPopoverCarouselState = ComponentState<TeachingPopoverCarouselSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from TeachingPopoverCarouselProps.
// & Required<Pick<TeachingPopoverCarouselProps, 'propName'>>

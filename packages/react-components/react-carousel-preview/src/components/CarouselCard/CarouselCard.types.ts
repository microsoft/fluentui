import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CarouselCardSlots = {
  root: Slot<'div'>;
};

/**
 * CarouselCard Props
 */
export type CarouselCardProps = ComponentProps<CarouselCardSlots> & {};

/**
 * State used in rendering CarouselCard
 */
export type CarouselCardState = ComponentState<CarouselCardSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from CarouselCardProps.
// & Required<Pick<CarouselCardProps, 'propName'>>

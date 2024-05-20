import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CarouselFooterSlots = {
  root: Slot<'div'>;
};

/**
 * CarouselFooter Props
 */
export type CarouselFooterProps = ComponentProps<CarouselFooterSlots> & {};

/**
 * State used in rendering CarouselFooter
 */
export type CarouselFooterState = ComponentState<CarouselFooterSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from CarouselFooterProps.
// & Required<Pick<CarouselFooterProps, 'propName'>>

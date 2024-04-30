import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CarouselNavSlots = {
  root: Slot<'div'>;
};

/**
 * CarouselNav Props
 */
export type CarouselNavProps = ComponentProps<CarouselNavSlots> & {};

/**
 * State used in rendering CarouselNav
 */
export type CarouselNavState = ComponentState<CarouselNavSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from CarouselNavProps.
// & Required<Pick<CarouselNavProps, 'propName'>>

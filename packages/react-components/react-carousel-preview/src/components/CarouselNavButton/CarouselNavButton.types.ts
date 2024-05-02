import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CarouselNavButtonSlots = {
  root: Slot<'div'>;
};

/**
 * CarouselNavButton Props
 */
export type CarouselNavButtonProps = ComponentProps<CarouselNavButtonSlots> & {};

/**
 * State used in rendering CarouselNavButton
 */
export type CarouselNavButtonState = ComponentState<CarouselNavButtonSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from CarouselNavButtonProps.
// & Required<Pick<CarouselNavButtonProps, 'propName'>>

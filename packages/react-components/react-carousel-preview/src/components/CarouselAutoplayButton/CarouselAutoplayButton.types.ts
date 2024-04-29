import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CarouselAutoplayButtonSlots = {
  root: Slot<'div'>;
};

/**
 * CarouselAutoplayButton Props
 */
export type CarouselAutoplayButtonProps = ComponentProps<CarouselAutoplayButtonSlots> & {};

/**
 * State used in rendering CarouselAutoplayButton
 */
export type CarouselAutoplayButtonState = ComponentState<CarouselAutoplayButtonSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from CarouselAutoplayButtonProps.
// & Required<Pick<CarouselAutoplayButtonProps, 'propName'>>

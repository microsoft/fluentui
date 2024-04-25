import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CarouselButtonSlots = {
  root: Slot<'div'>;
};

/**
 * CarouselButton Props
 */
export type CarouselButtonProps = ComponentProps<CarouselButtonSlots> & {};

/**
 * State used in rendering CarouselButton
 */
export type CarouselButtonState = ComponentState<CarouselButtonSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from CarouselButtonProps.
// & Required<Pick<CarouselButtonProps, 'propName'>>

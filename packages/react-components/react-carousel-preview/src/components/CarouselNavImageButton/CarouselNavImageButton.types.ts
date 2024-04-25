import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CarouselNavImageButtonSlots = {
  root: Slot<'div'>;
};

/**
 * CarouselNavImageButton Props
 */
export type CarouselNavImageButtonProps = ComponentProps<CarouselNavImageButtonSlots> & {};

/**
 * State used in rendering CarouselNavImageButton
 */
export type CarouselNavImageButtonState = ComponentState<CarouselNavImageButtonSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from CarouselNavImageButtonProps.
// & Required<Pick<CarouselNavImageButtonProps, 'propName'>>

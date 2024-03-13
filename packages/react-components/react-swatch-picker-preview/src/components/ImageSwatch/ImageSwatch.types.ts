import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ImageSwatchSlots = {
  root: Slot<'div'>;
};

/**
 * ImageSwatch Props
 */
export type ImageSwatchProps = ComponentProps<ImageSwatchSlots> & {};

/**
 * State used in rendering ImageSwatch
 */
export type ImageSwatchState = ComponentState<ImageSwatchSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from ImageSwatchProps.
// & Required<Pick<ImageSwatchProps, 'propName'>>

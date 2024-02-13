import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ColorSwatchSlots = {
  root: Slot<'div'>;
};

/**
 * ColorSwatch Props
 */
export type ColorSwatchProps = ComponentProps<ColorSwatchSlots> & {};

/**
 * State used in rendering ColorSwatch
 */
export type ColorSwatchState = ComponentState<ColorSwatchSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from ColorSwatchProps.
// & Required<Pick<ColorSwatchProps, 'propName'>>

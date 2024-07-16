import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ColorAreaSlots = {
  root: Slot<'div'>;
};

/**
 * ColorArea Props
 */
export type ColorAreaProps = ComponentProps<ColorAreaSlots> & {};

/**
 * State used in rendering ColorArea
 */
export type ColorAreaState = ComponentState<ColorAreaSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from ColorAreaProps.
// & Required<Pick<ColorAreaProps, 'propName'>>

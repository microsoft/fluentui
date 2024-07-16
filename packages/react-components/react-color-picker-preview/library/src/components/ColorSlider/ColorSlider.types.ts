import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ColorSliderSlots = {
  root: Slot<'div'>;
};

/**
 * ColorSlider Props
 */
export type ColorSliderProps = ComponentProps<ColorSliderSlots> & {};

/**
 * State used in rendering ColorSlider
 */
export type ColorSliderState = ComponentState<ColorSliderSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from ColorSliderProps.
// & Required<Pick<ColorSliderProps, 'propName'>>

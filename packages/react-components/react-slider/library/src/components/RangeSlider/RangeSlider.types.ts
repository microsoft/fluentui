import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type RangeSliderSlots = {
  root: Slot<'div'>;
};

/**
 * RangeSlider Props
 */
export type RangeSliderProps = ComponentProps<RangeSliderSlots> & {};

/**
 * State used in rendering RangeSlider
 */
export type RangeSliderState = ComponentState<RangeSliderSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from RangeSliderProps.
// & Required<Pick<RangeSliderProps, 'propName'>>

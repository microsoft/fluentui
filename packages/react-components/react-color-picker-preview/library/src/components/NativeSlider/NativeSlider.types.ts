import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type NativeSliderSlots = {
  root: Slot<'div'>;
};

/**
 * NativeSlider Props
 */
export type NativeSliderProps = ComponentProps<NativeSliderSlots> & {};

/**
 * State used in rendering NativeSlider
 */
export type NativeSliderState = ComponentState<NativeSliderSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from NativeSliderProps.
// & Required<Pick<NativeSliderProps, 'propName'>>

import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type AlphaSliderSlots = {
  root: Slot<'div'>;
};

/**
 * AlphaSlider Props
 */
export type AlphaSliderProps = ComponentProps<AlphaSliderSlots> & {};

/**
 * State used in rendering AlphaSlider
 */
export type AlphaSliderState = ComponentState<AlphaSliderSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from AlphaSliderProps.
// & Required<Pick<AlphaSliderProps, 'propName'>>

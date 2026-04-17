import type { SliderSlots as SliderBaseSlots, SliderBaseProps, SliderBaseState } from '@fluentui/react-slider';

/**
 * Slider component slots
 */
export type SliderSlots = SliderBaseSlots;

/**
 * Slider component props
 */
export type SliderProps = SliderBaseProps;

/**
 * Slider component state
 */
export type SliderState = SliderBaseState & {
  root: {
    /**
     * Data attribute set when the slider is disabled.
     */
    'data-disabled'?: string;

    /**
     * Data attribute set when the slider is oriented vertically.
     */
    'data-vertical'?: string;
  };
};

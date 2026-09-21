import type { SliderBaseState } from '@fluentui/react-slider';

export type { SliderSlots, SliderBaseProps as SliderProps } from '@fluentui/react-slider';

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

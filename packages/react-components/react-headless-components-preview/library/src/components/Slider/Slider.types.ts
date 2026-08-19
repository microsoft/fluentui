import type { SliderBaseState } from '@fluentui/react-slider';

export type { SliderSlots, SliderBaseProps as SliderProps } from '@fluentui/react-slider';

/**
 * Slider component state
 */
export type SliderState = SliderBaseState & {
  root: {
    /**
     * Present when disabled; omitted otherwise.
     */
    'data-disabled'?: string;

    /**
     * Present when oriented vertically; omitted when oriented horizontally.
     */
    'data-vertical'?: string;
  };
};

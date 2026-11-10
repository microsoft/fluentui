import type { RangeSliderBaseState } from '@fluentui/react-range-slider-preview';

export type {
  RangeSliderBaseProps as RangeSliderProps,
  RangeSliderOnChangeData,
  RangeSliderSlots,
  RangeSliderValue,
} from '@fluentui/react-range-slider-preview';

/**
 * Data attributes of the `startThumb` and `endThumb` slots.
 */
export type RangeSliderThumbDataAttributes = {
  /**
   * Set when the thumb is disabled.
   */
  'data-disabled'?: string;

  /**
   * Set on the thumb drawn on top when the thumbs overlap.
   */
  'data-active'?: string;
};

/**
 * RangeSlider component state
 */
export type RangeSliderState = RangeSliderBaseState & {
  root: {
    /**
     * Set when the RangeSlider is disabled.
     */
    'data-disabled'?: string;

    /**
     * Set when the RangeSlider is vertical.
     */
    'data-vertical'?: string;
  };
  startThumb: RangeSliderThumbDataAttributes;
  endThumb: RangeSliderThumbDataAttributes;
};

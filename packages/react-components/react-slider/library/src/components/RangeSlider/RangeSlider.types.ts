import * as React from 'react';
import type { ComponentProps, ComponentState, EventData, EventHandler, Slot } from '@fluentui/react-utilities';

export type RangeSliderValue = {
  /**
   * Lower value for the range.
   */
  start: number;

  /**
   * Upper value for the range.
   */
  end: number;
};

export type RangeSliderOnChangeData = EventData<'change', React.ChangeEvent<HTMLInputElement>> & {
  value: RangeSliderValue;
};

export type RangeSliderSlots = {
  /**
   * The root of the RangeSlider.
   * The root slot receives the `className` and `style` specified directly on the `<RangeSlider>`.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * The RangeSlider's base. It is used to display the currently selected range.
   */
  rail: NonNullable<Slot<'div'>>;

  /**
   * Visual-only thumb that represents the minimum value. Focus and interaction come from the nested input.
   */
  startThumb: NonNullable<Slot<'div'>>;

  /**
   * Visual-only thumb that represents the maximum value. Focus and interaction come from the nested input.
   */
  endThumb: NonNullable<Slot<'div'>>;

  /**
   * Visually hidden `<input type="range">` that owns the lower value for accessibility and forms.
   */
  startInput: NonNullable<Slot<'input'>> & {
    /**
     * Orient is a non standard attribute that allows for vertical orientation in Firefox. It is set internally
     * when `vertical` is set to true.
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range#non_standard_attributes
     * Webkit/Chromium support for vertical inputs is provided via -webkit-appearance css property
     */
    orient?: 'horizontal' | 'vertical';
  };

  /**
   * Visually hidden `<input type="range">` that owns the upper value for accessibility and forms.
   */
  endInput: NonNullable<Slot<'input'>> & {
    /**
     * Orient is a non standard attribute that allows for vertical orientation in Firefox. It is set internally
     * when `vertical` is set to true.
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range#non_standard_attributes
     * Webkit/Chromium support for vertical inputs is provided via -webkit-appearance css property
     */
    orient?: 'horizontal' | 'vertical';
  };
};

export type RangeSliderProps = Omit<
  ComponentProps<Partial<RangeSliderSlots>, 'startInput' | 'endInput'>,
  'defaultValue' | 'onChange' | 'size' | 'value'
> & {
  /**
   * The starting value for an uncontrolled RangeSlider.
   */
  defaultValue?: RangeSliderValue;

  /**
   * Whether the RangeSlider is disabled.
   */
  disabled?: boolean;

  /**
   * Maximum slider value.
   * @default 100
   */
  max?: number;

  /**
   * Minimum slider value.
   * @default 0
   */
  min?: number;

  /**
   * Size of the slider.
   * @default 'medium'
   */
  size?: 'small' | 'medium';

  /**
   * Step amount the slider will change by when moved.
   * @default 1
   */
  step?: number;

  /**
   * Controlled value for the RangeSlider.
   */
  value?: RangeSliderValue;

  /**
   * Render the RangeSlider vertically with the smallest value at the bottom.
   */
  vertical?: boolean;

  /**
   * Fires when the slider values change.
   */
  onChange?: EventHandler<RangeSliderOnChangeData>;
};

export type RangeSliderState = ComponentState<RangeSliderSlots> &
  Pick<RangeSliderProps, 'disabled' | 'size' | 'vertical'> & {
    value: RangeSliderValue;

    /**
     * Tracks which thumb was last interacted with. When thumbs overlap,
     * this determines which thumb is visually elevated and receives pointer events.
     * @default 'start'
     */
    activeThumb: 'start' | 'end';
  };

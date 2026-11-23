import type * as React from 'react';
import type { ComponentProps, ComponentState, EventData, EventHandler, Slot } from '@fluentui/react-utilities';

export type RangeSliderValue = {
  /**
   * The smaller end of the selected range.
   */
  start: number;

  /**
   * The larger end of the selected range.
   */
  end: number;
};

export type RangeSliderOnChangeData = (
  | EventData<'change', React.ChangeEvent<HTMLInputElement>>
  | EventData<'pointer', React.PointerEvent<HTMLDivElement>>
) & {
  value: RangeSliderValue;
};

export type RangeSliderSlots = {
  /**
   * The root `role="group"` element.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * The track the thumbs move along.
   */
  rail: NonNullable<Slot<'div'>>;

  /**
   * The thumb for the start value.
   */
  startThumb: NonNullable<Slot<'div'>>;

  /**
   * The thumb for the end value.
   */
  endThumb: NonNullable<Slot<'div'>>;

  /**
   * The range input for the start value.
   */
  startInput: NonNullable<Slot<'input'>> & {
    /**
     * Non-standard attribute for vertical range inputs in Firefox. Set when `vertical` is true.
     */
    orient?: 'horizontal' | 'vertical';
  };

  /**
   * The range input for the end value.
   */
  endInput: NonNullable<Slot<'input'>> & {
    /**
     * Non-standard attribute for vertical range inputs in Firefox. Set when `vertical` is true.
     */
    orient?: 'horizontal' | 'vertical';
  };
};

export type RangeSliderProps = Omit<
  ComponentProps<Partial<RangeSliderSlots>>,
  'defaultValue' | 'onChange' | 'value' | 'aria-valuetext' | 'aria-valuenow' | 'aria-valuemin' | 'aria-valuemax'
> & {
  /**
   * Name of both inputs in a form.
   */
  name?: string;

  /**
   * Id of the form the inputs belong to.
   */
  form?: string;

  /**
   * Whether the inputs are required in a form.
   */
  required?: boolean;

  /**
   * The starting value for an uncontrolled RangeSlider.
   * @default `{ start: min, end: max }`
   */
  defaultValue?: RangeSliderValue;

  /**
   * Whether the RangeSlider is disabled.
   * @default `false`
   */
  disabled?: boolean;

  /**
   * The max value of the RangeSlider.
   * @default 100
   */
  max?: number;

  /**
   * The min value of the RangeSlider.
   * @default 0
   */
  min?: number;

  /**
   * The size of the RangeSlider.
   * @default 'medium'
   */
  size?: 'small' | 'medium';

  /**
   * The amount the value changes per step.
   * @default 1
   */
  step?: number;

  /**
   * The controlled value of the RangeSlider.
   */
  value?: RangeSliderValue;

  /**
   * Whether to render the RangeSlider vertically.
   * @default `false`
   */
  vertical?: boolean;

  /**
   * Called when either value changes.
   */
  onChange?: EventHandler<RangeSliderOnChangeData>;
};

export type RangeSliderState = ComponentState<RangeSliderSlots> &
  Pick<RangeSliderProps, 'disabled' | 'size' | 'vertical'> & {
    value: RangeSliderValue;

    /**
     * Whether the start thumb is disabled.
     */
    startDisabled: boolean;

    /**
     * Whether the end thumb is disabled.
     */
    endDisabled: boolean;

    /**
     * The thumb drawn on top when the thumbs overlap.
     * @default 'start'
     */
    activeThumb: 'start' | 'end';
  };

/**
 * RangeSlider props without design props such as `size`.
 */
export type RangeSliderBaseProps = Omit<RangeSliderProps, 'size'>;

/**
 * RangeSlider state without design state such as `size`.
 */
export type RangeSliderBaseState = Omit<RangeSliderState, 'size'>;

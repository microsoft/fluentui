import * as React from 'react';
import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import type { RadioGroupProps, RadioGroupSlots } from '@fluentui/react-components';

export type RadioPickerSlots = RadioGroupSlots;

/**
 * RadioPicker Props
 */
export type RadioPickerProps = ComponentProps<RadioPickerSlots> &
  Omit<RadioGroupProps, 'layout'> & {
    layout?: 'grid' | 'row';
    columnCount?: number;
    size?: 'extraSmall' | 'small' | 'medium' | 'large';
    shape?: 'rounded' | 'square' | 'circular';
    /**
     * Callback when the selected Radio item changes.
     */
    onChange?: (ev: React.FormEvent<HTMLDivElement>, data: RadioPickerOnChangeData) => void;
  };

/**
 * Data for the onChange event for RadioPicker.
 */
export type RadioPickerOnChangeData = {
  /**
   * The value of the newly selected Radio item.
   */
  value: string;
};
/**
 * State used in rendering RadioPicker
 */
export type RadioPickerState = ComponentState<RadioPickerSlots> &
  Pick<
    RadioPickerProps,
    'layout' | 'columnCount' | 'name' | 'value' | 'defaultValue' | 'disabled' | 'required' | 'size' | 'shape'
  >;

export type RadioPickerContextValue = Pick<
  RadioPickerProps,
  'name' | 'value' | 'defaultValue' | 'disabled' | 'layout' | 'required' | 'aria-describedby' | 'size' | 'shape'
>;

export type RadioPickerContextValues = {
  radioPicker: RadioPickerContextValue;
};

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
  };

/**
 * State used in rendering RadioPicker
 */
export type RadioPickerState = ComponentState<RadioPickerSlots> &
  Pick<RadioPickerProps, 'layout' | 'columnCount' | 'name' | 'value' | 'defaultValue' | 'disabled' | 'required'>;

export type RadioPickerContextValue = Pick<
  RadioPickerProps,
  'name' | 'value' | 'defaultValue' | 'disabled' | 'layout' | 'required' | 'aria-describedby'
>;

export type RadioPickerContextValues = {
  radioPicker: RadioPickerContextValue;
};

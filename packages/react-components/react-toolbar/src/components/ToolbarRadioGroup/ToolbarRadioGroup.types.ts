import { RadioGroupProps, RadioGroupState } from '@fluentui/react-radio';

/**
 * ToolbarRadioGroup Props
 */
export type ToolbarRadioGroupProps = RadioGroupProps;

/**
 * State used in rendering ToolbarRadioGroup
 */
export type ToolbarRadioGroupState = RadioGroupState;

export type RadioGroupContextValue = Pick<
  RadioGroupProps,
  'name' | 'value' | 'defaultValue' | 'disabled' | 'layout' | 'required'
>;

export type RadioGroupContextValues = {
  radioGroup: RadioGroupContextValue;
};

import type { RadioGroupContextValue, RadioGroupContextValues, RadioGroupState } from '../RadioGroup';

export const useRadioGroupContextValues = (state: RadioGroupState): RadioGroupContextValues => {
  const { name, value, defaultValue, disabled, layout, required } = state;

  const radioGroup: RadioGroupContextValue = {
    name,
    value,
    defaultValue,
    disabled,
    layout,
    required,
  };

  return { radioGroup };
};

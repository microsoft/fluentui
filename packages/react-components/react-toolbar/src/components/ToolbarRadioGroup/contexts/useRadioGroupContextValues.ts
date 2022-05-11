import type {
  RadioGroupContextValue,
  RadioGroupContextValues,
  ToolbarRadioGroupState,
} from '../ToolbarRadioGroup.types';

export const useRadioGroupContextValues = (state: ToolbarRadioGroupState): RadioGroupContextValues => {
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

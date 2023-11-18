import * as React from 'react';

import type { RadioGroupContextValue, RadioGroupContextValues, RadioGroupState } from '../RadioGroup';

export const useRadioGroupContextValues = (state: RadioGroupState): RadioGroupContextValues => {
  const { name, value, defaultValue, disabled, layout, required } = state;
  const ariaDescribedBy = state.root['aria-describedby'];

  const radioGroup = React.useMemo<RadioGroupContextValue>(
    () => ({
      name,
      value,
      defaultValue,
      disabled,
      layout,
      required,
      'aria-describedby': ariaDescribedBy,
    }),
    [name, value, defaultValue, disabled, layout, required, ariaDescribedBy],
  );

  return { radioGroup };
};

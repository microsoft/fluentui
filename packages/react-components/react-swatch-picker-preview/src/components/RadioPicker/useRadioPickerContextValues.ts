import * as React from 'react';

import type { RadioPickerContextValue, RadioPickerContextValues, RadioPickerState } from './RadioPicker.types';

export const useRadioPickerContextValues = (state: RadioPickerState): RadioPickerContextValues => {
  const { name, value, defaultValue, disabled, layout, required } = state;
  const ariaDescribedBy = state.root['aria-describedby'];

  const radioPicker = React.useMemo<RadioPickerContextValue>(
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

  return { radioPicker };
};

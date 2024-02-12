import * as React from 'react';
import { PickerControlContextValues, PickerControlState } from './PickerControl.types';

export function usePickerControlContextValues(state: PickerControlState): PickerControlContextValues {
  return {
    pickerControl: React.useMemo(
      () => ({
        appearance: state.appearance,
        clearable: state.clearable,
        disabled: state.disabled,
        size: state.size,
      }),
      [state.appearance, state.clearable, state.disabled, state.size],
    ),
  };
}

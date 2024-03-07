import * as React from 'react';
import { TagPickerControlContextValues, TagPickerControlState } from './TagPickerControl.types';

export function useTagPickerControlContextValues(state: TagPickerControlState): TagPickerControlContextValues {
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

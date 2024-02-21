import * as React from 'react';
import { PickerContextValues, PickerState } from './Picker.types';

export function usePickerContextValues(state: PickerState): PickerContextValues {
  return {
    activeDescendant: React.useMemo(
      () => ({ controller: state.activeDescendantController }),
      [state.activeDescendantController],
    ),
    listbox: { ...state },
    picker: { ...state },
  };
}

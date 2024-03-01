import * as React from 'react';
import { TagPickerContextValues, TagPickerState } from './TagPicker.types';

export function useTagPickerContextValues(state: TagPickerState): TagPickerContextValues {
  return {
    activeDescendant: React.useMemo(
      () => ({ controller: state.activeDescendantController }),
      [state.activeDescendantController],
    ),
    listbox: { ...state },
    picker: { ...state },
  };
}

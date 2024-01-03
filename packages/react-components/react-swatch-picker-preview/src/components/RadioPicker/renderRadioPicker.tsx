/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { RadioPickerState, RadioPickerSlots, RadioPickerContextValues } from './RadioPicker.types';
import { RadioPickerContext } from './RadioPickerContext';

/**
 * Render the final JSX of RadioPicker
 */
export const renderRadioPicker_unstable = (state: RadioPickerState, contextValues: RadioPickerContextValues) => {
  assertSlots<RadioPickerSlots>(state);

  return (
    <RadioPickerContext.Provider value={contextValues.radioPicker}>
      <state.root />
    </RadioPickerContext.Provider>
  );
};

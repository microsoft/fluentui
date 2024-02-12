/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { PickerInputState, PickerInputSlots } from './PickerInput.types';

/**
 * Render the final JSX of PickerInput
 */
export const renderPickerInput_unstable = (state: PickerInputState) => {
  assertSlots<PickerInputSlots>(state);

  return (
    <>
      <state.root />
      {state.clearIcon && <state.clearIcon />}
      {state.expandIcon && <state.expandIcon />}
    </>
  );
};

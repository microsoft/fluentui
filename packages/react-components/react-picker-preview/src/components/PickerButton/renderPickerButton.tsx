/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { PickerButtonState, PickerButtonSlots } from './PickerButton.types';

/**
 * Render the final JSX of PickerButton
 */
export const renderPickerButton_unstable = (state: PickerButtonState) => {
  assertSlots<PickerButtonSlots>(state);

  return (
    <>
      <state.root />
      {state.clearButton && <state.clearButton />}
      {state.expandIcon && <state.expandIcon />}
    </>
  );
};

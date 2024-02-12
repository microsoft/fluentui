/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { PickerButtonState, PickerButtonSlots } from './PickerButton.types';

/**
 * Render the final JSX of PickerButton
 */
export const renderPickerButton_unstable = (state: PickerButtonState) => {
  assertSlots<PickerButtonSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};

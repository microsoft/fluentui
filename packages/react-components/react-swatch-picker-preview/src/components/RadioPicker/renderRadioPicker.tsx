/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { RadioPickerState, RadioPickerSlots } from './RadioPicker.types';

/**
 * Render the final JSX of RadioPicker
 */
export const renderRadioPicker_unstable = (state: RadioPickerState) => {
  assertSlots<RadioPickerSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};

/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import type { TimePickerState, TimePickerSlots } from './TimePicker.types';

/**
 * Render the final JSX of TimePicker
 */
export const renderTimePicker_unstable = (state: TimePickerState) => {
  assertSlots<TimePickerSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};

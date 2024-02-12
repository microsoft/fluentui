/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { PickerControlState, PickerControlSlots, PickerControlContextValues } from './PickerControl.types';
import { PickerControlContextProvider } from '../../contexts/PickerControlContext';

/**
 * Render the final JSX of PickerControl
 */
export const renderPickerControl_unstable = (state: PickerControlState, contexts: PickerControlContextValues) => {
  assertSlots<PickerControlSlots>(state);

  // TODO Add additional slots in the appropriate place
  return (
    <PickerControlContextProvider value={contexts.pickerControl}>
      <state.root />
    </PickerControlContextProvider>
  );
};

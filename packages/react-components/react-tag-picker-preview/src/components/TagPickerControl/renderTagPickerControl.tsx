/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type {
  TagPickerControlState,
  TagPickerControlSlots,
  TagPickerControlContextValues,
} from './TagPickerControl.types';
import { TagPickerControlContextProvider } from '../../contexts/TagPickerControlContext';

/**
 * Render the final JSX of PickerControl
 */
export const renderTagPickerControl_unstable = (
  state: TagPickerControlState,
  contexts: TagPickerControlContextValues,
) => {
  assertSlots<TagPickerControlSlots>(state);

  // TODO Add additional slots in the appropriate place
  return (
    <TagPickerControlContextProvider value={contexts.pickerControl}>
      <state.root />
    </TagPickerControlContextProvider>
  );
};

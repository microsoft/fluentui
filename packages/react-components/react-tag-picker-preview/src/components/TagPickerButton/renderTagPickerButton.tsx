/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { TagPickerButtonState, TagPickerButtonSlots } from './TagPickerButton.types';

/**
 * Render the final JSX of PickerButton
 */
export const renderTagPickerButton_unstable = (state: TagPickerButtonState) => {
  assertSlots<TagPickerButtonSlots>(state);

  return <state.root />;
};

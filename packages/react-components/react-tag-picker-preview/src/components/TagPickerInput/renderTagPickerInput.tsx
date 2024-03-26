/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { TagPickerInputState, TagPickerInputSlots } from './TagPickerInput.types';

/**
 * Render the final JSX of TagPickerInput
 */
export const renderTagPickerInput_unstable = (state: TagPickerInputState) => {
  assertSlots<TagPickerInputSlots>(state);

  return <state.root />;
};

/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TagPickerInputBaseState, TagPickerInputSlots } from './TagPickerInput.types';

/**
 * Render the final JSX of TagPickerInput
 */
export const renderTagPickerInput_unstable = (state: TagPickerInputBaseState): JSXElement => {
  assertSlots<TagPickerInputSlots>(state);

  return <state.root />;
};

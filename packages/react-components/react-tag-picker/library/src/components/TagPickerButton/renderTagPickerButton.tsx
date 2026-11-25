/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TagPickerButtonBaseState, TagPickerButtonSlots } from './TagPickerButton.types';

/**
 * Render the final JSX of PickerButton
 */
export const renderTagPickerButton_unstable = (state: TagPickerButtonBaseState): JSXElement => {
  assertSlots<TagPickerButtonSlots>(state);

  return <state.root />;
};

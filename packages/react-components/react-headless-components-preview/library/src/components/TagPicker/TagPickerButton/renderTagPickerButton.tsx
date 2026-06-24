/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TagPickerButtonSlots, TagPickerButtonState } from './TagPickerButton.types';

/**
 * Render the final JSX of TagPickerButton.
 */
export const renderTagPickerButton = (state: TagPickerButtonState): JSXElement => {
  assertSlots<TagPickerButtonSlots>(state);

  return <state.root />;
};

/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TagPickerButtonSlots, TagPickerButtonState } from './TagPickerButton.types';

/**
 * Render the final JSX of TagPickerButton.
 *
 * Kept local rather than re-exporting `renderTagPickerButton_unstable`: the base render fn is typed
 * against the full (styled) `TagPickerButtonState`, which requires `size`/`appearance` — both
 * intentionally omitted from the headless state.
 */
export const renderTagPickerButton = (state: TagPickerButtonState): JSXElement => {
  assertSlots<TagPickerButtonSlots>(state);

  return <state.root />;
};

/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { TagPickerOptionState, TagPickerOptionSlots } from './TagPickerOption.types';

/**
 * Render the final JSX of TagPickerOption
 */
export const renderTagPickerOption_unstable = (state: TagPickerOptionState) => {
  assertSlots<TagPickerOptionSlots>(state);

  return (
    <state.root>
      {state.media && <state.media />}
      {state.root.children}
      {state.secondaryContent && <state.secondaryContent />}
    </state.root>
  );
};

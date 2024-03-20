/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { TagPickerControlState, TagPickerControlSlots } from './TagPickerControl.types';

/**
 * Render the final JSX of PickerControl
 */
export const renderTagPickerControl_unstable = (state: TagPickerControlState) => {
  assertSlots<TagPickerControlSlots>(state);

  return (
    <state.root>
      {state.root.children}
      {state.expandIcon && <state.expandIcon />}
      {state.secondaryAction && <state.secondaryAction />}
    </state.root>
  );
};
